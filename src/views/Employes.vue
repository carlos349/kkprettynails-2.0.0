<template>
    <div>
        <base-header class="header pb-4 pt-2 pt-lg-4 d-flex align-items-center"
                     style="min-height: 50px; background-image: url(img/theme/users.jpg); background-size: cover; background-position: center top;">
            <!-- Mask -->
            <span style="background-color:#172b4d !important" class="mask  opacity-7"></span>
            <!-- Header container -->
            <div class="container-fluid d-flex align-items-center">
                <div class="row">
                    <div class="col-12">
                        <h1 class="display-2 text-white">Sección de empleados</h1>
                        <p class="text-white mt-0 mb-2">Esta es la sección administrativa de tus empleados, aquí podrás registrar, editar y visualizar todos tus empleados.</p>
                        <base-button v-if="validRoute('empleados', 'registrar')" @click="modals.modal1 = true , initialState(2)" type="success">Registrar un empleado</base-button>
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
                        Datos del empleado
                    </div>
                </template>
                <template>
                    <form role="form">
                        <div class="row">
                            <base-input alternative
                                    class="mb-3 col-6"
                                    placeholder="Nombre"
                                    v-model="registerEmploye.firstName"
                                    v-on:keyup="validRegister()"
                                    addon-left-icon="ni ni-single-02"
                                    addon-right-icon="fa fa-asterisk text-danger">
                            </base-input>
                            <base-input alternative
                                        class="mb-3 col-6"
                                        placeholder="Apellido"
                                        v-model="registerEmploye.lastName"
                                        v-on:keyup="validRegister()"
                                        addon-left-icon="ni ni-single-02"
                                        addon-right-icon="fa fa-asterisk text-danger">
                            </base-input>
                            </div>
                        
                        <base-input alternative
                                    class="mb-3"
                                    placeholder="Documento"
                                    v-model="registerEmploye.document"
                                    v-on:keyup="validRegister(), formatRut(registerEmploye.document)"
                                    addon-left-icon="ni ni-key-25"
                                     addon-right-icon="fa fa-asterisk text-danger">
                        </base-input>
                        <template>
                            <div class="text-muted text-center mb-3">Tabla de días</div>
                        </template>
                        <vue-bootstrap4-table class="text-left styleDays" :rows="days" :columns="columnsDays" :classes="classes" :config="configDays">
                            <template slot="name" slot-scope="props">
                                <b class="text-uppercase ml-2">{{props.row.name}}</b>
                            </template>
                            <template slot="validation" slot-scope="props">
                                <center>
                                    <base-button v-on:click="addDay(props.row.vbt_id, props.row.value, props.row.valid)" class="w-25" size="sm" type="success" icon="ni ni-check-bold" v-if="props.row.valid">
                                    </base-button>
                                    <base-button v-on:click="addDay(props.row.vbt_id, props.row.value, props.row.valid)" class="w-25" size="sm" type="danger" icon="fa fa-ban" v-else></base-button>
                                    <base-button class="w-50" size="sm" type="success" v-if="props.row.valid" v-on:click="selectHour(props.row.vbt_id, props.row.value)">Horarios</base-button>
                                    <base-button class="w-50" disabled size="sm" type="danger" v-else v-on:click="selectHour(props.row.vbt_id, props.row.value)">Horarios</base-button>
                                </center>
                            </template>
                        </vue-bootstrap4-table>
                        <div class="text-center">
                            <base-button type="primary" v-on:click="proccess()" class="my-4">{{tipeForm}}</base-button>
                        </div>
                        
                    </form>
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
                        Horarios a bloquear
                    </div>
                </template>
                <template>
                    <div class="row">
                        <div class="col-6">
                            <a-select class="w-100" v-model="from">
                                <a-select-option v-for="i in fromArray" :key="i">
                                    {{i}}
                                </a-select-option>
                            </a-select>
                        </div>
                        <div class="col-6">                
                            <a-select class="w-100" v-model="to">
                                <a-select-option v-for="i in toArray" :key="i">
                                    {{i}}
                                </a-select-option>
                            </a-select>
                        </div>
                        <base-button type="primary" v-on:click="selectHourFinaly()" class="mt-4 mx-auto">Seleccionar horas</base-button>
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
        <!-- TABLA DE CLIENTES -->
        <template>
            <div class="p-2">
                <a-config-provider>
                    <template #renderEmpty>
                        <div style="text-align: center">
                            <a-icon type="warning" style="font-size: 20px" />
                            <h2>Selecciona un filtro en la parte superior</h2>
                        </div>
                    </template>
                    <a-table :columns="columns" :loading="employeState" :data-source="employes" :scroll="getScreen">
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
                            {{formatPrice((parseFloat(column.commission) + parseFloat(column.bonus)) - parseFloat(column.advancement))}}
                        </template>
                        <template slot="bonus" slot-scope="record">
                            {{formatPrice(record)}}
                        </template>
                        <template slot="advancement" slot-scope="record">
                            {{formatPrice(record)}}
                        </template>
                        <template slot="commission" slot-scope="record">
                            {{formatPrice(record)}}
                        </template>
                        <template slot="name" slot-scope="record, column">
                            <b>
                                <a-tooltip placement="top">
                                    <template slot="title">
                                    <span>Detalles</span>
                                    </template>
                                    <base-button v-if="validRoute('empleados', 'detalle')" size="sm" type="default" @click="modals.modal1 = true , initialState(3), pushData(column.firstName, column.days, column._id, column.document,column.lastName, column.branch)" icon="ni ni-bullet-list-67"></base-button>
                                    <base-button v-else disabled size="sm" type="default" icon="ni ni-bullet-list-67"></base-button>
                                </a-tooltip>
                                
                                <a-tooltip placement="top">
                                    <template slot="title">
                                    <span>Reporte</span>
                                    </template>
                                    <base-button v-if="validRoute('empleados', 'reportes')" size="sm" v-on:click="reportEmploye(column._id)" type="primary" icon="ni ni-align-center"></base-button>
                                    <base-button v-else size="sm" disabled type="primary" icon="ni ni-align-center"></base-button>
                                </a-tooltip>
                                
                                <a-tooltip placement="top">
                                    <template slot="title">
                                    <span>Eliminar</span>
                                    </template>
                                    <base-button v-if="validRoute('empleados', 'eliminar')" size="sm" v-on:click="deleteEmploye(column._id)" type="warning" icon="fas fa-trash"></base-button>
                                    <base-button v-else size="sm" disabled type="warning" icon="fas fa-trash"></base-button>
                                </a-tooltip>
                            </b>
                        </template>
                    </a-table>
                </a-config-provider>    
            </div>
        </template>
    </div>
