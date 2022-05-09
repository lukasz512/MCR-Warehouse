<template>
    <main v-if="isMobile">
      <h5 class="text-secondary font-weight-normal text-center">{{title}}</h5>
      <hr class="m-0 ">
    </main>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                required: true
            }
        }
    }
</script>