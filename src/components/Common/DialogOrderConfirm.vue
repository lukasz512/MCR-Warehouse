<template>
  <v-dialog v-model="dialog" width="600px">
    <template v-slot:activator="{ on }">
      <v-btn color="#416480" dark class="mr-lg-2 mb-2" v-on="on" large >Potwierdź zamówienie</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Potwierdzenie zamówienia</span>
      </v-card-title>
      <hr class="mt-0">
        <v-card-text>
          Przed finalizacją zamówienia sprawdź zamówione produkty oraz ich ilość.
        </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="default" @click="dialog = false">Anuluj</v-btn>
        <v-btn color="#416480" dark @click="orderConfirm">Potwierdź</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        dialog: false,
      }
    },
    computed: {
      ...mapGetters('order', {
           isValidated: 'getIsValidated'
      })
    },
    methods: {
      orderConfirm() {
        if(this.isValidated === true) {
          var id = new Date().toISOString()
          this.$store.dispatch('order/orderConfirm', id)
        } else {
          var alert = {
            message: 'Popraw zamówienie',
            type: 'error'
          }
          this.$store.commit('network/setAlertBody', alert)
        }
        this.dialog = false
      }
    }
  }
</script>