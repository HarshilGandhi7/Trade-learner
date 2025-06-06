const express = require("express");
const WebSocket = require("ws");
const redis = require("redis");
const cors = require("cors");
const http = require("http");
const fetch = require("node-fetch");

require("dotenv").config();

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Trade Learner Server!");
});

const MARKETS = {
  QQQ: { apiKey: process.env.FINNHUB_QQQ_API_KEY },
  AAPL: { apiKey: process.env.FINNHUB_AAPL_API_KEY },
  MSFT: { apiKey: process.env.FINNHUB_MSFT_API_KEY },
};

const CRYPTOS = {
  BTCUSDT: {},
  ETHUSDT: {},
  SOLUSDT: {},
};

let redisClient;
let finnhubConnectionsMarket = {};
let BinanceConnectionsCrypto = {};
let wasOpen = false;

const US_MARKET_HOLIDAYS = {
  "New Year's Day": (year) => new Date(year, 0, 1),
  "Martin Luther King Jr. Day": (year) => {
    const date = new Date(year, 0, 1);
    while (date.getDay() !== 1) date.setDate(date.getDate() + 1);
    date.setDate(date.getDate() + 14);
    return date;
  },
  "Washington's Birthday": (year) => {
    const date = new Date(year, 1, 1);
    while (date.getDay() !== 1) date.setDate(date.getDate() + 1);
    date.setDate(date.getDate() + 14);
    return date;
  },
  "Good Friday": (year) => {
    const date = new Date(year, 2, 22);
    return date;
  },
  "Memorial Day": (year) => {
    const date = new Date(year, 5, 0);
    while (date.getDay() !== 1) date.setDate(date.getDate() - 1);
    return date;
  },
  "Juneteenth National Independence Day": (year) => new Date(year, 5, 19),
  "Independence Day": (year) => new Date(year, 6, 4),
  "Labor Day": (year) => {
    const date = new Date(year, 8, 1);
    while (date.getDay() !== 1) date.setDate(date.getDate() + 1);
    return date;
  },
  "Thanksgiving Day": (year) => {
    const date = new Date(year, 10, 1);
    while (date.getDay() !== 4) date.setDate(date.getDate() + 1);
    date.setDate(date.getDate() + 21);
    return date;
  },
  "Christmas Day": (year) => new Date(year, 11, 25),
};

function isMarketHoliday() {
  const today = new Date();
  const currentYear = today.getFullYear();

  const todayFormatted = today.toDateString();

  for (const [name, getHolidayDate] of Object.entries(US_MARKET_HOLIDAYS)) {
    const holidayDate = getHolidayDate(currentYear);
    let observedDate = new Date(holidayDate);

    if (observedDate.getDay() === 0) {
      observedDate.setDate(observedDate.getDate() + 1);
    } else if (observedDate.getDay() === 6) {
      observedDate.setDate(observedDate.getDate() - 1);
    }

    if (observedDate.toDateString() === todayFormatted) {
      return { isHoliday: true, name, date: observedDate };
    }
  }

  return { isHoliday: false };
}

function checkMarketStatus() {
  try {
    const now = new Date();
    const nyTime = new Date(
      now.toLocaleString("en-US", { timeZone: "America/New_York" })
    );

    const day = nyTime.getDay();
    const isWeekend = day === 0 || day === 6;

    const hour = nyTime.getHours();
    const minute = nyTime.getMinutes();
    const isMarketHours =
      (hour > 9 || (hour === 9 && minute >= 30)) && hour < 16;

    const holidayCheck = isMarketHoliday();

    const isOpen = !isWeekend && !holidayCheck.isHoliday && isMarketHours;

    let statusMessage = isOpen ? "OPEN" : "CLOSED";
    let reason = "";

    if (isWeekend) {
      reason = `Weekend (${day === 0 ? "Sunday" : "Saturday"})`;
    } else if (holidayCheck.isHoliday) {
      reason = `Holiday: ${holidayCheck.name}`;
    } else if (!isMarketHours) {
      if (hour < 9 || (hour === 9 && minute < 30)) {
        reason = "Pre-market hours";
      } else {
        reason = "After-market hours";
      }
    }

    return {
      isOpen,
      statusMessage,
      reason,
      currentTime: now.toISOString(),
      nyTime: nyTime.toISOString(),
    };
  } catch (error) {
    console.error("Error checking market status:", error);
    return {
      isOpen: false,
      statusMessage: "CLOSED",
      reason: "Error checking status",
      error: error.message,
    };
  }
}

