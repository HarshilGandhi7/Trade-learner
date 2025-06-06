export const CRYPTO_INFO = {
  BTC: {
    key: "BTC",
    symbol: "BTCUSDT",
    name: "Bitcoin (BTC-USD)",
    description:
      "The world's first and largest cryptocurrency — operates on a decentralized blockchain network, providing peer-to-peer transactions without intermediaries or central authority.",
    longDescription:
      'Created in 2009 by pseudonymous developer Satoshi Nakamoto, Bitcoin has a fixed supply cap of 21 million coins. It uses proof-of-work consensus to validate transactions and has become widely recognized as "digital gold" — a hedge against inflation and currency devaluation during economic uncertainty.',
    coinName: "bitcoin",
    apiSymbol: process.env.NEXT_PUBLIC_BITCOIN_SYMBOL,
  },
  ETH: {
    key: "ETH",
    symbol: "ETHUSDT",
    name: "Ethereum (ETH-USD)",
    description:
      "A decentralized blockchain platform that enables smart contracts and decentralized applications (dApps) to be built and run without downtime, fraud, control, or interference from a third party.",
    longDescription:
      "Launched in 2015, Ethereum introduced smart contract functionality to blockchain technology. It's transitioning from proof-of-work to proof-of-stake consensus with Ethereum 2.0, aiming to improve scalability, security, and sustainability. Ethereum hosts thousands of tokens and is the foundation of decentralized finance (DeFi) applications.",
    coinName: "ethereum",
    apiSymbol: process.env.NEXT_PUBLIC_ETHEREUM_SYMBOL,
  },
  SOL: {
    key: "SOL",
    symbol: "SOLUSDT",
    name: "Solana (SOL-USD)",
    description:
      "A high-performance blockchain supporting smart contracts and decentralized applications with an emphasis on speed and low transaction costs.",
    longDescription:
      "Launched in 2020, Solana uses a unique proof-of-history consensus combined with proof-of-stake to achieve high throughput (up to 65,000 transactions per second) and very low fees. Its ecosystem has grown rapidly with NFT marketplaces, DeFi protocols, and Web3 applications making it a popular alternative to Ethereum for developers and users seeking scalability.",
    coinName: "solana",
    apiSymbol: process.env.NEXT_PUBLIC_SOLANA_SYMBOL,
  },
};

export const STOCK_MARKETS = [
  { symbol: "QQQ", name: "Invesco QQQ Trust", description: "Nasdaq 100 ETF" },
  { symbol: "MSFT", name: "Microsoft", description: "Microsoft" },
  { symbol: "AAPL", name: "Apple", description: "Apple" },
];
export const CRYPTO_MARKETS = [
  { symbol: "BTC", name: "Bitcoin", color: "text-amber-400" },
  { symbol: "ETH", name: "Ethereum", color: "text-blue-400" },
  { symbol: "SOL", name: "Solana", color: "text-purple-400" },
];
