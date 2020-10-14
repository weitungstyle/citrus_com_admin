<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-5 mb-2">
      <button type="button" class="btn btn-primary" @click="openModal(true)">ADD COUPON</button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th class="pb-4">Event Title</th>
          <th width="200" class="pb-4">Coupon Code</th>
          <th width="200" class="pb-4">Expiry Date</th>
          <th width="140">Discount Percentage</th>
          <th width="120" class="pb-4">Enabled</th>
          <th width="180" class="pb-4">Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in coupons" :key="key">
          <td>{{ item.title }}</td>
          <td>{{ item.code }}</td>
          <td>{{ item.due_date | transdate }}</td>
          <td>{{ item.percent }}</td>
          <td>
            <span v-if="item.is_enabled == 1" class="text-success">Enabled</span>
            <span v-else>Not Enabled</span>
          </td>
          <td>
            <div class="d-flex">
              <button type="button" class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">E D I T</button>
              <button type="button" class="btn btn-outline-danger btn-sm" @click="openRemoveModal(item)">REMOVE</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :page-in="pagination" @getInfosFromPagi="getCoupons"/>
    <!-- Add / Modify Coupon Modal -->
    <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>ADD/EDIT COUPON</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="title">Event Title</label>
              <input
                type="text"
                class="form-control"
                id="title"
                v-model="tempCoupon.title"
                placeholder="Fill in the event title"
              />
            </div>
            <div class="form-group">
              <label for="code">Coupon Code</label>
              <input
                type="text"
                class="form-control"
                id="code"
                v-model="tempCoupon.code"
                placeholder="Fill in the "
              />
            </div>
            <div class="form-group">
              <label for="date">Expiry Date</label>
              <input
                type="date"
                class="form-control"
                id="date"
                v-model="tempCoupon.date"
                placeholder="Fill in the expiry date"
              />
            </div>
            <div class="form-group">
              <label for="percent">Discount Percentage</label>
              <input
                type="text"
                class="form-control"
                id="percent"
                v-model="tempCoupon.percent"
                placeholder="Fill in the discount percentage"
              />
            </div>
            <hr />
            <div class="form-group">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="tempCoupon.is_enabled"
                  :true-value="1"
                  :false-value="0"
                  id="is_enabled"
                />
                <label class="form-check-label" for="is_enabled">Enabled</label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateCoupon">確認</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Remove Modal -->
    <div
      class="modal fade"
      id="removeModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">Warning</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">Are you sure you want to remove this coupon?</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-danger" @click="removeCoupon">Comfirm</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Pagination from '@/components/Pagination.vue'
export default {
  name: 'Coupons',
  data () {
    return {
      coupons: [],
      pagination: {},
      tempCoupon: {},
      isNew: false,
      isLoading: false
    }
  },
  components: {
    Pagination
  },
  methods: {
    getCoupons (page = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`
      vm.isLoading = true
      vm.$http.get(api).then((response) => {
        vm.isLoading = false
        vm.coupons = response.data.coupons
        vm.pagination = response.data.pagination
      })
    },
    openModal (isNew, item) {
      if (isNew) {
        this.tempCoupon = {}
        this.isNew = true
      } else {
        this.tempCoupon = Object.assign({}, item)
        this.isNew = false
      }
      $('#couponModal').modal('show')
    },
    updateCoupon () {
      const vm = this
      vm.tempCoupon.due_date = Date.parse(new Date(vm.tempCoupon.date)) / 1000
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`
      let httpMethod = 'post'
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`
        httpMethod = 'put'
      }
      vm.$http[httpMethod](api, { data: vm.tempCoupon }).then((response) => {
        if (response.data.success) {
          $('#couponModal').modal('hide')
          vm.getCoupons()
        } else {
          $('#couponModal').modal('hide')
          vm.getCoupons()
        }
      })
    },
    openRemoveModal (item) {
      $('#removeModal').modal('show')
      this.tempCoupon = Object.assign({}, item)
    },
    removeCoupon () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`
      vm.$http.delete(api).then((response) => {
        $('#removeModal').modal('hide')
        vm.getCoupons()
      })
    }
  },
  created () {
    this.getCoupons()
  }
}
</script>
