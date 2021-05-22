<template>
    <div>
        <base-header class="header pb-3 pt-2 pt-lg-4 d-flex align-items-center"
                     style="min-height: 50px; background-image: url(img/theme/users.jpg); background-size: cover; background-position: center top;">
            <!-- Mask -->
            <span style="background-color:#172b4d !important" class="mask opacity-7"></span>
            <!-- Header container -->
            <div class="row">
                <div class="col-12">
                    <div class="text-absolute">
                        <p class="mb-0 display-2 text-white">Sucursales</p>
                        <p class="text-white">Esta es la sección administrativa de tus caja, aquí podrás registrar, editar y visualizar todos los cierres de caja.</p>
                    </div>
                    <base-button class="float-right mt-7" v-if="validRoute('caja', 'fondo')" size="sm" type="success" style="font-size:1em;" @click="modals.modal1 = true" ><a-icon type="form" class="mr-2" style="vertical-align:1px;font-size:1.2em;" /> Registrar</base-button>
                </div>
            </div>
            
        </base-header>
        <a-config-provider>
            <template #renderEmpty>
                <div style="text-align: center">
                    <a-icon type="warning" style="font-size: 20px" />
                    <h2 v-if="!validRoute('caja', 'visualizar')">No tiene los permisos para visualizar cierres.</h2>
                    <h2 v-else>Sucursal sin cierres registrados.</h2>
                </div>
            </template>
            <a-table :columns="columns" :loading="progress" :data-source="branches" :scroll="getScreen">
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
                    <template slot="actionButtons" class="mx-auto" slot-scope="record, column">
                        <router-link :to="{ path: '/configuration', query: { id: column._id }}">
                            <base-button class="text-center" icon="ni ni-settings-gear-65" size="sm" type="default" >
                                Configurar
                            </base-button> 
                        </router-link>
                </template>
                <template slot="format-date" slot-scope="record, column">
                    {{formatDate(column.createdAt)}}
                </template>
            </a-table>
        </a-config-provider>
         <modal :show.sync="modals.modal1"
               modal-classes="modal-dialog-centered modal-xl">
               <h6 slot="header" class="modal-title" id="modal-title-default">
                   <h3>Registre una sucursal</h3>
               </h6>
            <card type="secondary" shadow
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-5 py-lg-5"
                  class="border-0">
                <template>
                    <div class="stepsBar">
                        <a-steps>
                            <a-step :status="status.branch" title="Sucursal">
                                <a-icon slot="icon" :type="status.branch == 'process' ? 'loading' : 'shop'" />
                            </a-step>
                            <a-step :status="status.date" title="Agenda">
                                <a-icon slot="icon" :type="status.date == 'process' ? 'loading' : 'calendar'" />
                            </a-step>
                            <a-step :status="status.sale" title="Ventas">
                                <a-icon slot="icon" :type="status.sale == 'process' ? 'loading' : 'credit-card'" />
                            </a-step> 
                        </a-steps>
                    </div>
                    <div class="stepsBox mt-5">
                        <div v-if="process == 'branch'" class="branch mt-4">
                            <div class="row mt-5">
                                <div class="col-md-6 col-sm-12">
                                    <a-icon class="ml-2" style="cursor: pointer;vertical-align: 0.05em;" type="question-circle" />
                                    <label class="ml-2" for="branch">
                                        Nombre de la sucursal
                                    </label>
                                    <base-input class="input-group-alternative"
                                        placeholder="Nombre de la sucursal"
                                        addon-left-icon="ni ni-shop"
                                        v-model="modelStart.businessName"
                                        :valid="modelStart.businessName.length >= 4 ? true : false">
                                    </base-input>
                                </div>
                                <div class="col-md-6 col-sm-12 row pr-0">
                                    <label class="ml-4 w-100" for="phone">
                                        Número de contacto
                                    </label>
                                    <div class="col-3">
                                        <base-input class="input-group-alternative"
                                            placeholder="+56"
                                            v-model="modelStart.businessPhoneCode"
                                        >
                                        </base-input>
                                    </div>
                                    <div class="col-9 px-0">
                                        <base-input class="input-group-alternative"
                                            placeholder="Teléfono"
                                            type='number'
                                            addon-left-icon="fa fa-phone"
                                            v-model="modelStart.businessPhone">
                                        </base-input>
                                    </div>
                                </div>
                                <div class="col-md-6 col-sm-12">
                                    <label class="ml-2 w-100" for="location">
                                        Dirección del local
                                    </label>
                                    <base-input class="input-group-alternative"
                                        placeholder="Dirección"
                                        addon-left-icon="fa fa-location-arrow"
                                        v-model="modelStart.businessLocation"
                                        :valid="modelStart.businessLocation.length >= 4 ? true : false">
                                    </base-input>
                                </div>
                                <div class="col-md-6 col-sm-12">
                                    <label class="ml-2 w-100" for="bussiness">
                                        Tipo de negocio
                                    </label>
                                    <a-select
                                            show-search
                                            placeholder="Seleccionar negocio"
                                            option-filter-prop="children"
                                            style="width: 100%"
                                            class="input-group-alternative"
                                            size="large"
                                            :filter-option="filterOption"
                                            @change="handleChange"
                                        >
                                        <a-select-option value="nails">
                                            Spa de uñas
                                        </a-select-option>
                                        <a-select-option value="barber">
                                            Barberia
                                        </a-select-option>
                                        <a-select-option value="stylish">
                                            Peluquería
                                        </a-select-option>
                                    </a-select>
                                </div>
                            </div>
                            <base-button outline type="default" class="float-right mt-2" v-on:click="nextStep('branch')">
                                Siguiente
                            </base-button>
                        </div>
                        <div v-else-if="process == 'date'" class="data mt-4">
                            <h1 class="text-uppercase text-center mb-4">
                                Configura tu agenda
                            </h1>
                            <hr class="w-50">
                            
                            <h3 class="text-weigth-bold text-center">
                                <a-tooltip placement="topLeft">
                                    <template slot="title">
                                        <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem reiciendis in labore voluptatibus tempora, amet cum culpa cupiditate laborum consequatur voluptate repudiandae modi dolorum fuga necessitatibus dolores eum consectetur dolore?</span>
                                    </template>
                                    <a-icon class="mr-2" style="cursor: pointer;vertical-align: 0.1em;" type="question-circle" />
                                </a-tooltip>
                                Configura tu agenda
                            </h3>
                            <div class="row">
                                <div class="col-4">
                                    <base-button :type="days.monday" size="sm" class="mt-2 w-100" v-on:click="salectDay('monday')">
                                        Lunes
                                    </base-button>
                                    <base-button :type="days.tuesday" size="sm" class="mt-2 w-100" v-on:click="salectDay('tuesday')">
                                        Martes
                                    </base-button>
                                    <base-button :type="days.wednesday" size="sm" class="mt-2 w-100" v-on:click="salectDay('wednesday')">
                                        Miércoles
                                    </base-button>
                                    <base-button :type="days.thursday" size="sm" class="mt-2 w-100" v-on:click="salectDay('thursday')">
                                        Jueves
                                    </base-button>
                                    <base-button :type="days.friday" size="sm" class="mt-2 w-100" v-on:click="salectDay('friday')">
                                        Viernes
                                    </base-button>
                                    <base-button :type="days.saturday" size="sm" class="mt-2 w-100" v-on:click="salectDay('saturday')">
                                        Sábado
                                    </base-button>
                                    <base-button :type="days.sunday" size="sm" class="mt-2 w-100" v-on:click="salectDay('sunday')">
                                        Domingo
                                    </base-button>
                                </div>
                                <div class="col-8">
                                    <a-select :disabled="modelStart.blockHour[1].status == true ? false : true" style="width:40%" class="mx-2 mt-1 input-group-alternative" placeholder="Desde" v-model="modelStart.blockHour[1].start">
                                        <a-select-option v-for="i in fromArray" :key="i">
                                            {{i}}
                                        </a-select-option>
                                    </a-select>
                                    <a-select :disabled="modelStart.blockHour[1].status == true ? false : true" style="width:40%" class="mx-2 mt-1 input-group-alternative" placeholder="Hasta" v-model="modelStart.blockHour[1].end">
                                        <a-select-option v-for="i in toArray" :key="i">
                                            {{i}}
                                        </a-select-option>
                                    </a-select>

                                    <a-select :disabled="modelStart.blockHour[2].status == true ? false : true" style="width:40%" class="mx-2 mt-1 input-group-alternative" placeholder="Desde" v-model="modelStart.blockHour[2].start">
                                        <a-select-option v-for="i in fromArray" :key="i">
                                            {{i}}
                                        </a-select-option>
                                    </a-select>
                                    <a-select :disabled="modelStart.blockHour[2].status == true ? false : true" style="width:40%" class="mx-2 mt-1 input-group-alternative" placeholder="Hasta" v-model="modelStart.blockHour[2].end">
                                        <a-select-option v-for="i in toArray" :key="i">
                                            {{i}}
                                        </a-select-option>
                                    </a-select>
                                    
                                    <a-select :disabled="modelStart.blockHour[3].status == true ? false : true" style="width:40%" class="mx-2 mt-1 input-group-alternative" placeholder="Desde" v-model="modelStart.blockHour[3].start">
                                        <a-select-option v-for="i in fromArray" :key="i">
                                            {{i}}
                                        </a-select-option>
                                    </a-select>
                                    <a-select :disabled="modelStart.blockHour[3].status == true ? false : true" style="width:40%" class="mx-2 mt-1 input-group-alternative" placeholder="Hasta" v-model="modelStart.blockHour[3].end">
                                        <a-select-option v-for="i in toArray" :key="i">
                                            {{i}}
                                        </a-select-option>
                                    </a-select>

                                    <a-select :disabled="modelStart.blockHour[4].status == true ? false : true" style="width:40%" class="mx-2 mt-1 input-group-alternative" placeholder="Desde" v-model="modelStart.blockHour[4].start">
                                        <a-select-option v-for="i in fromArray" :key="i">
                                            {{i}}
                                        </a-select-option>
                                    </a-select>
                                    <a-select :disabled="modelStart.blockHour[4].status == true ? false : true" style="width:40%" class="mx-2 mt-1 input-group-alternative" placeholder="Hasta" v-model="modelStart.blockHour[4].end">
                                        <a-select-option v-for="i in toArray" :key="i">
                                            {{i}}
                                        </a-select-option>
                                    </a-select>

                                    <a-select :disabled="modelStart.blockHour[5].status == true ? false : true" style="width:40%" class="mx-2 mt-1 input-group-alternative" placeholder="Desde" v-model="modelStart.blockHour[5].start">
                                        <a-select-option v-for="i in fromArray" :key="i">
                                            {{i}}
                                        </a-select-option>
                                    </a-select>
                                    <a-select :disabled="modelStart.blockHour[5].status == true ? false : true" style="width:40%" class="mx-2 mt-1 input-group-alternative" placeholder="Hasta" v-model="modelStart.blockHour[5].end">
                                        <a-select-option v-for="i in toArray" :key="i">
                                            {{i}}
                                        </a-select-option>
                                    </a-select>

                                    <a-select :disabled="modelStart.blockHour[6].status == true ? false : true" style="width:40%" class="mx-2 mt-1 input-group-alternative" placeholder="Desde" v-model="modelStart.blockHour[6].start">
                                        <a-select-option v-for="i in fromArray" :key="i">
                                            {{i}}
                                        </a-select-option>
                                    </a-select>
                                    <a-select :disabled="modelStart.blockHour[6].status == true ? false : true" style="width:40%" class="mx-2 mt-1 input-group-alternative" placeholder="Hasta" v-model="modelStart.blockHour[6].end">
                                        <a-select-option v-for="i in toArray" :key="i">
                                            {{i}}
                                        </a-select-option>
                                    </a-select>

                                    <a-select :disabled="modelStart.blockHour[0].status == true ? false : true" style="width:40%" class="mx-2 mt-1 input-group-alternative" placeholder="Desde" v-model="modelStart.blockHour[0].start">
                                        <a-select-option v-for="i in fromArray" :key="i">
                                            {{i}}
                                        </a-select-option>
                                    </a-select>
                                    <a-select :disabled="modelStart.blockHour[0].status == true ? false : true" style="width:40%" class="mx-2 mt-1 input-group-alternative" placeholder="Hasta" v-model="modelStart.blockHour[0].end">
                                        <a-select-option v-for="i in toArray" :key="i">
                                            {{i}}
                                        </a-select-option>
                                    </a-select>
                                </div>
                            </div>
                            <base-button outline type="default" class="float-left mt-2" v-on:click="prevStep('date')">
                                Anterior
                            </base-button>
                            <base-button outline type="default" class="float-right mt-3" v-on:click="nextStep('date')">
                                Siguiente
                            </base-button>
                        </div>
                        <div v-else-if="process == 'sale'" class="data mt-4">
                            <h1 class="text-uppercase text-center mb-4">
                                Crea tus tipos de pago
                            </h1>
                            <hr class="w-50">
                            <div class="row">
                                <div class="col-md-4">
                                    <base-input class="input-group-alternative"
                                        placeholder="Debito"
                                        addon-left-icon="fa fa-plus"
                                        v-model="typePay"
                                        v-on:keyup.enter="insertTypePay">
                                    </base-input>
                                    <base-button outline type="default" size="sm" class="w-50" v-on:click="insertTypePay">
                                        Ingresar
                                    </base-button>
                                    <label class="mt-4" for="currency">
                                        Seleccione su moneda local
                                    </label>
                                    <a-select class="input-group-alternative" default-value="CLP" style="width: 100%" @change="selectCurrency" size="large">
                                        <a-select-option value="USD">
                                            USD
                                        </a-select-option>
                                        <a-select-option value="EUR">
                                            EUR
                                        </a-select-option>
                                        <a-select-option value="CLP" >
                                            CLP
                                        </a-select-option>
                                        <a-select-option value="COP">
                                            COP
                                        </a-select-option>
                                        <a-select-option value="ARG">
                                            ARG
                                        </a-select-option>
                                        <a-select-option value="VES">
                                            VES
                                        </a-select-option>
                                    </a-select>
                                </div>
                                <a-config-provider>
                                    <template  #renderEmpty>
                                        <div style="text-align: center">
                                            <a-icon type="warning" style="font-size: 20px" />
                                            <p>No se han agregado metodos de pago</p>
                                        </div>
                                    </template>
                                    <a-tooltip placement="top">
                                        <template slot="title">
                                        <span>Para ingresar un método de pago debes escribirlo en el cuadro de texto y darle click en <b>Ingresar</b> o presionar la tecla <b>Enter</b> </span>
                                        </template>
                                        <div class="col-md-8" style="overflow: hidden;overflow-y:scroll; max-height: 200px;">
                                            <a-list bordered :data-source="modelStart.typesPay">
                                                <a-list-item slot="renderItem" slot-scope="item, index">
                                                    {{ item }} 
                                                    <base-button v-if="item != 'Efectivo'" outline type="default" size="sm" class="float-right" v-on:click="removeTypePay(index)">
                                                        <i class="fa fa-times"></i>
                                                    </base-button>
                                                </a-list-item>
                                            </a-list>
                                        </div>
                                    </a-tooltip>
                                </a-config-provider>
                            </div>
                            <base-button outline type="default" class="float-left mt-2" v-on:click="prevStep('sale')">
                                Anterior
                            </base-button>
                            <base-button outline type="default" class="float-right mt-3" v-on:click="finishProcess()">
                                Finalizar
                            </base-button>
                        </div>
                    </div>
                </template>
            </card>
        </modal>
    </div>
