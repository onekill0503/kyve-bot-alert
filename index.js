import bot from "./src/bot.js"
import { config } from "dotenv";

config();
const NotifTo = process.env.USER_NOTIF;
const time = 3600000;

if(NotifTo){
    // create notification
    setInterval(async () => {
        const kyveBlock = await fetch.fetchKyveBlock();
        const localBlock = await fetch.fetchLocalRpcBlock();
        if(localBlock < 0 || kyveBlock < 0) {
            ctx.reply(`❌ Failed get current block`)
            return;
        };
        console.log(`Kyve Block : ${kyveBlock}\tLocal Block : ${localBlock}`)
        ctx.reply(`✅ Current GAP from local node with kyve node is ${kyveBlock - localBlock} Blocks`);
    } , time);
}

bot.bot.launch();
