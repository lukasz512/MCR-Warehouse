import Vue from 'vue';

Vue.mixin({
  computed: {
      isFetching() { return this.$store.getters['network/getIsFetching'] || false },
      role() { return localStorage.getItem('role') || null },
      windowWidth() { return this.$store.getters['network/getWindowWidth'] },
      isDesktop() { return this.windowWidth >= 1300 },
      isMobile() { return this.windowWidth < 1300 },
      productSearchUrl() { return this.$route.path.indexOf('/Product/Search') > -1 ? true : false }
    }
})