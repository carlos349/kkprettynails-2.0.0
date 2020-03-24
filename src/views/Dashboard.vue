<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row">
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Total ventas"
                                type="gradient-red"
                                :sub-title="totalSales"
                                icon="ni ni-active-40"
                                class="mb-1 mb-xl-0"
                    >
                    <template slot="footer">
                        <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 3.48%</span><br>
                        <span class="text-nowrap">Mes pasado <small class="text-muted">( 40 )</small></span>
                    </template>
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Total local"
                                type="gradient-orange"
                                :sub-title="'$ '+totalLocal"
                                icon="ni ni-shop"
                                class="mb-1 mb-xl-0"
                    >
                    <template slot="footer">
                        <span v-if="porcentajeLocal[1] == true" class="text-success mr-2"><i class="fa fa-arrow-up"></i> {{formatFixed(porcentajeLocal[0])}}%</span>
                        <span v-else class="text-danger mr-2"><i class="fa fa-arrow-down"></i> {{formatFixed(porcentajeLocal[0])}}%</span><br>
                        <span class="text-nowrap">Mes pasado <small class="text-muted"> $ {{localAnterior}}</small></span>
                    </template>
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Total comisiones"
                                type="gradient-green"
                                :sub-title="'$ '+comision"
                                icon="ni ni-money-coins"
                                class="mb-1 mb-xl-0"
                    >
                    <template slot="footer">
                        <span v-if="porcentajeGanancia[1] == true" class="text-success mr-2"><i class="fa fa-arrow-up"></i> {{formatFixed(porcentajeGanancia[0])}}%</span>
                        <span v-else class="text-danger mr-2"><i class="fa fa-arrow-down"></i> {{formatFixed(porcentajeGanancia[0])}}%</span><br>
                        <span class="text-nowrap">Mes pasado</span> <small class="text-muted"> $ {{comisionAnterior}}</small>
                    </template>
                    </stats-card>

                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Total"
                                type="gradient-info"
                                :sub-title="'$ '+gananciaTotal"
                                icon="ni ni-chart-bar-32"
                                class="mb-1 mb-xl-0"
                    >

                        <template slot="footer">
                            <span v-if="porcentajeTotal[1] == true" class="text-success mr-2"><i class="fa fa-arrow-up"></i> {{formatFixed(porcentajeTotal[0])}}%</span>
                            <span v-else class="text-danger mr-2"><i class="fa fa-arrow-down"></i> {{formatFixed(porcentajeTotal[0])}}%</span><br>
                            <span class="text-nowrap">Mes pasado</span> <small class="text-muted"> $ {{totalAnterior}}</small>
                        </template>
                    </stats-card>
                </div>
            </div>
        </base-header>

        <!--Charts-->
        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col-12" >
                    <card header-classes="bg-transparent">
                        <div slot="header" class="row align-items-center">
                            <div class="col-4">    
                              <h5>Filtre por fecha</h5>                       
                              <base-input
                              class="mb-1 mt-2" 
                              addon-left-icon="ni ni-calendar-grid-58">
                                  <flat-picker slot-scope="{focus, blur}"
                                              @on-open="focus"
                                              @on-close="blur"
                                              :config="configDatePicker"
                                              class="form-control datepicker"
                                              v-model="dates.range">
                                  </flat-picker>
                              </base-input>
                              
                            </div>
                            <div class="col-4">
                              <h5>¿Que datos desea?</h5>
                              <base-dropdown>
                                <base-button slot="title" type="default" class="dropdown-toggle">
                                    {{textCategories}}
                                </base-button>
                                  <li>
                                      <a class="dropdown-item" v-on:click="validate('Producción por Día', 'dailyProduction')">
                                        Producción por Día
                                      </a>
                                  </li>
                                  <li>
                                      <a class="dropdown-item" v-on:click="validate('Servicios por Día', 'asdasd')">
                                        Servicios por Día
                                      </a>
                                  </li>
                                  <li>
                                      <a class="dropdown-item" v-on:click="validate('Produccíon por prestador', 'sadas')">
                                        Produccíon por prestador
                                      </a>
                                  </li>
                              </base-dropdown>
                            </div>
                            <div class="col-4">
                              <base-button v-if="inspector" class="float-right" v-on:click="runGraph" type="default">Graficar</base-button>
                              <base-button v-else disabled class="float-right" v-on:click="runGraph" type="default">Graficar</base-button>
                            </div>
                        </div>
                        <apexchart ref="chartApis" :height="350" v-if="loaded" :options="chartOptions" :series="series"></apexchart>
                    </card>
                </div>
            </div>
            <!-- End charts-->

            <!--Tables-->
            <div class="row mt-5">
                <div class="col-xl-7 mb-5 mb-xl-0">
                    <page-visits-table></page-visits-table>
                </div>
                <div class="col-xl-5">
                    <card header-classes="bg-transparent">
                        <div slot="header" class="row align-items-center">
                            <div class="col">
                                <h5 class="h3 mb-0">Top 10 clientes</h5>
                            </div>
                        </div>
                        <bar-chart
                                :height="350"
                                ref="barChart"
                                :chart-data="redBarChart.chartData"
                        >
                        </bar-chart>
                    </card>
                </div>
            </div>
            <!--End tables-->
        </div>
    </div>
