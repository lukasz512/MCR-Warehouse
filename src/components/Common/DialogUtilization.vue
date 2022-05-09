<template>
  <v-dialog v-model="dialog" width="600px">
    <template v-slot:activator="{ on }">
      <v-btn class="w-100 mb-3" color="default" v-on="on">Utylizacja</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Utylizacja materiałów</span>
      </v-card-title>
      <hr class="mt-0">
        <v-card-text>
          Czy na pewno chcesz usunąć produkt: <b>{{item.productName}}</b> <br>
          Tej akcji nie będzie można cofnąć.
        </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="default" @click="dialog = false">Anuluj</v-btn>
        <v-btn color="#416480" dark @click="utilization(item.id)">Utylizuj</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: {
        item: {
            type: Object,
            required: true
        },
        warehouse: {
            type: String,
            required: true
        },
    },
    data() {
      return {
        dialog: false,
      }
    },
    methods: {
      utilization(id) {
        this.dialog = false
        this.$store.dispatch('product/deleteProduct', {id: id, warehouse: this.warehouse })
      }
    },
    computed: {
      alertBody() { return this.$store.getters['network/getAlertBody'] || false },
    }
  }
</script>