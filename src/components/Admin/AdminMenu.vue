<template>
    <main>
        <hr>
        <small class="ml-4 text-uppercase text-muted">
            Administrator
        </small>
        <v-list-item v-for="(item, i) in menu" :key="i" @click="menuSelect(item.value)">
            <v-list-item-title>
                {{item.text}}
            </v-list-item-title>
        </v-list-item>
    </main>
</template>

<script>
export default {
    data() {
        return {
            menu: [{
                    text: 'Zarządzaj użytkownikami',
                    value: 1
                },
                {
                    text: 'Dodaj produkt',
                    value: 2
                }
            ]
        }
    },
    methods: {
        menuSelect(e) {
            switch(e) {
                case 1:
                    (this.$router.push({ path: '/User/Manage' }))
                    break
                case 2:
                    (this.$router.push({ path: '/Product/Create' }))
                    break
                default:
                    // code block
            }
        }
    },
    computed: {
        role() {
            return localStorage.getItem('role') || null
        }
    }
}
</script>