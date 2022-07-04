const routes = [
    {
      path: '/home',
      component: () => import('layouts/MainLayout.vue'),
      children: [
        {path: '/Map', component: () => import('pages/Map.vue')},
        {path: '/MapMarker', component: () => import('pages/MapMarker.vue')},
      ]
    },

    {
      path: '/user',
      component: () => import('src/pages/UserProfile.vue'),
      children: [
        {path: '/profile', component: () => import('pages/UserProfile.vue')},
      ]
    },
  
    {
      path: '/Details',
      component: () => import('layouts/PostDetailsLayout.vue'),
      children: [
        {
          path: '/Details/:id',component: () => import('pages/Details.vue')
          
        },
      ]
    },
  
    {
      path: '/InboxLayout',
      component: () => import('layouts/InboxLayout.vue'),
      children: [
        {
          path: '/Inbox',component: () => import('pages/Inbox.vue')
          
        },
      ]
    },
  
    // Always leave this as last one,
    // but you can also remove it
    {
      path: '/:catchAll(.*)*',
      component: () => import('pages/Error404.vue')
    },

    {
      path: '/',
      component: () => import('src/pages/Login.vue')
    },
    {
      path: '/createaccount',
      component: () => import('pages/CreateAccount.vue')
    },

    {path:'/forgetpassword',
    component: () => import('pages/ForgetPassword.vue'),
        
    },
    {
      path:'/resetpassword/:id/:secretkey', component: () => import('pages/ResetPassword.vue')
    },

    
  ]
  
  export default routes
  