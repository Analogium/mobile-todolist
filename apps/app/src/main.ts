import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Icon } from '@iconify/vue';
import { defineComponent } from 'vue'
import VueBottomNavigation from "bottom-navigation-vue";



import './assets/main.scss'

export default defineComponent({
    components: {
      Icon,
      VueBottomNavigation
    }
  })

const app = createApp(App)


app.use(router)


app.mount('#app')
