<template>
  <div v-if="tags">
    <span>Tags</span>
    <div>
      <div v-for="(tag, index) in tags" :key="index">
        <router-link
          class="tag-default tag-pill"
          :to="{name: 'articlesTags', params: {tag}}"
        >
          {{ tag }}
        </router-link>
      </div>
    </div>
  </div>
  <mc-pulling-error v-if="pullingError !== null" :error="pullingError" />
  <mc-pulling v-if="isPulling" />
</template>

<script>
import {mapGetters} from 'vuex'
import {
  actionsTypes as tagsActionsTypes,
  gettersTypes as tagsGettersTypes,
} from '@/store/modules/tags'

// components
import McPulling from '@/components/Pulling.vue'
import McPullingError from '@/components/PullingError.vue'

export default {
  name: 'McTags',
  components: {
    McPulling,
    McPullingError,
  },
  computed: {
    ...mapGetters({
      tags: tagsGettersTypes.tags,
      pullingError: tagsGettersTypes.pullingError,
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
