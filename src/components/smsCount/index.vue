<template>
  <section id="smsBtn" :ms="ms" @click="start">
    <slot v-if="status" name="content"></slot>
    <span :style="`${msStyle}`" v-if="!status">{{countms}}s</span>
  </section>
</template>

<script>
  export default {
    name: "smsBtn",
    data () {
      return {
        timer: null,
        isStarted: false,
        status: true,
        countms: ""
      };
    },
    props: ["ms", "fn", "msStyle"],
    mounted () {
      this.countms = this.ms;
    },
    methods: {
      start () {
        if (this.isStarted) return;
        this.isStarted = true;
        if (this.isStarted && this.countms == this.ms) {
          this.$emit("fn");
        }
        this.status = false;
        this.timer = setInterval(() => {
          this.countms -= 1;
          if (this.countms <= 0) {
            this.isStarted = false;
            this.status = true;
            this.countms = this.ms;
            clearInterval(this.timer);
          }
        }, 1000);
      }
    },
    beforeDestroy () {
      clearInterval(this.timer);
    }
  };
</script>

<style scoped lang="scss">
  #smsBtn {
    position: relative;
  }

  .green {
    color: green !important;
    font-size: 12px;
  }

  .hide {
    visibility: hidden;
  }

  .show {
    visibility: visible;
  }

</style>