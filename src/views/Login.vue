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
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import router from '../router'
import endPoint from '../../config-endpoint/endpoint.js'
import EventBus from '../components/EventBus'
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
    beforeCreate(){
        localStorage.removeItem('userToken')
        localStorage.removeItem('nombre')
        localStorage.removeItem('apellido')
        localStorage.removeItem('image')
        localStorage.removeItem('email')
        localStorage.removeItem('imageUser')
        localStorage.removeItem('status')
    },
    methods: {
        login() {
            axios.post(endPoint.endpointTarget+'/users/login', {
                email: this.model.email,
                password: this.model.password
            }).then(res => {
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
                    localStorage.setItem('status', decoded.status)
                    router.push({path: '/Agendamiento'})
                    this.emitMethod(decoded.status)
                }
            })
        },
        emitMethod(status) {
            EventBus.$emit('logged-in', status)
            localStorage.setItem('logged-in', status)
        },
    }
  }
</script>
<style>
</style>
