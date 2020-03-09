<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row">
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Total ventas"
                                type="gradient-red"
                                :sub-title="parseInt(ventas.length)"
                                icon="ni ni-active-40"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 3.48%</span>
                            <span class="text-nowrap">Desde el mes pasado <small class="text-muted">( 40 )</small></span>
                        </template>
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Total local"
                                type="gradient-orange"
                                :sub-title="totalLocal + ' $'"
                                icon="ni ni-shop"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <span v-if="porcentajeLocal[1] == true" class="text-success mr-2"><i class="fa fa-arrow-up"></i> {{porcentajeLocal[0].toFixed(2)}}%</span>
                            <span v-else class="text-danger mr-2"><i class="fa fa-arrow-down"></i> {{porcentajeLocal[0].toFixed(2)}}%</span>
                            <span class="text-nowrap">Desde el mes pasado <small class="text-muted">( {{localAnterior}} $ )</small></span>
                        </template>
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Ganancias"
                                type="gradient-green"
                                :sub-title="gananciaNeta + ' $'"
                                icon="ni ni-money-coins"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <span v-if="porcentajeGanancia[1] == true" class="text-success mr-2"><i class="fa fa-arrow-up"></i> {{porcentajeGanancia[0].toFixed(2)}}%</span>
                            <span v-else class="text-danger mr-2"><i class="fa fa-arrow-down"></i> {{porcentajeGanancia[0].toFixed(2)}}%</span>
                            <span class="text-nowrap">Desde el mes pasado</span> <small class="text-muted">( {{netaAnterior}} $ )</small>
                        </template>
                    </stats-card>

                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Total"
                                type="gradient-info"
                                :sub-title="gananciaTotal + ' $'"
                                icon="ni ni-chart-bar-32"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <span v-if="porcentajeTotal[1] == true" class="text-success mr-2"><i class="fa fa-arrow-up"></i> {{porcentajeTotal[0].toFixed(2)}}%</span>
                            <span v-else class="text-danger mr-2"><i class="fa fa-arrow-down"></i> {{porcentajeTotal[0].toFixed(2)}}%</span>
                            <span class="text-nowrap">Desde el mes pasado</span> <small class="text-muted">( {{totalAnterior}} $ )</small>
                        </template>
                    </stats-card>
                </div>
            </div>
        </base-header>

        <!--Charts-->
        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col-xl-8 mb-5 mb-xl-0">
                    <card type="default" header-classes="bg-transparent">
                        <div slot="header" class="row align-items-center">
                            <div class="col">
                                <h6 class="text-light text-uppercase ls-1 mb-1">Overview</h6>
                                <h5 class="h3 text-white mb-0">Sales value</h5>
                            </div>
                            <div class="col">
                                <ul class="nav nav-pills justify-content-end">
                                    <li class="nav-item mr-2 mr-md-0">
                                        <a class="nav-link py-2 px-3"
                                           href="#"
                                           :class="{active: bigLineChart.activeIndex === 0}"
                                           @click.prevent="initBigChart(0)">
                                            <span class="d-none d-md-block">Month</span>
                                            <span class="d-md-none">M</span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link py-2 px-3"
                                           href="#"
                                           :class="{active: bigLineChart.activeIndex === 1}"
                                           @click.prevent="initBigChart(1)">
                                            <span class="d-none d-md-block">Week</span>
                                            <span class="d-md-none">W</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <line-chart
                                :height="350"
                                ref="bigChart"
                                :chart-data="bigLineChart.chartData"
                                :extra-options="bigLineChart.extraOptions"
                        >
                        </line-chart>

                    </card>
                </div>

                <div class="col-xl-4">
                    <card header-classes="bg-transparent">
                        <div slot="header" class="row align-items-center">
                            <div class="col">
                                <h6 class="text-uppercase text-muted ls-1 mb-1">Performance</h6>
                                <h5 class="h3 mb-0">Total orders</h5>
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
            <!-- End charts-->

            <!--Tables-->
            <div class="row mt-5">
                <div class="col-xl-8 mb-5 mb-xl-0">
                    <page-visits-table></page-visits-table>
                </div>
                <div class="col-xl-4">
                    <social-traffic-table></social-traffic-table>
                </div>
            </div>
            <!--End tables-->
        </div>
        <div>
          <apexchart type="line" height="600" :options="chartOptions" :series="series"></apexchart>
        </div>

    </div>
