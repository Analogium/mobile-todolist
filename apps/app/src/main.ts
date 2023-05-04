import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Icon } from '@iconify/vue';
import { defineComponent } from 'vue'
import VueBottomNavigation from "bottom-navigation-vue";
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'



import './assets/main.scss'

export default defineComponent({
  components: {
    Icon,
    VueBottomNavigation
  }
})

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)

app.use(router).use(vuetify)


app.mount('#app')
