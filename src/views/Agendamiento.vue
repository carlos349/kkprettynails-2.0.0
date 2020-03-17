<template>
    <div>
        <base-header class="header pb-4 pt-2 pt-lg-6 d-flex align-items-center"
            style="min-height: 50px; background-image: url(img/theme/agenda.jpg); background-size: cover; background-position: center top">
            <!-- Mask -->
            <span style="background-color:#172b4d !important" class="mask  opacity-7"></span>
            <!-- Header container -->
            <div class="container-fluid d-flex align-items-center">
                <div class="row">
                    <div class="col-lg-12 col-md-12">
                        <h1 class="display-2 text-white w-100">Sección de Agenda</h1>
                        <p class="text-white mt-0 mb-5">Esta es la sección administrativa de agendamiento, aquí podrás registrar, editar y visualizar tu agenda.</p>
                        <div class="col-12">
                            <div class="row">
                                <a @click="modals.modal1 = true , initialState()"  class="btn mt-1 btn-success text-white cursor-pointer">Agendar</a>
                                <a @click="dateModals.modal4 = true, initialDate(1)"  class="btn mt-1 btn-warning text-white cursor-pointer">Ventas por procesar</a>
                                <base-dropdown class="mt-1 p-0 col-lg-4 col-md-9 col-xs-6 w-100">
                                    <base-button slot="title" type="default" class="dropdown-toggle col-12">
                                            {{employeByDate}}
                                    </base-button>
                                    <li v-on:click="getCitasByEmploye('Todos')">
                                        <base-button class="dropdown-item" href="#">
                                            <img class="avatar avatar-sm rounded-circle float-left" src="https://www.w3schools.com/howto/img_avatar.png" />  <h4 class="mt-2 ml-4 pl-3">Todos</h4>
                                        </base-button>
                                    </li>
                                    <li v-for="data in employeShow"  v-on:click="getCitasByEmploye(data.name,data.img)">
                                        <base-button v-if="data.img == 'no'" class="dropdown-item" href="#">
                                            <img class="avatar avatar-sm rounded-circle float-left" src="https://www.w3schools.com/howto/img_avatar.png" />  <h4 class="mt-2 ml-4 pl-3">{{data.name}}</h4>
                                        </base-button>
                                        <base-button v-else class="dropdown-item" href="#">
                                            <img class="avatar avatar-sm rounded-circle float-left" :src="data.img" />  <h4 class="mt-2 ml-4 pl-3">{{data.name}}</h4>
                                        </base-button>
                                    </li>
                                </base-dropdown>
                                <div v-if="filter == true" class="ml-2">
                                    <img class="avatar rounded-circle" :src="img2" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </base-header>
        <modal :show.sync="modals.modal1"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-xl">
            <card type="secondary" shadow header-classes="bg-white" body-classes="" class="border-0">
                <modal :show.sync="modals.modal2" :gradient="modals.type" modal-classes="modal-danger modal-dialog-centered">
                    <div class="py-3 text-center">
                        <i :class="modals.icon"></i>
                        <h1 class="heading mt-5">{{modals.message}}</h1>
                    </div>
                </modal>
                  <!-- WIZARD -->

                <form-wizard ref="wizard" class="p-0 m-0" :start-index="0" color="#214d88" @on-complete="register" error-color="#f5365c" back-button-text="Regresar" next-button-text="Siguiente" finish-button-text="¡Agendar!">

                    <h2 v-if="registerDate.valid == true" slot="title" v-on:click="maldito()">Datos de agendamiento {{registerDate.date}}</h2>
                    <h2 v-else slot="title" class="text-danger">¡Debe completar los datos!</h2>

                    <tab-content icon="ni ni-bullet-list-67" title="Servicios" :before-change="validateWizardOne">
                        <template>
                            <div class="text-muted text-center p-0">
                                Seleccione los servicios
                            </div>
                        </template>
                        <div class="col-12">
                                <center>
                                    <base-button v-if="registerDate.valid2 == true" disabled type="secondary" class="text-default">
                                        <font-awesome-icon class="mx-auto"  icon="redo-alt" />
                                    </base-button>
                                        <base-button v-else v-on:click="initialState()" type="secondary" class="text-default">
                                        <font-awesome-icon class="mx-auto"  icon="redo-alt" />
                                    </base-button>
                                </center>
                                
                        </div>
                        <vue-custom-scrollbar class="row" style="height:30vh;overflow:hidden;overflow-x: hidden;overflow-y:scroll;">
                            <div v-for="(name, index) in services" class="col-6 pl-1 mt-2">
                                <base-button v-on:click="pushService(name.prestadores,name.nombre,name.tiempo, name.comision, name.precio,name.descuento,index)" class="col-12 "  type="default">
                                    <badge class="float-left text-white" pill type="default">
                                        <i class="fas fa-user-check m-0"></i>{{name.prestadores.length}}
                                        <i class="far fa-clock ml-1"></i> {{name.tiempo}}Min
                                    </badge>
                                    <span class="float-left">{{name.nombre}}</span>
                                    <badge class="text-default float-right" type="white">{{countServices[index].count}}</badge>
                                </base-button>
                            </div>
                        </vue-custom-scrollbar>
                        <div class="row mx-auto mt-2">
                            <h3>¿Se realizara un diseño?</h3> 
                            <base-radio name="si" value="true" inline class="mb-3 ml-5" v-model="registerDate.design">Si</base-radio>
                            <base-radio name="no" value="false" inline class="mb-3 ml-5" v-model="registerDate.design">No</base-radio> 
                        </div>
                    </tab-content>

                    <tab-content icon="ni ni-collection" title="Información" :before-change="validateWizardTwo">
                        <div class="row">
                            <div class="col-6" v-on:keyup.enter="selectClient()" @click="selectClient()">
                               <vue-single-select
                                    v-model="registerDate.client"
                                    :options="clientsNames"
                                    
                                    placeholder="Seleccione un cliente"
                                    class="col-12 mx-auto mt-1"
                                ></vue-single-select> 
                            </div>
                            
                            <div class="col-6 mx-auto">
                                <base-input addon-left-icon="ni ni-calendar-grid-58">
                                    <flat-picker slot-scope="{focus, blur}"
                                                @on-open="focus"
                                                @on-close="blur"
                                                :config="configDatePicker"
                                                class="form-control datepicker"
                                                v-model="registerDate.date"
                                                placeholder="Seleccione una fecha">
                                    </flat-picker>
                                </base-input>
                            </div>
                        </div> 
                        <template>
                            <div class="text-muted text-center">
                                Datos del cliente
                            </div>
                        </template>
                         <div class="row">
                            <div class="col-md-6">
                                <base-input v-on:keyup="validRegister()" placeholder="Nombre del cliente" v-model="dateClient.name" addon-left-icon="ni ni-circle-08"></base-input>
                            </div>
                            <div class="col-md-6">
                                <base-input v-on:keyup="validRegister()" placeholder="Identidad" v-model="dateClient.id" addon-left-icon="ni ni-key-25"></base-input>
                            </div>
                            <div class="col-md-6">
                                <base-input placeholder="Correo" v-model="dateClient.infoOne" addon-left-icon="ni ni-fat-add"></base-input>
                            </div>
                            <div class="col-md-6">
                                <base-input placeholder="Instagram" v-model="dateClient.infoTwo" addon-left-icon="ni ni-fat-add"></base-input>
                            </div>
                            <div class="col-6">
                                <base-checkbox v-model="dateClient.discount" class="mt-2">
                                    Descuento de nuevo cliente
                                </base-checkbox>
                            </div>
                            <div class="col-6">
                                <vue-single-select
                                    v-model="dateClient.recommender"
                                    :options="clientsNames"
                                    placeholder="Recomendador"
                                ></vue-single-select>
                            </div>
                            <div v-if="dateClient.valid" class="col-3">
                                <base-button size="sm" class="col-12 mt-2" type="secondary">
                                    <span>Participación</span>
                                    <badge type="default">{{dateClient.partipation}}</badge>
                                </base-button>
                            </div>
                            <div v-if="dateClient.valid" class="col-3">
                                <base-button size="sm" class="col-12 mt-2" type="secondary">
                                    <span>Recomendaciones</span>
                                    <badge type="default">{{dateClient.recommenders}}</badge>
                                </base-button>
                            </div>
                            <div v-if="dateClient.valid" class="col-3">
                                <base-button size="sm" class="col-12 mt-2" type="secondary">
                                    <span>Ultima atención</span>
                                    <badge type="default">{{formatDate(dateClient.lastDate)}}</badge>
                                </base-button>
                            </div>
                            <div v-if="dateClient.valid" class="col-3">
                                <base-button size="sm" class="col-12 mt-2" type="secondary">
                                    <span>Cliente desde</span>
                                    <badge type="default">{{formatDate(dateClient.date)}}</badge>
                                </base-button>
                            </div>
                            <div class="col-5 mx-auto mt-4">
                                <base-button  type="default" v-on:click="clientEdit" v-if="dateClient.valid && dateClient.valid2" class="col-12" icon="fas fa-edit">Editar cliente</base-button>
                                <base-button  type="default"  v-if="dateClient.valid && dateClient.valid2 != true" disabled class="col-12" icon="fas fa-edit">Editar cliente</base-button>
                                <base-button type="success" disabled v-if="dateClient.valid != true && dateClient.valid2 != true" class="col-12" icon="fas fa-user-plus">Registrar cliente</base-button>
                                <base-button type="success" v-on:click="newClient()" v-if="dateClient.valid != true && dateClient.valid2" class="col-12" icon="fas fa-user-plus">Registrar cliente</base-button>
                            </div>
                            
                        </div>
                    </tab-content>

                    <tab-content icon="fas fa-user-clock" title="Disponibilidad" :before-change="validateWizardThree">
                        <div class="row">
                            <div class="text-muted text-center mt-2 col-4">
                                Seleccione un empleado y disponibilidad
                            </div>
                            <base-dropdown class="col-6 mt-1 p-0">
                                <base-button slot="title" type="default" class="dropdown-toggle col-12">
                                     {{registerDate.employeSelect}}
                                </base-button>
                                <li v-for="data in employeShow" v-if="data.restDay != new Date(registerDate.date).getDay()" v-on:click="selectEmploye(data.name, data.class, data.restTime, data.img)">
                                    <base-button v-if="data.img == 'no'" class="dropdown-item" href="#">
                                        <img class="avatar avatar-sm rounded-circle float-left" src="https://www.w3schools.com/howto/img_avatar.png" />  <h4 class="mt-2 ml-4 pl-3">{{data.name}} {{data.restTime}}</h4>
                                    </base-button>
                                    <base-button v-else class="dropdown-item" href="#">
                                        <img class="avatar avatar-sm rounded-circle float-left" :src="data.img" />  <h4 class="mt-2 ml-4 pl-3">{{data.name}}</h4>
                                    </base-button>
                                </li>
                            </base-dropdown>
                            <div class="col-2">
                                <img v-if="img1 != ''" class="avatar rounded-circle" :src="img1" />
                            </div>
                        </div>
                        <div class="text-muted text-center mt-1">
                                Horario disponible
                            </div>
                        <vue-custom-scrollbar style="height:30vh;overflow:hidden;overflow-x: hidden;overflow-y:scroll;">
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
                                    <span>No disponible</span>
                                </base-button>
                            </div>
                        </vue-custom-scrollbar>
                    </tab-content>
                    <tab-content icon="ni ni-check-bold" title="Finalizar">
                        <div class="row">
                            <div class="col-6" >
                                <dt>Servicios</dt>
                                <vue-custom-scrollbar class="col-12" style="height:30vh;overflow:hidden;overflow-x: hidden;overflow-y:scroll;">
                                    <base-button v-for="data in registerDate.servicesShow" class="col-10 mt-1" type="secondary">
                                        <span class="float-left">{{data}}</span>
                                        <badge class="text-default float-right" type="success">4</badge>
                                    </base-button>
                                </vue-custom-scrollbar>
                            </div>
                            <div class="col-6">
                                <dt>Información de agenda</dt>
                                <base-button class="col-10 mt-1" type="secondary">
                                    <span class="float-left"> Cliente: </span>
                                    <badge style="font-size:0.8em !important" type="success" class="text-default float-left">{{dateClient.name}}</badge>
                                </base-button>
                                <base-button class="col-10 mt-1" type="secondary">
                                    <span class="float-left"> Identidad: </span>
                                    <badge style="font-size:0.8em !important" type="success" class="text-default float-left">{{dateClient.id}}</badge>
                                </base-button>
                                <base-button class="col-10 mt-1" type="secondary">
                                    <span class="float-left"> Empleado: </span>
                                    <badge style="font-size:0.8em !important" type="success" class="text-default float-left">{{registerDate.employeSelect}}</badge>
                                </base-button>
                                <base-button class="col-10 mt-1" type="secondary">
                                    <span class="float-left"> Fecha: </span>
                                    <badge style="font-size:0.8em !important" type="success" class="text-default float-left">{{registerDate.date}}</badge>
                                </base-button>
                                <base-button class="col-10 mt-1" type="secondary">
                                    <span class="float-left"> Hora de inicio: </span>
                                    <badge style="font-size:0.8em !important" type="success" class="text-default float-left">{{registerDate.start}}</badge>
                                </base-button>
                                <base-button class="col-10 mt-1" type="secondary">
                                    <span class="float-left"> Hora de salida: </span>
                                    <badge style="font-size:0.8em !important" type="success" class="text-default float-left">{{registerDate.end}}</badge>
                                </base-button>
                            </div>
                        </div>
                    </tab-content>
                </form-wizard>

                <!-- END WIZARD -->

            </card>
        </modal>
        <vue-cal
            class=""
            :locale="locale"
            :events="events"
            :time-from="600 "
            :time-to="1275"
            :timeStep="15"
            default-view="month"
            :disable-views="['years', 'year', 'week']" 
            events-count-on-month-view
            :on-event-click="onEventClick"
            :overlapsPerTimeStep="true">
        </vue-cal>
        <modal :show.sync="dateModals.modal1"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-md">
            <h5 slot="header" class="modal-title" id="modal-title-notification">{{dateSplit(selectedEvent.start)}}</h5>   
            <card type="secondary" shadow
                  header-classes="bg-white"
                  body-classes=""
                  class="border-0 pt-0">
                <div class="text-center">
                    <base-button type="primary" style="margin-top:-10%;margin-bottom:5%" :class="selectedEvent.class">{{selectedEvent.title}}</base-button>
                </div>
                <tabs fill class="flex-column flex-md-row">
                    <card shadow>
                        <tab-pane>
                            <span slot="title">
                                <i class="ni ni-collection"></i>
                                Basicos
                            </span>
                            <dt class="text-center">Detalles de la cita</dt>
                            <base-button class="mt-2 col-12" size="sm" type="secondary">
                                <span >Cliente:</span>
                                <badge style="font-size:0.8em !important" class="text-default" type="success">{{formatName(selectedEvent.cliente)}}</badge>
                            </base-button>
                            <base-button class="mt-1 col-12" size="sm" type="secondary">
                                <span >Contacto:</span>
                                <badge style="font-size:0.8em !important" class="text-default" type="success">{{formatContact(selectedEvent.cliente)}}</badge>
                            </base-button>
                            <base-button class="mt-1 col-12" size="sm" type="secondary">
                                <span >Empleado(s):</span>
                                <badge style="font-size:0.8em !important" class="text-default" type="success">{{formatName(selectedEvent.empleada)}}</badge>
                            </base-button>
                            <base-button class="mt-1 col-12" size="sm" type="secondary">
                                <span >Entrada:</span>
                                <badge style="font-size:0.8em !important" class="text-default" type="success">{{dateSplitHours(selectedEvent.start)}}</badge>
                                <span >Salida:</span>
                                <badge style="font-size:0.8em !important" class="text-default" type="success">{{dateSplitHours(selectedEvent.end)}}</badge>
                            </base-button>
                            <dt class="mt-3 text-center">Servicios</dt>
                            <badge v-for="service of selectedEvent.services" class="mt-1 ml-1 text-default" type="primary">{{service.servicio}}</badge>
                        </tab-pane>
                        <tab-pane>
                            <span class="text-default" slot="title">
                                <i class="ni ni-chart-bar-32"></i>
                                Avazandos
                            </span>
                            <div class="row">
                                <div v-on:click="dataEdit(selectedEvent.id, selectedEvent.start, selectedEvent.end, selectedEvent.services, selectedEvent.cliente, selectedEvent.empleada, selectedEvent.class)" class="col-6 mt-2">
                                   <base-button icon="fa fa-edit" class="mx-auto col-12" type="default">Editar</base-button> 
                                </div>
                                <div v-if="selectedEvent.process == true && status == 1 || selectedEvent.process == true && status == 2" v-on:click="endDate(selectedEvent.id, selectedEvent.cliente, selectedEvent.empleada, selectedEvent.services)" class="col-6 mt-2">
                                   <base-button icon="fa fa-check-square" class="mx-auto col-12" type="default">Finalizar</base-button> 
                                </div>
                                <div v-if="selectedEvent.process == true && status == 1 || selectedEvent.process == true && status == 2" v-on:click="closeDate(selectedEvent.id)" class="col-6 mt-2">
                                   <base-button icon="fa fa-times" class=" col-12 mx-auto" type="danger">Cerrar</base-button> 
                                </div>
                                <div v-on:click="deleteDate(selectedEvent.id)" class="col-6 mt-2">
                                   <base-button icon="fa fa-trash-alt" class=" col-12 mx-auto" type="danger">Borrar</base-button> 
                                </div>
                                <div v-if="selectedEvent.process == true && status == 1 || selectedEvent.process == true && status == 2" class="col-12 text-center mt-2">
                                   <base-button icon="fa fa-calendar-check" class=" col-12 mx-auto" type="success" v-on:click="processDate(selectedEvent.id, 'process')">Procesar</base-button> 
                                </div>
                            </div>
                            
                            <dt class="mt-4 text-center">Histórico de cliente </dt>
                            <vue-custom-scrollbar class="maxHeightHistorical">
                                <table class="table table-light table-borderless table-striped ">
                                    <thead >
                                        <tr>
                                            <th>
                                                Fecha
                                            </th>
                                            <th>
                                                Servicios
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="text-left" v-for="historical of dateData.history">
                                            <td class="text-left">
                                                {{formatDate(historical.fecha)}}
                                            </td>
                                            <td>
                                                <p v-for="(servicios, index) of historical.servicios"  style="margin-bottom:-6px;">
                                                    <strong >{{(index + 1)+ ') ' +servicios.servicio}} </strong>
                                                </p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </vue-custom-scrollbar>
                        </tab-pane>
                    </card>
                </tabs>
            </card>
        </modal>
        <modal :show.sync="dateModals.modal2"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-md">
            <card type="secondary" shadow
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-5 py-lg-5"
                  class="border-0">
                <div class="text-center">
                    <base-button type="primary" style="margin-top:-10%;margin-bottom:5%" :class="selectedEvent.class">{{selectedEvent.title}} <br> <i class="fa fa-clock"></i> {{dateData.startEdit}} / {{dateData.endEdit}}</base-button>
                </div>
                <div class="col-12" v-on:keyup.enter="selectClient()" @click="selectClient()">
                    <vue-single-select
                        v-model="dateData.clientEdit"
                        :options="clientsNames"
                        placeholder="Seleccione un cliente"
                        class="mx-auto mt-1"
                    ></vue-single-select> 
                </div>
                <dd v-if="dateData.fechaEditPick == ''" class="text-danger text-center">Fecha caducada</dd>
                <div class="col-12 mx-auto">
                    <base-input addon-left-icon="ni ni-calendar-grid-58">
                        <flat-picker  slot-scope="{focus, blur}"
                                    @on-open="focus"
                                    @on-close="blur"
                                    :config="configDatePicker"
                                    class="form-control datepicker"
                                    v-model="dateData.fechaEditPick"
                                    placeholder="Seleccione una fecha">
                        </flat-picker>
                    </base-input>
                </div>
               
                <base-dropdown class="col-12 mt-1 mb-2 p-0">
                    <base-button slot="title" type="default" class="dropdown-toggle col-12">
                            {{dateData.lenderEdit}}
                    </base-button>
                    <li v-for="data in employeShow" v-if="data.restDay != new Date(registerDate.date).getDay()" v-on:click="selectEmployeEdit(data.name)">
                        <base-button v-if="data.img == 'no'" class="dropdown-item" href="#">
                            <img class="avatar avatar-sm rounded-circle float-left" src="https://www.w3schools.com/howto/img_avatar.png" />  <h4 class="mt-2 ml-4 pl-3">{{data.name}}</h4>
                        </base-button>
                        <base-button v-else class="dropdown-item" href="#">
                            <img class="avatar avatar-sm rounded-circle float-left" :src="data.img" />  <h4 class="mt-2 ml-4 pl-3">{{data.name}}</h4>
                        </base-button>
                    </li>
                </base-dropdown>
                <vue-custom-scrollbar style="height:25vh;overflow:hidden;overflow-x: hidden;overflow-y:scroll;">
                    <div class="col-12" v-for="(block , index) of blockHourEdit">
                        <base-button v-if="block.validator == true" v-on:click="selectBloqEdit(block.Horario, index)" size="sm" class="col-12" type="success">
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
                            <span>No disponible</span>
                        </base-button>
                    </div>
                </vue-custom-scrollbar>
                <div class="text-center">
                    <base-button v-on:click="editDate()" class="mt-3" type="default">Editar</base-button>
                </div>
            </card>
        </modal>
        <modal :show.sync="dateModals.modal3"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-md">
            <h5 slot="header" class="modal-title" id="modal-title-notification">Finalizar cita - {{dateSplit(selectedEvent.start)}}</h5>
            <card type="secondary" shadow
                  header-classes="bg-white pb-5"
                  body-classes=""
                  class="border-0">
                <currency-input
                title="Monto de diseño"
                v-model="designEndDate"
                placeholder="Monto de diseño"
                locale="de"
                class="form-control mb-3"
                />
                <table class="table" v-bind:style="{ 'background-color': '#6BB2E5', 'border-radius' : '15px', 'border':'none !important'}" >
                    <thead>
                        <tr>
                        <th style="border-radius:15px !important;border:none" class="text-left pl-4 text-white">
                            
                            <input autocomplete="off" style="outline:none !important;background-color:white !important" type="text" id="myInputDate" v-on:keyup="myFunctionDate()" class="form-control buscar inputsVenta w-75 text-white" placeholder="Filtrar servicios"/>
                        </th>
                        <th style="color:white;border:none" class="text-center pl-5 pb-3">
                            Precio 
                        </th>
                        </tr>
                    </thead>
                </table>
                <vue-custom-scrollbar class="ListaProcesar">
                    <table class="table tableBg" id="myTableDate">
                        <tbody>
                        <tr v-for="(servicio, index) in services" >
                            <td style="border:none" v-if="servicio.active" class="font-weight-bold">
                            <button type="button" class="w-75 btn procesar text-left" v-on:click="conteoServicioDate(servicio._id,servicio.nombre, servicio.precio, servicio.comision, servicio.descuento, index)">
                                {{servicio.nombre}} <span class="badge badge-light conteoServ mt-1 float-right" :class="servicio._id" v-bind:id="index+servicio._id">0</span>
                            </button>
                            <button type="button" class="w-20 btn btn-back  text-left" >
                                <font-awesome-icon icon="times"/>
                            </button>
                            
                            </td>
                            <td style="border:none" v-if="servicio.active" class=" font-weight-bold  text-center">
                            $ {{formatPrice(servicio.precio)}}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </vue-custom-scrollbar>
                <div class="text-center">
                    <base-button v-on:click="endingDate()" class="mt-3" type="default">Finalizar</base-button>
                </div>
            </card>
        </modal>
        <modal :show.sync="dateModals.modal4"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-xl">
            <h5 slot="header" class="modal-title" id="modal-title-notification">Pendiente por procesar</h5>
            <card type="secondary" shadow
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-5 py-lg-5"
                  class="border-0">
                <vue-custom-scrollbar class="listDatesEnd maxHeightEdit w-100">
                    <vue-bootstrap4-table :rows="closedDates" :columns="columnsDatesClosed" :classes="classes" :config="configDatesClosed" v-on:on-select-row="selected" v-on:on-all-select-rows="selectedAll" v-on:on-unselect-row="unSelected" v-on:on-all-unselect-rows="unSelectedAll" >
                        <template slot="format-date" slot-scope="props">
                            {{formatDate(props.row.date)}}
                        </template>
                        <template slot="format-total" slot-scope="props">
                            {{formatPrice(props.row.total)}}
                        </template>
                    </vue-bootstrap4-table> 
                    <!-- pressDate -->
                </vue-custom-scrollbar>
                <div class="text-center mt-2">
                    <base-button icon="fa fa-calendar-check" v-on:click="ProccessSelectedDates()" class="col-4 mx-auto" type="success">Procesar</base-button> 
                </div>
            </card>
        </modal>
        <modal :show.sync="dateModals.modal5"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-lg">
            <h5 slot="header" class="modal-title" id="modal-title-notification">Pendiente por procesar por procesar</h5>
            <card type="secondary" shadow
                  header-classes="bg-white pb-5"
                  body-classes=""
                  class="border-0">
                <div class="row">
                    <div class="col-6 text-center">
                        <dt>Clientes</dt>
                        <base-button v-for="client of selectedDates.clientSplit" size="sm" type="secondary">{{client}}</base-button>
                    </div>
                    <div class="col-6 text-center">
                        <dt>Empleado</dt>
                        <base-button v-for="employe of selectedDates.discountSplit" size="sm" type="secondary">{{employe}}</base-button>
                    </div>
                    <div class="col-12">
                        <dt class="mt-3 text-center">Servicios</dt>
                        <badge v-for="servicesClosedDate of selectedDates.services" class="mt-1 ml-1 text-default" type="primary">{{servicesClosedDate.servicio}}</badge>
                    </div>
                    <div class="col-6 mt-2">
                        <base-button type="secondary" class="col-12">
                            <span class="float-left">Total</span>
                            <badge style="font-size:1em !important" class="text-default float-right"  type="success">{{this.formatPrice(selectedDates.total)}} $</badge>
                        </base-button>
                    </div>
                    <div class="col-6 mt-2">
                        <base-button type="secondary" class="col-12">
                            <span class="float-left">Diseño</span>
                            <badge style="font-size:1em !important" class="text-default float-right"  type="success">{{this.formatPrice(selectedDates.design)}} $</badge>
                        </base-button>
                    </div>
                </div>
                <div class="text-muted text-center mb-1 mt-2">
                    Medios de pago
                </div>
                <div class="row">
                    <div class="col-4">
                        <div class="input-group mb-2">
                            <div title="Efectivo" v-on:click="hundredPorcent('efectivo')" v-on:mouseenter="hundredMouseOver('efectivo')" v-on:mouseleave="hundredMouseNonOver('efectivo')" class="input-group-prepend text-center w-25 hundred">
                                <span class="inputsVenta w-100 input-group-text" id="inputGroup-sizing-lg">
                                    <b class="efectivo" style="font-size:0.6em;display:none">100%</b>
                                <font-awesome-icon  class="efectivo" style="font-size:1em; color:#6BB2E5" icon="money-bill-wave"/>	
                                </span>
                                
                            </div>
                            <currency-input
                                v-model="payCash"
                                locale="de"
                                placeholder="Efectivo"
                                class="form-control"
                            />
                        </div>
                    </div>
                    <div class="col-4">
                        <div title="Transferencia" class="input-group mb-2">
                            <div  v-on:click="hundredPorcent('trasnferencia')" v-on:mouseenter="hundredMouseOver('trasnferencia')" v-on:mouseleave="hundredMouseNonOver('trasnferencia')" class="input-group-prepend text-center w-25 hundred">
                                <span class="inputsVenta w-100 input-group-text" id="inputGroup-sizing-lg">
                                    <b class="trasnferencia" style="font-size:0.6em;display:none">100%</b>
                                <font-awesome-icon  class="trasnferencia" style="font-size:1em; color:#6BB2E5" icon="money-check-alt"/>	
                                </span>
                            </div>
                            <currency-input
                                v-model="payTransfer"
                                locale="de"
                                placeholder="Transferencia"
                                class="form-control"
                            />
                        </div>
                    </div>
                    <div class="col-4">
                        <div title="Otros" class="input-group mb-2">
                            <div v-on:click="hundredPorcent('others')" v-on:mouseenter="hundredMouseOver('others')" v-on:mouseleave="hundredMouseNonOver('others')" class="input-group-prepend text-center w-25 hundred">
                                <span class="inputsVenta w-100 input-group-text" id="inputGroup-sizing-lg">
                                    <b class="others" style="font-size:0.6em;display:none">100%</b>
                                <font-awesome-icon  class="others" style="font-size:1em; color:#6BB2E5" icon="hand-holding-usd"/>	
                                </span>
                            </div>
                            <currency-input
                                v-model="payOthers"
                                locale="de"
                                placeholder="Otros"
                                class="form-control"
                            />
                        </div>
                    </div>
                    <div title="Débito" class="col-6">
                        <div class="input-group mb-2">
                            <div v-on:click="hundredPorcent('debit')" v-on:mouseenter="hundredMouseOver('debit')" v-on:mouseleave="hundredMouseNonOver('debit')" class="input-group-prepend text-center w-25 hundred">
                                <span class="inputsVenta w-100 input-group-text" id="inputGroup-sizing-lg">
                                    <b class="debit" style="font-size:0.6em;display:none">100%</b>
                                    <img style="width:98%;padding-left:1px" class="debit"  src="../assets/trans1.png" alt="">	
                                </span>
                            </div>
                            <currency-input
                                v-model="payDebit"
                                locale="de"
                                placeholder="Débito"
                                class="form-control"
                            />
                        </div>
                    </div>
                    <div title="Crédito" class="col-6">
                        <div class="input-group mb-2">
                            <div v-on:click="hundredPorcent('credit')" v-on:mouseenter="hundredMouseOver('credit')" v-on:mouseleave="hundredMouseNonOver('credit')" class="input-group-prepend text-center w-25 hundred">
                                <span class="inputsVenta w-100 input-group-text" id="inputGroup-sizing-lg">
                                    <b class="credit" style="font-size:0.6em;display:none">100%</b>
                                    <img class="credit" style="width:98%;padding-left:1px"  src="../assets/trans1.png" alt="">	
                                </span>
                            </div>
                            <currency-input
                                v-model="payCredit"
                                locale="de"
                                placeholder="Crédito"
                                class="form-control"
                            />
                        </div>
                    </div>
                </div>
                <div class="text-center mt-2">
                    <base-button icon="fa fa-calendar-check" v-on:click="processSelected" class="col-4 mx-auto" type="success">Procesar</base-button> 
                </div>
            </card>
        </modal>    
    </div>
