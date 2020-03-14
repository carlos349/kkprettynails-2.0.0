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
          component: () => import('./views/Dashboard.vue')
        },
        {
          path: '/icons',
          name: 'iconos',
          component: () => import('./views/Icons.vue')
        },
        {
          path: '/profile',
          name: 'perfil',
          component: () => import('./views/UserProfile.vue')
        },
        {
          path: '/reporteCierre',
          name: 'reporteCierre',
          component: () => import('./views/reporteCierre.vue')
        },
        {
          path: '/tables',
          name: 'tables',
          component: () => import('./views/Tables.vue')
        },
        {
          path: '/Empleados',
          name: 'empleados',
          component: () => import('./views/Empleados.vue')
        },
        {
          path: '/Usuarios',
          name: 'usuarios',
          component: () => import('./views/Usuarios.vue')
        },
        {
          path: '/Ventas',
          name: 'ventas',
          component: () => import('./views/Ventas.vue')
        },
        {
          path: '/Servicios',
          name: 'servicios',
          component: () => import('./views/Servicios.vue')
        },
        {
          path: '/Clientes',
          name: 'clientes',
          component: () => import('./views/Clientes.vue')
        },
        {
          path: '/Inventario',
          name: 'inventario',
          component: () => import('./views/Inventario.vue')
        },
        {
          path: '/Gastos',
          name: 'gastos',
          component: () => import('./views/Gastos.vue')
        },
        {
          path: '/Caja',
          name: 'caja',
          component: () => import('./views/Caja.vue')
        },
        {
          path: '/Agendamiento',
          name: 'agendamiento',
          component: () => import('./views/Agendamiento.vue')
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
