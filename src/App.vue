<template>
  <div>
    <mc-header />
    <router-view />
  </div>
</template>

<script>
import {actionsTypes} from '@/store/modules/authentication'

// components
import McHeader from '@/components/Header.vue'

export default {
  name: 'McApp',
  components: {
    McHeader,
  },
  mounted() {
    this.$store.dispatch(actionsTypes.pullUser)
  }
}
</script>
