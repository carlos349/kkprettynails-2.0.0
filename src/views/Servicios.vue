<template>
    <div>
        <base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
            style="min-height: 50px; background-image: url(img/theme/clients.jpg); background-size: cover; background-position: center top;height:45vh;">
            <!-- Mask -->
            <span style="background-color:#172b4d !important" class="mask  opacity-7"></span>
            <!-- Header container -->
            <div class="container-fluid d-flex align-items-center">
                <div class="row">
                    <div class="col-lg-12 col-md-12">
                        <h1 class="display-2 text-white w-100">Sección de servicios</h1>
                        <a @click="modals.modal1 = true"  class="btn btn-info text-white">Ingrese un servicio</a>
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
                       <h3>Datos del servicio</h3> 
                    </div>
                </template>
                <template>
                    <form role="form">
                        <base-input alternative
                            class="mb-3"
                            placeholder="Nombre"
                            addon-left-icon="ni ni-single-copy-04"
                            v-model="serviceRegister">
                        </base-input>
                        <base-input alternative
                            type="number"
                            max-count="100"
                            placeholder="comision (%)"
                            addon-left-icon="ni ni-money-coins"
                            v-model="comissionRegister">
                        </base-input>
                        <currency-input
                            v-model="priceRegister"
                            locale="de"
                            placeholder="Costo"
                            class="form-control mb-3"
                            style="margin-top:-10px;"
                        />	
                        <select class="form-control mb-3" v-model="timeRegister">
                            <option style="color:black;" selected value="Seleccione el tiempo">Seleccione el tiempo</option>
                            <option style="color:black;" value="15">15 Minutos</option>
                            <option style="color:black;" value="30">30 Minutos</option>
                            <option style="color:black;" value="45">45 Minutos</option>
                            <option style="color:black;" value="60">60 Minutos (1 Hr)</option>
                            <option style="color:black;" value="90">90 Minutos (1:30 Hr)</option>
                            <option style="color:black;" value="120">120 Minutos (2 Hr)</option>
                            <option style="color:black;" value="150">150 Minutos (2:30 Hr)</option>
                            <option style="color:black;" value="180">180 Minutos (3 Hr)</option>
                            <option style="color:black;" value="210">210 Minutos (3:30 Hr)</option>
                            <option style="color:black;" value="240">240 Minutos (4 Hr)</option>
                        </select>
                        <base-checkbox class="mb-3" v-model="addDiscount">
                            ¿Aplica descuento?
                        </base-checkbox>
                        <vue-custom-scrollbar class="maxHeight">
                            <vue-bootstrap4-table :rows="lenders" :columns="columnsLender" :classes="classes" :config="configLender" v-on:on-select-row="selected" v-on:on-all-select-rows="selectedAll" v-on:on-unselect-row="unSelected" v-on:on-all-unselect-rows="unSelectedAll" >
                            </vue-bootstrap4-table>
                        </vue-custom-scrollbar >
                        <div class="text-center">
                            <base-button type="primary" class="my-4" v-on:click="registerService">Registrar</base-button>
                        </div>
                    </form>
                </template>
            </card>
        </modal>
        <modal :show.sync="modals.modal2"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-md">
            <card type="secondary" shadow
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-5 py-lg-5"
                  class="border-0">
                <template>
                    <div class="text-muted text-center mb-3">
                       <h3>Datos del servicio</h3> 
                    </div>
                </template>
                <template>
                    <form role="form">
                        <base-input alternative
                            class="mb-3"
                            placeholder="Nombre"
                            addon-left-icon="ni ni-single-copy-04"
                            v-model="serviceEdit">
                        </base-input>
                        <base-input alternative
                            type="text"
                            placeholder="comision (%)"
                            addon-left-icon="ni ni-money-coins"
                            v-model="comissionEdit">
                        </base-input>
                        <currency-input
                            v-model="priceEdit"
                            locale="de"
                            addon-left-icon="ni ni-time-alarm"
                            class="form-control mb-3"
                            style="margin-top:-10px;"
                        />	
                        <select class="form-control mb-3" v-model="timeEdit">
                            <option style="color:black;" value="15">15 Minutos</option>
                            <option style="color:black;" value="30">30 Minutos</option>
                            <option style="color:black;" value="45">45 Minutos</option>
                            <option style="color:black;" value="60">60 Minutos (1 Hr)</option>
                            <option style="color:black;" value="90">90 Minutos (1:30 Hr)</option>
                            <option style="color:black;" value="120">120 Minutos (2 Hr)</option>
                            <option style="color:black;" value="150">150 Minutos (2:30 Hr)</option>
                            <option style="color:black;" value="180">180 Minutos (3 Hr)</option>
                            <option style="color:black;" value="210">210 Minutos (3:30 Hr)</option>
                            <option style="color:black;" value="240">240 Minutos (4 Hr)</option>
                        </select>
                        <base-checkbox class="mb-3" v-model="addDiscountEdit">
                            ¿Aplica descuento?
                        </base-checkbox>
                        <vue-custom-scrollbar class="maxHeight">
                            <vue-bootstrap4-table :rows="lenders" :columns="columnsLender" :classes="classes" :config="configLender" v-on:on-select-row="selected" v-on:on-all-select-rows="selectedAll" v-on:on-unselect-row="unSelected" v-on:on-all-unselect-rows="unSelectedAll">
                                <template slot="checkbox_rows" slot-scope="props" >
                                    
                                </template>
                            </vue-bootstrap4-table>
                        </vue-custom-scrollbar >
                        <div class="text-center">
                            <base-button type="primary" class="my-4" v-on:click="registerService">Editar</base-button>
                        </div>
                    </form>
                </template>
            </card>
        </modal>
        <vue-bootstrap4-table :rows="services" :columns="columns" :classes="classes" :config="config">
            <template slot="actionButtons" slot-scope="props">
                <base-button icon="ni ni-fat-add" size="sm" type="default" v-on:click="dataEdit(props.row._id, props.row.prestadores, props.row.nombre, props.row.tiempo, props.row.descuento, props.row.comision, props.row.precio)">Editar</base-button>
                <base-button v-if="props.row.active" icon="ni ni-check-bold" size="sm" type="success" v-on:click="changeStatus(props.row._id)">Activo</base-button>
                <base-button v-else icon="ni ni-fat-remove" size="sm" type="danger" v-on:click="changeStatus(props.row._id)">Inactivo</base-button>
            </template>
            <template slot="price" slot-scope="props">
                <p>{{formatPrice(props.row.precio)}}</p>
            </template>
            <template slot="time" slot-scope="props">
                <p>{{props.row.tiempo}}Min</p>
            </template>
            <template slot="comission" slot-scope="props">
                <p>{{props.row.comision}}%</p>
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
        <base-alert class="positionAlert" type="success" v-if="successAlert">
            <span class="alert-inner--icon"><i class="ni ni-check-bold"></i></span>
            <strong>¡Bien!</strong> {{messageSuccess}}
        </base-alert>
        <base-alert class="positionAlert" type="danger" v-if="errorAlert">
            <span class="alert-inner--icon"><i class="ni ni-fat-remove"></i></span>
            <strong>¡Error!</strong> {{messageError}}
        </base-alert>
    </div>
