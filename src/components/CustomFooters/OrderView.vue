<template>
    <section class="p-3 d-flex flex-column d-md-block">
      <hr class="mt-0">
        <dialog-order-confirm />
        <dialog-order-cancel />
    </section>
</template>

<script>
import DialogOrderConfirm from '@/components/Common/DialogOrderConfirm'
import DialogOrderCancel from '@/components/Common/DialogOrderCancel'
  export default {
    components:{ 
        DialogOrderConfirm,
        DialogOrderCancel
    }
  }
</script>