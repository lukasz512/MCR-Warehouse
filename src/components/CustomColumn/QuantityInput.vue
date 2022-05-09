<template>
    <section>
        <v-text-field ref="quantityInput" :rules="onlyNumbers" class="quantity w-100" @blur="changeQuantity(item)" v-model="item.orderQuantity" dense />
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
    },
    data() {
      return {
        onlyNumbers: [
            v => !!v || 'Ilość jest wymagana',
            v => /^[0-9]+$/.test(v) || 'Tylko cyfry',
        ],
      }
    },
    methods: {
        changeQuantity(item) {
          if(this.$refs.quantityInput.validate()) {
            if(parseInt(item.orderQuantity) > parseInt(item.productQuantity)) {
              var alert = {
                message: 'Maksymalna ilość produktów to: ' + item.productQuantity + ' . Ustawiono maximum',
                type: 'error'
              }
              this.$store.commit('network/setAlertBody', alert)
              item.orderQuantity = item.productQuantity
              this.$store.commit('order/setIsValidated', true)
            } else {
                deleteItemFromIDB('products', item.id)
                .then(() => {
                    writeDataIDB('products', [item])
                    var alert = {
                        message: 'Zmieniono ilość zamówienia',
                        type: 'success'
                    }
                    this.$store.commit('network/setAlertBody', alert)
                    this.$store.commit('order/setIsValidated', true)
                })
            }
          } else {
            var alert = {
                message: 'Popraw zamównienie',
                type: 'error'
            }
            this.$store.commit('network/setAlertBody', alert)
            this.$store.commit('order/setIsValidated', false)
          }
        }
    }
  }
</script>