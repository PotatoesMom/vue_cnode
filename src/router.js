import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './components/HomePage.vue'
import HomePageSidebar from './components/HomePageSidebar.vue'
import Details from './components/Details.vue'
import DetailsSidebar from './components/DetailsSidebar.vue'
import User from "@/components/User";

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'homePage',
      components: {
        content: HomePage,
        sidebar: HomePageSidebar
      }
    },
    {
      path: '/topic/:id',
      name: 'detail',
      components: {
        content: Details,
        sidebar: DetailsSidebar
      }
    },
    {
      path: '/user/:loginname',
      name: 'user',
      components: {
        content: User,
        sidebar: HomePageSidebar
      }
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
