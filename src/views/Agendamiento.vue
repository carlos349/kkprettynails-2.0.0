<template>
    <div>
        <base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
            style="min-height: 50px; background-image: url(img/theme/agenda.jpg); background-size: cover; background-position: center top;height:45vh;">
            <!-- Mask -->
            <span style="background-color:#172b4d !important" class="mask  opacity-7"></span>
            <!-- Header container -->
            <div class="container-fluid d-flex align-items-center">
                <div class="row">
                    <div class="col-lg-12 col-md-12">
                        <h1 class="display-2 text-white w-100">Sección de Agenda</h1>
                        <p class="text-white mt-0 mb-5">Esta es la sección administrativa de agendamiento, aquí podrás registrar, editar y visualizar tu agenda.</p>
                        <a @click="modals.modal1 = true"  class="btn btn-success text-white">Agendar</a>
                        <a @click="modals.modal2 = true"  class="btn btn-info text-white">Ventas por procesar</a>
                        <a   class="btn btn-info text-white">Filtrar por empleado</a>
                    </div>
                </div>
            </div>
        </base-header>
        <modal :show.sync="modals.modal1"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-xl">
            <card type="secondary" shadow header-classes="bg-white pb-5" body-classes="px-lg-5 py-lg-5" class="border-0">

                  <!-- WIZARD -->

                <form-wizard color="#214d88" error-color="#f5365c" back-button-text="Regresar" next-button-text="Siguiente" finish-button-text="¡Agendar!">

                    <h2 v-if="registerDate.valid == true" slot="title">Datos de agendamiento</h2>
                    <h2 v-else slot="title" class="text-danger">¡Debe completar los datos!</h2>

                    <tab-content icon="ni ni-bullet-list-67" title="Servicios" :before-change="validateWizardOne">
                        <!-- <base-button size="sm" v-on:click="initialState()" type="secondary" class="text-default p-0 float-right"><i class="ni ni-fat-delete"></i> -->
                        </base-button>
                        <div class="row ml-3">
                            <div v-for="(name, index) in services" :key="name" class="col-6 mb-2 mx-auto">
                                <base-button v-on:click="pushService(name.prestadores,name.nombre,name.tiempo, name.comision, name.precio,name.descuento,index)" class="col-10"  type="default">
                                    <badge class="float-left text-white" pill type="default">
                                        <i class="ni ni-single-02"></i>{{name.prestadores.length}}
                                    </badge>
                                    <span class="float-left">{{name.nombre}}</span>
                                    <badge class="text-default float-right" type="white">{{countServices[index].count}}</badge>
                                </base-button>
                            </div>
                        </div>
                    </tab-content>

                    <tab-content icon="ni ni-collection" title="Información" :before-change="validateWizardTwo">
                        <div class="row">
                            <vue-single-select
                                v-model="registerDate.client"
                                :options="clientsNames"
                                placeholder="Cliente"
                                class="col-5 mx-auto mt-1"
                            ></vue-single-select>
                            <div class="col-5 mx-auto">
                                <base-input addon-left-icon="ni ni-calendar-grid-58">
                                    <flat-picker slot-scope="{focus, blur}"
                                                @on-open="focus"
                                                @on-close="blur"
                                                :config="{allowInput: true}"
                                                class="form-control datepicker"
                                                v-model="registerDate.date"
                                                placeholder="Seleccione una fecha">
                                    </flat-picker>
                                </base-input>
                            </div>
                            
                        </div>  
                    </tab-content>

                    <tab-content icon="ni ni-watch-time" title="Disponibilidad" :before-change="validateWizardThree">
                        
                    </tab-content>
                    <tab-content icon="ni ni-check-bold" title="Finalizar">
                        Yuhuuu! This seems pretty damn simple
                    </tab-content>
                </form-wizard>

                <!-- END WIZARD -->

            </card>
        </modal>
        <vue-cal style="height: 250px" />
        
    </div>
