import Inputmask from 'inputmask';

export default {
  mounted(el, binding) {
    Inputmask({
      showMaskOnHover: false,
      alias: 'datetime',
      min: '01/01/1900',
      max: '01/01/2025',
      inputFormat: 'mm/dd/yyyy',
      placeholder: '__/__/____',
      insertModeVisual: false,
      ...binding.value,
    }).mask(el);
  },
}
