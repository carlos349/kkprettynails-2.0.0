<template>
    <a-spin size="large" :spinning="spinning">
        <div class="row spin-content">
            <div class="col-8 mb-3 separatorLeft">
                <label for="Client">Cliente</label><br>
                <a-select
                    show-search
                    placeholder="Seleccione el cliente"
                    option-filter-prop="children"
                    style="width: 40%"
                    :filter-option="filterOption"
                    :allowClear="true"
                    class="mb-2 "
                    @change="chooseClient">
                    <a-select-option v-for="client of clients" :key="client._id" :value="client._id">
                        {{client.firstName}} / {{client.email}}
                    </a-select-option>
                </a-select>
                <div class="card-container">
                    <a-tabs type="card">
                        <a-tab-pane key="1">
                            <span slot="tab">
                                <a-icon type="plus-circle" style="vertical-align: 1.5px;" />
                                Servicios
                            </span>
                            <div class="row">
                                <div class="col-md-6">
                                    <label for="service">Servicio</label>
                                    <a-select
                                        show-search
                                        placeholder="Seleccione el servicio"
                                        option-filter-prop="children"
                                        :filter-option="filterOption"
                                        :allowClear="true"
                                        class="mb-2 pt-1 w-100"
                                        @change="chooseService">
                                        <a-select-option v-for="service of services" :key="service._id" :value="service._id">
                                            {{service.name}}
                                        </a-select-option>
                                    </a-select>
                                </div>
                                <div class="col-md-6">
                                    <label for="employe">Empleado</label>
                                    <a-select
                                        show-search
                                        placeholder="Seleccione el empleado"
                                        option-filter-prop="children"
                                        :filter-option="filterOption"
                                        :allowClear="true"
                                        class="mb-2 pt-1 w-100"
                                        @change="chooseEmploye">
                                        <a-select-option v-for="employe of registerService.lenders" :key="employe._id" :value="employe._id">
                                            {{employe.firstName}} {{employe.lastName}}
                                        </a-select-option>
                                    </a-select>
                                </div>
                                <div class="col-md-6">
                                    <label for="Client" class="mb-3">Precio</label>
                                    <currency-input
                                        v-on:change="validRegister(1)"
                                        v-model="priceService"
                                        locale="de"
                                        class="form-control w-100 mb-3"
                                        style="margin-top:-10px;"
                                    />
                                </div>
                                <div class="col-md-6">
                                    <label for="Client" style="margin-bottom:6px">Descuento</label>
                                    <base-input alternative
                                        type="number"
                                        v-model="discountService"
                                        placeholder="Descuento"
                                        addon-right-icon="fa fa-percent"
                                        @keyup="addDiscountFunc"
                                        :disabled="discountServiceIf"
                                        class="w-100">
                                    </base-input>
                                </div>
                                <div class="col-md-6" style="margin-top:-10px;">
                                    <label for="Client" class="w-50">Adicionales</label><br>
                                    <a-select
                                        show-search
                                        placeholder="Seleccione un adicional"
                                        option-filter-prop="children"
                                        :filter-option="filterOption"
                                        v-model="microSelect.name"
                                        :allowClear="true"
                                        class="mb-2 pt-1 w-50"
                                        @change="chooseAditional">
                                        <a-select-option v-for="micro of microservices" :key="micro.microService" :value="micro.microService+'/'+micro.price">
                                            {{micro.microService}}
                                        </a-select-option>
                                    </a-select>
                                    <currency-input
                                        v-model="microSelect.price"
                                        locale="de"
                                        class="ant-input w-25 ml-1 mt-1"
                                    />
                                    <a-button @click="addAdditional" class="ml-3" type="primary" shape="round">
                                        <a-icon type="plus" style="vertical-align: 1.5px;"/>
                                    </a-button>
                                </div>
                                <div class="col-md-6">
                                    <label for="Micros" style="margin-top:-20px;">Adicionales seleccionados</label><br>
                                    <template v-if="microserviceSelecteds.length > 0">
                                        <badge class="ml-2" v-for="micros of microserviceSelecteds" :key="micros.id" type="default">{{micros.name}}</badge>
                                    </template>
                                    <template v-else>
                                        <badge type="default">Ninguno seleccionado</badge>
                                    </template>
                                </div>
                            </div>
                            <base-button class="float-right" size="sm" type="primary">agregar item</base-button>
                        </a-tab-pane>
                        <a-tab-pane key="2">
                            <span slot="tab">
                                <a-icon type="shopping" style="vertical-align: 1.5px;"/>
                                Productos
                            </span>
                            <p>Content of Tab Pane 2</p>
                            <p>Content of Tab Pane 2</p>
                            <p>Content of Tab Pane 2</p>
                        </a-tab-pane>
                        <a-tab-pane key="3">
                            <span slot="tab">
                                <a-icon type="schedule" style="vertical-align: 1.5px;"/>
                                Por procesar
                            </span>
                            <p>Content of Tab Pane 3</p>
                            <p>Content of Tab Pane 3</p>
                            <p>Content of Tab Pane 3</p>
                        </a-tab-pane>
                    </a-tabs>
                </div>
            </div>
            <div class="col-4">
                <h3>Monto: 12.000</h3>
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
                        <h1>Datos del cliente</h1> 
                    </div>
                </template>
                <template>
                    <form role="form">
                            <base-input alternative
                                class="mb-3"
                                placeholder="Nombre"
                                v-model="registerClient.firstName"
                                v-on:keyup="validRegister(2)"
                                addon-left-icon="ni ni-single-02">
                            </base-input>
                            <base-input alternative
                                class="mb-3"
                                placeholder="Nombre"
                                v-model="registerClient.lastName"
                                v-on:keyup="validRegister(2)"
                                addon-left-icon="ni ni-single-02">
                            </base-input>
                            <base-input alternative
                                type="text"
                                placeholder="Correo"
                                v-model="registerClient.email"
                                v-on:keyup="validRegister(2)"
                                addon-left-icon="fa fa-address-card">
                            </base-input>
                            <div class="row">
                                <div class="col-md-3">
                                    <base-input alternative
                                        type="text"
                                        value="+56"
                                        readonly="true">
                                    </base-input>
                                </div>
                                <div class="col-md-9">
                                    <base-input alternative
                                        type="text"
                                        placeholder="Teléfono"
                                        v-on:input="formatPhone"
                                        maxlength="9"
                                        v-model="registerClient.phone"
                                        addon-left-icon="fa fa-address-card">
                                    </base-input>
                                </div>
                            </div>
                            <base-input alternative
                                type="text"
                                placeholder="Instagram"
                                v-model="registerClient.instagram"
                                addon-left-icon="fa fa-address-card">
                            </base-input>
                            <base-input v-if="!ifEdit" addon-left-icon="ni ni-calendar-grid-58">
                                <flat-picker 
                                        slot-scope="{focus, blur}"
                                        @on-open="focus"
                                        @on-close="blur"
                                        :config="configDate"
                                        class="form-control datepicker"
                                        placeholder="Seleccione una fecha"
                                        v-model="registerClient.birthday">
                                </flat-picker>
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
                    <div style="margin-top:-15%" class="text-muted text-center mb-3">
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
                            <div  class="row mx-auto mt-2">
                                <h3 class="w-100 text-center">¿Aplica descuento?</h3>
                                <base-radio name="false" inline class="mb-3 mx-auto" v-model="registerService.addDiscount"> <b>Si</b> </base-radio>
                                <base-radio name="true" inline class="mb-3 mx-auto" v-model="registerService.addDiscount"> <b>No</b> </base-radio> 
                            </div>
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
            <modal :show.sync="modals.modal5"
                body-classes="p-0"
                modal-classes="modal-dialog-centered modal-md">
                <h6 slot="header" class="modal-title p-0 m-0" id="modal-title-default"></h6>
                <card type="secondary" shadow
                    header-classes="bg-white pb-5"
                    body-classes="px-lg-5 "
                    class="border-0">
                    <template>
                        <div style="margin-top:-10%" class="text-muted text-center mb-3">
                            <h3>Validación de código</h3>
                        </div>
                    </template>
                    <template>
                        <form role="form">
                            <base-input 
                                alternative
                                class="mb-3"
                                placeholder="Código"
                                v-model="codeArticulo"
                                addon-left-icon="ni ni-key-25">
                            </base-input>
                            
                            
                            <base-button type="default" v-on:click="validCode()">
                                Verificar
                            </base-button> 
                        </form>
                </template>
                </card>
            </modal>
            <modal :show.sync="modals.modal6"
                body-classes="p-0"
                modal-classes="modal-dialog-centered modal-md">
                <card type="secondary" shadow
                    header-classes="bg-white pb-5"
                    body-classes="px-lg-5 py-lg-5"
                    class="border-0">
                    <template>
                        <div class="col-sm-12">
                            <base-button class="col-12  p-2 mt-1" type="secondary">
                                <span class="text-center"> Comprador <br> </span>
                                <badge style="font-size:0.8em !important" type="success" class="text-default mt-2">{{compradorArticulo}}</badge>
                            </base-button>
                            <base-button class="col-12  p-2 mt-1" type="secondary">
                                <span class="text-center"> Medio de pago <br> </span>
                                <badge style="font-size:0.8em !important" type="success" class="text-default mt-2">{{medioPagoArticulo}}</badge>
                            </base-button>
                            <base-button class="col-12  p-2 mt-1" type="secondary">
                                <span class="text-center"> Articulo <br> </span>
                                <badge style="font-size:0.8em !important" type="success" class="text-default mt-2">{{articulo}}</badge>
                            </base-button>
                            <base-button class="col-12  p-2 mt-1" type="secondary">
                                <span class="text-center"> Monto del pedido <br> </span>
                                <badge style="font-size:0.8em !important" type="success" class="text-default mt-2">{{totalArticulo}}</badge>
                            </base-button>
                            <base-button class="col-12  p-2 mt-1" type="secondary">
                                <span class="text-center"> Estado <br> </span>
                                <badge v-if="estadoArticulo == 'Nconfirmado'" style="font-size:0.8em !important" type="danger" class="text-default mt-2">Sin confirmar</badge>
                                <badge v-else-if="estadoArticulo == 'confirmado'" style="font-size:0.8em !important" type="success" class="text-default mt-2">confirmado</badge>
                                <badge v-else style="font-size:0.8em !important" type="default" class="text-default mt-2">Usado</badge>
                            </base-button>
                        </div>
                        <center>
                            <base-button v-if="estadoArticulo == 'confirmado'" type="success" class="mt-5" v-on:click="verifyCode()">
                                Validar
                            </base-button>
                            <base-button v-else type="default" disabled class="mt-5">
                                Validar
                            </base-button> 
                        </center>
                    </template>
                </card>
            </modal>
            <!-- <div v-if="validRoute('procesar', 'nuevo_cliente')" v-bind:style="{  'height': '45px', 'z-index' : '1000' }" v-on:click="modals.modal2 = true" class="p-2 menuVerVentas navSVenta" v-on:mouseenter="mouseOverVenta(newClient)" v-on:mouseleave="mouseLeaveVenta(newClient)">
                <div class="row">
                    <div class="col-2 pt-1">
                        <font-awesome-icon v-if="ifEdit" class="icons" style="color:#172b4d;font-size:1em" icon="user-edit" />
                        <font-awesome-icon v-else class="icons" style="color:#172b4d;font-size:1em" icon="user-plus" />
                    </div>
                    <div v-if="newClient.valid" class="col-9 pl-4 pt-1">
                        <b style="font-size:14px;">{{newClient.text}}</b>	
                    </div>
                </div>	
            </div>
            <div v-else v-bind:style="{  'height': '45px', 'z-index' : '1000' }" class="p-2 navSVenta">
                <div class="row">
                    <div class="col-2 pt-1">
                        <font-awesome-icon v-if="ifEdit" class="icons" style="color:#f5365c;font-size:1em" icon="user-edit" />
                        <font-awesome-icon v-else class="icons" style="color:#f5365c;font-size:1em" icon="user-plus" />
                    </div>
                    <div v-if="newClient.valid" class="col-9 pl-4 pt-1">
                        <b style="font-size:14px;">{{newClient.text}}</b>	
                    </div>
                </div>	
            </div>
            <div v-if="validRoute('procesar', 'nuevo_servicio')" v-bind:style="{  'height': '45px', 'z-index' : '1000' }" v-on:click="modals.modal3 = true" class="p-2 menuVerServi navSServi" v-on:mouseenter="mouseOverVenta(newService)" v-on:mouseleave="mouseLeaveVenta(newService)">
                <div class="row">
                    <div class="col-2 pt-1">
                        <font-awesome-icon class="icons" style="color:#172b4d;font-size:1em" icon="folder-plus" />
                    </div>
                    <div v-if="newService.valid" class="col-9 pl-4 pt-1">
                        <b style="font-size:14px;">{{newService.text}}</b>	
                    </div>
                </div>
            </div>
            <div v-else v-bind:style="{  'height': '45px', 'z-index' : '1000' }" class="p-2 navSServi">
                <div class="row">
                    <div class="col-2 pt-1">
                        <font-awesome-icon class="icons" style="color:#f5365c;font-size:1em" icon="folder-plus" />
                    </div>
                    <div v-if="newService.valid" class="col-9 pl-4 pt-1">
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
            <div v-bind:style="{  'height': '42px', 'z-index' : '1000' }" v-on:click="modals.modal5 = true, codeArticulo = ''" class="p-2 menuVerRedo navSCode" v-on:mouseenter="mouseOverVenta(reloadSales)" v-on:mouseleave="mouseLeaveVenta(reloadSales)">
                <div class="row">
                    <div class="col-2 pt-1">
                        <font-awesome-icon class="icons" style="color:#172b4d;font-size:1em" icon="pager" />
                    </div>
                    <div v-if="reloadSales.valid" class="col-10 pl-4 pt-1">
                        <b style="font-size:14px;">Validar código</b>	
                    </div>
                </div>
            </div> -->
        </div>
    </a-spin>
