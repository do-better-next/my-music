import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/index.css'
import 'animate.css';
import "nes.css/css/nes.min.css";
import Vue3Lazy from 'vue3-lazy';
import loading from './assets/img/loading1.gif'
const app = createApp(App)

app.use(Vue3Lazy,{
    loading: loading
});
app.mount('#app')
