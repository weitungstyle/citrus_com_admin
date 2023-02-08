<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-5 mb-2">
      <button type="button" class="btn btn-primary" @click="openModal(true)">
        ADD NEW PRODUCT
      </button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th width="100">Category</th>
          <th>Product Title</th>
          <th width="120" class="text-right">Original Price</th>
          <th width="100" class="text-right">Price</th>
          <th width="100">Enabled</th>
          <th width="180" class="pb-4">Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in products" :key="key">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">{{ item.originPrice | currency }}</td>
          <td class="text-right">{{ item.price | currency }}</td>
          <td>
            <span v-if="item.isEnabled == 1" class="text-success"
              >Enabled</span
            >
            <span v-else>Not Enabled</span>
          </td>
          <td>
            <div class="d-flex">
              <button type="button"
                class="btn btn-outline-primary btn-sm"
                @click="openModal(false, item)"
              >
                E D I T
              </button>
              <button type="button"
                class="btn btn-outline-danger btn-sm"
                @click="openRemoveModal(item)"
              >
                REMOVE
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :page-in="pagination" @getInfosFromPagi="getProducts" />
    <!-- Add / Modify Product Modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>ADD / EDIT PRODUCT</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">The main picture URL</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    v-model="tempProduct.imageUrl"
                    placeholder="Fill in the main picture URL"
                  />
                </div>
                <div class="form-group">
                  <label for="customFile">
                    Or uploade the main image
                    <i
                      class="fas fa-spinner fa-pulse"
                      v-if="status.fileUploading"
                    ></i>
                  </label>
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="files"
                    @change="uploadImage"
                  />
                </div>
                <img
                  img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                  class="img-fluid"
                  :src="tempProduct.imageUrl"
                  alt
                />
                <div class="form-group mt-5">
                  <label for="image2">The look picture URL</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image2"
                    v-model="tempProduct.image"
                    placeholder="Fill in the look picture URL"
                  />
                </div>
                <div class="form-group mt-2">
                  <label for="color">Color</label>
                  <select
                    class="form-control"
                    id="color"
                    v-model="tempProduct.color"
                  >
                    <option value="black">black</option>
                    <option value="white">white</option>
                  </select>
                </div>
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">Title</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="tempProduct.title"
                    placeholder="Fill in the title"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="Fill in the category">Category</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      v-model="tempProduct.category"
                      placeholder="category"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="unit">Unit</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="unit"
                      v-model="tempProduct.unit"
                      placeholder="Fill in the unit"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="originPrice">Original Price</label>
                    <input
                      type="number"
                      class="form-control"
                      id="originPrice"
                      v-model="tempProduct.originPrice"
                      placeholder="Fill in the original price"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">Price</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      v-model="tempProduct.price"
                      placeholder="Fill in the price"
                    />
                  </div>
                </div>
                <hr />

                <div class="form-group">
                  <label for="description">Description</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    v-model="tempProduct.description"
                    placeholder="Fill in the description"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="content">Content</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    v-model="tempProduct.content"
                    placeholder="Fill in the content"
                  ></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="tempProduct.isEnabled"
                      :true-value="1"
                      :false-value="0"
                      id="isEnabled"
                    />
                    <label class="form-check-label" for="isEnabled"
                      >Enabled</label
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="updateProduct"
            >
              Comfirm
            </button>
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
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Are you sure you want to remove this product?
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <button type="button" class="btn btn-danger" @click="removeProduct">
              Comfirm
            </button>
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
  name: 'Products',
  data () {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isLoading: false,
      status: {
        fileUploading: false
      }
    }
  },
  components: {
    Pagination
  },
  methods: {
    getProducts (page = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/admin/products?page=${page}`
      vm.isLoading = true
      vm.$http.get(api).then((response) => {
        vm.products = response.data.products
        vm.pagination = response.data.pagination
      }).catch((error) => {
        console.log('Products.vue => ', api, error)
      }).finally(() => {
        vm.isLoading = false
      })
    },
    openModal (isNew, item) {
      const vm = this
      if (isNew) {
        vm.tempProduct = {}
        vm.isNew = true
      } else {
        vm.tempProduct = Object.assign({}, item)
        vm.isNew = false
      }
      $('#productModal').modal('show')
    },
    openRemoveModal (item) {
      $('#removeModal').modal('show')
      this.tempProduct = Object.assign({}, item)
    },
    updateProduct () {
      const vm = this
      let api = `${process.env.VUE_APP_APIPATH}/api/admin/product`
      let httpMethod = 'post'
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/admin/product/${vm.tempProduct.id}`
        httpMethod = 'put'
      }
      vm.$http[httpMethod](api, { data: vm.tempProduct }).then((response) => {
        console.log(response)
      }).catch((error) => {
        console.log('Products.vue => ', api, error)
      }).finally(() => {
        $('#productModal').modal('hide')
        vm.getProducts()
      })
    },
    removeProduct () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/admin/product/${vm.tempProduct.id}`
      vm.$http.delete(api).then((response) => {
        console.log(response)
      }).catch((error) => {
        console.log('Products.vue => ', api, error)
      }).finally(() => {
        $('#removeModal').modal('hide')
        vm.getProducts()
      })
    },
    uploadImage () {
      const vm = this
      const uploadedImage = vm.$refs.files.files[0]
      const formData = new FormData()
      formData.append('file-to-upload', uploadedImage)
      const url = `${process.env.VUE_APP_APIPATH}/api/admin/upload`
      vm.status.fileUploading = true
      vm.$http
        .post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response) => {
          vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl)
        }).catch((error) => {
          console.log('Products.vue => ', api, error)
          vm.$bus.$emit('message:push', error.data.message, 'danger')
        }).finally(() => {
          vm.status.fileUploading = false
        })
    }
  },
  created () {
    this.getProducts()
  }
}
</script>
