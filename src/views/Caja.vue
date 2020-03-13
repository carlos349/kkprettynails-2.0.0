<template>
    <div>
        <base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                     style="min-height: 50px; background-image: url(img/theme/users.jpg); background-size: cover; background-position: center top;">
            <!-- Mask -->
            <span style="background-color:#172b4d !important" class="mask  opacity-7"></span>
            <!-- Header container -->
            <div class="container-fluid d-flex align-items-center">
                <div class="row">
                    <div class="col-lg-7 col-md-10">
                        <h1 class="display-2 text-white">Sección de caja</h1>
                        <p class="text-white mt-0 mb-5">Esta es la sección administrativa de tus caja, aquí podrás registrar, editar y visualizar todos los cierres de caja.</p>
                        <a class="btn btn-success text-white cursor-pointer" v-if="cashFunds.inspector" v-on:click="modals.modal2 = true">Registrar fondo de caja</a>
                        <a class="btn btn-success text-white cursor-pointer" v-else v-on:click="daySalesClose">Hacer cierre</a>
                    </div>
                </div>
            </div>
        </base-header>
        <vue-bootstrap4-table :rows="closing" :columns="columns" :classes="classes" :config="config">
            <template slot="format-date" slot-scope="props">
                {{formatDate(props.row.fecha)}}
            </template>
            <template slot="format-total" slot-scope="props">
                {{formatPrice(props.row.sistema.total)}}
            </template>
            <template slot="Administrar" slot-scope="props">
                <b>
                    <base-button size="sm" type="default" icon="ni ni-fat-remove" v-on:click="dataReport(props.row._id)">Reporte</base-button>
                </b>
            </template>
            <template slot="pagination-info" slot-scope="props">
                Actuales {{props.currentPageRowsLength}} | 
                 Filtrados {{props.filteredRowsLength}} | 
                Registros totales {{props.originalRowsLength}}
            </template>
            <template slot="selected-rows-info" slot-scope="props">
                Total Number of rows selected : {{props.selectedItemsCount}}
            </template>
        </vue-bootstrap4-table>
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
                            v-on:change="validRegister(3)"
                            v-model="cashFunds.cashName"
                            addon-left-icon="ni ni-circle-08">
                        </base-input>
                        <currency-input
                            v-model="cashFunds.cashAmount"
                            v-on:change="validRegister(3)"
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
        <modal :show.sync="modals.modal3"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-md">
            <card type="secondary" shadow
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-5 py-lg-5"
                  class="border-0">
                <template>
                    <div class="text-muted text-center mb-3">
                        <h3>Monto de egreso de la caja</h3>
                    </div>
                </template>
                <template>
                    <form role="form">
                        <currency-input
                            v-model="egressManual"
                            locale="de"
                            addon-left-icon="ni ni-money-coins"
                            class="form-control mb-3"
                            style="margin-top:-10px;"
                            v-on:change="validRegister(1)"
                        />	
                        <base-input 
                            alternative
                            class="mb-3"
                            placeholder="Nombre el cajero"
                            v-on:change="validRegister(1)"
                            v-model="closeIdentification"
                            addon-left-icon="ni ni-circle-08">
                        </base-input>
                        <base-button v-if="!validEgress" type="default" v-on:click="modals.modal4 = true" disabled>Continuar</base-button>
                        <base-button v-else type="default" v-on:click="modals.modal4 = true">Continuar</base-button>
                    </form>
            </template>
            </card>
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
                        <h3>Ingrese los montos de las ventas del dia</h3>
                    </div>
                </template>
                <template>
                    <form role="form" class="row">
                        <div class="col-6">
                            <label class="form-group">Fondo de caja</label>
                            <currency-input
                                v-model="getFund"
                                locale="de"
                                addon-left-icon="ni ni-money-coins"
                                class="form-control mb-3"
                                style="margin-top:-10px;"
                                readonly
                                v-on:change="validRegister(2)"
                            />	
                        </div>
                        <div class="col-6">
                            <label class="form-group">Efectivo</label>
                            <currency-input
                                v-model="cashManual"
                                locale="de"
                                addon-left-icon="ni ni-money-coins"
                                class="form-control mb-3"
                                style="margin-top:-10px;"
                                v-on:change="validRegister(2)"
                            />
                        </div>
                        <div class="col-6">
                            <label class="form-group">Efectivo</label>
                            <currency-input
                                label="Débito"
                                v-model="debitManual"
                                locale="de"
                                addon-left-icon="ni ni-money-coins"
                                class="form-control mb-3"
                                style="margin-top:-10px;"
                                v-on:change="validRegister(2)"
                            />
                        </div>
                        <div class="col-6">
                            <label class="form-group">Crédito</label>
                            <currency-input
                                v-model="creditManual"
                                locale="de"
                                addon-left-icon="ni ni-money-coins"
                                class="form-control mb-3"
                                style="margin-top:-10px;"
                                v-on:change="validRegister(2)"
                            />
                        </div>
                        <div class="col-6">
                            <label class="form-group">Transferencia</label>
                            <currency-input
                                label="Transferencia"
                                v-model="transferManual"
                                locale="de"
                                addon-left-icon="ni ni-money-coins"
                                class="form-control mb-3"
                                style="margin-top:-10px;"
                                v-on:change="validRegister(2)"
                            />
                        </div>
                        <div class="col-6">
                            <label class="form-group">Otros</label>
                           <currency-input
                                label="Otros"
                                v-model="othersManual"
                                locale="de"
                                addon-left-icon="ni ni-money-coins"
                                class="form-control mb-3"
                                style="margin-top:-10px;"
                                v-on:change="validRegister(2)"
                            /> 
                        </div>
                        <base-button v-if="!validFinally" type="default" class="float-right" disabled>Finalizar cierre</base-button>
                        <base-button v-else type="default" class="float-right" v-on:click="closeFinally">Finalizar cierre</base-button>
                    </form>
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
import VueBootstrap4Table from 'vue-bootstrap4-table'
export default {
    components: {
        VueBootstrap4Table 
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
            columns: [
                {
                    label: "Fecha",
                    name: "fecha",
                    slot_name:"format-date",
                    // filter: {
                    //     type: "simple",
                    //     placeholder: "id"
                    // },
                    sort: true,
                },
                {
                    label: "Encargado del cierre",
                    name: "identificacionCierre",
                    // filter: {
                    //     type: "simple",
                    //     placeholder: "id"
                    // },
                    sort: true,
                },
                {
                    label: "Total del cierre",
                    name: "sistema.total",
                    slot_name: "format-total",
                    // filter: {
                    //     type: "simple",
                    //     placeholder: "Enter first name"
                    // },
                    sort: true,
                },
                {
                    label: "Reportes",
                    name: "_id",
                    slot_name:'Administrar',
                    sort: true,
                }
            ],
            config: {
                card_title: "Tabla de cierres",
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
            closing: [],
            fund: 0,
            checker: '',
            cashFunds: {
                inspector: false,
                cashName: '',
                cashAmount: 0,
                valid: false 
            },
            getFund: 0,
            egressSystem: 0,
            cashSystem: 0,
            debitSystem: 0,
            creditSystem: 0,
            transferSystem: 0,
            otherSystem: 0,
            totalSystem: 0,
            egressManual: 0,
            fundManual: 0,
            cashManual: 0,
            debitManual: 0,
            creditManual: 0,
            transferManual: 0,
            othersManual: 0,
            closeIdentification: '',
            validFinally:false,
            validEgress:false
        }
    },
    created(){
        this.getClosing()
        this.getFunds()
    },
    methods: {
        getClosing(){
            axios.get(endPoint.endpointTarget+'/ventas/Closing')
            .then(res => {
                this.closing = res.data
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
        validRegister(valid){
            if (valid == 3) {
                this.cashFunds.valid = this.cashFunds.cashName != '' && this.cashFunds.cashAmount > 0 ? true : false
            }else if(valid == 2){
                const total = this.cashManual + this.cashManual + this.debitManual + this.creditManual + this.transferManual + this.othersManual
                this.validFinally = this.getFund > 0 && total > 0  ? true : false
            }else{
                this.validEgress = this.egressManual > 0 && this.closeIdentification != '' ? true : false
            }
            
        },
        registerFund(){
			axios.post(endPoint.endpointTarget+'/ventas/registerFund', {
				userRegister: this.cashFunds.cashName,
				amount: this.cashFunds.cashAmount
			}).then(res => {
				if (res.data.status == 'ok') {
					this.$swal({
						type: 'success',
						title: '¡Ya puede ingresar ventas!',
						showConfirmButton: false,
						timer: 1500
					})
                    this.cashFunds.cashName = ''
                    this.cashFunds.cashAmount= ''
                    this.getFunds()
                    this.cashFunds.inspector = false
				}
			})
		},
        getFunds(){
            axios.get(endPoint.endpointTarget+'/ventas/getFund')
            .then(res => {
                console.log(res)
                this.fund = res.data[0].amount
                this.checker = res.data[0].userRegister 
                if (this.fund == 0 || this.checker == '') {
                    this.cashFunds.inspector = true
                    this.fund = 0
                    this.checker = 'No hay cajero registrado'
                }
            })
        },
        daySalesClose(){
            axios.get(endPoint.endpointTarget+'/ventas/getFund')
            .then(res => {
                this.getFund = res.data[0].amount
                this.egressSystem = res.data[0].amount
                axios.get(endPoint.endpointTarget+'/ventas/getClosingDay')
                .then(res => {
                    if (res.data.status == 'bad') {
                        this.modals = {
                            modal1: true,
                            message: 'No puede hacer cierres sin ventas',
                            icon: 'ni ni-check-bold ni-5x',
                            type: 'success'
                        }
                        setTimeout(() => {
                            this.modals = {
                                modal1: false,
                                message: "",
                                icon: '',
                                type: ''
                            }
                        }, 1500);
                    }else{
                        this.cashSystem = res.data.efectivo
                        this.debitSystem = res.data.redCompraDebito
                        this.creditSystem = res.data.redCompraCredito
                        this.transferSystem = res.data.transferencia
                        this.otherSystem = res.data.otros
                        this.totalSystem = res.data.total
                        this.modals.modal3 = true
                    }
                })
            }) 
        },
        closeFinally(){
            var totalEfectivoSistema = parseFloat(this.getFund) + parseFloat(this.cashSystem) - parseFloat(this.egressManual)
            var totalEfectivoManual = parseFloat(this.getFund) + parseFloat(this.cashManual) - parseFloat(this.egressManual)
            var totalManual = this.cashManual + this.debitManual + this.creditManual + this.transferManual + this.othersManual
            axios.post(endPoint.endpointTarget+'/ventas/closeDay/'+this.closeIdentification, {
                efectivoSistema: parseFloat(this.cashSystem),
                redCompraDebitoSistema: parseFloat(this.debitSystem),
                redCompraCreditoSistema: parseFloat(this.creditSystem),
                transferenciaSistema: parseFloat(this.transferSystem),
                otrosSistema: parseFloat(this.otherSystem),
                totalSistema: parseFloat(this.totalSystem),
                fondoSistema: parseFloat(this.getFund),
                egresoSistema: parseFloat(this.egressManual),
                totalEfectivoSistema: parseFloat(totalEfectivoSistema),
                
                totalEfectivoManual: parseFloat(totalEfectivoManual),
                fondoManual: parseFloat(this.getFund),
                egresoManual: parseFloat(this.egressManual),
                efectivoManual: parseFloat(this.cashManual),
                redCompreDManual: parseFloat(this.debitManual),
                redCompreCManual: parseFloat(this.creditManual),
                transferenciaManual: parseFloat(this.transferManual),
                otrosManual: parseFloat(this.othersManual),
                totalManual: parseFloat(totalManual)
            })
            .then(res => {
                if (res.data.status == 'ok') {
                    this.modals = {
                        modal1: true,
                        message: 'Cierre hecho con exito',
                        icon: 'ni ni-check-bold ni-5x',
                        type: 'success'
                    }
                    setTimeout(() => {
                        this.modals = {
                            modal1: false,
                            message: "",
                            icon: '',
                            type: ''
                        }
                    }, 1500);
                }else{
                    console.log(res)
                }
            })
        },
        daySaleClosexx(){
            axios.get('ventas/getFund')
            .then(res => {
            const fondo = res.data[0].amount
            const egresoSistema = res.data[0].amount
            axios.get('ventas/getClosingDay')
            .then(res => {
                if (res.data.status === 'bad') {
                    this.$swal({
                        type: 'error',
                        title: 'Sin ventas el dia no se puede cerrar',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }else{
                const efectivo = res.data.efectivo
                const redCompraDebito = res.data.redCompraDebito
                const redCompraCredito = res.data.redCompraCredito
                const transferencia = res.data.transferencia
                const otros = res.data.otros
                const total = res.data.total
                this.$swal({
                    title: 'Por favor, registre el monto egresado de la caja',
                    input: 'number',
                    inputPlaceholder: 'Monto egreso',
                    showCloseButton: true,
                })
                .then(result => {
                    const egresoManual = result.value 
                    
                    this.$swal({
                    title: 'Verificación de ventas',
                    html: `
                        <form>
                        <div class="row">
                            <div class="form-group col-6" style="width:100%;">
                            <label style="float:left;">Fondo de la caja</label>
                            <input type="number" class="form-control classFondo" value="${fondo}" readonly requerid>
                            </div>
                            <div class="form-group col-6" style="width:100%;">
                            <label style="float:left;">Efectivo</label>
                            <input type="number" class="form-control classEfectivo" placeholder="$ 0" requerid>
                            </div>
                            <div class="form-group col-6" style="width:100%;">
                            <label style="float:left;">Débito</label>
                            <input type="number" class="form-control classRedcompreD" placeholder="$ 0" requerid>
                            </div>
                            <div class="form-group col-6" style="width:100%;">
                            <label style="float:left;">Crédito</label>
                            <input type="number" class="form-control classRedcompreC" placeholder="$ 0" requerid>
                            </div>
                            <div class="form-group col-6" style="width:100%;">
                            <label style="float:left;">Transferencias</label>
                            <input type="number" class="form-control classTransferencia" placeholder="$ 0" requerid>
                            </div>
                            <div class="form-group col-6" style="width:100%;">
                            <label style="float:left;">Otros</label>
                            <input type="number" class="form-control classOtros" placeholder="$ 0" requerid>
                            </div>
                        </div>
                        </form>
                    `,
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Confirmar',
                    cancelButtonText: 'Cerrar',
                    showCloseButton: true,
                    showLoaderOnConfirm: true
                    })
                    .then((result) => {
                        if(result.value) {
                        const fondoManual = $('.classFondo').val()
                        const efectivoManual = $('.classEfectivo').val()
                        const redCompreDManual = $('.classRedcompreD').val()
                        const redCompreCManual = $('.classRedcompreC').val()
                        const transferenciaManual = $('.classTransferencia').val()
                        const otrosManual = $('.classOtros').val()
                        const totalManual = parseFloat(efectivoManual) + parseFloat(redCompreDManual) + parseFloat(redCompreCManual) + parseFloat(transferenciaManual) + parseFloat(otrosManual)
                        
                        if (fondoManual == '' || efectivoManual == '' || redCompreDManual == '' || redCompreCManual == '' || otrosManual == '' || totalManual == '' || transferenciaManual == '') {
                            this.$swal({
                            type: 'error',
                            title: 'Complete todos los campos',
                            showConfirmButton: false,
                            timer: 1500
                            })
                        }else{
                            this.$swal({
                            title: 'Por favor, escriba su nombre ^^',
                            input: 'text',
                            inputPlaceholder: 'Escriba su nombre aquí',
                            showCloseButton: true,
                            })
                            .then(result => {
                            if (result.value == '') {
                                this.$swal({
                                type: 'error',
                                title: 'Debe escribir su nombre',
                                showConfirmButton: false,
                                timer: 1500
                                })
                            }else if(result.dismiss){
                                this.$swal({
                                type: 'info',
                                title: 'Aborto cierre',
                                showConfirmButton: false,
                                timer: 1500
                                })
                            }else{
                                var totalEfectivoSistema = parseFloat(fondo) + parseFloat(efectivo) - parseFloat(egresoManual)
                                var totalEfectivoManual = parseFloat(fondoManual) + parseFloat(efectivoManual) - parseFloat(egresoManual)
                        
                                const identificacionCierre = result.value
                                axios.post('ventas/closeDay/'+identificacionCierre, {
                                efectivoSistema: parseFloat(efectivo),
                                redCompraDebitoSistema: parseFloat(redCompraDebito),
                                redCompraCreditoSistema: parseFloat(redCompraCredito),
                                transferenciaSistema: parseFloat(transferencia),
                                otrosSistema: parseFloat(otros),
                                totalSistema: parseFloat(total),
                                fondoSistema: parseFloat(fondo),
                                egresoSistema: parseFloat(egresoManual),
                                totalEfectivoSistema: parseFloat(totalEfectivoSistema),
                                
                                totalEfectivoManual: parseFloat(totalEfectivoManual),
                                fondoManual: parseFloat(fondoManual),
                                egresoManual: parseFloat(egresoManual),
                                efectivoManual: parseFloat(efectivoManual),
                                redCompreDManual: parseFloat(redCompreDManual),
                                redCompreCManual: parseFloat(redCompreCManual),
                                transferenciaManual: parseFloat(transferenciaManual),
                                otrosManual: parseFloat(otrosManual),
                                totalManual: parseFloat(totalManual)
                                })
                                .then(res => {
                                if (res.data.status == 'ok') {
                                    this.$swal({
                                        type: 'success',
                                        title: 'Cierre hecho correctamente',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                }
                                })
                                .catch(err => {
                                console.log(err)
                                })
                            }
                            })
                        }
                        }else{
                        this.$swal({
                            type: 'info',
                            title: 'Aborto cierre',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        }
                    })
                })
                }
            })
            })
        },
    }
}
</script>