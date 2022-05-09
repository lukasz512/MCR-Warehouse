/* eslint-disable */
import router from '@/router'

const state = {
    isFetching: false,
    alertBody: null,
    tempTitle: '',
    windowWidth: 0,
};

const mutations = {
    setIsFetching: (state, data) => { state.isFetching = data },
    setAlertBody: (state, data) => { state.alertBody = data },
    setTempTitle: (state, data) => { state.tempTitle = data },
    setWindowWidth(state, data) { state.windowWidth = data },
};

const getters = {
    getIsFetching: state => state.isFetching,
    getAlertBody: state => state.alertBody,
    getTempTitle: state => state.tempTitle,
    getWindowWidth: state => state.windowWidth,
};

const actions = {
    windowResize({ commit }) {
        commit('setWindowWidth', window.innerWidth)
    },
};
export default {
  namespaced: true,
  router,
  state,
  mutations,
  actions,
  getters
};

