export const deboune = (Vue) => {
  Vue.directive('debounce', {
    bind(el, binding) {
      el.onclick = debounce((ev) => {
        el.dispatchEvent(new Event('lazyclick'));
        binding.value.ev(binding.value.param);
      }, parseInt(binding.value.delay) || 500);
    },
    update() {
    },
    componentUpdated() {
    },
    unbind(el) {
      el.removeEventListener('lazyclick', () => {
      });
    },
  });
};

function debounce(fn, delay) {
  let timeoutID = null;
  return function () {
    clearTimeout(timeoutID);
    const args = arguments;
    const that = this;
    timeoutID = setTimeout(() => {
      fn.apply(that, args);
    }, delay);
  };
}
