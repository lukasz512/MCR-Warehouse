<template>
  <main v-if="products">
    <v-data-iterator
      v-if="!isFetching"
      :search="productSearch"
      :items="products"
      :items-per-page="itemsPerPage"
      :hide-default-footer="!productSearchUrl"
      :no-data-text="''"
      :no-results-text="'Nie znaleziono rekordów'"
    >
      <template v-slot:default="props">
        <v-card
          class="mt-4"
          elevation="10"
          v-for="item in props.items"
          :key="item.name"
        >
          <h6 class="text-nowrap text-truncate pt-3 pl-4">
            {{ item.productName }}
          </h6>
          <v-divider class="m-0" />
          <v-row>
            <v-col
              class="d-flex flex-column justify-space-around overflow-hidden p-0 ml-7 p-sm-3"
              cols="6"
            >
              <column-image :photo="item.productImage" />
              <column-actions
                v-if="productSearchUrl"
                :item="item"
                :warehouse="warehouse"
              />
              <section v-if="!productSearchUrl">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle
                      >Wartość zamówienia:</v-list-item-subtitle
                    >
                    <v-list-item-title>
                      <quantity-input :item="item" />
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <delete-btn :item="item" :btnTitle="'Pozycję'" />
              </section>
            </v-col>
            <v-col cols="5">
              <v-list>
                <v-list-item v-if="!productSearchUrl">
                  <v-list-item-content class="py-0">
                    <v-list-item-subtitle>Magazyn:</v-list-item-subtitle>
                    <v-list-item-title>
                      <warehouse-column :item="item" />
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item v-if="productSearchUrl">
                  <v-list-item-content class="py-0">
                    <!-- <v-list-item-subtitle>Data:</v-list-item-subtitle> -->
                    <v-list-item-title>
                      <column-date
                        :createDate="item.createDate"
                        :expiryDate="item.expiryDate"
                      />
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content class="py-0">
                    <v-list-item-subtitle>Kategoria:</v-list-item-subtitle>
                    <v-list-item-title>{{
                      item.productCategory
                    }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content class="py-0">
                    <v-list-item-subtitle>Wskazanie:</v-list-item-subtitle>
                    <v-list-item-title>{{
                      item.productLine
                    }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content class="py-0">
                    <v-list-item-subtitle>Lek:</v-list-item-subtitle>
                    <v-list-item-title>{{
                      item.productMedicine
                    }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content class="py-0">
                    <v-list-item-subtitle>Kod:</v-list-item-subtitle>
                    <v-list-item-title>{{
                      item.productCode
                    }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle>Ilość dostępna:</v-list-item-subtitle>
                    <v-list-item-title>{{
                      item.productQuantity
                    }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-card>
      </template>
    </v-data-iterator>
    <v-sheet v-if="isFetching" color="grey lighten-4" class="px-3 pt-3 pb-3">
      <v-skeleton-loader class="mx-auto mt-3" type="card"></v-skeleton-loader>
      <v-skeleton-loader class="mx-auto mt-3" type="card"></v-skeleton-loader>
    </v-sheet>
  </main>
</template>

<script>
import ColumnImage from "@/components/CustomColumn/ColumnImage";
import ColumnActions from "@/components/CustomColumn/SearchActions";
import ColumnDate from "@/components/CustomColumn/ColumnDate";
import QuantityInput from "@/components/CustomColumn/QuantityInput";
import WarehouseColumn from "@/components/CustomColumn/WarehouseColumn";
import DeleteBtn from "@/components/CustomColumn/ColumnDeleteBtn";
export default {
  props: {
    warehouse: {
      type: String,
      required: false,
    },
    products: {
      type: Array,
      required: true,
    },
    headers: {
      type: Array,
      required: true,
    },
  },
  components: {
    ColumnImage,
    ColumnActions,
    ColumnDate,
    QuantityInput,
    WarehouseColumn,
    DeleteBtn,
  },
  computed: {
    productSearch: {
      get() {
        return this.$store.getters["product/getProductSearch"];
      },
      set(val) {
        this.$store.commit("product/setProductSearch", val);
      },
    },
    itemsPerPage() {
      return this.productSearchUrl ? 5 : 1000000;
    },
  },
};
</script>
