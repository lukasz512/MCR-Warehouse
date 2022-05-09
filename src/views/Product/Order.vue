<template>
  <main>
    <main-navbar :title="title" />
    <mobile-title :title="title" />
    <v-container>
      <v-card :loading="isFetching" elevation="10" class="px-5 px-md-12 pb-10">
        <v-form ref="orderForm" v-if="product">
          <v-row class="pt-3 pt-md-12">
            <v-col cols="12" md="6">
              <div v-if="role != 'Administrator'">
                <v-img @click="lightboxVisible = true" :src="product.productImage" lazy-src="@/assets/empty.png" aspect-ratio="1"
                  class="grey lighten-2 mx-auto" max-width="700" max-height="450" />
              <vue-easy-lightbox moveDisabled :visible="lightboxVisible" :imgs="product.productImage"
                @hide="lightboxVisible = false" />
              </div>
              <div v-else>
                <image-uploader
                  @input="uploadFile"
                  :className="['d-none']"
                  :maxWidth="700"
                  :autoRotate="true"
                  :preview="false"
                  :quality="0.5"
                  :debug="0"
                  class="upload-container"
                  outputFormat="verbose"
                  id="ImageUploader"
                  accept="image/*"
                >
                  <label for="ImageUploader" slot="upload-label">
                  <v-img
                    v-if="product.productImage"
                    class="image-upload"
                    :src="product.productImage"
                  />
                  <v-img
                    v-else
                    class="image-upload mt-md-3 mt-lg-10"
                    src="@/assets/product-placeholder.jpg"
                  />
                </label>
              </image-uploader>
              </div>
            </v-col>
            <v-col cols="12" md="5">
              <v-text-field v-model="product.productName" label="Nazwa" :disabled="role != 'Administrator'" />
              <v-text-field v-model="product.createDate" label="Data dodania" disabled />
              <v-menu
                v-model="datepickerMenu"
                :disabled="role != 'Administrator'"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="product.expiryDate"
                    label="Data ważności"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <!-- // do komponentu TODO -->
                <v-date-picker
                  v-model="product.expiryDate"
                  @input="datepickerMenu = false"
                ></v-date-picker>
              </v-menu>
              <v-text-field v-model="product.productCategory" label="Kategoria" :disabled="role != 'Administrator'" />
              <v-text-field v-model="product.productLine" label="Wskazanie" :disabled="role != 'Administrator'" />
              <v-text-field v-model="product.productMedicine" label="Lek" :disabled="role != 'Administrator'" />
              <v-text-field v-model="product.productCode" label="Kod" :disabled="role != 'Administrator'" />
              <div class="d-flex">
                <v-text-field class="mr-3" :rules="onlyNumbers" v-model="product.productQuantity" label="Ilość"
                  :disabled="role != 'Administrator'" />
                <v-text-field :rules="onlyNumbers" v-model="orderQuantity" label="Zamówienie" />
              </div>
            </v-col>
          </v-row>
          <v-row class="d-flex flex-column d-md-block">
            <v-btn class="mr-lg-2 mb-2" color="#416480" dark @click="addToOrder('/Order/View/')" large>Finalizuj
              zamówienie</v-btn>
            <v-btn class="mr-lg-2 mb-2" @click="addToOrder('/Product/Search/')" large>Dodaj do zamówienia</v-btn>
            <v-btn v-if="role === 'Administrator'" class="mr-lg-2 mb-2" @click="updateProduct()" large>Uaktualnij produkt</v-btn>
            <v-btn class="mb-2" @click="$router.go(-1)" large>Powrót</v-btn>
          </v-row>
        </v-form>
      </v-card>
    </v-container>
  </main>
</template>
<script>
  import MainNavbar from '@/components/Navbar/MainNavbar'
  import MobileTitle from '@/components/Common/MobileTitle'

  export default {
    data() {
      return {
        orderId: this.$route.params.id,
        datepickerMenu: false,
        title: 'Składanie zamówienia',
        orderQuantity: '',
        lightboxVisible: false,
        onlyNumbers: [
          v => !!v || 'Ilość jest wymagana',
          v => /^[0-9]+$/.test(v) || 'Tylko cyfry',
        ],
      }
    },
    components: {
      MainNavbar,
      MobileTitle
    },
    computed: {
      product() {
        return this.$store.getters['product/getProductData'] || null
      },
    },
    methods: {
      uploadFile(imgBase64) {
        this.product.productImage = imgBase64.dataUrl;
      },
      updateProduct() {
        this.$store.dispatch('product/updateProduct', {id: this.orderId, warehouse: this.$route.query.wh})
      },
      addToOrder(path) {
        if (this.$refs.orderForm.validate()) {
          let data = [{
            id: this.$route.params.id,
            productImage: this.product.productImage,
            productName: this.product.productName,
            createDate: this.product.createDate,
            expiryDate: this.product.expiryDate,
            productCode: this.product.productCode,
            productCategory: this.product.productCategory,
            productMedicine: this.product.productMedicine,
            productLine: this.product.productLine,
            productQuantity: this.product.productQuantity,
            orderQuantity: this.orderQuantity,
            warehouse: this.$route.query.wh
          }];
          if (parseInt(this.orderQuantity) > parseInt(this.product.productQuantity)) {
            var alert = {
              message: 'Maksymalna ilość produktów to: ' + this.product.productQuantity,
              type: 'error'
            }
            this.$store.commit('network/setAlertBody', alert, {
              root: true
            })
          } else if (this.orderQuantity === '' || parseInt(this.orderQuantity) === 0) {
            var alert2 = {
              message: 'Dodaj ilość produtów do zamówienia',
              type: 'error'
            }
            this.$store.commit('network/setAlertBody', alert2)
          } else {
            // eslint-disable-next-line
            writeDataIDB('products', data)
            var alert3 = {
              message: 'Materiały dodano do zamówienia',
              type: 'success'
            }
            this.$store.commit('network/setAlertBody', alert3)
            setTimeout(() => {
              this.$router.push({
                path: path
              })
            }, 2000)
          }
        } else {
          var alert4 = {
            message: 'Popraw zamówienie',
            type: 'error'
          }
          this.$store.commit('network/setAlertBody', alert4)
        }
      }
    },
    beforeMount() {
      this.$store.dispatch('product/fetchProductData', {orderId: this.orderId, warehouse: this.$route.query.wh})
    },
  }
</script>