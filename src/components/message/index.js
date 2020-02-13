import Vue from 'vue';
import MessageComponent from './index.vue';

const Message = Vue.extend(MessageComponent);

let zIndex = 999999;

const MessageFactory = function(options) {
    if (!options) {
        throw new Error('message options is required');
    }

    if (typeof options === 'string') {
        options = {
            msg: options
        };
    }

    const instance = new Message({
        data: options
    });

    instance.id = new Date().getTime() + '' + (Math.random() * 10000 | 0);

    instance.$mount();
    document.body.appendChild(instance.$el);

    instance.visible = true;

    instance.zIndex = ++zIndex;
}

export default MessageFactory;