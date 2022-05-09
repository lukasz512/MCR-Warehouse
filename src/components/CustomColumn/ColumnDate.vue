<template>
  <main>
    <label class="text-muted">Data dodania:</label>
    <p>{{ createDate | moment("YYYY-MM-DD") }}</p>
    <template v-if="expiryDate" >
      <label class="text-muted">Data ważności:</label>
      <p :class="new Date(expiryDate) < new Date() ? 'text-red': ''">{{ expiryDate | moment("YYYY-MM-DD") }}</p>
    </template>
  </main>
</template>

<script>
export default {
  props: {
    createDate: {
      type: String,
      required: true,
    },
    expiryDate: {
      type: String,
      required: false,
    },
  },
};
</script>
<style scoped>
.text-red {
    color: red;
}
</style>