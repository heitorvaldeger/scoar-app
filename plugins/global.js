import Vue from 'vue'
import { required } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import PortalVue from 'portal-vue'

Vue.use(PortalVue)

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} não pode ser vazio'
})

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
