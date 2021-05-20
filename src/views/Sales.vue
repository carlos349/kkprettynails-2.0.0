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
                            <div class="col-md-6">
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
                                <base-button v-if="inspectorFilter"  type="secondary" v-on:click="getSales('button')">
                                    <font-awesome-icon class="icons" style="color:#172b4d;font-size:1em" icon="redo" />
                                </base-button>
                            </div>
                            <div class="col-md-2">
                                <base-button title="Generar excel" icon="ni ni-book-bookmark" class="excel-generate" v-if="validRoute('ventas', 'filtrar')"  type="default" v-on:click="modals.modal3 = true"> </base-button>
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
                  body-classes="py-lg-5"
                  class="border-0">
                <template>
                    <div style="margin-top:-15% !important" class="text-muted text-center mb-3">
                       <h3>Detalle de la venta</h3> 
                    </div>
                </template>
                
                <template v-if="dataSale != null">
                    <tabs fill class="flex-column flex-md-row">
                        <card shadow>
                            <tab-pane>
                                <span slot="title">
                                    <i class="ni ni-cloud-upload-96"></i>
                                    Básicos
                                </span>
                                <div class="text-muted text-left">
                                    <h3><strong>Fecha: </strong>{{formatDate(dataSale.createdAt)}}</h3> 
                                </div>
                                <div class="text-muted text-left">
                                    <h3><strong>N° de Venta: </strong>V-{{dataSale.count}}</h3> 
                                </div>
                                <div class="text-muted text-left">
                                    <h3><strong>Empleada (o): <br/></strong><span>{{dataSale.employe.name}}  <br/></span></h3> 
                                </div>
                                <div class="text-muted text-left">
                                    <h3><strong>Cliente: <br/></strong><span>{{dataSale.client.name}} <br/></span></h3> 
                                </div>
                                <hr>
                                <div class="text-muted mt-2">
                                    <h2 class="text-center">Metodos de pago </h2>
                                    <div class="row">
                                        <template v-for="pay in dataSale.typesPay" >
                                            <h3 :key="pay.type" class="col-4 mx-auto"  v-if="pay.total > 0">
                                                <strong class="text-left">
                                                    <base-button class="col-12" type="secondary">{{pay.type}} 
                                                        <badge type="success" class="text-default">{{formatPrice(pay.total)}}</badge>
                                                    </base-button>
                                                </strong>
                                                <span class="float-right pr-5"> </span>
                                            </h3>
                                        </template>
                                    </div>
                                </div>
                            </tab-pane>
                            <tab-pane>
                                <span slot="title">
                                    <i class="ni ni-bell-55 mr-2"></i>
                                    Avanzados
                                </span>
                                <div class="text-muted text-left">
                                    <h3>
                                        <strong>Servicio(s): </strong>
                                        <span v-for="services of dataSale.services" :key="services"> 
                                            <br> {{services.service}}  
                                        </span>
                                    </h3> 
                                    <h3>
                                        <strong class="text-left">Diseño: </strong>
                                        <span>
                                            {{formatPrice(dataSale.design)}} 
                                        </span>
                                    </h3>
                                    <h3 v-if="dataSale.discount != null">
                                        <strong class="text-left">Descuento: </strong>
                                        <span>
                                            {{dataSale.discount}} %<br> 
                                        </span>
                                    </h3> 
                                </div>
                                <div class="text-muted">
                                    <h2 class="text-center">Montos</h2>
                                    <base-button class="w-100 text-left" type="secondary">
                                        <span class="text-left">Comisión total:</span>
                                        <badge type="success" class="text-default float-right">
                                            {{formatPrice(dataSale.commission)}}
                                        </badge>
                                    </base-button>
                                    <base-button class="w-100 text-left" type="secondary">
                                        <span class="text-left">Local:</span>
                                        <badge type="success" class="text-default float-right">
                                            {{formatPrice(dataSale.localGain)}}
                                        </badge>
                                    </base-button>
                                    <base-button class="w-100 text-left" type="secondary">
                                        <span class="text-left">Total:</span>
                                        <badge type="success" class="text-default float-right">
                                            {{formatPrice(dataSale.total)}}
                                        </badge>
                                    </base-button>
                                </div>
                            </tab-pane>
                        </card>
                    </tabs>
                    <template v-if="validRoute('ventas', 'filtrar')">
                        <base-button block class="mt-2" v-if="dataSale.status" type="default" v-on:click="cancelSale(dataSale._id, dataSale.services)">Anular venta</base-button>
                    </template>
                    <template v-else>
                        <base-button disabled block class="mt-2" v-if="dataSale.status" type="default">Anular venta</base-button>
                    </template>
                    
                </template>
            </card>
        </modal>
         <modal :show.sync="modals.modal3"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-md">
               <h6 slot="header" class="modal-title p-0 m-0" id="modal-title-default"></h6>
            <card type="secondary" shadow
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-5 py-lg-5"
                  class="border-0">
                <template>
                    <div style="margin-top:-15% !important" class="text-muted text-center mb-3">
                       <h3>Aplica filtros para tu reporte {{dates.rangeExcel}}</h3> 
                    </div>
                </template>
                <template>
                    <div class="row">
                        <div class="col-md-12">
                            <label for="date">Filtra por fecha</label>
                            <base-input addon-left-icon="ni ni-calendar-grid-58">
                                <flat-picker slot-scope="{focus, blur}"
                                    @on-open="focus"
                                    @on-close="blur"
                                    :config="configDatePicker"
                                    class="form-control datepicker"
                                    v-model="dates.rangeExcel">
                                </flat-picker>
                            </base-input>
                        </div>
                        <div class="col-md-6">
                            <label for="lender">¿Filtrar por prestadora en específico?</label>
                            <div v-on:click="chooseLender"> 
                                <vue-single-select v-if="validClient"
                                v-model="lenderSelect"
                                :options="lenderNames"
                                placeholder="Prestadoras"
                                ></vue-single-select> 
                                <vue-single-select v-else
                                v-model="lenderSelect"
                                :options="lenderNames"
                                placeholder="Prestadoras"
                                class="bgcolor-danger"
                                disabled
                                ></vue-single-select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label for="lender">¿Filtrar por cliente en específico?</label>
                            <div v-on:click="chooseClient">
                                <vue-single-select v-if="validLender"
                                v-model="clientSelect"
                                :options="clientNames"
                                placeholder="Clientes"
                                ></vue-single-select>  
                                <vue-single-select v-else
                                v-model="clientSelect"
                                :options="clientNames"
                                placeholder="Clientes"
                                class="bgcolor-danger"
                                disabled
                                ></vue-single-select> 
                            </div>
                        </div>
                        <div class="col-md-12">
                            <center>
                                <base-button type="default" v-on:click="generateExcel()"> Generar
                                </base-button>
                            </center>
                        </div>
                    </div>
                </template>
            </card>
        </modal>
        <a-config-provider>
            <template #renderEmpty>
                <div style="text-align: center">
                    <a-icon type="warning" style="font-size: 20px" />
                    <h2>Sucursal sin ventas registradas</h2>
                </div>
            </template>
            <a-table :columns="columns" :loading="progress" :data-source="sales" :scroll="getScreen">
                <div
                    slot="filterDropdown"
                    slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
                    style="padding: 8px"
                    >
                    <a-input
                        v-ant-ref="c => (searchInput = c)"
                        :placeholder="`Buscar por nombre`"
                        :value="selectedKeys[0]"
                        style="width: 188px; margin-bottom: 8px; display: block;"
                        @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                        @pressEnter="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
                    />
                    <a-button
                        type="primary"
                        icon="search"
                        size="small"
                        style="width: 90px; margin-right: 8px"
                        @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
                    >
                        Buscar
                    </a-button>
                    <a-button size="small" style="width: 90px" @click="() => handleReset(clearFilters)">
                        resetear
                    </a-button>
                </div>
                <a-icon
                    slot="filterIcon"
                    slot-scope="filtered"
                    type="search"
                    :style="{ color: filtered ? '#108ee9' : undefined }"
                />
                <template slot="customRender" slot-scope="text, record, index, column">
                    <span v-if="searchText && searchedColumn === column.dataIndex">
                        <template
                        v-for="(fragment, i) in text
                            .toString()
                            .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
                        >
                        <mark
                            v-if="fragment.toLowerCase() === searchText.toLowerCase()"
                            :key="i"
                            class="highlight"
                            >{{ fragment }}</mark
                        >
                        <template v-else>{{ fragment }}</template>
                        </template>
                    </span>
                    <template v-else>
                        {{ text }}
                    </template>
                </template>
                
                <template slot="date-format" slot-scope="record, column">
                    {{formatDate(column.createdAt)}}
                </template>
                <template slot="employeName" slot-scope="record, column">
                    {{column.employe.name}}
                </template>
                <template slot="commission" slot-scope="record, column">
                    {{formatPrice(column.commission)}}
                </template>
                <template slot="localGain" slot-scope="record, column">
                    {{formatPrice(column.localGain)}}
                </template>
                
                <template slot="total" slot-scope="record, column">
                    {{formatPrice(column.total)}}
                </template>
                <template slot="reportSale" slot-scope="record, column">
                    <center v-if="validRoute('ventas', 'detalle')" >
                        <a-tooltip placement="top">
                            <template slot="title">
                            <span>Ver detalles</span>
                            </template>
                            <base-button v-if="column.status" icon="ni ni-fat-add" size="sm" type="default" v-on:click="dataReport(column)"></base-button>
                        <base-button v-else icon="ni ni-fat-add" size="sm" type="danger" v-on:click="dataReport(column)"></base-button>
                        </a-tooltip>
                        
                    </center>
                    <center v-else >
                        <base-button v-if="column.status" icon="ni ni-fat-add" disabled size="sm" type="default"></base-button>
                        <base-button v-else icon="ni ni-fat-add" disabled size="sm" type="danger" ></base-button>
                    </center>
                </template>
            </a-table>
        </a-config-provider>
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
import XLSX from 'xlsx'
import VueMoment from 'vue-moment'
var moment = require('moment'); // require
const dateNew = new Date()


