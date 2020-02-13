<template>
  <transition name="pull-up">
    <div id="sheet" v-if="show">
      <div class="backdrop" @click="show=false">
        <div class="sheet-content">
          <div :key="k" @click.stop="activeIndex=k;choose(item);" :class="activeIndex==k?'active':''"
               v-for="(item,k) in data">{{_key==''?item:item[_key]}}
          </div>
          <div class="cancel"  v-if="activeIndex==null" @click.stop="Destory">取消</div>
          <div class="cancel"  v-if="activeIndex!=null" @click.stop="confirm(data[activeIndex])">确定</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "index",
    data () {
      return {
        show: false,
        activeIndex: null
      }
    },
    props: {
      _key: {
        type: String,
        default: ''
      },
      data: {
        type: Array,
        default: () => {
          return ["BTC", "ETH", "EOS", "USDT"]
        }
      }
    },
    methods: {
      choose (item) {
        this.activeIndex != null ? this.$emit("select", item) : this.$emit("select", null)
      },
      Destory () {
        this.show = false;
        this.activeIndex = null;
      },
      confirm(item){
        this.$emit("confirm", item)
        this.show = false;
        this.activeIndex = null;
      }
    },
  }
</script>

<style scoped lang="scss">


  .pull-up-enter-active, .pull-up-leave-active {
    transition: opacity .5s;

  }

  .pull-up-enter, .pull-up-leave-to {
    opacity: 0;
  }

  .active {
    color: #2AB3FF !important;
  }

  #sheet {
    position: relative;
    z-index: 999;
  }

  .backdrop {
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    font-size: 14px;
    color: white;
    background: rgba(0, 0, 0, .5);


  }

  .sheet-content {
    background: #33408E;
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    max-height: 350px;
    overflow-y: auto;

    div {
      font-size: 14px;
      font-weight: 400;
      color: white;
      padding: 17px 0;
      margin: 0 15px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    }
  }

  .cancel {
    color: #2AB3FF !important;
  }
</style>


