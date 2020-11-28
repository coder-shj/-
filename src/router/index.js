import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')
const Detail = () => import('views/detail/Detail')

const routes = [
  {
    path: '',
    redirect: '/home'  //重定向
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/detail/:id',
    component: Detail
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
