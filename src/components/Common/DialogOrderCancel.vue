<template>
  <v-dialog v-model="dialog" width="600px">
    <template v-slot:activator="{ on }">
      <v-btn class="mb-2" color="default" v-on="on" large>Anuluj zamówienie</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Anulacja zamówienia</span>
      </v-card-title>
      <hr class="mt-0">
        <v-card-text>
          Czy na pewno chcesz usunąc całe zamówienie?
        </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="default" @click="dialog = false">Anuluj</v-btn>
        <v-btn color="#416480" dark @click="oderCancel()">Potwierdź</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    data() {
      return {
        dialog: false,
      }
    },
    methods: {
      oderCancel() {
        this.$store.dispatch('order/orderCancel')
      }
    },
    computed: {
      alertBody() { return this.$store.getters['network/getAlertBody'] || false }
    }
  }
</script>