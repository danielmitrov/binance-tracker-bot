import * as ccxt from 'ccxt';

import {Position} from '../../types/position';


class BinanceClient {
    private connection: ccxt.Exchange;

    constructor(apiKey: string, secret: string, isDebug = false) {
        this.connection = new ccxt.binance({
            apiKey,
            secret,
            options: {
                "defaultType": "future",
            },
            enableRateLimit: true,
        });

        if (isDebug) {
            this.connection.setSandboxMode(true);
        }
    }

    async getCoinList(): Promise<string[]> {
        const markets = await this.connection.loadMarkets();
        const coinList = Object.entries(markets).map(([key, value]) => {
            return value.id;
        });

        return coinList;
    }

    getPositions(): Promise<Position[]> {
        return this.connection.fetchPositions();
    }

    async getOpenPositions(): Promise<Map<string, Position>> {
        const positions = await this.getPositions();
        const openOpsitions = new Map<string, Position>();
        
        positions.forEach((position) => {
            if (Number(position.info['positionAmt']) !== 0) {
                openOpsitions.set(position.symbol, position);
            }
        });

        return openOpsitions;
    }

    async getUSDBalance(): Promise<number> {
        const balance = await this.connection.fetchBalance();
        // @ts-expect-error -- CCXT has broken types
        return Number(balance?.total?.USDT ?? 0);
    }

    getOpenOrders(symbol: string) {
        return this.connection.fetchOpenOrders(symbol);
    }
}


export default BinanceClient;
