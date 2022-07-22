import Message from './message';
import {Position} from '../../types/position';


class PositionClosed extends Message {
    sendMessage(
        previousPositions: Map<string, Position>,
        newPositions: Map<string, Position>,
    ) {
        previousPositions.forEach((position) => {
            if (!newPositions.has(position.symbol)) {
                this.telegramClient.sendMessage(`Position closed: ${position.symbol}`);
            }
        });
    }
}

export default PositionClosed;
