<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar  :background-color="sidebarBackground" short-title="Syswa" title="Syswa">
      <template slot="links">
        <base-button size="sm" v-if="auth == 1 || auth == 2" type="default" icon="ni ni-tag" v-on:click="modals.modal1 = true">Procesar</base-button>
        <sidebar-item v-if="auth == 1" :link="{name: 'Metricas', icon: 'ni ni-chart-bar-32 text-primary', path: '/dashboard'}"/>
        <sidebar-item v-if="auth == 1" :link="{name: 'Usuarios', icon: 'ni ni-key-25 text-red', path: '/Usuarios'}"/>
        <sidebar-item v-if="auth == 1" :link="{name: 'Ventas', icon: 'ni ni-money-coins text-green', path: '/Ventas'}"/>
        <sidebar-item v-if="auth == 1" :link="{name: 'Servicios', icon: 'ni ni-bullet-list-67 text-orange', path: '/Servicios'}"/>
        <sidebar-item v-if="auth == 1" :link="{name: 'Empleados', icon: 'ni ni-badge text-info', path: '/Empleados'}"/>
        <sidebar-item v-if="auth == 1" :link="{name: 'Clientes', icon: 'ni ni-circle-08 text-default', path: '/Clientes'}"/>
        <sidebar-item v-if="auth == 1" :link="{name: 'Inventario', icon: 'ni ni-box-2 text-orange', path: '/Inventario'}"/>
        <sidebar-item v-if="auth == 1" :link="{name: 'Gastos', icon: 'ni ni-tag text-green', path: '/Gastos'}"/>
        <sidebar-item v-if="auth == 1 || auth == 2 || auth == 3" :link="{name: 'Agendamiento', icon: 'ni ni-calendar-grid-58 text-blue', path: '/Agendamiento'}"/>
        <sidebar-item v-if="auth == 1" :link="{name: 'Caja', icon: 'ni ni-archive-2 text-green', path: '/Caja'}"/>
        <sidebar-item v-if="auth == 1" :link="{name: 'Icons', icon: 'ni ni-planet text-blue', path: '/icons'}"/>

        
       
      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
     <modal :show.sync="modals.modal1"
              body-classes="p-0"
              modal-classes="modal-dialog-centered modal-lg">
          <card type="secondary" shadow
                header-classes="bg-white pb-5"
                body-classes="px-lg-5"
                class="border-0">
              <template>
                  <div class="text-muted text-center mb-3">
                      <h1>KKPrettyNails</h1> 
                  </div>
              </template>
              <template>
                  <procesar></procesar>
              </template>
          </card>
      </modal>
  </div>
</template>
<script>
  import DashboardNavbar from './DashboardNavbar.vue';
  import ContentFooter from './ContentFooter.vue';
  import { FadeTransition } from 'vue2-transitions';
  import Procesar from "../components/Process"
  import Vue from 'vue'
  const EventBus = new Vue()
  // import EventBus from '../components/EventBus'
  export default {
    components: {
      DashboardNavbar,
      ContentFooter,
      FadeTransition,
      'Procesar': Procesar
    },
    data() {
      return {
        sidebarBackground: 'vue', //vue|blue|orange|green|red|primary
        auth: localStorage.status, 
        modals: {
          modal1: false
        }
      };
    },
    created(){
      
    },
    methods: {
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false);
        }
      }
    },
    mounted() {
      EventBus.$on('logged-in', status => {
        console.log(status)
        this.auth = status
      })
    }
  };
</script>
<style lang="scss">
@media (min-width: 992px){
  .modal-lg {
      max-width: 600px !important;
  }
}

</style>
