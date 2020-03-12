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
          name: 'perfil',
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
          name: 'empleados',
          component: () => import(/* webpackChunkName: "demo" */ './views/Empleados.vue')
        },
        {
          path: '/Usuarios',
          name: 'usuarios',
          component: () => import(/* webpackChunkName: "demo" */ './views/Usuarios.vue')
        },
        {
          path: '/Ventas',
          name: 'ventas',
          component: () => import(/* webpackChunkName: "demo" */ './views/Ventas.vue')
        },
        {
          path: '/Servicios',
          name: 'servicios',
          component: () => import(/* webpackChunkName: "demo" */ './views/Servicios.vue')
        },
        {
          path: '/Clientes',
          name: 'clientes',
          component: () => import(/* webpackChunkName: "demo" */ './views/Clientes.vue')
        },
        {
          path: '/Inventario',
          name: 'inventario',
          component: () => import(/* webpackChunkName: "demo" */ './views/Inventario.vue')
        },
        {
          path: '/Gastos',
          name: 'gastos',
          component: () => import(/* webpackChunkName: "demo" */ './views/Gastos.vue')
        },
        {
          path: '/Caja',
          name: 'caja',
          component: () => import(/* webpackChunkName: "demo" */ './views/Caja.vue')
        },
        {
          path: '/Agendamiento',
          name: 'agendamiento',
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
