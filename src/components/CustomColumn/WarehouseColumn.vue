<template>
  <main>
      <span>
          {{ warehouseToShow }}
      </span>
  </main>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            required: true
        },
    },
    computed: {
        warehouseToShow() {
            if(this.item.warehouse === 'products') {
                return 'Materiały Promocyjne'
            } else {
                return 'Materiały Niepromocyjne'
            }
        }
    }
}
</script>