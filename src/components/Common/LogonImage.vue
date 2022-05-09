<template>
    <main>
        <br>
        <br>
        <h4 class="text-secondary text-center mb-5 font-weight-normal">{{ pageTitle }}</h4>
        <div class="bg-navy w-100">
            <img src="@/assets/logo-mcr.png" class="mx-auto d-block mt-6 my-lg-12 w-75" alt="logo">
        </div>
        <br>
    </main>
</template>
<script>
export default {
    props: {
      pageTitle: {
          type: String,
          required: true
      },
    },
}
</script>