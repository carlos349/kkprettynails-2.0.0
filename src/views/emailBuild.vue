<template>
    <div>
        <base-header class="header pb-4 pt-2 pt-lg-4 d-flex align-items-center"
                     style="min-height: 50px; background-image: url(img/theme/clients.jpg); background-size: cover; background-position: center top;">
            <!-- Mask -->
            <span style="background-color:#172b4d !important" class="mask  opacity-7"></span>
            <!-- Header container -->
            <div class="container-fluid d-flex align-items-center">
                <div class="row">
                    <div class="col-12">
                        <h1 class="display-2 text-white">Administrador de envio de correos</h1>
                        <!-- <p class="text-white mt-0 mb-2">Edita la plantilla, el asunto del correo, y administra los correos de tus clientes.</p> -->
                    </div>
                </div>
            </div>
        </base-header>
        <!-- <div class="w-100"> -->
        <EmailEditor 
            class="w-100 h-100" 
            ref="emailEditor"
            :tools="tools"
            :locale="locale"/>
        <!-- </div> -->
        <div class="container-fluid p-0">
            <div class="row p-2" >
                <div class="col-4">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text bg-default" id="basic-addon1">Asunto:</span>
                        </div>
                        <input v-model="subject" type="text" class="form-control pl-2" placeholder="Asunto.." aria-label="Username" aria-describedby="basic-addon1">
                    </div>
                </div>
                <div class="col-6">
                    <!-- <label for="text">*Estas enviando el E-Mail a {{mailsQuantity}} personas</label><br> -->
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text bg-default" id="basic-addon1">Para:</span>
                        </div>
                        <input v-model="mails" type="text" class="form-control pl-2" placeholder="ejemplo@ejemplo.com" aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>
                </div>
                <div class="col-2">
                    <button class="btn btn-default" v-on:click="SendMail">
                        <i class="fa fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import endPoint from '../../config-endpoint/endpoint.js'
// import EventBus from './EventBus'
import axios from 'axios'
import router from '../router'
import mixinUserToken from '../mixins/mixinUserToken'
import { EmailEditor } from 'vue-email-editor';
export default {
    mixins: [mixinUserToken],
    data() {
        return {
            configHeader: {
                headers:{
                    "x-database-connect": endPoint.database, 
                    "x-access-token": localStorage.userToken
                }
            },
            mails: '',
            subject: '',
            minHeight: '80vh',
            locale: 'es',
            projectId: 0,
            branch: localStorage.branch,
            tools: {
                button: { enabled: true },
                divider: { enabled: true },
                form: { enabled: true },
                heading: { enabled: true },
                image: { enabled: true },
                menu: { enabled: true },
                social: { enabled: true },
                text: { enabled: true },
                timer: { enabled: true },
                html: { enabled: true }
            },
            appearance: {
                theme: 'dark',
                panels: {
                    tools: {
                        dock: 'right',
                    },
                },
            },
            email: ''
        };
        
    },
    components: {
        EmailEditor
    },
    created(){
        this.getMails()
        this.getEmailSend()
    },
    methods: {
        async getMails(){
            try {
                const getEmail = await axios.get(`${endPoint.endpointTarget}/clients/getEmails`, this.configHeader)
                if (getEmail.data.status == 'ok') {
                    this.mails = getEmail.data.data
                    this.mails = "carlos.gomes349@gmail.com"
                }
            }catch(err){
                this.$swal({
                    icon: 'error',
                    title: 'Problemas de conexión',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        },
        async getEmailSend(){
            try {
                const getEmail = await axios.get(`${endPoint.endpointTarget}/configurations/${this.branch}`, this.configHeader)
                if (getEmail.data.status == 'ok') {
                    this.email = getEmail.data.data.businessEmail
                    this.email = "carlos.gomes349@gmail.com"
                    console.log(this.email)
                }
            }catch(err){
                this.$swal({
                    icon: 'error',
                    title: 'Problemas de conexión',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        },
        SendMail() {
            this.$refs.emailEditor.editor.exportHtml((data) => {
                axios.post(`${endPoint.endpointTarget}/clients/sendPromotionEmail`, {
                    email: this.email,
                    clients: this.mails,
                    subject: this.subject,
                    html: data.html
                }, this.configHeader)
                .then(res => {
                    console.log(res)
                    if (res.data.status == 'ok') {
                        this.$swal({
                            icon: 'success',
                            title: 'Correo enviado con éxito',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                }).catch(err => {
                    this.$swal({
                        icon: 'error',
                        title: 'Problemas de conexión',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
            });
        },
    }
}
</script>
<style>
    iframe{
        height: 80vh !important;
    }
    iframe .blockbuilder-branding{
        display: none !important;
    }
    .textarea {
        cursor: pointer;
        background-color:#ecebea;
        border-radius:5px
    }
    .sombreado{
        box-shadow: 0 2px 5px 0 rgba(0,0,0,.14)
    }
    .ck-content{
        max-height: 70vh;
    }
    .ck-file-dialog-button{
        display: none;
    }
    .ck-styles{
        width: 80%;
        
    }
    .templates{
        border:5px solid #f7fafc;
        height:auto;
        background-color:#fff;
        padding-bottom: 10px;
    }
</style>