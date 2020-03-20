<template>
    <div class="row">
        <div class="col-6">
            <div v-on:click="chooseClient">
              <vue-single-select
                v-model="clientSelect"
                :options="clientNames"
                placeholder="Clientes"
                ></vue-single-select>  
            </div>
        </div>
        <div class="col-6">
            <div v-on:click="chooseLender"> 
                <vue-single-select
                v-model="lenderSelect"
                :options="lenderNames"
                placeholder="Prestadoras"
                ></vue-single-select> 
            </div>
        </div>
        <div class="col-12">
            <table class="table" v-bind:style="{ 'background-color': '#172b4d', 'border-radius' : '10px', 'border':'none !important'}" >
                <thead>
                    <tr>
                        <th style="border-radius:15px !important;border:none">
                            <input class="w-75 inputFilter" id="myInput" v-on:keyup="myFunction()" type="text" placeholder="Filtre servicios">
                        </th>
                        <th style="color:white;border:none" class="text-center pb-2">
                            Precio 
                        </th>
                    </tr>
                </thead>
            </table>
            <vue-custom-scrollbar ref="scroll" class="ps-container ListaProcesar p-2 ps ps--active-y">
                <table class="table tableBg" id="myTable">
                    <tbody>
                        <tr v-for="(servicio, index) in services" v-bind:key="servicio._id">
                            <td style="border:none;padding:5px;" v-if="servicio.active" class="font-weight-bold" >
                                <base-button size="sm"  type="default" class="w-75" v-on:click="conteoServicio(servicio._id,servicio.nombre, servicio.precio, servicio.comision, servicio.descuento), countServices[index].count++">
                                    <span class="float-left">{{servicio.nombre}}</span>
                                    <badge class="badgeClass float-right" type="primary" :id="servicio._id">{{countServices[index].count}}</badge>
                                </base-button>
                                <base-button size="sm" type="default" v-on:click="borrarServicio(servicio.nombre,index,servicio._id,servicio.precio, servicio.descuento)">
                                    <font-awesome-icon icon="times"/>
                                </base-button>
                            </td>
                            <td style="border:none" v-if="servicio.active" class="font-weight-bold text-center">
                                {{formatPrice(servicio.precio)}}
                            </td>
                        </tr>
                        
                    </tbody>
                </table>
            </vue-custom-scrollbar>
            <div class="row pt-3 shadowTop">
                <div class="col-sm-5">
                    <div class="input-group">
                        <base-input alternative
                            title="Sub Total"
                            type="text"
                            class="align"
                            placeholder=""
                            addon-left-icon="ni ni-money-coins"
                            v-model="price"
                            disabled
                        ></base-input>
                    </div>
                </div>
                <div class="col-sm-3">
                    <div class="input-group">
                        <base-input alternative
                            title="Descuento"
                            type="text"
                            class="align"
                            placeholder="Descuento"
                            addon-left-icon="ni ni-tag"
                            v-on:change="descuentoFunc(true)"
                            v-model="discount"
                        ></base-input>
                    </div>
                </div>
                <div class="col-sm-4">
                    <currency-input
                        title="Diseño"
                        v-model="design"
                        placeholder="Diseño"
                        locale="de"
                        class="form-control"
                        v-on:keyup="addDesign()"/>
                </div>
            </div>
            <div class="text-muted text-center mb-1" style="margin-top:-15px;">
                Medios de pago
            </div>
            <div class="row">
                <div class="col-4">
                    <div class="input-group mb-2">
                        <div title="Efectivo" v-on:click="hundredPorcent('efectivo')" v-on:mouseenter="hundredMouseOver('efectivo')" v-on:mouseleave="hundredMouseNonOver('efectivo')" class="input-group-prepend text-center w-25 hundred">
                            <span class="inputsVenta w-100 input-group-text" id="inputGroup-sizing-lg">
                                <b class="efectivo" style="font-size:0.6em;display:none">100%</b>
                            <font-awesome-icon  class="efectivo" style="font-size:1em; color:#6BB2E5" icon="money-bill-wave"/>	
                            </span>
                            
                        </div>
                        <currency-input
                            v-model="payCash"
                            locale="de"
                            placeholder="Efectivo"
                            class="form-control"
                        />
                    </div>
                </div>
                <div class="col-4">
                    <div title="Transferencia" class="input-group mb-2">
                        <div  v-on:click="hundredPorcent('trasnferencia')" v-on:mouseenter="hundredMouseOver('trasnferencia')" v-on:mouseleave="hundredMouseNonOver('trasnferencia')" class="input-group-prepend text-center w-25 hundred">
                            <span class="inputsVenta w-100 input-group-text" id="inputGroup-sizing-lg">
                                <b class="trasnferencia" style="font-size:0.6em;display:none">100%</b>
                            <font-awesome-icon  class="trasnferencia" style="font-size:1em; color:#6BB2E5" icon="money-check-alt"/>	
                            </span>
                        </div>
                        <currency-input
                            v-model="payTransfer"
                            locale="de"
                            placeholder="Transferencia"
                            class="form-control"
                        />
                    </div>
                </div>
                <div class="col-4">
                    <div title="Otros" class="input-group mb-2">
                        <div v-on:click="hundredPorcent('others')" v-on:mouseenter="hundredMouseOver('others')" v-on:mouseleave="hundredMouseNonOver('others')" class="input-group-prepend text-center w-25 hundred">
                            <span class="inputsVenta w-100 input-group-text" id="inputGroup-sizing-lg">
                                <b class="others" style="font-size:0.6em;display:none">100%</b>
                            <font-awesome-icon  class="others" style="font-size:1em; color:#6BB2E5" icon="hand-holding-usd"/>	
                            </span>
                        </div>
                        <currency-input
                            v-model="payOthers"
                            locale="de"
                            placeholder="Otros"
                            class="form-control"
                        />
                    </div>
                </div>
                <div title="Débito" class="col-6">
                    <div class="input-group mb-2">
                        <div v-on:click="hundredPorcent('debit')" v-on:mouseenter="hundredMouseOver('debit')" v-on:mouseleave="hundredMouseNonOver('debit')" class="input-group-prepend text-center w-25 hundred">
                            <span class="inputsVenta w-100 input-group-text" id="inputGroup-sizing-lg">
                                <b class="debit" style="font-size:0.6em;display:none">100%</b>
                                <img style="width:98%;padding-left:1px" class="debit"  src="../assets/trans1.png" alt="">	
                            </span>
                        </div>
                        <currency-input
                            v-model="payDebit"
                            locale="de"
                            placeholder="Débito"
                            class="form-control"
                        />
                    </div>
                </div>
                <div title="Crédito" class="col-6">
                    <div class="input-group mb-2">
                        <div v-on:click="hundredPorcent('credit')" v-on:mouseenter="hundredMouseOver('credit')" v-on:mouseleave="hundredMouseNonOver('credit')" class="input-group-prepend text-center w-25 hundred">
                            <span class="inputsVenta w-100 input-group-text" id="inputGroup-sizing-lg">
                                <b class="credit" style="font-size:0.6em;display:none">100%</b>
                                <img class="credit" style="width:98%;padding-left:1px"  src="../assets/trans1.png" alt="">	
                            </span>
                        </div>
                        <currency-input
                            v-model="payCredit"
                            locale="de"
                            placeholder="Crédito"
                            class="form-control"
                        />
                    </div>
                </div>
                <div class="col-6">
                    <div v-on:change="changeDate">
                        <base-input addon-left-icon="ni ni-calendar-grid-58">
                            <flat-picker 
                                    slot-scope="{focus, blur}"
                                    @on-open="focus"
                                    @on-close="blur"
                                    :config="{allowInput: true}"
                                    class="form-control datepicker"
                                    aria-placeholder="Seleccione una fecha"
                                    v-model="dates.dateSale">
                            </flat-picker>
                        </base-input>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-6">
                    <h1 class="pt-2">Total: {{total}}</h1>
                </div>
                <div class="col-6">
                    <base-button size="lg" class="float-right w-75" type="success" v-on:click="processSale">
                        Procesar
                    </base-button>
                </div>
            </div>
        </div>
        <modal :show.sync="modals.modal1"
               :gradient="modals.type"
               modal-classes="modal-danger modal-dialog-centered">
            <div class="py-3 text-center">
                <i :class="modals.icon"></i>
                <h1 class="heading mt-5">{{modals.message}}</h1>
            </div>
        </modal>
        <modal :show.sync="modals.modal2"
              body-classes="p-0"
              modal-classes="modal-dialog-centered modal-md">
              <h6 slot="header" class="modal-title" id="modal-title-default"></h6>
          <card type="secondary" shadow
                header-classes="bg-white pb-5"
                body-classes="px-lg-5"
                class="border-0">
              <template>
                  <div class="text-muted text-center mb-3">
                      <h1>Nuevo cliente</h1> 
                  </div>
              </template>
              <template>
                  <form role="form">
                        <base-input alternative
                                    class="mb-3"
                                    placeholder="Nombre"
                                    v-model="registerClient.name"
                                    v-on:change="validRegister(2)"
                                    addon-left-icon="ni ni-single-02">
                        </base-input>
                        <base-input alternative
                                    type="text"
                                    placeholder="Contacto principal"
                                    v-model="registerClient.id"
                                    v-on:change="validRegister(2)"
                                    addon-left-icon="fa fa-address-card">
                        </base-input>
                        <base-input alternative
                                    type="text"
                                    placeholder="Contacto adicional"
                                    v-model="registerClient.contactOne"
                                    addon-left-icon="fa fa-address-card">
                        </base-input>
                        <base-input alternative
                                    type="text"
                                    placeholder="Contacto adicional"
                                    v-model="registerClient.contactTwo"
                                    addon-left-icon="fa fa-address-card">
                        </base-input>
                        <base-checkbox v-if="!ifEdit" v-model="registerClient.discount" class="mb-3">
                            Descuento de nuevo cliente
                        </base-checkbox>
                        <vue-single-select 
                            v-if="!ifEdit"
                            v-model="registerClient.recommender"
                            :options="clientNames"
                            placeholder="Recomendador"
                        ></vue-single-select>
                        <div class="text-center">
                            <base-button type="default" v-if="!registerClient.valid" disabled class="my-4">Registrar</base-button>
                            <base-button type="default" v-on:click="registerClients()" v-if="registerClient.valid && !ifEdit" class="my-4">Registrar</base-button>
                            <base-button type="default" v-on:click="editClient()" v-if="registerClient.valid && ifEdit" class="my-4">Editar</base-button>
                        </div> 
                    </form>
              </template>
          </card>
        </modal>
        <modal :show.sync="modals.modal3"
              body-classes="p-0"
              modal-classes="modal-dialog-centered modal-md">
              <h6 slot="header" class="modal-title" id="modal-title-default"></h6>
          <card type="secondary" shadow
                header-classes="bg-white pb-5"
                body-classes="px-lg-5"
                class="border-0">
              <template>
                  <div class="text-muted text-center mb-3">
                      <h1>Nuevo servicio</h1> 
                  </div>
              </template>
              <template>
                    <form role="form">
                        <base-input alternative
                            v-on:change="validRegister(1)"
                            class="mb-3"
                            placeholder="Nombre"
                            addon-left-icon="ni ni-single-copy-04"
                            v-model="registerService.serviceRegister">
                        </base-input>
                        <base-input alternative
                            v-on:change="validRegister(1)"
                            type="number"
                            max-count="100"
                            placeholder="comision (%)"
                            addon-left-icon="ni ni-money-coins"
                            v-model="registerService.comissionRegister">
                        </base-input>
                        <currency-input
                            v-on:change="validRegister(1)"
                            v-model="registerService.priceRegister"
                            locale="de"
                            placeholder="Costo"
                            class="form-control mb-3"
                            style="margin-top:-10px;"
                        />	
                        <select class="form-control mb-3" v-on:change="validRegister(1)" v-model="registerService.timeRegister">
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
                        <base-checkbox class="mb-3" v-on:click="validRegister(1)" v-model="registerService.addDiscount">
                            ¿Aplica descuento?
                        </base-checkbox>
                        <vue-custom-scrollbar class="maxHeight">
                            <vue-bootstrap4-table :rows="registerService.lenders" :columns="columnsLender" :classes="classes" :config="configLender" v-on:on-select-row="selected" v-on:on-all-select-rows="selectedAll" v-on:on-unselect-row="unSelected" v-on:on-all-unselect-rows="unSelectedAll">
                            </vue-bootstrap4-table>
                        </vue-custom-scrollbar >
                        <div class="text-center">
                            <base-button v-if="!registerService.valid" type="default" class="my-4" v-on:click="registerServiceProcess()" disabled>Registrar</base-button>
                            <base-button v-else type="default" class="my-4" v-on:click="registerServiceProcess()" >Registrar</base-button>
                        </div>
                    </form>
              </template>
          </card>
        </modal>
        <modal :show.sync="modals.modal4"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-md">
               <h6 slot="header" class="modal-title" id="modal-title-default"></h6>
            <card type="secondary" shadow
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-5 py-lg-5"
                  class="border-0">
                <template>
                    <div class="text-muted text-center mb-3">
                        <h3>Registrar monto de apertura</h3>
                    </div>
                </template>
                <template>
                    <form role="form">
                        <base-input 
                            alternative
                            class="mb-3"
                            placeholder="Nombre el cajero"
                            v-on:keyup="validRegister(3)"
                            v-model="cashFunds.cashName"
                            addon-left-icon="ni ni-circle-08">
                        </base-input>
                        <currency-input
                            v-model="cashFunds.cashAmount"
                            v-on:keyup="validRegister(3)"
                            locale="de"
                            addon-left-icon="ni ni-money-coins"
                            class="form-control mb-3"
                            style="margin-top:-10px;"
                        />	
                        <base-button v-if="!cashFunds.valid" type="default" disabled>
                            Ingresar fondo
                        </base-button>
                        <base-button v-else type="default" v-on:click="registerFund">
                            Ingresar fondo
                        </base-button> 
                    </form>
            </template>
            </card>
        </modal>
        <div v-bind:style="{  'height': '45px', 'z-index' : '1000' }" v-on:click="modals.modal2 = true" class="p-2 menuVerVentas navSVenta" v-on:mouseenter="mouseOverVenta(newClient)" v-on:mouseleave="mouseLeaveVenta(newClient)">
			<div class="row">
				<div class="col-2 pt-1">
                    <font-awesome-icon v-if="ifEdit" class="icons" style="color:#172b4d;font-size:1em" icon="user-edit" />
					<font-awesome-icon v-else class="icons" style="color:#172b4d;font-size:1em" icon="user-plus" />
				</div>
				<div v-if="newClient.valid" class="col-10 pl-4 pt-1">
					<b style="font-size:14px;">{{newClient.text}}</b>	
				</div>
			</div>	
        </div>
		<div v-bind:style="{  'height': '45px', 'z-index' : '1000' }" v-on:click="modals.modal3 = true" class="p-2 menuVerServi navSServi" v-on:mouseenter="mouseOverVenta(newService)" v-on:mouseleave="mouseLeaveVenta(newService)">
			<div class="row">
				<div class="col-2 pt-1">
					<font-awesome-icon class="icons" style="color:#172b4d;font-size:1em" icon="folder-plus" />
				</div>
				<div v-if="newService.valid" class="col-10 pl-4 pt-1">
					<b style="font-size:14px;">{{newService.text}}</b>	
				</div>
			</div>
        </div>
		<div v-bind:style="{  'height': '45px', 'z-index' : '1000' }" v-on:click="initialState()" class="p-2 menuVerRedo navSRedo" v-on:mouseenter="mouseOverVenta(reloadSales)" v-on:mouseleave="mouseLeaveVenta(reloadSales)">
			<div class="row">
				<div class="col-2 pt-1">
					<font-awesome-icon class="icons" style="color:#172b4d;font-size:1em" icon="redo" />
				</div>
				<div v-if="reloadSales.valid" class="col-10 pl-4 pt-1">
					<b style="font-size:14px;">{{reloadSales.text}}</b>	
				</div>
			</div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import router from '../router'
