<template>
    <main class="mx-md-3">
        <v-autocomplete
            @blur="updateUser(item)"
            v-model="item.role"
            :items="items"
            dense/>
    </main>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            items: ['Nieaktywny', 'Kam', 'Marketing', 'Medyczny', 'Administrator'],
        }
    },
    methods: {
        updateUser (user) {
            console.log(user)
            this.$store.dispatch('user/editUserRole', user)
        }
    }
}
</script>