<template>
  <div>{{ error }}</div>
</template>

<script>
export default {
  name: 'McPullingError',
  props: {
    error: {
      type: String,
      required: false,
      default: 'Pulling error',
    },
  },
}
</script>
