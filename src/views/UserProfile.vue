<template>
    <div>
        <base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                     style="min-height: 600px; background-image: url(img/theme/profile-cover.jpg); background-size: cover; background-position: center top;">
            <!-- Mask -->
            <span class="mask bg-gradient-success opacity-8"></span>
            <!-- Header container -->
            <div class="container-fluid d-flex align-items-center">
                <div class="row">
                    <div class="col-lg-7 col-md-10">
                        <h1 class="display-2 text-white">Hola {{model.first_name}}</h1>
                        <p class="text-white mt-0 mb-5">Este es tu perfil, puedes ver tu progreso trabajando para KKPrettyNails, en las diferentes secciones.Tambien puedes editar tus datos.</p>
                        <base-button type="info" v-on:click="this.inspector = true">Editar perfil</base-button>
                    </div>
                </div>
            </div>
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">

                    <div class="card card-profile shadow">
                        <div class="row justify-content-center">
                            <div class="col-lg-3 order-lg-2">
                                <div class="card-profile-image">
                                    <a href="#">
                                        <img :src="model.image" class="rounded-circle">
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="card-body pt-0 pt-md-4">
                            <div class="row mt-4">
                                <div class="col">
                                    <div class="card-profile-stats d-flex justify-content-center mt-md-5">
                                        <div v-if="model.status == 3">
                                            <span class="heading">{{monthLender}}</span>
                                            <span class="description">Mi mes</span>
                                        </div>
                                        <div v-else>
                                            <span class="heading">2</span>
                                            <span class="description">Ventas del dia</span>
                                        </div>
                                        
                                        <div>
                                            <span class="heading">{{formatPrice(gainLender)}}</span>
                                            <span class="description">Ganancia del mes</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="text-center">
                                <h3>
                                    {{model.first_name}} {{model.last_name}}
                                </h3>
                                <div class="h5">
                                    <p v-if="model.status == 1">Gerente</p>
                                    <p v-if="model.status == 2">Personal de caja</p><p v-if="model.status == 3">Prestadora</p>
                                </div>
                                <hr class="my-4" />
                                <p>{{model.email}}</p>
                            </div>
                            <hr class="my-4" />
                            <p>{{model.first_name}} — {{model.about}}</p>
                        </div>
                    </div>
                </div>

                <div class="col-xl-8 order-xl-1">
                    <card shadow type="secondary">
                        <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">Mi perfil</h3>
                                </div>
                            </div>
                        </div>
                        <template>
                            <form @submit.prevent>
                                <h6 class="heading-small text-muted mb-4">Información de usuario</h6>
                                <div class="pl-lg-4">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <base-input v-if="inspector"
                                                        alternative=""
                                                        label="Nombre"
                                                        placeholder="Username"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.first_name"
                                            />
                                            <base-input v-else
                                                        disabled alternative=""
                                                        label="Nombre"
                                                        placeholder="Username"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.first_name"
                                            />
                                        </div>
                                        <div class="col-lg-6">
                                            <base-input v-if="inspector"
                                                        alternative=""
                                                        label="Apellido"
                                                        placeholder="jesse@example.com"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.last_name"
                                            />
                                            <base-input v-else
                                                        disabled alternative=""
                                                        label="Apellido"
                                                        placeholder="jesse@example.com"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.last_name"
                                            />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <base-input v-if="inspector"
                                                        alternative=""
                                                        label="Correo"
                                                        placeholder="First name"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.email"
                                            />
                                            <base-input v-else
                                                        disabled alternative=""
                                                        label="Correo"
                                                        placeholder="Last name"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.email"
                                            />
                                        </div>
                                        <div class="col-lg-6 form-group">
                                            <label><strong>Imagen de perfil</strong></label>
                                            <input v-if="inspector" type="file" id="file" ref="file" v-on:change="handleFileUpload()" class="form-control mb-3" >
                                            <input v-else type="file" id="file" ref="file" disabled class="form-control mb-3" >
                                        </div>
                                    </div>
                                </div>
                                <hr class="my-4" />
                                <!-- Description -->
                                <h6 class="heading-small text-muted mb-4">Sobre ti</h6>
                                <div class="pl-lg-4">
                                    <div class="form-group">
                                        <base-input alternative="" label="Sobre mi - proximamente">
                                            <textarea disabled v-model="model.about" rows="4" class="form-control form-control-alternative" placeholder="Unas palabras sobre ti..."></textarea>
                                        </base-input>
                                    </div>
                                </div>
                            </form>
                        </template>
                    </card>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import router from '../router'
    import endPoint from '../../config-endpoint/endpoint.js'
    import jwtDecode from 'jwt-decode'
    export default {
        name: 'user-profile',
        data() {
            const token = localStorage.userToken
			const decoded = jwtDecode(token)
            return {
                id: decoded._id,
                model: {
                    first_name: '',
                    last_name: '',
                    email: '',
                    access: '',
                    image: '',
                    about: ''
                },
                inspector: false,
                monthLender: 0,
                gainLender: 0,
                file: ''
            }
        },
        beforeCreate(){
            if (!localStorage.getItem('userToken') && localStorage.getItem('status') != 1) {
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
            this.getData();
            this.getYourSales();
        },
        methods: {
            async getData() {
				const config = {headers: {'x-access-token': localStorage.userToken}}
				try{
					const data = await axios.get(endPoint.endpointTarget+'/users/data/'+this.id, config)
					this.model.first_name = data.data.first_name
					this.model.last_name = data.data.last_name
					this.model.email = data.data.email
					this.model.status = data.data.status
                    this.model.access = data.data.LastAccess
                    this.model.about = data.data.about
					this.model.image = endPoint.imgEndpoint+data.data.userImage
				}catch(err) {
					this.$swal({
						type: 'error',
						title: 'Acceso invalido, ingrese de nuevo, si el problema persiste comuniquese con el proveedor del servicio',
						showConfirmButton: false,
						timer: 2500
					})
					router.push({name: 'login'})	
				}
				
            },
            async getYourSales(){
				const ident = localStorage.userToken
				const decoded = jwtDecode(ident)
				const link = decoded.linkLender
                this.link = decoded.linkLender
                console.log('here')
				if (link != '') {
					const split = link.split(" / ")
                    const sales = await axios.get(endPoint.endpointTarget+'/manicuristas/SalesByPrest/'+split[0]+":"+split[1])
                    console.log(sales)
                    this.monthLender = sales.data.length
                    for (let index = 0; index < sales.data.length; index++) {
                        for (let indexTwo = 0; indexTwo < sales.data[index].EmployeComision.length; indexTwo++) {
                            this.gainLender = sales.data[index].EmployeComision[indexTwo].employe == split[0] ? this.gainLender + sales.data[index].EmployeComision[indexTwo].comision : this.gainLender + 0
                        }
                    }
				}
            },
            formatPrice(value) {
                let val = (value/1).toFixed(2).replace('.', ',')
                return '$ '+val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            },
            handleFileUpload(){
                this.file = this.$refs.file.files[0]
                console.log(this.file)
            },
        }
    };
</script>
<style></style>
