<template>
  <div>
    <mc-header />
    <router-view />
  </div>
</template>

<script>
// components
import McHeader from '@/components/Header.vue'

export default {
  name: 'McApp',
  components: {
    McHeader,
  },
}
</script>
