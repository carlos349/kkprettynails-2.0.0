<template>
    <div class="container">
        <center >
            <div class="mt-9 hidden divShow">
                <i class="fa fa-info-circle mb-4" style="font-size:15em;color:#238ae6;"></i>
                <h1>Su cita fue cancelada satifactoriamente</h1>
            </div>    
        </center> 
    </div>
</template>
<script>
import axios from 'axios'
import endPoint from '../../config-endpoint/endpoint.js'
import router from '../router'
import io from 'socket.io-client';
import * as moment from 'moment';
import 'moment/locale/es';
moment.locale('es');
export default {
    data(){
        return {
            id: this.$route.query.id,
            socket: io(endPoint.endpointTarget),
            configHeader: {
                headers:{
                    "x-database-connect": endPoint.database,
                }
            }
        }
    },
    created(){
        this.confirmDate()
    },
    methods: {
        confirmDate(){
            axios.put(endPoint.endpointTarget+'/dates/removeDate/'+this.id, {
                id: this.id
            }, this.configHeader)
            .then(res => {
                if (res.data.status == 'ok') {
                    $('.divShow').show('slow')
                    axios.post(endPoint.endpointTarget+'/notifications', {
                        userName:'Cliente: '+res.data.data.client,
                        userImage:localStorage.getItem('imageUser'),
                        detail:'Confirmo su cita para el día '+this.formatDateTwo(res.data.data.date),
                        link: 'agendamiento'
                    }, this.configHeader)
                    .then(res => {
                        this.socket.emit('sendNotification', res.data.data)
                    })
                    setTimeout(() => {
                        window.location = "https://kkprettynails.cl"
                    }, 2000);
                }
            })
        },
        formatDateTwo(date) {
            let dateFormat = new Date(date)
            return moment(dateFormat).format("DD-MM-YYYY")
        },
    }
}
</script>
<style>
.divShow{
    display:none;
}
</style>