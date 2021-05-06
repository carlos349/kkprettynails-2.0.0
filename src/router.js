import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'
import AgendLayout from '@/views/DatesClient'
import ConfirmLayout from '@/views/DatesConfirm'
Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/Sectionclient',
      redirect: 'AgendaCliente',
      component: AgendLayout,
      children: [
        {
          path: '/Agendamientocliente',
          name: '',
          component: () => import('./views/DatesClient.vue')
        }
      ] 
    },
    {
      path: '/Sectionclientconfirm',
      redirect: 'confirmCliente',
      component: ConfirmLayout,
      children: [
        {
          path: '/ConfirmacionAgenda',
          name: '',
          component: () => import('./views/DatesConfirm.vue')
        }
      ] 
    },
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
          path: '/Pedidos',
          name: '',
          component: () => import('./views/Orders.vue')
        },
        {
          path: '/icons',
          name: '',
          component: () => import('./views/Icons.vue')
        },
        {
          path: '/profile',
          name: '',
          component: () => import('./views/UserProfile.vue')
        },
        {
          path: '/configuration',
          name: '',
          component: () => import('./views/Configuration.vue')
        },
        {
          path: '/reporteCierre',
          name: '',
          component: () => import('./views/reportClosure.vue')
        },
        {
          path: '/store',
          name: '',
          component: () => import('./views/Store.vue')
        },
        {
          path: '/tables',
          name: '',
          component: () => import('./views/Tables.vue')
        },
        {
          path: '/Empleados',
          name: '',
          component: () => import('./views/Employes.vue')
        },
        {
          path: '/Usuarios',
          name: '',
          component: () => import('./views/Users.vue')
        },
        {
          path: '/Ventas',
          name: '',
          component: () => import('./views/Sales.vue')
        },
        {
          path: '/Servicios',
          name: '',
          component: () => import('./views/Services.vue')
        },
        {
          path: '/Clientes',
          name: '',
          component: () => import('./views/Clients.vue')
        },
        {
          path: '/Inventario',
          name: '',
          component: () => import('./views/Inventory.vue')
        },
        {
          path: '/Correo',
          name: '',
          component: () => import('./views/emailBuild.vue')
        },
        {
          path: '/Gastos',
          name: '',
          component: () => import('./views/Expenses.vue')
        },
        {
          path: '/Caja',
          name: '',
          component: () => import('./views/Box.vue')
        },
        {
          path: '/reporteEmpleado',
          name: '',
          component: () => import('./views/reportEmploye.vue')
        },
        {
          path: '/Agendamiento',
          name: '',
          component: () => import('./views/Dates.vue')
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
        },
        {
          path: '/Prueba',
          name: '',
          component: () => import('./views/Prueba.vue')
        }
      ]
    }
  ]
})
