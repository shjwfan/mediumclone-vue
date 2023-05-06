<template>
  <div>
    <ul class="nav nav-pills outline-active">
      <li class="nav-item">
        <router-link
          class="nav-link"
          :class="{active: routeName === 'articles'}"
          :to="{name: 'articles'}"
          >Articles</router-link
        >
      </li>
      <li class="nav-item" v-if="tag">
        <router-link
          class="nav-link"
          :class="{active: routeName === 'articlesTags'}"
          :to="{name: 'articlesTags', params: {tag}}"
          >#{{ tag }}</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'McArticlesSwitch',
  props: {
    tag: {
      type: String,
      required: false,
    },
  },
  computed: {
    routeName() {
      return this.$route.name
    },
  },
}
</script>
