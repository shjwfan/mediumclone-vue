<template>
  <div class="container page">
    <div class="row">
      <div class="col-md-6 offset-md-3 col-xs-12 offset-xs-0">
        <h1 class="text-xs-center">Create an account</h1>
        <p class="text-xs-center">
          <span>
            <router-link :to="{name: 'login'}"
              >Already have an account?</router-link
            >
          </span>
          <span> • </span>
          <span class="text-xs-center">
            <router-link :to="{name: 'articles'}">Home page</router-link>
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
              placeholder="Enter your username"
              v-model="username"
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
            :disabled="isAuthenticating"
          >
            Create an account
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {
  actionsTypes as authenticationActionsTypes,
  gettersTypes as authenticationGettersTypes,
} from '@/store/modules/authentication'
import {actionsTypes as userActionsTypes} from '@/store/modules/user'

// components
import McErrors from '@/components/Errors'

export default {
  name: 'McRegisterView',
  data() {
    return {
      email: '',
      username: '',
      password: '',
    }
  },
  components: {
    McErrors,
  },
  computed: {
    ...mapGetters({
      isAuthenticating: authenticationGettersTypes.isOnSubmit,
      errors: authenticationGettersTypes.errors,
    }),
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch(authenticationActionsTypes.register, {
          email: this.email,
          username: this.username,
          password: this.password,
        })
        .then(() => {
          this.$store
            .dispatch(userActionsTypes.pullUser)
            .then(() => {
              this.$router.push({name: 'articles'})
            })
            .catch(error => {
              console.error(`Pulling user error: ${JSON.stringify(error)}`)
            })
        })
        .catch(error => {
          console.error(`Register error: ${JSON.stringify(error)}`)
        })
    },
  },
}
</script>
