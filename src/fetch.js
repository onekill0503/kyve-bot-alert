import axios from "axios";
import {config} from "dotenv"

config();

export default {
    fetchKyveBlock: async () => {
        if(!process.env.KYVE_URL) return -1;
        const kyveCurrentBlock = await axios.get(process.env.KYVE_URL).then(res => res.data.pool.data.current_key).catch(err => -1);
        if(isNaN(parseInt(kyveCurrentBlock))) return -1;
        return kyveCurrentBlock;
    },
    fetchLocalRpcBlock: async () => {
        if(!process.env.LOCAL_RPC_URL) return -1;
        const localCurrentBlock = await axios.get(`${process.env.LOCAL_RPC_URL}/block`).then(res => res.data.result.block.header.height).catch(err => -1);
        if(isNaN(parseInt(localCurrentBlock))) return -1;
        return parseInt(localCurrentBlock);
    }
};