</template>
<script>
//Back - End 
import axios from 'axios'
import router from '../router'
import endPoint from '../../config-endpoint/endpoint.js'
import VueBootstrap4Table from 'vue-bootstrap4-table'
import EventBus from '../components/EventBus'
import jwtDecode from 'jwt-decode'

// COMPONENTS

  export default {
    components: {
        VueBootstrap4Table 
    },
    data() {
      return {
        auth: [],
        tipeForm:'',
        employeState:false,
        registerEmploye: {
            branch:'Seleccione una sucursal',
            firstName:'',
            lastName:'',
            document:'',
            days: [],
            _id:'',
            show:false,
            valid:false,
            valid2:false,
        },
        filter:'',
        branch:'',
        branchName:'',
        configHeader: {
            headers:{
                "x-database-connect": endPoint.database,
                'x-access-token':localStorage.userToken
                }
        },
        modals: {
            modal1: false,
            modal2: false,
            modal3: false,
            message: "",
            icon: '',
            type:''
        },
        columnsDays: [
            {
                label: "Día",
                name: "name",
                slot_name:"name",
                sort: false,
            },
            {
                label: "Acciones",
                name: "valid",
                slot_name:"validation",
                sort: false,
            }
        ],
        configDays: {
            card_title: "Tabla de días",
            checkbox_rows: false,
            rows_selectable : false,
            highlight_row_hover_color:"rgba(238, 238, 238, 0.623)",
            global_search: {
                placeholder: "Filtre por día",
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
        days: [
            {
                name: 'Lunes',
                value: 1,
                valid: false
            },
            {
                name: 'Martes',
                value: 2,
                valid: false
            },
            {
                name: 'Miercoles',
                value: 3,
                valid: false
            },
            {
                name: 'Jueves',
                value: 4,
                valid: false
            },
            {
                name: 'Viernes',
                value: 5,
                valid: false
            },
            {
                name: 'Sabado',
                value: 6,
                valid: false
            },
            {
                name: 'Domingo',
                value: 0,
                valid: false
            }
        ],
        employes: [],
        searchText: '',
        searchInput: null,
        searchedColumn: '',
        columns: [
            {
                title: 'Nombre',
                dataIndex: 'firstName',
                key: 'firstName',
                ellipsis: true,
                sorter: (a, b) => {
                     if (a.firstName > b.firstName) {
                        return -1;
                    }
                    if (b.firstName > a.firstName) {
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
                onFilter: (value, record) => record.firstName.toString().toLowerCase().includes(value.toLowerCase()),
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
                dataIndex: 'lastName',
                key: 'lastName',
                ellipsis: true,
                sorter: (a, b) => {
                     if (a.lastName > b.lastName) {
                        return -1;
                    }
                    if (b.lastName > a.lastName) {
                        return 1;
                    }
                    return 0;
                },
                scopedSlots: {
                    filterDropdown: 'filterDropdown',
                    filterIcon: 'filterIcon',
                    customRender: 'customRender',
                },
                onFilter: (value, record) => record.lastName.toString().toLowerCase().includes(value.toLowerCase()),
                onFilterDropdownVisibleChange: visible => {
                    if (visible) {
                    setTimeout(() => {
                        this.searchInput.focus();
                    }, 0);
                    }
                },
            },
            {
                title: 'Documento',
                dataIndex: 'document',
                key: 'document',
                ellipsis: true,
                scopedSlots: {
                    filterDropdown: 'filterDropdown',
                    filterIcon: 'filterIcon',
                    customRender: 'customRender',
                },
                onFilter: (value, record) => record.document.replace(/[-.]/g,'').toString().toLowerCase().includes(value.toLowerCase()),
                onFilterDropdownVisibleChange: visible => {
                    if (visible) {
                    setTimeout(() => {
                        this.searchInput.focus();
                    }, 0);
                    }
                },
            },
            {
                title: 'Comisión',
                dataIndex: 'commission',
                key: 'commission',
                ellipsis: true,
                scopedSlots: { customRender: 'commission' },
                sorter: (a, b) => a.commission - b.commission,
            },
            {
                title: 'Bonos',
                dataIndex: 'bonus',
                key: 'bonus',
                ellipsis: true,
                scopedSlots: { customRender: 'bonus' },
                sorter: (a, b) => a.bonus - b.bonus,
            },
            {
                title: 'Avances',
                dataIndex: 'advancement',
                key: 'advancement',
                ellipsis: true,
                scopedSlots: { customRender: 'advancement' },
                sorter: (a, b) => a.advancement - b.advancement,
            },
            {
                title: 'Total',
                key: '_id',
                ellipsis: true,
                scopedSlots: { customRender: 'total' },
                sorter: (a, b) => (a.commission + a.bonus - a.advancement) - (b.commission + b.bonus - b.advancement),
            },
            {
                title: 'Acciones',
                dataIndex: '_id',
                key: '_id',
                scopedSlots: { customRender: 'name' }
            }
        ],
        selectedDays: [],
        from: 'Seleccione un horario',
        to: 'Seleccione un horario',
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
        editHourIndex: 0
      };
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
            this.getEmployes()
        },
        async getEmployes(){
            this.employeState = true
            try{
                const getByBranch = await axios.get(endPoint.endpointTarget+'/employes/employesbybranch/'+this.branch, this.configHeader)
                if (getByBranch.data.data.length > 0) {
                    this.employes = getByBranch.data.data
                    this.employeState = false
                }else{
                    setTimeout(() => {
                        this.employeState = false
                    }, 200);
                }
            }catch(err){
                res.send(err)
            }
        },
        selectBranchForCreate(value){
            this.registerEmploye.branch = value._id
            this.validRegister()
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
        addDay(id, value, valid){
            if (valid) {
                this.days[id - 1].valid = false
                for (let index = 0; index < this.days.length; index++) {
                    const element = this.days[index];
                    for (let indexTwo = 0; indexTwo < this.selectedDays.length; indexTwo++) {
                        const elementTwo = this.selectedDays[indexTwo];
                        if (value == elementTwo.day) {
                            this.selectedDays.splice(indexTwo, 1)
                        }
                    }
                }
                console.log(this.selectedDays)
                this.validRegister()
            }else{
                this.days[id - 1].valid = true
                this.selectedDays.push({day: value, hours: []})
            }
        },
        selectHour(id, value){
            console.log(this.selectedDays)
            this.modals.modal1 = false
            this.modals.modal3 = true
            for (let j = 0; j < this.selectedDays.length; j++) {
                const elementTwo = this.selectedDays[j];
                if (value == elementTwo.day) {
                    this.editHourIndex = j
                }
            }
            console.log(this.selectedDays)
            if (this.selectedDays[this.editHourIndex].hours.length > 0) {
                console.log(this.selectedDays[this.editHourIndex].hours)
                this.from = this.selectedDays[this.editHourIndex].hours[0]
                this.to = this.selectedDays[this.editHourIndex].hours[1]    
            }
        },
        selectHourFinaly(){
            this.selectedDays[this.editHourIndex].hours = [this.from, this.to]
            this.modals.modal3 = false
            this.modals.modal1 = true
            this.from  = "Seleccione un horario"
            this.to = "Seleccione un horario"
            this.validRegister()
            console.log(this.selectedDays)
        },
        getToken(){
            const token = localStorage.userToken
            const decoded = jwtDecode(token)  
            this.auth = decoded.access
        },
        reportEmploye(id){
            localStorage.setItem('idReportEmploye', id)
            router.push({path: '/reportEmploye'})
        },
        proccess(){
            if (this.tipeForm == "Registrar") {
                this.registerEmployes()
            }
            else{
                this.updateEmploye()
            }
        },
        registerEmployes(){
            if (this.registerEmploye.firstName.length > 3 && this.registerEmploye.lastName.length > 3 && this.registerEmploye.document.length > 1) {
                axios.post(endPoint.endpointTarget+'/employes', {
                    branch: this.branch,
                    days: this.selectedDays,
                    firstName: this.registerEmploye.firstName,
                    lastName: this.registerEmploye.lastName,
                    document: this.registerEmploye.document,
                }, this.configHeader)
                .then(res => {
                    if(res.data.status == 'employe created'){
                        this.modals = {
                            modal2: true,
                            message: "¡Empleado registrado con exito!",
                            icon: 'ni ni-check-bold ni-5x',
                            type: 'success'
                        }
                        setTimeout(() => {
                            this.getEmployes()
                            this.initialState(1)
                            EventBus.$emit('reloadLenders', 'reload')
                        }, 1500);
                    }else{
                        this.modals = {
                            modal2: true,
                            message: "¡El empleado ya se encuentra registrado!",
                            icon: 'ni ni-fat-remove ni-5x',
                            type: 'danger'
                        }
                        setTimeout(() => {
                        this.modals = {
                            modal2: false,  
                            modal1: true,
                            message: "",
                            icon: '',
                            type: ''
                        } 
                        }, 1500);
                    }
                })
            }else{

            }
        },
        updateEmploye(){
				axios.put(endPoint.endpointTarget+'/employes', {
                    id:this.registerEmploye._id,
					firstName: this.registerEmploye.firstName,
					document: this.registerEmploye.document,
					days: this.selectedDays,
					lastName: this.registerEmploye.lastName
				}, this.configHeader)
				.then(res => {
					if(res.data.status == "employe edited"){
						this.modals = {
                            modal2: true,
                            message: "¡Empleado editado con exito!",
                            icon: 'ni ni-check-bold ni-5x',
                            type: 'success'
                        }
                        setTimeout(() => {
                            if (this.filter == 'Todas') {
                                this.getEmployes()
                            }if (this.filter != 'Todas' && this.filter != '') {
                                const sendBranch = {
                                    _id:this.filter
                                }
                                this.findBranch(sendBranch)
                            }
                            this.initialState(1)
                            EventBus.$emit('reloadLenders', 'reload')
                        }, 2000);
					}else{
						this.$swal({
							type: 'error',
                            icon: 'error',
							title: 'Prestador ya existe',
							showConfirmButton: false,
							timer: 1500
						})
					}
				})
		},
        deleteEmploye(id){
		    this.$swal({
                title: '¿Seguro que desea eliminar?',
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
                    axios.delete(endPoint.endpointTarget+'/employes/' + id, this.configHeader)
                    .then(res => {
                        if(res.data.status = 'employe deleted'){
                            this.modals = {
                                modal2: true,
                                message: "¡Empleado eliminado!",
                                icon: 'ni ni-check-bold ni-5x',
                                type: 'success'
                            }
                            setTimeout(() => {
                                if (this.filter == 'Todas') {
                                    this.getEmployes()
                                }if (this.filter != 'Todas' && this.filter != '') {
                                    const sendBranch = {
                                        _id:this.filter
                                    }
                                    this.findBranch(sendBranch)
                                }
                                this.initialState(1)
                                EventBus.$emit('reloadLenders', 'reload')
                            }, 2000);
                            // this.emitMethod()
                        }
                    })
                    .catch(err => {
                        this.$swal({
                            type: 'error',
                            title: 'Hubo un problema',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    })
                }
            })	
		},
        pushData(firstName,days,_id,document,lastName,branch){
            this.registerEmploye.firstName = firstName
            this.registerEmploye.lastName = lastName
            this.registerEmploye.document = document
            this.registerEmploye.branch = branch
            this.registerEmploye.days = days
            this.registerEmploye.show = true
            this.registerEmploye._id = _id
            this.selectedDays = days
            for (let index = 0; index < this.days.length; index++) {
                const element = this.days[index];
                for (let j = 0; j < days.length; j++) {
                    const elementTwo = days[j];
                    if (element.value == elementTwo.day) {
                        element.valid = true
                    }
                }
            }
        },
        validFields(field){
            console.log("y entonces?")
            if (field == 'c') {
                if (this.registerUser.correo == this.registerUser.correoConfirm) {
                this.registerUser.c = true
                console.log("y entonces?")
                }
                else{
                    this.registerUser.c = false
                }
            }
            
            if (field == 'p') {
                if (this.registerUser.password == this.registerUser.passwordConfirm) {
                this.registerUser.p = true
                }
                else{
                    this.registerUser.p = false
                }
            } 
        },
        initialState(val){
            this.registerEmploye = {
                firsName:'',
                lastName:'',
                branch: '',
                document:'',
                timeRestOne:"Seleccione el tiempo",
                timeRestTwo:"Seleccione el tiempo",
                dayFree:[],
                show:false,
                _id:'',
                valid:false,
                valid2:false,
            }
            this.selectedDays = []
            for (let index = 0; index < this.days.length; index++) {
                this.days[index].valid = false
            }
            if (val == 1) {
                this.modals = {
                        modal1: false,
                        modal2: false,
                        message: "",
                        icon: 'ni ni-check-bold ni-5x',
                        type: 'success'
                    }
            }
            if (val == 2) {
                this.registerEmploye.show = true
                setTimeout(() => {
                    this.registerEmploye.show = false
                }, 10);
                this.tipeForm = 'Registrar'
            }
            if (val == 3) {
                this.tipeForm = 'Editar'
            }
        },
        validRegister(){
            if (this.registerEmploye.firstName != '' && this.registerEmploye.lastName != '' && this.registerEmploye.branch != '' && this.registerEmploye.document != '' && this.selectedDays.length > 0) {
                this.registerEmploye.valid = this.selectedDays[0].hours.length > 0 ? true : false
            }
            else{
                this.registerEmploye.valid = false
            }
        },
        formatDate(date) {
            let dateFormat = new Date(date)
            return dateFormat.getDate()+"-"+(dateFormat.getMonth() + 1)+"-"+dateFormat.getFullYear()+" "+" ("+ dateFormat.getHours()+":"+ dateFormat.getMinutes()+")"
        },
        formatPrice(value) {
            let val = (value/1).toFixed(2).replace('.', ',')
            return '$ '+val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        formatRut(rut) {
            rut.replace(/[-.]/g,'')
            const newRut = rut.replace(/\./g,'').replace(/\-/g, '').trim().toLowerCase();
            const lastDigit = newRut.substr(-1, 1);
            const rutDigit = newRut.substr(0, newRut.length-1)
            let format = '';
            for (let i = rutDigit.length; i > 0; i--) {
            const e = rutDigit.charAt(i-1);
            format = e.concat(format);
            if (i % 3 === 0){
                format = '.'.concat(format);
            }
            }
            this.registerEmploye.document = format.concat('-').concat(lastDigit);
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
    computed: {
        getScreen: () => {
            return screen.width < 780 ? { x: 'calc(700px + 50%)', y: 240 } : { y: 'auto' }
        }
    },
    mounted() {
        EventBus.$on('changeBranch', status => {
            this.getBranch()
        })
    }
  };
</script>
<style lang="scss">
    .card-header{
        font-size: 2.5vw;
    }
    .cursor-pointer{
        cursor: pointer;
    }
    .styleDays .card-header{
        display: none;
    }
    .styleDays .footer-header{
        display: none;
    }
    .styleDays .vbt-table-tools{
        display: none;
    }
    .styleDays .table td{
        padding: 2px !important;
    }
    .styleDays .card-footer{
        display: none !important;
    }
    .styleDays .card-body{
        padding: 0 !important;
    }
</style>