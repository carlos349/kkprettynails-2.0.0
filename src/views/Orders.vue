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
                        <h1 class="display-2 text-white">Gift Cards</h1>
                        <p class="text-white mt-0 mb-2">Esta es la sección administrativa de tus pedidos, aquí podrás visualizar todos tus pedidos.</p>
                        
                        <!-- <base-button v-if="validRoute('clientes', 'filtrar')" @click="modals.modal1 = true" type="success">Crear pedido</base-button> -->
                        <!-- <base-button v-if="validRoute('clientes', 'filtrar')" @click="showFilter" type="default">Filtrar</base-button> -->
                        <!-- <base-button type="primary">Pedidos por confirmar: {{rowsPending.length}}</base-button>
                        
                        <base-button type="secondary">{{totalText}}: <span class="text-success">$ {{formatPrice(totalOrder)}}</span> </base-button> -->
                    </div>
                </div>
            </div>
        </base-header>
        

        <!-- MODAL REGISTRAR -->

        <!-- <modal :show.sync="modals.modal1"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-md">
               <h6 slot="header" class="modal-title p-0 m-0" id="modal-title-default"></h6>
            <card type="secondary" shadow
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-5 py-lg-5"
                  class="border-0">
                <template>
                    <div style="margin-top:-15% !important" class="text-muted text-center mb-3">
                        Aun en construcción
                    </div>
                </template>
                <template>
                    
                    <form role="form">
                        <vue-single-select
                            v-model="registerClient.recommender"
                            :options="clientsNames"
                            placeholder="Comprador"
                        ></vue-single-select>
                        <template>
                            <a-select
                                mode="multiple"
                                :default-value="['a1', 'b2']"
                                style="width: 100%"
                                placeholder="Please select"
                                @change="handleChange"
                            >
                                <a-select-option v-for="i in services" :key="i.nombre">
                                {{ i.nombre }}
                                </a-select-option>
                            </a-select>
                        </template>
                        <base-input alternative
                                    type="text"
                                    placeholder="Contacto"
                                    v-model="registerClient.id"
                                    v-on:change="validRegister()"
                                    addon-left-icon="fa fa-address-card"
                                    addon-right-icon="fa fa-asterisk text-danger">
                        </base-input>
                        <base-input alternative
                                    type="text"
                                    placeholder="Pedido"
                                    v-model="registerClient.contactOne"
                                    addon-left-icon="fa fa-address-card"
                                    addon-right-icon="fas fa-plus text-default">
                        </base-input>
                        <base-input alternative
                                    type="text"
                                    placeholder="Medio de pago"
                                    v-model="registerClient.contactTwo"
                                    addon-left-icon="fa fa-address-card"
                                    addon-right-icon="fas fa-plus text-default">
                        </base-input>
                        
                        <div class="text-center">
                            
                            <base-button type="primary" v-on:click="registerClients()" class="my-4">Registrar pedido</base-button>
                        </div>
                        
                    </form>
            </template>
            </card>
        </modal> -->
        <modal :show.sync="modals.modal4"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-md">
               <h6 slot="header" class="modal-title p-0 m-0" id="modal-title-default"></h6>
            <card type="secondary" shadow
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-5 py-lg-5"
                  class="border-0">
                <template>
                    <div style="margin-top:-15% !important" class="text-muted text-center mb-3">
                        Detalles de servicios
                    </div>
                </template>
                <template>
                    <a-table :columns="columnsServices"  :data-source="orderServices" :scroll="getScreen">
                        <div
                        slot="filterDropdown"
                        slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
                        style="padding: 8px"
                        >
                        <a-input
                            v-ant-ref="c => (searchInput = c)"
                            :placeholder="`Buscar por ${column.title.toLowerCase()}`"
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
                            Restablecer
                        </a-button>
                        </div>
                        <a-icon
                            slot="filterIcon"
                            slot-scope="filtered"
                            type="search"
                            :style="{ color: filtered ? '#108ee9' : undefined }"
                        />
                        <template slot="price" slot-scope="record,column">
                            $ {{ formatPrice(column.price) }} 
                        </template>


                        <template slot="dateExpired-slot" slot-scope="record,column">
                            {{column.expiredDate | formatDate}} 
                        </template>
                        
                        
                    </a-table>

                    <div class="text-center">
                            <base-button type="primary" v-on:click="modals.modal4 =false"  class="my-4">Cerrar</base-button>
                        </div>
                    
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
        

        <!-- TABLA DE ordenes -->
        <tabs fill class="flex-column flex-md-row">
            <card shadow>
                <tab-pane v-on:click="changeOrderView('pending')">
                    <span slot="title" >
                        <i class="ni ni-cart"></i>
                        Gift Cards por confirmar
                    </span>
                    
                    <a-table :columns="columns"  :data-source="rowsPending" :scroll="getScreen">
                        <div
                        slot="filterDropdown"
                        slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
                        style="padding: 8px"
                        >
                        <a-input
                            v-ant-ref="c => (searchInput = c)"
                            :placeholder="`Buscar por ${column.title.toLowerCase()}`"
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
                            Restablecer
                        </a-button>
                        </div>
                        <a-icon
                            slot="filterIcon"
                            slot-scope="filtered"
                            type="search"
                            :style="{ color: filtered ? '#108ee9' : undefined }"
                        />
                        <template slot="date-slot" slot-scope="record,column">
                            {{column.createdAt | formatDate}} 
                        </template>

                        <template slot="dateExpired-slot" slot-scope="record,column">
                            {{column.expiredDate | formatDate}} 
                        </template>

                        <template slot="price" slot-scope="record,column">
                            $ {{ formatPrice(column.total) }} 
                        </template>

                        <template slot="action" slot-scope="record,column">
                            <a-tooltip placement="top">
                                <template slot="title">
                                    <span>Ver servicios</span>
                                </template>
                                <base-button class="mt-1" size="sm" v-on:click="seeServices(column.products)" type="primary" icon="ni ni-align-center"></base-button>
                            </a-tooltip>

                            <a-tooltip placement="top">
                                <template slot="title">
                                    <span>Confirmar</span>
                                </template>
                                <base-button class="mt-1" size="sm" v-on:click="confirmOrder(column._id)" type="success" icon="ni ni-check-bold"></base-button>
                            </a-tooltip>
                        </template>

                        
                        
                        
                    </a-table>

                    <div class="container-fluid d-flex align-items-center my-4">
                        <div class="row">
                            <div class="col-12">
                                <base-button style="margin-top: -130px;" outline type="primary">Pedidos por confirmar: {{rowsPending.length}}</base-button>
                                
                                <base-button style="margin-top: -130px;" outline class="ml-4" type="success">Monto total por confirmar: <span class="text-success">$ {{formatPrice(totalPending)}}</span> </base-button>
                            </div>
                        </div>
                    </div>
                </tab-pane>

                <tab-pane title="Profile">
                    <span slot="title" v-on:click="changeOrderView('confirmed')">
                        <i class="ni ni-check-bold"></i>
                        Pedidos confirmados
                    </span>
                    
                    <a-table :columns="columnsConfirmed"  :data-source="rowsConfirmed" :scroll="getScreen">
                        <div
                        slot="filterDropdown"
                        slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
                        style="padding: 8px"
                        >
                        <a-input
                            v-ant-ref="c => (searchInput = c)"
                            :placeholder="`Buscar por ${column.title.toLowerCase()}`"
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
                            Restablecer
                        </a-button>
                        </div>
                        <a-icon
                            slot="filterIcon"
                            slot-scope="filtered"
                            type="search"
                            :style="{ color: filtered ? '#108ee9' : undefined }"
                        />
                        <template slot="date-slot" slot-scope="record,column">
                            {{column.createdAt | formatDate}} 
                        </template>

                        <template slot="price" slot-scope="record,column">
                            $ {{ formatPrice(column.total) }} 
                        </template>

                        <template slot="dateExpired-slot" slot-scope="record,column">
                            {{column.expiredDate | formatDate}} 
                        </template>

                        <template slot="action" slot-scope="record,column">
                            <a-tooltip placement="top">
                                <template slot="title">
                                    <span>Ver servicios</span>
                                </template>
                                <base-button class="mt-1" size="sm" v-on:click="seeServices(column.products)" type="primary" icon="ni ni-align-center"></base-button>
                            </a-tooltip>
                        </template>
                        
                        
                    </a-table>
                    <!-- <vue-bootstrap4-table class="tableClient" :rows="rowsConfirmed" :columns="columnsConfirmed" :classes="classes" :config="config">
                        
                        <template slot="date" slot-scope="props">
                            <b>
                                {{formatDate(props.row.date)}}
                            </b>
                        </template>
                        <template slot="dateConfirm" slot-scope="props">
                            <b>
                               
                                {{formatDates(props.row.dateConfirm)}}
                              
                                
                            </b>
                        </template>
                        <template slot="pagination-info" slot-scope="props">
                            Actuales {{props.currentPageRowsLength}} | 
                            Registros totales {{props.originalRowsLength}}
                        </template>
                        <template slot="selected-rows-info" slot-scope="props">
                            Total Number of rows selected : {{props.selectedItemsCount}}
                        </template>
                    </vue-bootstrap4-table> -->
                    <div class="container-fluid d-flex align-items-center my-4">
                        <div class="row">
                            <div class="col-12">
                                <base-button style="margin-top: -130px;" outline type="primary">Pedidos confirmados: {{rowsConfirmed.length}}</base-button>
                                
                                <base-button style="margin-top: -130px;" outline class="ml-4" type="success">Monto total confirmado: <span class="text-success">$ {{formatPrice(totalConfirmed)}}</span> </base-button>
                            </div>
                        </div>
                    </div>
                </tab-pane>

                <tab-pane>
                    <span slot="title" v-on:click="changeOrderViewUsed('used')">
                        <i class="ni ni-folder-17"></i>
                        Pedidos procesados / vencidos
                    </span>
                    <a-table :columns="columnsProccess"  :data-source="rowsUsed" :scroll="getScreen">
                        <div
                        slot="filterDropdown"
                        slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
                        style="padding: 8px"
                        >
                        <a-input
                            v-ant-ref="c => (searchInput = c)"
                            :placeholder="`Buscar por ${column.title.toLowerCase()}`"
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
                            Restablecer
                        </a-button>
                        </div>
                        <a-icon
                            slot="filterIcon"
                            slot-scope="filtered"
                            type="search"
                            :style="{ color: filtered ? '#108ee9' : undefined }"
                        />
                        <template slot="date-slot" slot-scope="record,column">
                            {{column.createdAt | formatDate}} 
                        </template>

                        <template slot="price" slot-scope="record,column">
                            $ {{ formatPrice(column.total) }} 
                        </template>
                        
                        <template slot="dateU-slot" slot-scope="record,column">
                            <span v-if="column.status == 'expired'">Expirado</span>
                            <span v-else>{{column.processDate | formatDate}} </span>
                        </template>
                        
                        
                    </a-table>
                    <div class="container-fluid d-flex align-items-center my-4">
                        <div class="row">
                            <div class="col-12 mt-2">
                                <base-button outline style="margin-top: -130px;" type="primary">Pedidos usados / vencidos: {{rowsUsed.length}}</base-button>
                                
                                <base-button outline style="margin-top: -130px;" class="ml-4" type="success">Monto total usado: <span class="text-success">$ {{formatPrice(totalUsed)}}</span> </base-button>
                            </div>
                        </div>
                    </div>
                    <!-- <vue-bootstrap4-table class="tableClient" :rows="rowsUsed" :columns="columnsProccess" :classes="classes" :config="config">
                        <template slot="date" slot-scope="props">
                            <b>
                                
                                {{formatDate(props.row.date)}}
                                    
                                
                                
                            </b>
                        </template>
                        <template slot="dateProccess" slot-scope="props">
                            <b>
                                <div v-if="props.row.estado == 'usado'">
                                    {{formatDates(props.row.dateProccess)}}  
                                </div>
                                <a-tooltip  v-else placement="top">
                                    <template slot="title">
                                    <span>Pedido vencido el {{formatDates(props.row.dateProccess)}}  </span>
                                    </template>
                                    <base-button size="sm" type="danger"  >Vencido</base-button>
                                </a-tooltip>
                                
                            </b>
                        </template>
                        <template slot="pagination-info" slot-scope="props">
                            Actuales {{props.currentPageRowsLength}} | 
                            Registros totales {{props.originalRowsLength}}
                        </template>
                        <template slot="selected-rows-info" slot-scope="props">
                            Total Number of rows selected : {{props.selectedItemsCount}}
                        </template>
                    </vue-bootstrap4-table> -->
                </tab-pane>
            </card>
        </tabs>

        

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
import moment from 'moment'
import 'moment/locale/es';
moment.locale('es');

