import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Logon from '@/views/Logon/Logon'
import ProductSearch from '@/views/Product/Search'
import ProductOrder from '@/views/Product/Order'
import ProductCreate from '@/views/Product/Create'
import UserCreate from '@/views/User/Create'
import UserEdit from '@/views/User/Edit'
import UserManage from '@/views/User/Manage'
import UserRemind from '@/views/User/Remind'
import OrderView from '@/views/Order/View'


Vue.use(VueRouter)

const routes = [
  {
    path: '/Logon',
    name: 'Logowanie',
    component: Logon,
    beforeEnter(to, from, next) {
      sessionStorage.removeItem('token');
      next()
    }
  },
  {
    path: '/Product/Search',
    name: 'Lista materiałów',
    component: ProductSearch
  },
  {
    path: '/Product/Create',
    name: 'Dodaj materiały',
    component: ProductCreate
  },
  {
    path: '/Product/Order/:id',
    name: 'Zamawianie materiałów',
    component: ProductOrder
  },
  {
    path: '/User/Create',
    name: 'Stwórz użytkownika',
    component: UserCreate
  },
  {
    path: '/User/Remind',
    name: 'Przypomnij hasło',
    component: UserRemind
  },
  {
    path: '/User/Manage',
    name: 'Zarządzaj użytkownikami',
    component: UserManage
  },
  {
    path: '/User/Edit',
    name: 'Edytuj dane użytkownika',
    component: UserEdit
  },
  {
    path: '/Order/View',
    name: 'Podsumowanie zamówienia',
    component: OrderView
  },
  { //fallback
    path: '*',
    name: '',
    component: ProductSearch
  },
]

const router = new VueRouter({
  routes
})
//todo naprawic

router.beforeEach((to, from, next) => {

 next()
  if (to.path != '/Logon' && to.path != '/User/Create' && to.path != '/User/Remind' && to.path != '/WarehouseChoose') {
    var token = sessionStorage.getItem('token')
        if(!token) {
          next('/Logon')
      }
  } else {
    next();
  }
  store.commit('network/setIsFetching', false, { root: true })
  store.commit('network/setAlertBody', null, { root: true })
  store.commit('product/setProductSearch', null)
});

export default router

