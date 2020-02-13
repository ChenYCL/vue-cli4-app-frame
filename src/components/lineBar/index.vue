<template>
  <div :style="`background:${color};height: ${h}px;`"></div>
</template>

<script>
/**
   *  <t-bar h=10 color='red'/>
   */
import styles from '@/assets/scss/config.module.scss';

export default {
  name: 'index',
  props: {
    color: { // 背景色
      type: String,
      default: styles.home_bg,
    },
    h: { // 高度
      type: Number || String,
      default: 10,
    },
  },
};
</script>

<style scoped lang="scss">

</style>
