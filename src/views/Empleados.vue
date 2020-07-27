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
                        <base-input alternative
                                    class="mb-3"
                                    placeholder="Nombre del empleado"
                                    v-model="registerEmploye.name"
                                    v-on:keyup="validRegister()"
                                    addon-left-icon="ni ni-single-02"
                                    addon-right-icon="fa fa-asterisk text-danger">
                        </base-input>
                        <base-input alternative
                                    class="mb-3"
                                    placeholder="Documento"
                                    v-model="registerEmploye.id"
                                    v-on:keyup="validRegister()"
                                    v-on:change="registerEmploye.id = formatRut(registerEmploye.id)"
                                    addon-left-icon="ni ni-key-25"
                                     addon-right-icon="fa fa-asterisk text-danger">
                        </base-input>
                        <template>
                            <div class="text-muted text-center mb-3">Horario libre</div>
                        </template>
                        <div class="row">
                            <template>
                                <div class="text-muted col-6 text-center">Desde <i style="font-size:.5em;color:#f5365c;position:absolute;top:18%;left:65%" class="fa fa-asterisk"></i> </div>
                                <div class="text-muted col-6 text-center mb-3">Hasta<i style="font-size:.5em;color:#f5365c;position:absolute;top:30%;left:64%" class="fa fa-asterisk"></i></div>
                            </template >
                            <select v-on:change="validRegister()" class="form-control mb-3 mx-auto col-5" v-model="registerEmploye.timeRestOne">
                                <option style="color:black;" selected value="Seleccione el tiempo">Seleccione el tiempo</option>
                                <option style="color:black;" value="12:00">12:00</option>
                                <option style="color:black;" value="12:30">12:30</option>
                                <option style="color:black;" value="13:00">13:00</option>
                                <option style="color:black;" value="13:30">13:30</option>
                                <option style="color:black;" value="14:00">14:00</option>
                            </select>
                            <select v-on:change="validRegister()" class="form-control mb-3 mx-auto col-5" v-model="registerEmploye.timeRestTwo">
                                <option style="color:black;" selected value="Seleccione el tiempo">Seleccione el tiempo</option>
                                <option style="color:black;" value="12:30">12:30</option>
                                <option style="color:black;" value="13:00">13:00</option>
                                <option style="color:black;" value="13:30">13:30</option>
                                <option style="color:black;" value="14:00">14:00</option>
                                <option style="color:black;" value="14:30">14:30</option>
                            </select>
                        </div>
                        <template>
                            <div class="text-muted text-center mb-3">
                                Día libre <i style="font-size:.5em;color:#f5365c;position:absolute;left:58%;bottom:43%" class="fa fa-asterisk"></i>
                            </div>
                        </template>
                        <select v-on:change="validRegister()" class="form-control mb-3 mx-auto" v-model="registerEmploye.dayFree">
                            <option style="color:black;" selected value="Seleccione el día">Seleccione el día</option>
                            <option style="color:black;" value="1">Lunes</option>
                            <option style="color:black;" value="2">Martes</option>
                            <option style="color:black;" value="3">Miercoles</option>
                            <option style="color:black;" value="4">Jueves</option>
                            <option style="color:black;" value="5">Viernes</option>
                            <option style="color:black;" value="6">Sabado</option>
                        </select>
                        <div class="text-center">
                            <base-button type="primary" v-if="registerEmploye.valid == false" disabled class="my-4">{{tipeForm}}</base-button>
                            <base-button type="primary" v-on:click="proccess()" v-else class="my-4">{{tipeForm}}</base-button>
                        </div>
                        
                    </form>
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

        <vue-bootstrap4-table :rows="employes" :columns="columns" :classes="classes" :config="config">
            <template slot="Administrar" slot-scope="props">
                <b>
                    <center>
                        <base-button v-if="validRoute('empleados', 'detalle')" size="sm" type="default" @click="modals.modal1 = true , initialState(3), pushData(props.row.nombre, props.row.documento, props.row.restTime, props.row.restDay, props.row._id,props.row.comision)" icon="ni ni-bullet-list-67">Detalles</base-button>
                        <base-button v-else disabled size="sm" type="default" icon="ni ni-bullet-list-67">Detalles</base-button>
                        <base-button v-if="validRoute('empleados', 'reportes')" size="sm" v-on:click="reportEmploye(props.row._id)" type="primary" icon="ni ni-align-center">Reporte</base-button>
                        <base-button v-else size="sm" disabled type="primary" icon="ni ni-align-center">Reporte</base-button>
                        <base-button v-if="validRoute('empleados', 'eliminar')" size="sm" v-on:click="deleteEmploye(props.row._id)" type="warning" icon="ni ni-fat-remove">Eliminar</base-button>
                        <base-button v-else size="sm" disabled type="warning" icon="ni ni-fat-remove">Eliminar</base-button>
                    </center>
                    
                </b>
            </template>
            <template slot="total" slot-scope="props">
                <b>
                   {{formatPrice(props.row.comision - props.row.advancement + props.row.bonus)}}
                </b>
            </template>
            <template slot="comision" slot-scope="props">
                <b>
                   {{formatPrice(props.row.comision)}}
                </b>
            </template>
            <template slot="bono" slot-scope="props">
                <b>
                   {{formatPrice(props.row.bonus)}}
                </b>
            </template>
            <template slot="advancement" slot-scope="props">
                <b>
                   {{formatPrice(props.row.advancement)}}
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
        registerEmploye: {
            name:'',
            id:'',
            timeRestOne:"Seleccione el tiempo",
            timeRestTwo:"Seleccione el tiempo",
            dayFree:"Seleccione el día",
            _id:'',
            comision:'',
            valid:false,
            valid2:false,
        },
        modals: {
            modal1: false,
            modal2: false,
            message: "",
            icon: '',
            type:''
        },
        employes: [],
        columns: [{
                label: "Nombre",
                name: "nombre",
                // filter: {
                //     type: "simple",
                //     placeholder: "id"
                // },
                sort: true,
            },
            {
                label: "Identidad",
                name: "documento",
                // filter: {
                //     type: "simple",
                //     placeholder: "id"
                // },
                sort: true,
            },
            {
                label: "Comisión",
                name: "comision",
                // filter: {
                //     type: "simple",
                //     placeholder: "Enter first name"
                // },
                sort: true,
                slot_name : "comision"
            },
            {
                label: "Bonos",
                name: "bonus",
                // filter: {
                //     type: "simple",
                //     placeholder: "Enter first name"
                // },
                sort: true,
                slot_name : "bono"
            },
            {
                label: "Avances",
                name: "advancement",
                sort: true,
                slot_name: "advancement"
            },
            {
                label: "Total",
                name: "status",
                sort: true,
                slot_name: "total"
                // filter: {
                //     type: "simple",
                //     placeholder: "Enter country"
                // },
            },
            {
                label: "Administrar",
                name: "_id",
                sort: false,
                slot_name: "Administrar"
            },
            ],
        config: {
            card_title: "Tabla de empleados",
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
        }     
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
        this.getEmployes();
        this.getToken()
        console.log(this.auth)
    },
    methods: {
        getEmployes(){
			axios.get(endPoint.endpointTarget+'/manicuristas')
			.then(res => {
                this.employes = res.data
                
			})
        },
        getToken(){
            const token = localStorage.userToken
            const decoded = jwtDecode(token)  
            this.auth = decoded.access
        },
        reportEmploye(id){
            localStorage.setItem('idReportEmploye', id)
            router.push({path: '/reporteEmpleado'})
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
			const nombre = this.registerEmploye.name.replace(/\s*$/,"");
			const documento = this.registerEmploye.id.replace(/\s*$/,"");
			const restTime = this.registerEmploye.timeRestOne+"/"+this.registerEmploye.timeRestTwo	
				axios.post(endPoint.endpointTarget+'/manicuristas', {
				nombreManicurista: nombre,
				documentoManicurista:documento,
				restTime: restTime,
                restDay: this.registerEmploye.dayFree
			})
			.then(res => {
				if(res.data.status == 'Manicurista ingresada'){
                    this.modals = {
                        modal2: true,
                        message: "¡Empleado registrado con exito!",
                        icon: 'ni ni-check-bold ni-5x',
                        type: 'success'
                    }
                    setTimeout(() => {
                        this.initialState(1)
                        this.getEmployes()
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
			
        },
        updateEmploye(){
			const nombre = this.registerEmploye.name.replace(/\s*$/,"");
			const documento = this.registerEmploye.id.replace(/\s*$/,"");
			const restTime = this.registerEmploye.timeRestOne+"/"+this.registerEmploye.timeRestTwo	
				axios.put(endPoint.endpointTarget+'/manicuristas/' + this.registerEmploye._id, {
					nombre: nombre,
					documento: documento,
					restTime: restTime,
					restDay: this.registerEmploye.dayFree,
					comision: this.registerEmploye.comision
				})
				.then(res => {
					if(res.data.status == "Manicurista Editada"){
						this.modals = {
                            modal2: true,
                            message: "¡Emplado editado con exito!",
                            icon: 'ni ni-check-bold ni-5x',
                            type: 'success'
                        }
                        setTimeout(() => {
                            this.initialState(1)
                            this.getEmployes()
                            EventBus.$emit('reloadLenders', 'reload')
                        }, 2000);
						// this.emitMethod()
					}else{
						this.$swal({
							type: 'error',
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
                showCancelButton: true,
                confirmButtonText: 'Si',
                cancelButtonText: 'No',
                showCloseButton: true,
                showLoaderOnConfirm: true
            })
            .then(result => {
                if (result.value) {
                    axios.delete(endPoint.endpointTarget+'/manicuristas/' + id)
                    .then(res => {
                        if(res.data.status = 'Prestador borrado'){
                            this.modals = {
                                modal2: true,
                                message: "¡Emplado eliminado!",
                                icon: 'ni ni-check-bold ni-5x',
                                type: 'success'
                            }
                            setTimeout(() => {
                                this.initialState(1)
                                this.getEmployes()
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
        pushData(nombre,id,restTime,restDay,_id,comision){
            var sp = restTime.split("/")
            this.registerEmploye= {
                name:nombre,
                id:id,
                timeRestOne:sp[0],
                timeRestTwo:sp[1],
                dayFree:restDay,
                _id:_id,
                comision:comision
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
                name:'',
                id:'',
                timeRestOne:"Seleccione el tiempo",
                timeRestTwo:"Seleccione el tiempo",
                dayFree:"Seleccione el día",
                _id:'',
                comision:'',
                valid:false,
                valid2:false,
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
                this.tipeForm = 'Registrar'
            }
            if (val == 3) {
                this.tipeForm = 'Editar'
            }
        },
        validRegister(){
            if (this.registerEmploye.name != '' && this.registerEmploye.id != '' && this.registerEmploye.timeRestOne != "Seleccione el tiempo" &&  this.registerEmploye.timeRestTwo != "Seleccione el tiempo" &&  this.registerEmploye.dayFree != "Seleccione el día") {
                this.registerEmploye.valid = true
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
        formatRut(value) {
			let around = value.length - 2
			let concat = ''
			for (let index = 0; index < value.length; index++) {
				concat = concat + value[index]
				if (around == index) {
					concat = concat + '.'
				}
			} 
			let val = concat.replace('.', '-')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
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
</style>