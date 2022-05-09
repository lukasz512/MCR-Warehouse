<template>
  <main>
  <main-navbar :title="title" />
  <mobile-title :title="title" />
    <v-container>
      <div class="custom-alert">
      </div>
      <v-card elevation="10">
        <v-content class="pt-3">
          <v-data-table 
          v-if="users"
          :headers="headers" 
          :items="users"
          :items-per-page="10"
          :hide-default-header="isFetching"
          :hide-default-footer="isFetching"
          :loading="isFetching"
          :mobile-breakpoint="1300"
          sort-by="id"
          multi-sort
          loading-text="Pobieranie danych">
          <template v-slot:item.role="{ item }"><user-role :item="item" /></template>
          </v-data-table>
        </v-content>
      </v-card>
    </v-container>
  </main>
</template>

<script>
import MainNavbar from '@/components/Navbar/MainNavbar'
import UserRole from '@/components/CustomColumn/UserManageRole'
import MobileTitle from '@/components/Common/MobileTitle'
  export default {
    data() {
      return {
        title: 'Zarządzanie użytkownikami'
      }
    },
    components: {
      MainNavbar,
      UserRole,
      MobileTitle
    },
    computed: {
      users() { return this.$store.getters['user/getUsersForManage'] || [] },
      headers() { return this.$store.getters['tableHeaders/getUserManageHeaders'] || []},
    },
    beforeMount() {
      this.$store.dispatch('user/fetchUsersForManage')
    },
  }
</script>

<style scoped>
.custom-alert {
  position: fixed;
  top: 67px;
  width: 1760px;
}
</style>