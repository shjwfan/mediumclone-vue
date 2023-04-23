<template>
  <div class="container page">
    <div class="row">
      <div class="col-md-6 offset-md-3 col-xs-12 offset-xs-0">
        <h1 class="text-xs-center">Create an account</h1>
        <p class="text-xs-center">
          <span>Already have an account?</span>
          <span> • </span>
          <span class="text-xs-center">
            <router-link :to="{name: 'home'}">Home page</router-link>
          </span>
        </p>
        <form @submit.prevent="onSubmit">
          <fieldset class="form-group">
            <input
              type="text"
              class="form-control form-control-lg"
              placeholder="Enter your first name"
            />
          </fieldset>
          <fieldset class="form-group">
            <input
              type="text"
              class="form-control form-control-lg"
              placeholder="Enter your last name"
            />
          </fieldset>
          <fieldset class="form-group">
            <input
              type="text"
              class="form-control form-control-lg"
              placeholder="Enter your email"
            />
          </fieldset>
          <fieldset class="form-group">
            <input
              type="text"
              class="form-control form-control-lg"
              placeholder="Enter your phone number"
            />
          </fieldset>
          <fieldset class="form-group">
            <input
              type="text"
              class="form-control form-control-lg"
              placeholder="Enter your username"
            />
          </fieldset>
          <fieldset class="form-group">
            <input
              type="text"
              class="form-control form-control-lg"
              placeholder="Enter your password"
            />
          </fieldset>
          <button class="btn btn-lg btn-primary pull-xs-right">Create</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'McRegisterView',
  methods: {
    onSubmit() {},
  },
}
</script>
