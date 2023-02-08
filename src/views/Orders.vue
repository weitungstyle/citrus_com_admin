<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <table class="table mt-5">
      <thead>
        <tr>
          <th width="120">Order Date</th>
          <th width="160">Customer Name</th>
          <th>Telephone</th>
          <th>Purchase List</th>
          <th width="120" class="text-right">Total</th>
          <th width="120" class="text-right">Paid</th>
        </tr>
      </thead>
      <tbody v-if="orders.length">
        <tr v-for="(item, key) in orders" :key="key">
          <td>{{ item.createAt | transdate }}</td>
          <td>{{ item.user.firstName }} {{ item.user.lastName }}</td>
          <td>{{ item.user.telCode }} {{ item.user.tel }}</td>
          <th>
            <ul class="list-unstyled">
              <li v-for="(product, i) in item.products" :key="i">
                {{ product.product.title }} / 數量：{{ product.qty }}{{ product.product.unit }}
              </li>
            </ul>
          </th>
          <td class="text-right">{{ item.total | currency }}</td>
          <td class="text-right">
            <span v-if="item.isPaid" class="text-success">Paid</span>
            <span v-else class="text-danger">Unpaid</span>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :page-in="pagination" @getInfosFromPagi="getOrders" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'
export default {
  name: 'Orders',
  data () {
    return {
      orders: [],
      pagination: {},
      tempOrders: {},
      isNew: false,
      isLoading: false
    }
  },
  components: {
    Pagination
  },
  methods: {
    getOrders (page = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/admin/orders?page=${page}`
      vm.isLoading = true
      vm.$http.get(api).then((response) => {
        vm.orders = response.data.orders
        vm.pagination = response.data.pagination
      }).catch((error) => {
        console.log('Orders.vue => ', api, error)
      }).finally(() => {
        vm.isLoading = false
      })
    }
  },
  created () {
    this.getOrders()
  }
}
</script>