</template>
<script>
  // COMPONENTS
    import VueCal from 'vue-cal'
  import 'vue-cal/dist/vuecal.css'
  import 'vue-cal/dist/i18n/es.js'
  import VueBootstrap4Table from 'vue-bootstrap4-table'
  import flatPicker from "vue-flatpickr-component";
  import "flatpickr/dist/flatpickr.css";
  //Back - End 
  import axios from 'axios'
  import endPoint from '../../config-endpoint/endpoint.js'
  import router from '../router'

  class Event {
    constructor (start, end, title, content) {
      this.start = start
      this.end = end
      this.title = title
      this.content = content
    }
  }

  class Manicurista{
  	constructor(nombre, documento, porcentaje, comision) {
  		this.nombre = nombre;
  		this.documento = documento;
  		this.porcentaje = porcentaje;
  		this.comision = comision;
  	}
  }

  class Servicio{
		constructor(nombre, precio) {
			this.nombre = nombre;
			this.precio = precio;
		}
    }
    
  export default {
    components: {
     VueCal,
     VueBootstrap4Table,
     flatPicker
    },
    data() {
      return {
         countServices:[],
         registerDate: {
             services:[],
             servicesShow:[],
             employe:[],
             client:null,
             block:null,
             date:null,
             valid:true,
         },
         services:[],
         locale: 'es',
         events: [],
         arrowprev:true,
         modals: {
             modal1:false
         },
         clientsNames:[]
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
      this.getClients()
      this.getServices()
    },
    methods: {
        getCitas() {
            if (this.lender != '') {
            this.events = []
            axios.get(endPoint.endpointTarget+'/citas/' + this.lender)
            .then(res => {
                
                for (let index = 0; index < res.data.length; index++) {
                let dateNow = new Date(res.data[index].date)
                let formatDate = ''
                let formatDateTwo = ''
                if (dateNow.getMonth() == 9 || dateNow.getMonth() == 10 || dateNow.getMonth() == 11) {
                    if (dateNow.getDate() < 10) {
                    formatDate = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-0"+dateNow.getDate()+" "+res.data[index].start
                    formatDateTwo = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-0"+dateNow.getDate()+" "+res.data[index].end
                    }else{
                    formatDate = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()+" "+res.data[index].start
                    formatDateTwo = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()+" "+res.data[index].end
                    }
                    
                }else{
                    if (dateNow.getDate() < 10) {
                    formatDate = dateNow.getFullYear() +"-0"+(dateNow.getMonth() + 1)+"-0"+dateNow.getDate()+" "+res.data[index].start
                    formatDateTwo = dateNow.getFullYear() +"-0"+(dateNow.getMonth() + 1)+"-0"+dateNow.getDate()+" "+res.data[index].end
                    }else{
                    formatDate = dateNow.getFullYear() +"-0"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()+" "+res.data[index].start
                    formatDateTwo = dateNow.getFullYear() +"-0"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()+" "+res.data[index].end
                    }  
                }
                let arrayEvents = {
                    start: formatDate,
                    end: formatDateTwo,
                    title: res.data[index].services[0].servicio+" - "+res.data[index].employe,
                    content: res.data[index].client,
                    class: res.data[index].class,
                    cliente: res.data[index].client,
                    services: res.data[index].services,
                    empleada: res.data[index].employe,
                    id:res.data[index]._id,
                    process: res.data[index].process
                }
                this.events.push(arrayEvents)
                }
            })
            }else{
            this.events = []
            axios.get(endPoint.endpointTarget+'/citas')
            .then(res => {
                for (let index = 0; index < res.data.length; index++) {
                let dateNow = new Date(res.data[index].date)
                let formatDate = ''
                let formatDateTwo = ''
                if (dateNow.getMonth() == 9 || dateNow.getMonth() == 10 || dateNow.getMonth() == 11) {
                    if (dateNow.getDate() < 10) {
                    formatDate = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-0"+dateNow.getDate()+" "+res.data[index].start
                    formatDateTwo = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-0"+dateNow.getDate()+" "+res.data[index].end
                    }else{
                    formatDate = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()+" "+res.data[index].start
                    formatDateTwo = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()+" "+res.data[index].end
                    }
                    
                }else{
                    if (dateNow.getDate() < 10) {
                    formatDate = dateNow.getFullYear() +"-0"+(dateNow.getMonth() + 1)+"-0"+dateNow.getDate()+" "+res.data[index].start
                    formatDateTwo = dateNow.getFullYear() +"-0"+(dateNow.getMonth() + 1)+"-0"+dateNow.getDate()+" "+res.data[index].end
                    }else{
                    formatDate = dateNow.getFullYear() +"-0"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()+" "+res.data[index].start
                    formatDateTwo = dateNow.getFullYear() +"-0"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()+" "+res.data[index].end
                    }  
                }
                let arrayEvents = {
                    start: formatDate,
                    end: formatDateTwo,
                    title: res.data[index].services[0].servicio+" - "+res.data[index].employe,
                    content: res.data[index].client,
                    class:res.data[index].class,
                    cliente: res.data[index].client,
                    services: res.data[index].services,
                    empleada: res.data[index].employe,
                    id:res.data[index]._id,
                    process: res.data[index].process
                }
                this.events.push(arrayEvents)
                }
            })
            }
        },
        getServices() {
            axios.get(endPoint.endpointTarget+'/servicios')
            .then(res => {
                this.services = res.data
                for (let index = 0; index < this.services.length; index++) {
                    this.countServices.push({count:0})
                    
                }
                console.log(this.countServices)
            })
        },
        getClients(){
            axios.get(endPoint.endpointTarget+'/clients')
            .then(res => {
				
                
                for (let index = 0; index < res.data.length; index++) {
                    this.clientsNames.push(res.data[index].nombre + " / " + res.data[index].identidad)
                    
                }
            })
        },
        pushService(prestadores,nombre,tiempo, comision, precio,descuento,count){
            if (this.registerDate.services == '') {
                this.registerDate.services.push({'servicio': nombre, 'comision': comision, 'precio': precio, 'descuento': descuento})
                this.registerDate.servicesShow.push(nombre)
                for (let index = 0; index < prestadores.length; index++) {
                    this.registerDate.employe.push(prestadores[index])
                }
            }
            else{
                var inspector = true
                var inspector2 = false
                for (let index = 0; index < this.registerDate.services.length; index++) {
                    if (this.registerDate.services[index].servicio == nombre || this.registerDate.services[index].servicio == nombre + "("+ this.countServices[count].count +")" ) {
                    this.registerDate.servicesShow.splice(index,1)
                    this.registerDate.servicesShow.push(nombre+ "(" + (parseFloat(this.countServices[count].count) +1) + ")")
                    inspector = false
                    
                    break  
                    }
                }
                if (inspector == true) {
                    this.registerDate.services.push({'servicio': nombre, 'comision': comision, 'precio': precio, 'descuento': descuento})
                    this.registerDate.servicesShow.push(nombre)
                }
                for (let c = 0; c < prestadores.length; c++) {
                    for (let index = 0; index < this.registerDate.employe.length; index++) {
                        if (prestadores[c] == this.registerDate.employe[index]) {
                            inspector2 = true
                            break
                        }
                        
                    }  
                    if (inspector2 == false) {
                        this.registerDate.employe.push(prestadores[c])
                    }
                }   
            }
            this.duracion = parseFloat(this.duracion) + parseFloat(tiempo)
            this.countServices[count].count++  
            console.log(this.registerDate)  
        },
        validateWizardOne(){
            if (this.registerDate.services != '') { 
                this.registerDate.valid = true
                return true
            }
            else{
                this.registerDate.valid = false 
                return false
            } 
        },
        validateWizardTwo(){
               if (this.registerDate.services != '') { 
                   this.registerDate.valid = true
                   return true
               }
               else{
                   this.registerDate.valid = false 
                   return false
               } 
        },
        validateWizardThree(){
               if (this.registerDate.services != '') { 
                   this.registerDate.valid = true
                   return true
               }
               else{
                   this.registerDate.valid = false 
                   return false
               } 
        }
    },
    mounted() {
      
    }
  };
</script>
<style></style>
 