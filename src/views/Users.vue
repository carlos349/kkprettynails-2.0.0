<template>
    <div>
        <base-header class="header pb-4 pt-2 pt-lg-4 d-flex align-items-center"
                     style="min-height: 50px; background-image: url(img/theme/users.jpg); background-size: cover; background-position: center top;">
            <!-- Mask -->
            <span style="background-color:#172b4d !important" class="mask  opacity-7"></span>
            <!-- Header container -->
            <div class="row">
                <div class="col-12">
                    <div class="text-absolute">
                        <p class="mb-0 display-2 text-white">Usuarios</p>
                        <p class="text-white">Sección dedicada a registrar y administrar los accesos necesarios para cada usuario dentro del sistema.</p>
                    </div>
                    <base-button class="float-right mt-7 mr-0" size="sm" :disabled="validRoute('usuarios', 'registrar') ? false : true" @click="modals.modal8 = true" type="primary">
                        <a-icon type="user" class="mr-2" style="vertical-align:1px;font-size:1.2em;" />
                        Perfiles
                    </base-button>
                    <base-button class="float-right mt-7 mr-2" size="sm" :disabled="validRoute('usuarios', 'registrar') ? false : true" @click="modals.modal1 = true , initialState(2)" type="success">
                        <a-icon type="form" class="mr-2" style="vertical-align:1px;font-size:1.2em;" />
                        Registrar
                    </base-button>     
                </div>
            </div>
        </base-header>
        <modal :show.sync="modals.modal1"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-md">
               <h6 slot="header" class="modal-title" id="modal-title-default"></h6>
            <a-spin size="large" :spinning="ifRegister">
                <div class="p-3 pt-4">
                    <template>
                        <div style="margin-top:-10% !important" class="text-muted text-center mb-3">
                            Datos del usuario
                        </div>
                    </template>
                    <template>
                        <form role="form">
                            <a-select class="w-100 mb-2 mt-2" default-value="Seleccione la sucursal"  @change="selectBranch">
                                <a-select-option v-for="branch of branches" :key="branch._id" :value="branch._id">
                                    {{branch.name}}
                                </a-select-option>
                            </a-select>
                            <a-input 
                            v-model="registerUser.name"
                            placeholder="Nombre"
                            class="mb-2"
                            v-on:change="validRegister()">
                                <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
                                <i slot="suffix" class="fa fa-asterisk text-danger"></i>
                            </a-input>
                            <a-input 
                            v-model="registerUser.lastname"
                            placeholder="Apellido"
                            class="mb-2"
                            v-on:change="validRegister()">
                                <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
                                <i slot="suffix" class="fa fa-asterisk text-danger"></i>
                            </a-input>
                            <label>Imagen de perfil</label>
                            <input type="file" id="fileProfile" placeholder="Imagen de perfil" ref="file" v-on:change="handleFileUpload()" class="ant-input mb-1 pb-2" >
                            <label>Correo</label>
                            <a-input 
                            style="margin-top:-5px;"
                                v-model="registerUser.email"
                                placeholder="Correo"
                                v-on:keyup="validFields('c')"
                                class="mb-0">
                                <a-icon slot="prefix" type="mail" style="color:rgba(0,0,0,.25)" />
                                <i slot="suffix" class="fa fa-asterisk text-danger"></i>
                            </a-input>
                            <a-form-item
                            class="mt-1"
                            :validate-status="registerUser.c ? 'success' : 'error'"
                            :help="registerUser.c ? '' : 'Los correos deben coincidir'">
                                <a-input :id="registerUser.c ? 'success' : 'error'" v-model="registerUser.emailConfirm" placeholder="Confirmar correo" v-on:keyup="validFields('c')">
                                    <a-icon slot="prefix" type="mail" style="color:rgba(0,0,0,.25)" />
                                </a-input>
                            </a-form-item>
                            <label>Contraseña</label>
                            <a-input-password 
                            v-model="registerUser.password"
                            placeholder="contraseña"
                            v-on:keyup="validFields('p')"
                            class="mb-2">
                                <a-icon slot="prefix" type="key" style="color:rgba(0,0,0,.25)" />
                                <i slot="suffix" class="fa fa-asterisk text-danger"></i>
                            </a-input-password>
                            <a-form-item
                            :validate-status="registerUser.p ? 'success' : 'error'"
                            :help="registerUser.p ? '' : 'Las contraseñas deben coincidir'">
                                <a-input-password :id="registerUser.p ? 'success' : 'error'" v-model="registerUser.passwordConfirm" placeholder="Confirmar contraseña" v-on:keyup="validFields('p')">
                                    <a-icon slot="prefix" type="key" style="color:rgba(0,0,0,.25)" />
                                </a-input-password>
                            </a-form-item>
                            <div class="text-center">
                                <base-button type="primary" v-if="registerUser.valid == false" disabled class="my-2">Registrar</base-button>
                                <base-button type="primary" v-on:click="registerUsers()" v-else class="my-2">Registrar</base-button>
                            </div>
                            
                        </form>
                    </template>
                </div>
            </a-spin>
        </modal>
        <modal :show.sync="modals.modal3"
               :gradient="modals.type"
               modal-classes="modal-danger modal-dialog-centered">
            <div class="py-3 text-center">
                <i :class="modals.icon"></i>
                <h1 class="heading mt-5">{{modals.message}}</h1>
            </div>
        </modal>
        <modal :show.sync="modals.modal4"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-md">
            <card type="secondary" shadow
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-5 py-lg-5"
                  class="border-0">
                <template>
                    <div class="text-muted text-center mb-3">
                        <h3>Administre las rutas de acceso</h3>
                    </div>
                </template>
                <template>
                    <vue-custom-scrollbar ref="tableItem" class="maxHeightRoutes">
                        <vue-bootstrap4-table class="text-left" :rows="routes" :columns="columnsRoutes" :classes="classes" :config="configRoutes">
                            <template slot="name" slot-scope="props">
                                <b class="text-uppercase">{{props.row.route}}</b>
                            </template>
                            <template slot="validation" slot-scope="props">
                                <base-button class="w-100" size="sm" type="success" v-if="props.row.valid" v-on:click="selectedItem(props.row.route, props.row.valid, props.row.vbt_id)">Editar</base-button>
                                <base-button class="w-100" disabled size="sm" type="danger" v-else v-on:click="selectedItem(props.row.route, props.row.valid, props.row.vbt_id)">Editar</base-button>
                            </template>
                            <template slot="active" slot-scope="props">
                                <base-button v-on:click="addRoute(props.row.vbt_id, props.row.route, props.row.valid)" class="w-100" size="sm" type="success" icon="ni ni-check-bold" v-if="props.row.valid">
                                </base-button>
                                <base-button v-on:click="addRoute(props.row.vbt_id, props.row.route, props.row.valid)" class="w-100" size="sm" type="danger" icon="fa fa-ban" v-else></base-button>
                            </template>
                        </vue-bootstrap4-table>
                    </vue-custom-scrollbar>
                    <center>
                        <base-button class="mt-4" type="default" v-on:click="editRoutesAccess()">
                            Realizar cambios
                        </base-button>
                    </center>
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
                        <h3>Vincular prestador</h3>
                    </div>
                </template>
                <template>
                    <a-select class="input-group-alternative w-100 mb-4 mt-2" default-value="Seleccione la sucursal"  @change="selectEmploye" size="large">
                        <a-select-option v-for="lender of lenderNames" :key="lender._id" :value="lender._id">
                            {{lender.firstName}} / {{lender.document}}
                        </a-select-option>
                    </a-select>
                    <base-button type="default" v-on:click="estatusEdit(profileSelect, false, routesSelect, idSelect)">
                        Vincular
                    </base-button>  
                </template>
            </card>
        </modal>
        <modal :show.sync="modals.modal5"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-md">
            <card type="secondary" shadow
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-5 py-lg-5"
                  class="border-0">
                <template>
                    <div class="text-muted text-center mb-3">
                        <h3>Habilite las funciones de la ruta</h3>
                    </div>
                </template>
                <template>
                    <vue-custom-scrollbar class="maxHeightRoutes">
                        <vue-bootstrap4-table class="text-left" :rows="functions" :columns="columnsFunctions" :classes="classes" :config="configFunctions">
                            <template slot="validation" slot-scope="props">
                                <base-button class="w-100" size="sm" type="success" icon="ni ni-check-bold" v-if="props.row.valid" v-on:click="selected(props.row.vbt_id, props.row.valid, props.row.function)">
                                </base-button>
                                <base-button class="w-100" size="sm" type="danger" icon="fa fa-ban" v-else v-on:click="selected(props.row.vbt_id,props.row.valid, props.row.function)"></base-button>
                            </template>
                        </vue-bootstrap4-table>
                    </vue-custom-scrollbar>
                    <center>
                        <base-button class="mt-2" type="default" v-on:click="finalyFunctions(modals.modal5 = false)">
                            Finalizar
                        </base-button>
                    </center>
                </template>
            </card>
        </modal>
        <modal :show.sync="modals.modal8"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-xl">
               <span slot="header" class="modal-title p-1 m-0" id="modal-title-default"></span>
            <div class="px-5 py-2">
                <template>
                    <div class="text-muted text-center">
                        <h3>Cree perfiles de usuario</h3>
                    </div>
                </template>
                <template>
                    <div class="row p-1">
                        <div class="w-100 mb-3">
                            <h1 class=" text-center w-100 my-2">
                                Perfiles de usuarios
                            </h1>
                            <hr class="w-50 mb-0 mt-0">
                          </div>
                          <div class="col-md-4">
                              <base-input class="input-group-alternative"
                                  placeholder="Nombre del perfil de usuario"
                                  addon-left-icon="fa fa-plus"
                                  v-model="profile"
                                  v-on:keyup.enter="insertProfile">
                              </base-input>
                              <base-button outline type="default" size="sm" class="w-50" v-on:click="insertProfile">
                                  Ingresar
                              </base-button>
                          </div>
                          <a-config-provider>
                              <template  #renderEmpty>
                                  <div style="text-align: center">
                                      <a-icon type="warning" style="font-size: 20px"/>
                                      <p>No se han agregado perfiles de usuario</p>
                                  </div>
                              </template>
                              <a-tooltip placement="top">
                                  <template slot="title">
                                  <span>Los perfiles en rojo significan que no tienen niguna atribución</span>
                                  </template>
                                  <div class="col-md-8" >
                                      <a-list bordered :data-source="accessProfiles">
                                          <a-list-item slot="renderItem" slot-scope="item, index" :class="item.routes.length > 0 ? 'text-black' : ' text-danger' ">
                                              {{ item.profile }}
                                              <base-button outline v-if="item.profile != 'Gerente'" type="default" size="sm" class="float-right" v-on:click="removeProfile(index)">
                                                  <i class="fa fa-times"></i>
                                              </base-button>
                                              <base-button outline v-if="item.profile != 'Gerente'" type="default" size="sm" class="float-right mr-2" v-on:click="editProfiles(item.routes, index)">
                                                  <i class="fa fa-edit"></i>
                                              </base-button>
                                          </a-list-item>
                                      </a-list>
                                  </div>
                              </a-tooltip>
                          </a-config-provider>
                      </div>
                </template>
            </div>
        </modal>
        <modal :show.sync="modals.modal6"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-md">
               <h6 slot="header" class="modal-title p-0 m-0" id="modal-title-default"></h6>
            <card type="secondary" shadow
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-5"
                  class="border-0">
                <template>
                    <div class="text-muted text-center mb-3">
                        <h3>Administre las rutas de acceso</h3>
                        <a-tooltip>
                            <template slot="title">
                                Si al usuario que le atribuira este perfil presta servicios entonces deberá marcarlo
                            </template>
                            <a-switch class="mx-auto my-1" :checked="commission" @click="changeCommission()" checked-children="Recibe comisiones" un-checked-children="Recibe comisiones" />
                        </a-tooltip>
                    </div>
                    
                </template>
                <template>
                    <vue-custom-scrollbar ref="tableItem" class="maxHeightRoutes">
                        <vue-bootstrap4-table class="text-left" :rows="routesProfiles" :columns="columnsRoutes" :classes="classes" :config="configRoutes">
                            <template slot="name" slot-scope="props">
                                <b class="text-uppercase">{{props.row.route}}</b>
                            </template>
                            <template slot="validation" slot-scope="props">
                                <base-button class="w-100" size="sm" :disabled="props.row.valid == true ? false : true" :type="props.row.valid == true ? 'success' : 'danger'" v-on:click="editFunctions(props.row.route, props.row.functions)">Editar</base-button>
                            </template>
                            <template slot="active" slot-scope="props">
                                <base-button v-on:click="removeRoute(props.row.route, props.row.valid = false)" class="w-100" size="sm" type="success" icon="ni ni-check-bold" v-if="props.row.valid">
                                </base-button>
                                <base-button v-on:click="addRouteProfile(props.row.route, props.row.valid = true)" class="w-100" size="sm" type="danger" icon="fa fa-ban" v-else></base-button>
                            </template>
                        </vue-bootstrap4-table>
                    </vue-custom-scrollbar>
                    <center>
                        <base-button class="mt-4" type="default" v-on:click="modals.modal6 = false">
                            Listo
                        </base-button>
                    </center>
                </template>
            </card>
        </modal>

        <modal :show.sync="modals.modal7"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-md">
            <card type="secondary" shadow
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-5 py-lg-5"
                  class="border-0">
                <template>
                    <div class="text-muted text-center mb-3">
                        <h3>Habilite las funciones de la ruta</h3>
                    </div>
                </template>
                <template>
                    <vue-custom-scrollbar class="maxHeightRoutes">
                        <vue-bootstrap4-table class="text-left" :rows="functionsProfile" :columns="columnsFunctions" :classes="classes" :config="configFunctions">
                            <template slot="validation" slot-scope="props">
                                <base-button class="w-100" size="sm" type="success" icon="ni ni-check-bold" v-if="props.row.valid" v-on:click="removeFunction(props.row.function), props.row.valid = false">
                                </base-button>
                                <base-button class="w-100" size="sm" type="danger" icon="fa fa-ban" v-else v-on:click="addFunction(props.row.function), props.row.valid = true"></base-button>
                            </template>
                        </vue-bootstrap4-table>
                    </vue-custom-scrollbar>
                    <center>
                        <base-button class="mt-2" type="default" v-on:click="modals.modal7 = false">
                            Listo
                        </base-button>
                    </center>
                </template>
            </card>
        </modal>
        <!-- TABLA DE CLIENTES -->
        <a-table :columns="columns" :data-source="users" :scroll="getScreen">
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
            <template slot="date-format" class="text-left" slot-scope="record, column">
                {{formatDate(column.lastAccess)}}
            </template>
            <template slot="status-format" slot-scope="record, column">
                <a-dropdown>
                    <a-menu slot="overlay" >
                        <template v-if="accessProfiles.lenght == 0">
                            <a-menu-item v-on:click="modals.modal8 = true"> 
                                <a-icon type="user" style="vertical-align: 1.5px;" />
                                Cree perfiles de acceso 
                            </a-menu-item>
                        </template>
                        <template v-else>
                            <a-menu-item v-for="profile of accessProfiles" :key="profile.profile" v-on:click="estatusEdit(profile.profile, profile.commission, profile.routes, column._id)"> 
                                <a-icon type="user" style="vertical-align: 1.5px;" />
                                {{profile.profile}} 
                            </a-menu-item>
                        </template>
                    </a-menu>
                    <a-button class="w-100" style="margin-left: 8px"> {{column.status}} <a-icon type="down" /> </a-button>
                </a-dropdown>
            </template>
            <template slot="Administrar" slot-scope="record, column">
                <a-tooltip placement="top">
                    <template slot="title">
                        <span>Agregar accesos</span>
                    </template>
                    <base-button v-if="validRoute('usuarios', 'editar')" icon="ni ni-badge" v-on:click="dataEdit(column.access, column._id, column.email)" size="sm"  type="success" >
                    </base-button>
                    <base-button v-else size="sm" icon="ni ni-badge" type="success" disabled>
                    </base-button>
                </a-tooltip>
                <a-tooltip placement="top">
                    <template slot="title">
                    <span>Eliminar</span>
                    </template>
                    <base-button v-if="validRoute('usuarios', 'eliminar')"  size="sm" v-on:click="deleteUser(column._id)" type="warning" icon="fas fa-trash"></base-button>     
                    <base-button v-else size="sm" slot="title" type="warning" icon="fas fa-trash" disabled>
                        
                    </base-button> 
                </a-tooltip>
            </template>
        </a-table>
    </div>