export default {
    components: {
        flatPicker,
        VueBootstrap4Table
    },
    data() {
        return {
            configHeader: {
                headers:{
                    "x-database-connect": endPoint.database, 
                    "x-access-token": localStorage.userToken
                }
            },
            progress:true,
            auth: [],
            socket: io(endPoint.endpointTarget),
            modals: {
                modal1: false,
                modal2: false,
                modal3:false,
                message: "",
                icon: '',
                type:''
            },
            dates: {
                range:   dateNew.getDate()+ "-" +  (dateNew.getMonth()+ 1) +"-"+dateNew.getFullYear(),
                rangeExcel: dateNew.getDate()+ "-" +  (dateNew.getMonth()+ 1) +"-"+dateNew.getFullYear()
            },
            configDatePicker: {
                allowInput: true, 
                mode: 'range',
                dateFormat: 'd-m-Y',
                locale: Spanish, // locale for this instance only          
            }, 
            columns: [
                {
                    title: 'Comisión',
                    dataIndex: 'createdAt',
                    key: 'createdAt',
                    scopedSlots: { customRender: 'date-format' },
                    defaultSortOrder: 'descend',
                    sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
                    ellipsis: true,
                },
                {
                    title: 'Comisión',
                    dataIndex: 'commission',
                    key: 'commission',
                    ellipsis: true,
                    scopedSlots: { customRender: 'commission' },
                    defaultSortOrder: 'descend',
                    sorter: (a, b) => a.commission - b.commission
                },
                {
                    title: 'Ganacia local',
                    dataIndex: 'localGain',
                    key: 'localGain',
                    ellipsis: true,
                    scopedSlots: { customRender: 'localGain' },
                    defaultSortOrder: 'descend',
                    sorter: (a, b) => a.localGain - b.localGain
                },
                {
                    title: 'Total',
                    dataIndex: 'total',
                    key: 'total',
                    ellipsis: true,
                    scopedSlots: { customRender: 'total' },
                    defaultSortOrder: 'descend',
                    sorter: (a, b) => a.total - b.total
                },
                {
                    title: 'Empleadas (os)',
                    dataIndex: 'employe',
                    key: 'employe',
                    ellipsis: true,
                    scopedSlots: { customRender: 'employeName' },
                },
                {
                    title: 'Acciones',
                    dataIndex: '_id',
                    key: '_id',
                    ellipsis: true,
                    scopedSlots: { customRender: 'reportSale' },
                },
            ],
            configTable: {
                card_title: "Tabla de ventas",
                checkbox_rows: false,
                rows_selectable : true,
                highlight_row_hover_color:"rgba(238, 238, 238, 0.623)",
                rows_selectable: true,
                per_page_options: [5, 10, 20, 30, 40, 50, 80, 100],
                num_of_visibile_pagination_buttons: 7,
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
            dataSale: null,
            successAlert: false,
            errorAlert: false,
            messageSuccess: '',
            messageError: '',
            inspectorFilter: false,
            lenderSelect: '',
            lenderNames: [],
            clientSelect: '',
            clientNames: [],
            paySelect: '',
            payNames: ['Efectivo', 'Transferencia', 'Débito', 'Crédito', 'Otros'],
            validLender: true,
            validClient: true,
            branch: '',
            branchName: ''
        }
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
        this.getToken()
        this.getBranch()
        $(document).ready(function(){
            setTimeout(() => {
               $("input[placeholder='Go to page']").hide(); 
            }, 200);
            
        });
        
    },
    methods: {
        getToken(){
            const token = localStorage.userToken
            const decoded = jwtDecode(token)  
            this.auth = decoded.access
        },
        getBranch(){
            this.branchName = localStorage.branchName  
            this.branch = localStorage.branch
            this.getClient()
            this.getEmployes()
            this.getSales('no-button')
        },
        async getClient(){
            try{
                const clients = await axios.get(endPoint.endpointTarget+'/clients', this.configHeader)
                this.clientNames = []
                for (let index = 0; index < clients.data.data.length; index++) {
                    this.clientNames.push(clients.data.data[index].firstName+ ' / ' +clients.data.data[index].email)
                }
            }catch(err){
                this.$swal({
                    icon: 'error',
                    title: 'Acceso invalido, ingrese de nuevo, si el problema persiste comuniquese con el proveedor del servicio',
                    showConfirmButton: false,
                    timer: 2500
                })
                router.push({name: 'login'})
            }
        },
        async getEmployes(){
            try {
                const employes = await axios.get(endPoint.endpointTarget+'/employes/employesbybranch/'+this.branch, this.configHeader)
                if(employes.data.status == 'ok'){
                    this.lenderNames = []
                    for (let index = 0; index < employes.data.data.length; index++) {
                        this.lenderNames.push(employes.data.data[index].firstName)
                    }
                }
            }catch(err){
                this.$swal({
					icon: 'error',
					title: 'Acceso invalido, ingrese de nuevo, si el problema persiste comuniquese con el proveedor del servicio',
					showConfirmButton: false,
					timer: 2500
				})
				router.push({name: 'login'})
            }
        },
        async filterSale(){
            console.log(this.dates.range)
            this.progress = true
            this.inspectorFilter = true
            const splitDate = this.dates.range.split(' a ')
            if (splitDate.length > 1) {
                var f1 = splitDate[0].split("-")
                var f2 = splitDate[1].split("-")
                var Dates = f1[1]+"-"+f1[0]+"-"+f1[2]+":"+f2[1]+"-"+f2[0]+"-"+f2[2]
                
                try {
                    const sales = await axios.post(endPoint.endpointTarget+'/sales/findSalesByDate', {
                        branch: this.branch,
                        dates: Dates
                    }, this.configHeader)
                    console.log(sales)
                    if (sales.data.status == 'sales does exist') {
                        this.progress = false
                        this.sales = []
                        this.$swal({
                            icon: 'error',
                            title: 'No hay ventas en las fechas seleccionadas',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }else{
                        this.progress = false
                        this.sales = sales.data.data
                    }
                }catch(error){
                    console.log(error)
                }
            }else{
                
                var f1 = this.dates.range.split("-")
                var newsD = f1[1]+"-"+f1[0]+"-"+f1[2]
                var dateDesde = new Date(newsD)
                const formatDesde =(dateDesde.getMonth() + 1) + "-" + dateDesde.getDate()+"-"+dateDesde.getFullYear() 
                dateDesde.setDate(dateDesde.getDate() + 1)
                const formatHasta = (dateDesde.getMonth() + 1)+"-" + dateDesde.getDate()+"-"+dateDesde.getFullYear()
                const Dates = formatDesde+':'+formatHasta
                try {
                    const sales = await axios.post(endPoint.endpointTarget+'/sales/findSalesByDay/', {
                        dates: Dates,
                        branch: this.branch
                    }, this.configHeader)
                    if (sales.data.status == 'sales does exist') {
                        this.progress = false
                        this.sales = []
                        this.$swal({
                            icon: 'error',
                            title: 'no hay ventas en la fecha seleccionada',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }else{
                        this.progress = false
                        this.sales = sales.data.data
                    }
                }catch(err){
                    console.log(err)
                }
            }
        },
        async getSales(button){
            this.progress = true
            if(button == 'button'){
                this.dates.range = ''
            }
            this.inspectorFilter = false
            try {
                const sales = await axios.get(endPoint.endpointTarget+'/sales/'+this.branch, this.configHeader)
                if (sales.data.status == 'ok') {
                    this.sales = sales.data.data
                    this.progress = false
                }else{
                    this.sales = []
                    this.progress = false
                }
            }catch(err){
                this.$swal({
                    icon: 'error',
                    title: 'Acceso invalido, ingrese de nuevo, si el problema persiste comuniquese con el proveedor del servicio',
                    showConfirmButton: false,
                    timer: 2500
                })
                router.push({name: 'login'})
            }
        },
        formatDate(date) {
            let dateFormat = new Date(date)
			return moment(dateFormat).format("DD-MM-YYYY")
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
        async dataReport(data){
            this.dataSale = data
            // this.arreglo.cliente = this.arreglo.cliente.split(' - ')
            // this.arreglo.manicurista = this.arreglo.manicurista.split(' / ')
            // this.arreglo.descuento = this.arreglo.descuento.split(' - ')
            console.log(this.dataSale)
            this.modals.modal1 = true
        },
        cancelSale(id, services){
            this.$swal({
				title: '\n¿Está seguro anular la venta?',
				text: 'No puede revertir esta acción',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Estoy seguro',
				cancelButtonText: 'No, evitar acción',
				showCloseButton: true,
				showLoaderOnConfirm: true
			}).then((result) => {
                if (result.value) {
                    axios.put(endPoint.endpointTarget+'/sales/'+id, {
                        commission: this.dataSale.commission,
                        employeId: this.dataSale.employe.id
                    }, this.configHeader)
                    .then(res => {
                        if (res.data.status == 'ok') {
                            axios.post(endPoint.endpointTarget+'/inventario/nullSale', {
                                array: services
                            }).then(res=>{})
                            this.$swal({
                                icon: 'success',
                                title: 'Venta anulada',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            this.getSales('no-button')
                            this.dataSale.status = false
                            axios.post(endPoint.endpointTarget+'/notifications', {
                                branch: this.branch,
                                userName: localStorage.getItem('firstname') + " " + localStorage.getItem('lastname'),
                                userImage: localStorage.getItem('imageUser'),
                                detail: 'Anuló una venta del día '+this.formatDate(this.dataSale.createdAt),
                                link: 'Ventas'
                            }).then(res => {
                                console.log(res)
                                if (res.data.status == 'ok') {
                                    this.socket.emit('sendNotification', notify.data)
                                } 
                            })
                        }else{
                            this.$swal({
                                icon: 'error',
                                title: 'error al anular, si persiste pongase en contacto con el proveedor del servicio',
                                showConfirmButton: false,
                                timer: 2500
                            })
                        }
                    })
                }else{
                    this.$swal({
                        icon: 'info',
                        title: 'acción cancelada',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
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
        generateExcel(){
            console.log(this.dates.rangeExcel.length)
            var valid = this.dates.rangeExcel
            var f = this.dates.rangeExcel.split("-")
            var dates = f[1]+"-"+f[0]+"-"+f[2]+':not'
            if (this.dates.rangeExcel.length > 12) {
                const split = this.dates.rangeExcel.split(' a ')
                var f1 = split[0].split("-")
                var f2 = split[1].split("-")
                dates = f1[1]+"-"+f1[0]+"-"+f1[2]+" a "+f2[1]+"-"+f2[0]+"-"+f2[2]
                valid = split[0]
            }
            if (this.lenderSelect == null) {
                this.lenderSelect = ''
            }
            if (this.clientSelect == null) {
                this.clientSelect = ''
            }
            axios.post(endPoint.endpointTarget+'/sales/generateDataExcel', {
                rangeExcel: dates, 
                lenderSelect: this.lenderSelect, 
                clientSelect: this.clientSelect.split(' / ')[1],
            }, this.configHeader)
            .then(res => {
                console.log(res)
                if (res.data.status == 'ok') {
                    var Datos = XLSX.utils.json_to_sheet(res.data.dataTable) 
                    var wb = XLSX.utils.book_new() 
                    XLSX.utils.book_append_sheet(wb, Datos, 'Datos') 
                    XLSX.writeFile(wb, 'Ventas del '+valid+'.xlsx') 
                    this.lenderSelect = ''
                    this.clientSelect = ''
                    this.validLender = true
                    this.validClient = true
                    this.dates.rangeExcel = (dateNew.getMonth() + 1)+'-'+dateNew.getDate()+'-'+dateNew.getFullYear()
                    this.modals.modal3 = false
                }else{
                    this.modals = {
                        modal2: true,
                        message: "¡No se encontraron ventas!",
                        icon: 'ni ni-fat-remove ni-5x',
                        type: 'danger'
                    }
                    setTimeout(() => {
                        this.modals = {
                            modal1: false,
                            modal2: false,
                            modal3:true,
                            message: "",
                            icon: '',
                            type: ''
                        }
                    }, 2000);
                }
            })
        },
        chooseLender(){
            if (this.lenderSelect == '' || this.lenderSelect == null) {
                this.validLender = true
            }else{
                this.validLender = false
            }
        },
        chooseClient(){
            if (this.clientSelect == '' || this.clientSelect == null) {
                this.validClient = true
            }else{
                this.validClient = false
            }
        }
    },
    mounted (){
        EventBus.$on('reloadSales', status => {
            this.getSales('no-button')
        })
        EventBus.$on('changeBranch', status => {
            this.getBranch()
        })
    },
    computed: {
        getScreen: () => {
            return screen.width < 780 ? { x: 'calc(700px + 50%)', y: 240 } : { y: 'auto' }
        }
    }
}
</script>
<style>
    .vue-progress-path path {
        stroke-width: 12;
    }
    .vue-progress-path .progress {
        stroke:#00768c;
    }
    .vue-progress-path .background {
        stroke: transparent;
    }
    /* .excel-generate{
        position:absolute;
        right:2%;
        top:30%;
        z-index: 10;
    } */
    .bgcolor-danger #single-select{
        border-color:red;
    }
</style>