</template>
<script>
  //Back - End 
  import axios from 'axios'
  import endPoint from '../../config-endpoint/endpoint.js'
  import router from '../router'
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
  export default {
    components: {
      LineChart,
      BarChart,
      PageVisitsTable,
      SocialTrafficTable,
      flatPicker
    },
    data() {
      return {
        loaded:false,
        series: [],
        chartOptions: {
          
        },
        configDatePicker: {
            allowInput: true, 
            dateFormat: 'm-d-Y',
            mode: 'range',
            locale: Spanish, // locale for this instance only          
        }, 
        dates: {
          range: new Date()
        },
        variable:10,
        ventas:[],
        totalLocal:0,
        localAnterior:0,
        gananciaNeta:0,
        gananciaTotal:0,
        localAnterior: 0,
        netaAnterior: 0,
        totalAnterior: 0,
        comision:0,
        comisionAnterior:0,
        porcentajeLocal:[],
        porcentajeGanancia:[],
        porcentajeTotal:[],
        // bigLineChart: {
        //   allData: [
        //     [0, 20, 10, 30, 15, 40, 20, 60, 60],
        //     [0, 20, 5, 25, 10, 30, 15, 40, 40]
        //   ],
        //   activeIndex: 0,
        //   chartData: {
        //     datasets: [],
        //     labels: [],
        //   },
        //   extraOptions: chartConfigs.blueChartOptions,
        // },
        redBarChart: {
          chartData: {}
        },
        clients:[],
        comisionTotal:0,
        totalSales: 0,
        textCategories: 'Categorias de gráficas',
        inspector:  false,
        apiGraph: ''
      };
    },
    beforeCreate(){
      if (!localStorage.getItem('userToken') && localStorage.getItem('status') != 1) {
					this.$swal({ 
						type: 'error',
						title: 'URL restringida',
						showConfirmButton: false,
						timer: 1500
					})
				router.push({name: 'login'})
			}
    },
    created(){
      // this.getClients();
      this.getVentas();
      this.totales(0);
      this.SalesQuantityChartFunc();
      // this.SalesQuantityChartWeekFunc();
      
    },
    methods: {
      validate(text, api){
        this.textCategories = text
        this.apiGraph = api
        this.inspector = true
      },
      runGraph(){
        console.log(this.dates.range)
        const split = this.dates.range.split(' a ')
        axios.get(endPoint.endpointTarget+'/metrics/'+this.apiGraph+'/'+split[0]+':'+split[1])
        .then(res => {
          this.series = res.data.series
          console.log(this.$refs.chartApis)
          this.chartOptions = {
            chart: {
              type: 'area',
              height: 350
            },
            dataLabels: {
              enabled: false
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
            fill: {
              type: 'gradient',
              gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 100]
              }
            }
          }
          this.$refs.chartApis.updateOptions(this.chartOptions, false, true)
          console.log(this.chartOptions)
        })
      },
      getVentas(){
        axios.get(endPoint.endpointTarget+'/metrics/total')
        .then(res => {
         this.totalSales = res.data.status
        })
        .catch(() => {
          this.$swal({
            type: 'error',
            title: 'Acceso invalido, ingrese de nuevo, si el problema persiste comuniquese con el proveedor del servicio',
            showConfirmButton: false,
            timer: 2500
          })
          router.push({name: 'login'})
        })
      },
      totales(month){
        axios.get(endPoint.endpointTarget+'/ventas/totalSales/'+month)
        .then(res => {
          console.log(res.data)
          this.totalLocal = this.formatPrice(res.data.totalLocal)
          this.gananciaNeta = this.formatPrice(res.data.gananciaNeta)
          this.gananciaTotal = this.formatPrice(res.data.gananciaTotal)
          this.localAnterior = this.formatPrice(res.data.localAnterior)
          this.netaAnterior = this.formatPrice(res.data.netaAnterior)
          this.totalAnterior = this.formatPrice(res.data.totalAnterior)
          this.comision = this.formatPrice(res.data.comision)
          this.comisionAnterior = this.formatPrice(res.data.comisionAnterior)
          this.porcentajeLocal.push((parseFloat(this.totalLocal) - parseFloat(this.localAnterior)) / parseFloat(this.totalLocal) * 100)
          this.porcentajeGanancia.push((parseFloat(this.comision) - parseFloat(this.comisionAnterior)) / parseFloat(this.comision) * 100)
          this.porcentajeTotal.push((parseFloat(this.gananciaTotal) - parseFloat(this.totalAnterior)) / parseFloat(this.gananciaTotal) * 100)
          if (this.porcentajeLocal[0] < 0) {
            this.porcentajeLocal.push(false)
          }
          else {
            this.porcentajeLocal.push(true)
          }
          if (this.porcentajeGanancia[0] < 0) {
            this.porcentajeGanancia.push(false)
          }
          else {
            this.porcentajeGanancia.push(true)
          }
          if (this.porcentajeTotal[0] < 0) {
            this.porcentajeTotal.push(false)
          }
          else {
            this.porcentajeTotal.push(true)
          } 
        })
      },
      SalesQuantityChartFunc(){
        const dateNow = new Date()
        console.log(dateNow)
        const dateFormat = dateNow.getFullYear()+'-'+(dateNow.getMonth() + 1)+'-1'
        const dateFormatTwo = dateNow.getFullYear()+'-'+(dateNow.getMonth() + 1)+'-30'
        this.loaded = false
        axios.get(endPoint.endpointTarget+'/metrics/dailyExpenseGainTotal/'+dateFormat+':'+dateFormatTwo)
        .then(res => {	
          const userlist = res.data
          this.series = userlist.series
          
          this.chartOptions = {
            chart: {
              height: 350,
              type: 'area',
              zoom: {
                enabled: true
              },
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              width: [5, 7, 5],
              curve: 'straight',
              dashArray: [0, 8, 5]
            },
            title: {
              text: 'Estadisticas',
              align: 'left'
            },
            legend: {
              tooltipHoverFormatter: function(val, opts) {
                return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
              }
            },
            markers: {
              size: 0,
              hover: {
                sizeOffset: 6
              }
            },
            xaxis: {
              type: 'datetime',
            },
            tooltip: {
              y: [
                {
                  title: {
                    formatter: function (val) {
                      return val+' $'
                    }
                  }
                },
                {
                  title: {
                    formatter: function (val) {
                      return val+' $'
                    }
                  }
                },
                {
                  title: {
                    formatter: function (val) {
                      return val+' $'
                    }
                  }
                }
              ]
            },
            grid: {
              borderColor: '#f1f1f1',
            }
          }
          
          this.loaded = true
        })
        .catch(err => {
          console.error(err)
        })
      },
      initBigChart(index) {
        axios.get(endPoint.endpointTarget+'/metrics/top')
        .then(res => {
          
          var chartData = {
            labels: [],
            datasets: [{
              label: 'Atenciones',
              data: []
            }]
          }
          for (let index = 0; index < res.data.length; index++) {
            const element = res.data[index];
            chartData.labels.push(element.nombre)
            chartData.datasets[0].data.push(element.participacion)
          }
          this.redBarChart.chartData = chartData
          
        })
        
      },
      formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      },
      formatDate(date) {
          let dateFormat = new Date(date)
          return dateFormat.getDate()+"-"+(dateFormat.getMonth() + 1)+"-"+dateFormat.getFullYear()
      },
      
      formatString(val){
        return val.toString()
      },
      formatFixed(val){
        return val.toFixed(2)
      }
    },
    mounted() {
      this.initBigChart(0);
    }
  };
</script>
<style></style>
