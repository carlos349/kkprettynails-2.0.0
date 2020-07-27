<template>
    <div>
        <base-header class="header pb-4 pt-2 pt-lg-4 d-flex align-items-center"
                     style="min-height: 50px; background-image: url(img/theme/clients.jpg); background-size: cover; background-position: center top;">
            <!-- Mask -->
            <span style="background-color:#172b4d !important" class="mask  opacity-7"></span>
            <!-- Header container -->
            <div class="container-fluid d-flex align-items-center">
                <div class="row">
                    <div class="col-12">
                        <h1 class="display-2 text-white">Pedidos</h1>
                        <p class="text-white mt-0 mb-2">Esta es la sección administrativa de tus pedidos, aquí podrás visualizar todos tus pedidos.</p>
                        <base-button v-if="validRoute('clientes', 'registrar')" @click="modals.modal1 = true , initialState(2)" type="success">???</base-button>
                        
                        <base-button v-if="validRoute('clientes', 'filtrar')" @click="showFilter" type="default">Filtrar</base-button>
                    </div>
                </div>
            </div>
        </base-header>
        

        <!-- MODAL REGISTRAR -->

        <modal :show.sync="modals.modal1"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-md">
               <h6 slot="header" class="modal-title p-0 m-0" id="modal-title-default"></h6>
            <card type="secondary" shadow
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-5 py-lg-5"
                  class="border-0">
                <template>
                    <div style="margin-top:-15% !important" class="text-muted text-center mb-3">
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
                                                addon-left-icon="ni ni-single-02"
                                                addon-right-icon="fa fa-asterisk text-danger">
                                    </base-input>
                                    <base-input alternative
                                                type="text"
                                                placeholder="Contacto principal"
                                                v-model="registerClient.id"
                                                v-on:change="validRegister()"
                                                addon-left-icon="fa fa-address-card"
                                                addon-right-icon="fa fa-asterisk text-danger">
                                    </base-input>
                                    <base-input alternative
                                                type="text"
                                                placeholder="Contacto adicional"
                                                v-model="registerClient.contactOne"
                                                addon-left-icon="fa fa-address-card"
                                                addon-right-icon="fas fa-plus text-default">
                                    </base-input>
                                    <base-input alternative
                                                type="text"
                                                placeholder="Contacto adicional"
                                                v-model="registerClient.contactTwo"
                                                addon-left-icon="fa fa-address-card"
                                                addon-right-icon="fas fa-plus text-default">
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
                                    addon-left-icon="ni ni-single-02"
                                    addon-right-icon="fa fa-asterisk text-danger"
                                    >
                        </base-input>
                        <base-input alternative
                                    type="text"
                                    placeholder="Contacto principal"
                                    v-model="registerClient.id"
                                    v-on:change="validRegister()"
                                    addon-left-icon="fa fa-address-card"
                                    addon-right-icon="fa fa-asterisk text-danger">
                        </base-input>
                        <base-input alternative
                                    type="text"
                                    placeholder="Contacto adicional"
                                    v-model="registerClient.contactOne"
                                    addon-left-icon="fa fa-address-card"
                                    addon-right-icon="fas fa-plus text-default">
                        </base-input>
                        <base-input alternative
                                    type="text"
                                    placeholder="Contacto adicional"
                                    v-model="registerClient.contactTwo"
                                    addon-left-icon="fa fa-address-card"
                                    addon-right-icon="fas fa-plus text-default">
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
        <modal :show.sync="modals.modal3"
               modal-classes="modal-dialog-centered">
            <div class="py-3 text-center">
                <h1 class="heading mt-5">¿Seguro que desea confirmar este pedido?</h1>
                <base-button type="success" v-on:click="confirmar()" class="my-4">Si</base-button>
                <base-button type="danger" v-on:click="modals.modal3 = false, idPedido = ''" class="my-4">No</base-button>
            </div>
        </modal>
        
        <base-alert class="positionAlert" type="success" v-if="successRegister">
            <strong>Registrado!</strong> Has registrado al cliente con exito!
        </base-alert>

        <!-- TABLA DE CLIENTES -->

        <vue-bootstrap4-table class="tableClient" :rows="rows" :columns="columns" :classes="classes" :config="config">
            <template slot="Administrar" slot-scope="props">
                <b>
                    <center>
                        <base-button v-if="validRoute('clientes', 'detalle') && props.row.estado == 'Nconfirmado'" size="sm" type="success" @click="modals.modal3 = true, idPedido = props.row._id,identidadPedido = props.row.contacto, codePedido = props.row.codigo" icon="ni ni-check-bold">Confirmar</base-button>
                        <base-button v-else-if="props.row.estado == 'usado'" size="sm" disabled type="danger"  >Utilizado</base-button>
                        <base-button disabled v-else size="sm" type="default" >Confirmado</base-button>
                        
                    </center>
                    
                </b>
            </template>
            <template slot="date" slot-scope="props">
                <b>
                    <center>
                       {{formatDate(props.row.date)}}
                        
                    </center>
                    
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
import jwtDecode from 'jwt-decode'
import router from '../router'
// COMPONENTS

  export default {
    components: {
        VueBootstrap4Table 
    },
    data() {
      return {
        auth: [],
        idPedido:'',
        identidadPedido:'',
        codePedido:'',
        successRegister:false,
        clientsNames: [],
        tipeForm: '',
        registerClient: {
            name:'',
            id:'',
            contactOne:'',
            contactTwo:'',
            recommender:null,
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
            modal3: false,
            message: "",
            icon: '',
            type:''
        },
        rows: [],
        columns: [{
                label: "Fecha",
                name: "date",
                // filter: {
                //     type: "simple",
                //     placeholder: "id"
                // },
                sort: true,
                slot_name: "date"
            },
            {
                label: "N° de pedido",
                name: "nPedido",
                // filter: {
                //     type: "simple",
                //     placeholder: "Enter first name"
                // },
                sort: true,
            },
            {
                label: "Cliente",
                name: "cliente",
                sort: true,
            },
            {
                label: "Contacto",
                name: "contacto",
                sort: true,
                // filter: {
                //     type: "simple",
                //     placeholder: "Enter country"
                // },
            },
            {
                label: "Articulo",
                name: "articulo",
                sort: true,
                // filter: {
                //     type: "simple",
                //     placeholder: "Enter country"
                // },
            },
            {
                label: "Total",
                name: "total",
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
            card_title: "Tabla de pedidos",
            checkbox_rows: false,
            rows_selectable : true,
            highlight_row_hover_color:"rgba(238, 238, 238, 0.623)",
            rows_selectable: true,
            per_page_options: [5, 10, 20, 30, 40, 50, 80, 100],
            global_search: {
                placeholder: "Filtre sus pedidos",
                visibility: true,
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
    beforeCreate(){
        if (!localStorage.getItem('userToken')) {
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
		this.getClients();
        this.getToken()
    },
    methods: {
        getToken(){
            const token = localStorage.userToken
            const decoded = jwtDecode(token)  
            this.auth = decoded.access
            console.log(this.auth)
        },
        getClients(){
            axios.get(endPoint.endpointTarget+'/pedidos')
            .then(res => {
				console.log(res.data)
                this.rows = res.data
                
				
            })
        },
        registerClients(){
            console.log(this.registerClient.recommender)
            var ifCheck = this.registerClient.discount ? 0 : 1
            axios.post(endPoint.endpointTarget+'/pedidos', {
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
                            modal3:false,
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
                            modal3:false,
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
                recommender:null,
                valid:false
            }
            if (val == 1) {
                this.modals = {
                    modal1: false,
                    modal2:false,
                    modal3:false,
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
                                    modal3:false,
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
                            modal3:false,
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
                            modal3:false,
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
                            modal3:false,
                            message: "",
                            icon: '',
                            type: ''
                        }
                    }, 1500);
                }
            })
        },
        showFilter(){
            $('.tableClient .vbt-table-tools').toggle()
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
        selectTemplate(select){
            this.modals = {
                modal1: false,
                modal2: false,
                modal3:false,
                message: "",
                icon: '',
                type: ''
            }
            setTimeout(() => {
               localStorage.setItem('selectTemplate', select)
                router.push({path: 'Correo'}) 
            }, 200);
			
        },
        confirmar(){
            console.log(this.identidadPedido + "  -  " + this.codePedido)
            axios.put(endPoint.endpointTarget+'/pedidos/'+this.idPedido, {
                nombreClienteEditar: this.registerClient.name,
                identidadClienteEditar: this.registerClient.id,
                correoClienteEditar: this.registerClient.contactOne,
                instagramClienteEditar: this.registerClient.contactTwo,
            })
            .then(res => {
                console.log(res)
                if (res.data.status == 'Servicio actualizado') {
                    axios.post(endPoint.endpointTarget+'/pedidos/sendEmailPedido',{
                        to : this.identidadPedido,
                        code : this.codePedido
                    })
                    this.modals = {
                        modal2: true,
                        message: "Pedido confirmado",
                        icon: 'ni ni-check-bold ni-5x',
                        type: 'success'
                    }
                    setTimeout(() => {
                        this.modals = {
                            modal1: false,
                            modal2: false,
                            modal3:false,
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
                        message: "Falla de conexion a internet",
                        icon: 'ni ni-fat-remove ni-5x',
                        type: 'danger'
                    }
                    setTimeout(() => {
                        this.modals = {
                            modal1: false,
                            modal2: false,
                            modal3:false,
                            message: "",
                            icon: '',
                            type: ''
                        }
                    }, 1500);
                }
            })
        },
        formatDate(date) {
        let dateFormat = new Date(date)
        return dateFormat.getDate()+"-"+(dateFormat.getMonth() + 1)+"-"+dateFormat.getFullYear()
      },
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
    .tableClient .vbt-table-tools{
        display:none;
    }
    .tableClient .vbt-table-tools .vbt-global-search .form-group{
        width: 30%;
    }
    .template{
		padding: 2px;
		// background-color: #e4e8ec;
		cursor: pointer;
		-webkit-transition: all 0.5s ease-out;
        opacity:.6;
	}
	.template:hover{
		background-color: rgb(90, 90, 90);
        opacity:1;
	}

</style>