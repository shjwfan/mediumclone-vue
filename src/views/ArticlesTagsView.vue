<template>
  <div class="container page">
    <mc-banner />
    <div class="row">
      <div class="col-md-9">
        <mc-articles-switch :tag="tag" />
        <mc-articles :pullingUrl="pullingUrl" />
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
import McArticlesSwitch from '@/components/ArticlesSwitch.vue'
import McBanner from '@/components/Banner.vue'
import McTags from '@/components/Tags.vue'

export default {
  name: 'McArticlesFeedView',
  components: {
    McArticles,
    McArticlesSwitch,
    McBanner,
    McTags,
  },
  computed: {
    tag() {
      return String(this.$route.params.tag)
    },
    pullingUrl() {
      return `/articles?tag=${this.tag}`
    },
  },
}
</script>
