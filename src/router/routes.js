import MyLayout from '../layouts/MyLayout'

const routes = [
  {
    path: '/',

    // we use /src/layouts/User component which is imported above
    component: MyLayout,
    children: [
      {
        path: 'games',
        component: () => import('pages/Games.vue')
      },
      {
        path: '',
        component: () => import('pages/Main.vue')
      },
      {
        path: 'login',
        component: () => import('pages/Login.vue')
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