</template>
<script>
  // COMPONENTS
    import VueCal from 'vue-cal'
  import 'vue-cal/dist/vuecal.css'
  import 'vue-cal/dist/i18n/es.js'
  import VueBootstrap4Table from 'vue-bootstrap4-table'
  import flatPicker from "vue-flatpickr-component";
  import "flatpickr/dist/flatpickr.css";
  import {Spanish} from 'flatpickr/dist/l10n/es.js';
  import vueCustomScrollbar from 'vue-custom-scrollbar'
  import EventBus from '../components/EventBus'
  //Back - End 
  import axios from 'axios'
  import endPoint from '../../config-endpoint/endpoint.js'
  import router from '../router'

  class Event {
    constructor (start, end, title, content) {
      this.start = start
      this.end = end
      this.title = title
      this.content = content
    }
  }

  class Manicurista{
  	constructor(nombre, documento, porcentaje, comision) {
  		this.nombre = nombre;
  		this.documento = documento;
  		this.porcentaje = porcentaje;
  		this.comision = comision;
  	}
  }

  class Servicio{
		constructor(nombre, precio) {
			this.nombre = nombre;
			this.precio = precio;
		}
    }
    
  export default {
    components: {
     VueCal,
     VueBootstrap4Table,
     flatPicker,
     vueCustomScrollbar
    },
    data() {
      return {
        status: localStorage.getItem('status'),
        countServices:[],
        employes:[],
        blockHour:[],
        blockHourEdit:[],
        registerDate: {
        services:[],
        servicesShow:[],
        employePerService:[],
        employe:[],
        employeSelect:"Seleccione un empleado",
        employeClass:null,
        employeResTime:null,
        client:null,
        duration:0,
        design:null,
        block:null,
        start:null,
        end:null,
        sort:null,
        date:null,
        valid:true,
        valid2:true,
        valid3:false
        },
        columnsDatesClosed: [{
                label: "Fecha",
                name: "date",
                slot_name: "format-date",
                sort: true,
            },
            {
                label: "Cliente",
                name: "client",
                sort: false,
            },
            {
                label: "Prestador",
                name: "employe",
                sort: false,
            },
            {
                label: "Total",
                name: "total",
                slot_name: "format-total",
            },
        ],
        configDatesClosed: {
            card_title: "Tabla de finalizadas",
            checkbox_rows: true,
            rows_selectable : true,
            highlight_row_hover_color:"rgba(238, 238, 238, 0.623)",
            rows_selectable: true,
            per_page_options: [5, 10, 20, 30, 40, 50, 80, 100],
            show_refresh_button: false,
            show_reset_button: false,  
            selected_rows_info: false,
            preservePageOnDataChange : true,
            pagination_info : false,
            pagination: false,
            global_search: {
                placeholder: "Busque el prestador",
                visibility: false,
                case_sensitive: false,
                showClearButton: true,
                searchOnPressEnter: false,
                searchDebounceRate: 200,                      
            },
        },
        classes: {
            table: "table-bordered table-striped"
        },
        dateClient: {
        name:'',
        id:'',
        infoOne:null,
        infoTwo:null,
        partipation:null,
        recommender:null,
        recommenders:null,
        lastDate:null,
        discount:null,
        date:null,
        _id:null,
        valid:false,
        valid2:false
        },
        configDatePicker: {
        allowInput: true,
        dateFormat: 'm-d-Y',
        locale: Spanish, // locale for this instance only
        minDate: new Date(),         
        },
        dateData: {
        history:[],
        discount:false,
        clientEdit: null,
        fechaEdit: null,
        startEdit: null,
        endEdit: null,
        lenderEdit: null,
        classFinalEdit: null,
        duracionEdit: null,
        dateEditId: null,
        resTimeFinalEdit:null,
        fechaEditPick:null
        },
        selectedDates:{
            client:'',
            closedArray:[],
            services:[],
            clientSplit:'',
            employes:'',
            design:0,
            comision:0,
            totaLocal:0,
            total:0,
            discount:0,
            discountSplit:[],
            employeDiscount:[],
            endDatesId:[],
            clientIds:[]
        },
        employeByDate: 'Filtrar por empleado', 
        clients:[],
        closedDates:[],
        employeShow:[],
        services:[],
        locale: 'es',
        filter: false,
        events: [],
        lender:'',
        users:[],
        img1:'',
        img2:'',
        design:'',
        selectedEvent:[],
        payCash:0,
        payTransfer:0,
        payOthers:0,
        payDebit:0,
        payCredit:0,
        servicesFinish:[],
        modals: {
        modal1:false,
        modal2: false,
        message: "",
        icon: '',
        type:''
        },
        dateModals: {
            modal1:false,
            modal2:false,
            modal3:false,
            modal4:false,
            modal5:false
        },
        radio: {
        radio1: "radio1",
        radio2: "radio3"
        },
        endId:'',
        endServices:[],
        endClient: '',
        endEmploye: '',
        endId:'',
        serviciosSelecionadosDates:[],
        endClient:[],
        endEmploye:[],
        designEndDate:0,
        clientsNames:[]
      };
    },
    beforeCreate(){
        if (!localStorage.getItem('userToken') && localStorage.getItem('status') != 1) {
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
        console.log(this.status)
        this.getClients()
        this.getServices()
        this.getUsers()
        this.getDates()
        this.getClosed()
    },
    methods: {
        getDates() {
            if (this.lender != '') {
            this.events = []
            axios.get(endPoint.endpointTarget+'/citas/' + this.lender)
            .then(res => {
                console.log(res.data)
                for (let index = 0; index < res.data.length; index++) {
                    let dateNow = new Date(res.data[index].date)
                    let formatDate = ''
                    let formatDateTwo = ''
                    if (dateNow.getMonth() == 9 || dateNow.getMonth() == 10 || dateNow.getMonth() == 11) {
                        if (dateNow.getDate() < 10) {
                        formatDate = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-0"+dateNow.getDate()+" "+res.data[index].start
                        formatDateTwo = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-0"+dateNow.getDate()+" "+res.data[index].end
                        }else{
                        formatDate = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()+" "+res.data[index].start
                        formatDateTwo = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()+" "+res.data[index].end
                        }
                        
                    }else{
                        if (dateNow.getDate() < 10) {
                        formatDate = dateNow.getFullYear() +"-0"+(dateNow.getMonth() + 1)+"-0"+dateNow.getDate()+" "+res.data[index].start
                        formatDateTwo = dateNow.getFullYear() +"-0"+(dateNow.getMonth() + 1)+"-0"+dateNow.getDate()+" "+res.data[index].end
                        }else{
                        formatDate = dateNow.getFullYear() +"-0"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()+" "+res.data[index].start
                        formatDateTwo = dateNow.getFullYear() +"-0"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()+" "+res.data[index].end
                        }  
                    }
                    let arrayEvents = {
                        start: formatDate,
                        end: formatDateTwo,
                        title: res.data[index].services[0].servicio+" - "+res.data[index].employe,
                        content: res.data[index].client,
                        class: res.data[index].class,
                        cliente: res.data[index].client,
                        services: res.data[index].services,
                        empleada: res.data[index].employe,
                        id:res.data[index]._id,
                        process: res.data[index].process
                    }
                }
            })
            }else{
            this.events = []
            axios.get(endPoint.endpointTarget+'/citas')
            .then(res => {
                for (let index = 0; index < res.data.length; index++) {
                let dateNow = new Date(res.data[index].date)
                let formatDate = ''
                let formatDateTwo = ''
                if (dateNow.getMonth() == 9 || dateNow.getMonth() == 10 || dateNow.getMonth() == 11) {
                    if (dateNow.getDate() < 10) {
                    formatDate = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-0"+dateNow.getDate()+" "+res.data[index].start
                    formatDateTwo = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-0"+dateNow.getDate()+" "+res.data[index].end
                    }else{
                    formatDate = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()+" "+res.data[index].start
                    formatDateTwo = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()+" "+res.data[index].end
                    }
                    
                }else{
                    if (dateNow.getDate() < 10) {
                    formatDate = dateNow.getFullYear() +"-0"+(dateNow.getMonth() + 1)+"-0"+dateNow.getDate()+" "+res.data[index].start
                    formatDateTwo = dateNow.getFullYear() +"-0"+(dateNow.getMonth() + 1)+"-0"+dateNow.getDate()+" "+res.data[index].end
                    }else{
                    formatDate = dateNow.getFullYear() +"-0"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()+" "+res.data[index].start
                    formatDateTwo = dateNow.getFullYear() +"-0"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()+" "+res.data[index].end
                    }  
                }
                let arrayEvents = {
                    start: formatDate,
                    end: formatDateTwo,
                    title: res.data[index].services[0].servicio+" - "+res.data[index].employe,
                    content: res.data[index].client,
                    class:res.data[index].class,
                    cliente: res.data[index].client,
                    services: res.data[index].services,
                    empleada: res.data[index].employe,
                    id:res.data[index]._id,
                    process: res.data[index].process
                }
                
                this.events.push(arrayEvents)
                }
            })
            }
            
        },
        getClosed() {
            axios.get(endPoint.endpointTarget+'/citas/endingdates')
            .then( res => {
            this.closedDates = res.data
            })
        },
        getEmployes(){
  			axios.get(endPoint.endpointTarget+'/manicuristas')
  			.then(res => {
                this.employes = res.data
                var insp = false
                for (let index = 0; index < this.employes.length; index++) {
                    for (let i = 0; i < this.users.length; i++) {
                        if (this.employes[index].nombre + "/" + this.employes[index].documento == this.users[i].linkLender) {
                            this.employeShow.push({name:this.employes[index].nombre,img:endPoint.imgEndpoint+this.users[i].userImage,restDay:this.employes[index].restDay, restTime:this.employes[index].restTime,class:this.employes[index].class})
                            insp = false
                            break
                        }
                        else {
                            insp = true
                        }
                        
                    }
                    if (insp == true) {
                        this.employeShow.push({name:this.employes[index].nombre,img:'no',restDay:this.employes[index].restDay, restTime:this.employes[index].restTime,class:this.employes[index].class})
                    }
                }
                
  			})
  		},
        getServices() {
            axios.get(endPoint.endpointTarget+'/servicios')
            .then(res => {
                this.services = res.data
                for (let index = 0; index < this.services.length; index++) {
                    this.countServices.push({count:0})
                    
                }
                
            })
        },
        getClients(){
            axios.get(endPoint.endpointTarget+'/clients')
            .then(res => {
				
                this.clients = res.data
                for (let index = 0; index < res.data.length; index++) {
                    this.clientsNames.push(res.data[index].nombre + " / " + res.data[index].identidad)
                    
                }
            })
        },
        clientEdit(){
			const name = this.dateClient.name.split(' ')
			var firstName, lastName, fullName
			if (name[1]) {
				firstName = this.MaysPrimera(name[0])
				lastName = this.MaysPrimera(name[1])
				fullName = firstName+' '+lastName
			}else{
				fullName = this.MaysPrimera(name[0])
			}

			if (this.dateClient.name != '' &&  this.dateClient.id != '') {
				axios.put(endPoint.endpointTarget+'/clients/'+this.dateClient._id, {
					nombreClienteEditar: fullName,
					identidadClienteEditar: this.dateClient.id,
					correoClienteEditar: this.dateClient.infoOne,
					instagramClienteEditar: this.dateClient.infoTwo
				})
				.then(res => {
					
					if (res.data.status == 'Servicio actualizado') {
						this.modals = {
                            modal1:true,
                            modal2: true,
                            message: "¡Emplado editado con exito!",
                            icon: 'ni ni-check-bold ni-5x',
                            type: 'success'
                        }
                        setTimeout(() => {
                            this.getClients();
                            this.registerDate.client = fullName + " / " + this.dateClient.id
                            this.modals = {
                                modal1:true,  
                                modal2: false,
                                message: '',
                                icon: '',
                                type: ''
                            }
                        }, 1500);
                        
						// this.arrayUsers();
						// this.ServicesQuantityChartFunc();
						// this.emitMethodTwo()
					}else{
						this.$swal({
							type: 'error',
							title: 'Cliente ya registrado',
							showConfirmButton: false,
							timer: 1500
						})
					}
				})
			}else{
				this.$swal({
					type: 'error',
					title: 'Llene los datos',
					showConfirmButton: false,
					timer: 1500
				})
			}
			
		},
        pushService(prestadores,nombre,tiempo, comision, precio,descuento,count){
            this.registerDate.valid2 = false
            if (this.registerDate.services == '') {
                this.registerDate.services.push({'servicio': nombre, 'comision': comision, 'precio': precio, 'descuento': descuento})
                this.registerDate.servicesShow.push(nombre)
                for (let index = 0; index < prestadores.length; index++) {
                    this.registerDate.employePerService.push(prestadores[index])
                }
            }
            else{
                var inspector = true
                var inspector2 = false
                for (let index = 0; index < this.registerDate.services.length; index++) {
                    if (this.registerDate.services[index].servicio == nombre || this.registerDate.services[index].servicio == nombre + "("+ this.countServices[count].count +")" ) {
                    this.registerDate.servicesShow.splice(index,1)
                    this.registerDate.servicesShow.push(nombre+ "(" + (parseFloat(this.countServices[count].count) +1) + ")")
                    inspector = false
                    break  
                    }
                }
                if (inspector == true) {
                    this.registerDate.services.push({'servicio': nombre, 'comision': comision, 'precio': precio, 'descuento': descuento})
                    this.registerDate.servicesShow.push(nombre)
                }
                for (let c = 0; c < prestadores.length; c++) {
                    for (let index = 0; index < this.registerDate.employePerService.length; index++) {
                        if (prestadores[c] == this.registerDate.employePerService[index]) {
                            inspector2 = true
                            break
                        }
                    }  
                    if (inspector2 == false) {
                        this.registerDate.employePerService.push(prestadores[c])
                    }
                }   
            }
            this.registerDate.duration = parseFloat(this.registerDate.duration) + parseFloat(tiempo)
            this.countServices[count].count++  
            
        },
        validateWizardOne(){
            if (this.registerDate.services != '' && this.registerDate.design != false) { 
                this.registerDate.valid = true
                for (let i = 0; i < this.registerDate.employePerService.length; i++) {
                    for (let c = 0; c < this.employes.length; c++) {
                        
                        if (this.employes[c]._id == this.registerDate.employePerService[i] ) {
                        
                        this.registerDate.employe.push(this.employes[c])
                        }               
                    }
                }
                if (this.registerDate.design == 'si' && this.registerDate.valid3 == false) {
                    this.registerDate.duration = parseFloat(this.registerDate.duration) + 15
                    this.registerDate.valid3 = true
                }
                if (this.registerDate.design == 'no' && this.registerDate.valid3 ==true) {
                    this.registerDate.duration = parseFloat(this.registerDate.duration) - 15
                    this.registerDate.valid3 = false
                }
                this.blockHour = []
                this.registerDate.employeSelect = 'Seleccione un empleado'
                this.img1 = ''
                return true
            }
            else{
                this.registerDate.valid = false
                this.modals = {
                    modal1:true,
                    modal2: true,
                    message: "¡Debe completar todos los datos!",
                    icon: 'ni ni-fat-remove ni-5x',
                    type: 'danger'
                }
                setTimeout(() => {
                    this.modals = {
                        modal1:true,  
                        modal2: false,
                        message: '',
                        icon: '',
                        type: ''
                    }
                }, 1500); 
                return false
            } 
        },
        validateWizardTwo(){
            if (this.registerDate.client != null && this.registerDate.date != null) { 
                this.registerDate.valid = true
                this.blockHour = []
                this.registerDate.employeSelect = 'Seleccione un empleado'
                this.img1 = ''
                return true
            }
            else{
                this.registerDate.valid = false
                this.modals = {
                    modal1:true,
                    modal2: true,
                    message: "¡Debe completar todos los datos!",
                    icon: 'ni ni-fat-remove ni-5x',
                    type: 'danger'
                }
                setTimeout(() => {
                    this.modals = {
                        modal1:true,  
                        modal2: false,
                        message: '',
                        icon: '',
                        type: ''
                    }
                }, 1500); 
                return false
            } 
        },
        validateWizardThree(){
               if (this.registerDate.employeSelect != 'Seleccione un empleado' && this.registerDate.start != null) { 
                   this.registerDate.valid = true
                   return true
               }
               else{
                   this.registerDate.valid = false
                   this.modals = {
                        modal1:true,
                        modal2: true,
                        message: "¡Debe completar todos los datos!",
                        icon: 'ni ni-fat-remove ni-5x',
                        type: 'danger'
                    }
                    setTimeout(() => {
                        this.modals = {
                            modal1:true,  
                            modal2: false,
                            message: '',
                            icon: '',
                            type: ''
                        }
                    }, 1500); 
                   return false
               } 
        },
        initialState(){
            this.$refs.wizard.reset()
            this.registerDate = {
                services:[],
                servicesShow:[],
                employePerService:[],
                employe:[],
                employeSelect:"Seleccione un empleado",
                employeClass:null,
                employeResTime:null,
                client:null,
                block:null,
                duration:0,
                design:false,
                date:null,
                sort:null,
                valid:true,
                valid2:true,
                valid3:false
            }
            this.dateClient = {
                name:'',
                id:'',
                infoOne:null,
                infoTwo:null,
                partipation:null,
                recommender:null,
                recommenders:null,
                lastDate:null,
                discount:null,
                date:null,
                _id:null,
                valid:false,
                valid2:false
            }
            this.img1 = ''
            this.blockHour = []
            for (let index = 0; index < this.countServices.length; index++) {
                this.countServices[index].count = 0
            }
        },
        selectClient(){
            if (this.registerDate.client != null) {
                for (let index = 0; index < this.clients.length; index++) {
                    if (this.clients[index].nombre + " / " + this.clients[index].identidad == this.registerDate.client) {
                        this.dateClient = {
                            name:this.clients[index].nombre,
                            id:this.clients[index].identidad,
                            infoOne:this.clients[index].correoCliente,
                            infoTwo:this.clients[index].instagramCliente,
                            partipation:this.clients[index].participacion,
                            recommender:this.clients[index].recomendacion,
                            recommenders:this.clients[index].recomendaciones,
                            lastDate:this.clients[index].ultimaFecha,
                            date:this.clients[index].fecha,
                            _id:this.clients[index]._id,
                            valid:true
                        }
                        this.dateClient.valid2 = true
                        if (this.dateClient.partipation == 0) {
                            this.dateClient.discount = true
                        }
                    }
                }
            }
            else{
                this.dateClient = {
                    name:'',
                    id:'',
                    infoOne:null,
                    infoTwo:null,
                    partipation:null,
                    recommender:null,
                    recommenders:null,
                    lastDate:null,
                    discount:null,
                    date:null,
                    _id:null,
                    valid:false,
                    valid2:false
                }
            }
            
        },
        validRegister(){
            setTimeout(() => {
                if (this.dateClient.name != '' && this.dateClient.id != '') {
                    this.dateClient.valid2 = true
                }
                else{
                    this.dateClient.valid2 = false
                }
            }, 200);
            
        },
        formatDate(date) {
            let dateFormat = new Date(date)
			return dateFormat.getDate()+"-"+(dateFormat.getMonth() + 1)+"-"+dateFormat.getFullYear()+' ('+dateFormat.getHours()+":"+('0'+dateFormat.getMinutes()).slice(-2)+")"
        },
        MaysPrimera(string){
			return string.charAt(0).toUpperCase() + string.slice(1);
        },
        selectEmploye(nombre,clase,restTime,img){
            this.registerDate.employeSelect = nombre
            this.registerDate.employeClass = clase
            this.registerDate.employeResTime = restTime
            if (img != 'no') {
                this.img1 = img
            }
            else {
                this.img1 = "https://www.w3schools.com/howto/img_avatar.png"
            }
            this.insertDate()
        },
        insertDate(){
            this.blockHour = []
            console.log(this.registerDate.restTime)
            axios.post(endPoint.endpointTarget+'/citas/getBlocks', {
                employe: this.registerDate.employeSelect,
                date: this.registerDate.date,
                time: this.registerDate.duration,
                resTime:this.registerDate.employeResTime
            })
            .then(res => { this.blockHour = res.data })
            .catch(err => { console.log(err) })
        },
        selectBloq(hora, i){
            this.registerDate.start = this.blockHour[i].Horario
            var sortSp = this.registerDate.start.split(":") 
            this.registerDate.sort = sortSp[0]+sortSp[1]

            axios.post(endPoint.endpointTarget+'/citas/getBlocks', {
                employe: this.registerDate.employeSelect,
                date: this.registerDate.date,
                time: this.registerDate.duration,
                resTime : this.registerDate.employeResTime
            })
            .then(res => {
                
                for (let index = 0 ; index <= this.registerDate.duration /15; index++) {
                
                res.data[i].validator = 'select'
                this.registerDate.end = res.data[i].Horario
                i++
                
                }
                this.blockHour = res.data
                })
                .catch(err => {
                console.log(err)
                })
        },
        register(){
            axios.post(endPoint.endpointTarget+'/citas', {
            entrada: this.registerDate.start,
            salida: this.registerDate.end,
            sort: this.registerDate.sort,
            fecha: this.registerDate.date,
            cliente: this.dateClient.name + " / " + this.dateClient.id,
            servicios: this.registerDate.services,
            class: this.registerDate.employeClass,
            manicuristas: this.registerDate.employeSelect
            })
            .then(res => {
            if(res.data.status == 'cita creada'){
                this.modals = {
                    modal1:true,
                    modal2: true,
                    message: "¡Agendamiento exitoso!",
                    icon: 'ni ni-check-bold ni-5x',
                    type: 'success'
                }
                this.getDates()
                if (this.employeByDate != 'Filtrar por empleado') {
                    this.getCitasByEmploye()
                }
                setTimeout(() => {
                    this.initialState()
                    this.modals = {
                        modal1:true,  
                        modal2: false,
                        message: '',
                        icon: '',
                        type: ''
                    }
                    
                }, 1500);
            }else if(res.data.status == 'cita ocupada'){
                this.$swal({
                type: 'error',
                title: 'Cita ocupada',
                showConfirmButton: false,
                timer: 1500
                })
            }else{
                console.log(res.data)
            }
            })
        },
        newClient(){
            console.log(this.dateClient.recommender)
            const name = this.dateClient.name.split(' ')
            var firstName, lastName, fullName, ifCheck
            if (name[1]) {
                firstName = this.MaysPrimera(name[0])
                lastName = this.MaysPrimera(name[1])
                fullName = firstName+' '+lastName
            }
            else {
                fullName = this.MaysPrimera(name[0])
            }
            if (this.dateClient.discount) {
                ifCheck = 0
            }
            else{
                ifCheck = 1
            }
            axios.post(endPoint.endpointTarget+'/clients', {
                nombre:fullName,
                identidad:this.dateClient.id,
                recomendador:this.dateClient.recommender,
                correoCliente:this.dateClient.infoOne,
                instagramCliente:this.dateClient.infoTwo,
                ifCheck: ifCheck
            })
            .then(res => {
                if (res.data.status == 'Registrado') {
                        this.modals = {
                        modal1:true,
                        modal2: true,
                        message: "¡Cliente registrado!",
                        icon: 'ni ni-check-bold ni-5x',
                        type: 'success'
                    }
                    this.getClients()
                    
                    setTimeout(() => {
                            this.registerDate.client = fullName + ' / ' + this.dateClient.id
                            this.selectClient()
                        this.modals = {
                            modal1:true,  
                            modal2: false,
                            message: '',
                            icon: '',
                            type: ''
                        }
                    }, 1500);
                }
                else {
                    this.$swal({
                        type: 'error',
                        title: 'El cliente ya existe',
                        showConfirmButton: false,
                        timer: 1500
                    })
				}
			})
        },
        getCitasByEmploye(name,img){
            if (name == "Todos") {
                this.getDates()
                this.filter = false
                this.employeByDate = "Filtrar por empleado"
            }
            else{
                this.events = []
                if (img != 'no') {
                    this.img2 = img
                }
                else {
                    this.img2 = "https://www.w3schools.com/howto/img_avatar.png"
                }
                axios.get(endPoint.endpointTarget+'/citas/' + name)
                .then(res => {
                    for (let index = 0; index < res.data.length; index++) {
                        let dateNow = new Date(res.data[index].date)
                        let formatDate = ''
                        let formatDateTwo = ''
                        if (dateNow.getMonth() == 9 || dateNow.getMonth() == 10 || dateNow.getMonth() == 11) {
                            if (dateNow.getDate() < 10) {
                                formatDate = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-0"+dateNow.getDate()+" "+res.data[index].start
                                formatDateTwo = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-0"+dateNow.getDate()+" "+res.data[index].end
                            }
                            else{
                                formatDate = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()+" "+res.data[index].start
                                formatDateTwo = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()+" "+res.data[index].end
                            }
                        }
                        else{
                            if (dateNow.getDate() < 10) {
                                formatDate = dateNow.getFullYear() +"-0"+(dateNow.getMonth() + 1)+"-0"+dateNow.getDate()+" "+res.data[index].start
                                formatDateTwo = dateNow.getFullYear() +"-0"+(dateNow.getMonth() + 1)+"-0"+dateNow.getDate()+" "+res.data[index].end
                            }
                            else{
                                formatDate = dateNow.getFullYear() +"-0"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()+" "+res.data[index].start
                                formatDateTwo = dateNow.getFullYear() +"-0"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()+" "+res.data[index].end
                            }  
                        }
                        let arrayEvents = {
                            start: formatDate,
                            end: formatDateTwo,
                            title: res.data[index].services[0].servicio+" - "+res.data[index].employe,
                            content: res.data[index].client,
                            class: res.data[index].class,
                            cliente: res.data[index].client,
                            services: res.data[index].services,
                            empleada: res.data[index].employe,
                            id:res.data[index]._id
                        }
                        this.events.push(arrayEvents)
                    }
                    this.employeByDate = name
                    this.filter = true
                })
            }
        },
        getUsers(){
			const config = {headers: {'x-access-token': localStorage.userToken}}
			axios.get(endPoint.endpointTarget+'/users', config)
			.then(res => {
                this.users = res.data
                console.log(this.users)
                this.getEmployes()
			})
			.catch(err => {
				this.$swal({
					type: 'error',
					title: 'Acceso invalido, ingrese de nuevo, si el problema persiste comuniquese con el proveedor del servicio',
					showConfirmButton: false,
					timer: 2500
				})
				router.push({name: 'Login'})
			})
        },
        onEventClick(event, e){
            this.selectedEvent = event
        
            this.dateModals.modal1 = true
            const split = event.cliente.split('/')
            const splitTwo = split[1].split(' ')
            const splitThree = split[0].split(' ')
            axios.get(endPoint.endpointTarget+'/clients/dataDiscount/'+splitTwo[1])
            .then(res => {
            if (res.data[0].participacion == 0) {
                            this.dateData.discount = true
                        }else{
                this.dateData.discount = false
            }
            this.dateData.history = []
            this.dateData.history = res.data[0].historical
            
            })
            e.stopPropagation()
        },
        dateSplit(value){
            if (value) {
            const split = value.split(' ')
            return split[0]
            }
        },
        dateSplitHours(value){
            if (value) {
            const split = value.split(' ')
            return split[1]
            }
        },
        formatName(name){
            if (name) {
            var sp = name.split(" / ")
            return sp[0]
            }
            
        },
        formatContact(contact){
            if (contact) {
            var sp = contact.split(" / ")
            return sp[1]
            }
            
        },
        formatPrice(value) {
            let val = (value/1).toFixed(2).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        formatDateTwo(date) {
            let dateFormat = new Date(date+' 10:00')
            return (dateFormat.getMonth() + 1)+"-"+dateFormat.getDate()+"-"+dateFormat.getFullYear()
        },
        dataEdit(id, start, end, services, cliente, empleada, classDate){
            
            this.dateModals.modal2 = true
            const Datedate = this.dateSplit(start)
            this.changeDateEdit = false
            const startDate = this.dateSplitHours(start)
            const endDate = this.dateSplitHours(end)
            const separStart = startDate.split(':')
            const separEnd = endDate.split(':')
            
            const SumHours  = ((parseFloat(separEnd[0]) - parseFloat(separStart[0])) * 60)
            const SumMinutes = parseFloat(separEnd[1]) - parseFloat(separStart[1])
            const TotalMinutes = SumHours + SumMinutes
            
            this.dateData.clientEdit = cliente
            this.dateData.fechaEdit = this.formatDateTwo(Datedate)
            this.dateData.fechaEditPick = this.formatDateTwo(Datedate)
            this.dateData.startEdit = startDate
            this.dateData.endEdit = endDate
            this.dateData.lenderEdit = empleada
            this.dateData.classFinalEdit = classDate
            this.dateData.duracionEdit = TotalMinutes
            this.dateData.dateEditId = id
            this.selectEmployeEdit(empleada)
        },
        selectEmployeEdit(name){
            for (let index = 0; index < this.employes.length; index++) {
                console.log(this.employes[index].nombre + this.dateData.lenderEdit)
            if (this.employes[index].nombre == name) {
                
                this.dateData.lenderEdit = this.employes[index].nombre
                this.dateData.classFinalEdit = this.employes[index].class
                this.dateData.resTimeFinalEdit = this.employes[index].restTime
                this.insertDateTwo()
                break
            }
            
            }
              
        },
        insertDateTwo(){
            if (this.dateData.fechaEditPick != null) {
                this.blockHourEdit = []
                axios.post(endPoint.endpointTarget+'/citas/getBlocks', {
                    employe: this.dateData.lenderEdit,
                    date: this.dateData.fechaEditPick,
                    time: this.dateData.duracionEdit,
                    resTime:this.dateData.resTimeFinalEdit
                })
                .then(res => {
                    this.blockHourEdit = res.data
                })
                .catch(err => {
                console.log(err)
                })
            }
            else {
                this.blockHourEdit = []
                axios.post(endPoint.endpointTarget+'/citas/getBlocks', {
                    employe: this.dateData.lenderEdit,
                    date: this.dateData.fechaEdit ,
                    time: this.dateData.duracionEdit,
                    resTime:this.dateData.resTimeFinalEdit
                })
                .then(res => {
                    this.blockHourEdit = res.data
                })
                .catch(err => {
                console.log(err)
                })
            }
        },
        editDate(){
            if (this.dateData.startEdit && this.dateData.endEdit != '') {
            
            const split = this.dateData.startEdit.split(':')
            const sort = split[0]+split[1]
            let dateEdit = ''

            if (this.dateData.fechaEditPick != '') {
                dateEdit =  this.dateData.fechaEdit
            }
            else {
                dateEdit =  this.dateData.fechaEditPick
            }
            axios.put(endPoint.endpointTarget+'/citas/editDate/'+this.dateData.dateEditId, {
            entrada: this.dateData.startEdit,
            salida: this.dateData.endEdit,
            sort: sort,
            fecha: dateEdit,
            cliente: this.dateData.clientEdit,
            class: this.dateData.classFinalEdit,
            manicuristas: this.dateData.lenderEdit
            })
            .then(res => {
            if (res.data.status == 'ok') {
                this.$swal({
                type: 'success',
                title: 'Cita editada',
                showConfirmButton: false,
                timer: 1500
                })
                this.blockHourEdit = []
                this.getDates();
                setTimeout(() => {
                // if (this.employeByDate != 'Manicuristas') {
                //     this.getDatesb()
                // }
                }, 500);
                
            }else{
                this.$swal({
                type: 'error',
                title: 'error al editar',
                showConfirmButton: false,
                timer: 1500
                })
            }
            })
            }
            else{
            this.$swal({
                type: 'error',
                title: '¡Debes elegir un horario!',
                showConfirmButton: false,
                timer: 1500
            })
            }
        },
        selectBloqEdit(hora, i){
            this.dateData.startEdit =this.blockHourEdit[i].Horario
            var sortSp = this.dateData.startEdit.split(":") 
            this.sort = sortSp[0]+sortSp[1]
            let dateEdit = ''

            if (this.dateData.fechaEditPick != null) {
                dateEdit =  this.dateData.fechaEdit
            }
            else {
                dateEdit =  this.dateData.fechaEditPick
            }

            axios.post(endPoint.endpointTarget+'/citas/getBlocks', {
                employe: this.dateData.lenderEdit,
                date: dateEdit,
                time: this.dateData.duracionEdit,
                resTime:this.dateData.resTimeFinalEdit
            })
            .then(res => {
                for (let index = 0 ; index <= this.dateData.duracionEdit / 15; index++) {
                    res.data[i].validator = 'select'
                    this.dateData.endEdit = res.data[i].Horario
                    i++
                }
                this.blockHourEdit = res.data
            })
            .catch(err => {
            console.log(err)
            })
        },
        initialDate(val){
            $('.desMarc').prop('checked' , false)
            if (val == 1) {
                this.selectedDates = {
                    client:'',
                    closedArray:[],
                    services:[],
                    clientSplit:'',
                    employes:'',
                    design:0,
                    comision:0,
                    totaLocal:0,
                    total:0,
                    discount:0,
                    discountSplit:[],
                    employeDiscount:[],
                    endDatesId:[],
                    clientIds:[]
                }
                this.payCash = 0
                this.payTransfer = 0
                this.payOthers = 0
                this.payDebit = 0
                this.payCredit = 0
            }
            else {
               this.selectedDates = {
                    client:'',
                    closedArray:[],
                    services:[],
                    clientSplit:'',
                    employes:'',
                    design:0,
                    comision:0,
                    totaLocal:0,
                    total:0,
                    discount:0,
                    discountSplit:[],
                    employeDiscount:[],
                    endDatesId:[],
                    clientIds:[]
                }
                this.closedDates = []
                this.payCash = 0
                this.payTransfer = 0
                this.payOthers = 0
                this.payDebit = 0
                this.payCredit = 0 
            }
            
        },
        endDate(id, client, employe, services){
            this.endId = ''
            this.endServices = []
            this.endClient = ''
            this.endEmploye = ''
            this.dateModals.modal3 = true
            this.endId = id
            this.serviciosSelecionadosDates = services
            this.endClient = client
            this.endEmploye = employe
            console.log(services)
            axios.get(endPoint.endpointTarget+'/servicios')
            .then(res => {
            for (let index = 0; index < services.length; index++) {
                
                for (let indexTwo = 0; indexTwo < res.data.length; indexTwo++) {
                console.log(services[index].servicio == res.data[indexTwo].nombre)
                if (services[index].servicio == res.data[indexTwo].nombre) {
                    let valSpan = $(`.${res.data[indexTwo]._id}`).text()
                    let sumaVal = parseFloat(valSpan) + 1
                    $(`.${res.data[indexTwo]._id}`).text(sumaVal)
                }
                } 
            }
            })
            // for (let index = 0; index < services.length; index++) {
            //   if (services[index].) {
                
            //   }
            
            // }
        },
        deleteDate(id){
            this.$swal({
                title: '¿Está seguro de borrar la cita?',
                text: 'No puedes revertir esta acción',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Estoy seguro',
                cancelButtonText: 'No, evitar acción',
                showCloseButton: true,
                showLoaderOnConfirm: true
            })
            .then((result) => {
                if(result.value) {
                    axios.delete(endPoint.endpointTarget+'/citas/' + id)
                    .then(res => {
                        if(res.data.status == 'Cita Eliminada'){
                        this.$swal({
                            type: 'success',
                            title: 'Cita eliminada',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        this.events = []
                        this.dateModals.modal1 = false
                        this.getDates();
                        }
                    })
                }
                else{
                    this.$swal({
                        type: 'info',
                        title: 'Acción cancelada',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            }) 
        },
        closeDate(id){
            axios.put(endPoint.endpointTarget+'/citas/closeDate/'+id)
            .then(res => {
            if (res.data.status == 'ok') {
                this.selectedEvent.process = false
            }
            })
        },
        ProccessSelectedDates(){    
            this.dateModals.modal4 = false 
            
            for (let index = 0; index < this.selectedDates.closedArray.length; index++) {
                const position = this.selectedDates.closedArray[index]
                for (let indexTwo = 0; indexTwo < position.services.length; indexTwo++) {
                    const positionTwo = position.services[indexTwo];
                    this.selectedDates.services.push(positionTwo)
                }
                this.selectedDates.client = index == 0 ? position.client : this.selectedDates.client + ' - ' + position.client
                this.selectedDates.clientSplit = this.selectedDates.client.split('-')
                this.selectedDates.employes = index == 0 ? position.employe : this.selectedDates.employes + ' / ' + position.employe
                this.selectedDates.design = parseFloat(this.selectedDates.design) + parseFloat(position.design)
                this.selectedDates.comision = parseFloat(this.selectedDates.comision) + parseFloat(position.comision)
                this.selectedDates.totaLocal = parseFloat(this.selectedDates.totaLocal) + parseFloat(position.totalLocal)
                this.selectedDates.total = parseFloat(this.selectedDates.total) + parseFloat(position.total)
                this.selectedDates.discount = index == 0 ? position.employe + ' / ' + position.descuento+'%' : this.selectedDates.discount + ' - ' +position.employe + ' / ' + position.descuento+'%'
                this.selectedDates.discountSplit = this.selectedDates.discount.split('-')
                this.selectedDates.employeDiscount.push({employe: position.employe, comision: position.comision})
                this.selectedDates.endDatesId.push(position.id)
                this.selectedDates.clientIds.push(position.client.split(' / ')[1])
            }
            console.log(this.selectedDates)
            this.dateModals.modal5 = true
        },
        hundredPorcent(tipo){
        
            if (tipo == "efectivo") {
                this.payCash = 0
                this.payTransfer = 0
                this.payOthers = 0
                this.payCredit = 0
                this.payDebit = 0
                this.payCash = this.selectedDates.total
            }
            if (tipo == "trasnferencia") {
                this.payCash = 0
                this.payTransfer = 0
                this.payOthers = 0
                this.payCredit = 0
                this.payDebit = 0
                this.payTransfer = this.selectedDates.total
            }
            if (tipo == "others") {
                this.payCash = 0
                this.payTransfer = 0
                this.payOthers = 0
                this.payCredit = 0
                this.payDebit = 0
                this.payOthers = this.selectedDates.total
            }
            if (tipo == "credit") {
                this.payCash = 0
                this.payTransfer = 0
                this.payOthers = 0
                this.payCredit = 0
                this.payDebit = 0
                this.payCredit = this.selectedDates.total
            }
            if (tipo == "debit") {
                this.payCash = 0
                this.payTransfer = 0
                this.payOthers = 0
                this.payCredit = 0
                this.payDebit = 0
                this.payDebit = this.selectedDates.total
            }
        },
        hundredMouseOver(tipo){
			$("."+tipo).toggle()
		},
		hundredMouseNonOver(tipo){
			$("."+tipo).toggle()
        },
        processSelected(){
            if (this.payCash == '') {
				this.payCash = 0
			}
			if (this.payOthers == '') {
				this.payOthers = 0
			}
			if (this.payTransfer == '') {
				this.payTransfer = 0
			}
			if (this.payDebit == '') {
				this.payDebit = 0
			}
			if (this.payCredit == '') {
				this.payCredit = 0
			}
            if (this.selectedDates.discount == '') {
            this.selectedDates.discount = 0
            }
            if (this.selectedDates.design == '') {
            this.selectedDates.design = 0
            }
            const totalFormadePago = parseFloat(this.payCash) + parseFloat(this.payOthers) + parseFloat(this.payTransfer) + parseFloat(this.payDebit) + parseFloat(this.payCredit)

            if (this.selectedDates.total == totalFormadePago) {
                axios.post(endPoint.endpointTarget+'/ventas/processEndDates', {
                    servicesClosedDates: this.selectedDates.services,
                    clientClosedDates: this.selectedDates.client,
                    employeClosedDates: this.selectedDates.employes,
                    designClosedDates: this.selectedDates.design,
                    comisionClosedDates: this.selectedDates.comision,
                    totalLocalClosedDates: this.selectedDates.totaLocal,
                    totalClosedDates: this.selectedDates.total,
                    descuentoClosedDates: this.selectedDates.discount,
                    employeClosedDatesWithDiscount: this.selectedDates.employeDiscount,
                    datesClientIdentification: this.selectedDates.clientIds,
                    pagoEfectivo: this.payCash,
                    pagoOtros: this.payOthers,
                    pagoRedCDebito: this.payDebit,
                    pagoRedCCredito: this.payCredit,
                    pagoTransf: this.payTransfer,
                    endDatesId: this.selectedDates.endDatesId
                })
                .then(res => {
                    if (res.data.status == "Venta registrada") {
                        this.$swal({
                            type: 'success',
                            title: 'Venta procesada',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        this.initialDate()
                    }
                })
            }
            else{
                this.$swal({
                    type: 'error',
                    title: 'Total no coincide, con los montos en medios de pago',
                    showConfirmButton: false,
                    timer: 2000
                })
                if (this.payCash == 0) {
                    this.payCash = ''
                }
                if (this.payTransfer == 0) {
                    this.payTransfer = ''
                }
                if (this.payOthers == 0) {
                    this.payOthers = ''
                }
                if (this.payDebit == 0) {
                    this.payDebit = ''
                }
                if (this.payCredit == 0) {
                    this.payCredit = ''
                }
            }
        },
        conteoServicioDate(esto, servicio, precio, comision, discount, index){
            console.log(esto)
            const conteo = $("#"+index+esto).text()
            const conteoTotal = parseFloat(conteo) + 1
            $("#"+index+esto).text(conteoTotal)
            const servicios = {'servicio': servicio, 'comision': comision, 'precio': precio, 'descuento': discount}
            this.servicesFinish.push(servicios)
            console.log(this.servicesFinish)
        },
        endingDate(){
            const id = this.endId
            axios.post(endPoint.endpointTarget+'/citas/endDate/'+id, {
                services:this.serviciosSelecionadosDates,
                client:this.endClient,
                employe:this.endEmploye,
                design: this.designEndDate
            })
            .then(res => {
                if (res.data.status == 'ok') {
                    
                    this.getDates();
                    setTimeout(() => {
                    if (this.employeByDate != 'Filtrar por empleado') {
                        this.getCitasByEmploye()
                    }
                    }, 500);
                    this.getClosed()
                    this.$swal({
                    type: 'success',
                    title: 'Cita finalizada con exito',
                    showConfirmButton: false,
                    timer: 1500
                    })
                    this.dateModals.modal1 = false
                    this.dateModals.modal3 = false
                    this.designEndDate = ''
                    this.serviciosSelecionadosDates = []
                    this.endClient = ''
                    this.endEmploye = ''
                    this.designEndDate = ''
                    $('.conteoServ').text('0')
                }
            })
        },
        selected(value){
            const selectArray = {
                id: value.selected_item._id,
                services: value.selected_item.services,
                client: value.selected_item.client,
                employe: value.selected_item.employe,
                design: value.selected_item.design,
                comision: value.selected_item.comision,
                totalLocal: value.selected_item.totalLocal,
                total: value.selected_item.total,
                descuento: value.selected_item.descuento,
                date: value.selected_item.date,
            }
            this.selectedDates.closedArray.push(selectArray)
        },
        unSelected(value){
        
            for (let i = 0; i < this.selectedDates.closedArray.length; i++) {
                if (this.selectedDates.closedArray[i].id == value.unselected_item._id) {
                    this.selectedDates.closedArray.splice(i, 1)
                    break
                }
            }
        },
        selectedAll(value){
            console.log(value.selected_items)
            var selectArray = {}
            for (let index = 0; index < value.selected_items.length; index++) {
                selectArray = {
                    id: value.selected_items[index]._id,
                    services: value.selected_items[index].services,
                    client: value.selected_items[index].client,
                    employe: value.selected_items[index].employe,
                    design: value.selected_items[index].design,
                    comision: value.selected_items[index].comision,
                    totalLocal: value.selected_items[index].totalLocal,
                    total: value.selected_items[index].total,
                    descuento: value.selected_items[index].descuento,
                    date: value.selected_items[index].date,
                }
                this.selectedDates.closedArray.push(selectArray)
            }
        },
        unSelectedAll(value){
            this.selectedDates.closedArray = []
        },
        processDate(id, type){
            EventBus.$emit('processDate', id)
            this.dateModals.modal1 = false
            setTimeout(() => {
                $('#processButton').click()
            }, 500);
        },
    },
    mounted (){
        EventBus.$on('reloadDates', status => {
            this.getDates()
        })
    }
  };
</script>
<style>
    .dropdown-menu{
        width: 100%;
        max-height: 30vh;
        overflow:hidden;
        overflow-x: hidden;
        overflow-y:scroll;
    }
    .vuecal__flex .vuecal__menu{
        color: #0a0a0a !important
    }
    .vuecal__arrow {
        color: white;
    }
    .vuecal__menu {background-color:transparent;border: none !important;border-radius: 5px 5px 0 0; }
    .vuecal__menu button{background-color:rgba(7, 7, 7, 0.116);outline: none}
    .vuecal__menu li {border-bottom-color: #fff;color: #fff;}
    .vuecal__menu li.active {background-color: rgba(255, 255, 255, 0.15);}
    .vuecal__title-bar {background-color: #172b4d;color: #fff !important}
    .vuecal__title button{
        color: white !important
    }
    .vuecal__body{
        background-color:white;
    }
    .vuecal__time-column .vuecal__time-cell{color:white;height:1vh;}
    .vuecal__event{color:#fff;font-weight:bold;cursor:pointer;}
    .vuecal__event:hover{
        opacity: .8;
    }
    /* Dot indicator */
    .vuecal__cell-events-count {
    width: 40px;
    min-width: 0;
    height: 30px;
    padding: 5px;
    padding-top: 10px;
    font-size: 16px;
    background-color: #172b4d; 
    }
    .vuecal__cell-content {
        height: 100px;
    }
    .vuecal__header{background-color: rgba(238, 238, 238, 0.623);border-radius: 5px 5px 0 0;}
    .vuecal__cell.today div .vuecal__cell-events-count, .vuecal__cell.current {background-color: #353535 !important;}
    .vuecal:not(.vuecal--day-view) .vuecal__cell.selected {background-color: rgba(235, 255, 245, 0.4);}
    .vuecal__cell.selected:before {border-color: rgba(66, 185, 131, 0.5);}
    .vuecal__cell-date{color:#000;font-family: 'Raleway', sans-serif;
    font-weight:600;}
    .vuecal__heading span{color:#000;font-family: 'Raleway', sans-serif;
    font-weight:600;}
    .vuecal--rounded-theme.vuecal--green-theme:not(.vuecal--day-view) .vuecal__cell-content {
        background-color: #1F5673;
        height: 10vh !important;
    }
    .vuecal__cell-split {
        background-color: #1F5673;
        height: 10vh !important;
    }
    .vuecal--green-theme .vuecal__title-bar {
        background-color: #1F5673;
    }
    .vuecal__time-column .vuecal__time-cell{
        color: #0F2027
    }
    .class1 {
    background:#BCBCBC;
    border: 1px solid #BCBCBC;
    color: #343633;
    }
    .class2 {
    background:#BCD1FF;
    border: 1px solid #BCD1FF;
    color: #343633;
    }
    .class3 {
    background:#DDEFBD;
    border: 1px solid #DDEFBD;
    color: #343633;
    }
    .class4 {
    background:#CDF2E2;
    border: 1px solid #CDF2E2;
    color: #343633;
    }
    .class5 {
    background:#B7E8CD;
    border: 1px solid #B7E8CD;
    color: #343633;
    }
    .class6 {
    background:#C0E5DD;
    border: 1px solid #C0E5DD;
    color: #343633;
    }
    .class7 {
    background:#F2E6E6;
    border: 1px solid #F2E6E6;
    color: #343633;
    }
    .class8 {
    background:#FFD6D6;
    border: 1px solid #FFD6D6;
    color: #343633;
    }
    .class9 {
    background:#FFD1BA;
    border: 1px solid #FFD1BA;
    color: #343633;
    }
    .class10 {
    background:#FFF3B5;
    border: 1px solid #FFF3B5;
    color: #343633;
    }
    .class11 {
    background:#EFEBD0;
    border: 1px solid #EFEBD0;
    color: #343633;
    }
    .class12 {
    background:#FFE5E5;
    border: 1px solid #FFE5E5;
    color: #343633;
    }
    .class13 {
    background:#A2CEA1;
    border: 1px solid #A2CEA1;
    color: #343633;
    }
    .class14 {
    background:#9EC189;
    border: 1px solid #9EC189;
    color: #343633;
    }
    .class15 {
    background:#ADC9D8;
    border: 1px solid #ADC9D8;
    color: black;
    }
    .class16 {
    background:#B0E098;
    border: 1px solid #B0E098;
    color: #343633;
    }
    .class17 {
    background:#E8FCCF;
    border: 1px solid #E8FCCF;
    color: #343633;
    }
    .class18 {
    background:#BBCCEA;
    border: 1px solid #BBCCEA;
    color: #343633;
    }
    .class19 {
    background:#A2BFF2;
    border: 1px solid #A2BFF2;
    color: #343633;
    }
    .class20 {
    background:#D6FFDF;
    border: 1px solid #D6FFDF;
    color: #343633;
    }
    .class21 {
    background:#C2C8E8;
    border: 1px solid #C2C8E8;
    color: #343633;
    }
    .class22 {
    background:#EBD4CB;
    border: 1px solid #EBD4CB;
    color: #343633;
    }
    .class23 {
    background:#EAC5BE;
    border: 1px solid #EAC5BE;
    color: #343633;
    }
    .class24 {
    background:#A4D6CA;
    border: 1px solid #A4D6CA;
    color: #343633;
    }
    .class25 {
    background:#CAF7E2;
    border: 1px solid #CAF7E2;
    color: #343633;
    }
    .class26 {
    background:#CAF7E2;
    border: 1px solid #CAF7E2;
    color: #343633;
    }
    .class27 {
    background:#6EA08B;
    border: 1px solid #6EA08B;
    color: #343633;
    }
    .class28 {
    background:#EBD8D0;
    border: 1px solid #EBD8D0;
    color: #343633;
    }
    .class28 {
    background:#EAC9C1;
    border: 1px solid #EAC9C1;
    color: #343633;
    }
    .class29 {
    background:#D3AB9E;
    border: 1px solid #D3AB9E;
    color: #343633;
    }
    .class30 {
    background:#CAF7E2;
    border: 1px solid #CAF7E2;
    color: #343633;
    }
    .cursor-pointer{
        cursor: pointer;
    }
    .maxHeightHistorical{
    max-height: 150px;
    overflow: hidden;
    overflow-y: scroll;
    }
    .nav-pills .nav-link.active{
        background-color:#2dce89 ;
    }
    .listDatesEnd{
        max-height: 60vh;
        height: auto;
    }
</style>
 