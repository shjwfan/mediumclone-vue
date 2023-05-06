<template>
  <div class="container page">
    <mc-banner />
    <div class="row">
      <div class="col-md-9">
        <mc-articles-switch />
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
  name: 'McArticlesView',
  data() {
    return {
      pullingUrl: '/articles',
    }
  },
  components: {
    McArticles,
    McArticlesSwitch,
    McBanner,
    McTags,
  },
}
</script>
