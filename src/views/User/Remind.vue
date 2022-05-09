<template>
<v-container class="mt-xl-5">
        <v-row>
            <v-col cols="12" sm="12" md="10" lg="4" class="mx-auto">
                <v-card :loading="isFetching" class="mx-auto px-md-12 pb-12">
                    <v-form ref="resetPassword" class="px-5 pt-md-5">
                        <logon-image :pageTitle="'Przypominanie hasła'" />
                        <v-text-field v-model="email" :rules="emailRules" label="Adres email" validate-on-blur class="mb-12" >
                        <v-icon slot="prepend" color="#416480">mdi-account-circle</v-icon>
                    </v-text-field>
                        <div class="text-right d-flex flex-column d-md-block">
                            <v-btn class="mr-xl-2 mb-2" :loading="isFetching" dark color="#416480" type="submit"
                                large @click.stop.prevent="passwordReset">Resetuj hasło</v-btn>
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
            emailRules: [
                v => !!v || 'Adres email jest wymagany',
                v => /.+@.+/.test(v) || 'Adres email niepoprawny'
            ],
        }),
        methods: {
            passwordReset() {
                if (this.$refs.resetPassword.validate()) {
                this.$store.dispatch('user/passwordReset', this.email)
                } else {
                    var data = {
                        message: 'Popraw adres email',
                        type: 'error'
                    }
                    this.$store.commit('network/setAlertBody', data)
                }
            },
            clearForm() {
                this.email = null,
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