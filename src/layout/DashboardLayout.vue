<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar  :background-color="sidebarBackground" short-title="Syswa" title="Syswa">
      <template slot="links">
        <a-dropdown>
          <a-menu class="bg-default" style="margin-left: -5px; width:99%;" slot="overlay" @click="selectBranch">
            <a-menu-item style=":hover{background-color: #172b4d !important;}" class="text-white font-weight-bold" v-for="branch of branches" :key="branch._id+'/'+branch.name" > 
              <a-icon type="shop" style="vertical-align:1px;" />{{branch.name}} 
            </a-menu-item>
          </a-menu>
          <a-button class="mb-2 bg-default text-white font-weight-bold"  style="margin-left: -10px; width:99%;"> {{this.branchName}} <a-icon type="down" style="vertical-align:1px;" /> </a-button>
        </a-dropdown>
        <base-button id="processButton" style="margin-left: -50px;" size="sm" v-if="validRoute('procesar')" type="default" icon="ni ni-tag" v-on:click="modals.modal1 = true">
        <span style="margin-left:15px;">Procesar</span> 
        </base-button>
        <sidebar-item v-if="validRoute('metricas')" :link="{name: 'Metricas', icon: 'ni ni-chart-bar-32 text-primary', path: '/dashboard'}"/>
        <sidebar-item v-if="validRoute('pedidos')" :link="{name: 'Pedidos', icon: 'ni ni-cart text-green', path: '/Pedidos'}"/>
        <sidebar-item v-if="validRoute('usuarios')" :link="{name: 'Usuarios', icon: 'ni ni-key-25 text-red', path: '/Usuarios'}"/>
        <sidebar-item v-if="validRoute('ventas')" :link="{name: 'Ventas', icon: 'ni ni-money-coins text-green', path: '/Ventas'}"/>
        <sidebar-item v-if="validRoute('servicios')" :link="{name: 'Servicios', icon: 'ni ni-bullet-list-67 text-orange', path: '/Servicios'}"/>
        <sidebar-item v-if="validRoute('empleados')" :link="{name: 'Empleados', icon: 'ni ni-badge text-info', path: '/Empleados'}"/>
        <sidebar-item v-if="validRoute('clientes')" :link="{name: 'Clientes', icon: 'ni ni-circle-08 text-default', path: '/Clientes'}"/>
        <sidebar-item v-if="validRoute('inventario')" :link="{name: 'Inventario', icon: 'ni ni-box-2 text-orange', path: '/Inventario'}"/>
        <sidebar-item v-if="validRoute('gastos')" :link="{name: 'Gastos', icon: 'ni ni-tag text-green', path: '/Gastos'}"/>
        <sidebar-item v-if="validRoute('agendamiento')" :link="{name: 'Agendamiento', icon: 'ni ni-calendar-grid-58 text-blue', path: '/Agendamiento'}"/>
        <sidebar-item v-if="validRoute('caja')" :link="{name: 'Caja', icon: 'ni ni-archive-2 text-green', path: '/Caja'}"/>
        <sidebar-item v-if="validRoute('prueba')" :link="{name: 'Prueba', icon: 'ni ni-archive-2 text-green', path: '/Prueba'}"/>
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
              <h6 slot="header" class="modal-title p-0 m-0" id="modal-title-default"></h6>
          <card type="secondary" shadow
                header-classes="bg-white "
                body-classes=""
                class="border-0">
              <template>
                  <div style="margin-top:-10% !important" class="text-muted text-center mb-3">
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
  import axios from 'axios'
  import jwtDecode from 'jwt-decode'
  import endPoint from '../../config-endpoint/endpoint.js'
  import EventBus from '../components/EventBus'
  
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
        auth: [], 
        modals: {
          modal1: false
        },
        branches: [],
        branchName: localStorage.branchName,
        branch: localStorage.branch,
        ifBranch: false
      };
    },
    created(){
      this.getToken()
      this.getBranches()
    },
    methods: {
      getToken(){
        const token = localStorage.userToken
        if (token) {
          const decoded = jwtDecode(token)
          this.auth = decoded.access
        }
      },
      selectBranch(value){
        if (value.key.split('/')[0] != this.branch) {
          localStorage.setItem('branch', value.key.split('/')[0])
          localStorage.setItem('branchName', value.key.split('/')[1])
          this.branch = value.key.split('/')[0]
          this.branchName = value.key.split('/')[1]
          EventBus.$emit('changeBranch', true)
        }
      },
      changeAccess(status){
        this.auth = status 
      },
      async getBranches() {
        const configHeader = {
          headers: {
              "x-database-connect": endPoint.database, 
              "x-access-token": localStorage.userToken
          }
        }
        try {
          const getBranches = await axios.get(endPoint.endpointTarget+'/branches', configHeader)
          if (getBranches.data.status == 'ok') {
              if (getBranches.data.data.length > 1) {
                this.ifBranch = true
              }
              this.branches = getBranches.data.data
          }
        }catch(err){console.log(err)}
      },
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false);
        }
      },
      validRoute(route){
        for (let index = 0; index < this.auth.length; index++) {
          const element = this.auth[index];
          if (element.ruta == route) {
            return true
          }
        }
      }
    },
    mounted() {
      EventBus.$on('loggedin', status => {
        this.branch = localStorage.branch
        this.branchName = localStorage.branchName
        this.getToken()
      })
      EventBus.$on('loggedin-user', status => {
        this.changeAccess(status)
      })
      EventBus.$on('newBranch', status => {
        this.getBranches()
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

@media (max-width: 692px){
  .modal-lg {
      max-width: 400px !important;
  }
}
 table  .text-center{
      text-align: left !important;
  }
  .form-control{
      color: #2F2F2F !important;
  }
  form .text-danger{
    font-size: .5em;
  }
  form .text-default{
    font-size: .5em;
  }
</style>
