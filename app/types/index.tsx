export interface CryptoChartProps {
  chartData: { time: number; value: number }[];
  timeframe: string;
  isChartLoading: boolean;
  chartError: string | null;
  change24h?: number;
  previousClose?: number;
  onTimeframeChange: (timeframe: string) => void;
  onRetry: () => void;
}

export interface CryptoDataProps {
  symbol: string;
  name: string;
  onDataUpdate?: (data: any) => void;
}

export interface PortfolioData {
  avgPrice: number;
  firstPurchased: string;
  lastUpdated: string;
  name: string;
  quantity: number;
  symbol: string;
}

export interface UserData {
  uid: string;
  email: string;
  username: string;
}

export interface TransactionParams {
  symbol: string;
  name: string;
  currentPrice: number;
  type: "buy" | "sell";
  quantity: string;
  setIsSubmitting?: (isSubmitting: boolean) => void;
}

export interface TransactionData {
  data: string;
  name: string;
  price: number;
  quantity: number;
  symbol: string;
  timestamp: number;
  total: number;
  type: string;
}

export interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "buy" | "sell";
  assetName: string;
  assetSymbol: string;
  currentPrice: number | undefined;
  quantity: string;
  onQuantityChange: (value: string) => void;
  onConfirm: () => void;
  isSubmitting: boolean;
}


export interface CryptoDataType  {
  symbol: string;
  currentPrice: number;
  change24h: number;
  percentChange24h: number;
  high24h: number;
  low24h: number;
  volume24h: number;
  marketCap: number;
  lastUpdate: number;
};

export interface PortfolioTotals {
  totalCurrentValue: number;
  totalInvested: number;
  totalProfitLoss: number;
  totalProfitLossPercent: number;
}