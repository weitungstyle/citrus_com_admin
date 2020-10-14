<template>
  <nav class="col-md-2 d-none d-md-block bg-light sidebar">
    <div class="sidebar-sticky">
      <h6
        class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-5 mb-1 text-muted"
      >
        <span>Administrator</span>
        <a class="d-flex align-items-center text-muted" href="#">
          <span data-feather="plus-circle"></span>
        </a>
      </h6>
      <ul class="nav flex-column">
        <li class="nav-item" @click=" isChoose = 'Orders'">
          <router-link class="nav-link" to="/admin/orders">
            <span class="fas fa-angle-right" v-if="isChoose == 'Orders'"></span>
            Orders
          </router-link>
        </li>
        <li class="nav-item" @click=" isChoose = 'Products'">
          <router-link class="nav-link" href="#" to="/admin/products">
            <span class="fas fa-angle-right" v-if="isChoose == 'Products'"></span>
            Products
          </router-link>
        </li>
        <li class="nav-item" @click=" isChoose = 'Coupons'">
          <router-link class="nav-link" href="#" to="/admin/coupons">
            <span class="fas fa-angle-right" v-if="isChoose == 'Coupons'"></span>
            Coupons
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Sidebar',
  data () {
    return {
      isChoose: 'Products'
    }
  }
}
</script>
