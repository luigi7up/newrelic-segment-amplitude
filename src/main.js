
//Note: Importing  "@/assets/scss/app.scss" in the vue.config

// Native UI Fontshttps://www.naiveui.com/en-US/os-theme/docs/fonts
// General Font
import 'vfonts/Lato.css'
// Monospace Font
import 'vfonts/FiraCode.css'
// then it works
// in your js
// import 'vfonts/{font-name}.css'

import naive from "naive-ui";

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'



var app = createApp(App)

app.use(router)
app.use(naive);
app.mount('#app') 






