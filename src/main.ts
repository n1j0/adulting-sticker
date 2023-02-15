import { createApp } from 'vue'
import App from '@/App.vue'
import { VueFire, VueFireAuth } from 'vuefire'

import { firebaseApp } from '@/firebase'
import router from '@/router'

import 'bulma/css/bulma.min.css'

const app = createApp(App)
app.use(router)
app
    .use(VueFire, {
        firebaseApp,
        modules: [
            VueFireAuth(),
        ],
    })

app.mount('#app')
