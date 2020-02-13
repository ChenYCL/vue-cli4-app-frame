import Vue from "vue";
import {mapState} from "vuex";
import utilsMethods from './utils';

Vue.mixin({
  computed: {
    ...mapState({
      loginStore: (store) => store.login,
    }),
  },
  methods: {
    ...utilsMethods,
    // 保留4位小数
    numDecimals(num) {
        // return Number.parseFloat(num * 1 || 0).toFixed(4)
        return this.toDecimals(num, 4);
    },
    upperCase(val) {
        return (val + "").toUpperCase();
    },
    // 获取小数位
    toDecimals(val, len) {
        if (val) {
            len = len || 4;
            if (/e-/gi.test(val.toString())) {
                val = val.toString().replace(/e-/gi, "e-");
                let e = val.split("e-");
                e[0] = e[0].replace(/\./, "");
                let l = "0.";
                for (let i = 0; i < e[1] * 1; i++) {
                    l = l + "0";
                }
                val = l + e[0];
            } else {
                val = (val + "").replace(
                    eval("/(-?)([0-9]*)(.?)([0-9]{1," + len + "})(.*)/"),
                    "$1$2$3$4"
                );
            }
            if (/\./.test(val)) {
                val = val.split(".");
                var s = "";
                for (var i = 0; i < len; i++) {
                    if (val[1][i]) {
                        s += val[1][i];
                    }
                }
                return val[0] + "." + s;
            } else {
                val = val + ".";
                for (var i = 1; i <= len; i++) {
                    val = val + "0";
                }
                return val;
            }
        } else {
            return val;
        }
    },
    // 时间搓转时间 
    localDate(date, day, split = "-") {
        if (date) {
            day = day || false;
            date = date + "";
            if (/\./.test(date)) {
                date = date * 1000 + "";
            }
            if (date.length == 10) {
                date = date * 1000;
            }
            var d = new Date(Math.floor(date * 1));
            d = d ? d : new Date();
            if (day) {
                if (day == -1) {
                    return (
                        this.twoLen(d.getMonth() + 1) +
                        split +
                        this.twoLen(d.getDate()) +
                        " " +
                        this.twoLen(d.getHours()) +
                        ":" +
                        this.twoLen(d.getMinutes()) +
                        ":" +
                        this.twoLen(d.getSeconds())
                    );
                } else {
                    return (
                        this.twoLen(d.getHours()) +
                        ":" +
                        this.twoLen(d.getMinutes()) +
                        ":" +
                        this.twoLen(d.getSeconds())
                    );
                }
            } else {
                return (
                    d.getFullYear() +
                    split +
                    this.twoLen(d.getMonth() + 1) +
                    split +
                    this.twoLen(d.getDate()) +
                    " " +
                    this.twoLen(d.getHours()) +
                    ":" +
                    this.twoLen(d.getMinutes()) +
                    ":" +
                    this.twoLen(d.getSeconds())
                );
            }
        } else {
            return "";
        }
    },
    twoLen(val) {
        return val < 10 ? "0" + val : val;
    },
  }
});

