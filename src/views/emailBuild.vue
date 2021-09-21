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
        
        <EmailEditor class="w-100 h-100" ref="emailEditor"
            v-on:load="editorLoaded"
            
            :locale="locale"
            />

            <!-- <div class="w-100" > -->
                <!-- <div class="col-md-8 templates"> -->
                    
                <!-- </div> -->
                <!-- <div style="border-radius:5px" class="col-md-4 pt-3">
                    
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text bg-default" id="basic-addon1">De:</span>
                        </div>
                        <input readonly v-model="de" type="text" class="form-control pl-2" placeholder="ejemplo@ejemplo.com" aria-label="Username" aria-describedby="basic-addon1">
                    </div>
                    <p style="color:#8b8a89" class="font-italic float-right">*Estas enviando el E-Mail a {{mailsQuantity}} personas</p>
                    <div class="input-group mb-3">
                        
                        <div class="input-group-prepend">
                            <span class="input-group-text bg-default" id="basic-addon1">Para:</span>
                        </div>
                        <input v-model="mails" type="text" v-on:change="countMails" class="form-control pl-2" placeholder="ejemplo@ejemplo.com" aria-label="Username" aria-describedby="basic-addon1">
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text bg-default" id="basic-addon1">Asunto:</span>
                        </div>
                        <input v-model="subject" type="text" class="form-control pl-2" placeholder="Asunto.." aria-label="Username" aria-describedby="basic-addon1">
                    </div>
                    <div class="ck-styles">
                        
                        <ckeditor  @input="changeTextarea()" :editor="editor" v-model="editorData" ></ckeditor>
                    </div>
                </div> -->
                <!-- <div style="background-color:rgba(238, 238, 238, 0.623);border-radius:5px" class="col-1">
                    
                </div> -->
            <!-- </div> -->
            <!-- <button class="btn btn-default float-right mb-2 buttonSend" v-on:click="SendMail">
                <i class="fa fa-paper-plane"></i>
            </button> -->
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
            select: 0,
            de: 'info@kkprettynails.cl',
            mails: '',
            mailsQuantity: '',
            subject: '',
            minHeight: '80vh',
            locale: 'es',
            projectId: 0,
            tools: {
                // disable image tool
                image: {
                    enabled: false,
                },
            },
            options: {},
            appearance: {
                theme: 'dark',
                panels: {
                    tools: {
                        dock: 'right',
                    },
                },
            },
        };
        
    },
    components: {
        EmailEditor
    },
    created(){
        // this.getMails()
        // setTimeout(() => {
            
        //     $('.blockbuilder-branding').css({'display': 'none'})
        // }, 5000);
    },
    methods: {
        // async getMails(){
        //     const mails = await axios(endPoint.endpointTarget+'/clients/mails')
        //     for (let index = 0; index < mails.data.length; index++) {
        //         const element = mails.data[index]
        //         var splitCorreo, ig, id
        //         if (element.correoCliente) {
        //             splitCorreo = element.correoCliente.split('.com')
        //             if (splitCorreo.length == 2) {
        //                 if (this.mails == '') {
        //                     this.mails = element.correoCliente
        //                 }else{
        //                     this.mails = this.mails + ', ' + element.correoCliente
        //                 }
        //             }
        //         }
        //         if (element.identidad) {
        //             id = element.identidad.split('.com')
        //             if (id.length == 2) {
        //                 if (this.mails == '') {
        //                     this.mails = element.identidad
        //                 }else{
        //                     this.mails = this.mails + ', ' + element.identidad
        //                 }
        //             }
        //         }
        //         if (element.instagramCliente) {
        //             ig = element.instagramCliente.split('.com')
        //             if (ig.length == 2) {
        //                 if (this.mails == '') {
        //                     this.mails = element.instagramCliente
        //                 }else{
        //                     this.mails = this.mails + ', ' + element.instagramCliente
        //                 }
        //             }
        //         }
        //     }
        //     const splitMails = this.mails.split(',')
        //     this.mailsQuantity = splitMails.length
        // },
        // countMails(){
        //     const splitMails = this.mails.split(',')
        //     this.mailsQuantity = splitMails.length
        //     const count = this.mails.length
        //     console.log(this.mails[count - 1])
        //     if (this.mails[count - 1] == ',') {
        //         this.mailsQuantity = this.mailsQuantity - 1
        //     }
        // },
        saveDesign() {
            this.$refs.emailEditor.editor.saveDesign((design) => {
                console.log('saveDesign', design);
            });
        },
        exportHtml() {
            this.$refs.emailEditor.editor.exportHtml((data) => {
                console.log('exportHtml', data);
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
    .buttonSend{
        position:absolute;
        top:35%;
        right: 2%;
    }
</style>