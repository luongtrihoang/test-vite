import { createRouter, createWebHistory } from 'vue-router'
import Users from '../pages/users.vue'
import UserProfile from '../pages/user-profile.vue'

const routes = [
  {
    path: '/',
    name: 'Users',
    component: Users
  },
  {
    path: '/user/:id',
    name: 'UserProfile',
    component: UserProfile,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 