<template>
    <span class="copy-component" v-clipboard:copy="val" v-clipboard:success="onCopy" v-clipboard:error="onError"><slot>复制</slot></span>
</template>
<script>
    import Vue from 'vue';
    import VueClipboard from 'vue-clipboard2';
    Vue.use(VueClipboard);
    export default {
        name: "copy",
        props : {
            val : {
                default : ''
            }
        },
        methods : {
            onCopy (e){
                this.$message({msg: '复制成功'});
            },
            onError (e){
                this.$message({msg: e.message || '复制失败'});
            },
        }
    }
</script>
<style scoped>
    .copy-component{
        display: inline-block;
        font-style: normal;
    }
</style>
