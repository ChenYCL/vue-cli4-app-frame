<template>
  <div :style="`${column ? 'display:inline-block' : ''};width:${width}%;${wrapper}`" class="_list">
    <ul :style="`${ulStyle}`">
      <li class="t" v-if="title">{{ title }}</li>
      <li
        @click.stop="ev(v)"
        v-for="(v, k) in data"
        :key="k"
        class="_item"
        :style="`${!borderBottom ? 'border:0' : ''}`"
      >
        <div v-if="Object.keys($slots).length == 0">{{ v }}</div>
        <slot :name="`${k}`"></slot>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'index',
  props: {
    column: {
      // 列表排列 默认竖向
      type: Boolean,
      default: () => true,
    },
    wrapper: {
      // 容器样式 可选
      style: String,
      defalut: '',
    },
    top: {
      // 内容 padding-top
      type: [Number, String],
      default: 15,
    },
    bottom: {
      // 内容 paddint-bottom
      type: [Number, String],
      default: 15,
    },
    title: {
      // 顶部标题
      type: String,
      default: () => '收益',
    },
    width: {
      // 列表宽度
      type: [Number, String],
      default: 100,
    },
    data: {
      // 渲染数据
      type: Array,
      default: () => [1, 2, 3, 4, 5, 6, 7, 8],
    },
    borderBottom: {
      // 列表下边框显示控制
      type: Boolean,
      default: true,
    },
    ulStyle: {
      // ul 内联样式
      type: String,
      default: '',
    },
  },
  data() {
    return {};
  },
  methods: {
    ev(v) {
      this.$emit('ev', v);
    },
  },
};
</script>

<style scoped lang="scss">
ul {
  padding: 0 auto(30);
}

._list {
  background: transparent;
}

.t {
  padding: 10px 0;
  font-weight: 400;
  color: $base6;
}

._item {
  padding: 15px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
