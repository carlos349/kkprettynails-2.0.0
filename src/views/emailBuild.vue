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
        <modal :show.sync="modals.modal1" modal-classes="modal-lg">
            <template v-slot:header>
                <h5 class="modal-title" id="exampleModalLabel">Lista de clientes <span v-if="hasSelected"> - {{ `${selectedRowKeys.length} Cliente(s) seleccionados` }}</span></h5>
            </template>
            <div style="margin-top:-20px">
                <center>
                    <h3>Filtrar por fecha de atención</h3>
                    <a-range-picker ref="datePick" style="width:60%;" class="rangeInput mb-3"  :ranges="{ Hoy: [moment(), moment()], 'Este mes': [moment(), moment().endOf('month')] }" @change="selectDate" :locale="es_ES" :placeholder="['Desde', 'Hasta']" />
                    <base-button :disabled="dateFind.length > 0 ? false : true" size="sm" class="mr-2 ml-2" style="margin-top:-5px;"   v-on:click="filterClients" type="success">
                        <a-icon type="search" style="vertical-align:1px;font-size:1.8em;" />
                    </base-button>
                    <base-button @click="getClients(), selectedRowKeys = []" size="sm" class="mr-2" style="margin-top:-5px;" type="secondary">
                        <a-icon type="undo" style="vertical-align:1px;font-size:1.8em;" />
                    </base-button>
                </center>
                <a-table :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }" :columns="columns" :data-source="clients">
                    <template slot="name" slot-scope="record, column">
                        {{column.firstName}} {{column.lastName}}
                    </template>
                    <template slot="date-format" slot-scope="record">
                        {{record | formatDate}}
                    </template>
                </a-table>
            </div>
            <template v-slot:footer>
                <base-button type="default" @click="modals.modal1 = false">Listo</base-button>
            </template>
        </modal>
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
                            
                        </div>
                        <!-- <input v-model="mails" type="text" class="form-control pl-2" placeholder="ejemplo@ejemplo.com" aria-label="Username" aria-describedby="basic-addon1"/> -->
                    </div>
                </div>
                <div class="col-2">
                    <base-button style="border-radius: 0.375rem;" type="success" v-on:click="modals.modal1 = true" icon="ni ni-collection">Lista de clientes</base-button>
                    <button class="btn btn-default" v-on:click="SendMail">
                        <i class="fa fa-paper-plane"></i>
                    </button>
                    
                </div>
            </div>
        </div>
        <div class="container-fluid">
            <br>
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
import moment from 'moment';
import 'moment/locale/es';
import es_ES from 'ant-design-vue/lib/locale-provider/es_ES';
moment.locale('es');
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
            moment,
            es_ES,
            subject: '',
            minHeight: '80vh',
            modals:{
                modal1:false
            },
            dateFind:'',
            clients:[],
            columns: [
                {
                    title: 'Nombre',
                    dataIndex: 'firstName',
                    scopedSlots: { customRender: 'name' },
                },
                {
                    title: 'Correo',
                    dataIndex: 'email',
                },
                {
                    title: 'Fecha de atención',
                    dataIndex: 'lastAttend',
                    scopedSlots: { customRender: 'date-format' },
                },
            ],
            
            selectedRowKeys: [],
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
        this.getClients()
    },
    computed: {
        hasSelected() {
            return this.selectedRowKeys.length > 0;
        },
    },
    methods: {
        async filterClients(){
            this.inspectorFilter = true
            try {
                const clients = await axios.post(endPoint.endpointTarget+'/clients/findClientsByDate', {
                    dates: this.dateFind
                }, this.configHeader)
                if (clients.data.status == 'clients does not exist') {
                    this.clients = []
                    this.$swal({
                        icon: 'error',
                        title: 'No se encontraron clientes',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }else{
                    this.clients = clients.data.data
                }
            }catch(error){
                if (!err.response) {
                    this.$swal({
                        icon: 'error',
                        title: 'Error de conexión',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }else if (err.response.status == 401) {
                    this.$swal({
                        icon: 'error',
                        title: 'Session caducada',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setTimeout(() => {
                        router.push("login")
                    }, 1550);
                }
            }
        },
        selectDate(date, dateString){
            if (date) {
                this.dateFind = dateString
            }else{
                this.dateFind = []
            }
        },
        onSelectChange(selectedRowKeys,selected) {
            this.mails = ''
            selected.forEach((element, index) => {
                if (index == 0) {
                    this.mails = element.email
                }else{
                    this.mails = this.mails + "," + element.email
                }
            });
            
            console.log(this.mails)
            console.log('selectedRowKeys changed: ', selectedRowKeys);
            this.selectedRowKeys = selectedRowKeys;
        },
        async getClients(){
            // this.progress = false
            try {
                const getAllClients = await axios.get(endPoint.endpointTarget+'/clients', this.configHeader)
                if (getAllClients.data.data.length > 0) {
                    this.clients = getAllClients.data.data
                    // for (let index = 0; index < getAllClients.data.data.length; index++) {
                    //     this.clientsNames.push(getAllClients.data.data[index].firstName + " / " + getAllClients.data.data[index].email)
                    //     this.clientIds.push(getAllClients.data.data[index].firstName + " / " + getAllClients.data.data[index].email + "-" + getAllClients.data.data[index]._id)
                    // }
                    // this.progress = true
                    // this.clientState = false
                }else{
                    // this.clientState = false
                }
            }catch (err) {
                if (!err.response) {
                    this.$swal({
                        icon: 'error',
                        title: 'Error de conexión',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }else if (err.response.status == 401) {
                    this.$swal({
                        icon: 'error',
                        title: 'Session caducada',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setTimeout(() => {
                        router.push("login")
                    }, 1550);
                }
            }
        },
        async getMails(){
            try {
                const getEmail = await axios.get(`${endPoint.endpointTarget}/clients/getEmails`, this.configHeader)
                if (getEmail.data.status == 'ok') {
                    this.mails = getEmail.data.data
                    this.mails = "carlos.gomes349@gmail.com"
                }
            }catch(err){
                if (!err.response) {
                    this.$swal({
                        icon: 'error',
                        title: 'Error de conexión',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }else if (err.response.status == 401) {
                    this.$swal({
                        icon: 'error',
                        title: 'Session caducada',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setTimeout(() => {
                        router.push("login")
                    }, 1550);
                }
            }
        },
        async getEmailSend(){
            try {
                const getEmail = await axios.get(`${endPoint.endpointTarget}/configurations/${this.branch}`, this.configHeader)
                if (getEmail.data.status == 'ok') {
                    this.email = getEmail.data.data.businessEmail
                    // this.email = "carlos.gomes349@gmail.com"
                }
            }catch(err){
                if (!err.response) {
                    this.$swal({
                        icon: 'error',
                        title: 'Error de conexión',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }else if (err.response.status == 401) {
                    this.$swal({
                        icon: 'error',
                        title: 'Session caducada',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setTimeout(() => {
                        router.push("login")
                    }, 1550);
                }
            }
        },
        SendMail() {
            this.$refs.emailEditor.editor.exportHtml((data) => {
                axios.post(`${endPoint.endpointTarget}/clients/sendPromotionEmail`, {
                    email: this.email,
                    clients: this.mails,
                    subject: this.subject,
                    html: data.html,
                    branch: this.branch
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
                    if (!err.response) {
                        this.$swal({
                            icon: 'error',
                            title: 'Error de conexión',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }else if (err.response.status == 401) {
                        this.$swal({
                            icon: 'error',
                            title: 'Session caducada',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        setTimeout(() => {
                            router.push("login")
                        }, 1550);
                    }
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