<template>
    <div>
        <base-header v-if="validRoute('metricas', 'filtrar')" class="header pb-5 pt-2 pt-lg-4 d-flex align-items-center"
            style="min-height: 50px; background-image: url(img/theme/reportes.jpg); background-size: cover; background-position: center top;">
            <!-- Mask -->
            <span style="background-color:#172b4d !important" class="mask  opacity-7"></span>
            <!-- Card stats -->
            <div class="row">
                <div class="col-12">
                    <div class="text-absolute" style="top:10%;">
                        <p class="mb-0 display-4 text-white">Reportes</p>
                    </div>
                    <div class="row p-0">
                      <div class="col-md-3 px-1">
                          <stats-card title="Comparación de ventas"
                              type="gradient-orange"
                              :sub-title="thisMonth.totalSale | formatPrice"
                              icon="ni ni-basket"
                              class="mt-6">
                              <template slot="footer">
                                  <span :class="percentTotalSale >= 0 ? 'text-success' : 'text-danger'" class="mr-2">
                                      <i :class="percentTotalSale >= 0 ? 'fa fa-arrow-up' : 'fa fa-arrow-down'"></i> 
                                      {{percentTotalSale}}%
                                  </span><br>
                                  <span class="text-nowrap">
                                      Mes pasado 
                                      <small class="text-muted">  
                                          {{prevMonth.totalSale | formatPrice}}
                                      </small>
                                      <br><br>
                                  </span>
                              </template>
                          </stats-card>
                      </div>
                      <div class="col-md-3 px-1">
                          <stats-card title="Comparación de items"
                              type="gradient-orange"
                              :sub-title="thisMonth.totalItems"
                              icon="ni ni-bell-55"
                              class="mt-6">
                              <template slot="footer">
                                  <span :class="percentTotalItems >= 0 ? 'text-success' : 'text-danger'" class="mr-2">
                                      <i :class="percentTotalItems >= 0 ? 'fa fa-arrow-up' : 'fa fa-arrow-down'"></i> 
                                      {{percentTotalItems}}%
                                  </span><br>
                                  <span class="text-nowrap">
                                      Mes pasado 
                                      <small class="text-muted">  
                                          {{prevMonth.totalItems}}
                                      </small>
                                      <br><br>
                                  </span>
                              </template>
                          </stats-card>
                      </div>
                      <div class="col-md-3 px-1">
                          <stats-card title="Totales"
                              type="gradient-orange"
                              sub-title="Tipos de pago"
                              icon="ni ni-credit-card"
                              class="mt-6">
                              <template slot="footer">
                                  <span v-for="pay of paysData" :key="pay.type" class="text-nowrap">
                                      {{pay.type}} 
                                      <small class="text-muted">  
                                          {{pay.total | formatPrice}}
                                      </small>
                                      <br>
                                  </span>
                              </template>
                          </stats-card>
                      </div>
                      <div class="col-md-3 px-1">
                          <stats-card title="Promedios"
                              type="gradient-orange"
                              sub-title="Ventas y servicios"
                              icon="ni ni-atom"
                              class="mt-6">
                              <template slot="footer">
                                 <p>
                                  Promedio ventas {{promedySales | formatPrice}}<br>
                                  Promedio servicios {{promedyServices | formatPrice}}
                                </p>
                              </template>
                          </stats-card>
                      </div>
                    </div>
                </div>
            </div>
        </base-header>
        <base-header v-else type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
          <!-- Card stats -->
            <!-- <div class="row">
                <div class="col-xl-3 col-lg-6">
                  <stats-card title="Servicios del mes"
                    type="gradient-orange"
                    :sub-title="servicesLender"
                    icon="ni ni-single-02"
                    class="mb-1 mb-xl-0"
                  >
                  </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Avances del mes"
                      type="gradient-orange"
                      :sub-title="'$ '+formatPrice(lenderAvancements)"
                      icon="ni ni-single-02"
                      class="mb-1 mb-xl-0"
                    >
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Bonos del mes"
                      type="gradient-green"
                      :sub-title="'$ '+formatPrice(lenderBonus)"
                      icon="ni ni-single-02"
                      class="mb-1 mb-xl-0"
                    >
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Total generado"
                      type="gradient-info"
                      :sub-title="'$ '+formatPrice(lenderComission)"
                      icon="ni ni-single-02"
                      class="mb-1 mb-xl-0"
                    >
                    </stats-card>
                </div>
            </div> -->
        </base-header>
        <!--Charts-->
        <template v-if="validRoute('metricas', 'filtrar')"> 
          <card 
            shadow>
            <template slot="header">
              <div class="row">
                <div class="col-md-4">
                  <a-range-picker
                    :ranges="{ Today: [moment(), moment()], 'Este mes': [moment(), moment().endOf('month')] }"
                    format="MM-DD-YYYY"
                    @change="selectDate"
                    class="w-100"
                  />
                </div>
                <div class="col-md-4">
                  <a-select default-value="Produccion total" class="w-100" @change="selectType">
                    <a-select-option value="totalSales">
                      Producción total
                    </a-select-option>
                    <a-select-option value="totalServices">
                      Servicios totales
                    </a-select-option>
                    <a-select-option value="totalByEmploye">
                      Produccion por empleado
                    </a-select-option>
                    <a-select-option value="commissionsByEmploye">
                      Comision por empleado
                    </a-select-option>
                    <a-select-option value="servicesByEmploye">
                      Servicios por empleado
                    </a-select-option>
                    <a-select-option value="diaryPromedies">
                      Promedios diarios
                    </a-select-option>
                    <a-select-option value="totalExpenses">
                      Gastos totales
                    </a-select-option>
                  </a-select>
                </div>
                <div class="col-md-4">
                  <base-button @click="filterGraph" style="margin-top:10px;" size="sm" type="success">
                      <a-icon type="filter" class="mr-2" style="vertical-align:1px;font-size:1.6em;" />
                      Filtrar
                  </base-button>
                </div>
              </div>
            </template>
            <template>
              <div class="row mt-2">
                <div class="col-md-8">
                  <apexchart v-if="change" ref="chartApis" :height="350" :options="chartOptions" :series="graphData"></apexchart>
                  <apexchart v-else ref="chartApisDaily" :height="350" :options="chartDaily" :series="graphDataDaily"></apexchart>
                </div>
                <div class="col-md-4">
                  <stats-card title="Promedios"
                      type="gradient-orange"
                      :sub-title="thisMonth.totalSale | formatPrice"
                      icon="ni ni-chart-bar-32"
                      class="mt-2">
                  </stats-card>
                </div>
              </div>
            </template>
          </card>
        </template>
        <template v-else>

        </template> 
    </div>