</template>
<script>
//Back - End 
import axios from 'axios'
import router from '../router'
import endPoint from '../../config-endpoint/endpoint.js'
import jwtDecode from 'jwt-decode'
// COMPONENTS
import EventBus from '../components/EventBus'
import * as moment from 'moment';
import 'moment/locale/es';
moment.locale('es');
export default {
    data(){
        return {
            configHeader: {
                headers:{
                    "x-database-connect": endPoint.database, 
                    "x-access-token": localStorage.userToken
                }
            },
            modals: {
                modal1: false
            },
            status: {
                branch: 'process',
                date: 'wait',
                sale: 'wait'
            },
            process: 'branch',
            typePay: '',
            modelStart: {
                email: '',
                password: '',
                first_name: '',
                last_name: '',
                branch: '',
                businessName: '',
                businessPhoneCode: '',
                businessPhone: '',
                businessType: '',
                businessLocation: '',
                blockHour: [
                    {
                        day: 0,
                        start: '10:00',
                        end: '19:00',
                        status: false,
                        time: 0
                    },
                    {
                        day: 1,
                        start: '10:00',
                        end: '19:00',
                        status: false,
                        time: 0
                    },
                    {
                        day: 2,
                        start: '10:00',
                        end: '19:00',
                        status: false,
                        time: 0
                    },
                    {
                        day: 3,
                        start: '10:00',
                        end: '19:00',
                        status: false,
                        time: 0
                    },
                    {
                        day: 4,
                        start: '10:00',
                        end: '19:00',
                        status: false,
                        time: 0
                    },
                    {
                        day: 5,
                        start: '10:00',
                        end: '19:00',
                        status: false,
                        time: 0
                    },
                    {
                        day: 6,
                        start: '10:00',
                        end: '19:00',
                        status: false,
                        time: 0
                    }
                ],
                currency: 'CLP',
                typesPay: [
                    'Efectivo'
                ]
            },
            fromArray: [
                '10:00',
                '10:30',
                '11:00',
                '11:30',
                '12:00',
                '12:30',
                '13:00',
                '13:30',
                '14:00',
                '14:30',
                '15:00',
                '15:30',
                '16:00',
                '16:30',
                '17:00',
            ],
            toArray: [
                '10:30',
                '11:00',
                '11:30',
                '12:00',
                '12:30',
                '13:00',
                '13:30',
                '14:00',
                '14:30',
                '15:00',
                '15:30',
                '16:00',
                '16:30',
                '17:00',
                '17:30'
            ],
            progress: false,
            days: {
                monday: 'danger',
                tuesday: 'danger',
                wednesday: 'danger',
                thursday: 'danger',
                friday: 'danger',
                saturday: 'danger',
                sunday: 'danger'
            },
            searchText: '',
            searchInput: null,
            searchedColumn: '',
            branch: '',
            branchName: '',
            branches:[],
            columns: [
                {
                    title: 'Nombre',
                    dataIndex: 'name',
                    key: 'name',
                    ellipsis: true,
                    scopedSlots: {
                        filterDropdown: 'filterDropdown',
                        filterIcon: 'filterIcon',
                        customRender: 'customRender',
                    },
                    onFilter: (value, record) =>
                        record.name
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
                    title: 'Fecha',
                    dataIndex: 'createdAt',
                    key: 'createdAt',
                    ellipsis: true,
                    scopedSlots: { customRender: 'format-date' },
                },
                {
                    title: 'Acciones',
                    dataIndex: '_id',
                    key: '_id',
                    scopedSlots: { customRender: 'actionButtons' },
                    ellipsis: true,
                }
            ],
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
    },
    methods: {
        getBranch(){
            this.branchName = localStorage.branchName  
            this.branch = localStorage.branch
            this.getBranches()
        },
        getToken(){
            const token = localStorage.userToken
            if (token.length > 0) {
                const decoded = jwtDecode(token)  
                this.auth = decoded.access
            }
        },
        dataEdit(id){
            console.log(id)
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
        async getBranches() {
            try {
                const getBranches = await axios.get(endPoint.endpointTarget+'/branches', this.configHeader)
                if (getBranches.data.status == 'ok') {
                    this.branches = getBranches.data.data
                }
            }catch(err){
                console.log(err)
            }
        },
        formatDate(date) {
            let dateFormat = new Date(date)
            return moment(dateFormat).format('DD-MM-YYYY');
        },
        formatPrice(value) {
            let val = (value/1).toFixed(2).replace('.', ',')
            return '$ '+val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
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
        filterOption(input, option) {
            return (
                option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
            );
        },
        removeTypePay(index){
            this.modelStart.typesPay.splice(index, 1)
        },
        handleChange(value) {
            this.modelStart.businessType = value
        },
        salectDay(day){
            if (day == 'monday') {
                this.modelStart.blockHour[1].status = this.days.monday == 'success' ? false : true
                this.days.monday = this.days.monday == 'success' ? 'danger' : 'success'
            }else if (day == 'tuesday') {
                this.modelStart.blockHour[2].status = this.days.tuesday == 'success' ? false : true
                this.days.tuesday = this.days.tuesday == 'success' ? 'danger' : 'success'
            }else if (day == 'wednesday') {
                this.modelStart.blockHour[3].status = this.days.wednesday == 'success' ? false : true
                this.days.wednesday = this.days.wednesday == 'success' ? 'danger' : 'success'
            }else if (day == 'thursday') {
                this.modelStart.blockHour[4].status = this.days.thursday == 'success' ? false : true
                this.days.thursday = this.days.thursday == 'success' ? 'danger' : 'success'
            }else if (day == 'friday') {
                this.modelStart.blockHour[5].status = this.days.friday == 'success' ? false : true
                this.days.friday = this.days.friday == 'success' ? 'danger' : 'success'
            }else if (day == 'saturday') {
                this.modelStart.blockHour[6].status = this.days.saturday == 'success' ? false : true
                this.days.saturday = this.days.saturday == 'success' ? 'danger' : 'success'
            }else if (day == 'sunday') {
                this.modelStart.blockHour[0].status = this.days.sunday == 'success' ? false : true
                this.days.sunday = this.days.sunday == 'success' ? 'danger' : 'success'
            }
        },
        nextStep(step){
            if (step == 'branch') {
                if (this.modelStart.businessName.length >= 4 && this.modelStart.businessPhoneCode.length < 5 && this.modelStart.businessPhone.length >= 6 && this.modelStart.businessLocation.length >= 10 && this.modelStart.businessType != '') {
                    this.status.branch = 'finish'
                    this.status.date = 'process'
                    this.process = 'date'
                }else{
                    this.$swal({
                        icon: 'error',
                        title: 'Llene todos los campos.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            }else if(step == 'date'){
                const findDate = this.modelStart.blockHour.find(status => status.status == true)
                console.log(findDate)
                if (findDate != undefined) {
                    this.status.date = 'finish'
                    this.status.sale = 'process'
                    this.process = 'sale'
                }else{
                    this.$swal({
                        icon: 'error',
                        title: 'Debe seleccionar mínimo un día.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            }else if(step == 'sale'){
                if (this.modelStart.typesPay.length > 0) {
                    this.status.sale = 'finish'
                    this.status.final = 'process'
                    this.process = 'final'
                }else{
                    this.$swal({
                        icon: 'error',
                        title: 'Debe crear mínimo un tipo de pago.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            }else if(step == 'final'){
                this.status.branch = 'finish'
            }
        },
        prevStep(step){
            if (step == 'date') {
                this.status.branch = 'process'
                this.status.date = 'wait'
                this.process = 'branch'
            }else if(step == 'sale'){
                this.status.date = 'process'
                this.status.sale = 'wait'
                this.process = 'date'
            }else if(step == 'final'){
                this.status.sale = 'process'
                this.status.final = 'wait'
                this.process = 'sale'
            }
        },
        insertTypePay(){
            if (this.typePay.length > 4) {
                this.modelStart.typesPay.push(this.typePay)
                this.typePay = ''
            }else if (this.typePay.length < 4) {
                this.$swal({
                    icon: 'error',
                    title: 'El método de pago debe estar compuesto por mas de 4 caracteres',
                    showConfirmButton: false,
                    timer: 1500
                })
            }else{
                this.$swal({
                    icon: 'error',
                    title: 'Debe llenar el tipo de pago',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        },
        removeTypePay(index){
            this.modelStart.typesPay.splice(index, 1)
        },
        selectCurrency(value){
            this.currency = value
        },
        validEmail(){
            const valid = this.modelStart.email.split('@')
            if(valid.length > 1){
                console.log(valid[1].includes('.'))
                return valid[1].includes('.')
            }else{
                return false
            }
        },
        async finishProcess(){
            var phone = this.modelStart.businessPhoneCode + ' ' + this.modelStart.businessPhone
            if (this.modelStart.typesPay.length > 1) {
                try {
                    const registerBranch = await axios.post(endPoint.endpointTarget+'/branches', {
                        branch: this.modelStart.businessName
                    }, this.configHeader)
                    if (registerBranch.data.status == 'ok') {
                        try {
                            const registerConf = await axios.post(endPoint.endpointTarget+'/configurations', {
                                branch: registerBranch.data.data._id,
                                blockHour: this.modelStart.blockHour,
                                businessName: this.modelStart.businessName,
                                businessPhone: phone,
                                businessType: this.modelStart.businessType,
                                businessLocation: this.modelStart.businessLocation,
                                typesPay: this.modelStart.typesPay,
                                currency: this.modelStart.currency
                            }, this.configHeader)
                            if (registerConf.data.status == 'ok') {
                                this.$swal({
                                    type: 'success',
                                    icon: 'success',
                                    title: 'Registro de la sucursal, exitoso.',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                                this.getBranches()
                                this.modals.modal1 = false
                                EventBus.$emit('newBranch', status)
                            }
                        }catch(err){console.log(err)}
                    }
                }catch(err){console.log(err)}
            }else{
                this.$swal({
                    type: 'error',
                    icon: 'error',
                    title: 'Debe llenar los campos correctamente.',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        },
    },
    mounted (){
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