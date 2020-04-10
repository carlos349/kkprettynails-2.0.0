<template>
    <div>
        <base-header class="header pb-4 pt-2 pt-lg-4 d-flex align-items-center"
            style="min-height: 50px; background-image: url(img/theme/clients.jpg); background-size: cover; background-position: center top;">
            <!-- Mask -->
            <span style="background-color:#172b4d !important" class="mask  opacity-7"></span>
            <!-- Header container -->
            <div class="container-fluid d-flex align-items-center">
                <div class="row">
                    <div class="col-lg-12 col-md-12" style="display:inline-block">
                        <h1 class="display-2 text-white w-100">Sección de ventas</h1>
                        <label class="text-white" v-if="validRoute('ventas', 'filtrar')">Filtra tus ventas</label>
                        <div class="row">
                            <div class="col-md-8">
                                <base-input v-if="validRoute('ventas', 'filtrar')" addon-left-icon="ni ni-calendar-grid-58">
                                    <flat-picker slot-scope="{focus, blur}"
                                        @on-open="focus"
                                        @on-close="blur"
                                        :config="configDatePicker"
                                        class="form-control datepicker"
                                        v-model="dates.range">
                                    </flat-picker>
                                </base-input>
                            </div>
                            <div class="col-md-2">
                                <base-button v-if="validRoute('ventas', 'filtrar')"  type="default" v-on:click="filterSale">Filtrar</base-button>
                            </div>
                            <div class="col-md-2">
                                <base-button v-if="inspectorFilter"  type="secondary" v-on:click="getSales">
                                    <font-awesome-icon class="icons" style="color:#172b4d;font-size:1em" icon="redo" />
                                </base-button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </base-header>
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
                                    <h3><strong>Prestador/es: <br/></strong><span v-for="lender of arreglo.EmployeComision" :key="lender">({{lender.employe}} - {{formatPrice(lender.comision)}}) <br/></span></h3> 
                                </div>
                                <div class="text-muted text-left">
                                    <h3><strong>Cliente/s: <br/></strong><span v-for="client of arreglo.cliente" :key="client">({{client}}) <br/></span></h3> 
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
                    <template v-if="validRoute('ventas', 'filtrar')">
                        <base-button block class="mt-2" v-if="arreglo.status" type="default" v-on:click="cancelSale(arreglo._id)">Anular venta</base-button>
                    </template>
                    <template v-else>
                        <base-button disabled block class="mt-2" v-if="arreglo.status" type="default">Anular venta</base-button>
                    </template>
                    
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
                <center v-if="validRoute('ventas', 'detalle')" >
                    <base-button v-if="props.row.status" icon="ni ni-fat-add" size="sm" type="default" v-on:click="dataReport(props.row._id)">Detalle</base-button>
                    <base-button v-else icon="ni ni-fat-add" size="sm" type="danger" v-on:click="dataReport(props.row._id)">Detalle</base-button>
                </center>
                <center v-else >
                    <base-button v-if="props.row.status" icon="ni ni-fat-add" disabled size="sm" type="default" v-on:click="dataReport(props.row._id)">Detalle</base-button>
                    <base-button v-else icon="ni ni-fat-add" disabled size="sm" type="danger" v-on:click="dataReport(props.row._id)">Detalle</base-button>
                </center>
               
            </template>
        </vue-bootstrap4-table>
        <modal :show.sync="modals.modal2"
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
import axios from 'axios'
import router from '../router'
import endPoint from '../../config-endpoint/endpoint.js'
import EventBus from '../components/EventBus'
import VueBootstrap4Table from 'vue-bootstrap4-table'
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import {Spanish} from 'flatpickr/dist/l10n/es.js';
import io from 'socket.io-client';
import jwtDecode from 'jwt-decode'
export default {
    components: {
        flatPicker,
        VueBootstrap4Table
    },
    data() {
        return {
            auth: [],
            socket: io(endPoint.endpointTarget),
            modals: {
                modal1: false,
                modal2: false,
                message: "",
                icon: '',
                type:''
            },
            dates: {
                range: new Date()
            },
            configDatePicker: {
                allowInput: true, 
                mode: 'range',
                dateFormat: 'm-d-Y',
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
                card_title: "Tabla de ventas",
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
            inspectorFilter: false
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
        this.getToken()
        console.log(this.auth)
    },
    methods: {
        getToken(){
            const token = localStorage.userToken
            const decoded = jwtDecode(token)  
            this.auth = decoded.access
        },
        async filterSale(){
            this.inspectorFilter = true
            const splitDate = this.dates.range.split(' a ')
            console.log(splitDate.length)
            if (splitDate.length > 1) {
                const Dates = splitDate[0]+':'+splitDate[1]
                try {
                    const sales = await axios.get(endPoint.endpointTarget+'/ventas/findSalesByDate/'+Dates)
                    if (sales.data.status == 'no Sales') {
                        this.modals = {
                            modal2: true,
                            message: "No hay ventas en las fechas seleccionadas",
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
                        }, 2000);
                    }else{
                        this.sales = sales.data.status
                    }
                }catch(error){
                    console.log(error)
                }
            }else{
                const dateDesde = new Date(this.dates.range)
                const formatDesde =(dateDesde.getMonth() + 1) + "-" + dateDesde.getDate()+"-"+dateDesde.getFullYear() 
                dateDesde.setDate(dateDesde.getDate() + 1)
                const formatHasta = (dateDesde.getMonth() + 1)+"-" + dateDesde.getDate()+"-"+dateDesde.getFullYear()
                const Dates = formatDesde+':'+formatHasta
                try {
                    const sales = await axios.get(endPoint.endpointTarget+'/ventas/findSalesByDay/'+Dates)
                    if (sales.data.status == 'no Sales') {
                        this.modals = {
                            modal2: true,
                            message: "No hay ventas en la fecha seleccionada",
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
                        }, 2000);
                    }else{
                        this.sales = sales.data.status
                    }
                }catch(err){
                    console.log(err)
                }
            }
        },
        getSales(){
            this.inspectorFilter = false
            const config = {headers: {'x-access-token': localStorage.userToken}}
            axios.get(endPoint.endpointTarget+'/ventas', config)
            .then(res => {
                this.sales = res.data
                
            }).catch(err => {
                this.modals = {
                    modal2: true,
                    message: "Acceso invalido, ingrese de nuevo, si el problema persiste comuniquese con el proveedor del servicio",
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
                }, 2000);
                router.push({name: 'login'})
            })
        },
        formatDate(date) {
            let dateFormat = new Date(date)
			return dateFormat.getDate()+"-"+(dateFormat.getMonth() + 1)+"-"+dateFormat.getFullYear()
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
                this.modals = {
                    modal2: true,
                    message: "Error técnico",
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
                }, 2000);
            }
        },
        async cancelSale(id){
            console.log(id)
            console.log(this.arreglo.EmployeComision)
            const cancelSale = await axios.put(endPoint.endpointTarget+'/ventas/'+id, {
                employeComision: this.arreglo.EmployeComision
            })
            if (cancelSale.data.status == 'ok') {
                this.modals = {
                    modal2: true,
                    message: "¡Venta anulada!",
                    icon: 'ni ni-check-bold ni-5x',
                    type: 'success'
                }
                setTimeout(() => {
                    this.modals = {
                        modal1: true,
                        modal2: false,
                        message: "",
                        icon: '',
                        type: ''
                    }
                }, 2000);
                this.getSales()
                this.arreglo.status = false
                const notify = await axios.post(endPoint.endpointTarget+'/notifications', {
                    userName:localStorage.getItem('nombre') + " " + localStorage.getItem('apellido'),
                    userImage:localStorage.getItem('imageUser'),
                    detail:'Anuló una venta del día '+this.formatDate(this.arreglo.fecha),
                    link: 'Ventas'
                })
                console.log(notify)
                if (notify) {
                    this.socket.emit('sendNotification', notify.data)
                }   
            }
            else{
                this.modals = {
                    modal2: true,
                    message: "¡Error al anular!",
                    icon: 'ni ni-fat-remove ni-5x',
                    type: 'danger'
                }
                setTimeout(() => {
                    this.modals = {
                        modal1: true,
                        modal2: false,
                        message: "",
                        icon: '',
                        type: ''
                    }
                }, 2000);
            }
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
        }
    },
    mounted (){
        EventBus.$on('reloadSales', status => {
            this.getSales()
        })
    }
}
</script>