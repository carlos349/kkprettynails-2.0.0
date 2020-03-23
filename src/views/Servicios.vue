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
                        <h1 class="display-2 text-white w-100">Sección de servicios</h1>
                        <p class="text-white mt-0 mb-2">Esta es la sección servicios de tu negocio, aquí podrás registrar, editar y visualizar todos tus servicios.</p>
                        <a @click="modals.modal1 = true"  class="btn btn-success text-white">Ingrese un servicio</a>
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
                       <h3>Datos del servicio</h3> 
                    </div>
                </template>
                <template>
                    <form role="form">
                        <base-input alternative
                            class="mb-3"
                            placeholder="Nombre"
                            addon-left-icon="ni ni-single-copy-04"
                            v-model="serviceRegister"
                            addon-right-icon="fa fa-asterisk text-danger" >
                        </base-input>
                        <base-input alternative
                            type="number"
                            max-count="100"
                            placeholder="comision (%)"
                            addon-left-icon="ni ni-money-coins"
                            v-model="comissionRegister"
                            addon-right-icon="fa fa-asterisk text-danger" >
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
                        <div class="row mx-auto mt-2">
                            <h3 class="w-100 text-center">¿Aplica descuento?</h3>
                            <base-radio name="false" value="true" inline class="mb-3 mx-auto" v-model="addDiscount"> <b>Si</b> </base-radio>
                            <base-radio name="true" value="false" checked inline class="mb-3 mx-auto" v-model="addDiscount"> <b>No</b> </base-radio> 
                        </div>
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
               <h6 slot="header" class="modal-title p-0 m-0" id="modal-title-default"></h6>
            <card type="secondary" shadow
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-5 py-lg-5"
                  class="border-0">
                <template>
                    <div style="margin-top:-15% !important" class="text-muted text-center mb-3">
                       <h3>Datos del servicio</h3> 
                    </div>
                </template>
                <template>
                    <form role="form">
                        <base-input alternative
                            class="mb-3"
                            placeholder="Nombre"
                            addon-left-icon="ni ni-single-copy-04"
                            v-model="serviceEdit"
                            addon-right-icon="fa fa-asterisk text-danger" >
                        </base-input>
                        <base-input alternative
                            type="text"
                            placeholder="comision (%)"
                            addon-left-icon="ni ni-money-coins"
                            v-model="comissionEdit"
                            addon-right-icon="fa fa-asterisk text-danger" >
                        </base-input>
                        <currency-input
                            v-model="priceEdit"
                            locale="de"
                            addon-left-icon="ni ni-time-alarm"
                            class="form-control mb-3"
                            style="margin-top:-10px;"
                            addon-right-icon="fa fa-asterisk text-danger" 
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
                        <div class="row mx-auto mt-2">
                            <h3 class="w-100 text-center">¿Aplica descuento?</h3>
                            <base-radio name="false"  inline class="mb-3 mx-auto" v-model="addDiscountEdit"> <b>Si</b> </base-radio>
                            <base-radio name="true"  inline class="mb-3 mx-auto" v-model="addDiscountEdit"> <b>No</b> </base-radio> 
                        </div>
                        <vue-custom-scrollbar ref="table" class="maxHeight">
                            <vue-bootstrap4-table :rows="lenders" :columns="columnsLender" :classes="classes" :config="configLender" v-on:on-select-row="selected" v-on:on-all-select-rows="selectedAll" v-on:on-unselect-row="unSelected" v-on:on-all-unselect-rows="unSelectedAll">
                                <template slot="checkbox_rows" slot-scope="props" >
                                    
                                </template>
                            </vue-bootstrap4-table>
                        </vue-custom-scrollbar >
                        <div class="text-center">
                            
                            <base-button type="primary" class="my-4" v-on:click="editService">Editar</base-button>
                        </div>
                    </form>
                </template>
            </card>
        </modal>
        <vue-bootstrap4-table :rows="services" :columns="columns" :classes="classes" :config="config">
            <template slot="actionButtons" class="mx-auto" slot-scope="props">
                <center>
                   <base-button icon="ni ni-fat-add" size="sm" type="default" class="text-center" v-on:click="dataEdit(props.row._id, props.row.prestadores, props.row.nombre, props.row.tiempo, props.row.descuento, props.row.comision, props.row.precio)">Editar</base-button>
                    <base-button class="text-center" v-if="props.row.active" icon="ni ni-check-bold" size="sm" type="success" v-on:click="changeStatus(props.row._id)">Activo</base-button>
                    <base-button class="text-center" v-else icon="ni ni-fat-remove" size="sm" type="danger" v-on:click="changeStatus(props.row._id)">Inactivo</base-button> 
                </center>
                
            </template>
            <template slot="price" slot-scope="props">
                {{formatPrice(props.row.precio)}}
            </template>
            <template slot="time" slot-scope="props">
                {{props.row.tiempo}}Min
            </template>
            <template slot="comission" slot-scope="props">
                {{props.row.comision}}%
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
        <modal :show.sync="modals.modal3"
               :gradient="modals.type"
               modal-classes="modal-danger modal-dialog-centered">
            <div class="py-3 text-center">
                <i :class="modals.icon"></i>
                <h1 class="heading mt-5">{{modals.message}}</h1>
            </div>
        </modal>
    </div>
