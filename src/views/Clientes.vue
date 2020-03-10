<template>
    <div>
        <base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                     style="min-height: 50px; background-image: url(img/theme/clients.jpg); background-size: cover; background-position: center top;">
            <!-- Mask -->
            <span style="background-color:#172b4d !important" class="mask  opacity-7"></span>
            <!-- Header container -->
            <div class="container-fluid d-flex align-items-center">
                <div class="row">
                    <div class="col-lg-7 col-md-10">
                        <h1 class="display-2 text-white">Sección de clientes</h1>
                        <p class="text-white mt-0 mb-5">Esta es la sección administrativa de tus clientes, aquí podrás registrar, editar y visualizar todos tus clientes.</p>
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

        <!-- TABLA DE CLIENTES -->

        <vue-bootstrap4-table :rows="rows" :columns="columns" :classes="classes" :config="config">
            <template slot="Administrar" slot-scope="props">
                <b>
                    <base-button type="default" @click="modals.modal1 = true , initialState(3)" icon="ni ni-bullet-list-67">Detalles</base-button>
                    <base-button type="warning" icon="ni ni-fat-remove">Eliminar</base-button>
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
// COMPONENTS

  export default {
    components: {
        VueBootstrap4Table 
    },
    data() {
      return {
        clientsNames: [],
        tipeForm: null,
        registerClient: {
            name:null,
            id:null,
            contactOne:null,
            discount:false,
            contactTwo:null,
            recommender:null,
            valid:false
        },
        modals: {
            modal1: false
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
			const name = this.registerClient.name.split(' ')
			var firstName, lastName, fullName, ifCheck
			if (name[1]) {
				firstName = this.MaysPrimera(name[0])
				lastName = this.MaysPrimera(name[1])
				fullName = firstName+' '+lastName
			}else{
				fullName = this.MaysPrimera(name[0])
			}
			if (this.registerClient.discount == true) {
				ifCheck = 0
			}else{
				ifCheck = 1
			}
			
			if (this.nombreCliente != '' && this.identidadCliente != '') {
				axios.post(endPoint.endpointTarget+'/clients', {
					nombre:fullName,
					identidad:this.registerClient.id,
					recomendador:this.registerClient.recommender,
					correoCliente:this.registerClient.contactOne,
					instagramCliente:this.registerClient.contactTwo,
					ifCheck: ifCheck
				})
				.then(res => {
					if (res.data.status == 'Registrado') {
						this.$swal({
							type: 'success',
							title: 'Cliente registrado',
							showConfirmButton: false,
							timer: 1500
                        })
                        this.initialState(1)
                        this.getClients()
						// this.getClientsThree()
						// this.ServicesQuantityChartFunc();
						// this.emitMethodTwo()
					}else{
						this.$swal({
							type: 'error',
							title: 'El cliente ya existe',
							showConfirmButton: false,
							timer: 1500
						})
					}
				})
			}else{
				this.$swal({
					type: 'error',
					title: 'Llene los campos requeridos',
					showConfirmButton: false,
					timer: 1500
				})
			}
        },
        validRegister(){
            if (this.registerClient.name != null && this.registerClient.id != null) {
                this.registerClient.valid = true
            }
        },
        MaysPrimera(string){
			return string.charAt(0).toUpperCase() + string.slice(1);
        },
        initialState(val){
            this.registerClient= {
                name:null,
                id:null,
                contactOne:null,
                discount:false,
                contactTwo:null,
                recommender:null,
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
</style>