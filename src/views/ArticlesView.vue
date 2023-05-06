<template>
  <div class="container page">
    <div class="row">
      <div class="col-md-9"></div>
      <div class="col-md-3"></div>
    </div>
    <mc-articles :pullingUrl="pullingUrl"></mc-articles>
  </div>
</template>

<script>
// components
import McArticles from '@/components/Articles.vue'

export default {
  name: 'McFeedsView',
  data() {
    return {
      pullingUrl: '/articles',
    }
  },
  components: {
    McArticles,
  },
}
</script>
