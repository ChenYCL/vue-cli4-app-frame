
/**
 * websocket
 * @param {object} obj事件监听封装
 * @constructor
 */
function Socket(obj) {
    obj = obj || {};
    this.debug = obj.debug || false;
    this.blobSend = obj.blobSend || false;
    this.heartTime = obj.heartTime || 5 * 1000;

    this.heartTimeout = null;

    // websocket url
    this.url = obj.url || '';

    // websocket callback object
    this.wsCallbackEvent = {};

    // websocket object
    this.ws = null;

};

/**
 * websocket open event
 * @param event
 */
Socket.prototype.open = function (event){
    if(this.debug){
        console.log((new Date()).toLocaleString(), 'websocket open success!');
    };
};

/**
 * websocket close event
 * @param event
 */
Socket.prototype.close = function (event){
};
/**
 * websocket error event
 * @param event
 */
Socket.prototype.error = function (event){
    if(this.debug){
        console.log((new Date()).toLocaleString(), event, 'websocket error !');
    };
};
/**
 *
 * 添加监听事件
 * @param eventName 事件名称 method
 * @param callback  回调函数
 * @param self      回调函数 this 对象
 * @param once      是否运行一次
 */
Socket.prototype.addEvent = function (eventName, callback, self, once){
    if(this.wsCallbackEvent[eventName]){
        var callbackStatus = this.wsCallbackEvent[eventName].every(function (eventData){
            if(eventData.callback === callback  && eventData.once == once){
                return false;
            };
            return true;
        });
        if(callbackStatus){
            this.wsCallbackEvent[eventName].push({
                callback : callback,
                once : once,
                self : self
            });
        };
    }else{
        this.wsCallbackEvent[eventName] = [{
            callback : callback,
            once : once,
            self : self
        }];
    };
};
/**
 * 添加监听事件，并且一直监听
 * @param eventName
 * @param callback
 * @param self
 */
Socket.prototype.on = function (eventName, callback, self){
    this.addEvent(eventName, callback, self, false);
};

/**
 * 添加监听事件，执行一次后取消监听
 * @param eventName
 * @param callback
 * @param self
 */
Socket.prototype.once = function (eventName, callback, self){
    this.addEvent(eventName, callback, self, true);
};
/**
 * 为 websocket 推送消息事件执行相应回调函数
 * @param parseData     websocket event message JSON.parse(data)
 */
Socket.prototype.eventExecute = function (parseData) {
    if(parseData && parseData.method && this.wsCallbackEvent[parseData.method]){
        var once = [];
        this.wsCallbackEvent[parseData.method].forEach(function (callbackObj, index){
            if(callbackObj.once){
                once.push(index);
            };
            if(typeof callbackObj.callback == 'function'){
                if(callbackObj.self){
                    callbackObj.callback.call(callbackObj.self, parseData);
                }else{
                    callbackObj.callback.call(this, parseData);
                };
            };
        });
        if(once.length){
            once = once.reverse();
            once.forEach(function (spliceIndex){
                this.wsCallbackEvent[parseData.method].splice(spliceIndex, 1);
            }, this);
        };
    }else{
        if(parseData && parseData.method && this.debug){
            //console.warn(parseData.method, '此事件未进行处理！');
        };
    };
};
/**
 * websocket message event
 * @param event
 */
