import BinanceClient from '../services/binance';
import TelegramClient from '../services/telegram';
import {Position} from '../../types/position';


abstract class Message {
    constructor(
        protected binanceClient: BinanceClient,
        protected telegramClient: TelegramClient,
    ) { }

    abstract sendMessage(
        previousPositions: Map<string, Position>,
        newPositions: Map<string, Position>,
    ): void;
}

export default Message;