async function connectToRedis() {
  try {
    if (redisClient && redisClient.isOpen) {
      console.log("Closing existing Redis connection");
      await redisClient.quit();
    }

    redisClient = redis.createClient({
      url: process.env.REDIS_URL,
      socket: {
        keepAlive: true,
        reconnectStrategy: 3000,
      },
    });

    redisClient.on("connect", () => {
      console.log("Redis connecting...");
    });

    redisClient.on("ready", () => {
      console.log("Redis connection ready!");
    });

    redisClient.on("error", (err) => {
      console.error(" Redis Error:", err.message);
    });

    redisClient.on("reconnecting", () => {
      console.log("Redis reconnecting...");
    });

    redisClient.on("end", () => {
      console.log("Redis connection ended");
    });

    await redisClient.connect();

    return redisClient;
  } catch (error) {
    console.error("Failed to connect to Redis:", error);
    throw error;
  }
}

function connectToFinnhubMarket(symbol, apiKey) {
  try {
    console.log(`Reconnecting to Finnhub for ${symbol}...`);

    const ws = new WebSocket(`wss://ws.finnhub.io?token=${apiKey}`);

    ws.on("open", () => {
      console.log(`Reconnected to Finnhub for ${symbol}`);
      ws.send(JSON.stringify({ type: "subscribe", symbol: symbol }));
    });

    ws.on("message", async (data) => {
      try {
        const message = JSON.parse(data);

        if (
          message.type === "trade" &&
          message.data &&
          message.data.length > 0
        ) {
          const trades = message.data;
          const lastTrade = trades[trades.length - 1];

          console.log(`Received trade data for ${symbol}:`, lastTrade);
          await redisClient.set(
            `trades:${symbol}:latest`,
            JSON.stringify(message)
          );

          const marketKey = `market:${symbol}:current`;
          let previousData = await redisClient.hGetAll(marketKey);
          let previousClose = previousData.previousClose
            ? parseFloat(previousData.previousClose)
            : lastTrade.p;

          const currentPrice = lastTrade.p;
          const change = currentPrice - previousClose;
          const percentChange = (change / previousClose) * 100;

          const dayHigh = previousData.dayHigh
            ? Math.max(parseFloat(previousData.dayHigh), currentPrice)
            : currentPrice;

          const dayLow = previousData.dayLow
            ? Math.min(parseFloat(previousData.dayLow), currentPrice)
            : currentPrice;

          await redisClient.hSet(marketKey, {
            currentPrice: currentPrice.toString(),
            change: change.toFixed(4),
            percentChange: percentChange.toFixed(4),
            dayHigh: dayHigh.toString(),
            dayLow: dayLow.toString(),
            previousClose: previousClose.toString(),
            timestamp: lastTrade.t.toString(),
            lastUpdate: new Date().toISOString(),
            symbol: symbol,
          });
          finnhubConnectionsMarket[symbol] = ws;
        }
      } catch (error) {
        console.error(`Error processing message for ${symbol}:`, error.message);
      }
    });

    ws.on("error", (error) => {
      console.error(`WebSocket error for ${symbol}:`, error.message);
    });

    const pingInterval = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: "ping" }));
      }
    }, 30000);

    ws.on("close", () => {
      console.log(`WebSocket closed for ${symbol}`);
      delete finnhubConnectionsMarket[symbol];
      clearInterval(pingInterval);

      setTimeout(() => {
        connectToFinnhubMarket(symbol, apiKey);
      }, 5000);
    });

    finnhubConnectionsMarket[symbol] = ws;
  } catch (error) {
    console.error(`Error reconnecting to ${symbol}:`, error);
  }
}

