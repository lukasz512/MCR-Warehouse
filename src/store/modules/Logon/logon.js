/* eslint-disable */
import router from '@/router'

const state = {
   // token: null,
  };
  
  const mutations = {
    // setToken: (state, data) => { state.token = data },
  };
  
  const getters = {
    // getToken: state => state.token,
  };


const actions = {
  signIn({ commit, dispatch }, data) {
        localStorage.removeItem('role')
        commit('network/setIsFetching', true, { root: true })
        let email = data.email
        let password = data.password
        auth.signInWithEmailAndPassword(email, password)
          .then(cred => {
            console.log(cred)
            if (cred.user.emailVerified) {
              sessionStorage.setItem('token', cred)
              var data = {
                message: 'Zalogowano',
                type: 'success'
              }
              commit('network/setAlertBody', data, { root: true })
              dispatch('checkUserRole', cred.user.email)
              clearAllDataIDB('products')
              commit('network/setIsFetching', false, { root: true })
            } else {
              auth.signOut()
              commit('network/setIsFetching', false, { root: true })
              var data = {
                message: 'Nie zweryfikowano adresu e-mail.',
                type: 'error'
              }
              commit('network/setAlertBody', data, { root: true })
          }
          })
          .catch(err => {
            console.log('err: ', err)
            var data = {
              message: err,
              type: 'error'
            }
            commit('network/setAlertBody', data, { root: true })
            commit('network/setIsFetching', false, { root: true })
        })
    },
    logOut({ commit }) {
        auth.signOut()
          .then(function () {
            sessionStorage.removeItem('token')
            localStorage.removeItem('role')
          var data = {
            message: 'Zostałeś wylogowany',
            type: 'info'
          }
          commit('network/setAlertBody', data, { root: true })
        })
          .then(() => {
            commit('network/setIsFetching', false, { root: true })
      })
  },
  checkUserRole({ commit, dispatch }, user) {
      commit('network/setIsFetching', true, { root: true })
    db.collection('userData').doc(user).get()
      .then(snapshot => {
        return snapshot.data()
      })
      .then(user => {
        localStorage.setItem('role', user.role)
        commit('network/setIsFetching', false, { root: true })
        if (user.role === 'Nieaktywny') {
          var data = {
            message: 'Konto zablokowane - skontaktuj się z administratorem',
            type: 'info'
          }
          setTimeout(() => {
            dispatch('logOut')
          }, 6000);
          commit('network/setAlertBody', data, { root: true })
        } else if(user.firstName == '') {
             router.push('/User/Edit')
             commit('network/setTempTitle', 'Uzupełnij profil użytkownika', {root: true})  
          } else {
            router.push('/Product/Search')
          }
        })
        .catch(err => {
          commit('network/setIsFetching', false, { root: true })
          console.log('err: ', err)
            var data = {
              message: err,
              type: 'error'
            }
          commit('network/setAlertBody', data, { root: true })
          commit('network/setIsFetching', false, { root: true })
      })
  }
};
export default {
    namespaced: true,
    router,
    state,
    mutations,
    actions,
    getters
};

