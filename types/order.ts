export interface Order {
    symbol: string;
    stopPrice: number;
    amount: number;
    price: number;
    side: 'buy' | 'sell';
}