async function getFinnhubConnectionsMarket() {
  try {
    for (const [symbol, market] of Object.entries(MARKETS)) {
      if (!finnhubConnectionsMarket[symbol]) {
        connectToFinnhubMarket(symbol, market.apiKey);
      }
    }
  } catch (error) {
    console.error("Error in getFinnhubConnections:", error);
  }
}

app.get("/api/market/data/:symbol", async (req, res) => {
  try {
    const symbol = req.params.symbol.toUpperCase();

    if (!MARKETS[symbol]) {
      return res.status(404).json({
        error: `Symbol ${symbol} not found`,
        availableSymbols: Object.keys(MARKETS),
      });
    }

    const marketKey = `market:${symbol}:current`;
    const marketData = await redisClient.hGetAll(marketKey);

    if (!marketData || Object.keys(marketData).length === 0) {
      return res.status(404).json({
        error: `No data available for ${symbol}`,
        message: "Data may not be available yet or market may be closed",
      });
    }

    const formattedData = {
      symbol: symbol,
      currentPrice: parseFloat(marketData.currentPrice || 0),
      change: parseFloat(marketData.change || 0),
      percentChange: parseFloat(marketData.percentChange || 0),
      dayHigh: parseFloat(marketData.dayHigh || 0),
      dayLow: parseFloat(marketData.dayLow || 0),
      previousClose: parseFloat(marketData.previousClose || 0),
      timestamp: parseInt(marketData.timestamp || 0),
      lastUpdate: marketData.lastUpdate || new Date().toISOString(),
      marketStatus: checkMarketStatus(),
    };

    res.json(formattedData);
  } catch (error) {
    console.error("Error retrieving market data:", error);
    res.status(500).json({ error: "Failed to retrieve market data" });
  }
});

function closefinnhubConnections() {
  try {
    console.log("Closing all Finnhub connections");

    for (const [symbol, connection] of Object.entries(
      finnhubConnectionsMarket
    )) {
      if (connection && connection.readyState !== 3) {
        console.log(`Closing connection for ${symbol}`);
        connection.close();
      }
    }

    finnhubConnectionsMarket = {};
  } catch (error) {
    console.error("Error closing Finnhub connections:", error);
  }
}

async function storeLastTradeData() {
  try {
    console.log("Market closed - storing last trade data");

    for (const symbol of Object.keys(MARKETS)) {
      const marketKey = `market:${symbol}:current`;
      const marketData = await redisClient.hGetAll(marketKey);

      if (marketData && marketData.currentPrice) {
        const closeData = {
          closePrice: marketData.currentPrice,
          dayHigh: marketData.dayHigh || marketData.currentPrice,
          dayLow: marketData.dayLow || marketData.currentPrice,
          closeDate: new Date().toISOString(),
        };

        await redisClient.hSet(`market:${symbol}:lastClose`, closeData);
        console.log(
          `Stored closing data for ${symbol}: $${marketData.currentPrice}`
        );
      }
    }
  } catch (error) {
    console.error("Error storing last trade data:", error);
  }
}

