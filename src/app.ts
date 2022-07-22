import 'dotenv/config';

import {Position} from '../types/position';
import Message from './messages/message';
import NewPosition from './messages/newPosition';
import PositionClosed from './messages/positionClosed';
import BinanceClient from './services/binance';
import TelegramClient from './services/telegram';
import {sleep} from './utils';


let positions = new Map<string, Position>();

async function tick(
    binanceClient: BinanceClient,
    messages: Message[],
): Promise<void> {
    const newOpenPositions = await binanceClient.getOpenPositions();
    
    messages.forEach((message) => {
        message.sendMessage(positions, newOpenPositions);
    });

    positions = newOpenPositions;
}

async function main(): Promise<void> {
    const isDebug = true;
    const binanceClient = new BinanceClient(process.env.BINANCE_API_KEY, process.env.BINANCE_API_SECRET, isDebug);
    const telegramClient = new TelegramClient(process.env.TELEGRAM_TOKEN, process.env.TELEGRAM_CHANNEL, isDebug);

    const messages: Message[] = [
        new NewPosition(binanceClient, telegramClient),
        new PositionClosed(binanceClient, telegramClient),
    ];

    while (true) {
        console.log('tick');
        
        tick(binanceClient, messages);
        await sleep(1000);
    }
}

main();
