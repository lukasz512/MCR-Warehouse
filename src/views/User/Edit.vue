<template>
    <main>
        <main-navbar :title="title" />
        <mobile-title :title="title" />
        <v-container>
            <v-card :loading="isFetching" elevation="10" class="px-5 px-md-12 pb-10">
                <br>
                <v-form ref="editUserForm" @keydown.enter="updateUserData" v-if="user">
                    <v-row>
                        <v-col lg="6">
                            <v-text-field v-model="user.firstName" :rules="emptyRules" label="Imię" validate-on-blur/>
                            <v-text-field v-model="user.lastName" :rules="emptyRules" label="Nazwisko" validate-on-blur/>
                            <v-text-field v-model="email" v-if="email" :rules="emptyRules" label="E-mail" validate-on-blur disabled/>
                            <v-text-field v-model="user.phoneNumber" :rules="emptyRules" label="Telefon" validate-on-blur/>
                            <v-textarea v-model="user.address" :rules="emptyRules" label="Adres do wysyłki" rows="6" validate-on-blur/>
                        </v-col>
                        <v-col class="d-none d-lg-block" md="6">
                                <v-img src="@/assets/user-placeholder.png" />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="d-flex flex-column flex-lg-row">
                            <v-btn color="#416480" class="mr-xl-2 mb-2" dark :loading="isFetching" large @click="updateUserData">zapisz</v-btn>
                            <v-btn @click="$router.push('/Product/Search/')" large >powrót</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card>
        </v-container>
    </main>
</template>

<script>
import MainNavbar from '@/components/Navbar/MainNavbar'
import MobileTitle from '@/components/Common/MobileTitle'

    export default {
        data() {
            return {
                emptyRules: [
                    v => !!v || 'Pole nie może być puste',
                ],
                // eslint-disable-next-line
                email: auth.currentUser.email || ''
            }
        },
        computed: {
            user: {
                get() {
                    return this.$store.getters['user/getUserData'] || [];
                },
                set(value) {
                    this.$store.commit("user/setUserData", value);
                }
            },
            title() {return this.$store.getters['network/getTempTitle'] || 'Edycja danych użytkownika'}
        },
        components: {
            MainNavbar,
            MobileTitle
        },
        methods: {
            updateUserData() {
                if(this.$refs.editUserForm.validate()) {
                    this.$store.dispatch('user/updateUserData', this.user)
                } else {
                    var data = {
                            message: 'Wypełnij wszystkie pola',
                            type: 'error'
                        }
                        this.$store.commit('network/setAlertBody', data)
                }
            },
            clearForm() {
               this.$refs.editUserForm.resetValidation()
               this.$store.commit('user/setUserData', null)
            },
        },
        mounted() {
            this.$store.dispatch('user/fetchUserData')
        },
    }
</script>   