async function updateRedisData() {
  try {
    const marketStatus = checkMarketStatus();
    await redisClient.hSet("market:status", {
      isOpen: marketStatus.isOpen.toString(),
      statusMessage: marketStatus.statusMessage,
      reason: marketStatus.reason,
      lastChecked: new Date().toISOString(),
    });

    if (marketStatus.isOpen) {
      console.log("Updating all stock data in Redis...");

      for (const symbol of Object.keys(MARKETS)) {
        try {
          if (!finnhubConnectionsMarket[symbol]) {
            console.log(`No connection for ${symbol}, skipping update`);
            continue;
          }

          const marketKey = `market:${symbol}:current`;
          let marketData = await redisClient.hGetAll(marketKey);

          const currentTimestamp = Date.now();
          const lastUpdateTimestamp = marketData.lastUpdate
            ? new Date(marketData.lastUpdate).getTime()
            : 0;

          if (currentTimestamp - lastUpdateTimestamp < 30000) {
            continue;
          }

          const latestTradeJson = await redisClient.get(
            `trades:${symbol}:latest`
          );
          if (!latestTradeJson) {
            console.log(`No recent trade data for ${symbol}`);
            continue;
          }

          const message = JSON.parse(latestTradeJson);
          if (!message.data || message.data.length === 0) continue;

          const trades = message.data;
          const lastTrade = trades[trades.length - 1];

          const tradeTimestamp = lastTrade.t;
          if (currentTimestamp - tradeTimestamp > 120000) {
            continue;
          }

          const previousClose = marketData.previousClose
            ? parseFloat(marketData.previousClose)
            : lastTrade.p;

          const currentPrice = lastTrade.p;
          const change = currentPrice - previousClose;
          const percentChange = (change / previousClose) * 100;

          const dayHigh = marketData.dayHigh
            ? Math.max(parseFloat(marketData.dayHigh), currentPrice)
            : currentPrice;

          const dayLow = marketData.dayLow
            ? Math.min(parseFloat(marketData.dayLow), currentPrice)
            : currentPrice;

          await redisClient.hSet(marketKey, {
            currentPrice: currentPrice.toString(),
            change: change.toFixed(4),
            percentChange: percentChange.toFixed(4),
            dayHigh: dayHigh.toString(),
            dayLow: dayLow.toString(),
            previousClose: previousClose.toString(),
            timestamp: lastTrade.t.toString(),
            lastUpdate: new Date().toISOString(),
            symbol: symbol,
          });

          console.log(
            `Updated ${symbol}: $${currentPrice.toFixed(
              2
            )} (${percentChange.toFixed(2)}%)`
          );
        } catch (error) {
          console.error(`Error updating data for ${symbol}:`, error.message);
        }
      }
    }

    console.log(`Market status updated: ${marketStatus.statusMessage}`);
  } catch (error) {
    console.error("Error updating Redis market status:", error);
  }
}

const connectionInterval = 6000;
let connectionIntervalId;
function setConnectionInterval() {
  if (connectionIntervalId) {
    clearInterval(connectionIntervalId);
  }

  connectionIntervalId = setInterval(async () => {
    try {
      const marketStatus = await checkMarketStatus();
      const isOpen = marketStatus.isOpen;
      if (isOpen && !wasOpen) {
        wasOpen = true;
        getFinnhubConnectionsMarket();
      } else if (isOpen && wasOpen) {
        updateRedisData();
      } else if (!isOpen && wasOpen) {
        wasOpen = false;
        storeLastTradeData();
        closefinnhubConnections();
      }
    } catch (error) {
      console.error("Error in connection interval:", error);
    }
  }, connectionInterval);
}

async function getBinanceConnectionsCrypto() {
  try {
    for (const symbol of Object.keys(CRYPTOS)) {
      if (!BinanceConnectionsCrypto[symbol]) {
        await connectToBinanceCrypto(symbol);
      }
    }
  } catch (error) {
    console.error("Error getting Binance connections crypto:", error);
  }
}

async function connectToBinanceCrypto() {
  try {
    const ws = new WebSocket(process.env.BINANCE_WS_URL);

    ws.on("open", () => {
      const subscribeMessage = {
        method: "SUBSCRIBE",
        params: Object.keys(CRYPTOS).map(
          (symbol) => symbol.toLowerCase() + "@ticker"
        ),
        id: 1,
      };

      ws.send(JSON.stringify(subscribeMessage));
    });

    ws.on("message", async (data) => {
      try {
        const message = JSON.parse(data.toString());
        const symbol = message.s;
        const now = Date.now();
        const lastUpdates = new Map();
        const UPDATE_THROTTLE = 5000;

        if (message.e === "24hrTicker") {
          const lastUpdate = lastUpdates.get(symbol) || 0;
          if (now - lastUpdate >= UPDATE_THROTTLE) {
            const cryptoKey = `crypto:${symbol}:current`;

            await redisClient.hSet(cryptoKey, {
              symbol: symbol,
              currentPrice: message.c,
              change24h: message.p,
              percentChange24h: message.P,
              high24h: message.h,
              low24h: message.l,
              volume24h: message.v,
              lastUpdate: new Date().toISOString(),
            });

            lastUpdates.set(symbol, now);
          }
        }
      } catch (error) {
        console.error("Error processing message:", error);
      }
    });

    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
    });

    ws.on("close", () => {
      console.log("WebSocket connection closed, reconnecting...");
      setTimeout(connectToBinanceCrypto, 5000);
    });

    return ws;
  } catch (error) {
    console.error("Error connecting to Binance:", error);
    setTimeout(connectToBinanceCrypto, 5000);
  }
}

