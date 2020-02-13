<template>
    <transition name="message-fade">
        <div class="message-content" v-if="visible">{{msg}}</div>
    </transition>
</template>

<script>
export default {
    name: 'message',
    data(){
        return{
            msg: '',
            visible: false,
            duration: 3000
        }
    },
    mounted() {
        this.startTimer();
    },
    methods: {
        startTimer() {
            setTimeout(() => {
                this.visible = false;
                this.$el.addEventListener('transitionend', this.transitionEnd);
            }, this.duration);
        },
        transitionEnd() {
            this.$nextTick(() => {
                this.$el.removeEventListener('transitionend', this.transitionEnd);
                this.$destroy(true);
                // console.log(this.$el)
                // this.$el.parentNode.removeChild(this.$el);
            });
        }
    }
}
</script>
<style lang="scss" scoped>
.message-content{
    color: #fff;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.7);
    padding: 12px 30px;
    min-width: 180px;
    text-align: center;
    border-radius: 10px;
    z-index: 9999;
}
.message-fade-enter-active {
  transition: all 0.3s ease;
}
.message-fade-leave-active {
  transition: all 0.3s ease;
}
.message-fade-enter,
.message-fade-leave-to {
  transform: translate(-50%, -100%);
  opacity: 0;
}
</style>
