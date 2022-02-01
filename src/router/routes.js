const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', component: () => import('pages/Dashboard.vue')},
      {path: '/Dashboard2', component: () => import('pages/Dashboard2.vue')},
      {path: '/Profile', component: () => import('pages/UserProfile.vue')},
      {path: '/TreeTable', component: () => import('pages/TreeTable.vue')},
      {path: '/Directory', component: () => import('pages/Directory.vue') },
      {path: '/SelectTopic', component: () => import('pages/SelectTopic.vue')},
      {path: '/CreatePost', component: () => import('pages/CreatePost.vue')},
      {path: '/CreateTopic', component: () => import('pages/CreateTopic.vue')},
      {path: '/CardHeader', component: () => import('pages/CardHeader.vue')},
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  },
  {
    path: '/Mail',
    component: () => import('layouts/Mail.vue')
  },

  {
    path: '/PostDetails',
    component: () => import('layouts/PostDetailsLayout.vue'),
    children: [
      {path: '/PostDetails', component: () => import('pages/PostDetails.vue')},
    ]
  },
  
  
]

export default routes
