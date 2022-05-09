/* eslint-disable */
import router from "../../../router";

const state = {
  products: [],
  isValidated: true
};

const mutations = {
  setProducts: (state, data) => { state.products = data },
  setIsValidated: (state, data) => { state.isValidated = data },
};

const getters = {
  getProducts: state => state.products,
  getIsValidated: state => state.isValidated,
};

const actions = {
    fetchProductsIDB({ commit }) {
        readAllDataDB('products')
            .then(function (data) {
                commit('setProducts', data)
            })
    },

    orderCancel({ commit }) {
        clearAllDataIDB('products')
        return router.push({ path: '/Product/Search/' })
            .then(() => {
                var data = {
                    message: 'Zamówienie zostało anulowane',
                    type: 'success'
                  }
                  commit('network/setAlertBody', data, { root: true })
        }) 
    },
  orderConfirm({ commit }, id) {
    return db.collection('userData').doc(auth.currentUser.email).get()
      .then(snapshot => { 
        var userData = snapshot.data()
        return userData
      })
      .then(userData => {
        db.collection('orders').doc(id).set({
          products: this.getters['order/getProducts'],
          user: userData,
          operationType: {
            subject: "MCR Magazyn | Nowe zamówienie",
            mailTitle: "Nowe zamówienie:",
            productsType: "Zamówione produkty:",
            isProductOrder: true // to check if this is utilization
          }
        })
      })
      .then(() => {
        readAllDataDB('products')
          .then(productList => {
            productList.forEach(doc => {
                db.collection(doc.warehouse).doc(doc.id).set({
                  productImage: doc.productImage,
                  productName: doc.productName,
                  createDate: doc.createDate,
                  expiryDate: doc.expiryDate,
                  productCode: doc.productCode,
                  productCategory: doc.productCategory,
                  productMedicine: doc.productMedicine,
                  productLine: doc.productLine,
                  productQuantity: (parseInt(doc.productQuantity) - parseInt(doc.orderQuantity)).toString()
                })
            })
        })
      })
      .then(() => {
      return router.push({ path: '/Product/Search/' })
      .then(() => {
      clearAllDataIDB('products')
      var data = {
          message: 'Zamówienie zostało sfinalizowane',
          type: 'success'
        }
        commit('network/setAlertBody', data, { root: true })
      }) 
      })
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

