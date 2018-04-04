import Vue from 'vue'
import Router from 'vue-router'
import IndexDB from '@/components/indexedDB/IndexDB'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'indexdb',
      component: IndexDB
    }
  ]
})
