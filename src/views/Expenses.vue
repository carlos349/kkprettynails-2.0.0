<template>
    <div>
        <base-header class="header pb-4 pt-2 pt-lg-4 d-flex align-items-center"
            style="min-height: 50px; background-image: url(img/theme/users.jpg); background-size: cover; background-position: center top;">
            <!-- Mask -->
            <span style="background-color:#172b4d !important" class="mask  opacity-7"></span>
            <!-- Header container -->
            <div class="row">
                <div class="col-12">
                    <div class="text-absolute" style="top:10%;">
                        <p class="mb-0 display-4 text-white">Gastos</p>
                    </div>
                    <div class="row p-0">
                        <div class="col-md-2 px-1">
                            <stats-card title="Inventario"
                                type="gradient-orange"
                                :sub-title="thisMonth.Inventario | formatPrice"
                                icon="ni ni-box-2"
                                class="mt-7">
                                <template slot="footer">
                                    <span :class="percentInventory >= 0 ? 'text-success' : 'text-danger'" class="mr-2">
                                        <i :class="percentInventory >= 0 ? 'fa fa-arrow-up' : 'fa fa-arrow-down'"></i> 
                                        {{percentInventory}}%
                                    </span><br>
                                    <span class="text-nowrap">
                                        Mes pasado 
                                        <small class="text-muted">  
                                            {{beforeMonth.Inventario | formatPrice}}
                                        </small>
                                    </span>
                                </template>
                            </stats-card>
                        </div>
                        <div class="col-md-2 px-1">
                            <stats-card title="Bonos"
                                type="gradient-orange"
                                :sub-title="thisMonth.Bono | formatPrice"
                                icon="ni ni-trophy"
                                class="mt-7">
                                <template slot="footer">
                                    <span :class="percentBonus >= 0 ? 'text-success' : 'text-danger'" class="mr-2">
                                        <i :class="percentBonus >= 0 ? 'fa fa-arrow-up' : 'fa fa-arrow-down'"></i> 
                                        {{percentBonus}}%
                                    </span><br>
                                    <span class="text-nowrap"
                                        >Mes pasado 
                                        <small class="text-muted">  
                                            {{beforeMonth.Bono | formatPrice}}
                                        </small>
                                    </span>
                                </template>
                            </stats-card>
                        </div>
                        <div class="col-md-2 px-1">
                            <stats-card title="Comisiones"
                                type="gradient-orange"
                                :sub-title="thisMonth.Comision | formatPrice"
                                icon="ni ni-money-coins"
                                class="mt-7">
                                <template slot="footer">
                                    <span :class="percentCommission >= 0 ? 'text-success' : 'text-danger'" class="mr-2">
                                        <i :class="percentCommission >= 0 ? 'fa fa-arrow-up' : 'fa fa-arrow-down'"></i> 
                                        {{percentCommission}}%
                                    </span><br>
                                    <span class="text-nowrap">
                                        Mes pasado 
                                        <small class="text-muted">  
                                            {{beforeMonth.Comision | formatPrice}}
                                        </small>
                                    </span>
                                </template>
                            </stats-card>
                        </div>
                        <div class="col-md-2 px-1">
                            <stats-card title="Mensuales"
                                type="gradient-orange"
                                :sub-title="thisMonth.Mensual | formatPrice"
                                icon="ni ni-shop"
                                class="mt-7">
                                <template slot="footer">
                                    <span :class="percentMonth >= 0 ? 'text-success' : 'text-danger'" class="mr-2">
                                        <i :class="percentMonth >= 0 ? 'fa fa-arrow-up' : 'fa fa-arrow-down'"></i> 
                                        {{percentMonth}}%
                                    </span><br>
                                    <span class="text-nowrap">
                                        Mes pasado 
                                        <small class="text-muted">  
                                            {{beforeMonth.Mensual | formatPrice}}
                                        </small>
                                    </span>
                                </template>
                            </stats-card>
                        </div>
                        <div class="col-md-2 px-1">
                            <a-tooltip>
                                <template slot="title">
                                    Total = Ventas + Reinversión - Gastos
                                </template>
                                <stats-card title="Total"
                                    type="gradient-orange"
                                    :sub-title="totalFinal | formatPrice"
                                    icon="ni ni-sound-wave"
                                    class="mt-7">
                                    <template slot="footer">
                                        <span :class="totalFinal >= 0 ? 'text-success' : 'text-danger'" class="mr-2">
                                            <i :class="totalFinal >= 0 ? 'fa fa-arrow-up' : 'fa fa-arrow-down'"></i> 
                                        </span><br>
                                        <span v-if="totalFinal < 0" class="text-nowrap">
                                            Saldo negativo
                                            <small class="text-muted">  
                                                {{totalFinal | formatPrice}}
                                            </small>
                                        </span>
                                        <span v-else class="text-nowrap">
                                            Disponible
                                            <small class="text-muted">  
                                                {{totalFinal | formatPrice}}
                                            </small>
                                        </span>
                                    </template>
                                </stats-card>
                            </a-tooltip>
                        </div>
                    </div>
                    <a-tooltip>
                        <template slot="title">
                            Registrar gasto
                        </template>
                        <base-button class="float-right mr-2" size="sm"  v-if="validRoute('gastos', 'registrar')"  v-on:click="modals.modal1 = true" type="success">
                            <a-icon type="wallet" style="vertical-align:1px;font-size:1.5em;" />
                        </base-button>
                    </a-tooltip>
                    <a-tooltip>
                        <template slot="title">
                            Inversión mensual
                        </template>
                        <base-button class="float-right mr-2" size="sm"  v-if="validRoute('gastos', 'registrar')"  v-on:click="modals.modal4 = true, getReinvestment()" type="default">
                            <a-icon type="book" style="vertical-align:1px;font-size:1.5em;" />
                        </base-button>
                    </a-tooltip>
                    <a-tooltip>
                        <template slot="title">
                            Cierre mensual
                        </template>
                        <base-button @click="closeReinvestment" class="float-right mr-2" size="sm"  v-if="validRoute('gastos', 'registrar')" type="danger">
                            <i class="fa fa-archive" style="vertical-align:1px;font-size:1.2em;"></i>
                        </base-button>
                    </a-tooltip>
                </div>
            </div>
        </base-header>
        <a-config-provider>
            <template #renderEmpty>
                <div style="text-align: center">
                    <a-icon type="warning" style="font-size: 20px" />
                    <h2>Sucursal sin gastos registrados.</h2>
                </div>
            </template>
            <a-table :columns="columns" :loading="progress" :data-source="expenses" :scroll="getScreen">
                <template slot="format-date" slot-scope="record, column">
                    {{column.createdAt | formatDate}}
                </template>
                <template slot="total-slot" slot-scope="record, column">
                    {{column.amount | formatPrice}}
                </template>
                <template slot="action-slot" slot-scope="record, column">
                    <base-button @click="deleteExpense(column._id, column.type, column.employe, column.amount)" size="sm" type="danger">
                        <a-icon type="close-circle" style="vertical-align:1.5px;" />
                    </base-button>
                </template>
            </a-table>
        </a-config-provider>
        <a-modal v-model="modals.modal1" :footer="null" >
            <template>
                <h3 class="text-center w-100">Seleccione el tipo de gasto</h3>
                <center>
                    <base-button @click="modals.modal1 = false, modals.modal2 = true" class="w-25" type="default">
                        Bono
                    </base-button>
                    <base-button @click="modals.modal1 = false, modals.modal3 = true" type="primary">
                        Gasto mensual
                    </base-button>  
                </center>
            </template>
        </a-modal>
        <a-modal v-model="modals.modal2" :width="300" >
            <template>
                <template>
                    <h3>Registrar un bono</h3>
                    <label for="descripción">Descripción</label>
                    <a-input 
                        v-model="registerExpense.detail"
                        type="textarea"
                        class="mb-2"
                        placeholder="Escriba la razón del bono"/>
                    <label for="employe">Empleado</label>
                    <a-select
                        show-search
                        placeholder="Seleccione el empleado"
                        option-filter-prop="children"
                        :filter-option="filterOption"
                        :allowClear="true"
                        class="mb-2 pt-1 w-100 selectEmploye"
                        @change="chooseEmploye">
                        <a-select-option v-for="employe of employes" :key="employe._id" :value="employe._id">
                            {{employe.firstName}} {{employe.lastName}}
                        </a-select-option>
                    </a-select>
                    <label for="Monto">Monto</label>
                    <currency-input
                        v-model="registerExpense.amount"
                        locale="de"
                        class="ant-input w-100"
                    />
                </template>
                <template slot="footer">
                    <base-button class="float-left" @click="modals.modal1 = true, modals.modal2 = false" size="sm" type="default">
                        Regresar
                    </base-button>
                    <base-button :disabled="registerExpense.detail.length > 0 && registerExpense.amount > 0 && employeSelect.id.length > 0 ? false : true" @click="registerBonusExpense" size="sm" type="success">
                        registrar
                    </base-button>
                </template>
            </template>
        </a-modal>
        <a-modal v-model="modals.modal3" :width="300" >
            <template>
                <h3>Registrar un gasto mensual</h3>
                <label for="descripción">Descripción</label>
                <a-input 
                    v-model="registerExpense.detail"
                    type="textarea"
                    class="mb-2"
                    placeholder="Escriba la descripción del gasto"/>
                <label for="Monto">Monto</label>
                <currency-input
                    v-model="registerExpense.amount"
                    locale="de"
                    class="ant-input w-100"
                />
            </template>
            <template slot="footer">
                <base-button class="float-left" @click="modals.modal1 = true, modals.modal3 = false" size="sm" type="default">
                        Regresar
                    </base-button>
                <base-button :disabled="registerExpense.detail.length > 0 && registerExpense.amount > 0 ? false : true" @click="registerMonthExpense" size="sm" type="success">
                    registrar
                </base-button>
            </template>
        </a-modal>
        <a-modal v-model="modals.modal4" :width="300" >
            <template v-if="reinvestmentValid">
                <h3>Edite reinversion mensual</h3>
                <label for="Monto">Monto a editar</label>
                <currency-input
                    v-model="reinvestmentTotal"
                    locale="de"
                    class="ant-input w-100"
                />
            </template>
            <template v-else>
                <h3>Registre reinversion mensual</h3>
                <label for="Monto">Monto</label>
                <currency-input
                    v-model="reinvestmentTotal"
                    locale="de"
                    class="ant-input w-100"
                />
            </template>
            <template slot="footer">
                <base-button @click="registerReinvestment" v-if="reinvestmentValid" size="sm" type="success">
                    Editar
                </base-button>
                <base-button @click="registerReinvestment" v-else size="sm" type="success">
                    Registrar
                </base-button>
            </template>
        </a-modal>
    </div>
