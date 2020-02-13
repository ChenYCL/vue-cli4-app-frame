<template>
    <v-container fluid fill-height :style="`background:${color}`" class="empetall">
        <v-layout justify-center align-center row wrap>
            <v-card-text class="text-xs-center font1" >
                <slot>{{text || '暂无数据'}}</slot>
            </v-card-text>
        </v-layout>
    </v-container>
</template>
<script>
    export default {
        name: "load",
        props: {
            color: {
                type: String,
                default: () => {
                    return "#272E73";
                }
            },
            text: {
                type: String,
                default: () => {
                    return ''
                }
            }
        }
    };
</script>
<style scoped lang="scss">

    .custom-loader {
        animation: loader 1s infinite;
        display: flex;
    }

    @keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    .font1{
        color:$base6
    }
    .empetall{
        // border: 1px solid red;
        margin-top: 20px;

    }
</style>