</template>
<script>
//Back - End 
import axios from 'axios'
import router from '../router'
import endPoint from '../../config-endpoint/endpoint.js'
import jwtDecode from 'jwt-decode'
import EventBus from '../components/EventBus'
// COMPONENTS
import VueBootstrap4Table from 'vue-bootstrap4-table'
import vueCustomScrollbar from 'vue-custom-scrollbar'
import * as moment from 'moment';
import 'moment/locale/es';
moment.locale('es');
import mixinUserToken from '../mixins/mixinUserToken'

export default {
    mixins: [mixinUserToken],
    components: {
        VueBootstrap4Table,
        vueCustomScrollbar
    },
    data() {
      return {
        radio: {
            radio1: false
        },
        branches: [],
        configHeader: {
            headers:{
                "x-database-connect": endPoint.database, 
                "x-access-token": localStorage.userToken
            }
        },
        auth: [],
        ifRegister: false,
        registerUser: {
            name:'',
            lastname:'',
            image:'',
            email:'',
            emailConfirm:'',
            password:'',
            passwordConfirm:'',
            branch:'',
            valid:false,
            valid2:false,
            date:'',
            c:'',
            p:''
        },
        searchText: '',
        searchInput: null,
        searchedColumn: '',
        routes: [
            {route: 'procesar', valid: false},
            {route: 'metricas', valid: false},
            {route: 'usuarios', valid: false},
            {route: 'ventas', valid: false},
            {route: 'servicios', valid: false},
            {route: 'empleados', valid: false},
            {route: 'clientes', valid: false},
            {route: 'inventario', valid: false},
            {route: 'gastos', valid: false},
            {route: 'agendamiento', valid: false},
            {route: 'caja', valid: false},
            {route: 'pedidos', valid: false},
            {route: 'bodega', valid: false},
            {route: 'sucursales', valid: false}
        ],
        commission:false,
        selectedProfile: 0,
        selectedRoute: '',
        profile: '',
        functionsProfile: [],
        routesProfiles: [
            {
                route: 'procesar', 
                valid: false,
                functions: [
                    {function: 'editar', name:'Editar cliente', valid: false},
                    {function: 'nuevo_cliente', name:'Registrar cliente', valid: false},
                    {function: 'nuevo_servicio', name:'Registrar servicio', valid: false},
                    {function: 'descuento', name:'Ingresar descuento', valid: false}
                ]
            },
            {
                route: 'metricas',
                valid: false,
                functions: [
                    {function: 'filtrar', name:'Filtrar', valid: false}
                ]
            },
            {
                route: 'usuarios', 
                valid: false,
                functions: [
                    {function: 'registrar', name:'Registar', valid: false},
                    {function: 'editar', name:'Editar', valid: false},
                    {function: 'eliminar', name:'Eliminar', valid: false}
                ]
            },
            {
                route: 'ventas', 
                valid: false,
                functions: [
                    {function: 'filtrar', name:'Filtrar', valid: false},
                    {function: 'anular', name:'Anular', valid: false},
                    {function: 'detalle', name:'Ver detalle', valid: false}
                ]
            },
            {
                route: 'servicios',
                valid: false,
                functions: [
                    {function: 'ingresar', name:'Registrar', valid: false},
                    {function: 'editar', name:'Editar', valid: false},
                    {function: 'activaciones', name:'Activar o Desactivar', valid: false}
                ]
            },
            {
                route: 'empleados', 
                valid: false,
                functions: [
                    {function: 'registrar', name:'Registrar', valid: false},
                    {function: 'detalle', name:'Ver detalle', valid: false},
                    {function: 'editar', name:'Editar', valid: false},
                    {function: 'reportes', name:'Ver reporte', valid: false},
                    {function: 'cerrar ventas', name:'Cerrar ventas', valid: false},
                    {function: 'eliminar', name: 'Eliminar', valid: false},
                    {function: 'adelantos', name: 'Adelantos o Bonos', valid: false},
                    {function: 'correos', name: 'Envio de correos', valid: false}
                ]
            },
            {
                route: 'clientes', 
                valid: false,
                functions: [
                    {function: 'filtrar', name:'Filtrar', valid: false},
                    {function: 'registrar', name:'Registrar', valid: false},
                    {function: 'editar', name:'Editar', valid: false},
                    {function: 'detalle', name:'Ver detalle', valid: false},
                    {function: 'eliminar', name:'Eliminar', valid: false},
                    {function: 'correos', name:'Envio de correos', valid: false}
                ]
            },
            {
                route: 'inventario', 
                valid: false,
                functions: [
                    {function: 'filtrar', name:'Filtrar', valid: false},
                    {function: 'registrar', name:'Registrar', valid: false},
                    {function: 'editar', name:'Editar', valid: false},
                    {function: 'detalle', name:'Ver detalle', valid: false},
                    {function: 'eliminar', name:'Eliminar', valid: false}
                ]
            },
            {
                route: 'gastos', 
                valid: false,
                functions: [
                    {function: 'registrar', name:'Registrar', valid: false},
                ]
            },
            {
                route: 'agendamiento', 
                valid: false,
                functions: [
                    {function: 'filtrar', name:'Filtrar', valid: false},
                    {function: 'agendar', name:'Agendar', valid: false},
                    {function: 'todas', name:'Ver todas las agendas', valid: false},
                    {function: 'editar', name:'Editar cita', valid: false},
                    {function: 'eliminar', name:'Eliminar cita', valid: false},
                    {function: 'cerrar', name:'Cerrar cita', valid: false},
                    {function: 'finalizar', name:'Finalizar cita', valid: false},
                    {function: 'procesar', name:'Procesar', valid: false}
                ]
            },
            {
                route: 'caja', 
                valid: false,
                functions: [
                    {function: 'visualizar', name:'Ver cierres', valid: false},
                    {function: 'filtrar', name:'Filtrar', valid: false},
                    {function: 'cerrar', name:'hacer cierre', valid: false},
                    {function: 'fondo', name:'Ingresar fondos', valid: false},
                    {function: 'reporte', name:'Ver reporte del cierre', valid: false},
                    {function: 'editar', name:'Editar cierre', valid: false},
                ]
            },
            {
                route: 'pedidos', 
                valid: false,
                functions: [
                    {function: 'filtrar', name:'Filtrar', valid: false},
                    {function: 'registrar', name:'Registrar', valid: false},
                    {function: 'editar', name:'Editar', valid: false},
                    {function: 'detalle', name:'Ver detalle', valid: false},
                    {function: 'eliminar', name:'Eliminar', valid: false},
                    {function: 'correos', name:'Envio de correos', valid: false}
                ]
            },
            {
                route: 'bodega', 
                valid: false,
                functions: []
            },
            {
                route: 'sucursales', 
                valid: false,
                functions: [
                    {function: 'cambiar', name:'Elegir sucursal', valid: false},
                    {function: 'registrar', name:'Registrar sucursal', valid: false},
                    {function: 'configurar', name:'Configurar sucursal', valid: false}
                ]
            }
        ],
        functions: [],
        linkLender:'',
        lenderNames: [],
        modals: {
            modal1: false,
            modal2: false,
            modal3: false,
            modal4: false,
            modal5: false,
            modal6: false,
            modal7: false,
            modal8: false,
            message: "",
            icon: '',
            type:''
        },
        users: [],
        columns: [
            {
                title: 'Nombre',
                dataIndex: 'first_name',
                key: 'first_name',
                ellipsis: true,
                scopedSlots: {
                    filterDropdown: 'filterDropdown',
                    filterIcon: 'filterIcon',
                    customRender: 'customRender',
                },
                onFilter: (value, record) =>
                    record.first_name
                    .toString()
                    .toLowerCase()
                    .includes(value.toLowerCase()),
                onFilterDropdownVisibleChange: visible => {
                    if (visible) {
                    setTimeout(() => {
                        this.searchInput.focus();
                    }, 0);
                    }
                },
            },
            {
                title: 'Apellido',
                dataIndex: 'last_name',
                key: 'last_name',
                ellipsis: true,
                scopedSlots: {
                    filterDropdown: 'filterDropdown',
                    filterIcon: 'filterIcon',
                    customRender: 'customRender',
                },
                onFilter: (value, record) =>
                    record.last_name
                    .toString()
                    .toLowerCase()
                    .includes(value.toLowerCase()),
                onFilterDropdownVisibleChange: visible => {
                    if (visible) {
                    setTimeout(() => {
                        this.searchInput.focus();
                    }, 0);
                    }
                },
            },
            {
                title: 'Correo',
                dataIndex: 'email',
                key: 'email',
                ellipsis: true,
            },
            {
                title: 'Último acceso',
                dataIndex: 'LastAccess',
                key: 'LastAccess',
                scopedSlots: { customRender: 'date-format' },
                defaultSortOrder: 'descend',
                sorter: (a, b) => new Date(a.lastAccess).getTime() - new Date(b.lastAccess).getTime(),
                ellipsis: true,
            },
            {
                title: 'Estado',
                dataIndex: 'status',
                key: 'status',
                scopedSlots: { customRender: 'status-format' },
                ellipsis: true,
            },
            {
                title: 'Acciones',
                dataIndex: '_id',
                key: '_id',
                scopedSlots: { customRender: 'Administrar' },
            }
        ],
        config: {
            card_title: "Tabla de usuarios",
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
        columnsFunctions: [
            {
                label: "functions",
                name: "name",
                // filter: {
                //     type: "simple",
                //     placeholder: "id"
                // },
                sort: false
            },
            {
                label: "",
                name: "valid",
                slot_name: "validation",
                // filter: {
                //     type: "simple",
                //     placeholder: "id"
                // },
                sort: false
            }
        ],
        columnsRoutes: [
            {
                label: "Rutas",
                name: "route",
                slot_name:"name",
                // filter: {
                    //     type: "simple",
                //     placeholder: "id"
                // },
                sort: false,
            },
            {
                label: "",
                name: "valid",
                slot_name:"active",
                // filter: {
                    //     type: "simple",
                //     placeholder: "id"
                // },
                sort: false,
            },
            {
                label: "",
                name: "valid",
                slot_name:"validation",
                // filter: {
                //     type: "simple",
                //     placeholder: "id"
                // },
                sort: false,
            }
        ],
        configRoutes: {
            card_title: "Tabla de rutas",
            checkbox_rows: false,
            rows_selectable : false,
            highlight_row_hover_color:"rgba(238, 238, 238, 0.623)",
            global_search: {
                placeholder: "Filtre por nombre",
                visibility: true,
                case_sensitive: false
            },
            show_refresh_button: false,
            show_reset_button: false,  
            selected_rows_info: false,
            preservePageOnDataChange : false,
            pagination_info : false,
            pagination:false
        },
        configFunctions: {
            card_title: "Tabla de funciones",
            checkbox_rows: false,
            rows_selectable : false,
            highlight_row_hover_color:"rgba(238, 238, 238, 0.623)",
            global_search: {
                placeholder: "Filtre por nombre",
                visibility: true,
                case_sensitive: false
            },
            show_refresh_button: false,
            show_reset_button: false,  
            selected_rows_info: false,
            preservePageOnDataChange : false,
            pagination_info : false,
            pagination:false
        },
        classes: {
            table: "table-bordered table-striped"
        },
        idSelect: '',
        file: '',
        routesSelecteds: [],
        position:0,
        mail: '',
        accessProfiles: [],
        idProfile: '',
        profileSelect: '',
        routesSelect: []
      };
    },
    created(){
		this.getUsers();
        this.getEmployes()
        this.getToken()
        this.getBranches()
        this.getAccessProfile()
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
            this.emailUser = decoded.email
        },
        selectBranch(value){
            this.registerUser.branch = value
            this.validRegister()
        },
        selectEmploye(value){
            this.linkLender = value
        },
        changeCommission(){
            this.accessProfiles[this.selectedProfile].commission = this.accessProfiles[this.selectedProfile].commission == true ? false : true
            if (this.accessProfiles[this.selectedProfile].commission) {
                this.commission = true
            }else{
                this.commission = false
            }
            this.updateconfig()
        },
        editFunctions(route, functions){
            for (let i = 0; i < this.accessProfiles[this.selectedProfile].routes.length; i++) {
                const elementOne = this.accessProfiles[this.selectedProfile].routes[i];
                if (elementOne.ruta == route) {
                    this.selectedRoute = i
                    functions.forEach(function (elementTwo, index) {
                        functions[index].valid = false
                        elementOne.validaciones.forEach(elementThree => {
                            if (elementTwo.function == elementThree) {
                                functions[index].valid = true
                            }
                        });
                    });
                }
            }
            this.functionsProfile = functions
            this.modals.modal7 = true
            console.log(this.functionsProfile)
        },
        removeRoute(route){
            for (let i = 0; i < this.accessProfiles[this.selectedProfile].routes.length; i++) {
                const element = this.accessProfiles[this.selectedProfile].routes[i];
                if (element.ruta == route) {
                    this.accessProfiles[this.selectedProfile].routes.splice(i, 1)
                }
            }
            this.updateconfig()
        },
        insertProfile(){
          var valid = true
            this.accessProfiles.forEach(element => {
              if (element == this.profile) {
                this.$swal({
                    icon: 'error',
                    title: 'Este perfil ya se encuentra registrado',
                    showConfirmButton: false,
                    timer: 1500
                })
                valid = false
              }
            });
            if (valid) {
              if (this.profile.length > 2) {
                  this.accessProfiles.push({profile:this.profile, routes:[], commission:false})
                  this.profile = ''
                  this.updateconfig()
              }else if (this.profile.length <= 2) {
                  this.$swal({
                      icon: 'error',
                      title: 'El nombre del perfil debe estar compuesto por mas de 2 caracteres',
                      showConfirmButton: false,
                      timer: 1500
                  })
              }else{
                  this.$swal({
                      icon: 'error',
                      title: 'Debe llenar el campo',
                      showConfirmButton: false,
                      timer: 1500
                  })
              }
            }
        },
        addRouteProfile(route){
            this.accessProfiles[this.selectedProfile].routes.push({ruta:route, validaciones:[]})
            this.updateconfig()
        },
        removeFunction(value){
            for (let i = 0; i < this.accessProfiles[this.selectedProfile].routes[this.selectedRoute].validaciones.length; i++) {
                const element = this.accessProfiles[this.selectedProfile].routes[this.selectedRoute].validaciones[i];
                if (element == value) {
                this.accessProfiles[this.selectedProfile].routes[this.selectedRoute].validaciones.splice(i, 1)
                }
            }
            this.updateconfig()
        },
        addFunction(value){
            this.accessProfiles[this.selectedProfile].routes[this.selectedRoute].validaciones.push(value)
            this.updateconfig()
        },
        removeProfile(index){
            this.$swal({
                title: '¿Está seguro de borrar el perfil? Se eliminara toda su configuración',
                text: 'No puedes revertir esta acción',
                type: 'warning',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí',
                cancelButtonText: 'No, cancelar',
                showCloseButton: true,
                showLoaderOnConfirm: true
            }).then((result) => {
                if(result.value) {
                    this.accessProfiles.splice(index, 1)
                    this.updateconfig()
                }
                else{
                    this.$swal({
                        type: 'error',
                        icon: 'error',
                        title: 'Accion cancelada',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
        },
        editProfiles(routes, index){
            this.routesProfiles.forEach(element => {
                element.valid = false
                routes.forEach(elementTwo => {
                    if (element.route == elementTwo.ruta) {
                        element.valid = true
                    }
                });
            });
            if (this.accessProfiles[index].commission) {
                this.commission = true
            }
            this.selectedProfile = index
            this.modals.modal6 = true
        },
        async updateconfig(){
            try {
                const changeProfile = await axios.put(endPoint.endpointTarget+'/configurations/editProfiles/'+this.idProfile, {
                    profiles: this.accessProfiles
                }, this.configHeader)
                if(changeProfile.data.status == 'ok'){
                    this.$swal({
                        type: 'success',
                        icon: 'success',
                        toast: true,
                        position: 'top-end',
                        title: 'Cambio exitoso',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            } catch (error) {
                
            }
        },
        async getAccessProfile(){
            try {
                const getProfiles = await axios.get(endPoint.endpointTarget+'/configurations/profiles', this.configHeader)
                    console.log(getProfiles)
                if (getProfiles.data.status == 'ok') {
                    this.accessProfiles = getProfiles.data.data[0].profiles
                    this.idProfile = getProfiles.data.data[0]._id
                }
            } catch (error) {
                console.log(error)
            }
        },
        async getBranches(){
            try {
                const getBranches = await axios.get(endPoint.endpointTarget+'/branches', this.configHeader)
                if (getBranches.data.status == 'ok') {
                    this.branches = getBranches.data.data  
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
        dataEdit(access, id, mail){ 
            this.routes = [
                {route: 'procesar', valid: false},
                {route: 'metricas', valid: false},
                {route: 'usuarios', valid: false},
                {route: 'ventas', valid: false},
                {route: 'servicios', valid: false},
                {route: 'empleados', valid: false},
                {route: 'clientes', valid: false},
                {route: 'inventario', valid: false},
                {route: 'gastos', valid: false},
                {route: 'agendamiento', valid: false},
                {route: 'caja', valid: false},
                {route: 'pedidos', valid: false},
                {route: 'bodega', valid: false},
                {route: 'sucursales', valid: false}
            ]
            this.mail = mail 
            this.idAccess = id
            this.routesSelecteds = []
            for (let index = 0; index < access.length; index++) {
                const element = access[index];
                for (let indexTwo = 0; indexTwo < this.routes.length; indexTwo++) {
                    const elementTwo = this.routes[indexTwo];
                    if (elementTwo.route == element.ruta) {
                        elementTwo.valid = true
                    }
                }
                this.routesSelecteds.push(element)
            }
            console.log(this.routesSelecteds)
             this.modals = {
                modal1: false,
                modal2: false,
                modal3: false,
                modal4: true,
                modal5: false,
                message: "",
                icon: '',
                type:''
            }
        },
        selectedItem(route, valid, index){
            for (let i = 0; i < this.routesSelecteds.length; i++) {
                const element = this.routesSelecteds[i];
                if (route == element.ruta) {
                    this.position = i
                }
            }
            this.modals = {
                modal1: false,
                modal2: false,
                modal3: false,
                modal4: true,
                modal5: true,
                message: "",
                icon: '',
                type:''
            }
            if (route == 'metricas') {
                this.functions = [
                    {function: 'filtrar', name:'Filtrar', valid: false}
                ]
            }else if (route == 'usuarios') {
                this.functions = [
                    {function: 'registrar', name:'Registar', valid: false},
                    {function: 'editar', name:'Editar', valid: false},
                    {function: 'eliminar', name:'Eliminar', valid: false}
                ]
            }else if (route == 'ventas') {
                this.functions = [
                    {function: 'filtrar', name:'Filtrar', valid: false},
                    {function: 'anular', name:'Anular', valid: false},
                    {function: 'detalle', name:'Ver detalle', valid: false},
                ]
            }else if (route == 'servicios') {
                this.functions = [
                    {function: 'ingresar', name:'Registrar', valid: false},
                    {function: 'editar', name:'Editar', valid: false},
                    {function: 'activaciones', name:'Activar o Desactivar', valid: false},
                ]
            }else if (route == 'empleados') {
                this.functions = [
                    {function: 'registrar', name:'Registrar', valid: false},
                    {function: 'detalle', name:'Ver detalle', valid: false},
                    {function: 'editar', name:'Editar', valid: false},
                    {function: 'reportes', name:'Ver reporte', valid: false},
                    {function: 'cerrar ventas', name:'Cerrar ventas', valid: false},
                    {function: 'eliminar', name: 'Eliminar', valid: false},
                    {function: 'adelantos', name: 'Adelantos o Bonos', valid: false},
                    {function: 'correos', name: 'Envio de correos', valid: false},
                ]
            }else if (route == 'clientes') {
                this.functions = [
                    {function: 'filtrar', name:'Filtrar', valid: false},
                    {function: 'registrar', name:'Registrar', valid: false},
                    {function: 'editar', name:'Editar', valid: false},
                    {function: 'detalle', name:'Ver detalle', valid: false},
                    {function: 'eliminar', name:'Eliminar', valid: false},
                    {function: 'correos', name:'Envio de correos', valid: false}
                ]
            }else if (route == 'pedidos') {
                this.functions = [
                    {function: 'filtrar', name:'Filtrar', valid: false},
                    {function: 'registrar', name:'Registrar', valid: false},
                    {function: 'editar', name:'Editar', valid: false},
                    {function: 'detalle', name:'Ver detalle', valid: false},
                    {function: 'eliminar', name:'Eliminar', valid: false},
                    {function: 'correos', name:'Envio de correos', valid: false}
                ]
            }else if (route == 'inventario') {
                this.functions = [
                    {function: 'filtrar', name:'Filtrar', valid: false},
                    {function: 'registrar', name:'Registrar', valid: false},
                    {function: 'editar', name:'Editar', valid: false},
                    {function: 'detalle', name:'Ver detalle', valid: false},
                    {function: 'eliminar', name:'Eliminar', valid: false}
                ]
            }else if (route == 'gastos') {
                this.functions = [
                    {function: 'registrar', name:'Registrar', valid: false},
                ]
            }else if (route == 'agendamiento') {
                this.functions = [
                    {function: 'filtrar', name:'Filtrar', valid: false},
                    {function: 'agendar', name:'Agendar', valid: false},
                    {function: 'todas', name:'Ver todas las agendas', valid: false},
                    {function: 'editar', name:'Editar cita', valid: false},
                    {function: 'eliminar', name:'Eliminar cita', valid: false},
                    {function: 'cerrar', name:'Cerrar cita', valid: false},
                    {function: 'finalizar', name:'Finalizar cita', valid: false},
                    {function: 'procesar', name:'Procesar', valid: false}
                ]
            }else if (route == 'caja') {
                this.functions = [
                    {function: 'visualizar', name:'Ver cierres', valid: false},
                    {function: 'filtrar', name:'Filtrar', valid: false},
                    {function: 'cerrar', name:'hacer cierre', valid: false},
                    {function: 'fondo', name:'Ingresar fondos', valid: false},
                    {function: 'reporte', name:'Ver reporte del cierre', valid: false},
                    {function: 'editar', name:'Editar cierre', valid: false},
                ]
            }else if (route == 'procesar') {
                this.functions = [
                    {function: 'editar', name:'Editar cliente', valid: false},
                    {function: 'nuevo_cliente', name:'Registrar cliente', valid: false},
                    {function: 'nuevo_servicio', name:'Registrar servicio', valid: false},
                    {function: 'descuento', name:'Ingresar descuento', valid: false},
                ]
            }else if (route == 'sucursales') {
                this.functions = [
                    {function: 'cambiar', name:'Elegir sucursal', valid: false},
                    {function: 'registrar', name:'Registrar sucursal', valid: false},
                    {function: 'configurar', name:'Configurar sucursal', valid: false},
                ]
            }
            for (let index = 0; index < this.functions.length; index++) {
                const element = this.functions[index];
                for (let indexTwo = 0; indexTwo < this.routesSelecteds[this.position].validaciones.length; indexTwo++) {
                    const elementTwo = this.routesSelecteds[this.position].validaciones[indexTwo];
                    if (element.function == elementTwo) {
                        element.valid = true
                    }
                }
            }
        },
        addRoute(index, route, valid){
            const position = index - 1
            if (valid == true) {
                console.log(position)
                this.routes[position].valid = false
                for (let index = 0; index < this.routes.length; index++) {
                    const element = this.routes[index];
                    for (let indexTwo = 0; indexTwo < this.routesSelecteds.length; indexTwo++) {
                        const elementTwo = this.routesSelecteds[indexTwo];
                        if (route == elementTwo.ruta) {
                            this.routesSelecteds.splice(indexTwo, 1)
                        }
                    }
                }

            }else{
                this.routes[position].valid = true
                this.routesSelecteds.push({ruta: route, validaciones: []})
            }
        },
        finalyFunctions(){
            this.modals.modal5 = false  
        },
        selected(vbt_id, valid, func){
            if (valid) {
                this.functions[vbt_id - 1].valid = false
                for (let index = 0; index < this.routesSelecteds[this.position].validaciones.length; index++) {
                    const element = this.routesSelecteds[this.position].validaciones[index];
                    if (element == func) {
                        this.routesSelecteds[this.position].validaciones.splice(index, 1)
                    }
                }
            }else{
                this.functions[vbt_id - 1].valid = true
                this.routesSelecteds[this.position].validaciones.push(func)
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
        handleFileUpload(){
            this.file = this.$refs.file.files[0]
            console.log(this.file)
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
        editRoutesAccess(){
            axios.put(endPoint.endpointTarget+'/users/editAccess/'+this.idAccess,{
                access: this.routesSelecteds,
                email: this.mail
            }, this.configHeader)
            .then(res => {
                if (res.data.status == 'ok') {
                    this.getUsers();
                    this.$swal({
                        icon: 'success',
                        title: 'Accesos actualizados con éxito',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    const token = localStorage.userToken
                    const decoded = jwtDecode(token)
                    if (this.mail == decoded.email) {
                        EventBus.$emit('loggedin-user', this.routesSelecteds)
                    }
                    localStorage.setItem('userToken', res.data.token)
                    this.routesSelecteds = []
                }else{
                    this.modals = {
                        modal1: false,
                        modal2: false,
                        modal3: true,
                        modal4: false,
                        modal5: false,
                        message: "No se pudo relizar la acción",
                        icon: 'ni ni-fat-remove ni-5x',
                        type: 'danger'
                    }
                    setTimeout(() => {
                        this.modals = {
                            modal1: false,
                            modal2: false,
                            modal3: false,
                            modal4: false,
                            modal5: false,
                            message: "",
                            icon: '',
                            type: ''
                        }
                    }, 2000);
                }
            })
        },
        registerUsers(){
            this.ifRegister = true
            let formData = new FormData();
            formData.append('image', this.file)
            formData.append('first_name', this.registerUser.name)
            formData.append('last_name', this.registerUser.lastname)
            formData.append('email', this.registerUser.email)
            formData.append('password', this.registerUser.password)
            formData.append('branch', this.registerUser.branch)
            const config = {headers: {'Content-Type': 'multipart/form-data', 'x-access-token': localStorage.userToken, "x-database-connect": endPoint.database }}
            axios.post(endPoint.endpointTarget+'/users/registerUser', formData, config)
            .then(res => {
                if (res.data.status == 'ok') {
                    this.$swal({
                        icon: 'success',
                        title: '¡Usuario registrado con éxito!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.modals.modal1 = false
                    this.initialState(1)
                    this.ifRegister = false
                    this.getUsers()
                }else{
                    this.ifRegister = false
                    this.$swal({
                        icon: 'error',
                        title: '¡Usuario ya existe use otro correo!',
                        showConfirmButton: false,
                        timer: 2000
                    })
                }
            }).catch(err => {
                this.ifRegister = false
                this.$swal({
					icon: 'error',
					title: 'Acceso invalido, ingrese de nuevo, si el problema persiste comuniquese con el proveedor del servicio',
					showConfirmButton: false,
					timer: 2500
				})
            })
        },
        async getUsers(){
            try {
                const getUsers = await axios.get(endPoint.endpointTarget+'/users', this.configHeader)
                this.users = getUsers.data.data
                localStorage.setItem('userToken', getUsers.data.token)
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
                const getEmployes = await axios.get(endPoint.endpointTarget+'/employes', this.configHeader)
                if (getEmployes.data.status == 'ok') {
                    this.lenderNames = getEmployes.data.data
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
        validRegister(){
            if (this.registerUser.email.split('@')[1]) {
                if (this.registerUser.email.split('@')[1].split('.')[1]) {
                    this.registerUser.valid = this.registerUser.name != '' && this.registerUser.lastname != '' && this.registerUser.c == true && this.registerUser.p == true && this.registerUser.branch != '' ? true : false
                }
            }
        },
        validFields(field){
            if (field == 'c') {
                this.registerUser.c = this.registerUser.email == this.registerUser.emailConfirm ? true : false
                this.validRegister()
            }
            if (field == 'p') {
                this.registerUser.p = this.registerUser.password == this.registerUser.passwordConfirm ? true : false
                this.validRegister()
            } 
        },
        initialState(val){
            this.registerUser = {
                name:'',
                lastname:'',
                image:'',
                email:'',
                emailConfirm:'',
                password:'',
                passwordConfirm:'',
                branch:'',
                valid:false,
                valid2:false,
                date:'',
                c:'',
                p:''
            }
            this.file = ''
            if (val == 2) {
                this.tipeForm = 'Registrar'
            }
            if (val == 3) {
                this.tipeForm = 'Editar'
            }
        },
        formatDate(date) {
            let dateFormat = new Date(date)
            return moment(dateFormat).format('DD-MM-YYYY HH:mm');
        },
        deleteUser(id){
			this.$swal({
				title: '\n¿Está seguro de borrar usuario?',
				text: 'No puedes revertir esta acción',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Sí',
				cancelButtonText: 'No, cancelar',
				showCloseButton: true,
				showLoaderOnConfirm: true
			}).then((result) => {
				if(result.value) {
                    var idDecoded = jwtDecode(localStorage.userToken)
					if(id == idDecoded._id){
                        this.$swal({
                            icon: 'error',
                            title: 'No puede borrar su propio usuario.',
                            showConfirmButton: false,
                            timer: 1500
                        })
					}else{
						axios.delete(endPoint.endpointTarget+'/users/'+id, this.configHeader)
						.then(res => {
                            this.$swal({
                                icon: 'success',
                                title: 'Usuario borrado con éxito',
                                showConfirmButton: false,
                                timer: 1500
                            })
							this.getUsers()
						})
						.catch(err => {
							this.$swal({
								icon: 'error',
								title: 'Acceso invalido, ingrese de nuevo, si el problema persiste comuniquese con el proveedor del servicio',
								showConfirmButton: false,
								timer: 2500
							})
							router.push({name: 'login'})
						})
					}
				} else {
					this.$swal({
                        icon: 'info',
                        title: 'Acción',
                        showConfirmButton: false,
                        timer: 2500
                    })
				}
			})
		},
        estatusEdit(profile, ifcommission, routes, id){
            this.profileSelect = profile
            this.routesSelect = routes
            if (ifcommission) {
                this.modals.modal2 = true
                this.idSelect = id
            }else{
                axios.put(endPoint.endpointTarget+'/users/changestatus/'+id, {
                    status: profile,
                    routes: routes,
                    employe: this.linkLender
                }, this.configHeader)
                .then(res => {
                    this.$swal({
                        icon: 'success',
                        title: 'Estatus editado con éxito',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.getUsers()
                    this.linkLender = ''
                    this.modals.modal2 = false
                })
                .catch(err => {
                    this.$swal({
                        icon: 'error',
                        title: 'Acceso invalido, ingrese de nuevo, si el problema persiste comuniquese con el proveedor del servicio',
                        showConfirmButton: false,
                        timer: 2500
                    })
                    router.push({name: 'Login'})
                })
            }
		},
    },
    computed: {
        getScreen: () => {
            return screen.width < 780 ? { x: 'calc(700px + 50%)', y: 240 } : { y: 'auto' }
        }
    }
};
</script>
<style lang="scss">
    .has-success::after {
        right: 28px !important;
    }
    .card-header{
        font-size: 2.5vw;
    }
    .cursor-pointer{
        cursor: pointer;
    }
    .maxHeightRoutes{
        max-height: 450px;
        overflow: scroll;
    }
    // .maxHeightRoutes th .custom-checkbox{
    //     display: none;
    // }
    .maxHeightRoutes .card-header{
        display:none;
    }
    .maxHeightRoutes .card-footer{
        display:none;
    }
    .dropdown-menu{
        z-index: 10000 !important;
    }
    .highlight {
        background-color: rgb(255, 192, 105);
        padding: 0px;
    }
</style>