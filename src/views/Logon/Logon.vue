<template>
  <v-container class="mt-xl-5">
    <v-row>
      <v-col cols="12" sm="12" md="10" lg="6" xl="4" class="mx-auto">
        <v-card :loading="isFetching" class="mx-auto px-md-12 pb-12">
          <form class="px-5 pt-md-5">
            <logon-image :pageTitle="'Logowanie do magazynów'" />
            <v-text-field v-model="login" :rules="loginRules" label="Login" required validate-on-blur>
              <v-icon slot="prepend" color="#416480">mdi-account-circle</v-icon>
            </v-text-field>
            <v-text-field v-model="password" :rules="passwordRules" autocomplete="current-password" label="Hasło"
              class="mb-5" type="password" required validate-on-blur>
              <v-icon slot="prepend" color="#416480">mdi-lock</v-icon>
            </v-text-field>
            <div class="d-flex flex-column d-md-block">
              <v-btn class="mr-xl-2 mb-2" :loading="isFetching" dark color="#416480" type="submit"
                @click.prevent="signIn()" large>Zaloguj</v-btn>
              <v-btn class="mb-2" @click="clearLogin()" large>Wyczyść</v-btn>
            </div>
          </form>
        </v-card>
        <p class="d-flex justify-space-between flex-column flex-sm-row text-center my-2">
          <a class="float-left mb-6" @click="$router.push('/User/Create')">Nie mam jeszcze konta</a>
          <a @click="passwordRemind">Nie pamiętam hasła</a>
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import LogonImage from '@/components/Common/LogonImage'
  export default {
    data: () => ({
      login: '',
      password: '',
      loginRules: [
        v => !!v || 'Login jest wymagany',
        v => /.+@.+/.test(v) || 'Adres email niepoprawny',
      ],
      passwordRules: [
        v => !!v || 'Hasło jest wymagane',
      ],
    }),
    methods: {
      signIn() {
        let data = {
          email: this.login,
          password: this.password
        }
        this.$store.dispatch('logon/signIn', data)
      },
      clearLogin() {
        this.login = '',
          this.password = ''
        this.$store.commit('network/setAlertBody', null)
      },
      passwordRemind() {
        this.$router.push('/User/Remind')
        var data = {
          message: 'Podaj e-mail do wysyłki linku resetującego hasło',
          type: 'info'
        }
        this.$store.commit('network/setAlertBody', data)
      }
    },
    components: {
      LogonImage
    }
  }
</script>