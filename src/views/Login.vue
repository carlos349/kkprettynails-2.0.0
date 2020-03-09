<template>
        <div class="row justify-content-center">
            <div class="col-lg-5 col-md-7">
                <div class="card bg-secondary shadow border-0">
                    <div class="card-body px-lg-5 py-lg-5">
                        <div class="btn-wrapper text-center mb-4">
                            <span class="mb-5"><img style="width:20%" src="img/brand/syswaLogo.png"></span>
                        </div>
                        <form role="form">
                            <base-input class="input-group-alternative mb-3"
                                        placeholder="Correo"
                                        addon-left-icon="ni ni-email-83"
                                        v-model="model.email">
                            </base-input>

                            <base-input class="input-group-alternative"
                                        placeholder="Contraseña"
                                        type="password"
                                        addon-left-icon="ni ni-lock-circle-open"
                                        v-model="model.password">
                            </base-input>

                            <div class="text-center">
                                <base-button type="primary" v-on:click="login()" class="my-4">Ingresar</base-button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-6">
                        <a href="#" class="text-light"><small>Olvidaste la contraseña?</small></a>
                    </div>
                    <div class="col-6 text-right">
                        <router-link to="/register" class="text-light"><small>Crear cuenta</small></router-link>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
import axios from 'axios'
import router from '../router'
import endPoint from '../../config-endpoint/endpoint.js'
// import EventBus from './EventBus'
import jwtDecode from 'jwt-decode'
  export default {
    name: 'login',
    data() {
      return {
        model: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
        logout() {	
            localStorage.removeItem('userToken')
            localStorage.setItem('logged-in', 'no-loggedin')
            localStorage.removeItem('nombre')
            localStorage.removeItem('apellido')
            localStorage.removeItem('image')
            localStorage.removeItem('email')
            localStorage.removeItem('imageUser')
            this.nombre = ''
            this.apellido = ''
            this.image = ''
            this.email = ''
            $(".menuVer").hide()
		},
        login() {
            axios.post(endPoint.endpointTarget+'/users/login', {
                email: this.model.email,
                password: this.model.password
            }).then(res => {
                console.log(res)
                if(res.data.error == 'pass incorrecto'){
                    this.$swal({
                        type: 'error',
                        title: 'Contraseña incorrecta',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }else if(res.data.error == 'User does not exist'){
                    this.$swal({
                        type: 'error',
                        title: 'No esta registrado',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }else{
                    localStorage.setItem('userToken', res.data.token)
                    this.email = ''
                    this.password = ''
                    const token = localStorage.userToken
                    const decoded = jwtDecode(token)
                    localStorage.setItem('nombre', decoded.first_name)
                    localStorage.setItem('apellido', decoded.last_name)
                    localStorage.setItem('imageUser', decoded.userImage)
                    localStorage.setItem('showNav', true)
                    localStorage.setItem('_id', decoded._id)
                    router.push({name: 'Citas'})
                    this.emitMethod(decoded.status)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        // emitMethod(status) {
        //     EventBus.$emit('logged-in', status)
        //     localStorage.setItem('logged-in', status)
        // },
    }
  }
</script>
<style>
</style>
