<script setup>
defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})
defineEmits(['update:modelValue'])
</script>

<template>
  <input
    v-date-picker-mask
    :value="modelValue"
    placeholder="mm/dd/yyyy"
    @input="$emit('update:modelValue', $event.target.value)"
  >
</template>

<style lang="scss">
  $input-color: #424242;
  input {
    margin: 0 auto;
    color: $input-color;
    font-size: 22px;
    padding: 10px 10px 10px 5px;
    display: block;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid $input-color;
    outline: 0;
  }
</style>
