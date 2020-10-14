<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <table class="table mt-5">
      <thead>
        <tr>
          <th width="120">Order Date</th>
          <th width="160">Customer Name</th>
          <th>E-mail</th>
          <th>Purchase List</th>
          <th width="120" class="text-right">Total</th>
          <th width="120" class="text-right">Paid</th>
        </tr>
      </thead>
      <tbody v-if="orders.length">
        <tr v-for="(item, key) in sortOrder" :key="key">
          <td>{{ item.create_at | transdate }}</td>
          <td>{{ item.user.name }}</td>
          <td>{{ item.user.email }}</td>
          <th>
            <ul class="list-unstyled">
              <li v-for="(product, i) in item.products" :key="i">
                {{ product.product.title }} / 數量：{{ product.qty }}{{ product.product.unit }}
              </li>
            </ul>
          </th>
          <td class="text-right">{{ item.total | currency }}</td>
          <td class="text-right">
            <span v-if="item.is_paid" class="text-success">Paid</span>
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
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`
      vm.isLoading = true
      vm.$http.get(api).then((response) => {
        vm.isLoading = false
        vm.orders = response.data.orders
        vm.pagination = response.data.pagination
      })
    }
  },
  computed: {
    sortOrder () {
      const vm = this
      let newOrder = []
      if (vm.orders.length) {
        newOrder = vm.orders.sort((a, b) => {
          const aIsPaid = a.is_paid ? 1 : 0
          const bIsPaid = b.is_paid ? 1 : 0
          return bIsPaid - aIsPaid
        })
      }
      return newOrder
    }
  },
  created () {
    this.getOrders()
  }
}
</script>
