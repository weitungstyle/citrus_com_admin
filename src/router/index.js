import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '*',
    redirect: '/login',
  },
  {
    path: '/admin',
    name: 'Dashboard', 
    component: () => import('../components/Dashboard.vue'),
    children: [
        {
            path: 'orders', 
            name: 'Orders',
            component: () => import('../views/Orders.vue'),
            meta: { requiresAuth: true },
        },
        {
            path: 'products', 
            name: 'Products',
            component: () => import('../views/Products.vue'),
            meta: { requiresAuth: true },
        },
        
        {
            path: 'coupons', 
            name: 'Coupons',
            component: () => import('../views/Coupons.vue'),
            meta: { requiresAuth: true },
        }
    ],
},
];

const router = new VueRouter({
  routes,
  linkActiveClass : 'active',
});

export default router;