async function updateCryptoData() {
  try {
    for (const symbol of Object.keys(CRYPTOS)) {
      const cryptoKey = `crypto:${symbol}:current`;
      const data = await redisClient.hGetAll(cryptoKey);

      if (
        !data ||
        !data.lastUpdate ||
        Date.now() - new Date(data.lastUpdate).getTime() > 120000
      ) {
        await connectToBinanceCrypto(symbol);
      }
    }
  } catch (error) {
    console.error("Error in updateCryptoData:", error);
  }
}

const connectionCheckIntervalCrypto = 30000;
let connectionCheckIntervalIdCrypto;
function setConnectionCrypto() {
  if (connectionCheckIntervalIdCrypto) {
    clearInterval(connectionCheckIntervalIdCrypto);
  }

  getBinanceConnectionsCrypto();

  connectionCheckIntervalIdCrypto = setInterval(async () => {
    await updateCryptoData();
  }, connectionCheckIntervalCrypto);
}

app.get("/api/crypto/data/:symbol", async (req, res) => {
  try {
    const symbol = req.params.symbol;
    if (!CRYPTOS[symbol]) {
      return res.status(404).json({
        error: `Symbol ${symbol} not found`,
        availableSymbols: Object.keys(CRYPTOS),
      });
    }
    const cryptoKey = `crypto:${symbol}:current`;
    const cryptoData = await redisClient.hGetAll(cryptoKey);

    if (!cryptoData || Object.keys(cryptoData).length === 0) {
      return res.status(404).json({
        error: `No data available for ${symbol}`,
        message: "Data may not be available yet or market may be closed",
      });
    }

    return res.json({
      symbol: symbol,
      currentPrice: parseFloat(cryptoData.currentPrice || 0),
      change24h: parseFloat(cryptoData.change24h || 0),
      percentChange24h: parseFloat(cryptoData.percentChange24h || 0),
      high24h: parseFloat(cryptoData.high24h || 0),
      low24h: parseFloat(cryptoData.low24h || 0),
      volume24h: parseFloat(cryptoData.volume24h || 0),
      lastUpdate: cryptoData.lastUpdate || new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error retrieving crypto data:", error);
    res.status(500).json({ error: "Failed to retrieve crypto data" });
  }
});

async function startServer() {
  await connectToRedis();
  setConnectionInterval();
  setConnectionCrypto();

  server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
}

app.get("/api/current/data/all", async (req, res) => {
  try {
    const currentPrice = {};

    for (const symbol of Object.keys(MARKETS)) {
      const marketKey = `market:${symbol}:current`;
      const marketData = await redisClient.hGetAll(marketKey);
      if (marketData && marketData.currentPrice) {
        currentPrice[symbol] = parseFloat(marketData.currentPrice);
      }
    }

    for (const symbol of Object.keys(CRYPTOS)) {
      const cryptoKey = `crypto:${symbol}:current`;
      const cryptoData = await redisClient.hGetAll(cryptoKey);
      if (cryptoData && cryptoData.currentPrice) {
        currentPrice[symbol.slice(0,3)] =
          parseFloat(cryptoData.currentPrice) || 0;
      }
    }
    console.log("Current prices fetched for all:", currentPrice);
    return res.status(200).json({
      success: true,
      data: currentPrice,
    });
  } catch (error) {
    console.error("Error fetching current prices:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch current prices",
    });
  }
});
startServer();
