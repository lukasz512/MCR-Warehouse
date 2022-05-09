<template>
    <div class="mx-md-3">
        <v-btn class="w-100 mb-2" @click="placeOrder(item)" dark large color="#416480">Zamawiam</v-btn><br>
        <dialog-utilization v-if="role === 'Administrator' || role === 'Marketing'" :item="item" :warehouse="warehouse" />
        <!-- TODO dokonczyc przekazywanie warehuses -->
    </div>
</template>

<script>
import dialogUtilization from '../Common/DialogUtilization'
export default {
    props: {
        item: {
            type: Object,
            required: true
        },
        warehouse: {
            type: String,
            required: true
        }
    },
    methods: {
        placeOrder (item) {
            this.$router.push({ path: '/Product/Order/' + item.id + '?wh=' + this.warehouse })
        }
    },
    components: {
        dialogUtilization
    },
    computed: {
        role() { return localStorage.getItem('role') || null}
    }
}
</script>