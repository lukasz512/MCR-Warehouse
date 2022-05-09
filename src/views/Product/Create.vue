<template>
  <main>
    <main-navbar :title="title" />
    <mobile-title :title="title" />
    <v-container>
      <v-card :loading="isFetching" elevation="10" class="px-5 px-md-12 pb-10">
        <br />
        <form @keydown.enter="createProduct">
          <v-row>
            <v-col cols="12" md="6">
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
            </v-col>
            <v-col cols="12" md="5">
              <v-autocomplete
                v-model="product.warehouse"
                :items="warehouseOptions"
                label="Magazyn"
                dense
              />
              <v-text-field
                v-model="product.productName"
                :rules="emptyRules"
                label="Nazwa"
                validate-on-blur
              />
              <v-text-field
                v-model="product.createDate"
                :rules="emptyRules"
                label="Data dodania"
                disabled
              />
<!-- // do komponentu TODO -->
              <v-menu
                v-model="datepickerMenu"
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
                <v-date-picker
                  v-model="product.expiryDate"
                  @input="datepickerMenu = false"
                ></v-date-picker>
              </v-menu>

              <v-text-field
                v-model="product.productCategory"
                :rules="emptyRules"
                label="Kategoria"
                validate-on-blur
              />
              <v-text-field
                v-model="product.productLine"
                :rules="emptyRules"
                label="Wskazanie"
                validate-on-blur
              />
              <v-text-field
                v-model="product.productMedicine"
                :rules="emptyRules"
                label="Lek"
                validate-on-blur
              />
              <v-text-field
                v-model="product.productCode"
                :rules="emptyRules"
                label="Kod"
                validate-on-blur
              />
              <v-text-field
                v-model="product.productQuantity"
                :rules="emptyRules"
                class="mr-3 w-50"
                type="number"
                label="Ilość"
                validate-on-blur
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex flex-column flex-lg-row">
              <v-btn
                color="#416480"
                class="mr-lg-2 mb-2"
                dark
                :loading="isFetching"
                @click="createProduct"
                large
                >zapisz</v-btn
              >
              <v-btn @click="clearForm" class="mr-lg-2 mb-2" large
                >wyczyść</v-btn
              >
              <v-btn
                @click="$router.push('/Product/Search/')"
                class="mr-lg-2 mb-2"
                large
                >powrót</v-btn
              >
            </v-col>
          </v-row>
        </form>
      </v-card>
    </v-container>
  </main>
</template>

<script>
import MainNavbar from "@/components/Navbar/MainNavbar";
import MobileTitle from "@/components/Common/MobileTitle";
export default {
  data() {
    return {
      title: "Dodawanie produktu",
      datepickerMenu: false,
      warehouseOptions: [
        {
          text: "Materiały promocyjne",
          value: "products",
        },
        {
          text: "Materiały niepromocyjne",
          value: "nonPromoProducts",
        },
      ],
      product: {
        warehouse: "products",
        createDate: new Date().toISOString().substring(0, 10),
        // ustawiam date ważności na 30 dni do przodu
        expiryDate: new Date(new Date().getTime()+(30*24*60*60*1000)).toISOString().substring(0, 10),
        productCategory: null,
        productCode: null,
        productLine: null,
        productMedicine: null,
        productName: null,
        productQuantity: null,
        productImage: null,
      },
      emptyRules: [(v) => !!v || "Pole nie może być puste"],
    };
  },
  components: {
    MainNavbar,
    MobileTitle,
  },
  methods: {
    createProduct() {
      //sprawdzam czy wszystie property obiektu istnieja
      let result = !Object.values(this.product).every((o) => o !== null);
      if (result) {
        var data = {
          message: "Wypełnij wszystkie pola",
          type: "error",
        };
        this.$store.commit("network/setAlertBody", data);
      } else {
        // tu idzie post
        this.$store.dispatch("product/createProduct", this.product);
        var t = this;
        setTimeout(function() {
          t.product.productImage = null;
        }, 500);
      }
    },
    clearForm() {
      this.product = {
        createDate: new Date(),
        expiryDate: new Date(new Date().getTime()+(30*24*60*60*1000)).toISOString().substring(0, 10),
        productCategory: null,
        productCode: null,
        productLine: null,
        productMedicine: null,
        productName: null,
        productQuantity: null,
        productImage: null,
      };
      this.$store.commit("network/setAlertBody", null);
    },
    uploadFile(imgBase64) {
      this.product.productImage = imgBase64.dataUrl;
    },
  },
};
</script>

<style>
.image-upload {
  max-width: 700px;
  max-height: 500px;
  min-width: 320px;
  min-height: 150px;
  cursor: pointer;
}
.upload-container {
  max-width: 700px;
  max-height: 500px;
  min-width: 320px;
  min-height: 150px;
  overflow: hidden;
  text-align: center;
  background-color: #efefef;
}
</style>
