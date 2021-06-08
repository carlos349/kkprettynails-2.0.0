<template>
  <div>
    <base-header class="header pb-4 pt-2 pt-lg-4 d-flex align-items-center" style="min-height: 50px; background-image: url(img/theme/inventario.jpg); background-size: cover; background-position: center top;">
        <!-- Mask -->
        <span style="background-color:#172b4d !important" class="mask  opacity-7"></span>
        <!-- Header container -->
        <div class="row">
            <div class="col-12">
                <div class="text-absolute">
                    <p class="mb-0 display-2 text-white">Inventario</p>
                    <p class="text-white">Sección dedicada a la administración de sus empleados. Donde podrá obtener detalle de sus ventas y comisiones correspondientes.</p>
                </div>
                <base-button class="float-right mt-7" size="sm" @click="modals.modal4 = true" type="danger">
                    <i class="fa fa-archive mr-2" style="vertical-align:1px;font-size:1.2em;"></i>
                    <!-- <a-icon type="form" class="mr-2" style="vertical-align:1px;font-size:1.2em;" /> -->
                    Cerrar inventario
                </base-button>
            </div>
        </div>
    </base-header>
    <tabs fill class="flex-column flex-md-row inventory inventoryTabs">
        <card shadow>
            <tab-pane>
                <span class="p-2" slot="title">
                    <i class="fa fa-box-open"></i>
                    Tabla de productos
                </span>
                <template>
                    <div class="p-2">
                        <a-config-provider>
                            <template #renderEmpty>
                                <div style="text-align: center">
                                    <a-icon type="warning" style="font-size: 20px" />
                                    <h2>No hay ningun producto registrado</h2>
                                </div>
                            </template>
                            <a-table :columns="columns" :loading="productState" :data-source="products" :scroll="getScreen">
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
                                <template slot="total" slot-scope="record,column">
                                  <span class="text-danger" v-if="(parseFloat(column.quantity) + parseFloat(column.entry)) - parseFloat(column.consume) < column.alertTotal">
                                    {{(parseFloat(column.quantity) + parseFloat(column.entry)) - parseFloat(column.consume)}}
                                    <a-tooltip placement="topLeft">
                                        <template slot="title">
                                            <span>Este producto necesita ser reabastecido.</span>
                                        </template>
                                        <a-icon class="ml-2" style="cursor: pointer;vertical-align: 0.1em;font-size:1.1em" type="exclamation-circle" />
                                    </a-tooltip>
                                  </span>
                                  <span v-else>
                                    {{(parseFloat(column.quantity) + parseFloat(column.entry)) - parseFloat(column.consume)}}
                                  </span>
                                    
                                </template>
                                <template slot="price" slot-scope="record">
                                    {{formatPrice(record)}}
                                </template>
                            </a-table>
                        </a-config-provider>    
                    </div>
                </template>
            </tab-pane>
            <tab-pane>
                <span slot="title">
                  <i class="ni ni-calendar-grid-58"></i>
                  Historial
                </span>
                <tabs fill class="flex-column flex-md-row">
                    <card shadow>
                        <tab-pane>
                            <span class="w-50" slot="title">
                                <i class="fa fa-money-check-alt"></i>
                                Historial de abastecimientos
                            </span>
                            <template>
                              <div class="p-2">
                                  <a-config-provider>
                                      <template #renderEmpty>
                                          <div style="text-align: center">
                                              <a-icon type="warning" style="font-size: 20px" />
                                              <h2>No hay ningun registro de historial</h2>
                                          </div>
                                      </template>
                                      <a-table :columns="columnsHistory" :loading="productState" :data-source="dataHistory" :scroll="getScreen">
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
                                          <template slot="date" slot-scope="record">
                                              {{formatDate(record)}}
                                          </template>
                                          <template slot="price" slot-scope="record">
                                              {{formatPrice(record)}}
                                          </template>
                                      </a-table>
                                  </a-config-provider>    
                              </div>
                          </template>
                        </tab-pane>

                        <tab-pane title="Profile">
                            <span slot="title">
                                <i class="fa fa-file-contract"></i>
                                Historial de cierres
                            </span>
                            <template>
                              <div class="p-2">
                                  <a-config-provider>
                                      <template #renderEmpty>
                                          <div style="text-align: center">
                                              <a-icon type="warning" style="font-size: 20px" />
                                              <h2>No hay ningun registro de cierre</h2>
                                          </div>
                                      </template>
                                      <a-table :columns="columnsHistoryClosed" :loading="productState" :data-source="dataHistoryClosed" :scroll="getScreen">
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
                                          <template slot="date" slot-scope="record">
                                              {{formatDate(record)}}
                                          </template>
                                          <template slot="user" slot-scope="record">
                                              {{record.email}}
                                          </template>
                                          <template slot="report" slot-scope="record, column">
                                            <a-tooltip placement="top">
                                              <template slot="title">
                                                <span>Ver informe</span>
                                              </template>
                                              <base-button size="sm" type="default" @click="modals.modal5 = true ,validForm = 2, dataHistoryClosedReport = column.products" icon="ni ni-bullet-list-67"></base-button>
                                            </a-tooltip>
                                          </template>
                                      </a-table>
                                  </a-config-provider>    
                              </div>
                          </template>
                        </tab-pane>
                    </card>
                </tabs>
            </tab-pane>
        </card>
    </tabs>
    <modal :show.sync="modals.modal4" modal-classes="modal-dialog-centered modal-lg">
      <h6 slot="header" class="modal-title" id="modal-title-default">Cierre de inventario</h6>
      <vue-custom-scrollbar style="height:30vh;overflow:hidden;overflow-x: hidden;overflow-y:hidden;">
        <div class="row p-2 m-2">
          <div class="col-6">
            Nombre del producto
          </div>
          <div class="col-6 text-left">
            Total real
          </div>
        </div> 
        <div v-for="(data, index) in products" :key="index" class="row p-2 m-2">
          <dt class="col-6 mt-2">{{data.product}}</dt>

          <base-input class="col-6" v-model="countProduct[index].count" :placeholder="'Ingrese cantidad en '+data.measure"></base-input>
        </div>
      </vue-custom-scrollbar> 
      
      <template slot="footer">
          <base-button v-on:click="closeInventory" type="default">Cerrar inventario</base-button>
          <base-button type="link" class="ml-auto" @click="modals.modal4 = false">Salir
          </base-button>
      </template>
    </modal>
    <modal  modal-classes="modal-dialog-centered modal-xl" :show.sync="modals.modal5">
        <h6 slot="header" class="modal-title" id="modal-title-default">Informe de cierre</h6>
        <template>
            <div class="p-2">
                <a-config-provider>
                    <template #renderEmpty>
                        <div style="text-align: center">
                            <a-icon type="warning" style="font-size: 20px" />
                            <h2>No hay ningun registro</h2>
                        </div>
                    </template>
                    <a-table :columns="columnsHistoryClosedReport" :loading="productState" :data-source="dataHistoryClosedReport" :scroll="getScreen">
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
                    </a-table>
                </a-config-provider>    
            </div>
        </template>
        <template slot="footer">
            <base-button type="link" class="ml-auto" @click="modals.modal5 = false">Cerrar</base-button>
        </template>
    </modal>

  </div>