</template>
<script>
//Back - End 
import axios from 'axios'
import endPoint from '../../config-endpoint/endpoint.js'
import VueBootstrap4Table from 'vue-bootstrap4-table'
import router from '../router'
// COMPONENTS
import Modal from '@/components/Modal'
import vueCustomScrollbar from 'vue-custom-scrollbar'
export default {
    components: {
        VueBootstrap4Table,
        Modal,
        vueCustomScrollbar
    },
    data(){
        return {
            modals: {
                modal1: false,
                modal2: false
            },
            serviceRegister: '',
            priceRegister: 0,
            comissionRegister: '',
            timeRegister: 'Seleccione el tiempo',
            services: [],
            columnsLender: [{
                label: "Nombre",
                name: "nombre",
                // filter: {
                //     type: "simple",
                //     placeholder: "id"
                // },
                sort: true,
            }],
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
                label: "Costo",
                name: "precio",
                slot_name: "price",
                // filter: {
                //     type: "simple",
                //     placeholder: "Enter first name"
                // },
                sort: true,
            },
            {
                label: "Tiempo",
                name: "tiempo",
                slot_name: "time",
                sort: true,
            },
            {
                label: "Comisión",
                name: "comision",
                slot_name: "comission",
                // filter: {
                //     type: "simple",
                //     placeholder: "Enter country"
                // },
            },
            {
                label: "Acciones",
                name: "_id",
                slot_name: "actionButtons",
                // filter: {
                //     type: "simple",
                //     placeholder: "Enter first name"
                // },
                sort: true,
            }],
            config: {
                card_title: "Tabla de servicios",
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
            configLender: {
                checkbox_rows: true,
                rows_selectable : true,
                highlight_row_hover_color:"rgba(238, 238, 238, 0.623)",
                rows_selectable: true,
                per_page_options: [5, 10, 20, 30, 40, 50, 80, 100],
                show_refresh_button: false,
                show_reset_button: false,  
                selected_rows_info: false,
                preservePageOnDataChange : true,
                pagination_info : false,
                pagination: false,
                global_search: {
                    placeholder: "Busque el prestador",
                    visibility: true,
                    case_sensitive: false,
                    showClearButton: true,
                    searchOnPressEnter: false,
                    searchDebounceRate: 200,                      
                },
            },
            classes: {
                table: "table-bordered table-striped"
            },
            lenders: [],
            lenderSelecteds: [],
            addDiscount: false,
            successAlert: false,
            errorAlert: false,
            messageSuccess:'',
            messageError:'',
            idServiceEdit: '',
            EditlenderSelecteds: [],
            serviceEdit: '',
            priceEdit: 0,
            comissionEdit: 0,
            timeEdit: '',
            addDiscountEdit: null
        }
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
        this.getServices();
        this.getLenders()
    },
    methods: {
        getServices(){
            axios.get(endPoint.endpointTarget+'/servicios')
            .then(res => {
				this.services = res.data
            })
        },
        formatPrice(value) {
            let val = (value/1).toFixed(2).replace('.', ',')
            return '$ '+val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        getLenders(){
            axios.get(endPoint.endpointTarget+'/manicuristas')
            .then(res => {
                this.lenders = res.data
            })
        },
        selected(value){
            this.lenderSelecteds.push(value.selected_item._id)
            console.log(value.selected_items)
        },
        unSelected(value){
            for (let i = 0; i < this.lenderSelecteds.length; i++) {
                if (this.lenderSelecteds[i] == value.unselected_item._id) {
                    this.lenderSelecteds.splice(i, 1)
                    break
                }
            }
        },
        selectedAll(value){
            for (let index = 0; index < value.selected_items.length; index++) {
                this.lenderSelecteds.push(value.selected_items[index]._id)
            }
        },
        unSelectedAll(value){
            this.lenderSelecteds = []
        },
        registerService(){
            if (this.serviceRegister == '' || this.priceRegister == 0 || this.timeRegister == '' || this.comissionRegister == '') {
                this.messageError = 'Debe rellenar los datos'
                this.errorAlert = true
                setTimeout(() => {
                    this.errorAlert = false
                }, 1500);
            }else{
                if (this.lenderSelecteds.length == 0) {
                    this.messageError = 'Debe seleccionar almenos un prestador'
                    this.errorAlert = true
                    setTimeout(() => {
                        this.errorAlert = false
                    }, 1500);
                }else{
                    var ifCheck = this.addDiscount ? false : true
                    axios.post(endPoint.endpointTarget+'/servicios', {
                        nombreServicio: this.serviceRegister,
                        precioServicio: this.priceRegister,
                        comisionServicio: this.comissionRegister,
                        tiempoServicio: this.timeRegister,
                        prestadores: this.lenderSelecteds,
                        descuento: ifCheck
                    }).then(res => {
                        if (res.data.status == 'Servicio creado') {
                            this.messageSuccess = 'El servicio se registro con exito'
                            this.successAlert = true
                            setTimeout(() => {
                                this.successAlert = false
                            }, 1500);
                            this.initialState()
                            this.getServices()
                        }else{
                            this.messageError = 'El servicio ya existe'
                            this.errorAlert = true
                            setTimeout(() => {
                                this.errorAlert = false
                            }, 1500);
                        }
                    })
                }
            }
        },
        initialState(){
            this.serviceRegister = ''
            this.priceRegister = 0
            this.comissionRegister = ''
            this.timeRegister = 'Seleccione el tiempo'
            this.lenderSelecteds = []
            this.addDiscount = false
            this.modals.modal1 = false
            $('.maxHeight  thead .vbt-checkbox').click()
            $('.maxHeight  thead .vbt-checkbox').prop('checked', false)
        },
        dataEdit(id, lenders, name, time, discount, comission, price){
            const discountFinal = discount ? false : true
            this.idServiceEdit = id
            this.EditlenderSelecteds = lenders
            this.serviceEdit = name
            this.priceEdit = price
            this.comissionEdit = comission
            this.timeEdit = time
            this.addDiscountEdit = discountFinal
            this.modals.modal2 = true
        },
        editService(){
            if (this.serviceEdit == '' || this.priceEdit == '' || this.timeEdit == '' || this.comissionEdit == '') {
                this.messageError = 'Debe rellenar los datos'
                this.errorAlert = true
                setTimeout(() => {
                    this.errorAlert = false
                }, 1500);
            }else{
                if (this.EditlenderSelecteds.length == 0) {
                    this.messageError = 'Debe seleccionar almenos un prestador'
                    this.errorAlert = true
                    setTimeout(() => {
                        this.errorAlert = false
                    }, 1500);
                }else{
                    var ifCheck = addDiscountEdit ? false : true
					const id = this.idServiceEdit
					axios.put(endPoint.endpointTarget+'/servicios/' + id, {
						nombreServicio: this.serviceEdit,
						tiempoServicio: this.timeEdit,
						precioServicio: this.priceEdit,
						comisionServicio: this.comissionEdit,
						prestadores: this.EditlenderSelecteds,
						descuento: ifCheck
					}).then(res => {

                    })
                }
            }
        },
        changeStatus(id){
            axios.put(endPoint.endpointTarget+'/servicios/changeActive/' + id)
            .then(res => {
                this.getServices();
                // this.emitMethod()
            })
            .catch(err => {
                this.messageError = 'Error con la consulta'
                this.errorAlert = true
                setTimeout(() => {
                    this.errorAlert = false
                }, 1500);
            })
        }
    }
}
</script>
<style>
    .maxHeight{
        max-height: 300px;
        overflow: scroll;
    }
    .vbt-table-tools th{
        padding: 5px !important;
        max-height: 20px !important;
        overflow: hidden !important;
    }
    .vbt-table-tools th div .col-md-8{
        display:none !important;
    }
    .vbt-table-tools th div .col-md-4{
        flex: 0 0 100%; 
        max-width: 100%;
    }
    .vbt-table-tools th div .col-md-4 .no-gutters .col-md-6{
        display:none;
    }
    .vbt-table-tools th div .col-md-4 .no-gutters .vbt-global-search{
        display:block !important;
        flex: 0 0 100%; 
        max-width: 100%;
    }
    .vbt-table-tools th div .col-md-4 .no-gutters .vbt-global-search .form-group{
        margin-bottom: 2px !important;
    }
    .vbt-table-tools th div .col-md-4 .no-gutters .vbt-global-search .form-group input{
       border-left: 1px solid #cad1d7;
       padding-left: 5px;
    }
    .maxHeight .card .card-header{
        display:none ;
    }
    .table td {
        padding: 5px;
        padding-top: 10px;
        padding-bottom: 0;
    }
    .maxHeight .table td {
        padding: 5px;
        padding-bottom: 5px;
    }
    .positionAlert{
        position: absolute;
        top:2%;
        left: 20%;
        z-index: 100000;
    }
</style>