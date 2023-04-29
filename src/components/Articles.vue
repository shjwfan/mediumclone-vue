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
  <div v-if="pullingErrors !== null">{{ pullingErrors }}</div>
  <div v-if="isPulling">Pulling...</div>
</template>

<script>
import {mapGetters} from 'vuex'
import {
  actionsTypes as articlesActionsTypes,
  gettersTypes as articlesGettersTypes,
} from '@/store/modules/articles'

export default {
  name: 'McArticles',
  props: {
    pullingUrl: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      articles: articlesGettersTypes.articles,
      pullingErrors: articlesGettersTypes.pullingErrors,
      isPulling: articlesGettersTypes.isPulling,
    }),
  },
  mounted() {
    this.$store.dispatch(articlesActionsTypes.pullArticles, {
      pullingUrl: this.pullingUrl,
    })
  },
}
</script>