</template>
<script>
//Back - End 
import axios from 'axios'
import endPoint from '../../config-endpoint/endpoint.js'
import vueCustomScrollbar from 'vue-custom-scrollbar'
import EventBus from '../components/EventBus'
// COMPONENTS

import mixinUserToken from '../mixins/mixinUserToken'
export default {
    mixins: [mixinUserToken],
    components: {
        vueCustomScrollbar
    },
    data() {
      return {
        countProduct:[],
        dataHistoryClosed:[],
        dataHistory:[],
        modals: {
          modal4: false,
          modal5: false,
        },
        products: [],
        searchText: '',
        searchInput: null,
        searchedColumn: '',
        columns: [
            {
                title: 'Producto',
                dataIndex: 'product',
                key: 'product',
                ellipsis: true,
                sorter: (a, b) => {
                     if (a.product > b.product) {
                        return -1;
                    }
                    if (b.product > a.product) {
                        return 1;
                    }
                    return 0;
                },
                sortDirections: ['descend', 'ascend'],
                scopedSlots: {
                    filterDropdown: 'filterDropdown',
                    filterIcon: 'filterIcon',
                    customRender: 'customRender',
                },
                onFilter: (value, record) => record.product.toString().toLowerCase().includes(value.toLowerCase()),
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
                ellipsis: true,
                scopedSlots: { customRender: 'price' },
                sorter: (a, b) => a.price - b.price,
            },
            {
                title: 'Tipo de medida',
                dataIndex: 'measure',
                key: 'measure',
                ellipsis: true,
                scopedSlots: {
                    filterDropdown: 'filterDropdown',
                    filterIcon: 'filterIcon',
                    customRender: 'customRender',
                },
                onFilter: (value, record) => record.measure.toString().toLowerCase().includes(value.toLowerCase()),
                onFilterDropdownVisibleChange: visible => {
                    if (visible) {
                    setTimeout(() => {
                        this.searchInput.focus();
                    }, 0);
                    }
                },
            },
            {
                title: 'Cantidad inicial',
                dataIndex: 'quantity',
                key: 'quantity',
                ellipsis: true,
                scopedSlots: { customRender: 'quantity' },
                sorter: (a, b) => a.quantity - b.quantity,
            },
            {
                title: 'Cantidad abastecida',
                dataIndex: 'entry',
                key: 'entry',
                ellipsis: true,
                scopedSlots: { customRender: 'entry' },
                sorter: (a, b) => a.entry - b.entry,
            },
             {
                title: 'Consumo',
                dataIndex: 'consume',
                key: 'consume',
                ellipsis: true,
                scopedSlots: { customRender: 'consume' },
                sorter: (a, b) => a.consume - b.consume,
            },
            {
                title: 'Total',
                key: '_id',
                ellipsis: true,
                scopedSlots: { customRender: 'total' },
                sorter: (a, b) => (a.quantity + a.entry - a.consume) - (b.quantity + b.entry - b.consume),
            },
        ],
        columnsHistory: [
            {
                title: 'Fecha',
                dataIndex: 'date',
                key: 'date',
                ellipsis: true,
                defaultSortOrder: 'descend',
                sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
                scopedSlots: {
                    customRender: 'date',
                },
            },
            {
                title: 'Producto',
                dataIndex: 'product',
                key: 'product',
                ellipsis: true,
                sorter: (a, b) => {
                     if (a.product > b.product) {
                        return -1;
                    }
                    if (b.product > a.product) {
                        return 1;
                    }
                    return 0;
                },
                sortDirections: ['descend', 'ascend'],
                scopedSlots: {
                    filterDropdown: 'filterDropdown',
                    filterIcon: 'filterIcon',
                    customRender: 'customRender',
                },
                onFilter: (value, record) => record.product.toString().toLowerCase().includes(value.toLowerCase()),
                onFilterDropdownVisibleChange: visible => {
                    if (visible) {
                        setTimeout(() => {
                            this.searchInput.focus();
                        }, 0);
                    }
                },
            },
            {
                title: 'Anexado',
                dataIndex: 'entry',
                key: 'entry',
                ellipsis: true
            },
            {
                title: 'Medida',
                dataIndex: 'measure',
                key: 'measure',
                ellipsis: true
            },
        ],
        columnsHistoryClosed: [
            {
                title: 'Fecha',
                dataIndex: 'createdAt',
                key: 'createdAt',
                ellipsis: true,
                defaultSortOrder: 'descend',
                sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
                scopedSlots: {
                    customRender: 'date',
                },
            },
            {
                title: 'Encargado del cierre',
                dataIndex: 'user',
                key: 'user',
                ellipsis: true,
                sorter: (a, b) => {
                     if (a.user > b.user) {
                        return -1;
                    }
                    if (b.user > a.user) {
                        return 1;
                    }
                    return 0;
                },
                sortDirections: ['descend', 'ascend'],
                scopedSlots: {
                    filterDropdown: 'filterDropdown',
                    filterIcon: 'filterIcon',
                    customRender: 'user',
                },
                onFilter: (value, record) => record.user.toString().toLowerCase().includes(value.toLowerCase()),
                onFilterDropdownVisibleChange: visible => {
                    if (visible) {
                        setTimeout(() => {
                            this.searchInput.focus();
                        }, 0);
                    }
                },
            },
            {
                title: 'Productos totales',
                dataIndex: 'totalProduct',
                key: 'totalProduct',
                ellipsis: true
            },
            {
                title: 'Informe',
                dataIndex: '_id',
                scopedSlots: {
                    customRender: 'report',
                },
                key: '_id',
                ellipsis: true
            },
        ],
        columnsHistoryClosedReport: [
            {
                title: 'Producto',
                dataIndex: 'product',
                key: 'product',
                ellipsis: true,
                sorter: (a, b) => {
                     if (a.product > b.product) {
                        return -1;
                    }
                    if (b.product > a.product) {
                        return 1;
                    }
                    return 0;
                },
                sortDirections: ['descend', 'ascend'],
                scopedSlots: {
                    filterDropdown: 'filterDropdown',
                    filterIcon: 'filterIcon',
                    customRender: 'product',
                },
                onFilter: (value, record) => record.product.toString().toLowerCase().includes(value.toLowerCase()),
                onFilterDropdownVisibleChange: visible => {
                    if (visible) {
                        setTimeout(() => {
                            this.searchInput.focus();
                        }, 0);
                    }
                },
            },
            {
                title: 'Medida',
                dataIndex: 'measure',
                key: 'measure',
                ellipsis: true,
                sorter: (a, b) => {
                     if (a.measure > b.measure) {
                        return -1;
                    }
                    if (b.measure > a.measure) {
                        return 1;
                    }
                    return 0;
                },
                sortDirections: ['descend', 'ascend'],
                scopedSlots: {
                    filterDropdown: 'filterDropdown',
                    filterIcon: 'filterIcon',
                    customRender: 'measure',
                },
                onFilter: (value, record) => record.measure.toString().toLowerCase().includes(value.toLowerCase()),
                onFilterDropdownVisibleChange: visible => {
                    if (visible) {
                        setTimeout(() => {
                            this.searchInput.focus();
                        }, 0);
                    }
                },
            },
            {
                title: 'Total ideal',
                dataIndex: 'ideal',
                key: 'ideal',
                ellipsis: true
            },
            {
                title: 'Total real',
                dataIndex: 'count',
                key: 'count',
                ellipsis: true
            },
            {
                title: 'Diferencia',
                dataIndex: 'difference',
                key: 'difference',
                ellipsis: true
            },
        ],
        configHeader: {
            headers:{
                "x-database-connect": endPoint.database,
                'x-access-token':localStorage.userToken
            }
        },    
      };
    },
    created(){
      this.getBranch();
      this.getUserData();
    },
    methods: {
      getUserData(){
          this.firstNameUser = localStorage.firstname  
          this.lastNameUser = localStorage.lastname
          this.emailUser = localStorage.email
          this.idUser = localStorage._id
      },
      getBranch(){
        this.branchName = localStorage.branchName  
        this.branch = localStorage.branch
        this.getProducts();
        this.getHistory();
        this.getHistoryClosed();
      },
      async getProducts() {
        this.countProduct = []
        try{
          const getProducts = await axios.get(endPoint.endpointTarget+'/stores/getinventorybybranch/'+ this.branch, this.configHeader)
          if (getProducts) {
            this.products = getProducts.data.data
            for (let index = 0; index < this.products.length; index++) {
              var ideal = (this.products[index].quantity + this.products[index].entry) - this.products[index].consume
              this.countProduct.push({id:this.products[index]._id,count:'',ideal:ideal,measure:this.products[index].measure,product:this.products[index].product,difference:''})
            } 
          }else{
            this.products = []
          }
        }catch(err){
          res.send(err)
        }
      },
      async getHistory() {
        try{
          const getHistory = await axios.get(endPoint.endpointTarget+'/stores/gethistorybybranch/'+ this.branch, this.configHeader)
          if (getHistory) {
            this.dataHistory = getHistory.data.data
          }else{
            this.dataHistory = []
          }
        }catch(err){
          res.send(err)
        }
      },
      async getHistoryClosed() {
        
        try{
          const getHistoryClosed = await axios.get(endPoint.endpointTarget+'/stores/gethistoryclosedbybranch/'+ this.branch, this.configHeader)
          if (getHistoryClosed) {
            this.dataHistoryClosed = getHistoryClosed.data.data
          }else{
            this.dataHistoryClosed = []
          }
        }catch(err){
          res.send(err)
        }
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
      formatDate(date) {
        let dateFormat = new Date(date)
        return dateFormat.getDate()+"-"+(dateFormat.getMonth() + 1)+"-"+dateFormat.getFullYear()
      },
      formatPrice(value) {
          let val = (value/1).toFixed(2).replace('.', ',')
          return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      },
      closeInventory(){
        axios.post(endPoint.endpointTarget+'/stores/closeinventorybybranch', {
          branch: this.branch,
          firstNameUser: this.firstNameUser,
          lastNameUser: this.lastNameUser,
          emailUser: this.emailUser,
          idUser: this.idUser, 
          products:this.countProduct
        }, this.configHeader)
        .then(res => {
          if (res.data.status === 'ok') {
            this.$swal({
              type: 'success',
              icon: 'success',
              title: 'Cierre realizado con exito',
              showConfirmButton: false,
              timer: 1500
            })
            this.getProducts();
            this.getHistoryClosed()
            this.modals.modal4 = false
          }
          else{
            this.$swal({
              type: 'error',
              title: 'Ya se hizo un cierre este mes',
              showConfirmButton: false,
              timer: 1500
            })
          }
        })
        .catch(err => {
          this.$swal({
              type: 'error',
              title: 'Cierre NO realizado',
              showConfirmButton: false,
              timer: 1500
            })
        })
      },
    },
    mounted() {
        EventBus.$on('changeBranch', status => {
            this.getBranch()
        })
    }
  }
</script>
<style lang="scss">
  .card-header{
    font-size: 2.5vw;
  }
  .cursor-pointer{
    cursor: pointer;
  }
  .inventory .nav-item .active{
    background-color:#172b4d !important;
    color: white !important;
  }
  .inventory .nav-link {
    color: #172b4d !important;
  }
  .inventory .card-header{
    display:none;
  }
  .nav-item{
    padding-left: 1rem;
  }
  .inventoryTabs .nav-item:last-child{
    padding-right: 1rem !important;
  }
</style>