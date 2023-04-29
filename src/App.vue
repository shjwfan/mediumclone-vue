<template>
  <div>
    <mc-header />
    <router-view />
  </div>
</template>

<script>
import {actionsTypes as userActionsTypes} from '@/store/modules/user'

// components
import McHeader from '@/components/Header.vue'

export default {
  name: 'McApp',
  components: {
    McHeader,
  },
  mounted() {
    this.$store.dispatch(userActionsTypes.pullUser)
  },
}
</script>
