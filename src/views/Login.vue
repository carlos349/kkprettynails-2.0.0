<template>
    <div class="row justify-content-center">
        <div v-if="ifStart" class="col-lg-12 col-md-12">
            <div class="card bg-secondary shadow border-0">
                <div class="card-body px-lg-5 py-lg-5">
                    <div class="btn-wrapper text-center">
                        <span class="mb-1"><img style="width:30%" src="img/brand/syswa-gestion.png"></span> <br><br>
                    </div>
                    <div class="stepsBar">
                        <a-steps>
                            <a-step :status="status.branch" title="Sucursal">
                                <a-icon slot="icon" :type="status.branch == 'process' ? 'loading' : 'shop'" />
                            </a-step>
                            <a-step :status="status.date" title="Agenda">
                                <a-icon slot="icon" :type="status.date == 'process' ? 'loading' : 'calendar'" />
                            </a-step>
                            <a-step :status="status.sale" title="Ventas">
                                <a-icon slot="icon" :type="status.sale == 'process' ? 'loading' : 'credit-card'" />
                            </a-step>
                            <a-step :status="status.final" title="Paso final">
                                <a-icon slot="icon" :type="status.final == 'process' ? 'loading' : 'smile-o'" />
                            </a-step> 
                        </a-steps>
                    </div>
                    <div class="stepsBox mt-5">
                        <div v-if="process == 'branch'" class="branch mt-4">
                            <h1 class="text-uppercase text-center mb-4">
                                ¡Bienvenido a Syswa Gestión!
                            </h1>
                            <div class="row mt-5">
                                <div class="col-md-6 col-sm-12">
                                    <a-icon v-on:click="alertsMessages('Este sería el nombre de su primera sucursal, de tener mas puede registrarla ya pasado este registro inicial.')" style="cursor: pointer;" type="question-circle" />
                                    <label class="ml-2" for="credentials">
                                        Nombre de la sucursal
                                    </label>
                                    <base-input class="input-group-alternative"
                                        placeholder="Nombre de la sucursal"
                                        addon-left-icon="ni ni-shop"
                                        v-model="modelStart.businessName"
                                        :valid="modelStart.businessName.length >= 4 ? true : false">
                                    </base-input>
                                </div>
                                <div class="col-md-6 col-sm-12 row pr-0">
                                    <label class="ml-2 w-100" for="credentials">
                                        Número de contacto
                                    </label>
                                    <div class="col-3">
                                        <base-input class="input-group-alternative"
                                            placeholder="+56"
                                            v-model="modelStart.businessPhoneCode"
                                        >
                                        </base-input>
                                    </div>
                                    <div class="col-9 px-0">
                                        <base-input class="input-group-alternative"
                                            placeholder="Teléfono"
                                            type='number'
                                            addon-left-icon="fa fa-phone"
                                            v-model="modelStart.businessPhone">
                                        </base-input>
                                    </div>
                                </div>
                                <div class="col-md-6 col-sm-12">
                                    <label class="ml-2 w-100" for="credentials">
                                        Dirección del local
                                    </label>
                                    <base-input class="input-group-alternative"
                                        placeholder="Dirección"
                                        addon-left-icon="fa fa-location-arrow"
                                        v-model="modelStart.businessLocation"
                                        :valid="modelStart.businessLocation.length >= 4 ? true : false">
                                    </base-input>
                                </div>
                                <div class="col-md-6 col-sm-12">
                                    <label class="ml-2 w-100" for="credentials">
                                        Tipo de negocio
                                    </label>
                                    <a-select
                                            show-search
                                            placeholder="Seleccionar negocio"
                                            option-filter-prop="children"
                                            style="width: 100%"
                                            class="input-group-alternative"
                                            size="large"
                                            :filter-option="filterOption"
                                            @change="handleChange"
                                        >
                                        <a-select-option value="nails">
                                            Spa de uñas
                                        </a-select-option>
                                        <a-select-option value="barber">
                                            Barberia
                                        </a-select-option>
                                        <a-select-option value="stylish">
                                            Peluquería
                                        </a-select-option>
                                    </a-select>
                                </div>
                            </div>
                            <base-button outline type="default" class="float-right mt-2" v-on:click="nextStep('branch')">
                                Siguiente
                            </base-button>
                        </div>
                        <div v-else-if="process == 'date'" class="data mt-4">
                            <h1 class="text-uppercase text-center mb-4">
                                Configura tu agenda
                            </h1>
                            <hr class="w-50">
                            <h3 class="text-weigth-bold text-center">
                                Configura tu agenda
                            </h3>
                            <div class="row">
                                <div class="col-4">
                                    <base-button :type="days.monday" size="sm" class="mt-2 w-100" v-on:click="salectDay('monday')">
                                        Lunes
                                    </base-button>
                                    <base-button :type="days.tuesday" size="sm" class="mt-2 w-100" v-on:click="salectDay('tuesday')">
                                        Martes
                                    </base-button>
                                    <base-button :type="days.wednesday" size="sm" class="mt-2 w-100" v-on:click="salectDay('wednesday')">
                                        Miércoles
                                    </base-button>
                                    <base-button :type="days.thursday" size="sm" class="mt-2 w-100" v-on:click="salectDay('thursday')">
                                        Jueves
                                    </base-button>
                                    <base-button :type="days.friday" size="sm" class="mt-2 w-100" v-on:click="salectDay('friday')">
                                        Viernes
                                    </base-button>
                                    <base-button :type="days.saturday" size="sm" class="mt-2 w-100" v-on:click="salectDay('saturday')">
                                        Sábado
                                    </base-button>
                                    <base-button :type="days.sunday" size="sm" class="mt-2 w-100" v-on:click="salectDay('sunday')">
                                        Domingo
                                    </base-button>
                                </div>
                                <div class="col-8">
                                    <a-select :disabled="modelStart.blockHour[1].status == true ? false : true" style="width:40%" class="mx-2 mt-1 input-group-alternative" placeholder="Desde" v-model="modelStart.blockHour[1].start">
                                        <a-select-option v-for="i in fromArray" :key="i">
                                            {{i}}
                                        </a-select-option>
                                    </a-select>
                                    <a-select :disabled="modelStart.blockHour[1].status == true ? false : true" style="width:40%" class="mx-2 mt-1 input-group-alternative" placeholder="Hasta" v-model="modelStart.blockHour[1].end">
                                        <a-select-option v-for="i in toArray" :key="i">
                                            {{i}}
                                        </a-select-option>
                                    </a-select>

                                    <a-select :disabled="modelStart.blockHour[2].status == true ? false : true" style="width:40%" class="mx-2 mt-1 input-group-alternative" placeholder="Desde" v-model="modelStart.blockHour[2].start">
                                        <a-select-option v-for="i in fromArray" :key="i">
                                            {{i}}
                                        </a-select-option>
                                    </a-select>
                                    <a-select :disabled="modelStart.blockHour[2].status == true ? false : true" style="width:40%" class="mx-2 mt-1 input-group-alternative" placeholder="Hasta" v-model="modelStart.blockHour[2].end">
                                        <a-select-option v-for="i in toArray" :key="i">
                                            {{i}}
                                        </a-select-option>
                                    </a-select>
                                    
                                    <a-select :disabled="modelStart.blockHour[3].status == true ? false : true" style="width:40%" class="mx-2 mt-1 input-group-alternative" placeholder="Desde" v-model="modelStart.blockHour[3].start">
                                        <a-select-option v-for="i in fromArray" :key="i">
                                            {{i}}
                                        </a-select-option>
                                    </a-select>
                                    <a-select :disabled="modelStart.blockHour[3].status == true ? false : true" style="width:40%" class="mx-2 mt-1 input-group-alternative" placeholder="Hasta" v-model="modelStart.blockHour[3].end">
                                        <a-select-option v-for="i in toArray" :key="i">
                                            {{i}}
                                        </a-select-option>
                                    </a-select>

                                    <a-select :disabled="modelStart.blockHour[4].status == true ? false : true" style="width:40%" class="mx-2 mt-1 input-group-alternative" placeholder="Desde" v-model="modelStart.blockHour[4].start">
                                        <a-select-option v-for="i in fromArray" :key="i">
                                            {{i}}
                                        </a-select-option>
                                    </a-select>
                                    <a-select :disabled="modelStart.blockHour[4].status == true ? false : true" style="width:40%" class="mx-2 mt-1 input-group-alternative" placeholder="Hasta" v-model="modelStart.blockHour[4].end">
                                        <a-select-option v-for="i in toArray" :key="i">
                                            {{i}}
                                        </a-select-option>
                                    </a-select>

                                    <a-select :disabled="modelStart.blockHour[5].status == true ? false : true" style="width:40%" class="mx-2 mt-1 input-group-alternative" placeholder="Desde" v-model="modelStart.blockHour[5].start">
                                        <a-select-option v-for="i in fromArray" :key="i">
                                            {{i}}
                                        </a-select-option>
                                    </a-select>
                                    <a-select :disabled="modelStart.blockHour[5].status == true ? false : true" style="width:40%" class="mx-2 mt-1 input-group-alternative" placeholder="Hasta" v-model="modelStart.blockHour[5].end">
                                        <a-select-option v-for="i in toArray" :key="i">
                                            {{i}}
                                        </a-select-option>
                                    </a-select>

                                    <a-select :disabled="modelStart.blockHour[6].status == true ? false : true" style="width:40%" class="mx-2 mt-1 input-group-alternative" placeholder="Desde" v-model="modelStart.blockHour[6].start">
                                        <a-select-option v-for="i in fromArray" :key="i">
                                            {{i}}
                                        </a-select-option>
                                    </a-select>
                                    <a-select :disabled="modelStart.blockHour[6].status == true ? false : true" style="width:40%" class="mx-2 mt-1 input-group-alternative" placeholder="Hasta" v-model="modelStart.blockHour[6].end">
                                        <a-select-option v-for="i in toArray" :key="i">
                                            {{i}}
                                        </a-select-option>
                                    </a-select>

                                    <a-select :disabled="modelStart.blockHour[0].status == true ? false : true" style="width:40%" class="mx-2 mt-1 input-group-alternative" placeholder="Desde" v-model="modelStart.blockHour[0].start">
                                        <a-select-option v-for="i in fromArray" :key="i">
                                            {{i}}
                                        </a-select-option>
                                    </a-select>
                                    <a-select :disabled="modelStart.blockHour[0].status == true ? false : true" style="width:40%" class="mx-2 mt-1 input-group-alternative" placeholder="Hasta" v-model="modelStart.blockHour[0].end">
                                        <a-select-option v-for="i in toArray" :key="i">
                                            {{i}}
                                        </a-select-option>
                                    </a-select>
                                </div>
                            </div>
                            <base-button outline type="default" class="float-right mt-3" v-on:click="nextStep('date')">
                                Siguiente
                            </base-button>
                        </div>
                        <div v-else-if="process == 'sale'" class="data mt-4">
                            <h1 class="text-uppercase text-center mb-4">
                                Crea tus tipos de pago
                            </h1>
                            <hr class="w-50">
                            <div class="row">
                                <div class="col-md-4">
                                    <base-input class="input-group-alternative"
                                        placeholder="Efectivo"
                                        addon-left-icon="fa fa-plus"
                                        v-model="typePay"
                                        v-on:keyup.enter="insertTypePay">
                                    </base-input>
                                    <base-button outline type="default" size="sm" class="w-50" v-on:click="insertTypePay">
                                        Ingresar
                                    </base-button>
                                    <label class="mt-4" for="currency">
                                        Seleccione su moneda local
                                    </label>
                                    <a-select class="input-group-alternative" default-value="CLP" style="width: 100%" @change="selectCurrency" size="large">
                                        <a-select-option value="USD">
                                            USD
                                        </a-select-option>
                                        <a-select-option value="EUR">
                                            EUR
                                        </a-select-option>
                                        <a-select-option value="CLP" >
                                            CLP
                                        </a-select-option>
                                        <a-select-option value="COP">
                                            COP
                                        </a-select-option>
                                        <a-select-option value="ARG">
                                            ARG
                                        </a-select-option>
                                        <a-select-option value="VES">
                                            VES
                                        </a-select-option>
                                    </a-select>
                                </div>
                                <div class="col-md-8" style="overflow: hidden; max-height: 200px;">
                                    <a-list bordered :data-source="modelStart.typesPay">
                                        <a-list-item slot="renderItem" slot-scope="item, index">
                                            {{ item }} 
                                            <base-button outline type="default" size="sm" class="float-right" v-on:click="removeTypePay(index)">
                                                <i class="fa fa-times"></i>
                                            </base-button>
                                        </a-list-item>
                                    </a-list>
                                </div>
                            </div>
                            <base-button outline type="default" class="float-right mt-3" v-on:click="nextStep('sale')">
                                Siguiente
                            </base-button>
                        </div>
                        <div v-else-if="process == 'final'" class="data mt-4">
                            <h1 class="text-uppercase text-center mb-4">
                                Crea tu usuario de ingreso.
                            </h1>
                            <hr class="w-50">
                            <div class="row">
                                <div class="col-md-4">
                                    <label for="first_name">
                                        Nombre completo
                                    </label>
                                    <base-input class="input-group-alternative"
                                        placeholder="Nombre completo"
                                        addon-left-icon="ni ni-circle-08"
                                        v-model="modelStart.first_name"
                                        :valid="modelStart.first_name.length >= 4 ? true : false">
                                    </base-input>
                                </div>
                                <div class="col-md-4">
                                    <label for="last_name">
                                        Apellidos
                                    </label>
                                    <base-input class="input-group-alternative"
                                        placeholder="Apellidos"
                                        addon-left-icon="ni ni-circle-08"
                                        v-model="modelStart.last_name"
                                        :valid="modelStart.last_name.length >= 4 ? true : false">
                                    </base-input>
                                </div>
                                <div class="col-md-4">
                                    <a-icon v-on:click="alertsMessages('Debe introducir las credenciales otorgadas para el ingreso al sistema, de no saber cuales son, por favor comunicarse con el soporte técnico.')" style="cursor: pointer;" type="question-circle" />
                                    <label class="ml-2" for="credentials">
                                        Credencial de ingreso
                                    </label>
                                    <base-input class="input-group-alternative"
                                        placeholder="Credencial"
                                        addon-left-icon="ni ni-key-25"
                                        v-model="modelStart.credential"
                                        :valid="modelStart.credential.length == 20 ? true : false">
                                    </base-input>
                                </div>
                                <div class="col-md-6">
                                    <label for="email">
                                        Correo
                                    </label>
                                    <base-input class="input-group-alternative"
                                        placeholder="Correo"
                                        autocomplete="off"
                                        addon-left-icon="ni ni-email-83"
                                        v-model="modelStart.email"
                                        :valid="validEmail()">
                                    </base-input>
                                </div>
                                <div class="col-md-6">
                                    <label for="password">
                                        Contraseña
                                    </label>
                                    <base-input class="input-group-alternative"
                                        placeholder="Contraseña"
                                        autocomplete="off"
                                        type="password"
                                        addon-left-icon="fa fa-unlock-alt"
                                        v-model="modelStart.password"
                                        :valid="modelStart.password.length > 8 ? true : false"
                                    >
                                    </base-input>
                                </div>
                            </div>
                            <base-button outline type="default" class="float-right mt-3" v-on:click="finishProcess()">
                                Finalizar
                            </base-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-6">
                    
                </div>
            </div>
        </div>
        <div v-else class="col-lg-5 col-md-7">
            <div class="card bg-secondary shadow border-0">
                <div class="card-body px-lg-5 py-lg-5">
                    <div class="btn-wrapper text-center mb-4">
                        <span class="mb-5"><img style="width:30%" src="img/brand/syswa-isotipo.png"></span> <br><br>
                    </div>
                    <form v-if="loading == false" class="mt-3" role="form">
                        <base-input class="input-group-alternative mt-4 mb-3"
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
                            <base-button type="default" v-on:click="login()" class="my-2">Ingresar</base-button> <br>
                            <a v-on:click="modals.modal2 = true"><dt>¿Has olvidado la contraseña?</dt></a> 
                        </div>
                    </form>
                    <center v-else>
                       <a-spin  class="mx-auto my-5 py-5" /> 
                    </center>
                    
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-6">
                    
                </div>
            </div>
        </div>
        <modal :show.sync="modals.modal2"
               body-classes="p-4"
               modal-classes="modal-dialog-centered modal-md">
            <card type="secondary" shadow
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-5 py-lg-5"
                  class="border-0">
                <template>
                    <div style="margin-top:-15% !important" class="text-muted text-center mb-3">
                       <h3>Confirme su correo</h3> 
                    </div>
                </template>
                <template>
                    <form role="form">
                        <base-input alternative
                            class="mb-3"
                            placeholder="Correo electronico registrado"
                            addon-left-icon="ni ni-single-copy-04"
                            v-model="emailRenew">
                        </base-input>
                        <div class="text-center">
                            <base-button type="primary" v-on:click="SendNewPass">Enviar</base-button>
                        </div>
                    </form>
                </template>
            </card>
        </modal>
        <modal :show.sync="modals.modal"
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
import axios from 'axios'
import router from '../router'
import endPoint from '../../config-endpoint/endpoint.js'
import EventBus from '../components/EventBus'
import jwtDecode from 'jwt-decode'
  export default {
    name: 'login',
    data() {
      return {
            ifStart: false,
            days: {
                monday: 'danger',
                tuesday: 'danger',
                wednesday: 'danger',
                thursday: 'danger',
                friday: 'danger',
                saturday: 'danger',
                sunday: 'danger'
            },
            status: {
                branch: 'process',
                date: 'wait',
                sale: 'wait',
                final: 'wait'
            },
            process: 'branch',
            typePay: '',
            modelStart: {
                email: '',
                password: '',
                first_name: '',
                last_name: '',
                credential: '',
                branch: '',
                businessName: '',
                businessPhoneCode: '',
                businessPhone: '',
                businessType: '',
                businessLocation: '',
                blockHour: [
                    {
                        day: 0,
                        start: '10:00',
                        end: '19:00',
                        status: false,
                        time: 0
                    },
                    {
                        day: 1,
                        start: '10:00',
                        end: '19:00',
                        status: false,
                        time: 0
                    },
                    {
                        day: 2,
                        start: '10:00',
                        end: '19:00',
                        status: false,
                        time: 0
                    },
                    {
                        day: 3,
                        start: '10:00',
                        end: '19:00',
                        status: false,
                        time: 0
                    },
                    {
                        day: 4,
                        start: '10:00',
                        end: '19:00',
                        status: false,
                        time: 0
                    },
                    {
                        day: 5,
                        start: '10:00',
                        end: '19:00',
                        status: false,
                        time: 0
                    },
                    {
                        day: 6,
                        start: '10:00',
                        end: '19:00',
                        status: false,
                        time: 0
                    }
                ],
                currency: 'CLP',
                typesPay: []
            },
            fromArray: [
                '10:00',
                '10:30',
                '11:00',
                '11:30',
                '12:00',
                '12:30',
                '13:00',
                '13:30',
                '14:00',
                '14:30',
                '15:00',
                '15:30',
                '16:00',
                '16:30',
                '17:00',
            ],
            toArray: [
                '10:30',
                '11:00',
                '11:30',
                '12:00',
                '12:30',
                '13:00',
                '13:30',
                '14:00',
                '14:30',
                '15:00',
                '15:30',
                '16:00',
                '16:30',
                '17:00',
                '17:30'
            ],
            model: {
                email: '',
                password: '',
            },
            configHeader: {
                headers:{"x-database-connect": endPoint.database}
            },
            modals: {
                modal: false,
                modal2: false,
                message: "",
                icon: '',
                type:''
            },
            emailRenew: '',
            loading: false
      }
    },
    beforeCreate(){
        localStorage.removeItem('userToken')
        localStorage.removeItem('firstname')
        localStorage.removeItem('lastname')
        localStorage.removeItem('image')
        localStorage.removeItem('email')
        localStorage.removeItem('imageUser')
        localStorage.removeItem('status')
    },
    created(){
        this.getBranches()
    },
    methods: {
        selectCurrency(value){
            this.currency = value
        },
        filterOption(input, option) {
            return (
                option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
            );
        },
        async finishProcess(){
            if (this.modelStart.first_name.length >= 4 && this.modelStart.last_name.length >= 4 && this.modelStart.credential.length == 20 && validEmail() && this.modelStart.password.length > 8) {
                try {
                    const registerBranch = await axios.post(endPoint.endpointTarget+'/branches/createBranchCertificate', {
                        branch: this.modelStart.businessName,
                        secretKey: this.modelStart.credential
                    })
                    if (registerBranch.data.status == 'ok') {
                        try {
                            const registerConf = await axios.post(endPoint.endpointTarget+'/configurations/createConfigCertificate', {
                                branch: registerBranch.data.data._id,
                                secretKey: this.modelStart.credential,
                                blockHour: this.modelStart.blockHour,
                                businessName: this.modelStart.businessName,
                                businessPhone: this.modelStart.businessPhone,
                                businessType: this.modelStart.businessType,
                                businessLocation: this.modelStart.businessLocation,
                                typesPay: this.modelStart.typesPay,
                                currency: this.modelStart.currency
                            })
                            if (registerConf.data.status == 'ok') {
                                const registerUser = await axios.post(endPoint.endpointTarget+'/users/createUserCertificate', {
                                    branch: registerBranch.data.data._id,
                                    secretKey: this.modelStart.credential,
                                    first_name: this.modelStart.first_name,
                                    last_name: this.modelStart.last_name,
                                    email: this.modelStart.email,
                                    password: this.modelStart.password
                                })
                                if (registerUser) {
                                    
                                }
                            }
                        }catch(err){console.log(err)}
                    }
                }catch(err){console.log(err)}
            }else{
                this.$swal({
                    icon: 'error',
                    title: 'Debe llenar los campos correctamente.',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        },
        validEmail(){
            const valid = this.modelStart.email.split('@')
            if(valid.length > 1){
                console.log(valid[1].includes('.'))
                return valid[1].includes('.')
            }else{
                return false
            }
        },
        handleChange(value) {
            this.modelStart.businessType = value
        },
        insertTypePay(){
            if (this.typePay.length > 4) {
                this.modelStart.typesPay.push(this.typePay)
                this.typePay = ''
            }else{
                this.$swal({
                    icon: 'error',
                    title: 'Debe llenar el tipo de pago',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        },
        alertsMessages(message){
            this.$swal({
                icon: 'info',
                title: message,
                showConfirmButton: true,
            })
        },
        removeTypePay(index){
            this.modelStart.typesPay.splice(index, 1)
        },
        salectDay(day){
            if (day == 'monday') {
                this.modelStart.blockHour[1].status = this.days.monday == 'success' ? false : true
                this.days.monday = this.days.monday == 'success' ? 'danger' : 'success'
            }else if (day == 'tuesday') {
                this.modelStart.blockHour[2].status = this.days.tuesday == 'success' ? false : true
                this.days.tuesday = this.days.tuesday == 'success' ? 'danger' : 'success'
            }else if (day == 'wednesday') {
                this.modelStart.blockHour[3].status = this.days.wednesday == 'success' ? false : true
                this.days.wednesday = this.days.wednesday == 'success' ? 'danger' : 'success'
            }else if (day == 'thursday') {
                this.modelStart.blockHour[4].status = this.days.thursday == 'success' ? false : true
                this.days.thursday = this.days.thursday == 'success' ? 'danger' : 'success'
            }else if (day == 'friday') {
                this.modelStart.blockHour[5].status = this.days.friday == 'success' ? false : true
                this.days.friday = this.days.friday == 'success' ? 'danger' : 'success'
            }else if (day == 'saturday') {
                this.modelStart.blockHour[6].status = this.days.saturday == 'success' ? false : true
                this.days.saturday = this.days.saturday == 'success' ? 'danger' : 'success'
            }else if (day == 'sunday') {
                this.modelStart.blockHour[0].status = this.days.sunday == 'success' ? false : true
                this.days.sunday = this.days.sunday == 'success' ? 'danger' : 'success'
            }
        },
        nextStep(step){
            if (step == 'branch') {
                if (this.modelStart.businessName.length >= 4 && this.modelStart.businessPhoneCode.length < 5 && this.modelStart.businessPhone.length >= 6 && this.modelStart.businessLocation.length >= 10 && this.modelStart.businessType != '') {
                    this.status.branch = 'finish'
                    this.status.date = 'process'
                    this.process = 'date'
                }else{
                    this.$swal({
                        icon: 'error',
                        title: 'Llene todos los campos.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            }else if(step == 'date'){
                const findDate = this.modelStart.blockHour.find(status => status.status == true)
                console.log(findDate)
                if (findDate != undefined) {
                    this.status.date = 'finish'
                    this.status.sale = 'process'
                    this.process = 'sale'
                }else{
                    this.$swal({
                        icon: 'error',
                        title: 'Debe seleccionar mínimo un día.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            }else if(step == 'sale'){
                if (this.modelStart.typesPay.length > 0) {
                    this.status.sale = 'finish'
                    this.status.final = 'process'
                    this.process = 'final'
                }else{
                    this.$swal({
                        icon: 'error',
                        title: 'Debe crear mínimo un tipo de pago.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            }else if(step == 'final'){
                this.status.branch = 'finish'
            }
        },
        async getBranches(){
            try {
                const getBranches = await axios.get(endPoint.endpointTarget+'/branches', this.configHeader)
                if (getBranches.data.status == 'bad') {
                    this.ifStart = true  
                }
            }catch(err){console.log(err)}
        },
        login() {
            this.loading = true
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
                    this.loading = false
                }else if(res.data.error == 'User does not exist'){
                    this.$swal({
                        type: 'error',
                        title: 'No esta registrado',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.loading = false
                }else{
                    localStorage.setItem('userToken', res.data.token)
                    this.email = ''
                    this.password = ''
                    const token = localStorage.userToken
                    const decoded = jwtDecode(token)
                    localStorage.setItem('firstname', decoded.first_name)
                    localStorage.setItem('lastname', decoded.last_name)
                    localStorage.setItem('imageUser', decoded.userImage)
                    localStorage.setItem('showNav', true)
                    localStorage.setItem('_id', decoded._id)
                    localStorage.setItem('status', decoded.status)
                    router.push({path: '/Agendamiento'})
                    console.log(decoded.access)
                    this.emitMethod(decoded.status)
                }
            })
            .catch(err =>{
                this.$swal({
                    type: 'error',
                    title: 'Problemas de conexión',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.loading = false
            })
        },
        emitMethod(status) {
            console.log(status)
            EventBus.$emit('loggedin', status)
            localStorage.setItem('logged-in', status)
        },
        SendNewPass(){
            if (this.emailRenew == '') {
                this.modals = {
                    modal: true,
                    message: "Debe llenar el dato de correo",
                    icon: 'ni ni-fat-remove ni-5x',
                    type: 'danger'
                }
                setTimeout(() => {
                    this.modals = {
                        modal:false,
                        modal2:true,
                        message: "",
                        icon: '',
                        type: ''
                    }
                }, 1500);
            }else{
                axios.post(endPoint.endpointTarget+'/users/sendNewPass', {
                    email: this.emailRenew
                }) 
                .then(res => {
                    if (res.data.status == 'ok') {
                        this.modals = {
                            modal: true,
                            message: "Se le envio un correo, con la contraseña provicional",
                            icon: 'ni ni-check-bold ni-5x',
                            type: 'success'
                        }
                        setTimeout(() => {
                            this.modals = {
                                modal: false,
                                modal2: false,
                                message: "",
                                icon: '',
                                type: ''
                            }
                        }, 2500);
                        this.emailRenew = ''
                    }else{
                        this.modals = {
                            modal: true,
                            message: "El correo no esta registrado",
                            icon: 'ni ni-fat-remove ni-5x',
                            type: 'danger'
                        }
                        setTimeout(() => {
                            this.modals = {
                                modal: false,
                                modal2: true,
                                message: "",
                                icon: '',
                                type: ''
                            }
                        }, 2000);
                    }
                })
            }
        }
    }
  }
</script>
<style>
.ant-select-selection{
    border: none !important;
    border-radius: 8px;
    outline: none;
}
.ant-select-selection:focus{
    outline: none;
}
</style>
