import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'
Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/dashboard',
      redirect: 'dashboard',
      component: DashboardLayout,
      children: [
        {
          path: '/dashboard',
          name: 'Metricas',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "demo" */ './views/Dashboard.vue')
        },
        {
          path: '/icons',
          name: 'iconos',
          component: () => import(/* webpackChunkName: "demo" */ './views/Icons.vue')
        },
        {
          path: '/profile',
          name: '',
          component: () => import(/* webpackChunkName: "demo" */ './views/UserProfile.vue')
        },
        {
          path: '/maps',
          name: 'maps',
          component: () => import(/* webpackChunkName: "demo" */ './views/Maps.vue')
        },
        {
          path: '/tables',
          name: 'tables',
          component: () => import(/* webpackChunkName: "demo" */ './views/Tables.vue')
        },
        {
          path: '/Empleados',
          name: '',
          component: () => import(/* webpackChunkName: "demo" */ './views/Empleados.vue')
        },
        {
          path: '/Usuarios',
          name: '',
          component: () => import(/* webpackChunkName: "demo" */ './views/Usuarios.vue')
        },
        {
          path: '/Ventas',
          name: '',
          component: () => import(/* webpackChunkName: "demo" */ './views/Ventas.vue')
        },
        {
          path: '/Servicios',
          name: '',
          component: () => import(/* webpackChunkName: "demo" */ './views/Servicios.vue')
        },
        {
          path: '/Clientes',
          name: '',
          component: () => import(/* webpackChunkName: "demo" */ './views/Clientes.vue')
        },
        {
          path: '/Inventario',
          name: '',
          component: () => import(/* webpackChunkName: "demo" */ './views/Inventario.vue')
        },
        {
          path: '/Gastos',
          name: '',
          component: () => import(/* webpackChunkName: "demo" */ './views/Gastos.vue')
        },
        {
          path: '/Caja',
          name: '',
          component: () => import(/* webpackChunkName: "demo" */ './views/Caja.vue')
        },
        {
          path: '/Agendamiento',
          name: '',
          component: () => import(/* webpackChunkName: "demo" */ './views/Agendamiento.vue')
        }
      ]
    },
    {
      path: '/',
      redirect: 'login',
      component: AuthLayout,
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "demo" */ './views/Login.vue')
        },
        {
          path: '/register',
          name: 'register',
          component: () => import(/* webpackChunkName: "demo" */ './views/Register.vue')
        }
      ]
    }
  ]
})
