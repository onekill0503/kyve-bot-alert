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
    console.log(`Kyve Block : ${kyveBlock}\tLocal Block : ${localBlock}`)
    ctx.reply(`✅ Current GAP from local node with kyve node is ${kyveBlock - localBlock} Blocks`);
})

export default {
    bot,
    client,
};