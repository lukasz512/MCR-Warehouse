<template>
    <main>
        <br><br><br>
        <v-app-bar color="#123754" dark fixed>
            <v-container>
                <v-row class="align-center">
                    <img src="@/assets/logo-mcr.png" @click="goHome" class="mx-md-5 logo-link" width="220px" alt="logo">
                    <v-toolbar-title v-if="isDesktop" class="nav-title">{{title}}</v-toolbar-title>
                    <v-spacer />
                    <v-btn  @click="searchToggle" icon dark v-if="productSearchUrl">
                        <v-icon>mdi-magnify</v-icon>
                    </v-btn>
                    <v-menu offset-y>
                        <template v-slot:activator="{ on }">
                            <v-btn @click="fetchUserData" icon v-on="on">
                                <v-icon large>mdi-account</v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                             <v-list-item v-if="userDispalyName">
                                <v-list-item-avatar>
                                    <v-icon class="display-1">mdi-account-circle</v-icon>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title>{{userDispalyName}}</v-list-item-title>
                                    <v-list-item-subtitle>{{userEmail}}</v-list-item-subtitle>
                                </v-list-item-content> 
                            </v-list-item>
                            <v-divider v-if="userDispalyName" />
                            <v-list-item v-for="(item, i) in menu" :key="i" @click="menuSelect(item.value)">
                                <v-list-item-title>
                                    {{item.text}}
                                </v-list-item-title>
                            </v-list-item>
                            <admin-menu v-if="role === 'Administrator'" />
                        </v-list>
                    </v-menu>
                </v-row>
            </v-container>
        </v-app-bar>
        <!-- wyszukiwarka -->
        <v-snackbar v-model="searchSnackbar" bottom :timeout="0" light color="#123754">
            <v-text-field autofocus dark v-model="productSearch" hide-details placeholder="Wyszukaj..." class="p-0 m-0">
            </v-text-field>
            <v-btn dark text @click="searchToggle">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-snackbar>
    </main>

</template>
<script>
/* eslint-disable */
    import AdminMenu from '@/components/Admin/AdminMenu'
    export default {
        data() {
            return {
                searchSnackbar: false,
                userDispalyName: '',
                userEmail: '',
                menu: [{
                        text: 'Edycja konta',
                        value: 1
                    },
                    {
                        text: 'Podsumowanie zamówienia',
                        value: 2
                    },
                    {
                        text: 'Wyloguj',
                        value: 3
                    }
                ]
            }
        },
        props: {
            title: {
                type: String,
                required: true
            },
        },
        methods: {
            fetchUserData() {
                this.userEmail = auth.currentUser.email || 'Zaloguj się ponownie'
                this.userDispalyName = auth.currentUser.displayName || 'Uzupełnij profil'
            },
            goHome() {
                return this.$route.path != '/Product/Search/' ? this.$router.push('/Product/Search/') : null
            },
            menuSelect(e) {
                switch (e) {
                    case 1:
                        (this.$router.push({
                            path: '/User/Edit'
                        }))
                        break;
                    case 2:
                        (this.$router.push({
                            path: '/Order/View'
                        }))
                        break;
                    case 3: // wyloguj
                        this.$store.dispatch('logon/logOut')
                            .then(this.$router.push({
                                path: '/Logon'
                            }))
                        break;
                    default:
                        // code block
                }
            },
            searchToggle() {
                this.searchSnackbar = !this.searchSnackbar,
                this.productSearch = ''
            }
        },
        computed: {
            productSearch: {
                get() {
                    return this.$store.getters['product/getProductSearch']
                },
                set(val) {
                    this.$store.commit('product/setProductSearch', val)
                }
            },
            role() {
                return localStorage.getItem('role') || null
            },
            // userEmail() {
            //     return auth.currentUser.email || null
            // },
            // userDispalyName() {
            //     return auth.currentUser.displayName || 'Uzupełnij profil'
            // }
        },
        components: {
            AdminMenu
        }
    }
</script>

<style lang="scss">
    .logo-link {
        cursor: pointer;
        padding-bottom: 2px;
    }

    .nav-title {
        font-weight: 100;
    }
</style>