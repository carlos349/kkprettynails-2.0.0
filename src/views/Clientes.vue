<template>
    <div>
        <base-header class="header pb-6 pt-5 pt-lg-8 d-flex align-items-center"
                     style="min-height: 50px; background-image: url(img/theme/clients.jpg); background-size: cover; background-position: center top;">
            <!-- Mask -->
            <span style="background-color:#172b4d !important" class="mask  opacity-7"></span>
            <!-- Header container -->
            <div class="container-fluid d-flex align-items-center">
                <div class="row">
                    <div class="col-12">
                        <h1 class="display-2 text-white">Sección de clientes</h1>
                        <p class="text-white mt-0 mb-2">Esta es la sección administrativa de tus clientes, aquí podrás registrar, editar y visualizar todos tus clientes.</p>
                        <a @click="modals.modal1 = true , initialState(2)" class="btn btn-success text-white cursor-pointer">Registrar un cliente</a>
                    </div>
                </div>
            </div>
        </base-header>
        

        <!-- MODAL REGISTRAR -->

        <modal :show.sync="modals.modal1"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-md">
            <card type="secondary" shadow
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-5 py-lg-5"
                  class="border-0">
                <template>
                    <div class="text-muted text-center mb-3">
                        Datos del cliente
                    </div>
                </template>
                <template>
                    <tabs v-if="registerClient.valid2 == true" fill class="flex-column flex-md-row">
                        <card shadow>
                            <tab-pane>
                                <span v-if="registerClient.valid2 == true" slot="title">
                                    <i class="ni ni-collection"></i>
                                    Basicos
                                </span>
                                <form role="form">
                                    <base-input alternative
                                                class="mb-3"
                                                placeholder="Nombre"
                                                v-model="registerClient.name"
                                                v-on:change="validRegister()"
                                                addon-left-icon="ni ni-single-02">
                                    </base-input>
                                    <base-input alternative
                                                type="text"
                                                placeholder="Identificación"
                                                v-model="registerClient.id"
                                                v-on:change="validRegister()"
                                                addon-left-icon="ni ni-key-25">
                                    </base-input>
                                    <base-input alternative
                                                type="text"
                                                placeholder="Contacto adicional"
                                                v-model="registerClient.contactOne"
                                                addon-left-icon="ni ni-collection">
                                    </base-input>
                                    <base-input alternative
                                                type="text"
                                                placeholder="Contacto adicional"
                                                v-model="registerClient.contactTwo"
                                                addon-left-icon="ni ni-collection">
                                    </base-input>
                                    <div class="text-center">
                                        <base-button type="primary" v-if="registerClient.valid == false" disabled class="my-4">{{tipeForm}}</base-button>
                                        <base-button type="primary" v-on:click="clientEdit()" v-else class="my-4">{{tipeForm}}</base-button>
                                    </div>
                                    
                                </form>                                
                            </tab-pane>

                            <tab-pane v-if="registerClient.valid2 == true">
                                <span slot="title">
                                    <i class="ni ni-chart-bar-32"></i>
                                    Avanzados
                                </span>
                                <div class="row">
                                    <base-button class="col-12 mt-1" type="primary">
                                        <span>Participación</span>
                                        <badge class="text-default" type="secondary">{{registerClient.participation}}</badge>
                                    </base-button>
                                    <base-button class="col-12 mt-1" type="primary">
                                        <span class="text-left">Recomendaciones</span>
                                        <badge class="text-default" type="secondary">{{registerClient.recommenders}}</badge>
                                    </base-button>
                                    <base-button class="col-12 mt-1" type="primary">
                                        <span class="text-left">Recomendador</span>
                                        <badge class="text-default" type="secondary">{{registerClient.recommender}}</badge>
                                    </base-button>
                                    <base-button class="col-12 mt-1" type="primary">
                                        <span>Cliente desde</span>
                                        <badge class="text-default" type="secondary">{{registerClient.date}}</badge>
                                    </base-button>
                                    <base-button class="col-12 mt-1" type="primary">
                                        <span>Ultima atención</span>
                                        <badge class="text-default" type="secondary">{{registerClient.lastDate}}</badge>
                                    </base-button>
                                </div>
                            </tab-pane>
                        </card>
                    </tabs>
                    <form v-else role="form">
                        <base-input alternative
                                    class="mb-3"
                                    placeholder="Nombre"
                                    v-model="registerClient.name"
                                    v-on:change="validRegister()"
                                    addon-left-icon="ni ni-single-02">
                        </base-input>
                        <base-input alternative
                                    type="text"
                                    placeholder="Identificación"
                                    v-model="registerClient.id"
                                    v-on:change="validRegister()"
                                    addon-left-icon="ni ni-key-25">
                        </base-input>
                        <base-input alternative
                                    type="text"
                                    placeholder="Contacto adicional"
                                    v-model="registerClient.contactOne"
                                    addon-left-icon="ni ni-collection">
                        </base-input>
                        <base-input alternative
                                    type="text"
                                    placeholder="Contacto adicional"
                                    v-model="registerClient.contactTwo"
                                    addon-left-icon="ni ni-collection">
                        </base-input>
                        <base-checkbox v-model="registerClient.discount" class="mb-3">
                            Descuento de nuevo cliente
                        </base-checkbox>
                        <vue-single-select
                            v-model="registerClient.recommender"
                            :options="clientsNames"
                            placeholder="Recomendador"
                        ></vue-single-select>
                        <div class="text-center">
                            <base-button type="primary" v-if="registerClient.valid == false" disabled class="my-4">{{tipeForm}}</base-button>
                            <base-button type="primary" v-on:click="registerClients()" v-else class="my-4">{{tipeForm}}</base-button>
                        </div>
                        
                    </form>
            </template>
            </card>
        </modal>
        <modal :show.sync="modals.modal2"
               :gradient="modals.type"
               modal-classes="modal-danger modal-dialog-centered">
            <div class="py-3 text-center">
                <i :class="modals.icon"></i>
                <h1 class="heading mt-5">{{modals.message}}</h1>
            </div>
        </modal>
        <base-alert class="positionAlert" type="success" v-if="successRegister">
            <strong>Registrado!</strong> Has registrado al cliente con exito!
        </base-alert>

        <!-- TABLA DE CLIENTES -->

        <vue-bootstrap4-table :rows="rows" :columns="columns" :classes="classes" :config="config">
            <template slot="Administrar" slot-scope="props">
                <b>
                    <base-button size="sm" type="default" @click="modals.modal1 = true , initialState(3), pushData(props.row.nombre, props.row.identidad, props.row.correoCliente, props.row.instagramCliente, props.row.participacion, props.row.recomendacion, props.row.recomendaciones, props.row.ultimaFecha, props.row.fecha, props.row._id)" icon="ni ni-bullet-list-67">Detalles</base-button>
                    <base-button size="sm" v-on:click="deleteClient(props.row._id)" type="warning" icon="ni ni-fat-remove">Eliminar</base-button>
                </b>
            </template>
            <template slot="pagination-info" slot-scope="props">
                Actuales {{props.currentPageRowsLength}} | 
                 Filtrados {{props.filteredRowsLength}} | 
                Registros totales {{props.originalRowsLength}}
            </template>
            <template slot="selected-rows-info" slot-scope="props">
                Total Number of rows selected : {{props.selectedItemsCount}}
            </template>
        </vue-bootstrap4-table>

        <!-- END -->

    </div> 
