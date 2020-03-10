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
                        <h1 class="display-2 text-white">Sección de usuarios</h1>
                        <p class="text-white mt-0 mb-5">Esta es la sección administrativa de tus usuarios, aquí podrás registrar, editar y visualizar todos tus usuarios.</p>
                        <a @click="modals.modal1 = true , initialState(2)" class="btn btn-success text-white cursor-pointer">Registrar un usuario</a>
                    </div>
                </div>
            </div>
        </base-header>
        <modal :show.sync="modals.modal1"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-md">
            <card type="secondary" shadow
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-5 py-lg-5"
                  class="border-0">
                <template>
                    <div class="text-muted text-center mb-3">
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
                                    addon-left-icon="ni ni-single-02">
                        </base-input>
                        <base-input alternative
                                    class="mb-3"
                                    placeholder="Apellido"
                                    v-model="registerUser.lastname"
                                    v-on:change="validRegister()"
                                    addon-left-icon="ni ni-single-02">
                        </base-input>
                        <base-input alternative
                                    type="file"
                                    placeholder="Imagen"
                                    v-model="registerUser.image"
                                    v-on:change="validRegister()"
                                    addon-left-icon="ni ni-circle-08">
                        </base-input>
                        <base-input alternative
                                    type="text"
                                    placeholder="Correo"
                                    v-model="registerUser.correo"
                                    addon-left-icon="ni ni-email-83">
                        </base-input>
                        <base-input alternative
                                    type="text"
                                    :valid="registerUser.c"
                                    v-on:keyup="validFields('c')"
                                    placeholder="Confirmar correo"
                                    v-model="registerUser.correoConfirm"
                                    >
                        </base-input>
                        <base-input alternative
                                    type="text"
                                    placeholder="Contraseña"
                                    v-model="registerUser.password"
                                    addon-left-icon="ni ni-lock-circle-open">
                        </base-input>
                        <base-input alternative
                                    type="text"
                                    :valid="registerUser.p"
                                    v-on:keyup="validFields('p')"
                                    placeholder="Confirmar contraseña"
                                    v-model="registerUser.passwordConfirm"
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
        <!-- TABLA DE CLIENTES -->

        <vue-bootstrap4-table :rows="users" :columns="columns" :classes="classes" :config="config">
            <template slot="Administrar" slot-scope="props">
                <b>
                    <base-button size="sm" type="default" @click="modals.modal1 = true , initialState(3), pushData(props.row.nombre, props.row.identidad, props.row.correoCliente, props.row.instagramCliente, props.row.participacion, props.row.recomendacion, props.row.recomendaciones, props.row.ultimaFecha, props.row.fecha, props.row._id)" icon="ni ni-bullet-list-67">Detalles</base-button>
                    <base-button size="sm" v-on:click="deleteClient(props.row._id)" type="warning" icon="ni ni-fat-remove">Eliminar</base-button>
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
import endPoint from '../../config-endpoint/endpoint.js'
import VueBootstrap4Table from 'vue-bootstrap4-table'
// COMPONENTS

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
        modals: {
            modal1: false
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
                sort: true,
            },
            {
                label: "Estado",
                name: "status",
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
        }     
      };
    },
    created(){
		this.getUsers();
        
    },
    methods: {
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
            return dateFormat.getDate()+"-"+(dateFormat.getMonth() + 1)+"-"+dateFormat.getFullYear()+" "+" ("+ dateFormat.getHours()+":"+ dateFormat.getMinutes()+")"
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