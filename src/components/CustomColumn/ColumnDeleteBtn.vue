<template>
    <section>
        <v-icon @click="deleteProduct(item.id)" class="btn d-none d-lg-block">mdi-delete</v-icon>
        <v-btn @click="deleteProduct(item.id)" large class="d-block d-lg-none w-100 mb-2">Usuń {{btnTitle}}</v-btn>
    </section>
</template>

<script>
/* eslint-disable */
  export default {
    props: {
        item: {
            type: Object,
            required: true
        },
        btnTitle: {
            type: String,
            required: true
        },
    },
    data() {
      return {
      }
    },
    methods: {
        deleteProduct(id) {
            deleteItemFromIDB('products', id)
            this.$store.dispatch('order/fetchProductsIDB')
            var data = {
                message: 'Usunięto produkt',
                type: 'success'
            }
            this.$store.commit('network/setAlertBody', data)
        }
    },

  }
</script>