</template>

<script>
//Back - End 
import axios from 'axios'
import endPoint from '../../config-endpoint/endpoint.js'
import VueBootstrap4Table from 'vue-bootstrap4-table'
import EventBus from '../components/EventBus'
// COMPONENTS

  export default {
    components: {
        VueBootstrap4Table 
    },
    data() {
      return {
        successRegister:false,
        clientsNames: [],
        tipeForm: '',
        registerClient: {
            name:'',
            id:'',
            contactOne:'',
            contactTwo:'',
            recommender:'',
            discount:false,
            valid:false,
            valid2:false,
            recommenders:'',
            lastDate:'',
            date:'',
            participation:0
        },
        modals: {
            modal1: false,
            modal2: false,
            message: "",
            icon: '',
            type:''
        },
        rows: [],
        columns: [{
                label: "Nombre",
                name: "nombre",
                // filter: {
                //     type: "simple",
                //     placeholder: "id"
                // },
                sort: true,
            },
            {
                label: "Identidad",
                name: "identidad",
                // filter: {
                //     type: "simple",
                //     placeholder: "Enter first name"
                // },
                sort: true,
            },
            {
                label: "Correo",
                name: "correoCliente",
                sort: true,
            },
            {
                label: "Instagram",
                name: "instagramCliente",
                sort: true,
                // filter: {
                //     type: "simple",
                //     placeholder: "Enter country"
                // },
            },
            {
                label: "Administrar",
                name: "_id",
                sort: false,
                slot_name: "Administrar"
            },
            ],
        config: {
            card_title: "Tabla de clientes",
            checkbox_rows: false,
            rows_selectable : true,
            highlight_row_hover_color:"rgba(238, 238, 238, 0.623)",
            rows_selectable: true,
            per_page_options: [5, 10, 20, 30, 40, 50, 80, 100],
            global_search: {
                placeholder: "Enter custom Search text",
                visibility: false,
                case_sensitive: false
            },
            show_refresh_button: false,
            show_reset_button: false,  
            selected_rows_info: true,
            preservePageOnDataChange : true,
            pagination_info : true
        },
        classes: {
            table: "table-bordered table-striped"
        }     
      };
    },
    created(){
		this.getClients();
        
    },
    methods: {
        getClients(){
            axios.get(endPoint.endpointTarget+'/clients')
            .then(res => {
				console.log(res.data)
                this.rows = res.data
                for (let index = 0; index < res.data.length; index++) {
                    this.clientsNames.push(res.data[index].nombre + " / " + res.data[index].identidad)
                    
                }
				// for (let i = 0; i < this.clients.length; i++) {
				// 	// this.clients[i].push({thatId:this.clients[i].identidad}) 
				// 	if (this.clients[i].correoCliente) {
				// 		this.clients[i].identidad = this.clients[i].identidad + '\n / ' + this.clients[i].correoCliente 
				// 	}
				// 	if (this.clients[i].instagramCliente) {
				// 		this.clients[i].identidad = this.clients[i].identidad + '\n / ' + this.clients[i].instagramCliente
				// 	}
				// 	this.clients[i].fecha = this.formatDate(this.clients[i].fecha)
				// 	this.clients[i].ultimaFecha = this.formatDate(this.clients[i].ultimaFecha)
					
				// }
				// console.log(this.clients)
            })
        },
        registerClients(){
            console.log(this.registerClient.recommender)
            var ifCheck = this.registerClient.discount ? 0 : 1
            axios.post(endPoint.endpointTarget+'/clients', {
                nombre:this.registerClient.name,
                identidad:this.registerClient.id,
                recomendador:this.registerClient.recommender,
                correoCliente:this.registerClient.contactOne,
                instagramCliente:this.registerClient.contactTwo,
                ifCheck: ifCheck
            })
            .then(res => {
                if (res.data.status == 'Registrado') {
                    this.modals = {
                        modal2: true,
                        message: "Se registro el cliente con exito",
                        icon: 'ni ni-check-bold ni-5x',
                        type: 'success'
                    }
                    setTimeout(() => {
                        this.modals = {
                            modal1: false,
                            modal2: false,
                            message: "",
                            icon: '',
                            type:''
                        }
                        this.initialState(1)
                        this.getClients()
                        EventBus.$emit('reloadClients', 'reload')
                    }, 1500);
                    
                }else{
                    this.modals = {
                        modal2: true,
                        message: "El cliente ya existe",
                        icon: 'ni ni-fat-remove ni-5x',
                        type: 'danger'
                    }
                    setTimeout(() => {
                        this.modals = {
                            modal1: false,
                            modal2: false,
                            message: "",
                            icon: '',
                            type: ''
                        }
                    }, 1500);
                }
            })
        },
        validRegister(){
            if (this.registerClient.name != '' && this.registerClient.id != '') {
                this.registerClient.valid = true
            }
            else {
                this.registerClient.valid = false
            }
        },
        MaysPrimera(string){
			return string.charAt(0).toUpperCase() + string.slice(1);
        },
        initialState(val){
            this.registerClient= {
                name:'',
                id:'',
                contactOne:'',
                discount:false,
                contactTwo:'',
                recommender:0,
                valid:false
            }
            if (val == 1) {
                this.modals = {
                    modal1: false
                }
            }
            if (val == 2) {
                this.tipeForm = 'Registrar'
            }
            if (val == 3) {
                this.tipeForm = 'Editar'
            }
        },
        pushData(nombre,id,correo,ig,participacion,recomendacion,recomendaciones,ultimaFecha,fecha,_id){
            this.registerClient= {
                name:nombre,
                id:id,
                contactOne:correo,
                discount:false,
                contactTwo:ig,
                recommender:recomendacion,
                valid:true,
                valid2:true,
                recommenders:recomendaciones,
                lastDate:this.formatDate(ultimaFecha),
                date:this.formatDate(fecha),
                participation:participacion,
                _id:_id
            }

        },
        formatDate(date) {
            let dateFormat = new Date(date)
            return dateFormat.getDate()+"-"+(dateFormat.getMonth() + 1)+"-"+dateFormat.getFullYear()+" "+" ("+ dateFormat.getHours()+":"+ dateFormat.getMinutes()+")"
        },
        deleteClient(id){
			this.$swal({
				title: '¿Está seguro de borrar el cliente?',
				text: 'No puedes revertir esta acción',
				type: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Estoy seguro',
				cancelButtonText: 'No, evitar acción',
				showCloseButton: true,
				showLoaderOnConfirm: true
			}).then((result) => {
				if(result.value) {
					axios.put(endPoint.endpointTarget+'/clients/deleteClient/'+id)
					.then(res => {
                        if (res.data.status == 'ok') {
                            this.modals = {
                                modal2: true,
                                message: "Cliente borrado con exito",
                                icon: 'ni ni-check-bold ni-5x',
                                type: 'success'
                            }
                            setTimeout(() => {
                                this.modals = {
                                    modal1: false,
                                    modal2: false,
                                    message: "",
                                    icon: '',
                                    type:''
                                }
                                this.getClients()
                                EventBus.$emit('reloadClients', 'reload')
                            }, 1500);
							// this.getClientsThree()
							// this.ServicesQuantityChartFunc();
							// this.emitMethodTwo()
						}
					})
				}
				else{
					this.modals = {
                        modal2: true,
                        message: "Acción cancelada",
                        icon: 'ni ni-check-bold ni-5x',
                        type: 'success'
                    }
                    setTimeout(() => {
                        this.modals = {
                            modal1: false,
                            modal2: false,
                            message: "",
                            icon: '',
                            type:''
                        }
                    }, 1500);
				}
			})
        },
        clientEdit(){
            axios.put(endPoint.endpointTarget+'/clients/'+this.registerClient._id, {
                nombreClienteEditar: this.registerClient.name,
                identidadClienteEditar: this.registerClient.id,
                correoClienteEditar: this.registerClient.contactOne,
                instagramClienteEditar: this.registerClient.contactTwo,
            })
            .then(res => {
                console.log(res)
                if (res.data.status == 'Servicio actualizado') {
                    this.modals = {
                        modal2: true,
                        message: "el cliente editó con exito",
                        icon: 'ni ni-check-bold ni-5x',
                        type: 'success'
                    }
                    setTimeout(() => {
                        this.modals = {
                            modal1: false,
                            modal2: false,
                            message: "",
                            icon: '',
                            type:''
                        }
                        this.getClients();
                        this.initialState(1)
                        EventBus.$emit('reloadClients', 'reload')
                    }, 1500);
                }else{
                    this.modals = {
                        modal2: true,
                        message: "El cliente ya existe",
                        icon: 'ni ni-fat-remove ni-5x',
                        type: 'danger'
                    }
                    setTimeout(() => {
                        this.modals = {
                            modal1: false,
                            modal2: false,
                            message: "",
                            icon: '',
                            type: ''
                        }
                    }, 1500);
                }
            })
		}
    }
  };
</script>
<style lang="scss">
    .card-header{
        font-size: 2.5vw;
    }
    .cursor-pointer{
        cursor: pointer;
    }
    .positionAlert{
    position: absolute;
    top:14%;
    left: 32%;
    z-index: 100000;
}
</style>