Socket.prototype.message = function (event){
    if(typeof event.data == 'string'){
        var parseData = null;
        try {
            parseData = JSON.parse(event.data);
            if(this.debug){
                console.log((new Date()).toLocaleString(), parseData.method, '接收成功！', parseData.data);
            };

            // parseData = JSON.parse(event.data);

            parseData = JSON.parse(event.data);
            if (
            parseData.method == "push_user_order" ||
            parseData.method == "push_user_deal" ||
            parseData.method == "push_deal_order_list" ||
            parseData.method == "push_gamble_user_order"
            ) {
            var s = event.data.replace(/\[([0-9]{19,20})\,/g, '["$1",');
            parseData = JSON.parse(s);
            }

            if (parseData.method == "push_deal_order_list") {
            var s = event.data.replace(/\,([0-9]{19,20})\]/g, ',"$1"]');
            parseData = JSON.parse(s);
            }
        } catch (e){
            parseData = {};
            console.log(e.message);
        };
        this.eventExecute(parseData);
    }else{
        var fileReader = new FileReader();
        var self = this;
        fileReader.addEventListener("load", function (evt){
            var parseData = null;
            try {
                parseData = JSON.parse(fileReader.result);
                if(parseData.method == 'push_user_order' || parseData.method == 'push_user_deal' || parseData.method == 'push_deal_order_list' || parseData.method == 'push_gamble_user_order'){
                    var s = fileReader.result.replace(/\[([0-9]{19,20})\,/g, '["$1",');
                    parseData = JSON.parse(s);
                };

                if(parseData.method == 'push_deal_order_list'){
                    var s = fileReader.result.replace(/\,([0-9]{19,20})\]/g, ',"$1"]');
                    parseData = JSON.parse(s);
                };


                if(self.debug){
                    console.log((new Date()).toLocaleString(), parseData.method, '接收成功！', parseData.data);
                };
            } catch (e){
                parseData = {};
                console.log(fileReader.result);
                console.error(e.message);
            };
            //console.log(parseData);
            self.eventExecute(parseData);
        });
        fileReader.readAsText(event.data)
    };
};

/**
 * 心跳包
 */
Socket.prototype.heart = function (){
    var self = this;
    this.heartTimeout = setTimeout(function (){
        if(self.send("pull_heart", {
                time: new Date().getTime() + '',
            })){
            self.heart();
        };
    }, this.heartTime);
};
/**
 * 开启 websocket
 * @param callback      websocket连接成功或已连接成功的回调方法
 * @returns {WebSocket} return websocket
 */
Socket.prototype.connect = function (callback){
    if(this.ws){
        if(this.ws.readyState == 1 || this.ws.readyState == 0){
            if(callback && typeof callback == 'function'){
                callback.call(this);
            };
            return this.ws;
        };
    };
    var ws = new WebSocket(this.url);
    var self = this;
    ws.addEventListener("open", function (event){
        self.open.call(self, event);
        self.send("pull_heart", {
            time: new Date().getTime() + ''
        });
        self.heart();
        if(callback && typeof callback == 'function'){
            callback.call(self, event);
        };
    });
    ws.addEventListener("close", function(event){
        if(self.debug){
            console.log((new Date()).toLocaleString(), event, 'websocket close !=====================');
        };
        if(self.heartTimeout){
            clearTimeout(self.heartTimeout);
        };
        self.close.call(self, event)
    });

    ws.addEventListener("error", function(event){
        if(self.heartTimeout){
            clearTimeout(self.heartTimeout);
        };
        self.error.call(self, event)
    });
    ws.addEventListener("message", this.message.bind(this));
    this.ws = ws;
    return ws;
};
Socket.prototype.send = function (eventName, param){
    var self = this;
    // console.log( this.ws.readyState + this.ws)
    if(this.ws && this.ws.readyState == 1){
        var data = {"method" : eventName || ""};
        if(param && typeof param == 'object'){
            data.data = param;
        };
        if(self.blobSend){
            var blod = new Blob([JSON.stringify(data)]);
            self.ws.send(blod);
        }else{
            self.ws.send(JSON.stringify(data));
        };
        if(this.debug){
            console.log((new Date()).toLocaleString(), eventName, '已发送');
        };
        return true;
    }else{
        if(this.ws && this.ws.readyState == 0){
            this.ws.addEventListener("open", function (event){
                var data = {"method" : eventName || ""};
                if(param && typeof param == 'object'){
                    data.data = param;
                };
                if(self.blobSend){
                    var blod = new Blob([JSON.stringify(data)]);
                    self.ws.send(blod);
                }else{
                    self.ws.send(JSON.stringify(data));
                };
                if(self.debug){
                    console.log((new Date()).toLocaleString(), eventName, '已发送');
                };
            });
            return this.ws;
        }else{
            console.warn("websocket closed! end");
        };
        return false;
    };
};
export default Socket

