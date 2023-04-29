<template>
  <ul class="pagination">
    <li
      class="page-item"
      :class="{active: this.page === page}"
      v-for="page in pages"
      :key="page"
    >
      <router-link class="page-link" :to="{path: url, query: {page: page}}">
        {{ page }}
      </router-link>
    </li>
  </ul>
</template>

<script>
import {range} from '@/utils'

export default {
  name: 'McPagination',
  props: {
    page: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  computed: {
    pages() {
      return range(1, Math.ceil(this.total / this.perPage))
    },
  },
}
</script>
