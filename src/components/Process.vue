<template>
    <div class="row">
        <div class="col-6">
            <div>
              <vue-single-select
                v-model="clientSelect"
                :options="clientNames"
                placeholder="Clientes"
                ></vue-single-select>  
            </div>
        </div>
        <div class="col-6">
            <div>
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
                            <base-input alternative
                                type="text"
                                placeholder="Filtrar servicios"
                                addon-left-icon="ni ni-zoom-split-in"
                                v-on:keyup="myFunction()"
                                id="myInput"
                                class="w-75"
                            ></base-input>
                        </th>
                        <th style="color:white;border:none" class="text-left pl-5 pb-3">
                            Precio 
                        </th>
                    </tr>
                </thead>
            </table>
            <vue-custom-scrollbar class="ListaProcesar">
                <table class="table tableBg" id="myTable">
                    <tbody>
                        <tr v-for="(servicio, index) in services" v-bind:key="servicio._id">
                            <td style="border:none;padding:5px;" v-if="servicio.active" class="font-weight-bold" >
                                <base-button size="sm"  type="default" class="w-75" v-on:click="conteoServicio(servicio._id,servicio.nombre, servicio.precio, servicio.comision, servicio.descuento), countServices[index].count++">
                                    <span class="float-left">{{servicio.nombre}}</span>
                                    <badge type="primary" class="float-right">{{countServices[index].count}}</badge>
                                </base-button>
                                <base-button size="sm" type="default" v-on:click="borrarServicio(servicio.nombre,index,servicio._id,servicio.precio, servicio.descuento)">
                                    <font-awesome-icon icon="times"/>
                                </base-button>
                            </td>
                            <td style="border:none" v-if="servicio.active" class=" font-weight-bold text-center">
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
                        v-model="design"
                        placeholder="Diseño"
                        locale="de"
                        class="form-control"
                        v-on:keyup="addDesign()"/>
                </div>
            </div>
            <span class="spanInputs w-100 font-weight-bold text-center text-white input-group-text text-center mb-2" style="background-color: #172b4d !important; color:white !important; border:none !important;padding-top:10px;border-radius:10px !important;" ><h5 class="text-center w-100 text-white" style="margin-bottom:0;">Medios de pago</h5> </span>
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
    </div>
</template>
<script>
import axios from 'axios'
import router from '../router'
import endPoint from '../../config-endpoint/endpoint.js'
import jwtDecode from 'jwt-decode'

import EventBus from './EventBus'
import vueCustomScrollbar from 'vue-custom-scrollbar'
export default {
    components: {
        vueCustomScrollbar
    },
    data(){
        return {
            modals: {
                modal1: false,
                message: "",
                icon: '',
                type:''
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
            dateSale:'fecha',
            idProcess: '',
            docLender: ''
        }
    },
    created(){
        this.getClient()
        this.getLenders()
        this.getServices()
    }, 
    methods: {
        getClient(){
            axios.get(endPoint.endpointTarget+'/clients')
            .then(res => {
                for (let index = 0; index < res.data.length; index++) {
                    this.clientNames.push(res.data[index].nombre+ ' / ' +res.data[index].identidad)
                }
            })
        },
        getLenders(){
            axios.get(endPoint.endpointTarget+'/manicuristas')
            .then(res => {
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
			console.log(parseFloat(this.price))
			this.price = this.formatPrice(precioTotal)
			this.subTotal = precioTotal
			this.totalSinFormato = precioTotal + this.design
			
			if(this.discount === ''){
				this.total = this.formatPrice(precioTotal+ this.design)
			}else{
				this.total = this.formatPrice(precioTotal)
				for (let index = 0; index < this.serviciosSelecionados.length; index++) {
					if (!this.serviciosSelecionados[index].descuento) {
						const precioConDescuento = parseFloat(this.subTotal) * parseFloat(porcentaje) 
						this.total = this.formatPrice(precioConDescuento)
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
			console.log(this.serviciosSelecionados)
			axios.put(endPoint.endpointTarget+'/ventas/updateProviderMonth/' + this.lenderSelect)
			.catch(err => {
				console.log(err)
			})
        },
        borrarServicio(nombre, index, _id, precio, descuento){
            for (var i = 0; i < this.serviciosSelecionados.length; i++) {
				console.log(i)
				if (this.serviciosSelecionados[i].servicio == nombre ) {
					this.serviciosSelecionados.splice(i, 1)
					break
				}
            }
            console.log(this.countServices[index].count)
			if (this.countServices[index].count != 0) {
                this.countServices[index].count--
				const subTotal = parseFloat(this.subTotal) - parseFloat(precio) 
				this.price = this.formatPrice(subTotal)
				this.subTotal = subTotal
                this.totalSinFormato = subTotal+ this.design
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
						this.totalSinFormato = precioConDescuento+ this.design
					}
					if(this.discount == '' || this.discount == 0){
						if (this.design == '') {
							this.totalSinFormato = this.subTotal+ this.design
							this.total = this.formatPrice(this.subTotal+ this.design)
						}
						else{
							this.totalSinFormato = this.subTotal + this.design
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
			axios.get(endPoint.endpointTarget+'/manicuristas/justone/' + this.lenderSelect)
			.then(res => {
				this.docLender = res.data.documento
				this.nombreManicurista = this.lenderSelect
				console.log(this.docLender)
			})
			.catch(err => {
				console.log(err)
			})
        },
        initialState(){
            this.getServices()
			this.price = '0';
			this.serviciosSelecionados = [];
			this.discount = "";
			this.total = 0;
			this.totalSinFormato = 0;
			this.design = ''
			this.payCash = ''
			this.payOthers = ''
			this.payDebit = ''
			this.payCredit = ''
			this.payTransfer = ''
			this.lenderSelect = ''
			this.clientSelect = ''
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
            console.log(totalFormadePago)
			if (this.clientSelect != '' && this.lenderSelect != '') {
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
						fecha:this.dateSale,
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
                                    message: "",
                                    icon: '',
                                    type: ''
                                }
                            }, 1500);
							this.servicios =''
							this.initialState()
							EventBus.$emit('reloadCitas', 'process')
							EventBus.$emit('reloadVenta', 'process')
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
                        message: "",
                        icon: '',
                        type: ''
                    }
                }, 1500);
			}
			
		},
    }
}
</script>
<style >
    .table thead tr th{
        padding-bottom: 5px;
        padding-top: 5px;
        padding-left: 15px !important;
    }
    .table thead tr th .form-group{
        margin-bottom: 0;
    }
    .ListaProcesar{
		overflow-x: hidden;
		overflow-y:scroll;
		max-height: 190px;
		height:110px;
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
</style>
