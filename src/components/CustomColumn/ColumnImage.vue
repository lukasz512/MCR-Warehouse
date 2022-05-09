<template>
    <main class="text-center">
        <button @click="lightboxVisible = true">
            <v-img :src="image" width="280" height="150" alt="image" class="d-block mx-auto mt-3 mt-lg-0" />
        </button>
        <vue-easy-lightbox moveDisabled :visible="lightboxVisible" :imgs="image" @hide="lightboxVisible = false" />
    </main>
</template>

<script>
    export default {
        props: {
            photo: {
                required: true
            },
        },
        data() {
            return {
                lightboxVisible: false,
            }
        },
        computed: {
            image() {
                return this.photo ? this.photo : './img/empty.png'
            },
        }
    }
</script>