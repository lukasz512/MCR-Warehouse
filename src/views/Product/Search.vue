<template>
  <main>
  <main-navbar :title="title" />
  <mobile-title :title="title" />
    <v-container >
      <v-card :loading="isFetching" :elevation="isDesktop ? 10 :0">
        <v-tabs grow>
      <v-tab
       v-if="role !== 'Medyczny'"
       :disabled="isFetching"
       @click="refreshWarehouse('products')"
       >
        Promocyjne
      </v-tab>
      <v-tab 
        v-if="role !== 'Kam'"
       :disabled="isFetching"
        @click="refreshWarehouse('nonPromoProducts')"
        >
        Niepromocyjne
      </v-tab>
      <v-tab-item>
        <table-view v-if="isDesktop" :warehouse="'products'" :products="products" :headers="headers" />
        <iterator-view v-if="isMobile" :warehouse="'products'" :products="products" :headers="headers" />
      </v-tab-item>
      <v-tab-item>
        <table-view v-if="isDesktop" :warehouse="'nonPromoProducts'" :products="products" :headers="headers" />
        <iterator-view v-if="isMobile" :warehouse="'nonPromoProducts'" :products="products" :headers="headers" />
      </v-tab-item>
    </v-tabs>
      </v-card>
    </v-container>
  </main>
</template>

<script>
import MainNavbar from '@/components/Navbar/MainNavbar'
import MobileTitle from '@/components/Common/MobileTitle'
import TableView from '@/components/ProductsIteration/TableView'
import IteratorView from '@/components/ProductsIteration/IteratorView'

  export default {
    data() {
      return {
        title: 'Wyszukiwarka zasobów',
        initWarehouse: null
      }
    },
    components: {
      MainNavbar,
      MobileTitle,
      TableView,
      IteratorView
    },
    computed: {
      products() { return this.$store.getters['product/getResults'] ? this.$store.getters['product/getResults'] : [] },
      headers() { return this.$store.getters['tableHeaders/getProductSearchHeaders'] ? this.$store.getters['tableHeaders/getProductSearchHeaders'] : []},
    },
    methods: {
      refreshWarehouse (warehouse) {
        this.$store.dispatch('product/fetchDetails', warehouse)
      },
      checkWarehouse() {
       if(this.role == 'Medyczny') {
         this.initWarehouse = 'nonPromoProducts'
       } else {
         this.initWarehouse = 'products'
       }
      }
    },
    beforeMount() {
      this.checkWarehouse()
    },
    mounted() {
        this.$store.dispatch('product/fetchDetails', this.initWarehouse)
    },
  }
</script>