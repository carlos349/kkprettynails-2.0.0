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
                        <h1 class="display-2 text-white w-100">Sección de ventas</h1>
                        <label class="text-white">Filtra tus ventas</label>
                        <base-input addon-left-icon="ni ni-calendar-grid-58">
                            <flat-picker slot-scope="{focus, blur}"
                                        @on-open="focus"
                                        @on-close="blur"
                                        :config="configDatePicker"
                                        class="form-control datepicker"
                                        v-model="dates.range">
                            </flat-picker>
                        </base-input>
                        <base-button type="default" v-on:click="filterSale">Filtrar</base-button>
                    </div>
                </div>
            </div>
        </base-header>
        <modal :show.sync="modals.modal1"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-md">
            <card type="secondary" shadow
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-5 py-lg-5"
                  class="border-0">
                <template>
                    <div class="text-muted text-center mb-3">
                       <h3>Detalle de la venta</h3> 
                    </div>
                </template>
                <template>
                    <tabs fill class="flex-column flex-md-row">
                        <card shadow>
                            <tab-pane>
                                <span slot="title">
                                    <i class="ni ni-cloud-upload-96"></i>
                                    Básicos
                                </span>
                                <div class="text-muted text-left">
                                    <h3><strong>Fecha: </strong>{{formatDate(arreglo.fecha)}}</h3> 
                                </div>
                                <div class="text-muted text-left">
                                    <h3><strong>N° de Venta: </strong>V-{{arreglo.count}}</h3> 
                                </div>
                                <div class="text-muted text-left">
                                    <h3><strong>Prestador/es: </strong><span v-for="lender of arreglo.EmployeComision" :key="lender">({{lender.employe}} - {{formatPrice(lender.comision)}}) </span></h3> 
                                </div>
                                <div class="text-muted text-left">
                                    <h3><strong>Cliente/s: </strong><span v-for="client of arreglo.cliente" :key="client">({{client}}) </span></h3> 
                                </div>
                                <hr>
                                <div class="text-muted mt-2">
                                    <h2 class="text-center">Metodos de pago</h2>
                                    <h3 v-if="arreglo.pagoEfectivo > 0"><strong class="text-left pl-5">Efectivo: </strong><span class="float-right pr-5">{{formatPrice(arreglo.pagoEfectivo)}} </span></h3> 
                                    <h3 v-if="arreglo.pagoRedCDebito > 0"><strong class="text-left pl-5">Débito: </strong><span class="float-right pr-5">{{formatPrice(arreglo.pagoRedCDebito)}} </span></h3>
                                    <h3 v-if="arreglo.pagoRedCCredito > 0"><strong class="text-left pl-5">Crédito: </strong><span class="float-right pr-5">{{formatPrice(arreglo.pagoRedCCredito)}} </span></h3>
                                    <h3 v-if="arreglo.pagoTransf > 0"><strong class="text-left pl-5">transferencia: </strong><span class="float-right pr-5">{{formatPrice(arreglo.pagoTransf)}} </span></h3>
                                    <h3 v-if="arreglo.pagoOtros > 0"><strong class="text-left pl-5">Otros: </strong><span class="float-right pr-5">{{formatPrice(arreglo.pagoOtros)}} </span></h3>
                                </div>
                            </tab-pane>
                            <tab-pane>
                                <span slot="title">
                                    <i class="ni ni-bell-55 mr-2"></i>
                                    Avanzados
                                </span>
                                <div class="text-muted text-left">
                                    <h3><strong>Servicios: </strong><span v-for="services of arreglo.servicios" :key="services">({{services.servicio}}) </span></h3> 
                                </div>
                                <div class="text-muted">
                                    <h2 class="text-center">Montos</h2>
                                    <h3><strong class="text-left">Descuentos <br></strong><span v-for="discounts of arreglo.descuento" :key="discounts" >({{discounts}})<br> </span></h3> 
                                    <h3><strong class="text-left">Comisión total: </strong><span class="float-right">{{formatPrice(arreglo.comision)}} </span></h3> 
                                    <h3><strong class="text-left">Diseño: </strong><span class="float-right">{{formatPrice(arreglo.design)}} </span></h3>
                                    <h3><strong class="text-left">Local: </strong><span class="float-right">{{formatPrice(arreglo.ganancialocal)}} </span></h3>
                                    <h3><strong class="text-left">Total: </strong><span class="float-right">{{formatPrice(arreglo.total)}} </span></h3>
                                </div>
                            </tab-pane>
                        </card>
                    </tabs>
                    <base-button block class="mt-2" v-if="arreglo.status" type="default" v-on:click="cancelSale(arreglo._id)">Anular venta</base-button>
                </template>
            </card>
        </modal>
        <vue-bootstrap4-table :rows="sales" :columns="columns" :classes="classes" :config="configTable">
            <template slot="date-format" slot-scope="props">
                {{formatDate(props.row.fecha)}}
            </template>
            <template slot="lenderName" slot-scope="props">
                {{justName(props.row.manicurista)}}
            </template>
            <template slot="comission" slot-scope="props">
                {{formatPrice(props.row.comision)}}
            </template>
            <template slot="localGain" slot-scope="props">
                {{formatPrice(props.row.ganancialocal)}}
            </template>
            <template slot="totalGain" slot-scope="props">
                {{formatPrice(props.row.total)}}
            </template>
            <template slot="reportSale" slot-scope="props">
                <base-button icon="ni ni-fat-add" size="sm" type="default" v-on:click="dataReport(props.row._id)">Detalle</base-button>
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
import axios from 'axios'
import router from '../router'
import endPoint from '../../config-endpoint/endpoint.js'

