import Vue from 'vue'
import Router from 'vue-router'
import IndexDB from '@/components/indexedDB-demo/IndexDB'
import AjaxDemo from '@/components/ajax-demo/ajax'
import CssGrid from '@/components/cssGrid-demo/CssGrid'
import Swiper from '@/components/swiper-demo/swiper'
import SwiperDemo from '@/components/swiper-demo/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'indexdb',
      component: IndexDB
    },
    {
      path: '/ajax',
      name: 'ajax-demo',
      component: AjaxDemo
    },
    {
      path: '/css-grid',
      name: 'css-grid-demo',
      component: CssGrid
    },
    {
      path: '/swiper',
      name: 'swiper',
      component: Swiper
    },
    {
      path: '/swiper-demo',
      name: 'swiper-demo',
      component: SwiperDemo
    },
  ]
})
