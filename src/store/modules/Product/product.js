/* eslint-disable */
import router from "../../../router";

const state = {
  results: [],
  productData: null,
  productSearch: null,
};

const mutations = {
  setResults: (state, data) => {
    state.results = data
  }, // for clearing
  addResult(state, data) {
    state.results.push(data)
  }, // for storing
  setProductData: (state, data) => {
    state.productData = data
  },
  setProductSearch: (state, data) => {
    state.productSearch = data
  },
};

const getters = {
  getResults: state => state.results,
  getProductData: state => state.productData,
  getProductSearch: state => state.productSearch,
};

const actions = {
  fetchDetails({
    commit,
    dispatch
  }, warehouse) {
    commit('setResults', [])
    commit('network/setIsFetching', true, {
      root: true
    })
    db.collection(warehouse).get()
      .then(snapshot => {
        dispatch('setupProducts', snapshot.docs)
        commit('network/setIsFetching', false, {
          root: true
        })
      })
      .catch(err => {
        commit('network/setIsFetching', false, {
          root: true
        })
        console.log('err: ', err)
      })
  },

  fetchProductData({
    commit
  }, data) {
    var orderId = data.orderId
    var warehouse = data.warehouse
    commit('setProductData', null)
    commit('network/setIsFetching', true, {
      root: true
    })
    db.collection(warehouse).doc(orderId).get()
      .then(snapshot => {
        var product = snapshot.data()
        commit('setProductData', product)
        commit('network/setIsFetching', false, {
          root: true
        })
      })
      .catch(err => {
        commit('network/setIsFetching', false, {
          root: true
        })
        console.log('err: ', err)
      })
  },

  setupProducts({
    commit
  }, data) {
    commit('network/setIsFetching', true, {
      root: true
    })
    data.forEach(doc => {
      var productData = doc.data()
      productData.id = doc.id
      commit('addResult', productData)
    })
    commit('network/setIsFetching', false, {
      root: true
    })
  },

  createProduct({
    commit
  }, e) {
    var productWarehouse = e.warehouse
    var productData = {
      createDate: e.createDate,
      expiryDate: e.expiryDate,
      productCategory: e.productCategory,
      productCode: e.productCode,
      productLine: e.productLine,
      productMedicine: e.productMedicine,
      productName: e.productName,
      productQuantity: e.productQuantity,
      productImage: e.productImage
    }
    commit('network/setIsFetching', true, {
      root: true
    })
    db.collection(productWarehouse).add(productData)
      .then(() => {
        commit('network/setIsFetching', false, {
          root: true
        })
        var data = {
          message: 'Zapisano produkt',
          type: 'success'
        }
        commit('network/setAlertBody', data, {
          root: true
        })
      })
      .catch(err => {
        commit('network/setIsFetching', false, {
          root: true
        })
        console.log('err: ', err)
      })
  },

  deleteProduct({
    commit,
    dispatch
  }, data) {
    commit('network/setIsFetching', true, {
      root: true
    })
    let productId = data.id
    let warehouse = data.warehouse
    let orderId = new Date().toISOString()
    let userData
    let productData

    return db.collection('userData').doc(auth.currentUser.email).get()
      .then(snapshot => {
        return userData = snapshot.data()
      })
      .then(() => {
        return db.collection(warehouse).doc(productId).get()
      })
      .then(snapshot => {
        return productData = snapshot.data()
      })
      .then(() => {
        return db.collection('orders').doc(orderId).set({
          products: [productData],
          user: userData,
          operationType: {
            subject: "MCR Magazyn | Utylizacja produktu",
            mailTitle: "Zlecenie utylizacji:",
            productsType: "Utylizowane produkty:",
            isProductOrder: false // check if utilization / order
          }
        })
      })
      .then(() => {
        return db.collection(warehouse).doc(productId).delete()
      })
      .then(() => {
        var data = {
          message: 'Produkt został usunięty',
          type: 'success'
        }
        commit('network/setAlertBody', data, {
          root: true
        })
        commit('network/setIsFetching', false, {
          root: true
        })
        dispatch('fetchDetails', warehouse)
      })
      .catch(err => {
        var data = {
          message: 'Wystąił błąd, spróbuj później',
          type: 'error'
        }
        commit('network/setAlertBody', data, {
          root: true
        })
        commit('network/setIsFetching', false, {
          root: true
        })
        console.log('err: ', err)
      })
  },

  updateProduct({
    getters,
    commit
  }, data) {
    let productId = data.id
    let warehouse = data.warehouse
    commit('network/setIsFetching', true, {
      root: true
    })
    db.collection(warehouse).doc(productId).set({
        productImage: getters.getProductData.productImage,
        productName: getters.getProductData.productName,
        //todo poprawic date
        createDate: getters.getProductData.createDate,
        expiryDate: getters.getProductData.expiryDate,
        productCode: getters.getProductData.productCode,
        productCategory: getters.getProductData.productCategory,
        productMedicine: getters.getProductData.productMedicine,
        productLine: getters.getProductData.productLine,
        productQuantity: getters.getProductData.productQuantity
      })
      .then(() => {
        var data = {
          message: 'Produkt został zmodyfikowany',
          type: 'success'
        }
        commit('network/setAlertBody', data, {
          root: true
        })
        commit('network/setIsFetching', false, {
          root: true
        })
      })
      .catch(err => {
        var data = {
          message: 'Wystąił błąd, spróbuj później',
          type: 'error'
        }
        commit('network/setAlertBody', data, {
          root: true
        })
        commit('network/setIsFetching', false, {
          root: true
        })
        console.log('err: ', err)
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