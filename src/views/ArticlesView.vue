<template>
  <div class="container page">
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
    McTags,
  },
}
</script>
