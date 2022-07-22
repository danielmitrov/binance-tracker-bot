import Message from './message';
import {Position} from '../../types/position';


class NewPosition extends Message {
    sendMessage(
        previousPositions: Map<string, Position>,
        newPositions: Map<string, Position>,
    ) {
        newPositions.forEach((position) => {
            if (!previousPositions.has(position.symbol)) {                
                this.telegramClient.sendMessage(`New position: ${position.symbol}`);
            }
        });
    }
}

export default NewPosition;