import endPoint from '../../config-endpoint/endpoint.js'
import jwtDecode from 'jwt-decode'

import EventBus from './EventBus'
import vueCustomScrollbar from 'vue-custom-scrollbar'
import VueBootstrap4Table from 'vue-bootstrap4-table'
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
export default {
    components: {
        vueCustomScrollbar,
        VueBootstrap4Table,
        flatPicker
    },
    data(){
        return {
            modals: {
                modal1: false,
                modal2: false,
                modal3: false,
                modal4: false,
                message: "",
                icon: '',
                type:''
            },
            registerClient: {
                name: '',
                id: '',
                contactOne: '',
                contactTwo: '',
                discount: false,
                recommender: '',
                valid: false,
            },
            cashFunds: {
                cashName: '',
                cashAmount: 0,
                valid: false,
            },
            registerService: {
                serviceRegister: '',
                comissionRegister: '',
                priceRegister: 0,
                timeRegister: 'Seleccione el tiempo',
                addDiscount: false,
                lenderSelecteds: [],
                lenders: [],
                valid:false
            },
            columnsLender: [{
                label: "Nombre",
                name: "nombre",
                // filter: {
                //     type: "simple",
                //     placeholder: "id"
                // },
                sort: true,
            }],
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
            clientNames: [],
            clientSelect: '',
            lenderNames: [],
            lenderSelect: '',
            services: [],
            inspector: false,
            countServices: [],
            price: 0,
            discount: '',
            design: 0,
            payCash: 0,
            payTransfer: 0,
            payOthers: 0,
            payDebit: 0,
            payCredit: 0,
            subTotal: 0,
            total: 0,
            totalSinFormato:0,           
            serviciosSelecionados:[],
            resto: 0,
            dates: {
                dateSale: new Date()
            },
            idProcess: '',
            docLender: '',
            newClient: {
                valid: false,
                text: 'Nuevo cliente'
            },
            newService: {
                valid: false,
                text: 'Nuevo servicio'
            },
            reloadSales: {
                valid: false,
                text: 'Reiniciar datos'
            },
            ifEdit: false, 
            inspectorDate: false,
            editClientId: ''
        }
    },
    created(){
        this.getClient()
        this.getLenders()
        this.getServices()
    }, 
    methods: {
        changeDate(){
            this.inspectorDate = true
        },
        selected(value){
            this.registerService.lenderSelecteds.push(value.selected_item._id)
            this.validRegister(1)
        },
        unSelected(value){
            for (let i = 0; i < this.registerService.lenderSelecteds.length; i++) {
                if (this.registerService.lenderSelecteds[i] == value.unselected_item._id) {
                    this.registerService.lenderSelecteds.splice(i, 1)
                    break
                }
            }
            this.validRegister(1)
        },
        selectedAll(value){
            for (let index = 0; index < value.selected_items.length; index++) {
                this.registerService.lenderSelecteds.push(value.selected_items[index]._id)
            }
            this.validRegister(1)
        },
        unSelectedAll(value){
            this.registerService.lenderSelecteds = []
            this.validRegister(1)
        },
        validRegister(valid){
            if (valid == 1) {
                this.registerService.valid = this.registerService.lenderSelecteds.length > 0 && this.registerService.serviceRegister != '' && this.registerService.priceRegister > 0 && this.registerService.timeRegister != 'Seleccione el tiempo' && this.registerService.comissionRegister != '' ? true : false
            }else if (valid == 2) {
                this.registerClient.valid = this.registerClient.name != '' && this.registerClient.id != '' ? true : false
            }else{
                this.cashFunds.valid = this.cashFunds.cashName != '' && this.cashFunds.cashAmount > 0 ? true : false
            }
        },
        registerFund(){
			axios.post(endPoint.endpointTarget+'/ventas/registerFund', {
				userRegister: this.cashFunds.cashName,
				amount: this.cashFunds.cashAmount
			}).then(res => {
				if (res.data.status == 'ok') {
					this.modals = {
                        modal1: true,
                        message: "Cliente registrado",
                        icon: 'ni ni-check-bold ni-5x',
                        type: 'success'
                    }
                    setTimeout(() => {
                        this.modals = {
                            modal1: false,
                            modal2: false,
                            modal3: false,
                            modal4: false,
                            message: "",
                            icon: '',
                            type: ''
                        }
                    }, 1500);
                    this.cashFunds.cashName = ''
                    this.cashFunds.cashAmount = ''
                    this.cashFunds.valid = false
				}
			})
        },
        editClient(){
            axios.put(endPoint.endpointTarget+'/clients/'+this.editClientId, {
                nombreClienteEditar: this.registerClient.name,
                identidadClienteEditar: this.registerClient.id,
                correoClienteEditar: this.registerClient.contactOne,
                instagramClienteEditar: this.registerClient.contactTwo,
            })
            .then(res => {
                console.log(res)
                if (res.data.status == 'Servicio actualizado') {
                    this.modals = {
                        modal1: true,
                        message: "el cliente editó con exito",
                        icon: 'ni ni-check-bold ni-5x',
                        type: 'success'
                    }
                    setTimeout(() => {
                        this.modals = {
                            modal1: false,
                            modal2: false,
                            modal3: false,
                            modal4: false,
                            message: "",
                            icon: '',
                            type:''
                        }
                        this.clientSelect = this.registerClient.name+ ' / '+this.registerClient.id
                        this.registerClient.name = ''
                        this.registerClient.id = ''
                        this.registerClient.contactOne = ''
                        this.registerClient.contactTwo = ''
                        this.ifEdit = false
                        this.newClient.text = "Nuevo cliente"
                        this.getClient()
                    }, 1500);
                }else{
                    this.modals = {
                        modal1: true,
                        message: "El cliente ya existe",
                        icon: 'ni ni-fat-remove ni-5x',
                        type: 'danger'
                    }
                    setTimeout(() => {
                        this.modals = {
                            modal1: false,
                            modal2: false,
                            modal3: false,
                            modal4: false,
                            message: "",
                            icon: '',
                            type: ''
                        }
                    }, 1500);
                }
            })
        },
        registerClients(){
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
                        modal1: true,
                        message: "Cliente registrado",
                        icon: 'ni ni-check-bold ni-5x',
                        type: 'success'
                    }
                    setTimeout(() => {
                        this.modals = {
                            modal1: false,
                            modal2: false,
                            modal3: false,
                            modal4: false,
                            message: "",
                            icon: '',
                            type: ''
                        }
                        this.getClient()
                    }, 1500);
                    registerClient = {
                        name: '',
                        id: '',
                        contactOne: '',
                        contactTwo: '',
                        discount: false,
                        recommender: '',
                        valid: false,
                    }
                    
                }else{
                    this.modals = {
                        modal1: true,
                        message: "El cliente ya existe",
                        icon: 'ni ni-fat-remove ni-5x',
                        type: 'danger'
                    }
                    setTimeout(() => {
                        this.modals = {
                            modal1: false,
                            modal2: false,
                            modal3: false,
                            modal4: false,
                            message: "",
                            icon: '',
                            type: ''
                        }
                    }, 1500);
                }
            })
        },
        mouseOverVenta(objectType){
            objectType.valid = true 
		},
		mouseLeaveVenta(objectType){
            objectType.valid = false
		},
        registerServiceProcess(){
            var ifCheck = this.registerService.addDiscount ? false : true
            axios.post(endPoint.endpointTarget+'/servicios', {
                nombreServicio: this.registerService.serviceRegister,
                precioServicio: this.registerService.priceRegister,
                comisionServicio: this.registerService.comissionRegister,
                tiempoServicio: this.registerService.timeRegister,
                prestadores: this.registerService.lenderSelecteds,
                descuento: ifCheck

            })
            .then(res => {
                if(res.data.status == 'Servicio creado'){
                    this.modals = {
                        modal1: true,
                        message: "Servicio registrado",
                        icon: 'ni ni-check-bold ni-5x',
                        type: 'success'
                    }
                    setTimeout(() => {
                        this.modals = {
                            modal1: false,
                            modal2: false,
                            modal3: false,
                            modal4: false,
                            message: "",
                            icon: '',
                            type: ''
                        }
                    }, 1500);
                    this.registerService = {
                        serviceRegister: '',
                        comissionRegister: '',
                        priceRegister: 0,
                        timeRegister: 'Seleccione el tiempo',
                        addDiscount: false,
                        lenderSelecteds: [],
                        lenders: [],
                        valid:false
                    }
                    this.getServices();
                    
                }else{
                    this.modals = {
                        modal1: true,
                        message: "El servicio ya existe",
                        icon: 'ni ni-fat-remove ni-5x',
                        type: 'danger'
                    }
                    setTimeout(() => {
                        this.modals = {
                            modal1: false,
                            modal2: false,
                            modal3: false,
                            modal4: false,
                            message: "",
                            icon: '',
                            type: ''
                        }
                    }, 1500);
                }
            })
		},
        getClient(){
            axios.get(endPoint.endpointTarget+'/clients')
            .then(res => {
                this.clientNames = []
                for (let index = 0; index < res.data.length; index++) {
                    
                    this.clientNames.push(res.data[index].nombre+ ' / ' +res.data[index].identidad)
                }
            })
        },
        getLenders(){
            axios.get(endPoint.endpointTarget+'/manicuristas')
            .then(res => {
                this.registerService.lenders = res.data
                for (let index = 0; index < res.data.length; index++) {
                    this.lenderNames.push(res.data[index].nombre)
                }
            })
        },
        getServices(){
            axios.get(endPoint.endpointTarget+'/servicios')
            .then(res => {
                this.services = res.data
                this.countServices = []
                for (let index = 0; index < this.services.length; index++) {
                    this.countServices.push({count: 0})
                }
            })
        },
        conteoServicio(_id, nombre, precio, comision, discount){
            const descuento = parseFloat(this.discount) / 100
			const porcentaje = 1 - parseFloat(descuento)
			const precioTotal = parseFloat(this.subTotal) + parseFloat(precio)  
			this.price = this.formatPrice(precioTotal)
			this.subTotal = precioTotal
			this.totalSinFormato = precioTotal
			
			if(this.discount === ''){
				this.total = this.formatPrice(precioTotal+ this.design)
			}else{
				this.total = this.formatPrice(precioTotal)
				for (let index = 0; index < this.serviciosSelecionados.length; index++) {
					if (!this.serviciosSelecionados[index].descuento) {
						const precioConDescuento = parseFloat(this.subTotal) * parseFloat(porcentaje) 
						this.total = this.formatPrice(precioConDescuento + this.design)
						this.totalSinFormato = precioConDescuento
					}
				}
			}
			const servicios = {'servicio': nombre, 'comision': comision, 'precio': precio, 'descuento': discount}
			this.serviciosSelecionados.push(servicios)
			axios.put(endPoint.endpointTarget+'/ventas/updateServicesMonth/' + nombre)
			.catch(err => {
				this.$swal({
					type: 'error',
					title: 'experimentamos problemas :(',
					showConfirmButton: false,
					timer: 1500
				})
			})
			axios.put(endPoint.endpointTarget+'/ventas/updateProviderMonth/' + this.lenderSelect)
			.catch(err => {
				console.log(err)
			})
        },
        borrarServicio(nombre, index, _id, precio, descuento){
            for (var i = 0; i < this.serviciosSelecionados.length; i++) {
				if (this.serviciosSelecionados[i].servicio == nombre ) {
					this.serviciosSelecionados.splice(i, 1)
					break
				}
            }
			if (this.countServices[index].count != 0) {
                this.countServices[index].count--
				const subTotal = parseFloat(this.subTotal) - parseFloat(precio) 
				this.price = this.formatPrice(subTotal)
				this.subTotal = subTotal
                this.totalSinFormato = subTotal
                this.total = this.formatPrice(subTotal+ this.design)
				if(this.discount == ""){
					// this.total = this.formatPrice(subTotal+ this.design)
				}else{
					this.descuentoFunc(false)
				}
				axios.put(endPoint.endpointTarget+'/ventas/updateServicesMonthDiscount/' + nombre)
				.catch(err => {
					console.log(err)
				})
				axios.put(endPoint.endpointTarget+'/ventas/updateProviderMonthDiscount/' + this.lenderSelect)
				.catch(err => {
					console.log(err)
                })
			}
        },
        addDesign(){
            if (this.design.length == 0) {
                this.totalSinFormato = parseFloat(this.totalSinFormato) - parseFloat(this.resto)
                this.total = "$" + this.formatPrice(this.totalSinFormato)
                this.resto = 0
            }
            else{
                this.totalSinFormato = parseFloat(this.totalSinFormato) - parseFloat(this.resto)
                this.totalSinFormato = parseFloat(this.totalSinFormato) + parseFloat(this.design)
                this.total = this.formatPrice(this.totalSinFormato)
                this.resto = this.design
            }
        },
        descuentoFunc(deletee){
            var discount = true 
			for (let index = 0; index < this.serviciosSelecionados.length; index++) {
				if (!this.serviciosSelecionados[index].descuento) {
					discount = false
					if(this.discount > 0){
						const descuento = parseFloat(this.discount) / 100
						const porcentaje = 1 - parseFloat(descuento)
						const precioConDescuento = parseFloat(this.subTotal) * parseFloat(porcentaje)  
						
						this.total = this.formatPrice(precioConDescuento+ this.design)
						this.totalSinFormato = precioConDescuento
					}
					if(this.discount == '' || this.discount == 0){
						if (this.design == '') {
							this.totalSinFormato = this.subTotal
							this.total = this.formatPrice(this.subTotal+ this.design)
						}
						else{
							this.totalSinFormato = this.subTotal
							this.total = this.formatPrice(this.totalSinFormato+ this.design)
						}
					}
					break
				}
			}
			if(discount && deletee){
				this.design = ''
				this.$swal({
					type: 'info',
					title: 'No se puede agregar a dichos servicios',
					showConfirmButton: false,
					timer: 1500
				})
			}
        },
        formatClass(value){
			if (value) {
				const split = value.split(' ')
				if (split[1]) {
					return split[0]+split[1]
				}else{
					return split[0]
				}
				
			}
        },
        formatPrice(value) {
            let val = (value/1).toFixed(2).replace('.', ',')
            return '$ '+val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        hundredMouseOver(tipo){
			$("."+tipo).toggle()
		},
		hundredMouseNonOver(tipo){
			$("."+tipo).toggle()
		},
        myFunction() {
			var input, filter, table, tr, td, i, txtValue;
			input = document.getElementById("myInput");
			filter = input.value.toUpperCase();
			table = document.getElementById("myTable");
			tr = table.getElementsByTagName("tr");
			for (i = 0; i < tr.length; i++) {
			td = tr[i].getElementsByTagName("td")[0];
			if (td) {
				txtValue = td.textContent || td.innerText;
				if (txtValue.toUpperCase().indexOf(filter) > -1) {
				tr[i].style.display = "";
				} else {
				tr[i].style.display = "none";
				}
			}
			}
        },
        hundredPorcent(tipo){
        
            if (tipo == "efectivo") {
                this.payCash = 0
                this.payTransfer = 0
                this.payOthers = 0
                this.payCredit = 0
                this.payDebit = 0
                this.payCash = this.totalSinFormato
            }
            if (tipo == "trasnferencia") {
                this.payCash = 0
                this.payTransfer = 0
                this.payOthers = 0
                this.payCredit = 0
                this.payDebit = 0
                this.payTransfer = this.totalSinFormato
            }
            if (tipo == "others") {
                this.payCash = 0
                this.payTransfer = 0
                this.payOthers = 0
                this.payCredit = 0
                this.payDebit = 0
                this.payOthers = this.totalSinFormato
            }
            if (tipo == "credit") {
                this.payCash = 0
                this.payTransfer = 0
                this.payOthers = 0
                this.payCredit = 0
                this.payDebit = 0
                this.payCredit = this.totalSinFormato
            }
            if (tipo == "debit") {
                this.payCash = 0
                this.payTransfer = 0
                this.payOthers = 0
                this.payCredit = 0
                this.payDebit = 0
                this.payDebit = this.totalSinFormato
            }
			
        },
        chooseLender(){
            if (this.lenderSelect != '') {
                axios.get(endPoint.endpointTarget+'/manicuristas/justone/' + this.lenderSelect)
                .then(res => {
                    this.docLender = res.data.documento
                    this.nombreManicurista = this.lenderSelect
                    
                    console.log(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
            }
        },
        chooseClient(){
            if (this.clientSelect) {
                const split = this.clientSelect.split(' / ')
                axios.get(endPoint.endpointTarget+'/clients/dataDiscount/' + split[1])
                .then(res => {
                    this.newClient.text = "Editar cliente"
                    this.ifEdit = true
                    console.log(res.data)
                    this.editClientId = res.data[0]._id
                    this.registerClient.name = res.data[0].nombre
                    this.registerClient.id = res.data[0].identidad
                    this.registerClient.contactOne = res.data[0].correoCliente
                    this.registerClient.contactTwo = res.data[0].instagramCliente
                    this.validRegister(2)
                    
                })
                .catch(err => {
                    console.log(err)
                })
            }else{
                this.newClient.text = "Nuevo cliente"
                this.ifEdit = false
                this.registerClient.name = ""
                this.registerClient.id = ""
                this.registerClient.contactOne = ""
                this.registerClient.contactTwo = ""
                this.validRegister(2)
            }
        },
        getDataToDate(id){
			this.servicesProcess = []
			this.serviciosSelecionados = []
			this.idProcess = id
			axios.get(endPoint.endpointTarget+'/citas/getDataToDate/'+id)
			.then(res => {
				this.clientSelect = res.data.client
				this.lenderSelect = res.data.employe
				this.servicesProcess = res.data.services
				this.chooseLender()
				const split = res.data.client.split('/')
				const splitTwo = split[1].split(' ')
				axios.get(endPoint.endpointTarget+'/clients/dataDiscount/'+splitTwo[1])
				.then(res => {
					if (res.data[0].participacion == 0) {
						this.discount = 10
					}else{
						this.discount = ''
					}
					axios.get(endPoint.endpointTarget+'/servicios')
					.then(res => {
						var subTotal = 0
						var desc = 0
						for (let index = 0; index < this.servicesProcess.length; index++) {
							this.serviciosSelecionados.push({servicio: this.servicesProcess[index].servicio, comision: this.servicesProcess[index].comision, precio: this.servicesProcess[index].precio, descuento: this.servicesProcess[index].descuento})
							let valSpan = ''
							let sumaVal = 0
							for (let indexTwo = 0; indexTwo < res.data.length; indexTwo++) {
								if (this.servicesProcess[index].servicio == res.data[indexTwo].nombre) {
									subTotal = subTotal + parseFloat(res.data[indexTwo].precio)
									let valSpan = $(`#${res.data[indexTwo]._id}`).text()
									let sumaVal = parseFloat(valSpan) + 1
									$(`#${res.data[indexTwo]._id}`).text(sumaVal)
								}
							}
						}
						this.price = this.formatPrice(subTotal)
						if (this.discount == 10) {
							desc = subTotal * 0.90
						}else{
							desc = subTotal
						}
						this.total = this.formatPrice(desc)
						this.totalSinFormato = desc
						this.subTotal = subTotal
					})
				})
			})
		},
        initialState(){
            this.getServices()
			this.price = '0';
			this.serviciosSelecionados = [];
			this.discount = "";
			this.total = 0;
			this.totalSinFormato = 0;
			this.design = 0
			this.payCash = 0
			this.payOthers = 0
			this.payDebit = 0
			this.payCredit = 0
			this.payTransfer = 0
			this.lenderSelect = ''
			this.clientSelect = null
			this.resto  = 0
			this.subTotal = 0
			this.inspector = false
		},
        processSale() {
			if (this.payCash == '') {
				this.payCash = 0
			}
			if (this.payOthers == '') {
				this.payOthers = 0
			}
			if (this.payTransfer == '') {
				this.payTransfer = 0
			}
			if (this.payDebit == '') {
				this.payDebit = 0
			}
			if (this.payCredit == '') {
				this.payCredit = 0
			}
			if (this.discount == '') {
				this.discount = 0
			}
			if (this.design == '') {
				this.design = 0
            }
            
			const totalFormadePago = parseFloat(this.payCash) + parseFloat(this.payOthers) + parseFloat(this.payTransfer) + parseFloat(this.payDebit) + parseFloat(this.payCredit)
            console.log(this.docLender)
			if (this.clientSelect && this.lenderSelect != '') {
				if (this.totalSinFormato == totalFormadePago ) {
					axios.post(endPoint.endpointTarget+'/ventas/procesar', {
						cliente: this.clientSelect,
						manicurista: this.lenderSelect,
						servicios: this.serviciosSelecionados,
						pagoEfectivo:this.payCash,
						pagoOtros:this.payOthers,
						pagoRedCDebito:this.payDebit,
						pagoRedCCredito:this.payCredit,
						pagoTransf:this.payTransfer,
                        descuento:this.discount,
                        processDate: this.inspectorDate,
						fecha:this.dates.dateSale,
						total: this.totalSinFormato,
						ifProcess: this.idProcess,
						diseno: this.design,
						totalSinDesign: this.subTotal,
						documentoManicurista: this.docLender
					})
					.then(res => {
						
						if (res.data.status == "Venta registrada") {
                            this.modals = {
                                modal1: true,
                                message: "Venta procesada",
                                icon: 'ni ni-check-bold ni-5x',
                                type: 'success'
                            }
                            setTimeout(() => {
                                this.modals = {
                                    modal1: false,
                                    modal2: false,
                                    modal3: false,
                                    modal4: false,
                                    message: "",
                                    icon: '',
                                    type: ''
                                }
                            }, 1500);
							this.servicios =''
							this.initialState()
							EventBus.$emit('reloadDates', 'process')
							EventBus.$emit('reloadSales', 'process')
						}else if(res.data.status == "no-cash"){
							this.modals = {
                                modal1: true,
                                message: "Primero debe registrar un fondo de caja",
                                icon: 'ni ni-fat-remove ni-5x',
                                type: 'danger'
                            }
                            setTimeout(() => {
                                this.modals = {
                                    modal1: false,
                                    modal2: false,
                                    modal3: false,
                                    modal4: true,
                                    message: "",
                                    icon: '',
                                    type: ''
                                }
                            }, 1500);
						}
					}).catch(err => {
						this.$swal({
							type: 'error',
							title: 'experimentamos problemas :(',
							showConfirmButton: false,
							timer: 1500
						})
					})
				}else{
                    this.modals = {
                        modal1: true,
                        message: "Total no coincide, con los montos en medios de pago",
                        icon: 'ni ni-fat-remove ni-5x',
                        type: 'danger'
                    }
                    setTimeout(() => {
                        this.modals = {
                            modal1: false,
                            modal2: false,
                            modal3: false,
                            modal4: false,
                            message: "",
                            icon: '',
                            type: ''
                        }
                    }, 1500);
					if (this.pagoEfectivo == 0) {
						this.pagoEfectivo = ''
					}
					if (this.pagoTransf == 0) {
						this.pagoTransf = ''
					}
					if (this.pagoOtros == 0) {
						this.pagoOtros = ''
					}
					if (this.pagoRedC == 0) {
						this.pagoRedC = ''
					}
					if (this.pagoTransf == 0) {
						this.pagoTransf = ''
					}
				}	
			}else{
                this.modals = {
                    modal1: true,
                    message: "Complete los datos necesarios",
                    icon: 'ni ni-fat-remove ni-5x',
                    type: 'danger'
                }
                setTimeout(() => {
                    this.modals = {
                        modal1: false,
                        modal2: false,
                        modal3: false,
                        modal4: false,
                        message: "",
                        icon: '',
                        type: ''
                    }
                }, 1500);
			}
        },
    },
    mounted (){
        EventBus.$on('reloadServices', status => {
            this.getServices()
        })
        EventBus.$on('reloadLenders', status => {
            this.getLenders()
        })
        EventBus.$on('reloadClients', status => {
            this.getClient()
        })
        EventBus.$on('processDate', status => {
            this.initialState()
            this.getDataToDate(status)
        })
        
    }
}
</script>
<style >
    .inputFilter{
        padding: 5px;
        border:1px solid #cad1d7;
        border-radius:0.375rem;
        font-weight: 400;
        line-height: 1.5;
        color: #8898aa;
        font-size: 0.675rem;
    }
    .table thead tr th{
        padding-bottom: 5px;
        padding-top: 5px;
        padding-left: 15px !important;
    }
    .table thead tr th .form-group{
        margin-bottom: 0;
    }
    .ListaProcesar{
        overflow:hidden;
		overflow-x: hidden;
		overflow-y:hidden;
		max-height: 220px;
		height:170px;
    }
    .align .form-control{
        text-align:center;
    }
    .shadowTop{
		-webkit-box-shadow: 0px -16px 21px -10px rgba(0,0,0,0.75);
		-moz-box-shadow: 0px -16px 21px -10px rgba(0,0,0,0.75);
		box-shadow: 0px -16px 21px -10px rgba(0,0,0,0.75);
    }
    .hundred{
        cursor: pointer;
        transition: all 0.5s ease-out;
    }
    .hundred:hover{
        background-color: rgba(31, 86, 115, 0.342);
        color: white !important;
        border-radius: 5px;
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
    .menuVerVentas{
	transition: all 0.3s ease-out;
	overflow: hidden;
}
.navSVenta{
	cursor: pointer;
	width:7%;
	top:3.5%;
	right:-7%;
	background-color: white;
	position: absolute;
	border-radius: 0 5px 5px 0;
}
.menuVerServi{
	transition: all 0.3s ease-out;
	overflow: hidden;
}
.navSServi{
	cursor: pointer;
	width:7%;
	top:9.5%;
	right:-7%;
	background-color: white;
	position: absolute;
	border-radius: 0 5px 5px 0;
}
.menuVerRedo{
	transition: all 0.3s ease-out;
	overflow: hidden;
}
.navSRedo{
	cursor: pointer;
	width:7%;
	top:15.5%;
	right:-7%;
	background-color: white;
	position: absolute;
	border-radius: 0 5px 5px 0;
}
.menuVerVentas:hover{
	width: 30%;
	right:-30%;
	z-index:2;
}
.menuVerServi:hover{
	width: 30%;
	right:-30%;
	z-index:2;
}
.menuVerRedo:hover{
	width: 30%;
	right:-30%;
	z-index:2;
}
 

</style>
