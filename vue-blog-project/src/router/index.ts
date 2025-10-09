import { createRouter, createWebHistory } from 'vue-router'
import MainPageView from '@/views/MainPageView.vue'
import PostDetailView from '@/views/PostDetailView.vue'
import CreatePostView from '@/views/CreatePostView.vue'
import UpdatePostView from '@/views/UpdatePostView.vue'

// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainPageView,
    },
    {
      path: '/post-create',
      name: 'create',
      component: CreatePostView,
    },
    {
      path: '/posts/:id/update',
      name: 'update',
      component: UpdatePostView,
    },
    {
      path: '/posts/:id',
      name: 'post-detail',
      component: PostDetailView
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
