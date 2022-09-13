import { createApp } from 'vue';
import App from './App.vue';
import DatePickerMask from './directives/date-picker-mask'

createApp(App)
  .directive('date-picker-mask', DatePickerMask)
  .mount('#app');
