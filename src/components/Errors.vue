<template>
  <ul class="error-messages">
    <li v-for="errorMessage in errorMessages" :key="errorMessage">
      {{ errorMessage }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'McErrors',
  props: {
    errors: {
      type: Object,
      required: true,
    },
  },
  computed: {
    errorMessages() {
      return Object.keys(this.errors).map(key => {
        const errorMessage = this.errors[key].join('. ')
        return `${key} ${errorMessage}`
      })
    },
  },
}
</script>
