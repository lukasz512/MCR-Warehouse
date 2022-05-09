<template>
  <v-data-table
    v-if="products"
    :headers="headers"
    :items="products"
    :items-per-page="itemsPerPage"
    :hide-default-header="isFetching"
    :hide-default-footer="!productSearchUrl"
    :search="productSearch"
    :class="productSearchUrl ? '' : 'short-table'"
    :no-results-text="'Nie znaleziono rekordów'"
    id="ProductSearchTable"
    sort-by="productLine"
    multi-sort
    no-data-text="Pobieranie danych"
    loading-text="Pobieranie danych"
  >
    <template v-slot:item.productImage="{ item }">
      <column-image :photo="item.productImage" />
    </template>
    <template v-if="productSearchUrl" v-slot:item.createDate="{ item }">
      <column-date :createDate="item.createDate" :expiryDate="item.expiryDate" />
    </template>
    <template v-if="productSearchUrl" v-slot:item.actions="{ item }">
      <column-actions :item="item" :warehouse="warehouse" />
    </template>
    <template v-if="!productSearchUrl" v-slot:item.delete="{ item }">
      <delete-btn :item="item" :btnTitle="'Pozycję'" />
    </template>
    <template v-if="!productSearchUrl" v-slot:item.warehouse="{ item }">
      <warehouse-column :item="item" />
    </template>
    <template v-if="!productSearchUrl" v-slot:item.orderQuantity="{ item }">
      <quantity-input :item="item" />
    </template>
  </v-data-table>
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
      required: false
    },
    products: {
      type: Array,
      required: true
    },
    headers: {
      type: Array,
      required: true
    }
  },
  components: {
    ColumnImage,
    ColumnActions,
    ColumnDate,
    QuantityInput,
    WarehouseColumn,
    DeleteBtn
  },
  computed: {
    productSearch: {
      get() {
        return this.$store.getters["product/getProductSearch"];
      },
      set(val) {
        this.$store.commit("product/setProductSearch", val);
      }
    },
    itemsPerPage() {
      return this.productSearchUrl ? 5 : 1000000;
    }
  }
};
</script>