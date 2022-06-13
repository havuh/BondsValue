import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { store } from './store'
import { loadFonts } from './plugins/webfontloader'
import router from './router'

loadFonts()

createApp(App).use(router)
  .use(vuetify)
    .use(store)
  .mount('#app')
