<template>
  <div v-if="tags">
    <span>Tags</span>
    <div>
      <div v-for="(tag, index) in tags" :key="index">
        <router-link class="tag-default tag-pill" :to="{name: 'articles'}">
          {{ tag }}
        </router-link>
      </div>
    </div>
  </div>
  <div v-if="pullingErrors !== null">{{ pullingErrors }}</div>
  <div v-if="isPulling">Pulling...</div>
</template>

<script>
import {mapGetters} from 'vuex'
import {
  actionsTypes as tagsActionsTypes,
  gettersTypes as tagsGettersTypes,
} from '@/store/modules/tags'

export default {
  name: 'McTags',
  computed: {
    ...mapGetters({
      tags: tagsGettersTypes.tags,
      pullingErrors: tagsGettersTypes.pullingErrors,
      isPulling: tagsGettersTypes.isPulling,
    }),
  },
  methods: {
    pullTags() {
      this.$store.dispatch(tagsActionsTypes.pullTags)
    },
  },
  mounted() {
    this.pullTags()
  },
}
</script>