</template>
<script>
  //Back - End 
  import axios from 'axios'
  import endPoint from '../../config-endpoint/endpoint.js'
  // Charts
  import * as chartConfigs from '@/components/Charts/config';
  import LineChart from '@/components/Charts/LineChart';
  import BarChart from '@/components/Charts/BarChart';
  // Tables
  import SocialTrafficTable from './Dashboard/SocialTrafficTable';
  import PageVisitsTable from './Dashboard/PageVisitsTable';

  export default {
    components: {
      LineChart,
      BarChart,
      PageVisitsTable,
      SocialTrafficTable,
    },
    data() {
      return {
        series: [{
              name: "Session Duration",
              data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
            },
            {
              name: "Page Views",
              data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
            },
            {
              name: 'Total Visits',
              data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47]
            }
          ],
          chartOptions: {
            chart: {
              height: 350,
              type: 'line',
              zoom: {
                enabled: false
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
              text: 'Page Statistics',
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
              categories: ['01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan', '07 Jan', '08 Jan', '09 Jan',
                '10 Jan', '11 Jan', '12 Jan'
              ],
            },
            tooltip: {
              y: [
                {
                  title: {
                    formatter: function (val) {
                      return val + " (mins)"
                    }
                  }
                },
                {
                  title: {
                    formatter: function (val) {
                      return val + " per session"
                    }
                  }
                },
                {
                  title: {
                    formatter: function (val) {
                      return val;
                    }
                  }
                }
              ]
            },
            grid: {
              borderColor: '#f1f1f1',
            }
          },
        variable:10,
        ventas:[],
        totalLocal:0,
        localAnterior:0,
        gananciaNeta:0,
        gananciaTotal:0,
        porcentajeLocal:[],
        porcentajeGanancia:[],
        porcentajeTotal:[],
        bigLineChart: {
          allData: [
            [0, 20, 10, 30, 15, 40, 20, 60, 60],
            [0, 20, 5, 25, 10, 30, 15, 40, 40]
          ],
          activeIndex: 0,
          chartData: {
            datasets: [],
            labels: [],
          },
          extraOptions: chartConfigs.blueChartOptions,
        },
        redBarChart: {
          chartData: {
            labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
              label: 'Sales',
              data: [25, 20, 30, 22, 17, 29]
            }]
          }
        }
      };
    },
    created(){
      this.getClients();
      this.getVentas();
      this.totales(0);
      this.SalesQuantityChartFunc();
    },
    methods: {
      getClients(){
        console.log(localStorage.nombre)
        axios.get(endPoint.endpointTarget+'/clients')
        .then(res => {
				  
          this.clients = res.data
          for (let i = 0; i < this.clients.length; i++) {
            // this.clients[i].push({thatId:this.clients[i].identidad}) 
            if (this.clients[i].correoCliente) {
              this.clients[i].identidad = this.clients[i].identidad + '\n / ' + this.clients[i].correoCliente 
            }
            if (this.clients[i].instagramCliente) {
              this.clients[i].identidad = this.clients[i].identidad + '\n / ' + this.clients[i].instagramCliente
            }
            this.clients[i].fecha = this.formatDate(this.clients[i].fecha)
            this.clients[i].ultimaFecha = this.formatDate(this.clients[i].ultimaFecha)
				  }
				  
        })
      },
      getVentas(){
        const config = {headers: {'x-access-token': localStorage.userToken}}
        axios.get(endPoint.endpointTarget+'/ventas', config)
        .then(res => {
          
          this.ventas = res.data
          
          let fechaBien = ''
          for (let index = 0; index < this.ventas.length; index++) {
            let fech = new Date(this.ventas[index].fecha)
            fechaBien = fech.getDate() +"/"+ (fech.getMonth() + 1) +"/"+fech.getFullYear() +" "+" ("+ fech.getHours()+":"+ ('0'+fech.getMinutes()).slice(-2)+")"
            this.ventas[index].fecha = fechaBien
            let servicio = ''
            for (let indexTwo = 0; indexTwo < this.ventas[index].servicios.length; indexTwo++) {
              servicio = servicio +'\n'+ this.ventas[index].servicios[indexTwo].servicio
            }
            this.ventas[index].servicios = servicio
          }
        }).catch(err => {
          this.$swal({
            type: 'error',
            title: 'Acceso invalido, ingrese de nuevo, si el problema persiste comuniquese con el proveedor del servicio',
            showConfirmButton: false,
            timer: 2500
          })
          router.push({name: 'Login'})
        })
      },
      totales(month){
        axios.get(endPoint.endpointTarget+'/ventas/totalSales/'+month)
        .then(res => {
          
          this.totalLocal = this.formatPrice(res.data.totalLocal)
          this.gananciaNeta = this.formatPrice(res.data.gananciaNeta)
          this.gananciaTotal = this.formatPrice(res.data.gananciaTotal)
          this.localAnterior = this.formatPrice(res.data.localAnterior)
          this.netaAnterior = this.formatPrice(res.data.netaAnterior)
          this.totalAnterior = this.formatPrice(res.data.totalAnterior)
          this.porcentajeLocal.push((parseFloat(this.totalLocal) - parseFloat(this.localAnterior)) / parseFloat(this.totalLocal) * 100)
          this.porcentajeGanancia.push((parseFloat(this.gananciaNeta) - parseFloat(this.netaAnterior)) / parseFloat(this.gananciaNeta) * 100)
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
      this.loaded = false
        axios.get(endPoint.endpointTarget+'/ventas/GetSalesPerMonth')
        .then(res => {	
          const userlist = res.data
          this.chartdata = userlist
          this.loaded = true
        })
        .catch(err => {
          console.error(err)
        })
      },
      initBigChart(index) {
        let chartData = {
          datasets: [
            {
              label: 'Performance',
              data: this.bigLineChart.allData[index]
            }
          ],
          labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        };
        this.bigLineChart.chartData = chartData;
        this.bigLineChart.activeIndex = index;
      },
      formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      },
      formatDate(date) {
          let dateFormat = new Date(date)
          return dateFormat.getDate()+"-"+(dateFormat.getMonth() + 1)+"-"+dateFormat.getFullYear()
      },
      
    },
    mounted() {
      this.initBigChart(0);
    }
  };
</script>
<style></style>
