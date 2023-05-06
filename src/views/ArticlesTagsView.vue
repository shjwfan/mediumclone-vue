<template>
  <div class="container page">
    <mc-banner />
    <div class="row">
      <div class="col-md-9">
        <mc-articles :pullingUrl="pullingUrl"></mc-articles>
      </div>
      <div class="col-md-3">
        <mc-tags />
      </div>
    </div>
  </div>
</template>

<script>
// components
import McArticles from '@/components/Articles.vue'
import McBanner from '@/components/Banner.vue'
import McTags from '@/components/Tags.vue'

export default {
  name: 'McArticlesFeedView',
  components: {
    McArticles,
    McBanner,
    McTags,
  },
  computed: {
    pullingUrl() {
      const tag = this.$route.params.tag
      return `/articles?tag=${tag}`
    },
  },
}
</script>
