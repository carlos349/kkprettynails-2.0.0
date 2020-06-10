<template>
    <div class="font">
        <base-nav class="navbar navbar-horizontal navbar-expand-lg navbar-dark bg-default">  
            <a slot="brand" class="navbar-brand" href="http://syswa.com">
                <img src="img/brand/logokk.png" alt="" style="height:70px;width:70px">
                <b class="ml-3 mt-3" style="font-size: 1.2em;color:#fff;">KKPRETTYNAILS</b> 
            </a>
        </base-nav>
        <div class="container-fluid">
            <div class="row mt-4">
            <div class="col-md-8">
                <div class="accordion" id="accordionExample">
                        <div class="card style-dates-cards">
                            <div class="card-header" id="headingOne">
                                <div v-on:click="wantLenderChange">
                                    <base-checkbox class="mb-3" v-model="checkboxes.Wantlender" >
                                        <h2 style="margin-top: -5px;margin-bottom:-10px;">¿Desea una prestadora en específico?</h2> 
                                    </base-checkbox>
                                </div>
                                
                                <base-button class="w-25 style-collapse-dates" type="success" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Servicios
                                </base-button>
                            </div>
                            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                <div class="card-body">
                                    <div class="row">
                                        
                                        <div class="col-4">
                                            <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                                <base-button v-for="category of categories" :key="category._id" type="default" class="w-100 mt-1" data-toggle="pill" :href="'#v-pills-'+category._id" role="tab" aria-controls="v-pills-home" aria-selected="true">{{category.name}}</base-button>

                                            </div>
                                        </div>
                                        <div class="col-8">
                                            <div class="tab-content" id="v-pills-tabContent">
                                                <div v-for="category of categories" :key="category._id" class="tab-pane fade show " :id="'v-pills-'+category._id" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                                    <div class="row" v-for="(service, index) of services">
                                                        <div class="col-md-12" v-if="service.category == category.name">
                                                                <button class="btn-header btnDate py-2 px-4 w-75 mt-2"> {{service.nombre}} <span class="badge badge-dark">{{serviceCount[index].count}}</span> </button> 
                                                                <button class="btn-sevices btnDate" v-on:click="plusService(index, service.nombre, service.tiempo, service.comision, service.precio, service.prestadores)"><i class="fa fa-plus" aria-hidden="true" style="font-size:14px;"></i></button>
                                                                <button class="btn-sevices btnDate" v-on:click="lessService(index, service.nombre, service.tiempo)"><i class="fa fa-minus" aria-hidden="true" style="font-size:14px;"></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card style-dates-cards">
                            <div class="card-header" id="headingFour">
                            <h2 class="mb-0">
                                <base-button title="Puede continuar" v-if="ifServices" class="text-left collapsed style-collapse-dates w-25" type="success" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                    Fecha
                                    <i class="fa fa-check-square float-right" aria-hidden="true" style="font-size:20px;color:#32325d;"></i>
                                </base-button>
                                <base-button title="Elija un servicio para continuar" v-else class="w-25 text-left collapsed style-collapse-dates" type="default" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour" disabled>
                                    Fecha
                                    <i class="fa fa-exclamation-circle float-right danger" aria-hidden="true" style="font-size:20px;color:#f5365c;"></i>
                                </base-button>
                            </h2>
                            </div>
                            <div id="collapseFour" class="collapse" aria-labelledby="headingFour" data-parent="#accordionExample">
                                <div class="card-body row">
                                    <div class="col-md-6">
                                        <base-input addon-left-icon="ni ni-calendar-grid-58" >
                                            <flat-picker 
                                                    slot-scope="{focus, blur}"
                                                    @on-open="focus"
                                                    @on-close="blur"
                                                    :config="configDate"
                                                    class="form-control date-client datepicker pl-3"
                                                    aria-placeholder="Seleccione una fecha"
                                                    v-model="dates.simple">
                                            </flat-picker>
                                        </base-input>
                                    </div>
                                    <div class="col-md-6 ">
                                        <h2 class="mr-3">¿Se realizara un diseño?</h2>
                                        <div class="row mx-auto" v-on:click="validLender">
                                            <base-radio name="si" value="true" inline v-model="registerDate.design"><b>Si</b></base-radio>
                                            <base-radio name="no" value="false" inline v-model="registerDate.design"><b>No</b></base-radio>
                                        </div>     
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="lenderSection" class="card style-dates-cards">
                            <div class="card-header" id="headingTwo">
                            <h2 class="mb-0">
                                <base-button title="Puede continuar" v-if="ifLender" class="w-25 text-left collapsed style-collapse-dates" type="success" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" v-on:click="generateLender()">
                                    Prestadora
                                    <i class="fa fa-check-square float-right" aria-hidden="true" style="font-size:20px;color:#32325d;"></i>
                                </base-button>
                                <base-button title="Haganos saber si quiere un diseño para continuar" v-else class="w-25 text-left collapsed style-collapse-dates" type="default" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" disabled>
                                    Prestadora
                                    <i class="fa fa-exclamation-circle float-right danger" aria-hidden="true" style="font-size:20px;color:#f5365c;"></i>
                                </base-button>
                            </h2>
                            </div>
                            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                <div class="card-body row" style="height:55vh">
                                    <tabs fill class="flex-column flex-md-row w-100">
                                        <card shadow>
                                            <tab-pane v-on:click="console.log('solo una')">
                                                <span slot="title" >
                                                    <i class="fa fa-user"></i>
                                                    Una sola prestadora
                                                </span>
                                                <vue-custom-scrollbar style="height:38vh;overflow:hidden;overflow-x: hidden;overflow-y:hidden;">
                                                <div class="row">
                                                    <div class="col-md-3 text-center" v-for="lender of finalyLenders" :key="lender._id">
                                                            <div class="frame" :class="lender._id" v-on:click="selectLender(lender.nombre, lender.class, lender.restTime, lender._id)">
                                                                    <img alt="Image placeholder" style="width:100%;height:30vh;" src="img/theme/profile-defaultt.png">
                                                                    <h3 style="margin-top:-30px;" :class="lender._id+'h3'">{{lender.nombre}}</h3>
                                                            </div>
                                                        
                                                    </div>
                                                </div>
                                                </vue-custom-scrollbar> 
                                            </tab-pane>
                                            <tab-pane title="Profile">
                                                <span slot="title" >
                                                    <i class="fa fa-users mr-2"></i>
                                                    Diferentes prestadoras
                                                </span>
                                                <div class="row">
                                                    <div class="col-md-3 ml-2 text-center" v-for="servicesSelect of registerDate.serviceSelectds" :key="servicesSelect">
                                                        <base-dropdown>
                                                            <base-button slot="title" type="primary" class="dropdown-toggle">
                                                                {{servicesSelect.servicio}} <br> {{servicesSelect.lender}}
                                                            </base-button>
                                                            <vue-custom-scrollbar style="height:15vh;overflow:hidden;overflow-x: hidden;overflow-y:hidden;">
                                                                <b v-for="lenders of servicesSelect.lenders" :key="lenders" class="dropdown-item" style="color:#32325d;" v-on:click="servicesSelect.lender = lenders.lender, servicesSelect.restTime = lenders.resTime, servicesSelect.class = lenders.class, validMultiLender()">{{lenders.lender}}</b>
                                                            </vue-custom-scrollbar>
                                                        </base-dropdown>
                                                    </div>
                                                </div>
                                            </tab-pane>
                                        </card>
                                    </tabs>
                                </div>
                            </div>
                        </div>
                        <div class="card style-dates-cards">
                            <div class="card-header bg-color" id="headingThree">
                                <h2 class="mb-0">
                                    <base-button  title="Puede continuar" v-if="validSchedule" class="w-25 text-left collapsed style-collapse-dates" type="success" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" v-on:click="insertDate()">
                                        Horario 
                                        <i class="fa fa-check-square float-right" aria-hidden="true" style="font-size:20px;color:#32325d;"></i>
                                    </base-button>
                                    <base-button title="Elija una prestadora para continuar" v-else class="w-25 text-left collapsed style-collapse-dates" type="default" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" disabled>
                                        Horario 
                                        <i class="fa fa-exclamation-circle float-right danger" aria-hidden="true" style="font-size:20px;color:#f5365c;"></i>
                                    </base-button>
                                </h2>
                            </div>
                            <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                                <div v-if="noOneLender" class="card-body text-center">
                                    <div class="frameTable">
                                        <h2 class="text-left text-white mb-3 ml-3">Seleccione las horas para agendar</h2>
                                        <table class="tablesServiceAgend">
                                            <thead class="theadServiceAgend">
                                                <tr class="tr-service">
                                                    <th class="thServiceAgend">Servicio</th>
                                                    <th class="thServiceAgend">Horario</th>
                                                    <th class="thServiceAgend">Elegir hora</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="tr-service" v-for="(servicio, index) of registerDate.serviceSelectds" :key="servicio._id">
                                                    <td class="tdServiceAgend">{{servicio.servicio}}</td>
                                                    <td class="tdServiceAgend" v-if="servicio.start == ''">Ningun horario seleccionado</td>
                                                    <td class="tdServiceAgend" v-else>{{servicio.start}} - {{servicio.end}}</td>
                                                    <td class="tdServiceAgend"><base-button v-on:click="selectHourService(index, servicio.lender, servicio.duration, servicio.restTime)" type="primary" size="sm">Hora
                                                    </base-button> </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div v-else class="card-body text-center">
                                    <div v-if="progress" class="col-md-12">
                                        <center>
                                            <h3 class="text-center">Horarios disponibles</h3>
                                        </center>
                                        <vue-custom-scrollbar class="p-2" style="height:30vh;overflow:hidden;overflow-x: hidden;overflow-y:hidden;">
                                            <div class="col-12" v-for="(block , index) of blockHour">
                                                <base-button v-if="block.validator == true" v-on:click="selectBloq(block.Horario, index)" size="sm" class="col-12" type="success">
                                                    <badge style="font-size:1em !important" type="white" class="text-default col-5 float-left">{{block.Horario}}</badge>
                                                    <span>Disponible</span>
                                                </base-button>

                                                <base-button disabled v-else-if="block.validator == false" size="sm" class="col-12" type="danger">
                                                    <badge style="font-size:1em !important" type="white" class="text-default col-5 float-left">{{block.Horario}}</badge>
                                                    <span>Ocupado</span>
                                                </base-button>

                                                <base-button v-else-if="block.validator == 'select'" size="sm" class="col-12" type="default">
                                                    <badge style="font-size:1em !important" type="white" class="text-default col-5 float-left">{{block.Horario}}</badge>
                                                    <span>Seleccionado</span>
                                                </base-button>

                                                <base-button v-else size="sm" disabled class="col-12" type="secondary">
                                                    <badge style="font-size:1em !important" type="white" class="text-default col-5 float-left">{{block.Horario}}</badge>
                                                    <span>No seleccionable</span>
                                                </base-button>
                                            </div>
                                        </vue-custom-scrollbar>
                                    </div>
                                    <div v-else class="col-md-12">
                                        <center >
                                            <loading-progress
                                                :progress="progress"
                                                :indeterminate="true"
                                                class="text-center"
                                                :hide-background="true"
                                                shape="circle"
                                                size="100"
                                                fill-duration="2"
                                            />
                                        </center>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 date-info">
                    <h1>Información de la cita</h1>
                    <ul>
                        <li><b style="font-size:1.3em;">Servicio:</b>
                            <ul>
                                <template v-if="registerDate.serviceSelectds.length > 0">
                                    <li  v-for="servicesSelectds of registerDate.serviceSelectds" :key="servicesSelectds">
                                        <base-button size="sm" type="primary" class="mb-1 p-2">
                                            <span>{{servicesSelectds.servicio}}</span>
                                            <badge type="default"><b>{{servicesSelectds.lender}}</b></badge>
                                        </base-button>
                                    </li>
                                </template>
                                <li v-else>Ninguno seleccionado</li>
                            </ul>
                        </li>
                        <li v-if="dates.simple != ''">
                            <b style="font-size:1.3em;">Fecha:</b> {{dates.simple}}
                        </li>
                        <li v-else>
                            <b style="font-size:1.3em;">Fecha:</b> Ninguna seleccionada
                        </li>
                        <li v-if="registerDate.design != 'nada'">
                            <b style="font-size:1.3em;">Diseño:</b> <b class="text-uppercase"> {{registerDate.design}}</b>
                        </li>
                        <li v-else>
                            <b style="font-size:1.3em;">Diseño:</b> Ninguna seleccionada
                        </li>
                        <li v-if="registerDate.employeSelect != ''">
                            <b style="font-size:1.3em;">Prestadora:</b> <b class="text-uppercase"> {{registerDate.employeSelect}}</b>
                        </li>
                        <template v-if="noOneLender == false">
                            <li v-if="registerDate.start == ''">
                                <b style="font-size:1.3em;">Horario:</b> Ningun horario seleccionado
                            </li>
                            <li v-else>
                                <b style="font-size:1.3em;">Horario:</b> {{registerDate.start}} - {{registerDate.end}}
                            </li>
                        </template>
                    </ul>
                    <base-button v-if="ifLender && ifServices && validSchedule && validHour" type="success" icon="fa fa-check-square" v-on:click="modals.modal2 = true">Generar cita</base-button>
                    <base-button v-else type="default" icon="fa fa-exclamation-circle" disabled>Generar cita</base-button>
                </div>
            </div>
            
        </div>
        <nav class="navbar navbar-expand-lg navbar-light bg-Secondary mt-2">
            <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                <a class="navbar-brand" href="#">
                    <img src="img/brand/syswaLogo.png" alt="" style="height:30px;width:100px">
                </a>
            </div>
            <span class="navbar-text" style="float: right !important;">
                © {{year}} | <a href="https://www.syswa.com" class="font-weight-bold ml-1" target="_blank">SYSWA</a> Todos los derechos reservados
            </span>
        </nav>
        <modal :show.sync="modals.modal1"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-md">
            <card type="secondary" shadow
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-5 py-lg-5"
                  class="border-0">
                <template>
                    <div class="text-muted text-center mb-3">
                        <h3>Horarios disponibles</h3>
                    </div>
                </template>
                <template>
                    <div v-if="progress" class="col-md-12">
                        <vue-custom-scrollbar class="p-2" style="height:30vh;overflow:hidden;overflow-x: hidden;overflow-y:hidden;">
                            <div class="col-12" v-for="(block , index) of blockHour">
                                <base-button v-if="block.validator == true" v-on:click="selectBloqMulti(block.Horario, index)" size="sm" class="col-12" type="success">
                                    <badge style="font-size:1em !important" type="white" class="text-default col-5 float-left">{{block.Horario}}</badge>
                                    <span>Disponible</span>
                                </base-button>

                                <base-button disabled v-else-if="block.validator == false" size="sm" class="col-12" type="danger">
                                    <badge style="font-size:1em !important" type="white" class="text-default col-5 float-left">{{block.Horario}}</badge>
                                    <span>Ocupado</span>
                                </base-button>

                                <base-button v-else-if="block.validator == 'select'" size="sm" class="col-12" type="default">
                                    <badge style="font-size:1em !important" type="white" class="text-default col-5 float-left">{{block.Horario}}</badge>
                                    <span>Seleccionado</span>
                                </base-button>

                                <base-button v-else size="sm" disabled class="col-12" type="secondary">
                                    <badge style="font-size:1em !important" type="white" class="text-default col-5 float-left">{{block.Horario}}</badge>
                                    <span>No seleccionable</span>
                                </base-button>
                            </div>
                        </vue-custom-scrollbar>
                        <center>
                            <base-button type="success" class="mt-4" v-on:click="modals.modal1 = false">Listo</base-button>
                        </center>
                    </div>
                    <div v-else class="col-md-12">
                        <center >
                            <loading-progress
                                :progress="progress"
                                :indeterminate="true"
                                class="text-center"
                                :hide-background="true"
                                shape="circle"
                                size="100"
                                fill-duration="2"
                            />
                        </center>
                    </div>
                </template>
            </card>
        </modal>
        <modal :show.sync="modals.modal2"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-md">
            <card type="secondary" shadow
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-5 py-lg-5"
                  class="border-0">
                <template>
                    <div class="text-muted text-center mb-3">
                        <h3>Identidad del agendamiento</h3>
                    </div>
                </template>
                <template>
                    <form role="form">
                        <base-input alternative
                            type="text"
                            v-on:keyup="validFields()"
                            placeholder="Escriba su nombre"
                            v-model="registerUser.name"
                            addon-left-icon="fa fa-user">
                        </base-input>
                        <base-input alternative
                            type="email"
                            v-on:keyup="validFields()"
                            placeholder="Escriba su correo"
                            v-model="registerUser.mail"
                            addon-left-icon="fa fa-email">
                        </base-input>
                        <base-button v-if="validRegister" type="success" v-on:click="finallyAgend()">
                            Finalizar agenda
                        </base-button>  
                        <base-button v-else type="default" v-on:click="finallyAgend()" disabled>
                            Finalizar agenda
                        </base-button> 
                    </form>
                </template>
            </card>
        </modal>
        <modal :show.sync="modals.modal3"
               :gradient="modals.type"
               modal-classes="modal-danger modal-dialog-centered">
            <div class="py-3 text-center">
                <i :class="modals.icon"></i>
                <h1 class="heading mt-5">{{modals.message}}</h1>
            </div>
        </modal>
    </div>
