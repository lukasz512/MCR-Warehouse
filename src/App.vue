<template>
  <v-app>
    <v-content>
      <snackbar />
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Snackbar from '@/components/Snackbar/Snackbar'

export default {
  name: 'App',
  data: () => ({
    //
  }),
  components: {
      Snackbar
  },
  methods: {
    resize () {
      this.$store.dispatch('network/windowResize')
    }
  },
  beforeMount() {
    this.resize()
    window.addEventListener('resize', function() {
        this.resize
        // todo watch na size
    })
	},
  destroyed() {
    this.$store.dispatch('logon/logOut')
  }
};
</script>