import VueBootstrap4Table from 'vue-bootstrap4-table'
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import {Spanish} from 'flatpickr/dist/l10n/es.js';
export default {
    components: {
        flatPicker,
        VueBootstrap4Table
    },
    data() {
        return {
            modals: {
                modal1: false
            },
            dates: {
                range: new Date()
            },
            configDatePicker: {
                allowInput: true, 
                mode: 'range',
                locale: Spanish, // locale for this instance only          
            }, 
            columns: [{
                label: "Fecha",
                name: "fecha",
                slot_name: "date-format",
                sort: true,
            },
            {
                label: "Comisión",
                name: "comision",
                slot_name: "comission",
            },
            {
                label: "Total local",
                name: "ganancialocal",
                slot_name: "localGain",
            },
            {
                label: "Total",
                name: "total",
                slot_name: "totalGain",
            },
            {
                label: "Cliente",
                name: "cliente",
                // filter: {
                //     type: "simple",
                //     placeholder: "Enter first name"
                // },
                sort: true,
            },
            {
                label: "Prestadoras",
                name: "manicurista",
                slot_name:"lenderName",
                sort: true,
            },
            {
                label: "Acciones",
                name: "_id",
                slot_name: "reportSale",
            }],
            configTable: {
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
            classes: {
                table: "table-bordered table-striped"
            },
            sales: [],
            arreglo: [],
            successAlert: false,
            errorAlert: false,
            messageSuccess: '',
            messageError: '',
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
        this.getSales()
    },
    methods: {
        filterSale(){
            console.log(this.dates.range)
        },
        getSales(){
            const config = {headers: {'x-access-token': localStorage.userToken}}
            axios.get(endPoint.endpointTarget+'/ventas', config)
            .then(res => {
                this.sales = res.data
                
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
        formatDate(date) {
            let dateFormat = new Date(date)
			return dateFormat.getDate()+"-"+(dateFormat.getMonth() + 1)+"-"+dateFormat.getFullYear()+' ('+dateFormat.getHours()+":"+ dateFormat.getMinutes()+')'
        },
        formatPrice(value) {
            let val = (value/1).toFixed(2).replace('.', ',')
            return '$ '+val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        justName(value){
            if(value){
                const split = value.split(' / ')
                var goBack = ''
                for (let index = 0; index < split.length; index++) {
                    goBack = goBack +'\n '+ split[index]
                }
                return goBack
            }
        },
        async dataReport(id){
            try {
                const sale = await axios.get(endPoint.endpointTarget+'/ventas/getSale/'+id)
                this.arreglo = sale.data
                this.arreglo.cliente = this.arreglo.cliente.split(' - ')
                this.arreglo.manicurista = this.arreglo.manicurista.split(' / ')
                this.arreglo.descuento = this.arreglo.descuento.split(' - ')
                this.modals.modal1 = true
            } catch(err) {
                this.messageError = 'error técnico'
                this.errorAlert = true
                setTimeout(() => {
                    this.errorAlert = false
                }, 1500);
            }
        },
        async cancelSale(id){
            const cancelSale = await axios.put(endPoint.endpointTarget+'/ventas/'+id, {
                employeComision: this.arreglo.EmployeComision
            })
            if (cancelSale.data.status == 'ok') {
                this.messageSuccess = 'Venta anulada'
                this.successAlert = true
                setTimeout(() => {
                    this.successAlert = false
                }, 1500);
                this.getSales()
                this.arreglo.status = false
            }
            else{
                this.messageError = 'error técnico'
                this.errorAlert = true
                setTimeout(() => {
                    this.errorAlert = false
                }, 1500);
            }
        },
    }
}
</script>
<style>
.table thead tr th{
    max-width: 20%;
}
.table thead tr th{
    max-width: 20%;
}
.positionAlert{
    position: absolute;
    top:2%;
    left: 20%;
    z-index: 100000;
}
</style>