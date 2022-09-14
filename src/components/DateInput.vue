<script setup>
import { ref, onMounted } from 'vue'
defineProps({
  modelValue: {
    type: String,
    default: ''
  },

})
const emit = defineEmits(['update:modelValue'])
const dateMaskInput = ref(null)
const backspace = ref(false)
const slot = '_'
const pattern = '__/__/____'
const patternArray = pattern.split('');
const allowedSelectionPositions = patternArray.map((it, i) => slot === it ? i + 1 : i )
const accept = new RegExp('\\d', 'g');

let prev = ref(pattern);
let el = null;

const isInputValid = (matches) => {
  const matchesString = matches.join('');

  const isMonthValid = () => {
    const month = matchesString.slice(0, 2);
    const monthRegexp = /^(0([1-9]|$)|1([012]|$))$/;
    return month.match(monthRegexp);
  }

  const isDayValid = () => {
    const day = matchesString.slice(2, 4);
    const dayRegexp = /^([012]([1-9]|$)|3([01]|$))$/;
    return !day ? true : day.match(dayRegexp);
  }

  const isYearValid = () => {
    const year = matchesString.slice(4, 8);
    const yearRegexp = /^(1(9|$)|2(0|$))(\d|$){2}$/;
    return !year ? true : year.match(yearRegexp);
  }

  return isMonthValid() && isDayValid() && isYearValid();
}

const getResult = (input) => {
  const matches = input.match(accept) || [];
  if (matches.length && !isInputValid(matches)) {
    return prev.value;
  }

  const result = patternArray.map(it => it === slot ? matches.shift() || it : it ).join('');
  prev.value = result;
  return result;
};

const format = (event) => {
  if (event.type === 'focus' && el.value !== '') {
    return;
  }
  const inputSlicedToSelectionPosition = el.value.slice(0, el.selectionStart);
  const result = getResult(inputSlicedToSelectionPosition);
  const firstEmptySlotIndex = result.indexOf(slot);
  let selectionPosition = ''

  if (firstEmptySlotIndex < 0) {
    selectionPosition = allowedSelectionPositions[allowedSelectionPositions.length - 1];
  } else if (backspace.value) {
    selectionPosition = allowedSelectionPositions[el.selectionStart - 1] || 0;
  } else {
    selectionPosition = firstEmptySlotIndex;
  }

  el.value = result;
  el.setSelectionRange(selectionPosition, selectionPosition);
  backspace.value = false;
  emit('update:modelValue', result)
};

const clear = () => {
  if (el.value === pattern) {
    el.value = ''
  }
}

onMounted(() => {
  el = dateMaskInput.value;
})
</script>

<template>
  <!-- <input
    v-date-picker-mask
    :value="modelValue"
    placeholder="mm/dd/yyyy"
    @input="$emit('update:modelValue', $event.target.value)"
  > -->
  <input
    ref="dateMaskInput"
    :value="modelValue"
    placeholder="mm/dd/yyyy"
    @keydown="backspace = $event.key === 'Backspace'"
    @input="format"
    @focus="format"
    @blur="clear"
  >
</template>

<style lang="scss">
  $input-color: #424242;
  input {
    display: block;
    width: 140px;
    margin: 0 auto;
    padding: 10px 10px 10px 5px;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid $input-color;
    outline: 0;
    color: $input-color;
    font-size: 22px;
    text-align: center;
  }
</style>
