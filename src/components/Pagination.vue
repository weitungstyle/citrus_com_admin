<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination d-flex justify-content-center">
        <li class="page-item" :class="{ disabled: !pageIn.has_pre }">
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click.prevent="geInfosInPagis(pageIn.current_page - 1)"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          class="page-item"
          v-for="page in pageIn.total_pages"
          :key="page"
          :class="{ active: page === pageIn.current_page}"
        >
          <a class="page-link" href="#" @click.prevent="geInfosInPagis(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: !pageIn.has_next }">
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            @click.prevent="geInfosInPagis(pageIn.current_page + 1)"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  data () {
    return {}
  },
  props: ['pageIn'],
  methods: {
    geInfosInPagis (page) {
      this.$emit('getInfosFromPagi', page)
    }
  }
}
</script>
