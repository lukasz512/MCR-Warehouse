<template>
    <v-container class="mt-xl-5">
        <v-row>
            <v-col cols="12" sm="12" md="10" lg="6" xl="4" class="mx-auto">
                <v-card :loading="isFetching" class="mx-auto px-md-12 pb-12">
                    <v-form ref="createUserForm" class="px-5 pt-md-5">
                        <logon-image :pageTitle="'Tworzenie użytkownika'"/>
                        <v-text-field v-model="email" :rules="emailRules" label="Adres email" validate-on-blur>
                            <v-icon slot="prepend" color="#416480">mdi-account-circle</v-icon>
                        </v-text-field>
                        <v-text-field v-model="password1" :rules="passwordRules" label="Utwórz hasło" type="password"
                            validate-on-blur>
                            <v-icon slot="prepend" color="#416480">mdi-lock</v-icon>
                        </v-text-field>
                        <v-text-field v-model="password2" :rules="passwordRules" label="Powtórz hasło" class="mb-5"
                            type="password" validate-on-blur>
                            <v-icon slot="prepend" color="#416480">mdi-lock</v-icon>
                        </v-text-field>
                        <div class="text-right d-flex flex-column d-md-block">
                            <v-btn class="mr-xl-2 mb-2" :loading="isFetching" dark color="#416480" type="submit"
                                large @click.stop.prevent="createUser">Utwórz konto</v-btn>
                            <v-btn @click="clearForm" class="mr-xl-2 mb-2" large>Wyczyść</v-btn>
                            <v-btn @click="goToLogin" large>Powrót</v-btn>
                        </div>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import LogonImage from '@/components/Common/LogonImage'
    export default {
        data: () => ({
            email: '',
            password1: '',
            password2: '',
            emailRules: [
                v => !!v || 'Adres email jest wymagany',
                v => /.+@.+/.test(v) || 'Adres email niepoprawny',
            ],
            passwordRules: [
                v => !!v || 'Hasło jest wymagane',
            ],
        }),
        methods: {
            createUser() {
                if (this.$refs.createUserForm.validate()) {
                    if (this.password1 !== this.password2) {
                        var data = {
                            message: 'Hasła muszą być identyczne',
                            type: 'error'
                        }
                        this.$store.commit('network/setAlertBody', data)
                    } else if (this.password1.length < 7) {
                        var data2 = {
                            message: 'Hasło musi zawierać minimum 8 znaków',
                            type: 'error'
                        }
                        this.$store.commit('network/setAlertBody', data2)
                    } else if (!this.email.includes('@bms.com') && !this.email.includes('@mcrgroup.pl')) {
                        var data4 = {
                            message: 'Niedozwolona domena',
                            type: 'error'
                        }
                        this.$store.commit('network/setAlertBody', data4)
                    } else {
                        let obj = {
                            email: this.email,
                            password: this.password2
                        }
                        this.$store.dispatch('user/create', obj)
                    }
                } else {
                    var data3 = {
                        message: 'Popraw formularz',
                        type: 'error'
                    }
                    this.$store.commit('network/setAlertBody', data3)
                }
            },
            clearForm() {
                this.email = null,
                    this.password1 = null,
                    this.password2 = null,
                    this.$store.commit('network/setAlertBody', null)
            },
            goToLogin() {
                this.$router.push('/Logon')
            }
        },
        components: {
            LogonImage
        },
    }
</script>