</template>
<script>
import axios from 'axios'
import router from '../router'
import endPoint from '../../config-endpoint/endpoint.js'
import jwtDecode from 'jwt-decode'
import io from 'socket.io-client';
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
            socket: io(endPoint.endpointTarget),
            auth: [],
            validator:true,
            validatorBtn:true,
            spinning:false,
            modals: {
                modal1: false,
                modal2: false,
                modal3: false,
                modal4: false,
                modal5: false,
                modal6: false,
                message: "",
                icon: '',
                type:''
            },
            priceService: 0,
            priceServiceReal: 0,
            discountService: '',
            discountServiceIf: false,
            typesPay: [],
            configHeader: {
                headers: {
                    "x-database-connect": endPoint.database, 
                    "x-access-token": localStorage.userToken
                }
            },
            configDate: {
                allowInput: true, 
                dateFormat: 'd-m-Y',
            },
            registerClient: {
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                instagram: '',
                birthday: '',
                discount: false,
                recommender: '',
                valid: false,
            },
            articulo:'',
            compradorArticulo:'',
            medioPagoArticulo:'',
            estadoArticulo:'',
            idArticulo:'',
            codeArticulo:'',
            totalArticulo:'',
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
                name: "firstName",
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
            clientIds: [],
            clients: [],
            clientSelect: null,
            lenderNames: [],
            lenderSelect: null,
            services: [],
            inspector: false,
            countServices: [],
            price: 0,
            discount: '',
            design: 0,
            payOrder:0,
            haveCode:false,
            subTotal: 0,
            total: 0,
            discountSelect: "Descuento",
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
            editClientId: '',
            ifrecomend: false,
            branchName: '',
            branch: '',
            microservices: [],
            microSelect: {
                name: '',
                price: 0
            },
            quantityMicro: 1,
            microserviceSelecteds: [],
            serviceSelecteds: [],
            serviceData: null
        }
    },
    created(){
        this.getToken()
        this.getBranch()
        setTimeout(() => {
            $('.anticon-close-circle').click()
        }, 1000);
    },
    methods: {
        getToken(){
            const token = localStorage.userToken
            const decoded = jwtDecode(token)  
            this.auth = decoded.access
        },
        changeDate(){
            this.inspectorDate = true
        },
        selected(value){
            this.registerService.lenderSelecteds.push(value.selected_item._id)
            this.validRegister(1)
        },
        async getTypesPay(){
            try {
                const pays = await axios.get(endPoint.endpointTarget+'/configurations/'+this.branch, this.configHeader)
                if (pays.data.status == 'ok') {
                    
                    for (let i = 0; i < pays.data.data.typesPay.length; i++) {
                        const element = pays.data.data.typesPay[i];
                        this.typesPay.push({
                            type: element,
                            total: 0
                        })
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
        getBranch(){
            this.branchName = localStorage.branchName  
            this.branch = localStorage.branch
            this.getClient()
            this.getLenders()
            this.getServices()
            this.getTypesPay()
            this.getMicroservices()
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
                if (this.registerClient.firstName != '' && this.registerClient.lastName != '' && this.registerClient.email != '') {
                    if (this.registerClient.email.split('@').length == 2) {
                        if (this.registerClient.email.split('@')[1].split('.').length == 2) {
                            this.registerClient.valid = true
                        }else{
                            this.registerClient.valid = false
                        }
                    }else{
                        this.registerClient.valid = false
                    }
                }else{
                    this.registerClient.valid = false
                }
            }else{
                this.cashFunds.valid = this.cashFunds.cashName != '' && this.cashFunds.cashAmount > 0 ? true : false
            }
        },
        formatPhone(){
            var number = this.registerClient.contactOne.replace(/[^\d]/g, '')
            if (number.length == 9) {
                number = number.replace(/(\d{1})(\d{4})/, "$1-$2-");
            } else if (number.length == 10) {
                number = number.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
            }
            this.registerClient.contactOne = number
        },
        registerFund(){
			axios.post(endPoint.endpointTarget+'/sales/registerFund', {
				userRegister: this.cashFunds.cashName,
				amount: this.cashFunds.cashAmount,
                branch: this.branch
			}, this.configHeader).then(res => {
				if (res.data.status == 'ok') {
                    this.$swal({
                        icon: 'success',
                        title: 'Monto de caja registrado.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.cashFunds.cashName = ''
                    this.cashFunds.cashAmount = ''
                    this.cashFunds.valid = false
				}
			})
        },
        editClient(){
            const phone = this.registerClient.phone.length > 0 ? '+56 '+this.registerClient.phone : ''
            axios.put(endPoint.endpointTarget+'/clients/'+this.editClientId, {
                firstName: this.registerClient.firstName,
                lastName: this.registerClient.lastName,
                email: this.registerClient.email,
                phone: phone,
                instagram: this.registerClient.instagram
            }, this.configHeader)
            .then(res => {
                if (res.data.status == 'update client') {
                    this.$swal({
                        icon: 'success',
                        title: 'El cliente se editó con éxito.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.getClient()
                }else{
                    this.$swal({
                        icon: 'error',
                        title: 'El cliente ya existe.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
        },
        registerClients(){
            var date = this.registerClient.birthday
            if (this.registerClient.birthday.split('-')[1]) {
                var split = this.registerClient.birthday.split('-')
                date = split[1]+'-'+split[0]+'-'+split[2]
            }
            if (this.registerClient.recommender != '') {
                for (let i = 0; i < this.clientIds.length; i++) {
                    const spId = this.clientIds[i].split("-")
                    if (spId[0] == this.registerClient.recommender) {
                        idRecomender = spId[1]
                    } 
                }
            }
            var ifCheck = this.registerClient.discount ? 0 : 1
            const phone = this.registerClient.phone.length > 0 ? '+56 '+this.registerClient.phone : ''
            axios.post(endPoint.endpointTarget+'/clients', {
                firstName: this.registerClient.firstName,
                lastName: this.registerClients.lastName,
                email: this.registerClient.email,
                recommender: this.registerClient.recommender,
                idRecommender: idRecomender,
                phone: phone,
                birthday: date,
                instagram: this.registerClient.instagram,
                ifCheck: ifCheck
            })
            .then(res => {
                if (res.data.status == 'client create') {
                    this.$swal({
                        icon: 'success',
                        title: 'Cliente registrado.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.getClient()
                    this.registerClient = {
                        name: '',
                        id: '',
                        contactOne: '',
                        contactTwo: '',
                        discount: false,
                        recommender: '',
                        valid: false,
                    }
                }else{
                    this.$swal({
                        icon: 'error',
                        title: 'El cliente ya existe.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
        },
        mouseOverVenta(objectType){
            setTimeout(() => {
               objectType.valid = true 
            }, 500);
             
		},
		mouseLeaveVenta(objectType){
            objectType.valid = false
		},
        registerServiceProcess(){
            var ifCheck = this.registerService.addDiscount ? false : true
            axios.post(endPoint.endpointTarget+'/services', {
                branch: this.branch,
                name: this.registerService.serviceRegister,
                price: this.registerService.priceRegister,
                commission: this.registerService.comissionRegister,
                duration: this.registerService.timeRegister,
                employes: this.registerService.lenderSelecteds,
                descuento: ifCheck,
                products: []
            }, this.configHeader)
            .then(res => {
                if(res.data.status == 'ok'){
                    this.$swal({
                        icon: 'success',
                        title: 'Servicio registrado.',
                        showConfirmButton: false,
                        timer: 1500
                    })
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
                    this.$swal({
                        icon: 'error',
                        title: 'El servicio ya existe.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
		},
        async getClient(){
            try {
                const getClient = await axios.get(endPoint.endpointTarget+'/clients', this.configHeader)
                if (getClient.data.status == 'ok') {
                    this.clients = getClient.data.data
                    this.clientNames = []
                    for (let index = 0; index < getClient.data.data.length; index++) {
                        this.clientNames.push(getClient.data.data[index].firstName+ ' / ' +getClient.data.data[index].email)
                        this.clientIds.push(getClient.data.data[index].firstName + " / " + getClient.data.data[index].email + "-" + getClient.data.data[index]._id)
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
        async getLenders(){
            try {
                const employes = await axios.get(endPoint.endpointTarget+'/employes/employesbybranch/'+this.branch, this.configHeader)
                if (employes.data.status == 'ok') {
                    this.registerService.lenders = employes.data.data
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
        async getServices(){
            try {
                const services = await axios.get(endPoint.endpointTarget+'/services/'+this.branch, this.configHeader)
                if (services.data.status == 'ok') {
                    this.services = services.data.data
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
        addService(name, price, commission, discount, items){
            console.log(name, price, commission, discount, items)
            const descuento = parseFloat(this.discount) / 100
			const porcentaje = 1 - parseFloat(descuento)
            const priceTotal = parseFloat(this.subTotal) + parseFloat(price)
            const totalWithoutFormat = parseFloat(this.totalSinFormato) + parseFloat(price)
			this.price = this.formatPrice(priceTotal)
			this.subTotal = priceTotal
			console.log(this.price)
			
			if(this.discount == '' || discount == true){
                this.total = this.formatPrice(totalWithoutFormat)
                this.totalSinFormato = totalWithoutFormat
            }
            else{
                const priceConDescuento = parseFloat(price) * parseFloat(porcentaje)
                const totalConDescuento = parseFloat(this.totalSinFormato) + parseFloat(priceConDescuento) 
                this.total =  this.formatPrice(totalConDescuento)
                this.totalSinFormato = totalConDescuento
			}
			const servicios = {'service': name, 'commission': commission, 'price': price, 'discount': discount, 'products': items}
			this.serviciosSelecionados.push(servicios)
        },
        removeService(name, index, _id, price, descuento){
            for (var i = 0; i < this.serviciosSelecionados.length; i++) {
				if (this.serviciosSelecionados[i].service == name ) {
					this.serviciosSelecionados.splice(i, 1)
					break
				}
            }
			if (this.countServices[index].count != 0) {
                this.countServices[index].count--
				const subTotal = parseFloat(this.subTotal) - parseFloat(price) 
				this.price = this.formatPrice(subTotal)
                this.subTotal = subTotal
                if (descuento == true || this.discount == '') {
                    this.totalSinFormato = this.totalSinFormato - price
                    this.total = this.formatPrice(this.totalSinFormato)
                }
                else{
                    const descuento = parseFloat(this.discount) / 100
                    const porcentaje = 1 - parseFloat(descuento)
                    const priceConDescuento = price * porcentaje
                    this.totalSinFormato = this.totalSinFormato - priceConDescuento
                    this.total = this.formatPrice(this.totalSinFormato)
                }
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
            if (this.discount > 0) {
                this.totalSinFormato = this.design
                this.total = this.design
                for (let index = 0; index < this.serviciosSelecionados.length; index++) {
                    if (!this.serviciosSelecionados[index].descuento) {
                            const descuento = parseFloat(this.discount) / 100
                            const porcentaje = 1 - parseFloat(descuento)
                            const precioConDescuento = parseFloat(this.serviciosSelecionados[index].precio) * parseFloat(porcentaje)  
                            const totalConDescuento = parseFloat(this.totalSinFormato) + parseFloat(precioConDescuento)
                            this.total = this.formatPrice(totalConDescuento)
                            this.totalSinFormato = totalConDescuento 
                    }
                    else{ 
                        this.total = this.formatPrice(parseFloat(this.totalSinFormato) + parseFloat(this.serviciosSelecionados[index].precio))
                        this.totalSinFormato = parseFloat(this.totalSinFormato) + parseFloat(this.serviciosSelecionados[index].precio)
                    }
                }
            }else{

                this.total = this.formatPrice(this.subTotal + this.design)
                this.totalSinFormato = this.subTotal + this.design
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
        myFunction() {
            console.log("hola")
			var input, filter, table, tr, td, i, txtValue;
			input = document.getElementById("myInputProccess");
			filter = input.value.toUpperCase();
			table = document.getElementById("myTableProcess");
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
        hundredPercent(index){
            this.typesPay.forEach(element => {
                element.total = 0
            });
            this.typesPay[index].total = parseFloat(this.totalSinFormato) - parseFloat(this.payOrder)
        },
        addDiscountFunc(){
            var discount = this.discountService < 10 ? '0'+this.discountService : this.discountService
            if (this.discountService != '') { 
                this.priceService = this.priceServiceReal - (this.priceServiceReal * parseFloat('0.'+discount))
            }else{
                this.priceService = this.priceServiceReal
            }
        },
        chooseAditional(value){
            this.microSelect = {
                name: value.split('/')[0],
                price: value.split('/')[1]
            }
        },
        addAdditional(){
            this.priceService = this.priceService + this.microSelect.price
            this.priceServiceReal = this.priceServiceReal + this.microSelect.price
            this.microserviceSelecteds.push({id: new Date().getTime(), name: this.microSelect.name, price: this.microSelect.price})
            this.microSelect.price = 0
            this.microSelect.name = 'Seleccione'
        },
        async chooseEmploye(value){
            try {
                const getEmploye = await axios.get(`${endPoint.endpointTarget}/employes/justonebyid/${value}`, this.configHeader) 
                console.log(getEmploye)
            }catch(err) {
                console.log(err)
            }
        },
        async getMicroservices(){
            try {
                const getMicro = await axios.get(`${endPoint.endpointTarget}/configurations/getMicroservice/${this.branch}`, this.configHeader) 
                this.microservices = getMicro.data.data
                console.log(getMicro)
            }catch(err) {
                console.log(err)
            }
        },
        async chooseService(value){
            if (value) {
                try {
                    const getService = await axios.get(`${endPoint.endpointTarget}/services/getServiceInfo/${value}`, this.configHeader)
                    console.log(getService)
                    this.serviceData = getService.data.data
                    this.priceService = getService.data.data.price
                    this.priceServiceReal = getService.data.data.price
                    this.discountServiceIf = getService.data.data.discount
                }catch(err){
                    console.log(err)
                }
            }else{
                this.serviceData = null
                this.priceService = 0
                this.priceServiceReal = 0
                this.discountServiceIf = false
            }
        },
        async chooseClient(value){
            this.discount = ''
            this.discountSelect = 'Descuento'
            this.ifrecomend = false
            console.log(value)
            this.clientSelect = value
            if (this.clientSelect) {
                try {
                    const getClient = await axios.get(`${endPoint.endpointTarget}/clients/findOne/${value}`, this.configHeader)
                    this.newClient.text = "Editar cliente"
                    this.ifEdit = true
                    this.editClientId = getClient.data.data._id
                    this.registerClient.firstName = getClient.data.data.firstName
                    this.registerClient.lastName = getClient.data.data.lastName
                    this.registerClient.email = getClient.data.data.email
                    this.registerClient.phone = getClient.data.data.phone.formatNational
                    this.registerClient.instagram = getClient.data.data.instagram
                    this.validRegister(2)
                    if(getClient.data.data.birthday){
                        var birthday = new Date(getClient.data.data.birthday).getMonth()
                        var monthNow = new Date().getMonth()
                        if (birthday == monthNow) {
                            this.discount = 10
                            this.discountSelect = 'Descuento por cumpleaños'
                        }else if (getClient.data.data.recommendations > 0) {
                            this.discount = 15
                            this.ifrecomend = true
                            this.discountSelect = 'Descuento por recomendacion'
                        }else if (getClient.data.data.attends == 0) {
                            this.discount = 10
                            this.discountSelect = 'Descuento por primera atención'
                        }
                    }else if (getClient.data.data.recommendations > 0) {
                        this.discount = 15
                        this.ifrecomend = true
                        this.discountSelect = 'Descuento por recomendacion'
                    }else if (getClient.data.data.attends == 0) {
                        this.discount = 10
                        this.discountSelect = 'Descuento por primera atención'
                    }
                    this.clientSelect = {
                        name: getClient.data.data.firstName,
                        email:getClient.data.data.email
                    }
                }catch(err){
                    console.log(err)
                }
            }else{
                this.newClient.text = "Nuevo cliente"
                this.ifEdit = false
                this.registerClient.firstName = ""
                this.registerClient.lastName = ""
                this.registerClient.email = ""
                this.registerClient.phone = ""
                this.registerClient.instagram = ""
                this.validRegister(2)
            }
            if (this.clientSelect != '' && this.lenderSelect != '') {
                this.validator = false
                this.validatorBtn = false
            }
            else{
                this.validator = true
                this.validatorBtn = true
            }
        },
        getDataToDate(id){
            this.initialState()
            this.validator = false
			this.servicesProcess = []
			this.serviciosSelecionados = []
			this.idProcess = id
			axios.get(endPoint.endpointTarget+'/citas/getDataToDate/'+id)
			.then(res => {
				this.clientSelect = res.data.client
				this.lenderSelect = res.data.employe
				this.servicesProcess = res.data.services
				this.chooseLenderByDataToDate(this.lenderSelect)
				const split = res.data.client.split('/')
				const splitTwo = split[1].split(' ')
				axios.get(endPoint.endpointTarget+'/clients/dataDiscount/'+splitTwo[1])
				.then(res => {
					if (res.data[0].recomendaciones > 0) {
                        this.discount = 15
                        this.ifrecomend = true
                    }else if (res.data[0].participacion == 0) {
                        this.discount = 10
                    }
                    var subTotal = 0
                    var desc = 0
                    for (let index = 0; index < this.servicesProcess.length; index++) {
                        this.serviciosSelecionados.push({servicio: this.servicesProcess[index].servicio, comision: this.servicesProcess[index].comision, precio: this.servicesProcess[index].precio, descuento: this.servicesProcess[index].descuento})
                        let valSpan = ''
                        let sumaVal = 0
                        for (let indexTwo = 0; indexTwo < this.services.length; indexTwo++) {
                            if (this.servicesProcess[index].servicio == this.services[indexTwo].nombre) {
                                subTotal = subTotal + parseFloat(this.services[indexTwo].precio)
                                this.countServices[indexTwo].count++
                            }
                        }
                    }
                    this.price = this.formatPrice(subTotal)
                    if (this.discount == 10) {
                        desc = subTotal * 0.90
                    }
                    else if (this.discount == 15) {
                        desc = subTotal * 0.85
                    }
                    else{
                        desc = subTotal
                    }
                    this.total = this.formatPrice(desc)
                    this.totalSinFormato = desc
                    this.subTotal = subTotal
                
				})
            })
		},
        initialState(){
            this.getServices()
            $('#myInput').val('')
            this.myFunction()
            this.validator = true
            this.validatorBtn = true
			this.price = '0';
			this.serviciosSelecionados = [];
			this.discount = "";
			this.total = 0;
			this.totalSinFormato = 0;
			this.design = 0
			this.typesPay.forEach(element => {
                element.total = 0
            });
            this.docLender = ''
			this.payTransfer = 0
			this.lenderSelect = null
			this.clientSelect = null
			this.resto  = 0
            this.subTotal = 0
            this.nombreManicurista = ''
            this.inspector = false
            this.ifEdit = false
            this.newClient.text = "Nuevo cliente"
            this.registerClient.name = ''
            this.registerClient.id = ''
            this.ifrecomend = false
            this.validRegister()
            this.haveCode = false
            $('.anticon-close-circle').click()
        },
        filterOption(input, option) {
            return (
                option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
            );
        },
        processSale() {
            
            this.spinning = true
            var totalPay = 0
            var payType = ''
			this.typesPay.forEach(element => {
                if (element.total == '') {
                    element.total = 0
                }
                totalPay = totalPay + element.total
                payType = element.total > 0 ? element.type : ''
            });
            if (this.clientSelect != null && this.lenderSelect != null) {
				if (Math.round(this.totalSinFormato) == Math.round(totalPay)) {
                    const itemList = []
                    for (let index = 0; index < this.serviciosSelecionados.length; index++) {
                        if (this.serviciosSelecionados[index].products) {
                            for (let i = 0; i < this.serviciosSelecionados[index].products.length; i++) {
                                itemList.push(this.serviciosSelecionados[index].products[i])
                            }
                        }
                        
                    }
                    axios.post(endPoint.endpointTarget+'/inventario/procesarVenta',{
                        array:itemList
                    })
                    .then(res => {})
					axios.post(endPoint.endpointTarget+'/sales/process', {
						client: this.clientSelect,
						employe: this.lenderSelect,
						services: this.serviciosSelecionados,
						typesPay: this.typesPay,
                        branch: this.branch,
                        payType: payType,
                        purchaseOrder: this.payOrder,
                        discount: this.discount,
                        processDate: this.inspectorDate,
						date: this.dates.dateSale,
						total: this.totalSinFormato,
						ifProcess: this.idProcess,
						design: this.design,
                        ifrecomend: this.ifrecomend
					}, this.configHeader)
					.then(res => {
                        console.log(res)
						if (res.data.status == "Sale register") {
                            this.$swal({
                                icon: 'success',
                                title: 'Venta procesada.',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            if (this.haveCode == true) {
                                axios.get(endPoint.endpointTarget+'/pedidos/useCode/'+this.idArticulo)
                                .then( res =>{})
                            }
                            this.haveCode = false
                            this.alertProducts()
							this.servicios =''
							this.initialState()
							EventBus.$emit('reloadDates', 'process')
                            EventBus.$emit('reloadSales', 'process')
                            this.spinning = false
						}else if(res.data.status == "no-cash"){
							this.$swal({
                                icon: 'info',
                                title: 'Primero debe registrar un fondo de caja.',
                                showConfirmButton: false,
                                timer: 2000
                            })
                            this.spinning = false
						}
					}).catch(err => {
						this.$swal({
							type: 'error',
							title: 'experimentamos problemas :(',
							showConfirmButton: false,
							timer: 1500
                        })
                        this.spinning = false
					})
				}else{
                    this.$swal({
                        icon: 'error',
                        title: 'Los montos no coinciden.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.spinning = false
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
                this.$swal({
                    icon: 'error',
                    title: 'Complete los datos necesarios.',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.spinning = false
			}
        },
        alertProducts(){
            axios.get(endPoint.endpointTarget+'/inventario/alertProducts')
            .then(res => {
                if (res.data.status) {
                    var Detail = ''
                    if (res.data.productsToAlert.length == 1) {
                        Detail = 'Hace falta reintegrar el producto: '
                    }else{
                        Detail = 'Hace falta reintegrar los productos: '
                    }
                    for (let index = 0; index < res.data.productsToAlert.length; index++) {
                        const element = res.data.productsToAlert[index];
                        if (index == 0) {
                            Detail = Detail + element.nameProduct
                        }else{
                            Detail = Detail + ', ' + element.nameProduct
                        } 
                    } 
                    axios.post(endPoint.endpointTarget+'/notifications', {
                        userName:localStorage.getItem('nombre') + " " + localStorage.getItem('apellido'),
                        userImage:localStorage.getItem('imageUser'),
                        detail: Detail,
                        link: 'Inventario'
                    })
                    .then(res => {
                        this.socket.emit('sendNotification', res.data)
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
        validCode(){
            axios.get(endPoint.endpointTarget+'/pedidos/validCode/'+this.codeArticulo)
            .then( res =>{
                if (res.data) {
                    this.articulo = res.data.articulo
                    this.estadoArticulo = res.data.estado
                    this.idArticulo = res.data._id
                    this.compradorArticulo = res.data.cliente
                    this.medioPagoArticulo = res.data.tipoPago
                    this.totalArticulo = res.data.total
                    this.modals.modal6 = true
                }
                else{
                    this.$swal({
                        icon: 'error',
                        title: 'Código no existe',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
        },
        verifyCode(){
            this.$swal({
					icon: 'warning',
					title: '¿Seguro que desea verificar el código?',
					showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonColor: '#2dce89',
                    cancelButtonColor: '#f5365c',
                    confirmButtonText: 'Si',
                    cancelButtonText: 'No'
				}).then((result) => {
                    if (result.value) {
                        var remp = this.totalArticulo.replace('.', "")
                        var remp1 = remp.replace(',00', "")
                        var remp2 = remp1.replace('$ ', "")
                        this.payOrder = remp2
                        this.haveCode = true
                        this.modals.modal5 = false
                        this.modals.modal6 = false
                    }
                })
        }
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
        EventBus.$on('changeBranch', status => {
            this.getBranch()
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
	right:-11%;
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
	right:-11%;
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
	right:-11%;
	background-color: white;
	position: absolute;
	border-radius: 0 5px 5px 0;
}
.navSCode{
	cursor: pointer;
	width:7%;
	top:22.6%;
	right:-11%;
	background-color: white;
	position: absolute;
	border-radius: 0 5px 5px 0;
}
.menuVerVentas:hover{
	width: 33%;
	right:-37%;
	z-index:2;
}
.menuVerServi:hover{
	width: 33%;
	right:-37%;
	z-index:2;
}
.menuVerRedo:hover{
	width: 33%;
	right:-37%;
	z-index:2;
}

.card-container > .ant-tabs-card > .ant-tabs-content {
  margin-top: -16px;
}

.card-container > .ant-tabs-card > .ant-tabs-content > .ant-tabs-tabpane {
  background: #fff;
  padding: 16px;
  padding-bottom: 40px;
}

.card-container > .ant-tabs-card > .ant-tabs-bar {
  border-color: #fff !important;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
  border-color: transparent !important;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab:hover {
  color: #111111 !important;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab-active {
  border-color: #fff !important;
  background: #fff;
  color: #111111 !important;
  font-weight: 600 !important;
}

.separatorLeft{
    border-right: 5px solid #fff;
}
.ant-select-selection{
    border: 1px solid #d9d9d9;
}
</style>
