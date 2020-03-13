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
                <modal :show.sync="modals.modal2" :gradient="modals.type" modal-classes="modal-danger modal-dialog-centered">
                    <div class="py-3 text-center">
                        <i :class="modals.icon"></i>
                        <h1 class="heading mt-5">{{modals.message}}</h1>
                    </div>
                </modal>
                  <!-- WIZARD -->

                <form-wizard color="#214d88" @on-complete="register" error-color="#f5365c" back-button-text="Regresar" next-button-text="Siguiente" finish-button-text="¡Agendar!">

                    <h2 v-if="registerDate.valid == true" slot="title">Datos de agendamiento {{registerDate.duration }}</h2>
                    <h2 v-else slot="title" class="text-danger">¡Debe completar los datos!</h2>

                    <tab-content icon="ni ni-bullet-list-67" title="Servicios" :before-change="validateWizardOne">
                        <template>
                            <div class="text-muted text-center mt-1">
                                Seleccione los servicios
                            </div>
                        </template>
                        <div class="col-12 mb-1">
                                <center>
                                    <base-button v-if="registerDate.valid2 == true" disabled type="secondary" class="text-default">
                                        <font-awesome-icon class="mx-auto"  icon="redo-alt" />
                                    </base-button>
                                        <base-button v-else v-on:click="initialState()" type="secondary" class="text-default">
                                        <font-awesome-icon class="mx-auto"  icon="redo-alt" />
                                    </base-button>
                                </center>
                                
                        </div>
                        <vue-custom-scrollbar class="row" style="height:35vh;overflow:hidden;overflow-x: hidden;overflow-y:scroll;">
                            <div v-for="(name, index) in services" class="col-6 pl-1 mt-2">
                                <base-button v-on:click="pushService(name.prestadores,name.nombre,name.tiempo, name.comision, name.precio,name.descuento,index)" class="col-12 "  type="default">
                                    <badge class="float-left text-white" pill type="default">
                                        <i class="ni ni-single-02"></i>{{name.prestadores.length}}
                                    </badge>
                                    <span class="float-left">{{name.nombre}}</span>
                                    <badge class="text-default float-right" type="white">{{countServices[index].count}}</badge>
                                </base-button>
                            </div>
                        </vue-custom-scrollbar>
                           <base-checkbox v-model="registerDate.design"  class="mt-5">
                                <h3>¿Se realizara un diseño?</h3> 
                            </base-checkbox>
                    </tab-content>

                    <tab-content style="height:35vh" icon="ni ni-collection" title="Información" :before-change="validateWizardTwo">
                        <div class="row">
                            <div class="col-6" v-on:keyup.enter="selectClient()" @click="selectClient()">
                               <vue-single-select
                                    v-model="registerDate.client"
                                    :options="clientsNames"
                                    
                                    placeholder="Seleccione un cliente"
                                    class="col-12 mx-auto mt-1"
                                ></vue-single-select> 
                            </div>
                            
                            <div class="col-6 mx-auto">
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
                        <template>
                            <div class="text-muted text-center">
                                Datos del cliente
                            </div>
                        </template>
                         <div class="row">
                            <div class="col-md-6">
                                <base-input v-on:keyup="validRegister()" placeholder="Nombre del cliente" v-model="dateClient.name" addon-left-icon="ni ni-circle-08"></base-input>
                            </div>
                            <div class="col-md-6">
                                <base-input v-on:keyup="validRegister()" placeholder="Identidad" v-model="dateClient.id" addon-left-icon="ni ni-key-25"></base-input>
                            </div>
                            <div class="col-md-6">
                                <base-input placeholder="Contacto adicional" v-model="dateClient.infoOne" addon-left-icon="ni ni-fat-add"></base-input>
                            </div>
                            <div class="col-md-6">
                                <base-input placeholder="Contacto adicional" v-model="dateClient.infoTwo" addon-left-icon="ni ni-fat-add"></base-input>
                            </div>
                            <div class="col-6">
                                <base-checkbox v-model="dateClient.discount" class="mt-2">
                                    Descuento de nuevo cliente
                                </base-checkbox>
                            </div>
                            <div class="col-6">
                                <vue-single-select
                                    v-model="dateClient.recommender"
                                    :options="clientsNames"
                                    placeholder="Recomendador"
                                ></vue-single-select>
                            </div>
                            <div v-if="dateClient.valid" class="col-3">
                                <base-button size="sm" class="col-12 mt-2" type="secondary">
                                    <span>Participación</span>
                                    <badge type="default">{{dateClient.partipation}}</badge>
                                </base-button>
                            </div>
                            <div v-if="dateClient.valid" class="col-3">
                                <base-button size="sm" class="col-12 mt-2" type="secondary">
                                    <span>Recomendaciones</span>
                                    <badge type="default">{{dateClient.recommenders}}</badge>
                                </base-button>
                            </div>
                            <div v-if="dateClient.valid" class="col-3">
                                <base-button size="sm" class="col-12 mt-2" type="secondary">
                                    <span>Ultima atención</span>
                                    <badge type="default">{{formatDate(dateClient.lastDate)}}</badge>
                                </base-button>
                            </div>
                            <div v-if="dateClient.valid" class="col-3">
                                <base-button size="sm" class="col-12 mt-2" type="secondary">
                                    <span>Cliente desde</span>
                                    <badge type="default">{{formatDate(dateClient.date)}}</badge>
                                </base-button>
                            </div>
                            <div class="col-5 mx-auto mt-4">
                                <base-button  type="default" v-on:click="clientEdit" v-if="dateClient.valid && dateClient.valid2" class="col-12" icon="fas fa-edit">Editar cliente</base-button>
                                <base-button  type="default"  v-if="dateClient.valid && dateClient.valid2 != true" disabled class="col-12" icon="fas fa-edit">Editar cliente</base-button>
                                <base-button type="success" disabled v-if="dateClient.valid != true && dateClient.valid2 != true" class="col-12" icon="fas fa-user-plus">Registrar cliente</base-button>
                                <base-button type="success" v-if="dateClient.valid != true && dateClient.valid2" class="col-12" icon="fas fa-user-plus">Registrar cliente</base-button>
                            </div>
                            
                        </div>
                    </tab-content>

                    <tab-content style="height:35vh" icon="ni ni-watch-time" title="Disponibilidad" :before-change="validateWizardThree">
                        <div class="row">
                            <div class="text-muted text-center mt-2 col-4">
                                Seleccione un empleado y disponibilidad
                            </div>
                            <base-dropdown class="col-6 mt-1 p-0">
                                <base-button slot="title" type="default" class="dropdown-toggle col-12">
                                     {{registerDate.employeSelect}}
                                </base-button>
                                <li v-for="data in registerDate.employe" v-if="data.restDay != new Date(registerDate.date).getDay()" v-on:click="selectEmploye(data.nombre, data.class, data.restTime)">
                                    <base-button class="dropdown-item" href="#">
                                        <img class="avatar avatar-sm rounded-circle float-left" src="https://www.w3schools.com/howto/img_avatar.png" />  <h4 class="mt-2 ml-4 pl-3">{{data.nombre}}</h4>
                                    </base-button>
                                </li>
                            </base-dropdown>
                            <div class="col-2">
                                <img class="avatar rounded-circle" src="https://www.w3schools.com/howto/img_avatar.png" />
                            </div>
                        </div>
                        <div class="text-muted text-center mt-1">
                                Horario disponible
                            </div>
                        <vue-custom-scrollbar style="height:25vh;overflow:hidden;overflow-x: hidden;overflow-y:scroll;">
                            <div class="col-12" v-for="(block , index) of blockHour">
                                <base-button v-if="block.validator == true" v-on:click="selectBloq(block.Horario, index)" size="sm" class="col-12" type="success">
                                    <badge style="font-size:1em !important" type="white" class="text-default col-5 float-left">{{block.Horario}}</badge>
                                    <span>Disponible</span>
                                </base-button>

                                <base-button disabled v-else-if="block.validator == false" size="sm" class="col-12" type="danger">
                                    <badge style="font-size:1em !important" type="white" class="text-default col-5 float-left">{{block.Horario}}</badge>
                                    <span>Ocupado</span>
                                </base-button>

                                <base-button v-else-if="block.validator == 'select'" size="sm" class="col-12" type="default">
                                    <badge style="font-size:1em !important" type="white" class="text-default col-5 float-left">{{block.Horario}}</badge>
                                    <span>Seleccionado</span>
                                </base-button>

                                <base-button v-else size="sm" disabled class="col-12" type="secondary">
                                    <badge style="font-size:1em !important" type="white" class="text-default col-5 float-left">{{block.Horario}}</badge>
                                    <span>No disponible</span>
                                </base-button>
                            </div>
                        </vue-custom-scrollbar>
                            
                       
                        
                    </tab-content>
                    <tab-content style="height:35vh" icon="ni ni-check-bold" title="Finalizar">
                        <div class="row">
                            <div class="col-6" >
                                <dt>Servicios</dt>
                                <vue-custom-scrollbar class="col-12" style="height:30vh;overflow:hidden;overflow-x: hidden;overflow-y:scroll;">
                                    <base-button v-for="data in registerDate.servicesShow" class="col-10 mt-1" type="secondary">
                                        <span class="float-left">{{data}}</span>
                                        <badge class="text-default float-right" type="success">4</badge>
                                    </base-button>
                                </vue-custom-scrollbar>
                            </div>
                            <div class="col-6">
                                <dt>Información de agenda</dt>
                                <base-button class="col-10 mt-1" type="secondary">
                                    <span class="float-left"> Cliente: </span>
                                    <badge style="font-size:0.8em !important" type="success" class="text-default float-left">{{dateClient.name}}</badge>
                                </base-button>
                                <base-button class="col-10 mt-1" type="secondary">
                                    <span class="float-left"> Identidad: </span>
                                    <badge style="font-size:0.8em !important" type="success" class="text-default float-left">{{dateClient.id}}</badge>
                                </base-button>
                                <base-button class="col-10 mt-1" type="secondary">
                                    <span class="float-left"> Empleado: </span>
                                    <badge style="font-size:0.8em !important" type="success" class="text-default float-left">{{registerDate.employeSelect}}</badge>
                                </base-button>
                                <base-button class="col-10 mt-1" type="secondary">
                                    <span class="float-left"> Fecha: </span>
                                    <badge style="font-size:0.8em !important" type="success" class="text-default float-left">{{registerDate.date}}</badge>
                                </base-button>
                                <base-button class="col-10 mt-1" type="secondary">
                                    <span class="float-left"> Hora de inicio: </span>
                                    <badge style="font-size:0.8em !important" type="success" class="text-default float-left">{{registerDate.start}}</badge>
                                </base-button>
                                <base-button class="col-10 mt-1" type="secondary">
                                    <span class="float-left"> Hora de salida: </span>
                                    <badge style="font-size:0.8em !important" type="success" class="text-default float-left">{{registerDate.end}}</badge>
                                </base-button>
                            </div>
                            <div class="col-6"></div>
                            <div class="col-6"></div>
                            <div class="col-6"></div>
                            <div class="col-6"></div>
                            <div class="col-6"></div>
                            <div class="col-6"></div>
                            <div class="col-6"></div>
                            <div class="col-6"></div>
                        </div>
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
  import vueCustomScrollbar from 'vue-custom-scrollbar'
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
     flatPicker,
     vueCustomScrollbar
    },
    data() {
      return {
         countServices:[],
         employes:[],
         blockHour:[],
         registerDate: {
            services:[],
            servicesShow:[],
            employePerService:[],
            employe:[],
            employeSelect:"Seleccione un empleado",
            employeClass:null,
            employeResTime:null,
            client:null,
            duration:0,
            design:false,
            block:null,
            start:null,
            end:null,
            sort:null,
            date:null,
            valid:true,
            valid2:true,
            valid3:false

         },
         dateClient: {
            name:'',
            id:'',
            infoOne:null,
            infoTwo:null,
            partipation:null,
            recommender:null,
            recommenders:null,
            lastDate:null,
            discount:null,
            date:null,
            _id:null,
            valid:false,
            valid2:false
         },
         clients:[],
         services:[],
         locale: 'es',
         events: [],
         modals: {
             modal1:false,
             modal2: false,
             message: "",
             icon: '',
             type:''
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
      this.getEmployes()
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
        getEmployes(){
  			axios.get(endPoint.endpointTarget+'/manicuristas')
  			.then(res => {
  				this.employes = res.data
  			})
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
				
                this.clients = res.data
                for (let index = 0; index < res.data.length; index++) {
                    this.clientsNames.push(res.data[index].nombre + " / " + res.data[index].identidad)
                    
                }
            })
        },
        clientEdit(){
			const name = this.dateClient.name.split(' ')
			var firstName, lastName, fullName
			if (name[1]) {
				firstName = this.MaysPrimera(name[0])
				lastName = this.MaysPrimera(name[1])
				fullName = firstName+' '+lastName
			}else{
				fullName = this.MaysPrimera(name[0])
			}

			if (this.dateClient.name != '' &&  this.dateClient.id != '') {
				axios.put(endPoint.endpointTarget+'/clients/'+this.dateClient._id, {
					nombreClienteEditar: fullName,
					identidadClienteEditar: this.dateClient.id,
					correoClienteEditar: this.dateClient.infoOne,
					instagramClienteEditar: this.dateClient.infoTwo
				})
				.then(res => {
					console.log(res)
					if (res.data.status == 'Servicio actualizado') {
						this.modals = {
                            modal1:true,
                            modal2: true,
                            message: "¡Emplado editado con exito!",
                            icon: 'ni ni-check-bold ni-5x',
                            type: 'success'
                        }
                        setTimeout(() => {
                            this.getClients();
                            this.registerDate.client = fullName + " / " + this.dateClient.id
                            this.modals = {
                                modal1:true,  
                                modal2: false,
                                message: '',
                                icon: '',
                                type: ''
                            }
                        }, 1500);
                        
						// this.arrayUsers();
						// this.ServicesQuantityChartFunc();
						// this.emitMethodTwo()
					}else{
						this.$swal({
							type: 'error',
							title: 'Cliente ya registrado',
							showConfirmButton: false,
							timer: 1500
						})
					}
				})
			}else{
				this.$swal({
					type: 'error',
					title: 'Llene los datos',
					showConfirmButton: false,
					timer: 1500
				})
			}
			
		},
        pushService(prestadores,nombre,tiempo, comision, precio,descuento,count){
            this.registerDate.valid2 = false
            if (this.registerDate.services == '') {
                this.registerDate.services.push({'servicio': nombre, 'comision': comision, 'precio': precio, 'descuento': descuento})
                this.registerDate.servicesShow.push(nombre)
                for (let index = 0; index < prestadores.length; index++) {
                    this.registerDate.employePerService.push(prestadores[index])
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
                    for (let index = 0; index < this.registerDate.employePerService.length; index++) {
                        if (prestadores[c] == this.registerDate.employePerService[index]) {
                            inspector2 = true
                            break
                        }
                    }  
                    if (inspector2 == false) {
                        this.registerDate.employePerService.push(prestadores[c])
                    }
                }   
            }
            this.registerDate.duration = parseFloat(this.registerDate.duration) + parseFloat(tiempo)
            this.countServices[count].count++  
            console.log(this.registerDate)  
        },
        validateWizardOne(){
            if (this.registerDate.services != '') { 
                this.registerDate.valid = true
                for (let i = 0; i < this.registerDate.employePerService.length; i++) {
                    for (let c = 0; c < this.employes.length; c++) {
                        
                        if (this.employes[c]._id == this.registerDate.employePerService[i] ) {
                        
                        this.registerDate.employe.push(this.employes[c])
                        }               
                    }
                }
                if (this.registerDate.design == true && this.registerDate.valid3 == false) {
                    this.registerDate.duration = parseFloat(this.registerDate.duration) + 15
                    this.registerDate.valid3 = true
                }
                if (this.registerDate.design == false && this.registerDate.valid3 ==true) {
                    this.registerDate.duration = parseFloat(this.registerDate.duration) - 15
                    this.registerDate.valid3 = false
                }
                return true
            }
            else{
                this.registerDate.valid = false 
                return false
            } 
        },
        validateWizardTwo(){
               if (this.registerDate.client != null && this.registerDate.date != null) { 
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
        },
        initialState(){
            this.registerDate = {
                services:[],
                servicesShow:[],
                employePerService:[],
                employe:[],
                employeSelect:null,
                employeClass:null,
                employeResTime:null,
                client:null,
                block:null,
                duration:0,
                design:false,
                date:null,
                sort:null,
                valid:true,
                valid2:true,
                valid3:false
            }
            for (let index = 0; index < this.countServices.length; index++) {
                this.countServices[index].count = 0
            }
        },
        selectClient(){
            if (this.registerDate.client != null) {
                for (let index = 0; index < this.clients.length; index++) {
                    if (this.clients[index].nombre + " / " + this.clients[index].identidad == this.registerDate.client) {
                        this.dateClient = {
                            name:this.clients[index].nombre,
                            id:this.clients[index].identidad,
                            infoOne:this.clients[index].correoCliente,
                            infoTwo:this.clients[index].instagramCliente,
                            partipation:this.clients[index].participacion,
                            recommender:this.clients[index].recomendacion,
                            recommenders:this.clients[index].recomendaciones,
                            lastDate:this.clients[index].ultimaFecha,
                            date:this.clients[index].fecha,
                            _id:this.clients[index]._id,
                            valid:true
                        }
                        this.dateClient.valid2 = true
                        if (this.dateClient.partipation == 0) {
                            this.dateClient.discount = true
                        }
                    }
                }
            }
            else{
                this.dateClient = {
                    name:'',
                    id:'',
                    infoOne:null,
                    infoTwo:null,
                    partipation:null,
                    recommender:null,
                    recommenders:null,
                    lastDate:null,
                    discount:null,
                    date:null,
                    _id:null,
                    valid:false,
                    valid2:false
                }
            }
            
        },
        validRegister(){
            setTimeout(() => {
                if (this.dateClient.name != '' && this.dateClient.id != '') {
                    this.dateClient.valid2 = true
                }
                else{
                    this.dateClient.valid2 = false
                }
            }, 200);
            
        },
        formatDate(date) {
            let dateFormat = new Date(date)
            return dateFormat.getDate()+"-"+(dateFormat.getMonth() + 1)+"-"+dateFormat.getFullYear()+" "+" ("+ dateFormat.getHours()+":"+ dateFormat.getMinutes()+")"
        },
        MaysPrimera(string){
			return string.charAt(0).toUpperCase() + string.slice(1);
        },
        selectEmploye(nombre,clase,restTime){
            this.registerDate.employeSelect = nombre
            this.registerDate.employeClass = clase
            this.registerDate.employeResTime = restTime
            this.insertDate()
        },
        insertDate(){
            this.blockHour = []
            axios.post(endPoint.endpointTarget+'/citas/getBlocks', {
                employe: this.registerDate.employeSelect,
                date: this.registerDate.date,
                time: this.registerDate.duration,
                resTime:this.registerDate.employeResTime
            })
            .then(res => { this.blockHour = res.data })
            .catch(err => { console.log(err) })
        },
        selectBloq(hora, i){
            this.registerDate.start = this.blockHour[i].Horario
            var sortSp = this.registerDate.start.split(":") 
            this.registerDate.sort = sortSp[0]+sortSp[1]

            axios.post(endPoint.endpointTarget+'/citas/getBlocks', {
                employe: this.registerDate.employeSelect,
                date: this.registerDate.date,
                time: this.registerDate.duration,
                resTime : this.registerDate.employeResTime
            })
            .then(res => {
                
                for (let index = 0 ; index <= this.registerDate.duration /15; index++) {
                console.log(this.registerDate.duration)
                res.data[i].validator = 'select'
                this.registerDate.end = res.data[i].Horario
                i++
                
                }
                this.blockHour = res.data
                })
                .catch(err => {
                console.log(err)
                })
        },
        register(){
            axios.post(endPoint.endpointTarget+'/citas', {
            entrada: this.registerDate.start,
            salida: this.registerDate.end,
            sort: this.registerDate.sort,
            fecha: this.registerDate.date,
            cliente: this.dateClient.name + " / " + this.dateClient.id,
            servicios: this.registerDate.services,
            class: this.registerDate.employeClass,
            manicuristas: this.registerDate.employeSelect
            })
            .then(res => {
            if(res.data.status == 'cita creada'){
                this.$swal({
                type: 'success',
                title: 'Cita creada',
                showConfirmButton: false,
                timer: 1500
                })
                this.reloadDate()
            }else if(res.data.status == 'cita ocupada'){
                this.$swal({
                type: 'error',
                title: 'Cita ocupada',
                showConfirmButton: false,
                timer: 1500
                })
            }else{
                console.log(res.data)
            }
            })
        },
    },
    mounted() {
      
    }
  };
</script>
<style>
    .dropdown-menu{
        width: 100%;
        max-height: 30vh;
        overflow:hidden;
        overflow-x: hidden;
        overflow-y:scroll;
    }
</style>
 