<template>
    <div class="container">
        <center >
            <div class="mt-9 hidden divShow">
                <i class="fa fa-check-circle mb-4" style="font-size:15em;color:#2dce89;"></i>
                <h1>Su cita fue confirmada satifactoriamente</h1>
            </div>    
        </center> 
    </div>
</template>
<script>
import axios from 'axios'
import endPoint from '../../config-endpoint/endpoint.js'
import router from '../router'
export default {
    data(){
        return {
            id: this.$route.query.id
        }
    },
    created(){
        this.confirmDate()
    },
    methods: {
        confirmDate(){
            axios.get(endPoint.endpointTarget+'/citas/confirmDate/'+this.id)
            .then(res => {
                if (res.data.status == 'ok') {
                    $('.divShow').show('slow')
                    setTimeout(() => {
                        window.location = "http://kkprettynails.cl"
                    }, 1000);
                }
            })
        }
    }
}
</script>
<style>
.divShow{
    display:none;
}
</style>