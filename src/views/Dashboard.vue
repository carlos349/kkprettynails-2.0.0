<template>
    <div>
        <base-header class="header pb-5 pt-2 pt-lg-4 d-flex align-items-center"
            style="min-height: 50px; background-image: url(img/theme/reportes.jpg); background-size: cover; background-position: center top;">
            <!-- Mask -->
            <span style="background-color:#172b4d !important" class="mask  opacity-7"></span>
            <!-- Card stats -->
            <div class="row">
              <div class="col-12 py-5">
                <div class="text-absolute" style="top:10%;">
                  <p class="mb-0 mt-4 display-4 text-white">Reportes</p>
                </div>
              </div>
            </div>
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
                    <a-select-option value="totalsTypesPays">
                      Tipos de pago
                    </a-select-option>
                  </a-select>
                </div>
                <div class="col-md-4">
                  <base-button :disabled="validRoute('metricas', 'filtrar') ? false : true" @click="filterGraph" size="sm" type="default">
                      <a-icon type="filter" style="vertical-align:1px;font-size:1.6em;" />
                  </base-button>
                </div>
              </div>
            </template>
            <template>
              <div class="row mt-2">
                <div class="col-md-8">
                  <a-spin :spinning="loadingChart">
                    <apexchart v-show="change" class="borderClass" ref="chartApis" :height="350" :options="chartOptions" :series="graphData"></apexchart>

                    <apexchart v-show="noChange" class="borderClass" ref="chartApisDaily" :height="350" :options="chartDaily" :series="graphDataDaily"></apexchart>
                  </a-spin>
                </div>
                <div class="col-md-4">
                  <stats-card title="Comparación de ventas"
                      type="gradient-orange"
                      :sub-title="thisMonth.totalSale | formatPrice"
                      icon="ni ni-basket"
                      class="mt-1">
                      <template slot="footer">
                          <span :class="percentTotalSale >= 0 ? 'text-success' : 'text-danger'" class="mr-2">
                              <i :class="percentTotalSale >= 0 ? 'fa fa-arrow-up' : 'fa fa-arrow-down'"></i> 
                              {{percentTotalSale}}%
                          </span>
                          <span class="text-nowrap">
                              Mes pasado 
                              <small class="text-muted">  
                                  {{prevMonth.totalSale | formatPrice}}
                              </small>
                          </span>
                      </template>
                  </stats-card>
                  <stats-card title="Comparación de items"
                      type="gradient-orange"
                      :sub-title="thisMonth.totalItems"
                      icon="ni ni-bell-55"
                      class="mt-1">
                      <template slot="footer">
                          <span :class="percentTotalItems >= 0 ? 'text-success' : 'text-danger'" class="mr-2">
                              <i :class="percentTotalItems >= 0 ? 'fa fa-arrow-up' : 'fa fa-arrow-down'"></i> 
                              {{percentTotalItems}}%
                          </span>
                          <span class="text-nowrap">
                              Mes pasado 
                              <small class="text-muted">  
                                  {{prevMonth.totalItems}}
                              </small>
                          </span>
                      </template>
                  </stats-card>
                  <stats-card title="Promedios"
                      type="gradient-orange"
                      sub-title="Ventas y servicios"
                      icon="ni ni-atom"
                      class="mt-1">
                      <template slot="footer">
                          <p>
                          Promedio ventas {{promedySales | formatPrice}}<br>
                          Promedio servicios {{promedyServices | formatPrice}}
                        </p>
                      </template>
                  </stats-card>
                </div>
              </div>
            </template>
          </card>
          <card 
            class="mt-2"
            shadow>
            <template slot="header">
              <div class="row">
                <div class="col-md-4">
                  <a-select default-value="Produccion anual" class="w-100" @change="selectTypeAnual">
                    <a-select-option value="anualProduction">
                      Producción anual
                    </a-select-option>
                    <a-select-option value="anualServices">
                      Servicios anuales
                    </a-select-option>
                    <a-select-option value="dataExpense">
                      Gastos vs Ganancias anuales
                    </a-select-option>
                    <a-select-option value="dataEmploye">
                      Detalle de empleado
                    </a-select-option>
                  </a-select>
                </div>
                <div v-show="serviceChart" class="col-md-4">
                  <a-select :default-value="services[0].name" class="w-100" @change="selectService">
                    <a-select-option v-for="service of services" :key="service._id" :value="service._id">
                      {{service.name}}
                    </a-select-option>
                  </a-select>
                </div>
                <div v-show="employeChart" class="col-md-4">
                  <a-select :default-value="employes[0].firstName+' '+employes[0].lastName" class="w-100" @change="selectEmploye">
                    <a-select-option v-for="employe of employes" :key="employe._id" :value="employe._id">
                      {{employe.firstName}} {{employe.lastName}}
                    </a-select-option>
                  </a-select>
                </div>
                <div class="col-md-4">
                  <base-button :disabled="validRoute('metricas', 'filtrar') ? false : true" @click="filterAnualGraph" size="sm" type="default">
                      <a-icon type="filter" style="vertical-align:1px;font-size:1.6em;" />
                  </base-button>
                </div>
              </div>
            </template>
            <template>
              <div class="row mt-2">
                <div class="col-md-8">
                  <a-spin :spinning="loadingChartAnual">
                    <apexchart class="borderClass" ref="chartApisAnual" :height="350" :options="chartOptionsAnual" :series="graphDataAnual"></apexchart>
                  </a-spin>
                </div>
                <div class="col-md-4">
                  
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
        loadingChart: true,
        loadingChartAnual: true,
        chartOptionsAnual: {
          chart: {
            type: 'bar',
            height: 350
          },
          
          plotOptions: {
            bar: {
              borderRadius: 10,
              dataLabels: {
                position: 'top', // top, center, bottom
              },
            }
          },
          dataLabels: {
            enabled: true,
            formatter: function (value) {
              let val = (value/1).toFixed(2).replace('.', ',')
              return value > 600 ? '$ '+val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : value
            },
            offsetY: -20,
            style: {
              fontSize: '12px',
              colors: ["#304758"],
              rotate: 180
            }
          },
          title: {
            text: "Gráfica anual",
            align: 'left'
          },
          grid: {
            row: {
              colors: ['#f7fafc', '#f5f5f5'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          xaxis: {
            type: "category",
            categories: ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC']
          },
          tooltip: {
            x: {
              type:'datetime',
              format: 'dd MMM yyyy'
            },
            y: [
              {
                title: {
                  formatter: function (val) {
                    return val+' $'
                  }
                }
              }
            ]
          },
          theme: {
            mode: 'light', 
            palette: 'palette1', 
            monochrome: {
              enabled: false,
              color: '#172b4d',
              shadeTo: 'light',
              shadeIntensity: 0.65
            },
          },
        },
        chartOptions: {
          chart: {
            type: 'bar',
            height: 350
          },
          
          plotOptions: {
            bar: {
              borderRadius: 10,
              dataLabels: {
                position: 'top', // top, center, bottom
              },
            }
          },
          dataLabels: {
            enabled: true,
            formatter: function (value) {
              let val = (value/1).toFixed(2).replace('.', ',')
              return value > 600 ? '$ '+val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : value
            },
            offsetY: -20,
            style: {
              fontSize: '12px',
              colors: ["#304758"],
              rotate: 180
            }
          },
          title: {
            text: "Gráfica por día",
            align: 'left'
          },
          grid: {
            row: {
              colors: ['#f7fafc', '#f5f5f5'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          xaxis: {
            type: 'datetime'
          },
          theme: {
            mode: 'light', 
            palette: 'palette1', 
            monochrome: {
              enabled: false,
              color: '#172b4d',
              shadeTo: 'light',
              shadeIntensity: 0.65
            },
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
        graphDataAnual: [],
        graphType: '',
        change: true,
        noChange: false,
        chartDaily: {
          chart: {
            height: 350,
            type: 'area',
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: true,
            formatter: function (value) {
              let val = (value/1).toFixed(2).replace('.', ',')
              return value > 600 ? '$ '+val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : value
            },
            offsetY: -20,
            style: {
              fontSize: '12px',
              fontWeight: '300',
              colors: ["#304758"]
            }
          },
          theme: {
              mode: 'light', 
              palette: 'palette1', 
              monochrome: {
                enabled: false,
                color: '#255aee',
                shadeTo: 'light',
                shadeIntensity: 0.65
              },
          },
          stroke: {
            curve: 'smooth'
          },
          title: {
            text: 'Producción diaria',
            align: 'left'
          },
          grid: {
            row: {
              colors: ['#FFFAE2', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          xaxis: {
            type: "category",
            categories: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
          }
        },
        graphDataDaily: [],
        serviceChart: false,
        employeChart: false,
        services: [],
        serviceSelect: '',
        employes: [],
        employeSelect: ''
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
        // this.getPayData()
        this.getDataSale()
        this.getDataService()
        this.getDailyGraph()
        this.getChartAnual()
        this.getServices()
        this.getEmployes()
        $('#second').css({'display': 'none'})
        // document.getElementById("second").style.display = "none";
      },
      selectDate(dates, dateString){
        this.dateFilter = dateString
        console.log(this.dateFilter)
      },
      async getServices(){
        this.serviceState = true
        try {
          const services = await axios.get(endPoint.endpointTarget+'/services/'+this.branch, this.configHeader)
          if (services.data.status == 'ok') {
              this.services = services.data.data
              this.serviceSelect = this.services[0]._id
          }else{
              this.services = []
              this.serviceSelect = ''
          }
        }catch(err){
          console.log(err)
        }
      },
      async getEmployes(){
        try{
          const getByBranch = await axios.get(endPoint.endpointTarget+'/employes/employesbybranch/'+this.branch, this.configHeader)
          if (getByBranch.data.data.length > 0) {
            this.employes = getByBranch.data.data
            this.employeSelect = this.employes[0]._id
          }else{
            this.employes = []
            this.employeSelect = ''
          }
        }catch(err){
            res.send(err)
        }
      },
      selectType(value){
        this.graphType = value
        console.log(this.graphType)
      },
      selectService(value){
        this.serviceSelect = value 
      },
      selectEmploye(value){
        this.employeSelect = value
      },
      selectTypeAnual(value){
        this.graphAnualType = value
        if (value == "anualServices") {
          this.serviceChart = true
          this.employeChart = false
        }else if (value == "dataEmploye") {
          this.employeChart = true
          this.serviceChart = false
        }else{
          this.serviceChart = false
          this.employeChart = false
        }
      },
      async getDailyGraph(){
        try {
          const getSales = await axios.post(`${endPoint.endpointTarget}/metrics/diaryPromedies`, {
            branch: this.branch,
            dates: this.dateFilter
          }, this.configHeader)
          this.graphDataDaily = getSales.data.series
          console.log(getSales)
        }catch(err){
          console.log(err)
        }
      },
      async getChartAnual(){
        try {
          const getSales = await axios.post(`${endPoint.endpointTarget}/metrics/anualProduction`, {
            branch: this.branch
          }, this.configHeader)
          this.graphDataAnual = getSales.data.series
          this.loadingChartAnual = false
        }catch(err){
          console.log(err)
        }
      },
      async filterAnualGraph(){
        this.loadingChartAnual = true
        try {
          const getData = await axios.post(`${endPoint.endpointTarget}/metrics/${this.graphAnualType}`, {
            branch: this.branch,
            id: this.graphAnualType == "anualServices" ? this.serviceSelect : this.employeSelect
          }, this.configHeader)
          this.graphDataAnual = getData.data.series
          this.chartOptionsAnual = {
            chart: {
              height: 350,
              type: 'bar',
              zoom: {
                enabled: false
              }
            },
            dataLabels: {
              enabled: true,
              formatter: function (value) {
                let val = (value/1).toFixed(2).replace('.', ',')
                return value > 600 ? '$ '+val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : value
              },
              offsetY: -20,
              style: {
                fontSize: '12px',
                fontWeight: '300',
                colors: ["#304758"]
              }
            },
            theme: {
              mode: 'light', 
              palette: 'palette1', 
              monochrome: {
                enabled: false,
                color: '#255aee',
                shadeTo: 'light',
                shadeIntensity: 0.65
              },
            },
            title: {
              text: 'Gastos totales',
              align: 'left'
            },
            grid: {
              row: {
                colors: ['#FFFAE2', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
              },
            },
            xaxis: {
              type: "category",
              categories: getData.data.categories
            }
          }
          this.$refs.chartApisAnual.updateOptions(this.chartOptionsAnual, false, true, true)
          this.loadingChartAnual = false
        }catch(err){
          console.log(err)
        }
      },
      async filterGraph(){
        if (this.graphType == "diaryPromedies" || this.graphType == "totalExpenses" || this.graphType == "commissionsByEmploye" || this.graphType == "servicesByEmploye" || this.graphType == "totalByEmploye" || this.graphType == "totalsTypesPays") {
          this.loadingChart = true
          this.change = false
          this.noChange = true
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
                type: 'bar',
                zoom: {
                  enabled: false
                }
              },
              dataLabels: {
                enabled: true,
                formatter: function (value) {
                  let val = (value/1).toFixed(2).replace('.', ',')
                  return value > 600 ? '$ '+val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : value
                },
                offsetY: -20,
                style: {
                  fontSize: '12px',
                  fontWeight: '300',
                  colors: ["#304758"]
                }
              },
              theme: {
                mode: 'light', 
                palette: 'palette1', 
                monochrome: {
                  enabled: false,
                  color: '#255aee',
                  shadeTo: 'light',
                  shadeIntensity: 0.65
                },
              },
              title: {
                text: 'Gastos totales',
                align: 'left'
              },
              grid: {
                row: {
                  colors: ['#FFFAE2', 'transparent'], // takes an array which will be repeated on columns
                  opacity: 0.5
                },
              },
              xaxis: {
                type: "category",
                categories: getSales.data.categories
              }
            }
            this.$refs.chartApisDaily.updateOptions(this.chartDaily, false, true, true)
            this.loadingChart = false
          }catch(err){
            console.log(err)
          }
        }else{
          this.loadingChart = true
          this.change = true
          this.noChange = false
          try {
            const getSales = await axios.post(`${endPoint.endpointTarget}/metrics/${this.graphType}`, {
              branch: this.branch,
              dates: this.dateFilter
            }, this.configHeader)
            console.log(getSales)
            this.graphData = getSales.data.series
            this.loadingChart = false
            // this.$refs.chartApis.updateOptions(this.chartOptions, false, true)
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
          this.loadingChart = false
          // this.$refs.chartApis.updateOptions(this.chartOptions, false, true)
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
<style>
.borderClass div svg{
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.apexcharts-toolbar div svg{
  box-shadow: none;
}
</style>
