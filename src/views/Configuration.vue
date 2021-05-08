<template>
    <div>
        <base-header class="header pb-7 pt-5  d-flex align-items-center"
                     style="min-height: 400px; background-image: url(img/theme/syswa-gestion.png); background-size: cover; background-position: center;">
            <!-- Mask -->
            <span class="mask bg-gradient-success opacity-8"></span>
            <!-- Header container -->
            <div class="container-fluid d-flex align-items-center">
                <div class="row">
                    <div class="col-lg-7 col-md-10">
                        <h1 class="display-2 text-white">Configuración</h1>
                    </div>
                </div>
            </div>
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col-xl-8 order-xl-2 mb-5 mb-xl-0">
                    <div class="card card-profile shadow">
                      <a-config-provider>
                        <template #renderEmpty>
                          <div style="text-align: center">
                            <a-icon type="info-circle" style="font-size: 60px" />
                            <h1>Selecciona una seccion para configurar</h1>
                          </div>
                        </template>
                        <a-list v-if="selectedConfig == ''">
                        </a-list>
                      </a-config-provider>
                      <div v-if="selectedConfig == 'typePay'" class="row p-4">
                          <div class="w-100 mb-3">
                            <h1 class=" text-center w-100 my-2">
                                Tipos de pago
                            </h1>
                            <hr class="w-50 mb-0 mt-0">
                          </div>
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
                              <a-select v-if="selectedConfig == 'typePay'" class="input-group-alternative" :default-value="configData.currency" style="width: 100%" size="large" @change="selectCurrency">
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
                          <a-config-provider>
                              <template  #renderEmpty>
                                  <div style="text-align: center">
                                      <a-icon type="warning" style="font-size: 20px"/>
                                      <p>No se han agregado metodos de pago</p>
                                  </div>
                              </template>
                              <a-tooltip placement="top">
                                  <template slot="title">
                                  <span v-if="configData.typesPay.lenght == 0">Para ingresar un método de pago debes escribirlo en el cuadro de texto y darle click en <b>Ingresar</b> o presionar la tecla <b>Enter</b> </span>
                                  </template>
                                  <div class="col-md-8" >
                                      <a-list bordered :data-source="configData.typesPay">
                                          <a-list-item slot="renderItem" slot-scope="item, index">
                                              {{ item }} 
                                              <base-button outline type="default" v-if="item != 'Efectivo'" size="sm" class="float-right" v-on:click="removeTypePay(index)">
                                                  <i class="fa fa-times"></i>
                                              </base-button>
                                          </a-list-item>
                                      </a-list>
                                  </div>
                              </a-tooltip>
                          </a-config-provider>
                      </div>
                      <div v-if="selectedConfig == 'agend'">
                        <h1 class=" text-center my-2">
                            Configura tu agenda
                        </h1>
                        <hr class="w-50 mb-0 mt-0">
                        <div class="row p-4 pt-0 pl-5">
                          <div class="col-12 row mb-3">
                            <a-switch class="mx-auto" :checked="configData.datesPolitics.onlineDates" @click="changeDatePolitic('onlineDates')" checked-children="Agendamiento online" un-checked-children="Agendamiento online" />
                            <a-switch class="mx-auto" :checked="configData.datesPolitics.editDates" @click="changeDatePolitic('editDates')" checked-children="Permitir editar citas" un-checked-children="Permitir editar citas" />
                            <a-switch class="mx-auto" :checked="configData.datesPolitics.microServices" @click="changeDatePolitic('microServices')" checked-children="Microservicios" un-checked-children="Microservicios" />
                            <a-switch class="mx-auto" :checked="configData.datesPolitics.deleteDates" @click="changeDatePolitic('deleteDates')" checked-children="Permitir eliminar citas" un-checked-children="Permitir eliminar citas" />
                          </div>
                          <div class="col-4">
                              <base-button :type="configData.blockHour[1].status == true ? 'success' : 'danger'" size="sm" class="mt-2 w-100" v-on:click="salectDay('monday')">
                                  Lunes
                              </base-button>
                              <base-button :type="configData.blockHour[2].status == true ? 'success' : 'danger'" size="sm" class="mt-2 w-100" v-on:click="salectDay('tuesday')">
                                  Martes
                              </base-button>
                              <base-button :type="configData.blockHour[3].status == true ? 'success' : 'danger'" size="sm" class="mt-2 w-100" v-on:click="salectDay('wednesday')">
                                  Miércoles
                              </base-button>
                              <base-button :type="configData.blockHour[4].status == true ? 'success' : 'danger'" size="sm" class="mt-2 w-100" v-on:click="salectDay('thursday')">
                                  Jueves
                              </base-button>
                              <base-button :type="configData.blockHour[5].status == true ? 'success' : 'danger'" size="sm" class="mt-2 w-100" v-on:click="salectDay('friday')">
                                  Viernes
                              </base-button>
                              <base-button :type="configData.blockHour[6].status == true ? 'success' : 'danger'" size="sm" class="mt-2 w-100" v-on:click="salectDay('saturday')">
                                  Sábado
                              </base-button>
                              <base-button :type="configData.blockHour[0].status == true ? 'success' : 'danger'" size="sm" class="mt-2 w-100" v-on:click="salectDay('sunday')">
                                  Domingo
                              </base-button>
                          </div>
                          <div class="col-8 row">
                              <a-select :disabled="configData.blockHour[1].status == true ? false : true" @change="updateconfig" style="width:40%" class="mx-auto mt-1 input-group-alternative" placeholder="Desde" v-model="configData.blockHour[1].start">
                                  <a-select-option v-for="i in fromArray" :key="i">
                                      {{i}}
                                  </a-select-option>
                              </a-select>
                              <a-select :disabled="configData.blockHour[1].status == true ? false : true" @change="updateconfig" style="width:40%" class="mx-auto mt-1 input-group-alternative" placeholder="Hasta" v-model="configData.blockHour[1].end">
                                  <a-select-option v-for="i in toArray" :key="i">
                                      {{i}}
                                  </a-select-option>
                              </a-select>

                              <a-select :disabled="configData.blockHour[2].status == true ? false : true" @change="updateconfig" style="width:40%" class="mx-auto mt-1 input-group-alternative" placeholder="Desde" v-model="configData.blockHour[2].start">
                                  <a-select-option v-for="i in fromArray" :key="i">
                                      {{i}}
                                  </a-select-option>
                              </a-select>
                              <a-select :disabled="configData.blockHour[2].status == true ? false : true" @change="updateconfig" style="width:40%" class="mx-auto mt-1 input-group-alternative" placeholder="Hasta" v-model="configData.blockHour[2].end">
                                  <a-select-option v-for="i in toArray" :key="i">
                                      {{i}}
                                  </a-select-option>
                              </a-select>
                              
                              <a-select :disabled="configData.blockHour[3].status == true ? false : true" @change="updateconfig" style="width:40%" class="mx-auto mt-1 input-group-alternative" placeholder="Desde" v-model="configData.blockHour[3].start">
                                  <a-select-option v-for="i in fromArray" :key="i">
                                      {{i}}
                                  </a-select-option>
                              </a-select>
                              <a-select :disabled="configData.blockHour[3].status == true ? false : true" @change="updateconfig" style="width:40%" class="mx-auto mt-1 input-group-alternative" placeholder="Hasta" v-model="configData.blockHour[3].end">
                                  <a-select-option v-for="i in toArray" :key="i">
                                      {{i}}
                                  </a-select-option>
                              </a-select>

                              <a-select :disabled="configData.blockHour[4].status == true ? false : true" @change="updateconfig" style="width:40%" class="mx-auto mt-1 input-group-alternative" placeholder="Desde" v-model="configData.blockHour[4].start">
                                  <a-select-option v-for="i in fromArray" :key="i">
                                      {{i}}
                                  </a-select-option>
                              </a-select>
                              <a-select :disabled="configData.blockHour[4].status == true ? false : true" @change="updateconfig" style="width:40%" class="mx-auto mt-1 input-group-alternative" placeholder="Hasta" v-model="configData.blockHour[4].end">
                                  <a-select-option v-for="i in toArray" :key="i">
                                      {{i}}
                                  </a-select-option>
                              </a-select>

                              <a-select :disabled="configData.blockHour[5].status == true ? false : true" @change="updateconfig" style="width:40%" class="mx-auto mt-1 input-group-alternative" placeholder="Desde" v-model="configData.blockHour[5].start">
                                  <a-select-option v-for="i in fromArray" :key="i">
                                      {{i}}
                                  </a-select-option>
                              </a-select>
                              <a-select :disabled="configData.blockHour[5].status == true ? false : true" @change="updateconfig" style="width:40%" class="mx-auto mt-1 input-group-alternative" placeholder="Hasta" v-model="configData.blockHour[5].end">
                                  <a-select-option v-for="i in toArray" :key="i">
                                      {{i}}
                                  </a-select-option>
                              </a-select>

                              <a-select :disabled="configData.blockHour[6].status == true ? false : true" @change="updateconfig" style="width:40%" class="mx-auto mt-1 input-group-alternative" placeholder="Desde" v-model="configData.blockHour[6].start">
                                  <a-select-option v-for="i in fromArray" :key="i">
                                      {{i}}
                                  </a-select-option>
                              </a-select>
                              <a-select :disabled="configData.blockHour[6].status == true ? false : true" @change="updateconfig" style="width:40%" class="mx-auto mt-1 input-group-alternative" placeholder="Hasta" v-model="configData.blockHour[6].end">
                                  <a-select-option v-for="i in toArray" :key="i">
                                      {{i}}
                                  </a-select-option>
                              </a-select>

                              <a-select :disabled="configData.blockHour[0].status == true ? false : true" @change="updateconfig" style="width:40%" class="mx-auto mt-1 input-group-alternative" placeholder="Desde" v-model="configData.blockHour[0].start">
                                  <a-select-option v-for="i in fromArray" :key="i">
                                      {{i}}
                                  </a-select-option>
                              </a-select>
                              <a-select :disabled="configData.blockHour[0].status == true ? false : true" @change="updateconfig" style="width:40%" class="mx-auto mt-1 input-group-alternative" placeholder="Hasta" v-model="configData.blockHour[0].end">
                                  <a-select-option v-for="i in toArray" :key="i">
                                      {{i}}
                                  </a-select-option>
                              </a-select>
                          </div>
                          <div class="col-12 row mt-4">
                            <div class="col-4">
                              <h4 class="text-center">
                                Recordatorio <br> <small class="text-muted text-center mx-auto">Dias antes para recordar una cita</small>
                              </h4>
                              <a-input-number size="large" class="w-100" :min="1" :max="20" v-model="configData.datesPolitics.reminderDate" v-on:keyup="changeTime" />
                            </div>
                            <div class="col-4">
                              <h4 class="text-center">
                                Limite de reserva <br> <small class="text-muted text-center mx-auto">Horas antes para poder reservar</small>
                              </h4>
                              <a-input-number size="large" class="w-100" :min="1" :max="20" v-model="configData.datesPolitics.minTypeDate" v-on:keyup="changeTime"/>
                            </div>
                            <div class="col-4">
                              <h4 class="text-center">
                                Maximo tiempo de reserva <br> <small class="text-muted text-center mx-auto">Limite de meses futuros para reservar </small>
                              </h4>
                              <a-input-number size="large" class="w-100" :min="1" :max="20" v-model="configData.datesPolitics.limitTimeDate" v-on:keyup="changeTime"/>
                            </div>
                            <div class="col-4">
                              <h4 class="text-center">
                                Limite de edición <br> <small class="text-muted text-center mx-auto">Horas previas para editar una cita</small>
                              </h4>
                              <a-input-number size="large" class="w-100" :min="1" :max="20" v-model="configData.datesPolitics.minEditDate" v-on:keyup="changeTime"/>
                            </div>
                            <div class="col-4">
                              <h4 class="text-center">
                                Cantidad de edición <br> <small class="text-muted text-center mx-auto">Veces que se puede editar una cita</small>
                              </h4>
                              <a-input-number size="large" class="w-100" :min="1" :max="20" v-model="configData.datesPolitics.editQuantity" v-on:keyup="changeTime"/>
                            </div>
                          </div>
                          <div class="col-12 mt-2 mb-0">
                            <p class="text-center mx-auto mb-0">
                              <small class="text-muted">Los valores no pueden ser mayores a 20</small>
                            </p>
                          </div>
                      </div>
                      </div>
                      <div v-if="selectedConfig == 'blackList'" class="row p-3">
                          <div class="w-100 mb-3">
                            <h1 class=" text-center w-100 my-2">
                                Lista negra de clientes
                            </h1>
                            <hr class="w-50 mb-0 mt-0">
                          </div>
                          <div class="col-md-4">
                              <a-select v-if="selectedConfig == 'blackList'" class="input-group-alternative w-100 mb-4 mt-2" default-value="Seleccione un cliente" size="large">
                                  <a-select-option v-for="client of clients" :key="client._id" @click="selectClient(client)" :value="client.firstName + ' ' + client.lastName + ' - ' + client.email">
                                      {{client.firstName + ' ' + client.lastName + ' - ' + client.email}}
                                  </a-select-option>
                              </a-select>
                              <base-button outline type="default" size="sm" class="w-50" v-on:click="insertClient">
                                  Ingresar
                              </base-button>
                          </div>
                          <a-config-provider>
                              <template  #renderEmpty>
                                  <div style="text-align: center">
                                      <a-icon type="warning" style="font-size: 20px"/>
                                      <p>No se han agregado clientes a la lista negra</p>
                                  </div>
                              </template>
                              <a-tooltip placement="top">
                                  <template slot="title">
                                  <span v-if="configData.typesPay.lenght == 0">Para ingresar un cliente a la lista debes seleccionarlo en la izquierda y darle click en <b>Ingresar</b></span>
                                  </template>
                                  <div class="col-md-8" >
                                      <a-list bordered :data-source="configData.blackList">
                                          <a-list-item slot="renderItem" slot-scope="item, index">
                                              {{ item.name + ' - ' + item.email }} 
                                              <base-button outline type="default" size="sm" class="float-right" v-on:click="removeClient(index)">
                                                  <i class="fa fa-times"></i>
                                              </base-button>
                                          </a-list-item>
                                      </a-list>
                                  </div>
                              </a-tooltip>
                          </a-config-provider>
                      </div>
                      <div v-if="selectedConfig == 'information'">
                        <div class="w-100 mb-3">
                          <h1 class=" text-center w-100 my-2">
                              Información de la sucursal
                          </h1>
                          <hr class="w-50 mb-0 mt-0">
                        </div>
                        <div class="row p-4">
                            <div class="col-md-6 col-sm-12">
                                <label class="ml-2" for="credentials">
                                    Nombre de la sucursal
                                </label>
                                <base-input class="input-group-alternative"
                                    placeholder="Nombre de la sucursal"
                                    addon-left-icon="ni ni-shop"
                                    v-model="configData.businessName"
                                    :valid="configData.businessName.length >= 4 ? true : false">
                                </base-input>
                            </div>
                            <div class="col-md-6 col-sm-12 row pr-0">
                                <label class="ml-4 w-100" for="credentials">
                                    Número de contacto
                                </label>
                                <div class="col-3">
                                    <base-input class="input-group-alternative"
                                        placeholder="+56"
                                        v-model="configData.businessPhoneCode"
                                    >
                                    </base-input>
                                </div>
                                <div class="col-9 px-0">
                                    <base-input class="input-group-alternative"
                                        placeholder="Teléfono"
                                        type='number'
                                        addon-left-icon="fa fa-phone"
                                        v-model="configData.businessPhone">
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
                                    v-model="configData.businessLocation"
                                    :valid="configData.businessLocation.length >= 4 ? true : false">
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
                                        :defaultValue="configData.businessType"
                                        :filter-option="filterOption"
                                        @change="handleChange"
                                    >
                                    <a-select-option value="Spa de uñas">
                                        Spa de uñas
                                    </a-select-option>
                                    <a-select-option value="Barberia">
                                        Barberia
                                    </a-select-option>
                                    <a-select-option value="Peluqueria">
                                        Peluquería
                                    </a-select-option>
                                </a-select>
                            </div>
                            <base-button class="mx-auto mt-2" v-on:click="updateconfig" :disabled="configData.businessName.length < 4 && configData.businessPhone != '' && configData.businessPhone != 0 && configData.businessPhone != null && configData.businessLocation != '' ? true : false" outline type="default">Actualizar información</base-button>
                        </div>
                      </div>
                    </div>
                </div>

                <div class="col-xl-2 order-xl-1">
                    <card shadow type="secondary">
                        <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                <h3 class="mb-2 w-100 text-center">Secciones</h3>
                                <base-button class="w-100 mt-2 mx-auto" :outline="selectedConfig == 'typePay' ? false : true" type="primary" v-on:click="fixed('typePay'), getConfiguration()">Tipos de pago</base-button>
                                <base-button class="w-100 mt-2 mx-auto" :outline="selectedConfig == 'agend' ? false : true" type="primary" v-on:click="selectedConfig = 'agend', getConfiguration()">Agendamiento</base-button>
                                <base-button class="w-100 mt-2 mx-auto" :outline="selectedConfig == 'blackList' ? false : true" type="primary" v-on:click="fixed('blackList'), getConfiguration()">Lista negra</base-button>
                                <base-button class="w-100 mt-2 mx-auto" :outline="selectedConfig == 'information' ? false : true" type="primary" v-on:click="selectedConfig = 'information', getConfiguration()">Informacion</base-button>
                                <base-button class="w-100 mt-2 mx-auto" :outline="selectedConfig == 'profiles' ? false : true" type="primary" v-on:click="selectedConfig = 'profiles', getConfiguration()">Perfiles de acceso</base-button>
                            </div>
                        </div>
                    </card>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import router from '../router'
    import endPoint from '../../config-endpoint/endpoint.js'
    import jwtDecode from 'jwt-decode'
    import EventBus from '../components/EventBus'
    import * as moment from 'moment';
    import 'moment/locale/es';
    moment.locale('es');
    export default {
      data() {
        return {
          selectedConfig: '',
          selectedClient: '',
          clients:[],
          configData: {},
          typePay: '',
          validTime: false,
          configHeader: {
            headers:{
              "x-database-connect": endPoint.database, 
              "x-access-token": localStorage.userToken
            }
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
        }
      },
      beforeCreate(){
        if (!localStorage.getItem('userToken')) {
        this.$swal({ 
          type: 'error',
          title: 'URL restringida',
          showConfirmButton: false,
          timer: 1500
        })
          router.push({name: 'login'})
        }
      },
      created(){
        this.getBranch()
        this.getClients()
      },
      methods: {
        getBranch(){
          this.branchName = localStorage.branchName  
          this.branch = localStorage.branch;
          this.getConfiguration()
        },
        async getClients(){
            try {
              const getAllClients = await axios.get(endPoint.endpointTarget+'/clients', this.configHeader)
              if (getAllClients.data.data.length > 0) {
                this.clients = getAllClients.data.data
              }
            }catch (err) {
                console.log(err)
            }
        },
        async getConfiguration() {
          try{
            const getConfig = await axios.get(endPoint.endpointTarget+'/configurations/'+this.branch, this.configHeader)
            if (getConfig.data.status == 'ok') {
              this.configData = getConfig.data.data
              console.log(this.configData)
            }
          }catch(err){
            this.$swal({
              type: 'error',
              icon: 'error',
              title: 'Problemas con el servidor',
              showConfirmButton: false,
              timer: 1500
            })
            console.log(err)
          }
        },
        changeDatePolitic(valid){
          if (valid == 'onlineDates') {
            this.configData.datesPolitics.onlineDates = this.configData.datesPolitics.onlineDates == true ? false : true
          }else if (valid == 'microServices') {
            this.configData.datesPolitics.microServices = this.configData.datesPolitics.microServices == true ? false : true
          }else if (valid == 'editDates') {
            this.configData.datesPolitics.editDates = this.configData.datesPolitics.editDates == true ? false : true
          }else if (valid == 'deleteDates') {
            this.configData.datesPolitics.deleteDates = this.configData.datesPolitics.deleteDates == true ? false : true
          }
          this.updateconfig()
        },
        handleChange(value){
          this.configData.businessType = value
        },
        updateconfig(){
          axios.post(endPoint.endpointTarget+'/configurations/editConfiguration/'+this.configData._id, {
            blockHour: this.configData.blockHour,
            blackList: this.configData.blackList,
            businessName:  this.configData.businessName,
            businessPhone: this.configData.businessPhone,
            businessType: this.configData.businessType,
            businessLocation: this.configData.businessLocation,
            currency:  this.configData.currency,
            typesPay: this.configData.typesPay,
            datesPolitics: this.configData.datesPolitics
          }, this.configHeader)
          .then(res => {
            if (res.data.status == 'ok') {
              this.$swal({
                type: 'success',
                icon: 'success',
                toast: true,
                position: 'top-end',
                title: 'Cambio exitoso',
                showConfirmButton: false,
                timer: 1500
              })
            }
          }).catch(err => {
            this.$swal({
                type: 'error',
                title: 'Problemas tecnicos intente nuevamente',
                showConfirmButton: false,
                timer: 1500
              })
              console.log(err)
          })
        },
        removeTypePay(index){
            this.configData.typesPay.splice(index, 1)
            this.updateconfig()
        },
        removeClient(index){
            this.configData.blackList.splice(index, 1)
            this.updateconfig()
        },
        insertTypePay(){
          var valid = true
            this.configData.typesPay.forEach(element => {
              if (element == this.typePay) {
                this.$swal({
                    icon: 'error',
                    title: 'Este tipo de pago ya se encuentra registrado',
                    showConfirmButton: false,
                    timer: 1500
                })
                valid = false
              }
            });
            if (valid) {
              if (this.typePay.length > 4) {
                  this.configData.typesPay.push(this.typePay)
                  this.typePay = ''
                  this.updateconfig()
              }else if (this.typePay.length <= 4) {
                  this.$swal({
                      icon: 'error',
                      title: 'El método de pago debe estar compuesto por mas de 4 caracteres',
                      showConfirmButton: false,
                      timer: 1500
                  })
              }else{
                  this.$swal({
                      icon: 'error',
                      title: 'Debe llenar el tipo de pago',
                      showConfirmButton: false,
                      timer: 1500
                  })
              }
            }
        },
        selectCurrency(value){
            this.configData.currency = value
            this.updateconfig()
        },
        salectDay(day){
          if (day == 'monday') {
              this.configData.blockHour[1].status = this.configData.blockHour[1].status == true ? false : true
          }else if (day == 'tuesday') {
              this.configData.blockHour[2].status = this.configData.blockHour[2].status == true ? false : true
          }else if (day == 'wednesday') {
              this.configData.blockHour[3].status = this.configData.blockHour[3].status == true ? false : true
          }else if (day == 'thursday') {
              this.configData.blockHour[4].status = this.configData.blockHour[4].status == true ? false : true
          }else if (day == 'friday') {
              this.configData.blockHour[5].status = this.configData.blockHour[5].status == true ? false : true
          }else if (day == 'saturday') {
              this.configData.blockHour[6].status = this.configData.blockHour[6].status == true ? false : true
          }else if (day == 'sunday') {
              this.configData.blockHour[0].status = this.configData.blockHour[0].status == true ? false : true
          }
          this.updateconfig()
        },
        changeTime(){
          if (this.configData.datesPolitics.editQuantity > 20) {
            this.configData.datesPolitics.editQuantity = 20
          }if (this.configData.datesPolitics.reminderDate > 20) {
            this.configData.datesPolitics.reminderDate = 20
          }if (this.configData.datesPolitics.minTypeDate > 20) {
            this.configData.datesPolitics.minTypeDate = 20
          }if (this.configData.datesPolitics.limitTimeDate > 20) {
            this.configData.datesPolitics.limitTimeDate = 20
          }if (this.configData.datesPolitics.minEditDate > 20) {
            this.configData.datesPolitics.minEditDate = 20
          }

          if (this.validTime == false) {
            this.validTime = true
            setTimeout(() => {
              this.updateconfig()
              this.validTime = false
            }, 3000);
          }
        },
        selectClient(value){
          this.selectedClient = value
        },
        insertClient(){
          var valid = true
          this.configData.blackList.forEach(element => {
            if (element.clientId == this.selectedClient._id) {
              this.$swal({
                  icon: 'error',
                  title: 'Este cliente ya se encuentra en la lista negra',
                  showConfirmButton: false,
                  timer: 1500
              })
              valid = false
            }
          });
          if (valid) {
            this.configData.blackList.push({clientId: this.selectedClient._id, name: this.selectedClient.firstName + ' ' + this.selectedClient.lastName, email: this.selectedClient.email})
            this.updateconfig()
          }
          
        },
        fixed(value){
          this.selectedConfig = ''
          setTimeout(() => {
            this.selectedConfig = value
          }, 100);
        }
      }
    };
</script>
<style></style>
