<template>
    <div>
        <v-snackbar v-if="alertBody" :value="alertBody" :color="alertBody.type" :timeout="0" multi-line top>
            <v-icon color="white" style="padding-right: 10px">mdi-information</v-icon>
            {{alertBody.message}}
            <v-btn dark text @click="dismissAlert">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-snackbar>
    </div>
</template>

<script>
    import {
        mapGetters
    } from 'vuex'
    export default {
        computed: {
            ...mapGetters('network', {
                alertBody: 'getAlertBody'
            }),
        },
        methods: {
            dismissAlert() {
                this.$store.commit('network/setAlertBody', null)
            }
        }
    }
</script>