<template>
    <base-header class="header pb-5 pt-5 pt-lg-8 d-flex align-items-center"
                     style="min-height: 50px; background-image: url(img/theme/users.jpg); background-size: cover; background-position: center top;">
        <!-- Mask -->
        <span style="background-color:#172b4d !important" class="mask  opacity-7"></span>
        <!-- Header container -->
        <div class="container-fluid d-flex align-items-center">
            <div class="row">
                <div class="col-12">
                    <h1 class="display-2 text-white">Reporte del cierre</h1>
                    <a class="btn btn-success text-white cursor-pointer">Editar montos manuales</a>
                </div>
            </div>
        </div>
    </base-header>
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
            id: localStorage.getItem('reportID')
        }
    },
    created(){
        console.log(this.id)
    },
    methods: {

    }
}
</script>
<style>

</style>