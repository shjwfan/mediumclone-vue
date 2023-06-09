<template>
  <div v-if="articles">
    <div
      class="article-preview"
      v-for="(article, index) in articles"
      :key="index"
    >
      <div class="article-meta">
        <router-link :to="{name: ''}">
          <img :src="article.author.image" :alt="article.author.image" />
        </router-link>
        <div class="info">
          <router-link :to="{name: ''}">
            {{ article.author.username }}
          </router-link>
          <span class="date">{{ article.createdAt }}</span>
        </div>
        <div class="pull-xs-right">
          <router-link :to="{name: ''}">To favorites</router-link>
        </div>
      </div>
      <router-link class="preview-link" :to="{name: ''}">
        <h1>{{ article.title }}</h1>
        <p>{{ article.description }}</p>
        <span>Read more...</span>
      </router-link>
    </div>
  </div>
  <mc-pagination
    :page="page"
    :perPage="perPage"
    :total="articlesCount"
    :url="this.$route.path"
  />
  <mc-pulling-error v-if="pullingError !== null" :error="pullingError" />
  <mc-pulling v-if="isPulling" />
</template>

<script>
import {mapGetters} from 'vuex'
import qs from 'query-string'
import {
  actionsTypes as articlesActionsTypes,
  gettersTypes as articlesGettersTypes,
} from '@/store/modules/articles'
import {PER_PAGE} from '@/vars'

// components
import McPagination from '@/components/Pagination.vue'
import McPulling from '@/components/Pulling.vue'
import McPullingError from '@/components/PullingError.vue'

export default {
  name: 'McArticles',
  props: {
    pullingUrl: {
      type: String,
      required: true,
    },
  },
  components: {
    McPagination,
    McPulling,
    McPullingError,
  },
  computed: {
    page() {
      return Number(this.$route.query.page || '1')
    },
    perPage() {
      return PER_PAGE
    },
    ...mapGetters({
      articles: articlesGettersTypes.articles,
      articlesCount: articlesGettersTypes.articlesCount,
      pullingError: articlesGettersTypes.pullingError,
      isPulling: articlesGettersTypes.isPulling,
    }),
  },
  methods: {
    pullArticles() {
      const url = qs.parseUrl(this.pullingUrl)
      const urlQuery = qs.stringify({
        limit: this.perPage,
        offset: this.page * this.perPage - this.perPage,
        ...url.query,
      })
      this.$store.dispatch(articlesActionsTypes.pullArticles, {
        pullingUrl: `${url.url}?${urlQuery}`,
      })
    },
  },
  mounted() {
    this.pullArticles()
  },
  watch: {
    page() {
      this.pullArticles()
    },
  },
}
</script>
