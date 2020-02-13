export const IS_DEV = process.env.NODE_ENV === "development";

//测试
let defaultWsUrl = "wss://market-api.rbtc.io/sub";
if(/rbtc\.io/.test(location.href)){
    defaultWsUrl = "wss://market-api.rbtc.io/sub";
}else{
    defaultWsUrl = "ws://47.52.173.202:8686/sub";
}

export const WS_URL = window.webSocketUrl || defaultWsUrl;

console.log("WS_URL", WS_URL);
