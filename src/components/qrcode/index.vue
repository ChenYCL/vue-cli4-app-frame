<template>
    <section class="qrcode" style="text-align: center">
        <a :href="url" :download="(new Date()).getTime()"  @click="toewm(url, $event)">
            <img :src="url" alt="">
        </a>
    </section>
</template>

<script>
import QRCode from 'qrcode';

export default {
  name: 'qrcode',
  data() {
    return {
      url: '',
    };
  },
  props: {
    value: {
      default: '',
    },
    size: {
      default: 300,
    },
  },
  watch: {
    value(n, o) {
      this.setEwm(n);
    },
  },
  mounted() {
    if (this.value) {
      this.setEwm(this.value);
    }
  },
  methods: {
    toewm(url, event) {
      // console.log(url.replace(/data\:image\/png\;base64\,/, ""));
      if (typeof plus === 'object') {
        console.log(typeof plus === 'object', 'typeof plus == "object"');
        event.preventDefault();
        const bitmap = new plus.nativeObj.Bitmap('test');
        bitmap.loadBase64Data(url.replace(/data\:image\/png\;base64\,/, ''), () => {
          console.log('加载Base64图片数据成功');
          bitmap.save(`_downloads/ewm-${Date.now()}.png`, {},
            (e) => {
              // alert("保存图片成功\n" + e.target);
              console.log(`保存图片成功：${JSON.stringify(e)}`);
            },
            (e) => {
              console.log(`保存图片失败：${JSON.stringify(e)}`);
            });
        }, () => {
          console.log(`加载Base64图片数据失败：${JSON.stringify(e)}`);
        });
      }
    },
    setEwm(val) {
      QRCode.toDataURL(val, {
        margin: 1,
        width: this.size,
      })
        .then((url) => {
          this.url = url;
          this.$emit('change', url);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>
