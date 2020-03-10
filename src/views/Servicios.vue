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
                        <h1 class="display-2 text-white w-100">Sección de servicio</h1>
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
                        Registro de servicio
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
                            type="text"
                            placeholder="Precio"
                            addon-left-icon="ni ni-time-alarm"
                            v-model="priceRegister">
                        </base-input>
                        <base-input alternative
                            type="text"
                            placeholder="comision (%)"
                            addon-left-icon="ni ni-money-coins"
                            v-model="comissionRegister">
                        </base-input>
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
                            <vue-bootstrap4-table :rows="lenders" :columns="columnsLender" :classes="classes" :config="configLender" v-on:on-select-row="selected" v-on:on-all-select-rows="selectedAll" v-on:on-unselect-row="unSelected" v-on:on-all-unselect-rows="unSelectedAll">
                            </vue-bootstrap4-table>
                        </vue-custom-scrollbar >
                        <div class="text-center">
                            <base-button type="primary" class="my-4" v-on:click="registerService">Registrar</base-button>
                        </div>
                    </form>
                </template>
            </card>
        </modal>
        <vue-bootstrap4-table :rows="services" :columns="columns" :classes="classes" :config="config">
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
        <base-alert class="positionAlert" type="success" v-if="successRegister">
            <strong>Success!</strong> This is a success alert—check it out!
        </base-alert>
    </div>
</template>
<script>
//Back - End 
import axios from 'axios'
import endPoint from '../../config-endpoint/endpoint.js'
import VueBootstrap4Table from 'vue-bootstrap4-table'
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
                modal1: false
            },
            serviceRegister: '',
            priceRegister: '',
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
            addDiscount: null,
            successRegister: false
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
            if (this.serviceRegister == '' || this.priceRegister == '' || this.timeRegister == '' || this.comissionRegister == '') {
                this.successRegister = true
                setTimeout(() => {
                    this.successRegister = false
                }, 1500);
            }else{
                if (this.lenderSelecteds.length == 0) {
                    this.$swal({
                        type: 'error',
                        title: 'Seleccione almenos un prestador',
                        showConfirmButton: false,
                        timer: 1500
                    })
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
                            this.successRegister = true
                            setTimeout(() => {
                                this.successRegister = false
                            }, 1500);
                        }else{
                            this.$swal({
                                type: 'error',
                                title: 'El servicio ya existe',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }
                    })
                }
            }
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
    }
    
</style>