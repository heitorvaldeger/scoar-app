import Vue from 'vue'
import { required } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import PortalVue from 'portal-vue'
import Notifications from 'vue-notification'

Vue.use(PortalVue)
Vue.use(Notifications)

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} não pode ser vazio'
})

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
Vue.config.devtools = true
