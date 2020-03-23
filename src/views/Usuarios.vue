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
                        <h1 class="display-2 text-white">Sección de usuarios</h1>
                        <p class="text-white mt-0 mb-2">Esta es la sección administrativa de tus usuarios, aquí podrás registrar, editar y visualizar todos tus usuarios.</p>
                        <a @click="modals.modal1 = true , initialState(2)" class="btn btn-success text-white cursor-pointer">Registrar un usuario</a>
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
                        Datos del usuario
                    </div>
                </template>
                <template>
                    <form role="form">
                        <base-input alternative
                                    class="mb-3"
                                    placeholder="Nombre"
                                    v-model="registerUser.name"
                                    v-on:change="validRegister()"
                                    addon-left-icon="ni ni-single-02"
                                    addon-right-icon="fa fa-asterisk text-danger">
                        </base-input>
                        <base-input alternative
                                    class="mb-3"
                                    placeholder="Apellido"
                                    v-model="registerUser.lastname"
                                    v-on:change="validRegister()"
                                    addon-left-icon="ni ni-single-02"
                                    addon-right-icon="fa fa-asterisk text-danger"   >
                        </base-input>
                        <input type="file" id="file" ref="file" v-on:change="handleFileUpload()" class="form-control mb-3" >
                        <base-input alternative
                                    type="text"
                                    placeholder="Correo"
                                    v-model="registerUser.correo"
                                    addon-left-icon="ni ni-email-83"
                                    addon-right-icon="fa fa-asterisk text-danger">
                        </base-input>
                        <base-input alternative
                                    type="text"
                                    :valid="registerUser.c"
                                    v-on:keyup="validFields('c')"
                                    placeholder="Confirmar correo"
                                    v-model="registerUser.correoConfirm"
                                    addon-right-icon="fa fa-asterisk text-danger"
                                    >
                        </base-input>
                        <base-input alternative
                                    type="password"
                                    placeholder="Contraseña"
                                    v-model="registerUser.password"
                                    addon-left-icon="ni ni-lock-circle-open"
                                    addon-right-icon="fa fa-asterisk text-danger">
                        </base-input>
                        <base-input alternative
                                    type="password"
                                    :valid="registerUser.p"
                                    v-on:keyup="validFields('p')"
                                    placeholder="Confirmar contraseña"
                                    v-model="registerUser.passwordConfirm"
                                    addon-right-icon="fa fa-asterisk text-danger"
                                    >
                        </base-input>
                        <div class="text-center">
                            <base-button type="primary" v-if="registerUser.valid == false" disabled class="my-4">Registrar</base-button>
                            <base-button type="primary" v-on:click="registerUsers()" v-else class="my-4">Registrar</base-button>
                        </div>
                        
                    </form>
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
                    <form role="form">
                        <vue-single-select
                            v-model="linkLender"
                            :options="lenderNames"
                            placeholder="Prestadores"
                        ></vue-single-select>
                        <base-button type="default" v-on:click="estatusEdit(idSelect, 3, 'no-prestador')">
                            Vincular
                        </base-button>  
                    </form>
            </template>
            </card>
        </modal>
        <modal :show.sync="modals.modal3"
               :gradient="modals.type"
               modal-classes="modal-danger modal-dialog-centered">
            <div class="py-3 text-center">
                <i :class="modals.icon"></i>
                <h1 class="heading mt-5">{{modals.message}}</h1>
            </div>
        </modal>
        <!-- TABLA DE CLIENTES -->

        <vue-bootstrap4-table class="text-left" :rows="users" :columns="columns" :classes="classes" :config="config">
            <template slot="date-format" class="text-left" slot-scope="props">
                <p>{{formatDate(props.row.LastAccess)}}</p>
            </template>
            <template slot="status-format" slot-scope="props">
                <base-dropdown class="w-100">
                    <base-button size="sm" v-if="props.row.status == 1" slot="title" type="primary" class="dropdown-toggle w-100">
                        Gerente
                    </base-button>
                    <base-button size="sm" v-if="props.row.status == 2" slot="title" type="success" class="dropdown-toggle w-100">
                        Cajera
                    </base-button>
                    <base-button size="sm" v-if="props.row.status == 3" slot="title" type="default" class="dropdown-toggle w-100">
                        Prestadora
                    </base-button>
                    <a class="dropdown-item" v-on:click="estatusEdit(props.row._id, 1, 'no-prestador')">Gerencia</a>
                    <a class="dropdown-item" v-on:click="estatusEdit(props.row._id, 2, 'no-prestador')">Personal de caja</a>
                    <a class="dropdown-item" v-on:click="estatusEdit(props.row._id, 3, 'prestador')">Prestador</a>
                </base-dropdown>
            </template>
            <template slot="Administrar" slot-scope="props">
                <b>
                    <center>
                        <base-button size="sm" v-on:click="deleteClient(props.row._id, props.row.status)" type="warning" icon="ni ni-fat-remove">Eliminar</base-button>
                    </center>
                    
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
import jwtDecode from 'jwt-decode'
// COMPONENTS
import VueBootstrap4Table from 'vue-bootstrap4-table'
  export default {
    components: {
        VueBootstrap4Table 
    },
    data() {
      return {
        registerUser: {
            name:null,
            lastname:null,
            image:null,
            correo:null,
            correoConfirm:null,
            password:null,
            passwordConfirm:null,
            valid:false,
            valid2:false,
            date:null,
            c:null,
            p:null
        },
        linkLender:'',
        lenderNames: [],
        modals: {
            modal1: false,
            modal2: false,
            modal3: false,
            message: "",
            icon: '',
            type:''
        },
        users: [],
        columns: [{
                label: "Nombre",
                name: "first_name",
                // filter: {
                //     type: "simple",
                //     placeholder: "id"
                // },
                sort: true,
            },
            {
                label: "Apellido",
                name: "last_name",
                // filter: {
                //     type: "simple",
                //     placeholder: "id"
                // },
                sort: true,
            },
            {
                label: "Correo",
                name: "email",
                // filter: {
                //     type: "simple",
                //     placeholder: "Enter first name"
                // },
                sort: true,
            },
            {
                label: "Ultimo acceso",
                name: "LastAccess",
                slot_name:'date-format',
                sort: true,
            },
            {
                label: "Estado",
                name: "status",
                slot_name:"status-format",
                sort: true,
                // filter: {
                //     type: "simple",
                //     placeholder: "Enter country"
                // },
            },
            {
                label: "Eliminar",
                name: "_id",
                sort: false,
                slot_name: "Administrar"
            },
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
        classes: {
            table: "table-bordered table-striped"
        },
        idSelect: '',
        file: '' 
      };
    },
    created(){
		this.getUsers();
        this.getLenders()
    },
    methods: {
        handleFileUpload(){
			this.file = this.$refs.file.files[0]
			console.log(this.file)
        },
        registerUsers(){
            let formData = new FormData();
            formData.append('image', this.file)
            const configToken = {headers: {'x-access-token': localStorage.userToken}}
            axios.post(endPoint.endpointTarget+'/users/register',{
                first_name: this.registerUser.name,
                last_name: this.registerUser.lastname,
                email: this.registerUser.correo,
                password: this.registerUser.password,
            }, configToken)
            .then(res => {
                this.modals = {
                    modal3: true,
                    message: '¡Usuario registrado con exito!',
                    icon: 'ni ni-check-bold ni-5x',
                    type: 'success'
                }
                setTimeout(() => {
                    console.log(this.modals.modal3)
                    this.modals = {
                        modal3: false,
                        message: "",
                        icon: '',
                        type: ''
                    }
                    this.initialState(1)
                    this.getUsers()
                    const id = res.data.status
                    const config = {headers: {'Content-Type': 'multipart/form-data', 'x-access-token': localStorage.userToken}}
                    axios.post(endPoint.endpointTarget+`/users/registerImage/${id}`, formData, config)
                    .then(resData => {
                        console.log(resData)
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }, 1500);
            })
        },
        getUsers(){
			const config = {headers: {'x-access-token': localStorage.userToken}}
			axios.get(endPoint.endpointTarget+'/users', config)
			.then(res => {
			this.users = res.data
			})
			.catch(err => {
				this.$swal({
					type: 'error',
					title: 'Acceso invalido, ingrese de nuevo, si el problema persiste comuniquese con el proveedor del servicio',
					showConfirmButton: false,
					timer: 2500
				})
				router.push({name: 'Login'})
			})
        },
        getLenders(){
            axios.get(endPoint.endpointTarget+'/manicuristas')
            .then(res => {
                console.log(res.data)
                for (let index = 0; index < res.data.length; index++) {
                    this.lenderNames.push(res.data[index].nombre + " / " + res.data[index].documento)
                }
            })
        },
        validRegister(){
            this.registerUser.valid = this.registerUser.name != '' && this.registerUser.lastname && this.registerUser.c == true && this.registerUser.p == true ? true : false
        },
        validFields(field){
            if (field == 'c') {
                this.registerUser.c = this.registerUser.correo == this.registerUser.correoConfirm ? true : false
                this.validRegister()
            }
            if (field == 'p') {
                this.registerUser.p = this.registerUser.password == this.registerUser.passwordConfirm ? true : false
                this.validRegister()
            } 
        },
        initialState(val){
            this.registerUser = {
                name:null,
                lastname:null,
                image:null,
                correo:null,
                correoConfirm:null,
                password:null,
                passwordConfirm:null,
                valid:false,
                valid2:false,
                date:null,
                c:null,
                p:null
            }
            if (val == 1) {
                this.modals = {
                    modal1: false
                }
            }
            if (val == 2) {
                this.tipeForm = 'Registrar'
            }
            if (val == 3) {
                this.tipeForm = 'Editar'
            }
        },
        formatDate(date) {
            let dateFormat = new Date(date)
			return dateFormat.getDate()+"-"+(dateFormat.getMonth() + 1)+"-"+dateFormat.getFullYear()+' ('+dateFormat.getHours()+":"+('0'+dateFormat.getMinutes()).slice(-2)+")"
        },
        deleteClient(id, admin){
			this.$swal({
				title: '\n¿Está seguro de borrar usuario?',
				text: 'No puedes revertir esta acción',
				type: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Estoy seguro',
				cancelButtonText: 'No, evitar acción',
				showCloseButton: true,
				showLoaderOnConfirm: true
			}).then((result) => {
				if(result.value) {
					if(admin == 1){
						this.modals = {
                            modal3: true,
                            message: "No puede borrar un gerente",
                            icon: 'ni ni-fat-remove ni-5x',
                            type: 'danger'
                        }
                        setTimeout(() => {
                            this.modals = {
                                modal3: false,
                                message: "",
                                icon: '',
                                type: ''
                            }
                        }, 1500);
					}else{
						const configToken = {headers: {'x-access-token': localStorage.userToken}}
						axios.delete(endPoint.endpointTarget+'/users/' + id, configToken)
						.then(res => {
                            this.modals = {
                                modal3: true,
                                message: res.data.first_name+' '+res.data.last_name+' ha sido Borrado',
                                icon: 'ni ni-check-bold ni-5x',
                                type: 'success'
                            }
                            setTimeout(() => {
                                this.modals = {
                                    modal3: false,
                                    message: "",
                                    icon: '',
                                    type: ''
                                }
                            }, 1500);
							this.getUsers()
						})
						.catch(err => {
							this.$swal({
								type: 'error',
								title: 'Acceso invalido, ingrese de nuevo, si el problema persiste comuniquese con el proveedor del servicio',
								showConfirmButton: false,
								timer: 2500
							})
							router.push({name: 'login'})
						})
					}
				} else {
					this.modals = {
                        modal3: true,
                        message: "Acción cancelada",
                        icon: 'ni ni-check-bold ni-5x',
                        type: 'success'
                    }
                    setTimeout(() => {
                        this.modals = {
                            modal3: false,
                            message: "",
                            icon: '',
                            type: ''
                        }
                    }, 1500);
				}
			})
		},
        estatusEdit(id, status, type){
			const token = localStorage.userToken
			const decoded = jwtDecode(token)
			const idDecoded = decoded._id
			const ifStatus = decoded.status
			if (idDecoded == id && ifStatus == 1) {
				this.$swal({
					title: '¿Está seguro de cambiarse el estado?',
					text: '¡Si no hay otro gerente registrado, no podrás regresar tu estado!',
					type: 'warning',
					showCancelButton: true,
					confirmButtonText: 'Estoy seguro',
					cancelButtonText: 'No, evitar acción',
					showCloseButton: true,
					showLoaderOnConfirm: true
				}).then(result => {
					if (result.value) {
						if (type == 'prestador') {
							this.modals.modal2 = true
							this.idSelect = id
						}else{
							const config = {headers: {'x-access-token': localStorage.userToken}}
							axios.put(endPoint.endpointTarget+'/users/'+id, {
								status: status,
								employe: this.linkLender
							}, config)
							.then(res => {
								// if (idDecoded == id) {
								// 	EventBus.$emit('change-status', status)
								// 	localStorage.setItem('logged-in', status)
								// 	setTimeout(() => {
								// 		router.push({name: 'Agendamiento'})
								// 	}, 1000);
								// }
								this.getUsers()
								this.linkLender = ''
								this.modals.modal2 = false
							})
							.catch(err => {
								this.$swal({
									type: 'error',
									title: 'Acceso invalido, ingrese de nuevo, si el problema persiste comuniquese con el proveedor del servicio',
									showConfirmButton: false,
									timer: 2500
								})
								router.push({name: 'Login'})
							})
						}
					}else{
						this.$swal({
							type: 'info',
							title: 'Acción cancelada',
							showConfirmButton: false,
							timer: 1500
						})
					}
				})
			}else{
				if (type == 'prestador') {
					this.modals.modal2 = true
					this.idSelect = id
				}else{
					const config = {headers: {'x-access-token': localStorage.userToken}}
					axios.put(endPoint.endpointTarget+'/users/'+id, {
						status: status,
						employe: this.linkLender
					}, config)
					.then(res => {
						if (idDecoded == id) {
							EventBus.$emit('change-status', status)
							localStorage.setItem('logged-in', status)
							router.push({name: 'Citas'})
						}
						this.getUsers()
						this.linkLender = ''
						this.modals.modal2 = false
					})
					.catch(err => {
						this.$swal({
							type: 'error',
							title: 'Acceso invalido, ingrese de nuevo, si el problema persiste comuniquese con el proveedor del servicio',
							showConfirmButton: false,
							timer: 2500
						})
						router.push({name: 'login'})
					})
				}
			}
		},
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