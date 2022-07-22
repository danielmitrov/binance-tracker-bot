export interface CCXTPosition {
    info: object;
    id: string;
    symbol: string;
    timestamp: number;
    datetime: string;
    isolated: boolean;
    hedged: boolean;
    side: 'long' | 'short';
    contracts: number;
    contractSize: number;
    entryPrice: number;
    markPrice: number;
    notional: number;
    leverage: number;
    collateral: number;
    initialMargin: number;
    maintenanceMargin: number;
    initialMarginPercentage: number;
    maintenanceMarginPercentage: number;
    unrealizedPnl: number;
    liquidationPrice: number;
    marginMode: string;
    percentage: number;
}

export interface Position {
    symbol: string;
    side: 'long' | 'short';
    amount: number;
    entryPrice: number;
    leverage: number;
    isolatedMargin: number;
}
