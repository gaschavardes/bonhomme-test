import { createApp } from 'vue'
import App from './App.vue'

import store from './assets/js/store'
import { RAFCollection } from './assets/js/utils'
import GlobalEvents from './assets/js/utils/GlobalEvents'

createApp(App).mount('#app')


store.RAFCollection = new RAFCollection()
GlobalEvents.enableRAF(true)