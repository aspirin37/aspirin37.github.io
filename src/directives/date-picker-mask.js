import Inputmask from 'inputmask';

export default {
  mounted(el, binding) {
    Inputmask({
      showMaskOnHover: false,
      alias: 'datetime',
      inputFormat: 'mm/dd/yyyy',
      placeholder: '__/__/____',
      ...binding.value,
    }).mask(el);
  },
}