import mixinES from '../mixins/mixinES'
// COMPONENTS

import mixinUserToken from '../mixins/mixinUserToken'
export default {
    mixins: [mixinUserToken],
    components: {
        VueBootstrap4Table 
    },
    data() {
      return {
        auth: [],
        idPedido:'',
        moment,
        totalText: 'Monto total por confirmar',
        identidadPedido:'',
        codePedido:'',
        articuloPedido:'',
        searchInput: null,
        clientePedido:'',
        successRegister:false,
        clientsNames: [],
        searchText: '',
        orderServices: [],
        searchedColumn: '',
        tipeForm: '',
        services:'',
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
            modal4: false,
            message: "",
            icon: '',
            type:''
        },
        rowsPending: [],
        rowsConfirmed: [],
        rowsUsed: [],
        totalPending:0,
        columnsServices: [
            
            {
                title: 'Servicio',
                dataIndex: 'name',
                key: 'name',
                sorter: (a, b) => {
                     if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0;
                },
                sortDirections: ['descend', 'ascend'],
                scopedSlots: {
                    filterDropdown: 'filterDropdown',
                    filterIcon: 'filterIcon',
                    customRender: 'namesC-slot',
                },
                onFilter: (value, record) => record.name.toString().toLowerCase().includes(value.toLowerCase()),
                onFilterDropdownVisibleChange: visible => {
                    if (visible) {
                    setTimeout(() => {
                        this.searchInput.focus();
                    }, 0);
                    }
                },
            },

            
            
            {
                title: 'Precio',
                dataIndex: 'price',
                key: 'price',
                scopedSlots: { customRender: 'price' },
                sorter: (a, b) => a.price - b.price,
            },
            
        ],
        columnsConfirmed: [
            { 
                title: 'Fecha de creación',
                dataIndex: 'createdAt',
                defaultSortOrder: 'descend',
                sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
                scopedSlots: { customRender: 'date-slot' } 
            },
            
            {
                title: 'N° de pedido',
                dataIndex: 'orderNumber',
                key: 'orderNumber',
                sorter: (a, b) => {
                     if (a.orderNumber > b.orderNumber) {
                        return -1;
                    }
                    if (b.orderNumber > a.orderNumber) {
                        return 1;
                    }
                    return 0;
                },
                sortDirections: ['descend', 'ascend'],
                scopedSlots: {
                    filterDropdown: 'filterDropdown',
                    filterIcon: 'filterIcon',
                    customRender: 'number-slot',
                },
                onFilter: (value, record) => record.orderNumber.toString().toLowerCase().includes(value.toLowerCase()),
                onFilterDropdownVisibleChange: visible => {
                    if (visible) {
                    setTimeout(() => {
                        this.searchInput.focus();
                    }, 0);
                    }
                },
            },
            {
                title: 'Comprador',
                dataIndex: 'client.name',
                key: 'client.name',
                sorter: (a, b) => {
                     if (a.client.name > b.client.name) {
                        return -1;
                    }
                    if (b.client.name > a.client.name) {
                        return 1;
                    }
                    return 0;
                },
                sortDirections: ['descend', 'ascend'],
                scopedSlots: {
                    filterDropdown: 'filterDropdown',
                    filterIcon: 'filterIcon',
                    customRender: 'namesC-slot',
                },
                onFilter: (value, record) => record.client.name.toString().toLowerCase().includes(value.toLowerCase()),
                onFilterDropdownVisibleChange: visible => {
                    if (visible) {
                    setTimeout(() => {
                        this.searchInput.focus();
                    }, 0);
                    }
                },
            },

            {
                title: 'Email',
                dataIndex: 'client.email',
                key: 'client.email',
                sorter: (a, b) => {
                     if (a.client.email > b.client.email) {
                        return -1;
                    }
                    if (b.client.email > a.client.email) {
                        return 1;
                    }
                    return 0;
                },
                sortDirections: ['descend', 'ascend'],
                scopedSlots: {
                    filterDropdown: 'filterDropdown',
                    filterIcon: 'filterIcon',
                    customRender: 'namesE-slot',
                },
                onFilter: (value, record) => record.client.email.toString().toLowerCase().includes(value.toLowerCase()),
                onFilterDropdownVisibleChange: visible => {
                    if (visible) {
                    setTimeout(() => {
                        this.searchInput.focus();
                    }, 0);
                    }
                },
            },

            {
                title: 'Medio de pago',
                dataIndex: 'payType',
                key: 'payType',
                sorter: (a, b) => {
                     if (a.payType > b.payType) {
                        return -1;
                    }
                    if (b.payType > a.payType) {
                        return 1;
                    }
                    return 0;
                },
                sortDirections: ['descend', 'ascend'],
                scopedSlots: {
                    filterDropdown: 'filterDropdown',
                    filterIcon: 'filterIcon',
                    customRender: 'namesE-slot',
                },
                onFilter: (value, record) => record.payType.toString().toLowerCase().includes(value.toLowerCase()),
                onFilterDropdownVisibleChange: visible => {
                    if (visible) {
                    setTimeout(() => {
                        this.searchInput.focus();
                    }, 0);
                    }
                },
            },
            
            {
                title: 'Total',
                dataIndex: 'total',
                key: 'total',
                scopedSlots: { customRender: 'price' },
                sorter: (a, b) => a.total - b.total,
            },
            {
                title: 'Acciones',
                dataIndex: '_id',
                key: '_id',
                scopedSlots: { customRender: 'action' }
            }
        ],

        columnsProccess: [
            { 
                title: 'Fecha de creación',
                dataIndex: 'createdAt',
                defaultSortOrder: 'descend',
                sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
                scopedSlots: { customRender: 'date-slot' } 
            },
            
            {
                title: 'N° de pedido',
                dataIndex: 'orderNumber',
                key: 'orderNumber',
                sorter: (a, b) => {
                     if (a.orderNumber > b.orderNumber) {
                        return -1;
                    }
                    if (b.orderNumber > a.orderNumber) {
                        return 1;
                    }
                    return 0;
                },
                sortDirections: ['descend', 'ascend'],
                scopedSlots: {
                    filterDropdown: 'filterDropdown',
                    filterIcon: 'filterIcon',
                    customRender: 'number-slot',
                },
                onFilter: (value, record) => record.orderNumber.toString().toLowerCase().includes(value.toLowerCase()),
                onFilterDropdownVisibleChange: visible => {
                    if (visible) {
                    setTimeout(() => {
                        this.searchInput.focus();
                    }, 0);
                    }
                },
            },
            {
                title: 'Comprador',
                dataIndex: 'client.name',
                key: 'client.name',
                sorter: (a, b) => {
                     if (a.client.name > b.client.name) {
                        return -1;
                    }
                    if (b.client.name > a.client.name) {
                        return 1;
                    }
                    return 0;
                },
                sortDirections: ['descend', 'ascend'],
                scopedSlots: {
                    filterDropdown: 'filterDropdown',
                    filterIcon: 'filterIcon',
                    customRender: 'namesC-slot',
                },
                onFilter: (value, record) => record.client.name.toString().toLowerCase().includes(value.toLowerCase()),
                onFilterDropdownVisibleChange: visible => {
                    if (visible) {
                    setTimeout(() => {
                        this.searchInput.focus();
                    }, 0);
                    }
                },
            },

            {
                title: 'Email',
                dataIndex: 'client.email',
                key: 'client.email',
                sorter: (a, b) => {
                     if (a.client.email > b.client.email) {
                        return -1;
                    }
                    if (b.client.email > a.client.email) {
                        return 1;
                    }
                    return 0;
                },
                sortDirections: ['descend', 'ascend'],
                scopedSlots: {
                    filterDropdown: 'filterDropdown',
                    filterIcon: 'filterIcon',
                    customRender: 'namesE-slot',
                },
                onFilter: (value, record) => record.client.email.toString().toLowerCase().includes(value.toLowerCase()),
                onFilterDropdownVisibleChange: visible => {
                    if (visible) {
                    setTimeout(() => {
                        this.searchInput.focus();
                    }, 0);
                    }
                },
            },

            {
                title: 'Código',
                dataIndex: 'code',
                key: 'code',
                sorter: (a, b) => {
                     if (a.code > b.code) {
                        return -1;
                    }
                    if (b.code > a.code) {
                        return 1;
                    }
                    return 0;
                },
                sortDirections: ['descend', 'ascend'],
                scopedSlots: {
                    filterDropdown: 'filterDropdown',
                    filterIcon: 'filterIcon',
                    customRender: 'number-slot',
                },
                onFilter: (value, record) => record.code.toString().toLowerCase().includes(value.toLowerCase()),
                onFilterDropdownVisibleChange: visible => {
                    if (visible) {
                    setTimeout(() => {
                        this.searchInput.focus();
                    }, 0);
                    }
                },
            },

            {
                title: 'Medio de pago',
                dataIndex: 'payType',
                key: 'payType',
                sorter: (a, b) => {
                     if (a.payType > b.payType) {
                        return -1;
                    }
                    if (b.payType > a.payType) {
                        return 1;
                    }
                    return 0;
                },
                sortDirections: ['descend', 'ascend'],
                scopedSlots: {
                    filterDropdown: 'filterDropdown',
                    filterIcon: 'filterIcon',
                    customRender: 'namesE-slot',
                },
                onFilter: (value, record) => record.payType.toString().toLowerCase().includes(value.toLowerCase()),
                onFilterDropdownVisibleChange: visible => {
                    if (visible) {
                    setTimeout(() => {
                        this.searchInput.focus();
                    }, 0);
                    }
                },
            },

            { 
                title: 'Fecha de uso',
                dataIndex: 'processDate',
                defaultSortOrder: 'descend',
                sorter: (a, b) => new Date(a.processDate).getTime() - new Date(b.processDate).getTime(),
                scopedSlots: { customRender: 'dateU-slot' } 
            },

            
            {
                title: 'Total',
                dataIndex: 'total',
                key: 'total',
                scopedSlots: { customRender: 'price' },
                sorter: (a, b) => a.total - b.total,
            },
            
        ],
        
        // columnsProccess: [{
        //         label: "Fecha",
        //         name: "createdAt",
        //         // filter: {
        //         //     type: "simple",
        //         //     placeholder: "id"
        //         // },
        //         sort: true,
        //         slot_name: "date"
        //     },
        //     {
        //         label: "N° de pedido",
        //         name: "orderNumber",
        //         // filter: {
        //         //     type: "simple",
        //         //     placeholder: "Enter first name"
        //         // },
        //         sort: true,
        //     },
        //     {
        //         label: "Comprador",
        //         name: "client.name",
        //         sort: true,
        //     },
        //     {
        //         label: "Articulo",
        //         name: "articulo",
        //         sort: true,
        //         // filter: {
        //         //     type: "simple",
        //         //     placeholder: "Enter country"
        //         // },
        //     },
        //     {
        //         label: "Codigo",
        //         name: "code",
        //         sort: true,
        //         // filter: {
        //         //     type: "simple",
        //         //     placeholder: "Enter country"
        //         // },
        //     },
        //     {
        //         label: "Medio de pago",
        //         name: "payType",
        //         sort: true,
                
        //         // filter: {
        //         //     type: "simple",
        //         //     placeholder: "Enter country"
        //         // },
        //     },
        //     {
        //         label: "Total",
        //         name: "total",
        //         sort: true,
        //         // filter: {
        //         //     type: "simple",
        //         //     placeholder: "Enter country"
        //         // },
        //     },
            
        //     {
        //         label: "Fecha de procesamiento",
        //         name: "dateProccess",
        //         sort: true,
        //         slot_name: "dateProccess"
        //     },
        // ],
        // columns: [{
        //         label: "Fecha",
        //         name: "createdAt",
        //         // filter: {
        //         //     type: "simple",
        //         //     placeholder: "id"
        //         // },
        //         sort: true,
        //         slot_name: "date"
        //     },
        //     {
        //         label: "N° de pedido",
        //         name: "orderNumber",
        //         // filter: {
        //         //     type: "simple",
        //         //     placeholder: "Enter first name"
        //         // },
        //         sort: true,
        //     },
        //     {
        //         label: "Cliente",
        //         name: "client.name",
        //         sort: true,
        //     },
        //     {
        //         label: "Contacto",
        //         name: "client.email",
        //         sort: true,
        //         // filter: {
        //         //     type: "simple",
        //         //     placeholder: "Enter country"
        //         // },
        //     },
        //     {
        //         label: "Articulo",
        //         name: "articulo",
        //         sort: true,
        //         // filter: {
        //         //     type: "simple",
        //         //     placeholder: "Enter country"
        //         // },
        //     },
        //     {
        //         label: "Fecha de vencimiento",
        //         name: "",
        //         sort: true,
        //         slot_name: "vencimiento"
        //         // filter: {
        //         //     type: "simple",
        //         //     placeholder: "Enter country"
        //         // },
        //     },
        //     {
        //         label: "Total",
        //         name: "total",
        //         sort: true,
        //         // filter: {
        //         //     type: "simple",
        //         //     placeholder: "Enter country"
        //         // },
        //     },
            
        //     {
        //         label: "Administrar",
        //         name: "_id",
        //         sort: false,
        //         slot_name: "Administrar"
        //     },
        //     ],
        columns: [
            { 
                title: 'Fecha de creación',
                dataIndex: 'createdAt',
                defaultSortOrder: 'descend',
                sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
                scopedSlots: { customRender: 'date-slot' } 
            },
            
            {
                title: 'N° de pedido',
                dataIndex: 'orderNumber',
                key: 'orderNumber',
                sorter: (a, b) => {
                     if (a.orderNumber > b.orderNumber) {
                        return -1;
                    }
                    if (b.orderNumber > a.orderNumber) {
                        return 1;
                    }
                    return 0;
                },
                sortDirections: ['descend', 'ascend'],
                scopedSlots: {
                    filterDropdown: 'filterDropdown',
                    filterIcon: 'filterIcon',
                    customRender: 'number-slot',
                },
                onFilter: (value, record) => record.orderNumber.toString().toLowerCase().includes(value.toLowerCase()),
                onFilterDropdownVisibleChange: visible => {
                    if (visible) {
                    setTimeout(() => {
                        this.searchInput.focus();
                    }, 0);
                    }
                },
            },
            {
                title: 'Comprador',
                dataIndex: 'client.name',
                key: 'client.name',
                sorter: (a, b) => {
                     if (a.client.name > b.client.name) {
                        return -1;
                    }
                    if (b.client.name > a.client.name) {
                        return 1;
                    }
                    return 0;
                },
                sortDirections: ['descend', 'ascend'],
                scopedSlots: {
                    filterDropdown: 'filterDropdown',
                    filterIcon: 'filterIcon',
                    customRender: 'namesC-slot',
                },
                onFilter: (value, record) => record.client.name.toString().toLowerCase().includes(value.toLowerCase()),
                onFilterDropdownVisibleChange: visible => {
                    if (visible) {
                    setTimeout(() => {
                        this.searchInput.focus();
                    }, 0);
                    }
                },
            },

            {
                title: 'Email',
                dataIndex: 'client.email',
                key: 'client.email',
                sorter: (a, b) => {
                     if (a.client.email > b.client.email) {
                        return -1;
                    }
                    if (b.client.email > a.client.email) {
                        return 1;
                    }
                    return 0;
                },
                sortDirections: ['descend', 'ascend'],
                scopedSlots: {
                    filterDropdown: 'filterDropdown',
                    filterIcon: 'filterIcon',
                    customRender: 'namesE-slot',
                },
                onFilter: (value, record) => record.client.email.toString().toLowerCase().includes(value.toLowerCase()),
                onFilterDropdownVisibleChange: visible => {
                    if (visible) {
                    setTimeout(() => {
                        this.searchInput.focus();
                    }, 0);
                    }
                },
            },

            {
                title: 'Medio de pago',
                dataIndex: 'payType',
                key: 'payType',
                sorter: (a, b) => {
                     if (a.payType > b.payType) {
                        return -1;
                    }
                    if (b.payType > a.payType) {
                        return 1;
                    }
                    return 0;
                },
                sortDirections: ['descend', 'ascend'],
                scopedSlots: {
                    filterDropdown: 'filterDropdown',
                    filterIcon: 'filterIcon',
                    customRender: 'namesE-slot',
                },
                onFilter: (value, record) => record.payType.toString().toLowerCase().includes(value.toLowerCase()),
                onFilterDropdownVisibleChange: visible => {
                    if (visible) {
                    setTimeout(() => {
                        this.searchInput.focus();
                    }, 0);
                    }
                },
            },

            { 
                title: 'Fecha de vencimiento',
                dataIndex: 'expiredDate',
                key: 'expiredDate',
                sorter: (a, b) => new Date(a.expiredDate).getTime() - new Date(b.expiredDate).getTime(),
                scopedSlots: { customRender: 'dateExpired-slot' } 
            },
            
            {
                title: 'Total',
                dataIndex: 'total',
                key: 'total',
                scopedSlots: { customRender: 'price' },
                sorter: (a, b) => a.total - b.total,
            },
            {
                title: 'Acciones',
                dataIndex: '_id',
                key: '_id',
                scopedSlots: { customRender: 'action' }
            }
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
        configHeader: {
            headers:{
                "x-database-connect": endPoint.database,
                'x-access-token':localStorage.userToken
                }
        },
        classes: {
            table: "table-bordered table-striped"
        },
        totalUsed: 0,
        totalConfirmed: 0,
        totalOrder:0    
      };
    },
    created(){
		this.getOrders();
        this.getToken();
    },
    methods: {
        getToken(){
            const token = localStorage.userToken
            const decoded = jwtDecode(token)  
            this.auth = decoded.access
        },
        // getServices(){
        //     axios.get(endPoint.endpointTarget+'/servicios')
        //     .then(res => {
		// 		this.services = res.data
        //     }).catch(err =>{
        //         if (!err.response) {
        //             this.$swal({
        //                 icon: 'error',
        //                 title: 'Error de conexión',
        //                 showConfirmButton: false,
        //                 timer: 1500
        //             })
        //         }else if (err.response.status == 401) {
        //             this.$swal({
        //                 icon: 'error',
        //                 title: 'Session caducada',
        //                 showConfirmButton: false,
        //                 timer: 1500
        //             })
        //             setTimeout(() => {
        //                 router.push("login")
        //             }, 1550);
        //         }
        //     })
        // },
        getOrders(){
            this.totalPending = 0
            this.totalConfirmed = 0
            this.rowsUsed = 0

            axios.get(endPoint.endpointTarget+'/orders/pending', this.configHeader)
            .then(res => {
                this.rowsPending = res.data.data
                
                for (let i = 0; i < this.rowsPending.length; i++) {
                    const element = this.rowsPending[i].total;
                    
                    this.totalPending = parseFloat(this.totalPending)+parseFloat(element)
                    
                }

                this.totalOrder = this.totalPending
            }).catch(err =>{
                if (!err.response) {
                    this.$swal({
                        icon: 'error',
                        title: 'Error de conexión',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }else if (err.response.status == 401) {
                    this.$swal({
                        icon: 'error',
                        title: 'Session caducada',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setTimeout(() => {
                        router.push("login")
                    }, 1550);
                }
            })
            axios.get(endPoint.endpointTarget+'/orders/confirmed', this.configHeader)
            .then(res => {
                this.rowsConfirmed = res.data.data

                for (let i = 0; i < this.rowsConfirmed.length; i++) {
                    const element = this.rowsConfirmed[i].total;
                    
                    this.totalConfirmed = parseFloat(this.totalConfirmed)+parseFloat(element)
                }
            }).catch(err => {
                if (!err.response) {
                    this.$swal({
                        icon: 'error',
                        title: 'Error de conexión',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }else if (err.response.status == 401) {
                    this.$swal({
                        icon: 'error',
                        title: 'Session caducada',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setTimeout(() => {
                        router.push("login")
                    }, 1550);
                }
            })
            axios.get(endPoint.endpointTarget+'/orders/used', this.configHeader)
            .then(res => {
                this.rowsUsed = res.data.data
                
                for (let i = 0; i < this.rowsUsed.length; i++) {
                    const element = this.rowsUsed[i].total;

                    if (this.rowsUsed[i].status == 'used') {
                        this.totalUsed = parseFloat(this.totalUsed)+parseFloat(element)
                    }
                    
                }
            }).catch(err => {
                if (!err.response) {
                    this.$swal({
                        icon: 'error',
                        title: 'Error de conexión',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }else if (err.response.status == 401) {
                    this.$swal({
                        icon: 'error',
                        title: 'Session caducada',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setTimeout(() => {
                        router.push("login")
                    }, 1550);
                }
            })
        },
        seeServices(services){
            this.orderServices = services
            this.modals.modal4 = true
        },
        changeOrderView(view){
            console.log("🚀 ~ file: Orders.vue ~ line 1274 ~ changeOrderView ~ view", view)
            if (view == 'confirm') {
                this.totalText = "Monto confirmado"
                this.totalOrder = this.totalConfirmed
            }
            if (view == 'pending') {
                this.totalText = "Monto por confirmar"
                this.totalOrder = this.totalPending
            }
            if (view == 'used') {
                this.totalText = "Monto usados"
                this.totalOrder = this.totalUsed
            }
        },
        changeOrderViewUsed(view){
            console.log("🚀 ~ file: Orders.vue ~ line 1274 ~ changeOrderView ~ view", view)
            if (view == 'confirm') {
                this.totalText = "Monto confirmado"
                this.totalOrder = this.totalConfirmed
            }
            if (view == 'pending') {
                this.totalText = "Monto por confirmar"
                this.totalOrder = this.totalPending
            }
            if (view == 'used') {
                this.totalText = "Monto usados"
                this.totalOrder = this.totalUsed
            }
        },
        registerClients(){
            
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
                        message: "Se registro el cliente con éxito",
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
                        // EventBus.$emit('reloadClients', 'reload')
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
            }).catch(err => {
                if (!err.response) {
                    this.$swal({
                        icon: 'error',
                        title: 'Error de conexión',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }else if (err.response.status == 401) {
                    this.$swal({
                        icon: 'error',
                        title: 'Session caducada',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setTimeout(() => {
                        router.push("login")
                    }, 1550);
                }
            })
        },
        confirmOrder(id){
            this.$swal({
                title: '¿Confirmar pedido?',
                text: '¡Recuerda! No es posible revertir esta acción',
                type: 'warning',
                icon:'warning',
                showCancelButton: true,
                confirmButtonText: 'Si',
                cancelButtonText: 'No',
                showCloseButton: true,
                showLoaderOnConfirm: true
            })
            .then(result => {
                if (result.value) {
                    axios.put(endPoint.endpointTarget+'/orders/confirmorder/' + id,{}, this.configHeader)
                    .then(res => {
                            this.$swal({
                                icon: 'success',
                                title: 'Confirmado con éxito',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            this.getOrders()
                    })
                    .catch(err => {
                    console.log("🚀 ~ file: Orders.vue ~ line 1349 ~ confirmOrder ~ err", err)
                        
                        if (!err.response) {
                            this.$swal({
                                icon: 'error',
                                title: 'Error de conexión',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }else if (err.response.status == 401) {
                            this.$swal({
                                icon: 'error',
                                title: 'Session caducada',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            setTimeout(() => {
                                router.push("login")
                            }, 1550);
                        }
                    })
                }
            })
        },
        handleSearch(selectedKeys, confirm, dataIndex) {
            confirm();
            this.searchText = selectedKeys[0];
            this.searchedColumn = dataIndex;
        },
        handleReset(clearFilters) {
            clearFilters();
            this.searchText = '';
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
            dateFormat.setDate(dateFormat.getDate() +1)
            return moment(dateFormat).format("DD-MM-YYYY")
        },
        formatDates(date){
            let dateFormat = new Date(date)
            return moment(dateFormat).format("DD-MM-YYYY")
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
                                message: "Cliente borrado con éxito",
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
                                // EventBus.$emit('reloadClients', 'reload')
                            }, 1500);
							// this.getClientsThree()
							// this.ServicesQuantityChartFunc();
							// this.emitMethodTwo()
						}
					}).catch(err =>{
                        if (!err.response) {
                            this.$swal({
                                icon: 'error',
                                title: 'Error de conexión',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }else if (err.response.status == 401) {
                            this.$swal({
                                icon: 'error',
                                title: 'Session caducada',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            setTimeout(() => {
                                router.push("login")
                            }, 1550);
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
                if (res.data.status == 'Servicio actualizado') {
                    this.modals = {
                        modal2: true,
                        message: "el cliente editó con éxito",
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
                        // EventBus.$emit('reloadClients', 'reload')
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
            }).catch(err => {
                if (!err.response) {
                    this.$swal({
                        icon: 'error',
                        title: 'Error de conexión',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }else if (err.response.status == 401) {
                    this.$swal({
                        icon: 'error',
                        title: 'Session caducada',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setTimeout(() => {
                        router.push("login")
                    }, 1550);
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
            axios.put(endPoint.endpointTarget+'/pedidos/'+this.idPedido, {
                nombreClienteEditar: this.registerClient.name,
                identidadClienteEditar: this.registerClient.id,
                correoClienteEditar: this.registerClient.contactOne,
                instagramClienteEditar: this.registerClient.contactTwo,
            })
            .then(res => {
                if (res.data.status == 'Servicio actualizado') {
                    axios.post(endPoint.endpointTarget+'/pedidos/sendEmailPedido',{
                        to : this.identidadPedido,
                        code : this.codePedido,
                        article : this.articuloPedido,
                        client: this.clientePedido
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
                        this.getOrders();
                        this.initialState(1)
                        // EventBus.$emit('reloadClients', 'reload')
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
            }).catch(err => {
                if (!err.response) {
                    this.$swal({
                        icon: 'error',
                        title: 'Error de conexión',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }else if (err.response.status == 401) {
                    this.$swal({
                        icon: 'error',
                        title: 'Session caducada',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setTimeout(() => {
                        router.push("login")
                    }, 1550);
                }
            })
        },
        
        formatCaducity(date) {
            let dateFormat = new Date(date)
            dateFormat.setDate(dateFormat.getDate() + 7)
            return moment(dateFormat).format("DD-MM-YYYY")
        },
        formatPrice(value) {
          let val = (value/1).toFixed(2).replace('.', ',')
          return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      },

    },
    computed: {
        getScreen: () => {
            return screen.width < 780 ? { x: 'calc(700px + 50%)', y: 240 } : { y: 280 }
        }
    },
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