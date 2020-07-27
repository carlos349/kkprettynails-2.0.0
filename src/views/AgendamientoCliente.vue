<template>
    <div class="font">
        <base-nav class="navbar navbar-horizontal navbar-expand-lg bg-gradient">  
            <a slot="brand" class="navbar-brand" href="http://syswa.com">
                <img src="img/brand/logokk.png" alt="" style="height:70px;width:70px">
                <b class="ml-3 mt-3" style="font-size: 1.2em;color:#fff;">KKPRETTYNAILS</b> 
            </a>
        </base-nav>
        <div class="container-fluid mt-4">
            <card shadow>
                <form-wizard @on-complete="modals.modal2 = true" color="#174c8e" back-button-text="Atras" next-button-text="Siguiente" finish-button-text="¡Agendar!"> 
                    <h2 v-if="validWizard" slot="title">Datos de agendamiento </h2>
                    <h2 v-else slot="title" class="text-danger">¡Debe completar los datos!</h2>
                    <tab-content title="Servicios" icon="fa fa-list-ul" :before-change="validateFirstStep" >
                        <div class="row">
                            <div class="col-md-12">
                                <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                    <li v-for="category of categories" :key="category._id" class="nav-item" role="presentation">
                                        <base-button type="default" class="w-100 mt-1 categoryButton" data-toggle="pill" :href="'#v-pills-'+category._id" role="tab" aria-controls="v-pills-home" aria-selected="true">{{category.name}}</base-button>
                                    </li>
                                </ul>
                            </div>
                            <div class="col-md-12">
                                <!-- <vue-custom-scrollbar  style="height:30vh;overflow:hidden;overflow-x: hidden;overflow-y:scroll;"> -->
                                    <div class="tab-content" id="pills-tabContent">
                                        <div v-for="category of categories" :key="category._id" class="tab-pane fade" :id="'v-pills-'+category._id" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                            <div class="row mt-2">
                                                 <div v-for="(service, index) of services" :key="service" class="col-md-3" v-if="service.category == category.name">
                                                    <div class="card-service row">
                                                        <div class="col-5" style="padding: 0px !important;">
                                                            <span class="price-service">{{formatPrice(service.precio)}} $</span> 
                                                        </div>
                                                        <div class="col-7" style="padding: 0px !important;margin-top:-5px;">
                                                            <p class="name-service mt-1"> {{service.nombre}}</p>
                                                        </div>
                                                        <div class="col-12 mt-4" style="padding: 0px !important;">
                                                            <div class="button-service-group">
                                                                <button class="button-service-left categoryButton" v-on:click="plusService(index, service.nombre, service.tiempo, service.comision, service.precio, service.prestadores)"><i class="fa fa-plus"></i></button>
                                                                <span class="span-button-service">{{serviceCount[index].count}}</span>
                                                                <button class="button-service-right categoryButton" v-on:click="lessService(index, service.nombre, service.tiempo)"><i class="fa fa-minus"></i></button>
                                                            </div>
                                                            
                                                        </div>  
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    
                                        <!-- <div v-for="category of categories" :key="category._id" class="tab-pane fade show " :id="'v-pills-'+category._id" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                            <div v-for="(service, index) of services" class="row" v-if="service.category == category.name">
                                                <div class="col-md-6">
                                                    <button class="btn-header btnDate py-2 px-4 mt-2"> 
                                                        <span class="badge badge-default">{{service.tiempo}}Min</span> | {{service.nombre}} |
                                                        <span class="badge badge-default ">{{serviceCount[index].count}}</span> 
                                                    </button> 
                                                </div> 
                                                <div class="col-md-3">
                                                    <button class="btn-sevices btnDate w-100 mt-3" v-on:click="plusService(index, service.nombre, service.tiempo, service.comision, service.precio, service.prestadores)"><i class="fa fa-plus" aria-hidden="true" style="font-size:14px;"></i></button>
                                                </div>
                                                <div class="col-md-3">
                                                    <button class="btn-sevices btnDate w-100 mt-3" v-on:click="lessService(index, service.nombre, service.tiempo)"><i class="fa fa-minus" aria-hidden="true" style="font-size:14px;"></i></button> 
                                                </div>
                                            </div>
                                        </div> -->
                                    </div>
                                <!-- </vue-custom-scrollbar> -->
                            </div>
                            <div class="row mx-auto mt-3">
                                <h3>¿Se realizara un diseño?</h3> 
                                <base-radio name="si" value="true" inline class="mb-3 ml-5" v-model="registerDate.design"> <b>Si</b> </base-radio>
                                <base-radio name="no" value="false" inline class="mb-3 ml-5" v-model="registerDate.design"> <b>No</b> </base-radio> 
                            </div>
                        </div>
                    </tab-content>
                    <tab-content title="Profesionales" icon="fa fa-users" :before-change="validLender">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="w-75 mx-auto" >
                                    <h3 class="text-center">Seleccione una fecha</h3>
                                    <base-input addon-left-icon="ni ni-calendar-grid-58 clickCalendar" style="cursor:pointer;" >
                                        <flat-picker 
                                                @on-change="openCalendar"
                                                slot-scope="{focus, blur}"
                                                @on-open="focus"
                                                @on-close="blur"
                                                :config="configDate"
                                                placeholder="Select date" 
                                                class="form-control date-client datepicker pl-3"
                                                aria-placeholder="Seleccione una fecha"
                                                v-model="dates.simple">
                                        </flat-picker>
                                    </base-input>
                                </div>
                            </div>
                            <div class="col-md-8">
                                <div class="row mb-3">
                                    <div class="col-lg-4 col-md-6 text-center mt-2" v-for="(servicesSelect, indexService) of registerDate.serviceSelectds" :key="servicesSelect">
                                        <badge style="font-size:.7em !important" v-if="servicesSelect.lender != ''" type="default" class="mb-1">
                                            <span v-if="servicesSelect.start != ''">{{servicesSelect.lender}} - {{servicesSelect.start}} / {{servicesSelect.end}}</span>
                                            <span v-else>{{servicesSelect.lender}} </span>
                                        </badge>
                                        <badge style="font-size:.7em !important" v-else type="default" class="mb-1">Seleccione prestador y horario</badge>
                                        <base-dropdown class="w-100">
                                            <base-button v-if="servicesSelect.valid" slot="title" type="default" class="dropdown-toggle w-100">
                                                {{servicesSelect.servicio}} 
                                            </base-button>
                                             <base-button v-else disabled slot="title" type="default" class="dropdown-toggle w-100">
                                                {{servicesSelect.servicio}} 
                                            </base-button>
                                                <b v-for="lenders of servicesSelect.lenders" :key="lenders" v-if="lenders.valid" class="dropdown-item w-100" style="color:#32325d;" v-on:click="servicesSelect.start = '', servicesSelect.end = '', servicesSelect.lender = lenders.lender, servicesSelect.restTime = lenders.resTime, servicesSelect.class = lenders.class, validMultiLender(indexService, lenders.lender, servicesSelect.duration, lenders.resTime)">{{lenders.lender}}  </b>
                                        </base-dropdown>
                                        <vue-custom-scrollbar style="height:30vh;overflow:hidden;overflow-x: hidden;overflow-y:hidden;">
                                            <div class="col-12" v-for="(block , index) of servicesSelect.blocks">
                                                <base-button v-if="block.validator == true" v-on:click="selectBloqMulti(block.Horario, index, indexService)" size="sm" class="col-12" type="success">
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
                                </div>
                            </div>
                        </div>
                    </tab-content>
                    <tab-content title="Información" icon="fa fa-info">
                        <div class="row">
                            <div class="col-md-6 col-sm-12" >
                                <dt>Servicios</dt>
                                <vue-custom-scrollbar class="col-12" style="height:35vh;overflow:hidden;overflow-x: hidden;overflow-y:scroll;">
                                    <base-button v-for="data in registerDate.serviceSelectds" class="col-10 mt-1" type="secondary">
                                        <span class="float-left">{{data.servicio}} </span>
                                        <badge class="text-default float-left" type="success">{{data.lender}}</badge>
                                        <badge class="text-default float-left" type="success">{{data.start}} / {{data.end}}</badge>
                                    </base-button>
                                </vue-custom-scrollbar>
                            </div>
                            <div class="col-md-6 col-sm-12">
                                <dt>Información de agenda</dt>
                                <base-button class="col-12 col-md-10 p-2 mt-1" type="secondary">
                                    <span class="float-left"> Fecha </span>
                                    <badge style="font-size:1em !important" type="success" class="text-default float-right">{{dates.simple}}</badge>
                                </base-button>
                                    <base-button class="col-12 col-md-10 p-2 mt-1" type="secondary">
                                    <span class="float-left"> Diseño </span>
                                    <badge style="font-size:1em !important" type="success" class="text-default float-right text-uppercase">{{registerDate.design}}</badge>
                                </base-button>
                                <base-button class="col-12 col-md-10 p-2 mt-1" type="secondary">
                                    <span class="float-left"> Hora de inicio </span>
                                    <badge v-if="registerDate.serviceSelectds[0]" style="font-size:1em !important" type="success" class="text-default float-right">{{registerDate.serviceSelectds[0].start}}</badge>
                                </base-button>
                            </div>
                        </div>
                    </tab-content>
                </form-wizard>
            </card>
        </div>
        <nav class="navbar navbar-expand-lg navbar-light bg-Secondary">
            <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
               <a class="navbar-brand " href="#">
                    <img src="img/brand/syswa-gestion.png" alt="" style="height:100px;width:200px">
                </a>
            </div>
            <span class="navbar-text" style="float: right !important;">
                © {{year}} | <a href="https://www.syswa.com" class="font-weight-bold ml-1" target="_blank">SYSWA</a> Todos los derechos reservados
            </span>
        </nav>
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
                            type="text"
                            v-on:keyup="validFields()"
                            placeholder="Escriba su apellido"
                            v-model="registerUser.lastName"
                            addon-left-icon="fa fa-user">
                        </base-input>
                        <base-input alternative
                            type="email"
                            v-on:keyup="validFields()"
                            placeholder="Escriba su correo"
                            v-model="registerUser.mail"
                            addon-left-icon="ni ni-email-83">
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
                    mail: '',
                    lastName: ''
                },
                validWizard: true,
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
                readyChange: false,
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
            formatPrice(value) {
                let val = (value/1)
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            },
            soWhat(type){
                $('#pills-service').hide()
                $('#pills-date').hide()
                $('#pills-lender').hide()
                $('#pills-hour').hide()
                $('#pills-'+type).show(2000)
            },
            validFields(){
                if (this.registerUser.name != '' && this.registerUser.mail != '' && this.registerUser.lastName != '') {
                    this.validRegister = true
                }else{
                    this.validRegister = false
                }
            },
            sendConfirmation(id, name, mail, start, end, services, lender){
                const nameFormat = name
                const contactFormat = mail
                const startFormat = start
                const endFormat = end
                const dateFormat = this.dates.simple
                axios.post(endPoint.endpointTarget+'/citas/sendConfirmation/'+id, {
                    name: nameFormat,
                    contact: contactFormat,
                    start: startFormat,
                    end: endFormat,
                    date: dateFormat,
                    service: services,
                    lenders: lender
                })
                .then(res => {
                    if (res.data.status == 'ok') {
                        console.log(res.data.status)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            },
            finallyAgend(){
                const name = this.registerUser.name+' '+this.registerUser.lastName
                axios.post(endPoint.endpointTarget+'/clients/verifyClient', {
                    name: name,
                    mail: this.registerUser.mail
                })
                .then(res => {
                    this.client = res.data.data.nombre+' / '+res.data.data.identidad
                    var lenderFinal = ''
                    for (let index = 0; index < this.registerDate.serviceSelectds.length; index++) {
                        const element = this.registerDate.serviceSelectds[index].lender;
                        if (index > 0){
                            lenderFinal = lenderFinal+' - '+element
                        }else{
                            lenderFinal = element
                        }
                    }
            
                    if (this.noOneLender) {
                        console.log(this.registerDate)
                        axios.post(endPoint.endpointTarget+'/citas/noOneLender', {
                            dataDate: this.registerDate,
                            date: this.dates.simple,
                            client: this.client
                        })
                        .then(res => {
                            if (res.data.status == "cita creada") {
                                this.sendConfirmation(res.data.id, name, this.registerUser.mail, this.registerDate.serviceSelectds[0].start, this.registerDate.serviceSelectds[0].end, this.registerDate.serviceSelectds, lenderFinal)
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
                                this.sendConfirmation(res.data.id, name, this.registerUser.mail, this.registerDate.start, this.registerDate.end, this.registerDate.serviceSelectds, this.registerDate.employeSelect)
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
            validMultiLender(index, lender, time, resTime){
                this.registerDate.employeSelect = ''
                this.validSchedule = false
                this.noOneLender = true
                this.selectHourService(index, lender, time, resTime)
                var valid = 0 
                for (let i = 0; i < this.registerDate.serviceSelectds.length; i++) {
                    const element = this.registerDate.serviceSelectds[i];
                    if (element.lender == "") {
                        valid = 1
                    }
                }

                for (let j = 0; j < this.registerDate.serviceSelectds.length; j++) {
                    for (let x = 0; x < this.registerDate.serviceSelectds[j].lenders.length; x++) {
                        const elementTwo = this.registerDate.serviceSelectds[j].lenders[x];
                        if (elementTwo.lender == lender) {
                            elementTwo.valid = false
                        }else{
                            elementTwo.valid = true
                        }
                    }
                }

                if (valid == 0) {
                    this.noOneLender = true
                }
                
            },
            selectHourService(index, lender, time, resTime){
                console.log(lender+'--'+ time+'--'+ resTime+'--'+index)
                
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
                    this.registerDate.serviceSelectds[index].blocks = res.data
                    console.log(this.registerDate.serviceSelectds[index])
                    this.blockHour = res.data 
                    this.progress = true
                })
                .catch(err => { console.log(err) })
            },
            validLender(){
                // if (this.checkboxes.Wantlender == false) {
                //     this.generateLender()
                //     this.validSchedule = true
                //     const count = this.finalyLenders.length
                //     const random = Math.round(Math.random() * count)
                //     this.registerDate.employeSelect = this.finalyLenders[random].nombre
                //     this.registerDate.class = this.finalyLenders[random].class
                //     this.registerDate.employeResTime = this.finalyLenders[random].restTime
                // }
                this.generateLender()
                if (this.registerDate.serviceSelectds.length > 0 && this.dates.simple != '') {
                    this.validWizard = true
                    this.ifLender = true
                    return true
                }else{
                    this.validWizard = false
                    this.ifLender = false
                    return false
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
                this.validHour = false
                for (let i = 0; i < this.registerDate.serviceSelectds.length; i++) {
                    const element = this.registerDate.serviceSelectds[i];
                    element.start = ''
                    element.end = ''
                    element.sort = ''
                    element.lender = ''
                    element.blocks = []
                    element.restTime = ''
                    element.class = ''
                }
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
                            lendersName.push({lender: this.lenders[indexThree].nombre, resTime: this.lenders[indexThree].restTime, class: this.lenders[indexThree].class, valid: true})
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
                this.registerDate.serviceSelectds.push({comision: comision, precio: precio, servicio: service, lender: 'Primera disponible', lenders: lendersName, start: '', end:'', sort: 0, duration: time, restTime: '', class: '', blocks: [], valid: false})
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
            selectBloqMulti(hora, i, indexService){
                console.log(indexService)
                var sortSp = this.blockHour[i].Horario.split(":") 
                this.registerDate.serviceSelectds[indexService].start = this.blockHour[i].Horario
                this.registerDate.serviceSelectds[indexService].sort = sortSp[0]+sortSp[1]
                axios.post(endPoint.endpointTarget+'/citas/getBlocks', this.selectServiceForHour)
                .then(res => {
                    console.log(this.selectServiceForHour)
                    for (let index = 0 ; index <= this.selectServiceForHour.time / 15; index++) {
                        res.data[i].validator = 'select'
                        this.registerDate.serviceSelectds[indexService].end = res.data[i].Horario
                        i++
                    }
                    this.registerDate.serviceSelectds[indexService].blocks = res.data
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
                    const finalIndex = parseFloat(indexService) + parseFloat(1)
                    if (this.registerDate.serviceSelectds[finalIndex]) {
                        if (this.registerDate.serviceSelectds[finalIndex].valid == false) {
                            console.log(finalIndex)
                            console.log(this.registerDate.serviceSelectds[finalIndex].lenders.length)
                            const count = this.registerDate.serviceSelectds[finalIndex].lenders.length
                            const random = Math.round(Math.random() * (parseFloat(count) - parseFloat(1)))
                            const finalLender = this.registerDate.serviceSelectds[finalIndex].lenders[random].lender
                            const finalRestime = this.registerDate.serviceSelectds[finalIndex].lenders[random].resTime
                            this.validMultiLender(finalIndex, finalLender, this.registerDate.serviceSelectds[finalIndex].duration, finalRestime)
                            this.registerDate.serviceSelectds[finalIndex].valid = true
                        }
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            },
            validateFirstStep() {
                console.log(this.registerDate.design)
                
                if (this.registerDate.design != 'nada' && this.ifServices) {
                    this.validWizard = true
                    return this.ifServices
                }else{
                    this.validWizard = false
                    return false
                }
                
            },
            validateLastStep() {
                if (this.validHour) {
                    this.validWizard = true
                    return this.validHour
                }else{
                    this.validWizard = false
                    return this.validHour
                }
                
            },
            openCalendar(){
                if (this.readyChange) {
                    for (let index = 0; index < this.registerDate.serviceSelectds.length; index++) {
                        const element = this.registerDate.serviceSelectds[index];
                        element.start = ''
                        element.end = ''
                        element.sort = ''
                        element.blocks = []
                    }
                    this.validHour = false
                }else{
                    setTimeout(() => {
                        this.registerDate.serviceSelectds[0].valid = true
                        const count = this.registerDate.serviceSelectds[0].lenders.length
                        const random = Math.round(Math.random() * (parseFloat(count) - parseFloat(1)))
                        const finalLender = this.registerDate.serviceSelectds[0].lenders[random].lender
                        const finalRestime = this.registerDate.serviceSelectds[0].lenders[random].resTime
                        this.validMultiLender(0, finalLender, this.registerDate.serviceSelectds[0].duration, finalRestime)
                        this.readyChange = false
                    }, 500);
                }
            }
        }
    }
</script>
<style>

.date-info ul{
    color:#32325d;
    font-weight: 600;
}
.btn-sevices{
    background-color: #174c8e;
    border:solid 2px #174c8e;
    border-radius: 5px;
    color: #fff;
    font-weight: 600;
    font-size: 1em;
    /* margin-left: 2px; */
    
    transition: all ease .5s;
    /* letter-spacing: .1em; */
}
.btn-sevices:hover{
    background-color: #fff;
    border:solid 2px #174c8e;
    color: #174c8e;
}
#lenderSection{
    display: none;
}
.btn-header{
    background-color: #fff;
    border:solid .8px #0086e5;
    border-radius: 5px;
    color: #32325d;
    padding-left: 2px;
    font-weight: 400;
    text-align:left;
    font-size:.9rem;
    /* margin-right: 5px; */
    width: 100%;
    transition: all ease .5s;
    letter-spacing: .01em;
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
.top-0{
    margin-top:10% !important;
}
.bg-gradient{
    background: rgb(2,0,36);
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,134,229,1) 0%, rgba(23,76,142,1) 89%);
}
.inactiveButton{
    background-color: #959595 !important;
}
.activeButton{
    background-color: #174c8e !important;
}
.categoryButton{
    background-color: #174c8e !important;
    border-color: #174c8e !important;
}
.card-service{
    padding: 20px 10px;
    border: solid 2px #D4D8D4;
    border-top: solid 4px #174c8e;
    width: 100%;
    transition: all 0.5s ease-out;
}
.card-service:hover{
    background-color: #D4D8D4;
}
.price-service{
    background-color: #2ACB3A;
    padding: 10px;
    border-radius: 8px;
    color: #fff;
    font-weight: 600;
    -webkit-box-shadow: inset 0px 0px 26px -12px rgba(14,68,19,1);
    -moz-box-shadow: inset 0px 0px 26px -12px rgba(14,68,19,1);
    box-shadow: inset 0px 0px 26px -12px rgba(14,68,19,1);
}
.name-service{
    font-size: .9em;
    line-height: normal;
    letter-spacing: .02em;
}
.button-service-group{
    float: right;
}
.span-button-service{
    padding: 9.5px 15px;
    background-color: #D4D8D4;
    font-weight: 600;
}
.button-service-left{
    border:none;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    padding: 6px 15px;
    color: #fff;
    font-weight: 400;
    font-size: 1rem;
    transition: all 0.5s ease-out;
}
.button-service-right{
    border:none;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    padding: 6px 15px;
    color: #fff;
    font-weight: 400;
    font-size: 1rem;
    transition: all 0.4s ease-out;
}
.button-service-left i{
    transition: all 0.4s ease-out;
}
.button-service-right i{
    transition: all 0.5s ease-out;
}
.button-service-left:hover i{
    transform: rotate(90deg);
}
.button-service-right:hover i{
    transform: rotate(180deg);
}
.button-service-left:focus{
    outline: none;
}
.button-service-right:focus{
    outline: none;
}
</style>