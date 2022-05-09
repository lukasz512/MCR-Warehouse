import Vue from 'vue'
import Vuex from 'vuex'
import VueMoment from 'vue-moment'
import network from '@/store/utils/network'
import tableHeaders from '@/store/utils/tableHeaders'
import ImageUploader from 'vue-image-upload-resize'
import Lightbox from 'vue-easy-lightbox'


import logon from '@/store/modules/Logon/logon'
import product from '@/store/modules/Product/product'
import user from '@/store/modules/User/user'

import order from '@/store/modules/Order/order'


Vue.use(Vuex)
Vue.use(VueMoment)
Vue.use(ImageUploader)
Vue.use(Lightbox)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    network,
    tableHeaders,
    logon,
    product,
    user,
    order,
  }
})