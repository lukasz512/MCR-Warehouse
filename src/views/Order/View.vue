<template>
  <main>
  <main-navbar :title="title" />
  <mobile-title :title="title" />
    <v-container>
      <v-card :elevation="isDesktop ? 10 : 0">
        <section v-if="products.length > 0">
          <table-view v-if="isDesktop" :products="products" :headers="headers" />
          <iterator-view v-if="isMobile" :products="products" :headers="headers" />
        </section>
        <section v-else >
          <div class="d-none d-md-block">
            <br><br><br>
          </div>
            <v-card :elevation="isDesktop ? 0 : 10 " class=" py-5 mb-4 py-md-12 px-md-12 text-center text-muted">
                <h1 class="mt-5">Zamówienie puste</h1>
                <h3 class="mb-8">Przejdź do wyszukiwarki materiałów reklamowych<br> i dodaj produkty do zamówienia.</h3>
                <v-btn color="#416480" class="mb-10 mt-5" @click="$router.push('Product/Search')" large dark>Przejdź do wyszukiwarki</v-btn>
            </v-card>
          <div class="d-none d-md-block">
            <br><br><br>
          </div>
        </section>
      <order-view-footer v-if="products.length > 0 && !productSearchUrl" />
      </v-card>
    </v-container>
  </main>
</template>

<script>
import MainNavbar from '@/components/Navbar/MainNavbar'
import MobileTitle from '@/components/Common/MobileTitle'
import TableView from '@/components/ProductsIteration/TableView'
import IteratorView from '@/components/ProductsIteration/IteratorView'
import OrderViewFooter from '@/components/CustomFooters/OrderView'

  export default {
    data() {
      return {
        title: 'Podsumowanie zamówienia' 
      }
    },
    components: {
      MainNavbar,
      MobileTitle,
      TableView,
      IteratorView,
      OrderViewFooter,
    },
    computed: {
      products() { return this.$store.getters['order/getProducts'] || [] },
      headers() { return this.$store.getters['tableHeaders/getOrderViewHeaders'] || []}
    },
    beforeMount() {
        this.$store.dispatch('order/fetchProductsIDB')
    },
  }
</script>