import {Telegraf , Telegram} from 'telegraf'
import fetch from "./fetch.js";

const bot = new Telegraf(process.env.BOT_TOKEN);
const client = new Telegram(process.env.BOT_TOKEN);

bot.command(`gap`, async ctx => {
    const kyveBlock = await fetch.fetchKyveBlock();
    const localBlock = await fetch.fetchLocalRpcBlock();
    if(localBlock < 0 || kyveBlock < 0) {
        ctx.reply(`❌ Failed get current block`)
        return;
    };
    console.log(`✅ Kyve Block : ${kyveBlock}\t✅ Local Block : ${localBlock}`)
    ctx.reply(`✅ Current GAP from local node with kyve node is ${kyveBlock - localBlock} Blocks`);
})
bot.command(`status` , async ctx => {
    const localNodeStatus = await fetch.localNodeStatus();
    if(!localNodeStatus) {
        ctx.reply(`❌ Local Node is Offline`)
        return;
    };
    ctx.reply(`✅ Node Online`);
})

export default {
    bot,
    client,
};