</template>
<script>
//Back - End 
import axios from 'axios'
import endPoint from '../../config-endpoint/endpoint.js'
import EventBus from '../components/EventBus'
import jwtDecode from 'jwt-decode'
// COMPONENTS
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import mixinUserToken from '../mixins/mixinUserToken'
export default {
    mixins: [mixinUserToken],
    components: {
        flatPicker
    },
    data(){
        return {
            auth:[],
            configDate: {
                allowInput: true, 
                minDate: new Date(),
            },
            dates: {
                simple: new Date()
            },
            modals: {
                modal1: false,
                modal2: false,
                modal3: false,
                modal4: false
            },
            registerExpense: {
                detail: '',
                amount: 0,
                type: ''
            },
            progress: false,
            expenses: [],
            configHeader: {
                headers: {
                    "x-database-connect": endPoint.database, 
                    "x-access-token": localStorage.userToken
                }
            },
            branchName: '',
            branch: '',
            columns: [
                {
                    title: 'Fecha',
                    dataIndex: 'createdAt',
                    key: 'createdAt',
                    scopedSlots: { customRender: 'format-date' },
                    defaultSortOrder: 'descend',
                    sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
                },
                {
                    title: 'Tipo',
                    dataIndex: 'type',
                    key: 'type',
                },
                {
                    title: 'Descripción',
                    dataIndex: 'detail',
                    key: 'detail'
                },
                {
                    title: 'Total',
                    dataIndex: 'total',
                    key: 'total',
                    scopedSlots: { customRender: 'total-slot' },
                    sorter: (a, b) => a.total - b.total,
                },
                {
                    title: 'Eliminar',
                    dataIndex: '_id',
                    key: '_id',
                    scopedSlots: { customRender: 'action-slot' }
                }
            ],
            expenses: [],
            typeRegister: '',
            employes: [],
            employeSelect: {
                name: '',
                id: ''
            },
            thisMonth:  {
                Inventario: 0,
                Bono: 0,
                Mensual: 0,
                Comision: 0
            },
            beforeMonth: {
                Inventario: 0,
                Bono: 0,
                Mensual: 0,
                Comision: 0
            },
            commissionThisMonth: 0,
            commissionBeforeMonth: 0,
            percentInventory: 0,
            percentBonus: 0,
            percentMonth: 0,
            percentCommission: 0,
            totalSales: 0,
            totalFinal: 0,
            reinvestmentTotal: 0,
            reinvestmentValid: false,
            reinvestmentId: ''
        }
    },
    created(){
        this.getToken()
        this.getBranch()
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
            this.getExpenses()
            this.getEmployes()
            this.getReinvestment()
            this.getTotal() 
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
        closeReinvestment(){
            if (this.reinvestmentValid && this.reinvestmentId != '') {
                const expenseTotal = this.thisMonth.Inventario + this.thisMonth.Bono + this.thisMonth.Mensual + this.thisMonth.Comision
                this.$swal({
                        title: '¿Está seguro que desea Hacer el cierre?',
                        type: 'warning',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Estoy seguro',
                        cancelButtonText: 'No, evitar acción',
                        showCloseButton: true,
                        showLoaderOnConfirm: true
                    }).then((result) => {
                        if(result.value) {
                            axios.post(`${endPoint.endpointTarget}/expenses/closeExpenses`, {
                                reinvestment: this.reinvestmentTotal,
                                sales: this.totalSales,
                                expenses: expenseTotal,
                                totalFinal: this.totalFinal,
                                branch: this.branch,
                                reinvestmentId: this.reinvestmentId 
                            }, this.configHeader)
                            .then(res => {
                                if(res.data.status == 'ok'){
                                    this.$swal({
                                        icon: 'success',
                                        title: 'Cierre efectuado con éxito',
                                        showConfirmButton: false,
                                        timer: 2000
                                    })
                                    window.open(`${endPoint.endpointTarget}/static/reportExpenses.pdf`)
                                    this.getBranch()
                                }
                            })
                        }else{
                            this.$swal({
                                icon: 'info',
                                title: 'Acción cancelada',
                                showConfirmButton: false,
                                timer: 2000
                            })
                        }
                    })
            }else{
                this.$swal({
					icon: 'error',
					title: 'Debe registrar un monto de reinversión para cerrar gastos mensuales',
					showConfirmButton: false,
					timer: 2000
				})
            }
        },
        async getReinvestment(){
            try {
                const reinvestment = await axios.get(`${endPoint.endpointTarget}/expenses/findReinvestment/${this.branch}`, this.configHeader)
                if (reinvestment.data.status == 'ok') {
                    this.reinvestmentTotal = reinvestment.data.data.amount
                    this.reinvestmentValid = true
                    this.reinvestmentId = reinvestment.data.data._id
                }else{
                    this.reinvestmentTotal = 0
                    this.reinvestmentValid = false
                    this.reinvestmentId = reinvestment.data.data._id
                }
            }catch(err){
                console.log(err)
            }
        },
        registerReinvestment(){
            axios.put(`${endPoint.endpointTarget}/expenses/regReinvestment/${this.reinvestmentId}`, {
                amount: this.reinvestmentTotal
            }, this.configHeader)
            .then(res => {
                if (res.data.status == 'ok') {
                    if (this.reinvestmentValid) {
                        this.$swal({
                            icon: 'success',
                            title: 'Reinversión editada',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }else{
                        this.$swal({
                            icon: 'success',
                            title: 'Reinversión registrada',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                    this.getBranch()
                    this.modals.modal4 = false
                    this.reinvestmentValid = true
                }
            })
        },
        getTotal(){
            setTimeout(() => {
                this.totalFinal = this.reinvestmentTotal + this.totalSales - (this.commissionThisMonth + this.thisMonth.Inventario + this.thisMonth.Bono + this.thisMonth.Mensual)
            }, 200);
        },
        async getExpenses(){
            try {
                const expenses = await axios.get(`${endPoint.endpointTarget}/expenses/${this.branch}`, this.configHeader)
                if (expenses.data.status == 'ok') {
                    this.expenses = expenses.data.data.expenses
                    this.thisMonth = expenses.data.data.expenseTotals
                    this.beforeMonth = expenses.data.data.expenseTotalsBefore
                    this.percentInventory = this.thisMonth.Inventario > 0 ? ((this.thisMonth.Inventario - this.beforeMonth.Inventario) / this.thisMonth.Inventario) * 100 : 0
                    this.percentBonus = this.thisMonth.Bono > 0 ? ((this.thisMonth.Bono - this.beforeMonth.Bono) / this.thisMonth.Bono) * 100 : 0
                    this.percentMonth = this.thisMonth.Mensual > 0 ? ((this.thisMonth.Mensual - this.beforeMonth.Mensual) / this.thisMonth.Mensual) * 100 : 0
                    this.percentCommission = this.thisMonth.Comision > 0 ? ((this.thisMonth.Comision - this.beforeMonth.Comision) / this.thisMonth.Comision) * 100 : 0
                }else{
                    this.expenses = []
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
        async chooseEmploye(value){
            if (value) {
                try {
                    const getEmploye = await axios.get(`${endPoint.endpointTarget}/employes/justonebyid/${value}`, this.configHeader)
                    this.employeSelect.id = getEmploye.data.data._id
                    this.employeSelect.name = getEmploye.data.data.firstName+' '+getEmploye.data.data.lastName
                }catch(err) {
                    console.log(err)
                }
            }else{
                this.employeSelect.id = ''
                this.employeSelect.name = ''
            }
        },
        async getEmployes(){
            try {
                const employes = await axios.get(endPoint.endpointTarget+'/employes/employesbybranch/'+this.branch, this.configHeader)
                if (employes.data.status == 'ok') {
                    this.employes = employes.data.data
                }else{
                    this.employes = []
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
        deleteExpense(id, type, employe, total){
            console.log(id, type, employe, total)
            axios.put(`${endPoint.endpointTarget}/expenses/${id}`, {
                type: type,
                idEmploye: employe,
                total: total
            }, this.configHeader)
            .then(res => {
                this.$swal({
                    type: 'success',
                    icon: 'success',
                    toast: true,
                    position: 'top-end',
                    title: 'Se elimino con éxito',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.getBranch()
            }).catch(err => {
                console.log(err)
            })
        },
        registerBonusExpense(){
            const detail = `${this.registerExpense.detail} a ${this.registerExpense.name}`
            axios.post(`${endPoint.endpointTarget}/expenses/`, {
                branch: this.branch,
                detail: detail,
                employe: this.employeSelect.id,
                amount: this.registerExpense.amount,
                type: "Bono",
            }, this.configHeader)
            .then(res => {
                if (res.data.status == 'ok') {
                    axios.put(`${endPoint.endpointTarget}/employes/registerBonus/${this.employeSelect.id}`, {
                        amount: this.registerExpense.amount
                    }, this.configHeader)
                    .then(res => {
                        if (res.data.status == 'ok') {
                            this.registerExpense.detail = ''
                            this.registerExpense.amount = 0
                            this.employeSelect.name = ''
                            this.employeSelect.id = ''
                            this.modals.modal2 = false
                            $('.selectEmploye .ant-select-selection__clear').click()
                            this.$swal({
                                icon: 'success',
                                title: 'Bono registrado',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            this.getBranch()
                        }
                    })
                }
            }).catch(err => {
                console.log(err)
            })
        },
        registerMonthExpense(){
            axios.post(`${endPoint.endpointTarget}/expenses/`, {
                branch: this.branch,
                detail: this.registerExpense.detail,
                employe: 'none',
                amount: this.registerExpense.amount,
                type: "Mensual",
            }, this.configHeader)
            .then(res => {
                if (res.data.status = 'ok') {
                    this.registerExpense.detail = ''
                    this.registerExpense.amount = 0
                    this.modals.modal3 = false
                    this.$swal({
                        icon: 'success',
                        title: 'Gasto registrado',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.getBranch()
                }
            }).catch(err => {
                console.log(err)
            })
        },
        filterOption(input, option) {
            return (
                option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
            );
        }
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
<style>

</style>