</template>
<script>
    // backend
    import axios from 'axios'
    import router from '../router'
    import endPoint from '../../config-endpoint/endpoint.js'
    import jwtDecode from 'jwt-decode'
    import io from 'socket.io-client';

    //frontend
    import flatPicker from "vue-flatpickr-component";
    import {Spanish} from 'flatpickr/dist/l10n/es.js';
    import vueCustomScrollbar from 'vue-custom-scrollbar'
    const dateNow = new Date()
    export default {
        components: {
            flatPicker,
            vueCustomScrollbar
        },
        data(){
            return {
                socket: io(endPoint.endpointTarget),
                configDate: {
                    allowInput: false,
                    dateFormat: 'm-d-Y',
                    locale: Spanish, // locale for this instance only
                    minDate: new Date()        
                },
                progress:false,
                dates:{
                    simple: ''
                },
                registerUser: {
                    name: '',
                    mail: ''
                },
                year: new Date().getFullYear(),
                modals: {
                    modal1: false,
                    modal2: false,
                    modal3: false,
                    message: "",
                    icon: '',
                    type:''
                },
                checkboxes: {
                    Wantlender: false
                },
                blockHour: [],
                registerDate: {
                    employeSelect: '',
                    date: '',
                    duration: 0,
                    restTime:'',
                    class: '',
                    employeResTime: '',
                    serviceSelectds: [],
                    design:'nada',
                    start: '',
                    sort: '',
                    end: ''
                },
                lenders: [],
                services: [],
                serviceCount: [],
                posibleLenders: [],
                ifLender: false,
                ifServices: false,
                validSchedule: false,
                validHour:false,
                readyAddDesign:true,
                blockHour:[],
                finalyLenders:[],
                categories: [],
                active: {
                    'background-color': '#0b1526'
                },
                showLenderSection: false,
                noOneLender: false,
                selectServiceForHour: {},
                validRegister: false,
                client: ''
            }
        },
        created(){
            this.getLenders()
            this.getServices()
            this.getCategories()
            window.open
        },
        methods: {
            wantLenderChange(){
                if (this.checkboxes.Wantlender == true) {
                    $('#lenderSection').css({'display': 'none'})
                }else{
                    $('#lenderSection').css({'display': 'block'})
                    this.validSchedule = false
                    this.registerDate.employeSelect = ''
                    this.registerDate.start = ''
                    this.registerDate.end = ''
                    this.registerDate.sort = ''
                }
            },
            validFields(){
                if (this.registerUser.name != '' && this.registerUser.mail != '') {
                    this.validRegister = true
                }else{
                    this.validRegister = false
                }
            },
            finallyAgend(){
                axios.post(endPoint.endpointTarget+'/clients/verifyClient', {
                    name: this.registerUser.name,
                    mail: this.registerUser.mail
                })
                .then(res => {
                    this.client = res.data.data.nombre+' / '+res.data.data.identidad
                    if (this.noOneLender) {
                        console.log(this.registerDate)
                        axios.post(endPoint.endpointTarget+'/citas/noOneLender', {
                            dataDate: this.registerDate,
                            date: this.dates.simple,
                            client: this.client
                        })
                        .then(res => {
                            if (res.data.status == "cita creada") {
                                this.modals.modal2 = false
                                this.modals = {
                                    modal3: true,
                                    message: "Cita creada con exito, se le notificara al correo su confirmacion.",
                                    icon: 'ni ni-check-bold ni-5x',
                                    type: 'success'
                                }
                                setTimeout(() => {
                                    this.modals = {
                                        modal1:false,
                                        modal2:false,
                                        modal3: false,
                                        message: "",
                                        icon: '',
                                        type: ''
                                    }
                                    window.location = "kkprettynails.cl"
                                }, 3000);
                            }    
                        })
                    }else{
                        axios.post(endPoint.endpointTarget+'/citas', {
                            entrada: this.registerDate.start,
                            salida: this.registerDate.end,
                            sort: this.registerDate.sort,
                            fecha: this.dates.simple,
                            cliente: this.client,
                            servicios: this.registerDate.serviceSelectds,
                            class: this.registerDate.class,
                            manicuristas: this.registerDate.employeSelect
                        })
                        .then(res => {
                            if (res.data.status == "cita creada") {
                                this.modals.modal2 = false
                                this.modals = {
                                    modal3: true,
                                    message: "Cita creada con exito, se le notificara al correo su confirmacion.",
                                    icon: 'ni ni-check-bold ni-5x',
                                    type: 'success'
                                }
                                setTimeout(() => {
                                    this.modals = {
                                        modal1:false,
                                        modal2:false,
                                        modal3: false,
                                        message: "",
                                        icon: '',
                                        type: ''
                                    }
                                    window.location = "http://kkprettynails.cl"
                                }, 3000);
                            }
                        })
                    }
                })
            },
            async getServices(){
                try{
                    const services = await axios.get(endPoint.endpointTarget+'/servicios') 
                    this.services = services.data 
                    for (let index = 0; index < services.data.length; index++) {
                        this.serviceCount.push({count: 0})
                    }
                }catch(err){
                    console.log(err)
                }
            },
            async getCategories(){
                const categories = await axios.get(endPoint.endpointTarget+'/servicios/getCategory')
                if (categories.data.length > 0) {
                    this.categories = categories.data
                }
            },
            async getLenders(){
                try{
                    const Lenders = await axios.get(endPoint.endpointTarget+'/manicuristas') 
                    this.lenders = Lenders.data 
                }catch(err){
                    console.log(err)
                }
            },
            validMultiLender(){
                this.registerDate.employeSelect = ''
                this.validSchedule = false
                this.noOneLender = true
                var valid = 0 
                for (let index = 0; index < this.registerDate.serviceSelectds.length; index++) {
                    const element = this.registerDate.serviceSelectds[index];
                    if (element.lender == "") {
                        valid = 1
                    }
                }
                if (valid == 0) {
                    this.validSchedule = true
                    this.noOneLender = true

                }
            },
            validLender(){
                if (this.registerDate.serviceSelectds.length > 0 && this.dates.simple != '') {
                    this.ifLender = true
                }else{
                    this.ifLender = false
                }

                if (this.checkboxes.Wantlender == false) {
                    this.generateLender()
                    this.validSchedule = true
                    const count = this.finalyLenders.length
                    const random = Math.round(Math.random() * count)
                    this.registerDate.employeSelect = this.finalyLenders[random].nombre
                    this.registerDate.class = this.finalyLenders[random].class
                    this.registerDate.employeResTime = this.finalyLenders[random].restTime
                }
            },
            selectLender(nombre, clas, restTime, id){
                this.registerDate.class = clas
                this.registerDate.employeSelect = nombre
                this.registerDate.employeResTime = restTime
                $('.frame').css({'background-color':'#fff'})
                $('.frame h3').css({'color':'#32325d'})
                $('.'+id).css({'background-color':'#32325d'})
                $('.'+id+'h3').css({'color':'#fff'})
                this.validSchedule = true
                this.noOneLender = false
            },
            selectHourService(index, lender, time, resTime){
                console.log(lender+'--'+ time+'--'+ resTime)
                this.modals.modal1 = true
                this.selectServiceForHour = {}
                this.selectServiceForHour = {
                    employe: lender,
                    date: this.dates.simple,
                    time: parseFloat(time) + 15,
                    resTime: resTime,
                    index: index
                }
                axios.post(endPoint.endpointTarget+'/citas/getBlocks', this.selectServiceForHour)
                .then(res => { 
                    this.blockHour = res.data 
                    this.progress = true
                })
                .catch(err => { console.log(err) })
            },
            insertDate(){
                if (this.noOneLender) {
                    if (this.registerDate.design == 'si' && this.readyAddDesign) {
                        this.registerDate.duration = this.registerDate.duration + 15
                        this.readyAddDesign = false
                    }
                }else{
                    if (this.registerDate.design == 'si' && this.readyAddDesign) {
                        this.registerDate.duration = this.registerDate.duration + 15
                        this.readyAddDesign = false
                    }
                    this.blockHour = []
                    axios.post(endPoint.endpointTarget+'/citas/getBlocks', {
                        employe: this.registerDate.employeSelect,
                        date: this.dates.simple,
                        time: this.registerDate.duration,
                        resTime:this.registerDate.employeResTime
                    })
                    .then(res => { 
                        this.blockHour = res.data 
                        this.progress = true
                    })
                    .catch(err => { console.log(err) })
                }
                
            },
            plusService(index, service, time, comision, precio, lenders){
                this.ifServices = true
                this.serviceCount[index].count++
                this.registerDate.duration = this.registerDate.duration + parseFloat(time)
                var lendersName = []
                for (let indexThree = 0; indexThree < this.lenders.length; indexThree++) {
                    for (let indexTwo = 0; indexTwo < lenders.length; indexTwo++) {
                        if (this.lenders[indexThree]._id == lenders[indexTwo]) {
                            lendersName.push({lender: this.lenders[indexThree].nombre, resTime: this.lenders[indexThree].restTime, class: this.lenders[indexThree].class})
                            break
                        }
                    }  
                }
                if (this.posibleLenders.length > 0) {
                    for (let indexThree = 0; indexThree < this.lenders.length; indexThree++) {
                        var verify = 0
                        for (let indexTwo = 0; indexTwo < this.posibleLenders.length; indexTwo++) {
                            if (lenders[indexThree] == this.posibleLenders[indexTwo]) {
                                verify++
                            }
                        }  
                        if (verify == 0) {
                            this.posibleLenders.push(lenders[indexThree])
                        }
                    }
                }else{
                    for (let index = 0; index < lenders.length; index++) {
                        this.posibleLenders.push(lenders[index]) 
                    } 
                } 
                this.registerDate.serviceSelectds.push({comision: comision, precio: precio,servicio: service, lender: '', lenders: lendersName, start: '', end:'', sort: 0, duration: time, restTime: '', class: ''})
                this.registerDate.start = ''  
                this.registerDate.end = '' 
                this.registerDate.sort = ''    
                this.validHour = false   
            },
            lessService(index, service, time){
                if (this.serviceCount[index].count > 0) {
                    this.serviceCount[index].count--
                    this.registerDate.duration = this.registerDate.duration - parseFloat(time)
                }
                for (var i = 0; i < this.registerDate.serviceSelectds.length; i++) {
                    if (this.registerDate.serviceSelectds[i].servicio == service ) {
                        this.registerDate.serviceSelectds.splice(i, 1)
                        break
                    }
                }
                if (this.registerDate.serviceSelectds.length == 0) {
                    this.ifServices = false
                    this.validLender()
                    this.validSchedule = false
                    this.posibleLenders = []
                }
                this.registerDate.start = ''
                this.registerDate.end = '' 
                this.registerDate.sort = '' 
                this.validHour = false
                console.log(this.registerDate.serviceSelectds)
            },
            generateLender(){
                this.finalyLenders = []
                for (let index = 0; index < this.lenders.length; index++) {
                    const element = this.lenders[index];
                    for (let i = 0; i < this.posibleLenders.length; i++) {
                        if(element._id == this.posibleLenders[i]){
                            this.finalyLenders.push({nombre:element.nombre, _id:element._id, class: element.class, restTime: element.restTime})
                        }
                    }
                }
            },
            selectBloq(hora, i){
                this.registerDate.start = this.blockHour[i].Horario
                var sortSp = this.registerDate.start.split(":") 
                this.registerDate.sort = sortSp[0]+sortSp[1]
                
                axios.post(endPoint.endpointTarget+'/citas/getBlocks', {
                    employe: this.registerDate.employeSelect,
                    date: this.dates.simple,
                    time: this.registerDate.duration,
                    resTime : this.registerDate.employeResTime
                })
                .then(res => {
                    
                    for (let index = 0 ; index <= this.registerDate.duration / 15; index++) {
                        res.data[i].validator = 'select'
                        this.registerDate.end = res.data[i].Horario
                        i++
                    }
                    this.blockHour = res.data
                    this.validHour = true
                })
                .catch(err => {
                    console.log(err)
                })
            },
            selectBloqMulti(hora, i){
                var sortSp = this.blockHour[i].Horario.split(":") 
                this.registerDate.serviceSelectds[this.selectServiceForHour.index].start = this.blockHour[i].Horario
                this.registerDate.serviceSelectds[this.selectServiceForHour.index].sort = sortSp[0]+sortSp[1]
                axios.post(endPoint.endpointTarget+'/citas/getBlocks', this.selectServiceForHour)
                .then(res => {
                    
                    for (let index = 0 ; index <= this.selectServiceForHour.time / 15; index++) {
                        res.data[i].validator = 'select'
                        this.registerDate.serviceSelectds[this.selectServiceForHour.index].end = res.data[i].Horario
                        i++
                    }
                    this.blockHour = res.data

                    var valid = 0 
                    for (let index = 0; index < this.registerDate.serviceSelectds.length; index++) {
                        const element = this.registerDate.serviceSelectds[index];
                        if (element.start == "") {
                            valid = 1
                        }
                    }
                    if (valid == 0) {
                        this.validHour = true
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            },
        }
    }
</script>
<style>

.date-info ul{
    color:#32325d;
    font-weight: 600;
}
.btn-sevices{
    background-color: #32325d;
    border:solid 2px #32325d;
    border-radius: 5px;
    color: #fff;
    font-weight: 600;
    font-size: 14px;
    margin-left: 2px;
    margin-bottom: 5px;
    transition: all ease .5s;
    letter-spacing: .1em;
}
.btn-sevices:hover{
    background-color: #fff;
    border:solid 2px #32325d;
    color: #32325d;
}
#lenderSection{
    display: none;
}
.btn-header{
    background-color: #fff;
    border:solid 2px #32325d;
    border-radius: 5px;
    color: #32325d;
    padding-left: 10px;
    font-weight: 600;
    width: 100%;
    transition: all ease .5s;
    letter-spacing: .1em;
}
.btnDate:focus{
    outline:none !important;
}
.frame{
    cursor: pointer;
    background-color: #fff;
    border-top: solid 2px #32325d; 
    border-right: solid 2px #32325d; 
    border-left: solid 2px #32325d;
    transition: all ease .5s; 
    padding-bottom: 5px;
    padding-top: -25px;
}
.frame:hover{
    background-color: #32325d;
}
.frame h3{
    transition: all ease .5s;
}
.frame:hover h3{
    color:#fff; 
}
.date-client{
    background-color: #fff !important;
    border-left: 1px solid #cad1d7 !important;
    font-weight: 600 !important;
}
.frameTable{
    background-color: #172b4d;
    border-radius: 10px;
    padding: 20px 0;
}
.frameTable .tablesServiceAgend{
    width: 100%;
    border: none;
}
.frameTable .theadServiceAgend{
    background-color: #1c345d;
    width: 100%;
    padding: 0 10px;
}
.frameTable .tr-service, .thServiceAgend{
    color: #416ab0;
}
.frameTable .tr-service, .tdServiceAgend{
    border-bottom: solid 1px #1c345d;
    color: #fff;
    padding: 10px;
}
</style>