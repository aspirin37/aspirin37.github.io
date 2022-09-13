<script setup>
import DateInput from './components/DateInput.vue';
import { ref } from 'vue';
const dateOfBirth = ref('');
</script>

<template>
  <main>
    <date-input v-model="dateOfBirth" />
  </main>
</template>

<style lang="scss">
  main {
    display: flex;
    padding-top: 20px;
  }
</style>
