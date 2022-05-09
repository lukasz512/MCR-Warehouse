import router from "../../../router"

/* eslint-disable */
const state = {
  userData: null,
  usersForManage: null
};

const mutations = {
  setUserData: (state, data) => {state.userData = data},
  setUsersForManage: (state, data) => { state.usersForManage = data },
  addUserForManage(state, data) { state.usersForManage.push(data) }, // for storing
};

const getters = {
  getUserData: state => state.userData,
  getUsersForManage: state => state.usersForManage,
};

const actions = {
  create({ commit }, data) {
    commit('network/setIsFetching', true, { root: true })
    let email = data.email
    let password = data.password
    auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        var user = auth.currentUser;
        user.sendEmailVerification()
          .then(() => {
            db.collection('userData').doc(email).set({
              firstName: '',
              lastName: '',
              email: email,
              phoneNumber: '',
              address: '',
              role: 'Kam'
            })
            router.push('/Product/Search')
          })
          .then(function () {
             var data = {
              message: 'Wysłaliśmy e-mail weryfikacyjny. Potwierdź tożsamość, a potem zaloguj się do aplikacji.',
              type: 'info'
            }
            commit('network/setAlertBody', data, { root: true })
            commit('network/setIsFetching', false, { root: true })
          })
      }) 
      .catch(err => {
        var data = {
          message: 'Wystąpił błąd, spróbuj później',
          type: 'error'
        }
        commit('network/setAlertBody', data, { root: true })
        console.log('err: ', err)
      })
  },

  fetchUserData({ commit }) {
    var user = auth.currentUser.email
    commit('network/setIsFetching', true, { root: true })
    db.collection('userData').doc(user).get()
    .then(snapshot => {
      var user = snapshot.data()
      commit('setUserData', user)
      commit('network/setIsFetching', false, { root: true })
    })
    .catch(err => {
      commit('network/setIsFetching', false, { root: true })
      console.log('err: ', err)
    })
  },

  editUserRole({ commit }, user) {
    commit('network/setIsFetching', true, { root: true })
    db.collection('userData').doc(user.id).set({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.id,
      phoneNumber: user.phoneNumber,
      address: user.address,
      role: user.role
    })
      .then(function () {
        commit('network/setIsFetching', false, { root: true })
        var data = {
          message: 'Zmieniono dane użytkownika',
          type: 'success'
        }
        commit('network/setAlertBody', data, { root: true })
      }).catch(function () {
        commit('network/setIsFetching', false, { root: true })
        var data = {
          message: 'Wystąpił błąd, spróbuj później',
          type: 'error'
        }
        commit('network/setAlertBody', data, { root: true })
      },
    )
  },

  fetchUsersForManage({ commit, dispatch }) {
    commit('setUsersForManage', [])
    commit('network/setIsFetching', true, { root: true })
    db.collection('userData').get()
    .then(snapshot => {
      dispatch('setupUsersFormManage', snapshot.docs)
      commit('network/setIsFetching', false, { root: true })
    })
    .catch(err => {
      commit('network/setIsFetching', false, { root: true })
      console.log('err: ', err)
  })
  },

  updateUserData({ commit }) {
    commit('network/setIsFetching', true, { root: true })
    var user = auth.currentUser
    var userEmail = auth.currentUser.email
    var firstName = this.getters['user/getUserData'].firstName
    var lastName = this.getters['user/getUserData'].lastName
    var displayName = firstName + ' ' + lastName
    var phoneNumber = this.getters['user/getUserData'].phoneNumber
    var address = this.getters['user/getUserData'].address
    var role = this.getters['user/getUserData'].role
    return user.updateProfile({
      displayName: displayName
    }).then(function() {
      db.collection('userData').doc(userEmail).set({
        firstName: firstName,
        lastName: lastName,
        email: userEmail,
        phoneNumber: phoneNumber,
        address: address,
        role: role
      })
    })
      .then(function () {
        commit('network/setIsFetching', false, { root: true })
        var data = {
          message: 'Zmieniono dane użytkownika',
          type: 'success'
        }
        commit('network/setAlertBody', data, { root: true })
        setTimeout(function () {
          router.push('/Product/Search')
        }, 3000)
      }).catch(function (e) {
        commit('network/setIsFetching', false, { root: true })
        var data = {
          message: e,
          type: 'error'
        }
        commit('network/setAlertBody', data, { root: true })
      },
    )
  },

  fetchUsersForManage({ commit, dispatch }) {
    commit('setUsersForManage', [])
    commit('network/setIsFetching', true, { root: true })
    db.collection('userData').get()
    .then(snapshot => {
      dispatch('setupUsersFormManage', snapshot.docs)
      commit('network/setIsFetching', false, { root: true })
    })
    .catch(err => {
      commit('network/setIsFetching', false, { root: true })
      console.log('err: ', err)
  })
  },

  setupUsersFormManage({ commit }, data) {
    commit('network/setIsFetching', true, { root: true })
    data.forEach(doc => {
      var userData = doc.data()
      userData.id = doc.id
      commit('addUserForManage', userData)
    })
    commit('network/setIsFetching', false, { root: true })
  },
  
  passwordReset({ commit }, email) {
    commit('network/setIsFetching', true, { root: true })
    auth.sendPasswordResetEmail(email)
      .then(function () {
        router.push('/Logon')
        commit('network/setIsFetching', false, { root: true })
        var data = {
          message: 'Na podany e-mail wysłano link do resetu hasła',
          type: 'success'
        }
        commit('network/setAlertBody', data, { root: true })
      })
      .catch(function () {
        commit('network/setIsFetching', false, { root: true })
        var data = {
          message: 'Wystąpił błąd, spróbuj później',
          type: 'error'
        }
        commit('network/setAlertBody', data, { root: true })
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