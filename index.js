import telegram from "./src/bot.js"
import { config } from "dotenv";
import fetch from "./src/fetch.js";

config();
// telegram user Id to send notification
const NotifTo = process.env.USER_NOTIF;
// timer 1 hour at interval in milliseconds
const time = 3600000;

if(NotifTo){
    // create notification
    setInterval(async () => {
        const kyveBlock = await fetch.fetchKyveBlock();
        const localBlock = await fetch.fetchLocalRpcBlock();
        if(localBlock < 0 || kyveBlock < 0) {
            telegram.client.sendMessage(NotifTo , `❌ Failed get current block`);
            return;
        };
        console.log(`Kyve Block : ${kyveBlock}\tLocal Block : ${localBlock}`)
        telegram.client.sendMessage(NotifTo , `✅ Current GAP from local node with kyve node is ${kyveBlock - localBlock} Blocks`)
    } , time);
}

telegram.bot.launch();
