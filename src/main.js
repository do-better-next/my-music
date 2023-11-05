import { createApp } from 'vue'
import App from './App.vue'


import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import './assets/css/index.css'
import 'animate.css';
// https://nostalgic-css.github.io/NES.css/
import "nes.css/css/nes.min.css";
import Vue3Lazy from 'vue3-lazy';
import loading from './assets/img/loading1.gif'
const app = createApp(App)

app.use(Vue3Lazy,{
    loading: loading
});
app.use(ElementPlus)
app.mount('#app')

