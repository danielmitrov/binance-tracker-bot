import axios from 'axios';


class TelegramClient {
    constructor(
        private token: string,
        private chatId: string,
        private isDebug = false,
    ) {}

    async sendMessage(msg: string): Promise<void> {
        if (this.isDebug) {
            console.log(msg);
            return;
        }

        await axios.get(`https://api.telegram.org/bot${this.token}/sendMessage`, {
            params: {
                chat_id: this.chatId,
                text: msg,
            }
        });
    }
}

export default TelegramClient;