</template>
<script>
  //Back - End 
  import axios from 'axios'
  import endPoint from '../../config-endpoint/endpoint.js'
  import router from '../router'
  import jwtDecode from 'jwt-decode'
  import moment from 'moment';
  // Charts
  import * as chartConfigs from '@/components/Charts/config';
  import LineChart from '@/components/Charts/LineChart';
  import BarChart from '@/components/Charts/BarChart';
  // Tables
  import SocialTrafficTable from './Dashboard/SocialTrafficTable';
  import PageVisitsTable from './Dashboard/PageVisitsTable';
  //components
  import flatPicker from "vue-flatpickr-component";
  import "flatpickr/dist/flatpickr.css";
  import {Spanish} from 'flatpickr/dist/l10n/es.js';
  import vueCustomScrollbar from 'vue-custom-scrollbar'
  import mixinUserToken from '../mixins/mixinUserToken'
  import XLSX from 'xlsx'
  export default {
    mixins: [mixinUserToken],
    components: {
      LineChart,
      BarChart,
      PageVisitsTable,
      SocialTrafficTable,
      flatPicker,
      vueCustomScrollbar
    },
    data() {
      return {
        configHeader: {
          headers:{
            "x-database-connect": endPoint.database,
            "x-access-token": localStorage.userToken
          }
        },
        moment: moment,
        dateFilter: [
          [(new Date().getMonth()+1)+'-01-'+new Date().getFullYear()],
          [(new Date().getMonth()+1)+'-31-'+new Date().getFullYear()]
        ],
        auth: [],
        lenderId: '',
        branchName: '',
        branch: '',
        thisMonth: {
          totalSale: 0,
          totalItems: 0
        },
        chartOptions: {
            chart: {
              type: 'line',
              height: 350
            },
            dataLabels: {
              enabled: false
            },
            title: {
              text: "Gráfica por día",
              align: 'left'
            },
            markers: {
              size: 0,
              style: 'hollow',
            },
            xaxis: {
              type: 'datetime'
            },
            tooltip: {
              x: {
                type:'datetime',
                format: 'dd MMM yyyy'
              }
            },
        },
        prevMonth: {
          totalSale: 0,
          totalItems: 0
        },
        percentTotalSale: 0,
        percentTotalItems: 0,
        paysData: [],
        promedySales: 0,
        promedyServices: 0,
        graphData: [],
        graphType: '',
        change: true,
        chartDaily: {
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight'
          },
          title: {
            text: 'Producción diaria',
            align: 'left'
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          xaxis: {
            type: "category",
            categories: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
          }
        },
        graphDataDaily: []
      };
    },
    created(){
      this.getToken()
      this.getBranch()
    },
    methods: {
      getToken(){
        const token = localStorage.userToken
        const decoded = jwtDecode(token) 
        this.lenderId = decoded.linkLender
        this.auth = decoded.access
      },
      getBranch(){
        this.branchName = localStorage.branchName  
        this.branch = localStorage.branch
        this.getSales()
        this.getItems()
        this.getPayData()
        this.getDataSale()
        this.getDataService()
      },
      selectDate(dates, dateString){
        this.dateFilter = dateString
        console.log(this.dateFilter)
      },
      selectType(value){
        this.graphType = value
        console.log(this.graphType)
      },
      async filterGraph(){
        if (this.graphType == "diaryPromedies") {
          this.change = false
          try {
            const getSales = await axios.post(`${endPoint.endpointTarget}/metrics/${this.graphType}`, {
              branch: this.branch,
              dates: this.dateFilter
            }, this.configHeader)
            console.log(getSales)
            this.graphDataDaily = getSales.data.series
            this.chartDaily = {
              chart: {
                height: 350,
                type: 'line',
                zoom: {
                  enabled: false
                }
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                curve: 'straight'
              },
              title: {
                text: 'Producción diaria',
                align: 'left'
              },
              grid: {
                row: {
                  colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                  opacity: 0.5
                },
              },
              xaxis: {
                type: 'category',
                categories: getSales.data.categories
              },
            }
            console.log(this.$refs.chartApisDaily)
            this.$refs.chartApisDaily.updateOptions(this.chartDaily, false, true)
          }catch(err){
            console.log(err)
          }
        }else{
          try {
            const getSales = await axios.post(`${endPoint.endpointTarget}/metrics/${this.graphType}`, {
              branch: this.branch,
              dates: this.dateFilter
            }, this.configHeader)
            console.log(getSales)
            this.graphData = getSales.data.series
            this.change = true
            this.$refs.chartApis.updateOptions(this.chartOptions, false, true)
          }catch(err){
            console.log(err)
          }
        }
      },
      async getDataSale(){
        try {
          const getSales = await axios.post(`${endPoint.endpointTarget}/metrics/totalSales`, {
            branch: this.branch,
            dates: this.dateFilter
          }, this.configHeader)
          this.promedySales = getSales.data.total / getSales.data.series.length
          this.graphData = getSales.data.series
          this.$refs.chartApis.updateOptions(this.chartOptions, false, true)
        }catch(err){
          console.log(err)
        }
      },
      async getDataService(){
        try {
          const getServices = await axios.post(`${endPoint.endpointTarget}/metrics/totalServices`, {
            branch: this.branch,
            dates: this.dateFilter
          }, this.configHeader)
          this.promedyServices = getServices.data.total / getServices.data.series.length
        }catch(err){
          console.log(err)
        }
      },
      async getSales(){
        try {
          const getSalesTotals = await axios.get(`${endPoint.endpointTarget}/metrics/compareSales/${this.branch}`, this.configHeader)
          this.thisMonth.totalSale = getSalesTotals.data.data.thisMonth
          this.prevMonth.totalSale = getSalesTotals.data.data.prevMonth
          this.percentTotalSale = this.thisMonth.totalSale > 0 ? ((this.thisMonth.totalSale - this.prevMonth.totalSale) / this.thisMonth.totalSale) * 100 : 0
          console.log(getSalesTotals)
        }catch(err){
          console.log(err)
        }
      },
      async getItems(){
        try {
          const getSalesTotals = await axios.get(`${endPoint.endpointTarget}/metrics/compareItems/${this.branch}`, this.configHeader)
          this.thisMonth.totalItems = getSalesTotals.data.data.thisMonth
          this.prevMonth.totalItems = getSalesTotals.data.data.prevMonth
          this.percentTotalItems = this.thisMonth.totalItems > 0 ? ((this.thisMonth.totalItems - this.prevMonth.totalItems) / this.thisMonth.totalItems) * 100 : 0
        }catch(err){
          console.log(err)
        }
      },
      async getPayData(){
        try{
          const getPayData = await axios.get(`${endPoint.endpointTarget}/metrics/totalsTypesPays/${this.branch}`, this.configHeader)
          this.paysData = getPayData.data.data
          console.log(this.paysData)
        }catch(err){
          console.log(err)
        }
      },
      validRoute(route, type){
        for (let index = 0; index < this.auth.length; index++) {
          const element = this.auth[index];
          if (element.ruta == route) {
            for (let i = 0; i < element.validaciones.length; i++) {
              if (type == element.validaciones[i]) { 
                  return true
              } 
            }
          }
        }
      },
    }
  };
</script>