</template>
<script>
//Back - End 
import axios from 'axios'
import endPoint from '../../config-endpoint/endpoint.js'
import VueBootstrap4Table from 'vue-bootstrap4-table'
import router from '../router'
import EventBus from '../components/EventBus'
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
                modal2: false,
                modal3: false,
                message: "",
                icon: '',
                type:''
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
                preservePageOnDataChange : false,
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
            idServiceEdit: '',
            EditlenderSelecteds: [],
            serviceEdit: '',
            priceEdit: 0,
            comissionEdit: 0,
            timeEdit: '',
            addDiscountEdit: '',
            prueba:'false'
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
            console.log(this.$refs.table.$children[0].$data)
   
            this.lenderSelecteds.push(value.selected_item._id)
            this.EditlenderSelecteds.push(value.selected_item._id)
            console.log(value)
        },
        unSelected(value){
            for (let i = 0; i < this.lenderSelecteds.length; i++) {
                if (this.lenderSelecteds[i] == value.unselected_item._id) {
                    this.lenderSelecteds.splice(i, 1)
                    break
                }
            }
            for (let i = 0; i < this.EditlenderSelecteds.length; i++) {
                if (this.EditlenderSelecteds[i] == value.unselected_item._id) {
                    this.EditlenderSelecteds.splice(i, 1)
                    break
                }
            }
        },
        
        selectedAll(value){
            for (let index = 0; index < value.selected_items.length; index++) {
                this.lenderSelecteds.push(value.selected_items[index]._id)
                this.EditlenderSelecteds.push(value.selected_items[index]._id)
            }
        },
        unSelectedAll(value){
            this.lenderSelecteds = []
            this.EditlenderSelecteds = []
        },
        registerService(){
            if (this.serviceRegister == '' || this.priceRegister == 0 || this.timeRegister == '' || this.comissionRegister == '') {
                this.modals = {
                    modal3: true,
                    message: "Debe rellenar los datos",
                    icon: 'ni ni-fat-remove ni-5x',
                    type: 'danger'
                }
                setTimeout(() => {
                    this.modals = {
                        modal1:false,
                        modal2:false,
                        modal3: false,
                        message: "",
                        icon: '',
                        type: ''
                    }
                }, 1500);
            }else{
                if (this.lenderSelecteds.length == 0) {
                    this.modals = {
                        modal3: true,
                        message: "Debe seleccionar almenos un prestador",
                        icon: 'ni ni-fat-remove ni-5x',
                        type: 'danger'
                    }
                    setTimeout(() => {
                        this.modals = {
                            modal1:false,
                            modal2:false,
                            modal3: false,
                            message: "",
                            icon: '',
                            type: ''
                        }
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
                            this.modals = {
                                modal3: true,
                                message: "El servicio se registro con exito",
                                icon: 'ni ni-check-bold ni-5x',
                                type: 'success'
                            }
                            setTimeout(() => {
                                this.modals = {
                                    modal1:false,
                                    modal2:false,
                                    modal3: false,
                                    message: "",
                                    icon: '',
                                    type: ''
                                }
                            }, 1500);
                            this.initialState()
                            this.getServices()
                            EventBus.$emit('reloadServices', 'reload')
                        }else{
                            this.modals = {
                                modal3: true,
                                message: "El servicio ya existe",
                                icon: 'ni ni-fat-remove ni-5x',
                                type: 'danger'
                            }
                            setTimeout(() => {
                                this.modals = {
                                    modal1:false,
                                    modal2:false,
                                    modal3: false,
                                    message: "",
                                    icon: '',
                                    type: ''
                                }
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
            this.EditlenderSelecteds = []
            const discountFinal = discount ? false : true
            this.idServiceEdit = id
            this.EditlenderSelecteds = lenders
            this.serviceEdit = name
            this.priceEdit = price
            this.comissionEdit = comission
            this.timeEdit = time
            this.addDiscountEdit = discount
            this.modals.modal2 = true
            let data = this.$refs.table.$children[0].$data.vbt_rows
            let selected = this.$refs.table.$children[0].$data.selected_items
            for (let c = 0; c <= selected.length; c++) {
                selected.shift()
                
            }
            setTimeout(() => {
                for (let index = 0; index < data.length; index++) {
                    for (let i = 0; i < this.EditlenderSelecteds.length; i++) {
                        if (this.EditlenderSelecteds[i] == data[index]._id ) {
                            console.log(this.EditlenderSelecteds[i] + "--" + data[index]._id)
                            selected.push(data[index])
                        }
                    }
                }
            }, 500);
        },
        clean(){
            let selected = this.$refs.table.$children[0].$data.selected_items
            
            for (let c = 0; c <= selected.length; c++) {
                selected.shift()
                console.log(selected.length)
            }
            
        },
        editService(){
            if (this.serviceEdit == '' || this.priceEdit == '' || this.timeEdit == '' || this.comissionEdit == '') {
                this.modals = {
                    modal3: true,
                    message: "Debe rellenar los datos",
                    icon: 'ni ni-fat-remove ni-5x',
                    type: 'danger'
                }
                setTimeout(() => {
                    this.modals = {
                        modal1:false,
                        modal2:false,
                        modal3: false,
                        message: "",
                        icon: '',
                        type: ''
                    }
                }, 1500);
            }else{
                if (this.EditlenderSelecteds.length == 0) {
                    this.modals = {
                        modal3: true,
                        message: "Debe seleccionar almenos un prestador",
                        icon: 'ni ni-fat-remove ni-5x',
                        type: 'danger'
                    }
                    setTimeout(() => {
                        this.modals = {
                            modal1:false,
                            modal2:false,
                            modal3: false,
                            message: "",
                            icon: '',
                            type: ''
                        }
                    }, 1500);
                }else{
                    console.log(this.addDiscountEdit)
                    var ifCheck = this.addDiscountEdit ? false : true
					const id = this.idServiceEdit
					axios.put(endPoint.endpointTarget+'/servicios/' + id, {
						nombreServicio: this.serviceEdit,
						tiempoServicio: this.timeEdit,
						precioServicio: this.priceEdit,
						comisionServicio: this.comissionEdit,
						prestadores: this.EditlenderSelecteds,
						descuento: this.addDiscountEdit
					}).then(res => {
                        this.modals = {
                            modal3: true,
                            message: "¡Servicio actualizado!",
                            icon: 'ni ni-check-bold ni-5x',
                            type: 'success'
                        }
                        setTimeout(() => {
                            this.getServices();
                            this.modals = {
                                modal1:false,
                                modal2:false,
                                modal3: false,
                                message: "",
                                icon: '',
                                type: ''
                            }
                        }, 1500);
                        EventBus.$emit('reloadServices', 'reload')
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
    .maxHeight .table td {
        padding: 5px;
        padding-bottom: 5px;
    }
    .card-header{
        font-size: 2.5vw;
    }
</style>