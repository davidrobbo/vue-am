import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import SimpleBar from '@/components/charts/SimpleBar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})
