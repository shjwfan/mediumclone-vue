<template>
  <div class="container page">
    <div class="row">
      <div class="col-md-6 offset-md-3 col-xs-12 offset-xs-0">
        <h1 class="text-xs-center">Login</h1>
        <p class="text-xs-center">
          <span>
            <router-link :to="{name: 'register'}"
              >Do not have an account yet?</router-link
            >
          </span>
          <span> • </span>
          <span class="text-xs-center">
            <router-link :to="{name: 'home'}">Home page</router-link>
          </span>
        </p>
        <mc-errors v-if="errors" :errors="errors"></mc-errors>
        <form @submit.prevent="onSubmit">
          <fieldset class="form-group">
            <input
              type="text"
              class="form-control form-control-lg"
              placeholder="Enter your email"
              v-model="email"
            />
          </fieldset>
          <fieldset class="form-group">
            <input
              type="text"
              class="form-control form-control-lg"
              placeholder="Enter your password"
              v-model="password"
            />
          </fieldset>
          <button
            class="btn btn-lg btn-primary pull-xs-right"
            :disabled="isOnSubmit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {actionsTypes} from '@/store/modules/authentication'
import {mapState} from 'vuex'

// components
import McErrors from '@/components/Errors.vue'

export default {
  name: 'McLoginView',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  components: {
    McErrors,
  },
  computed: {
    ...mapState({
      isOnSubmit: state => state.authentication.isOnSubmit,
      errors: state => state.authentication.errors,
    }),
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch(actionsTypes.login, {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push({name: 'home'})
        })
        .catch(error => {
          console.error(`Login error: ${JSON.stringify(error)}`)
        })
    },
  },
}
</script>
