<template>
  <nav class="navbar">
    <div class="container">
      <router-link class="navbar-brand" :to="{name: 'home'}">
        MediumClone
      </router-link>
      <ul class="nav navbar-nav pull-xs-right" v-if="isAnonymous">
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            :to="{name: 'login'}"
          >
            Login
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            :to="{name: 'register'}"
          >
            Register
          </router-link>
        </li>
      </ul>
      <ul class="nav navbar-nav pull-xs-right" v-else>
        <li class="nav-item">
          <!-- todo: add articles view -->
          <router-link class="nav-link" :to="{name: ''}">
            Articles
          </router-link>
        </li>
        <li class="nav-item">
          <!-- todo: add settings view -->
          <router-link class="nav-link" :to="{name: ''}">
            Settings
          </router-link>
        </li>
        <li class="nav-item">
          <!-- todo: add user view -->
          <router-link class="nav-link" :to="{name: ''}">
            <img
              class="user-pic"
              :src="!!user.image ? user.image : 'user-pic-placeholder.png'"
              alt="user-pic"
            />
            {{ user.username }}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import {mapGetters} from 'vuex'
import {gettersTypes} from '@/store/modules/authentication'

export default {
  name: 'McHeader',
  computed: {
    ...mapGetters({
      isAnonymous: gettersTypes.isAnonymous,
      user: gettersTypes.user,
    }),
  },
}
</script>
