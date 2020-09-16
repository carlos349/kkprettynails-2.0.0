<template >
    <div>
        <base-header class="header pb-4 pt-2 pt-lg-4 d-flex align-items-center"
            style="min-height: 50px; background-image: url(img/theme/agenda.jpg); background-size: cover; background-position: center top">
            <!-- Mask -->
            <span style="background-color:#172b4d !important" class="mask  opacity-7"></span>
            <!-- Header container -->
            <div class="container-fluid d-flex align-items-center">
                <div class="row">
                    <div class="col-lg-12 col-md-12">
                        <h1 class="display-2 text-white w-100">Sección de Agenda</h1>
                        <p class="text-white headMob mt-0 mb-2">Esta es la sección administrativa de agendamiento, aquí podrás registrar, editar y visualizar tu agenda.</p>
                        <div class="col-12">
                            <div style="width:120%" class="row buttons">
                                <base-button v-if="validRoute('agendamiento', 'agendar')" @click="modals.modal1 = true , initialState()"  type="success">Agendar</base-button>
                                <base-button v-if="validRoute('agendamiento', 'procesar')" class="mt-1" @click="dateModals.modal4 = true, initialDate(1)" type="primary">
                                    <span>Ventas por procesar</span>
                                    <badge v-if="loadingEnds == false" type="primary">{{lengthClosedDates}}</badge>
                                    <a-spin v-else  class="float-right ml-2" size="small" /> 
                                </base-button>
                                <base-dropdown v-if="validRoute('agendamiento', 'filtrar')" class="maxheightDropDown dropAgend mt-1 p-0 col-lg-6 drop w-75 mt-1 p-0">
                                    <base-button slot="title" type="default" class="dropdown-toggle col-md-12 col-sm-6">
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
                                <div v-if="filter == true && validRoute('agendamiento', 'filtrar') == true" class="ml-2">
                                    <img class="avatar rounded-circle" :src="img2" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </base-header>
        <modal :show.sync="modalsDialog.modal2"
               :gradient="modalsDialog.type"
               modal-classes="modal-danger modal-dialog-centered">
            <div class="py-3 text-center">
                <i :class="modalsDialog.icon"></i>
                <h1 class="heading mt-5">{{modalsDialog.message}}</h1>
            </div>
        </modal>
        <modal :show.sync="modals.modal1" body-classes="p-0" modal-classes=" modal-xl">
            <h6 slot="header" class="modal-title" id="modal-title-default"></h6>
            <card type="secondary" shadow header-classes="bg-white" body-classes="" class="border-0">
                <modal :show.sync="modals.modal2" :gradient="modals.type" modal-classes="modal-danger modal-dialog-centered">
                    <div class="py-3 text-center">
                        <i :class="modals.icon"></i>
                        <h1 class="heading mt-5">{{modals.message}}</h1>
                    </div>
                </modal>
                  <!-- WIZARD -->
                
                <form-wizard style="margin-top:-5% !important" ref="wizard" class="p-0 m-0" :start-index="0" color="#214d88" @on-complete="register" error-color="#f5365c" back-button-text="Atras" next-button-text="Siguiente" finish-button-text="¡Agendar!">

                    <h2 v-if="registerDae.valid" slot="title">Datos de agendamiento </h2>
                    <h2 v-else slot="title" class="text-danger">¡Debe completar los datos!</h2>

                    <tab-content icon="ni ni-bullet-list-67" title="Servicios" :before-change="validateFirstStep">
                        <template>
                            <div class="text-muted text-center p-0">
                                Seleccione los servicios
                            </div>
                        </template>
                        
                        <div class="col-12">
                            <center>
                                
                                <base-button v-on:click="initialState()" type="secondary" class="text-default">
                                    <font-awesome-icon class="mx-auto"  icon="redo-alt" />
                                </base-button>
                            </center>
                        </div>
                        <div class="row mt-2">
                            <div class="row col-md-12">
                                <div style="width:auto;" class="mx-auto">
                                    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                        <li v-for="(category, index) of categories" :key="category._id" class="nav-item responsiveItem" role="presentation">
                                            <button class="categoryButton text-uppercase responsiveItem" :id="'cat'+index" data-toggle="pill" :href="'#v-pills-'+category._id" role="tab" aria-controls="v-pills-home" aria-selected="true" v-on:click="selectCat('cat'+index)">{{category.name}}</button>
                                        </li>
                                    </ul>   
                                </div>
                                <vue-custom-scrollbar class="w-100" v-on:scroll="scroll()" style="height:30vh;overflow:hidden;overflow-x: hidden;overflow-y:hidden;">
                                    <div class="tab-content" id="pills-tabContent">
                                        <div v-for="category of categories" :key="category._id" class="tab-pane fade" :id="'v-pills-'+category._id" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                            <div class="row">
                                                <template v-for="(name, index) of services" >
                                                    <div class="col-lg-6 mt-2" :key="name" v-if="name.category == category.name">
                                                        <base-button v-if="name.active == true" class="w-100" v-on:click="plusService(index, name.nombre, name.tiempo, name.comision, name.precio, name.prestadores, name.descuento)"  type="default">
                                                            <badge class="float-left text-white col-md-3 col-sm-12" pill type="default">
                                                                <i class="fas fa-user-check m-0"></i>{{name.prestadores.length}}
                                                                <i class="far fa-clock ml-1"></i> {{name.tiempo}}Min
                                                            </badge>
                                                            <span class="float-left">{{name.nombre}}</span>
                                                            <badge class="text-default float-right col-md-1 col-sm-12" type="white">{{countServices[index].count}}</badge>
                                                        </base-button>
                                                    </div>
                                                </template>
                                            </div>
                                        </div>
                                    </div>
                                </vue-custom-scrollbar>
                            </div>
                        </div>
                        <div style="width:auto;" class="mx-auto">
                            <div class="row mx-auto mt-2">
                                <h3 class="ml-3">¿Se realizara un diseño?</h3> 
                                <base-radio name="si" value="true" inline class="mb-3 ml-3" v-model="registerDae.design"> <b>Si</b> </base-radio>
                                <base-radio name="no" value="false" inline class="mb-3 ml-3" v-model="registerDae.design"> <b>No</b> </base-radio> 
                            </div>
                        </div>
                    </tab-content>

                    <tab-content icon="ni ni-collection" title="Profesionales" :before-change="validateLastStep">
                        <div class="row">
                            <div class="col-md-4 col-sm-12 mx-auto mt-4">
                                <h4 class="text-center text-uppercase">Fechas disponibles</h4>
                                <base-input addon-left-icon="ni ni-calendar-grid-58">
                                    <flat-picker slot-scope="{focus, blur}"
                                                @on-change="openCalendar"
                                                @on-open="focus"
                                                @on-close="blur"
                                                :config="configDatePicker"
                                                class="form-control datepicker"
                                                v-model="registerDae.date"
                                                placeholder="Seleccione una fecha">
                                    </flat-picker>
                                </base-input>
                            </div>
                            <div class="col-md-8">
                                <div class="row mb-3">
                                    <div class="col-12 text-center mt-2" v-for="(servicesSelect, indexService) of registerDae.serviceSelectds" :key="servicesSelect">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="py-1" style="background-color:#f8fcfd;">
                                                    <badge style="font-size:.7em !important" v-if="servicesSelect.lender != ''" type="secondary" class="mb-1">
                                                        <span style="color:#32325d;font-weight:600;font-family:Arial !important;">Profesionales</span> <br>
                                                        <span style="color:#32325d;font-weight:600;font-family:Arial !important;" >{{servicesSelect.servicio}} </span>
                                                    </badge>
                                                    <badge style="font-size:.7em !important" v-else type="default" class="mb-1"><span style="color:#32325d;font-weight:600;font-family:Arial !important;" >Seleccione prestador y horario</span></badge>
                                                    <base-dropdown class="responsiveButtonsPercent styleDropdown">
                                                        <base-button style="border-radius:14px;background-color:#d5dadd;color:#1c2021;border:none;" v-if="servicesSelect.valid" slot="title" type="default" class="dropdown-toggle w-100">
                                                            {{servicesSelect.lender}} 
                                                        </base-button>
                                                        <base-button style="border-radius:14px;background-color:#d5dadd;color:#1c2021;border:none;" v-else disabled slot="title" type="default" class="dropdown-toggle w-100">
                                                            {{servicesSelect.lender}} 
                                                        </base-button>
                                                        <b v-for="lenders of servicesSelect.lenders" :key="lenders" v-if="lenders.valid && lenders.restDay != getDay" class="dropdown-item w-100" style="color:#fff;" v-on:click="insertData(indexService, lenders.lender, lenders.resTime, lenders.class, servicesSelect.duration, 'check'+indexService, servicesSelect.lenders)">{{lenders.lender}}  </b>
                                                    </base-dropdown>
                                                </div>
                                            </div>
                                            <div class="col-md-6 pb-2">
                                                <div class="py-1" style="background-color:#f8fcfd;">
                                                    <badge type="secondary" style="font-size:.7em !important; margin-top:14px;" class="mb-1">
                                                    <span style="font-family:Arial !important;color:#32325d;font-weight:600;">Horarios disponibles</span> <br>  
                                                    </badge>
                                                    <base-button v-on:click="openBlocks('block'+indexService)" class="responsiveButtonsPercent" v-if="servicesSelect.valid" style="border-radius:14px;background-color:#d5dadd;color:#1c2021;border:none;" type="default" >
                                                        <span v-if="servicesSelect.start != ''">{{servicesSelect.start}} / {{servicesSelect.end}} <i style="color:#2dce89;float:right;margin-top:6px;" :id="'check'+indexService" class="fa "></i></span>

                                                        <span v-else>Seleccione una hora <i class="fa fa-angle-down" style="font-size:16px"></i> </span>
                                                    </base-button>
                                                    <base-button class="responsiveButtonsPercent" v-else style="border-radius:14px;background-color:#d5dadd;color:#1c2021;border:none;" type="default" disabled>
                                                    Seleccione una hora
                                                    </base-button>
                                                    <vue-custom-scrollbar class="mx-auto responsiveButtonsPercent" :id="'block'+indexService" style="max-height:25vh;overflow:hidden;overflow-x: hidden;overflow-y:hidden;background-color:#fff;">
                                                        <div class="col-12" v-for="(block , index) of servicesSelect.blocks">
                                                            <base-button v-if="block.validator == true" v-on:click="selectBloqMulti(block.Horario, index, indexService, 'block'+indexService, 'check'+indexService)" size="sm" class="col-12" type="success">
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
                                </div>
                            </div>
                        </div> 
                    </tab-content>
                    <tab-content title="Información" icon="fa fa-question-circle">
                        <div class="row">
                            <div class="col-md-8 col-sm-12" >
                                <div class="row">
                                    <div class="card-services-information col-lg-6" v-for="(data, index) in registerDae.serviceSelectds" :key="data">
                                        <div class="p-3">
                                            <center>
                                            <span class="mb-1 w-100" style="color:#000;font-weight:500;">Servicio {{index + 1}}</span> 
                                            </center>
                                            <base-button slot="title" type="secondary" class="w-100 text-center mb-1" style="background-color:#d5dadd;color:#1c2021;border:none">
                                                <badge class="mx-auto" type="default" style="background-color:#174c8e;"><span style="color:#fff;font-size:1.4em;text-transform:none;">{{data.servicio}}</span> </badge><br>
                                                <span class="mx-auto" style="font-size:1.2em;">{{data.realLender}}</span>
                                            </base-button>
                                            <div style="background-color:#f8fcfd;">
                                                <badge type="secondary" class="w-100" style="margin-top:-5px;font-weigth:600;font-family: Open Sans, sans-serif;line-height: .2;">
                                                    <span style="color:#000;font-weight:600;font-size:.9em;text-transform:none;">Desde las</span> 
                                                </badge>
                                                <badge type="secondary" class="w-100" style="margin-top:-5px;font-weigth:600;font-family: Open Sans, sans-serif;line-height: .2;">
                                                    <span style="color:#000;font-weight:600;font-size:2.8em;">{{data.start}}</span> 
                                                </badge>
                                                <badge type="secondary" class="w-100" style="margin-top:-5px;font-weigth:600;font-family: Open Sans, sans-serif;line-height: .2;">
                                                    <span style="color:#000;font-weight:600;font-size:.9em;text-transform:none;">Hasta las</span> 
                                                </badge>
                                                <badge type="secondary" class="w-100" style="margin-top:-5px;font-weigth:600;font-family: Open Sans, sans-serif;line-height: .2;">
                                                    <span style="color:#000;font-weight:600;font-size:2.8em;">{{data.end}}</span> 
                                                </badge>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 col-sm-12 pt-5">
                                <center>
                                    <base-button class="mt-3 responsiveButtonsPercent mx-auto" type="secondary" style="border-radius:14px;background-color:#d5dadd;color:#1c2021;border:none;">
                                    Fecha: <strong>{{registerDae.date}}</strong>
                                    </base-button><br>
                                    <base-button class="mt-3 responsiveButtonsPercent mx-auto" type="secondary" style="border-radius:14px;background-color:#d5dadd;color:#1c2021;border:none;">
                                        Diseño: <strong class="text-uppercase">{{registerDae.design}}</strong>
                                    </base-button><br>
                                    <base-button class="mt-3 responsiveButtonsPercent mx-auto" type="secondary" style="border-radius:14px;background-color:#d5dadd;color:#1c2021;border:none;">
                                        Hora de inicio: <strong v-if="registerDae.serviceSelectds[0]">{{registerDae.serviceSelectds[0].start}}</strong>
                                    </base-button><br>
                                    <base-button class="mt-3 responsiveButtonsPercent mx-auto" type="secondary" style="border-radius:14px;background-color:#d5dadd;color:#1c2021;border:none;">
                                        Total: <strong class="text-uppercase">$ {{formatPrice(totalPrice)}}</strong>
                                    </base-button>
                                </center><br>
                            </div>
                        </div>
                        <template>
                            <div class="text-muted text-center">
                                Datos del cliente
                            </div>
                        </template>
                        <div class="w-100 " v-on:keyup.enter="selectClient()" @click="selectClient()">
                            <vue-single-select
                                v-model="registerDate.client"
                                :options="clientsNames"
                                placeholder="Seleccione un cliente"
                                class="w-50 mx-auto mt-1"
                            ></vue-single-select> 
                        </div>
                        <div  class="row">
                            <div style="color:black !important" class="col-md-6">
                                <base-input v-on:keyup="validRegister()" class="text-white" placeholder="Nombre del cliente" v-model="dateClient.name" addon-left-icon="ni ni-circle-08"></base-input>
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
                            <div class="col-md-6 col-sm-12">
                                <base-checkbox v-model="dateClient.discount" class="mt-2">
                                    Descuento de nuevo cliente
                                </base-checkbox>
                            </div>
                            <div class="col-md-6 col-sm-12">
                                <vue-single-select
                                    v-model="dateClient.recommender"
                                    :options="clientsNames"
                                    placeholder="Recomendador"
                                ></vue-single-select>
                            </div>
                            <div v-if="dateClient.valid" class="col-md-3 col-sm-12">
                                <base-button size="sm" class="col-12 mt-2" type="secondary">
                                    <span>Participación</span>
                                    <badge type="default">{{dateClient.partipation}}</badge>
                                </base-button>
                            </div>
                            <div v-if="dateClient.valid" class="col-md-3 col-sm-12">
                                <base-button size="sm" class="col-12 mt-2" type="secondary">
                                    <span>Recomendaciones</span>
                                    <badge type="default">{{dateClient.recommenders}}</badge>
                                </base-button>
                            </div>
                            <div v-if="dateClient.valid" class="col-md-3 col-sm-12">
                                <base-button size="sm" class="col-12 mt-2" type="secondary">
                                    <span>Ultima atención</span>
                                    <badge type="default">{{formatDate(dateClient.lastDate)}}</badge>
                                </base-button>
                            </div>
                            <div v-if="dateClient.valid" class="col-md-3 col-sm-12">
                                <base-button size="sm" class="col-12 mt-2" type="secondary">
                                    <span>Cliente desde</span>
                                    <badge type="default">{{formatDate(dateClient.date)}}</badge>
                                </base-button>
                            </div>
                            <div class="col-auto mx-auto mt-4">
                                <base-button  type="default" v-on:click="clientEdit" v-if="dateClient.valid && dateClient.valid2" class="col-12" icon="fas fa-edit">Editar cliente</base-button>
                                <base-button  type="default"  v-if="dateClient.valid && dateClient.valid2 != true" disabled class="col-12" icon="fas fa-edit">Editar cliente</base-button>
                                <base-button type="success" disabled v-if="dateClient.valid != true && dateClient.valid2 != true" class="col-12" icon="fas fa-user-plus">Registrar cliente</base-button>
                                <base-button type="success" v-on:click="newClient()" v-if="dateClient.valid != true && dateClient.valid2" class="col-12" icon="fas fa-user-plus">Registrar cliente</base-button>
                            </div>
                        </div>
                    </tab-content>
                </form-wizard>

                <!-- END WIZARD -->

            </card>
        </modal>
        <vue-custom-scrollbar class="calen" style="height:75vh;overflow:hidden;overflow-x: hidden;overflow-y:hidden">
            <vue-cal
                class="calen"
                :locale="locale"
                :events="events"
                :time-from="600"
                :time-to="1275"
                :time-step="15"
                active-view="month"
                :disable-views="['years', 'year', 'week']" 
                events-count-on-month-view
                :split-days="splitDays"
                @view-change="validatorLendersDaysSplit('view-change', $event)"
                :sticky-split-labels="stickySplitLabels"
                :on-event-click="onEventClick"
                :overlaps-per-time-step="true">
                <template v-slot:split-label="{ split }">
                    <img v-if="split.img != 'no'" class="avatar avatar-sm rounded-circle mr-2" :src="split.img" /> 
                    <img v-else class="avatar avatar-sm rounded-circle mr-2" src="https://www.w3schools.com/howto/img_avatar.png" /> 
                    <strong class="text-white" > {{ split.label }}</strong>
                </template>
            </vue-cal>
        </vue-custom-scrollbar>
        
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
                            <base-button class="mt-1 col-12" size="sm" type="secondary">
                                <span >Tipo de pago:</span>
                                <badge style="font-size:0.8em !important" class="text-default" type="success">{{selectedEvent.typepay}}</badge>
                            </base-button>
                            <base-button class="mt-1 col-12" size="sm" type="secondary">
                                <span class="text-success" v-if="dateData.discount.discount == true && dateData.discount.type == 'first'" >
                                    Lleva descuento (Primera atención)
                                    <i class="text-success p-1 ni ni-check-bold ni-1x aling-center"> </i>
                                </span>
                                <span class="text-success" v-if="dateData.discount.discount == true && dateData.discount.type == 'recomnd'" >
                                    Lleva descuento (Por recomendación)
                                    <i class="text-success p-1 ni ni-check-bold ni-1x aling-center"> </i>
                                </span>
                                <span class="text-danger" v-if="dateData.discount.discount == false && dateData.discount.type == 'none'" >
                                    No lleva descuento 
                                    <i class="text-danger p-1 ni ni-fat-remove ni-1x aling-center"> </i>
                                </span>
                            </base-button>
                            <dt class="mt-3 text-center">Confirmación de cita</dt>
                            <base-button v-if="selectedEvent.confirmation" class="mt-1 col-12" size="sm" type="success">
                                Confirmada
                            </base-button>
                            <base-button v-else class="mt-1 col-12" size="sm" type="default" v-on:click="sendConfirmation(selectedEvent.confirmationId, selectedEvent.cliente, selectedEvent.start, selectedEvent.end, selectedEvent.services, selectedEvent.empleada)">
                                Enviar confirmación
                            </base-button>
                            <base-button v-if="selectedEvent.typepay == 'Transferencia'" class="mt-1 col-12" size="sm" type="default">
                                <a :href="imgEndpoint+'/static/designs/'+selectedEvent.paypdf" target="_blank" download>Descargar comprobante</a>
                            </base-button>
                            <dt class="mt-3 text-center">Servicios</dt>  
                            <badge v-for="service of selectedEvent.services" class="mt-1 ml-1 text-default" type="primary">{{service.servicio}}</badge>
                            <hr/>
                            <dt class="text-center" style="margin-top:-10px;"><b>Imagen del diseño</b> <span v-if="selectedEvent.imageLength >= 3"> (Máximo 3)</span></dt>
                            <div class="row mt-1" v-if="selectedEvent.imageLength < 3">
                                <label class="col-md-8" for="file">{{nameFile}}</label>
                                <input type="file" id="file" ref="file" multiple v-on:change="handleFileUpload()" >
                                <button class="col-md-4 buttonUpload" v-on:click="uploadImageDesign(selectedEvent.id)">
                                    <b>Enviar</b>
                                </button>
                            </div>
                            <div v-if="selectedEvent.imageLength > 0" class="row mt-1">
                                <div class="col-md-12">
                                    <carousel :perPage="1" :autoplayHoverPause="true" :autoplay="true">
                                        <slide v-for="(images, index) of selectedEvent.image" class="imageHover">
                                            <img  class="w-100" style="height: 50vh !important;" :src="imgEndpoint+'/static/designs/'+images" alt="">
                                            <center>
                                                <base-button type="danger" class="mt-2" size="sm" v-on:click="deleteImage(selectedEvent.image, index, selectedEvent.id)">Eliminar imagen</base-button>
                                            </center>
                                        </slide>
                                    </carousel>
                                </div>
                            </div>
                        </tab-pane>
                        <tab-pane>
                            <span class="text-default" slot="title">
                                <i class="ni ni-chart-bar-32"></i>
                                Avanzados
                            </span>
                            <div class="row">
                                <div v-if="validRoute('agendamiento', 'editar')" v-on:click="dataEdit(selectedEvent.id, selectedEvent.start, selectedEvent.end, selectedEvent.services, selectedEvent.cliente, selectedEvent.empleada, selectedEvent.class)" class="col-md-6 mx-auto mt-2"><center>

                                   <base-button icon="fa fa-edit" class="mx-auto col-10" type="default">Editar</base-button> 
                                </center>
                                </div>
                                <template v-if="validRoute('agendamiento', 'finalizar')">
                                    <div v-if="selectedEvent.process == true" v-on:click="endDate(selectedEvent.id, selectedEvent.cliente, selectedEvent.empleada, selectedEvent.services)" class="col-md-6 mx-auto mt-2"><center>

                                        <base-button icon="fa fa-check-square" class="mx-auto col-10" type="default">Finalizar</base-button> 
                                    </center>
                                    </div>
                                </template>
                                <template v-if="validRoute('agendamiento', 'cerrar')">
                                    <div v-if="selectedEvent.process == true" v-on:click="closeDate(selectedEvent.id)" class="col-md-6 mx-auto mt-2"><center>

                                        <base-button icon="fa fa-times" class=" col-10 mx-auto" type="danger">Cerrar</base-button> 
                                    </center>
                                    </div>
                                </template>
                                
                                <div v-if="validRoute('agendamiento', 'eliminar')" v-on:click="deleteDate(selectedEvent.id)" class="col-md-6 mx-auto mt-2"><center>

                                   <base-button icon="fa fa-trash-alt" class=" col-10 mx-auto" type="danger">Borrar</base-button> 
                                </center>
                                </div>
                                <template v-if="validRoute('agendamiento', 'procesar')">
                                    <div v-if="selectedEvent.process == true" class="col-12 text-center mt-2">
                                        <base-button icon="fa fa-calendar-check" class=" col-10 mx-auto" type="success" v-on:click="processDate(selectedEvent.id, 'process')">Procesar</base-button> 
                                    </div>
                                </template>
                                
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
               <h6 slot="header" class="modal-title" id="modal-title-default"></h6>
            <card type="secondary" shadow
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-5 py-lg-5"
                  class="border-0">
                <div style="margin-top:-10% !important" class="text-center">
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
                                    @on-change="insertDateTwo"
                                    :config="configDatePickerEdit"
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
                <div class="form-group" style="margin-top:-20px;">
                    <label for="Montodiseño">Monto del diseño</label>
                    <currency-input
                    title="Monto de diseño"
                    v-model="designEndDate"
                    placeholder="Monto de diseño"
                    locale="de"
                    class="form-control mb-3"
                    />
                </div>
                <template v-for="servicesEnding of EndDateServices" >
                   <button v-if="servicesEnding.valid" :key="servicesEnding.name" v-on:click="discountServiceDate(servicesEnding.id, servicesEnding.index, servicesEnding.name)" type="button" class="btn btn-default btn-sm mr-1 mb-2">
                        <span>{{servicesEnding.name}}</span>
                        <span class="badge badge-primary text-white">X</span>
                    </button> 
                </template>
                <table class="table" v-bind:style="{ 'background-color': '#6BB2E5', 'border-radius' : '5px', 'border':'none !important'}" >
                    <thead>
                        <tr class="pt-2">
                            <th style="border-radius:5px !important;border:none" class="text-left pl-4 text-white pt-2">
                                
                                <input autocomplete="off" style="outline:none !important;background-color:white !important" type="text" id="myInput" v-on:keyup="myFunction()" class="inputFind" placeholder="Filtrar servicios"/>
                            </th>
                            <th style="color:white;border:none" class="text-center pl-5 pt-2">
                                Precio 
                            </th>
                        </tr>
                    </thead>
                </table>
                <vue-custom-scrollbar class="ListaProcesar">
                    <table class="table tableBg" id="myTable">
                        <tbody>
                            <tr v-for="(servicio, index) in services" >
                                <td style="border:none" v-if="servicio.active" class="font-weight-bold pt-1 pb-1">
                                    <base-button outline  size="sm" type="default" class="w-75 btn procesar text-left" v-on:click="conteoServicioDate(servicio._id,servicio.nombre, servicio.precio, servicio.comision, servicio.descuento, index)">
                                        {{servicio.nombre}} <span class="badge badge-dark conteoServ mt-1 float-right" :class="servicio._id" v-bind:id="index+servicio._id">0</span>
                                    </base-button>
                                    <base-button v-on:click="discountServiceDate(servicio._id, index, servicio.nombre)" outline size="sm" type="default" class="w-20 btn btn-back  text-left" >
                                        <font-awesome-icon icon="times"/>
                                    </base-button>
                                </td>
                                <td style="border:none" v-if="servicio.active" class="pt-2">
                                    <b class="mt-3">$ {{formatPrice(servicio.precio)}}</b>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </vue-custom-scrollbar>
                <div class="text-center">
                    <base-button v-if="serviciosSelecionadosDates.length > 0" v-on:click="endingDate()" class="mt-3" type="default">Finalizar</base-button>
                    <base-button v-else disabled class="mt-3" type="default">Finalizar</base-button>
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
                <vue-custom-scrollbar ref="table" class="listDatesEnd maxHeightEdit w-100">
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
                    <base-button icon="fa fa-calendar-check" v-on:click="ProccessSelectedDates()" class="col-auto mx-auto" type="success">Procesar</base-button> 
                </div>
            </card>
        </modal>
        <modal :show.sync="dateModals.modal5"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-xl">
            <h5 slot="header" class="modal-title" id="modal-title-notification">Pendiente por procesar</h5>
            <card  type="secondary" shadow
                  header-classes="bg-white pb-5"
                  body-classes=""
                  class="border-0">
                  <div v-on:click="noBlank">
                    <div class="row">
                        <div class="col-sm-12 tbCell">
                            <a-table :pagination="false"  :columns="columnsEndSelectedDates" size="middle" :data-source="selectedDates.closedArray">
                                <template slot="descuento" slot-scope="text, record, index">
                                    <a-tooltip placement="top">
                                        <template slot="title">
                                        <span v-if="discPerEmploye(index)">Su servicio no permite descuentos</span>
                                        <span v-else>Descuento</span>
                                        </template>
                                        <base-input 
                                            type="text"
                                            v-model="record.descuento"
                                            placeholder="%"
                                            :disabled="discPerEmploye(index)"
                                            v-on:click="cleanDiscount(index)"
                                            v-on:keyup="changePrice(index)"
                                            class="w-50 mt-3"
                                            
                                            >
                                        </base-input>
                                    </a-tooltip>
                                </template>
                                <template slot="diseño" slot-scope="text">
                                    <p>{{formatPrice(text)}} $ </p>
                                </template>
                                <template slot="total" slot-scope="text">
                                    <p>{{formatPrice(text)}} $</p>
                                </template>
                                <template slot="expandedRowRender" slot-scope="record">
                                    <div class="row">
                                        <dt>Servicio(s): </dt>
                                        <div  v-for="(service, index) of record.services" class="row ml-3" :key="service.servicio"> 
                                            <div v-if="index == 0">
                                                {{' '+service.servicio}}
                                            </div>
                                            <div v-else>
                                                , {{service.servicio}}
                                            </div>
                                        </div>
                                    </div>
                                    
                                </template>
                            </a-table>
                        </div>
                        
                        
                        
                        <div class="col-3 mx-auto mt-2">
                            <base-button type="secondary" class="col-12">
                                <span class="float-left">Total</span>
                                <badge v-if="loading == false" style="font-size:1em !important" class="text-default float-right"  type="success">{{this.formatPrice(selectedDates.total)}} $</badge>
                                <div v-else>
                                    <a-spin size="small" class="float-right" />
                                </div>
                            </base-button>
                        </div>
                        <div class="col-3 mx-auto mt-2">
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
                        <a-tooltip placement="top">
                            <template slot="title">
                            <span>Efectivo</span>
                            </template>
                            <div class="col-2">
                                <div class="input-group mb-2">
                                    <div v-on:click="hundredPorcent('efectivo')" v-on:mouseenter="hundredMouseOver('efectivo')" v-on:mouseleave="hundredMouseNonOver('efectivo')" class="input-group-prepend text-center w-25 hundred">
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
                        </a-tooltip>
                        <a-tooltip placement="top">
                            <template slot="title">
                            <span>Transferencia</span>
                            </template>
                            <div class="col-2">
                                <div  class="input-group mb-2">
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
                        </a-tooltip>
                        <a-tooltip placement="top">
                            <template slot="title">
                            <span>Otros</span>
                            </template>
                            <div class="col-2">
                                <div  class="input-group mb-2">
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
                        </a-tooltip>
                        <a-tooltip placement="top">
                            <template slot="title">
                            <span>Débito</span>
                            </template>
                            <div class="col-3">
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
                        </a-tooltip>
                        <a-tooltip placement="top">
                            <template slot="title">
                            <span>Crédito</span>
                            </template>
                            <div class="col-3">
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
                        </a-tooltip>
                        
                    </div>
                    <div class="text-center mt-">
                        <base-button icon="fa fa-calendar-check" v-on:click="processSelected" :disabled="loading" class="col-4 mx-auto" type="success">Procesar</base-button> 
                    </div>
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
  import io from 'socket.io-client';
  import { Carousel, Slide } from 'vue-carousel';
  //Back - End 
  import jwtDecode from 'jwt-decode'
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
        vueCustomScrollbar,
        Carousel,
        Slide
    },
    data() {
      return {
        imgEndpoint: endPoint.endpointTarget,
        auth:[],
        socket : io(endPoint.endpointTarget),
        status: localStorage.getItem('status'),
        countServices:[],
        employes:[],
        blockHour:[],
        blockHourEdit:[],
        finalDate:'',
        readyChange: false,
        validHour: false,
        getDay: 0,
        loading:false,
        arrayLendersSelect: [],
        registerDae: {
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
            end: '',
            valid: true
        },
        ifServices: false,
        validWizard: false,
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
        validHour: false,
        totalPrice: 0,
        modalsDialog: {
            modal2: false,
            type: '',
            icon: '',
            message: '', 
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
        dateFormat: 'd-m-Y',
        locale: Spanish, // locale for this instance only
        minDate: new Date(),         
        },
        configDatePickerEdit: {
            lowInput: true,
            dateFormat: 'm-d-Y',
            locale: Spanish, // locale for this instance only
            minDate: new Date(), 
        },
        dateData: {
        history:[],
        discount:{discount:false,type:'none'},
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
            discountBetter:[],
            employeDiscount:[],
            endDatesId:[],
            clientIds:[],
            ifrecomend:0
        },
        employeByDate: 'Filtrar por empleado', 
        clients:[],
        closedDates:[],
        employeShow:[],
        services:[],
        locale: 'es',
        filter: false,
        events: [],
        lender:"",
        imgLender:endPoint.imgEndpoint+localStorage.imageUser,
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
        categories: [],
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
        clientsNames:[],
        lengthClosedDates:0,
        file: '',
        nameFile:'Click aquí para cargar imagen',
        lenders: [],
        EndDateServices: [],
        loadingEnds:true,
        availableslenders: [],
        columnsEndSelectedDates: [
            
            { title: 'Empleado', dataIndex: 'employe', key: 'employe' },
            { title: 'Cliente', dataIndex: 'client', key: 'cliente' },
            { title: 'Diseño', dataIndex: 'design', key: 'design', scopedSlots: { customRender: 'diseño' } },
            
            { title: 'Descuento', dataIndex: 'descuento', key: 'descuento', scopedSlots: { customRender: 'descuento' } },
            { title: 'Total', dataIndex: 'total', key: 'total', scopedSlots: { customRender: 'total' } },
        ],
        stickySplitLabels: true,
        minCellWidth: 400,
        minSplitWidth: 0,
        splitDays: []
      };
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
        this.getToken()
        this.validatorLender()
        this.getClients()
        this.getServices()
        this.getUsers()
        this.getDates()
        this.getClosed()
        this.getCategories()
        this.getLenders()
        
    },
    destroyed () {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        getToken(){
            const token = localStorage.userToken
            const decoded = jwtDecode(token)  
            this.auth = decoded.access
        },
        async getLenders(){
            try{
                const Lenders = await axios.get(endPoint.endpointTarget+'/manicuristas') 
                this.lenders = Lenders.data 
                
                console.log(this.splitDays)
            }catch(err){
                console.log(err)
            }
        },
        logEvents(change, event){
            console.log(change)
            console.log(event)
        },
        validatorLendersDaysSplit(change, event){
            this.splitDays = []
            console.log(this.employeShow)
            if (event.view == 'day') {
                for (let index = 0; index < this.employeShow.length; index++) {
                    const name = this.employeShow[index];
                    const split = name.class.split('class')[1]
                    for (let j = 0; j < event.events.length; j++) {
                        const element = event.events[j]
                        if (element.empleada == name.name) {
                            this.splitDays.push({id: parseInt(split), class: name.class+'Split', label: name.name, img: name.img})
                            break
                        }
                    }
                }
                console.log(this.splitDays)
            }
        },
        validatorLender(){
            const token = localStorage.userToken
            const decoded = jwtDecode(token)
            const split = decoded.linkLender.split("/")
            this.lender = split[0]
            this.status = decoded.status
            
            console.log(this.lender)
        },
        handleScroll(event){
            if (event.target.documentElement.scrollTop > 140){
                $(".buttons").addClass("fixed-top")
            }
            else {
                $(".buttons").removeClass("fixed-top")
            }
        },
        validRoute(route, type){
            for (let index = 0; index < this.auth.length; index++) {
                const element = this.auth[index];
                if (element.ruta == route) {
                    for (let i = 0; i < element.validaciones.length; i++) {
                        if (type == element.validaciones[i]) { 
                            return true
                        } 
                    }
                }
            } 
        },
        getDates() {
            if (this.lender != '' && this.validRoute('agendamiento', 'todas') != true) {
                this.events = []
                axios.get(endPoint.endpointTarget+'/citas/' + this.lender)
                .then(res => {
                    for (let index = 0; index < res.data.length; index++) {
                        let dateNow = new Date(res.data[index].date)
                        let formatDate = dateNow.format('YYYY MM DD')+" "+res.data[index].start
                        let formatDateTwo = dateNow.format('YYYY MM DD')+" "+res.data[index].end
                        const split = res.data[index].class.split('class')[1]
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
                            process: res.data[index].process,
                            image: res.data[index].image,
                            imageLength: res.data[index].image.length,
                            confirmation: res.data[index].confirmation,
                            confirmationId: res.data[index].confirmationId,
                            type: res.data[index].type,
                            typepay: res.data[index].typepay,
                            paypdf: res.data[index].paypdf,
                            split: parseInt(split)
                        }
                        this.events.push(arrayEvents)
                    }
                })
            }else{
                this.events = []
                axios.get(endPoint.endpointTarget+'/citas')
                .then(res => {
                    for (let index = 0; index < res.data.length; index++) {
                    let dateNow = new Date(res.data[index].date)
                    let formatDate = dateNow.format('YYYY MM DD')+" "+res.data[index].start
                    let formatDateTwo = dateNow.format('YYYY MM DD')+" "+res.data[index].end
                    const split = res.data[index].class.split('class')[1]
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
                        process: res.data[index].process,
                        image: res.data[index].image,
                        imageLength: res.data[index].image.length,
                        confirmation: res.data[index].confirmation,
                        confirmationId: res.data[index].confirmationId,
                        type: res.data[index].type,
                        typepay: res.data[index].typepay,
                        paypdf: res.data[index].paypdf,
                        split: parseInt(split)
                    }
                    this.events.push(arrayEvents)
                    }
                })
            }
            
        },
        getClosed() {
            axios.get(endPoint.endpointTarget+'/citas/endingdates')
            .then(res => {
                this.closedDates = []
                this.lengthClosedDates = 0
                let date = new Date()
                let dates = date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()
                console.log(dates)
                console.log(res.data.length)
                for (let i = 0; i < res.data.length; i++) {
                    let dateF = new Date(res.data[i].date)
                    let datesF = (dateF.getDate())+"-"+(dateF.getMonth()+1)+"-"+dateF.getFullYear()
                    if (dates == datesF) {
                        this.closedDates.push(res.data[i])
                    }
                }
                console.log(this.closedDates)
                this.lengthClosedDates = this.closedDates.length
                this.loadingEnds = false
            })
        },
        getEmployes(){
  			axios.get(endPoint.endpointTarget+'/manicuristas')
  			.then(res => {
                this.employes = res.data
                var insp = false
                for (let index = 0; index < this.employes.length; index++) {
                    for (let i = 0; i < this.users.length; i++) {
                        console.log()
                        if (this.employes[index].nombre + " / " + this.employes[index].documento == this.users[i].linkLender && this.users[i].userImage.length > 1) {
                            this.employeShow.push({name:this.employes[index].nombre, img:endPoint.imgEndpoint+this.users[i].userImage,restDay:this.employes[index].restDay, restTime:this.employes[index].restTime, class:this.employes[index].class})
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
         async getCategories(){
            const categories = await axios.get(endPoint.endpointTarget+'/servicios/getCategory')
            if (categories.data.length > 0) {
                this.categories = categories.data
            }
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
        selectCat(cat){
            $('.categoryButton').css({'padding':'10px', 'background-color': '#d5dadd', 'color': '#434a54', 'box-shadow':'0px 0px 0px 0px rgba(0,0,0,0)'})
            $('#'+cat).css({'padding-top':'14px', 'background-color': '#174c8e', 'color': '#fff', '-webkit-box-shadow':'0px 9px 25px -7px rgba(0,0,0,0.75)', 'box-shadow':'0px 9px 25px -7px rgba(0,0,0,0.75)'})
        }, 
        plusService(index, service, time, comision, precio, lenders, discount){
            this.ifServices = true
            this.countServices[index].count++
            this.registerDae.duration = this.registerDae.duration + parseFloat(time)
            var lendersName = [{lender: 'Primera disponible', resTime: '', restDay: '', class: '', valid:true}]
            for (let indexThree = 0; indexThree < this.lenders.length; indexThree++) {
                for (let indexTwo = 0; indexTwo < lenders.length; indexTwo++) {
                    if (this.lenders[indexThree]._id == lenders[indexTwo]) {
                        lendersName.push({lender: this.lenders[indexThree].nombre, resTime: this.lenders[indexThree].restTime, restDay: this.lenders[indexThree].restDay, class: this.lenders[indexThree].class, valid: true})
                        break
                    }
                }  
            }
            
            this.registerDae.serviceSelectds.push({comision: comision, precio: precio, discount:discount, servicio: service, realLender:'', lender: 'Primera disponible', lenders: lendersName, start: '', end:'', sort: 0, duration: time, restTime: '', class: '', blocks: [],lenderSelectData: {}, valid: false, validAfter: false }) 
            this.validHour = false  
            this.totalPrice = parseFloat(this.totalPrice) + parseFloat(precio)
            
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
            this.readyChange = false
            this.validHour = false
            this.getDay = 0
            this.ifServices = false
            this.validWizard = false
            this.registerDae = {
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
                end: '',
                valid: true
            },
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
        sendConfirmationn(id, name, mail, start, end, services, lender){
            const nameFormat = name
            const contactFormat = mail
            const startFormat = start
            const endFormat = end
            const dateFormat = this.finalDate
            
            axios.post(endPoint.endpointTarget+'/citas/sendConfirmation/'+id, {
                name: nameFormat,
                contact: contactFormat,
                start: startFormat,
                end: endFormat,
                date: dateFormat,
                service: services,
                lenders: lender,
                payment: 'No especificado'
            })
            .then(res => {
                if (res.data.status == 'ok') {
                    
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        register(){
            var lenderFinal = ''
            var hourFinal = ''
            for (let index = 0; index < this.registerDae.serviceSelectds.length; index++) {
                const element = this.registerDae.serviceSelectds[index];
                if (index > 0){
                    lenderFinal = lenderFinal+' - '+element.realLender
                    hourFinal = hourFinal+' - '+element.start+'Hrs'
                }else{
                    lenderFinal = element.realLender
                    hourFinal = element.start+'Hrs'
                }
            }
            if (this.registerDate.client) {
                const User = {
                    name: this.dateClient.name,
                    mail: this.dateClient.id,
                    lastName: '',
                    phone: '',
                    pay: 'No especificado',
                    pdf: ''
                }
                axios.post(endPoint.endpointTarget+'/citas/noOneLender', {
                    dataDate: this.registerDae,
                    date: this.finalDate,
                    client: User,
                    pdf: 'not',
                    ifClient: false
                })
                .then(res => {
                    if (res.data.status == "cita creada") {
                        this.sendConfirmationn(res.data.id, User.name, User.mail, hourFinal, this.registerDae.serviceSelectds[0].end, this.registerDae.serviceSelectds, lenderFinal)
                        this.modals.modal1 = false
                        this.modalsDialog = {
                            modal2: true,
                            type: 'success',
                            icon: 'ni ni-check-bold ni-5x',
                            message: '¡Agendamiento exitoso!', 
                        }
                        this.getDates()
                        if (this.employeByDate != 'Filtrar por empleado') {
                            this.getCitasByEmploye()
                        }
                        axios.post(endPoint.endpointTarget+'/notifications', {
                            userName:localStorage.getItem('nombre') + " " + localStorage.getItem('apellido'),
                            userImage:localStorage.getItem('imageUser'),
                            detail:'Creo una cita',
                            link: 'agendamiento'
                        })
                        .then(res => {
                            this.socket.emit('sendNotification', res.data)
                        })
                        setTimeout(() => {
                            this.initialState()
                            this.modals.modal1 = true
                            this.modalsDialog = {
                                modal2: false,
                                type: '',
                                icon: '',
                                message: '', 
                            }
                        }, 1500);
                    }    
                }) 
            }else{
                this.registerDae.valid = false
            }
            
        },
        newClient(){
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
                        let formatDate = dateNow.format('YYYY MM DD')+" "+res.data[index].start
                        let formatDateTwo = dateNow.format('YYYY MM DD')+" "+res.data[index].end
                        const split = res.data[index].class.split('class')[1]
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
                            image: res.data[index].image,
                            imageLength: res.data[index].image.length,
                            confirmation: res.data[index].confirmation,
                            confirmationId: res.data[index].confirmationId,
                            type: res.data[index].type,
                            typepay: res.data[index].typepay,
                            paypdf: res.data[index].paypdf,
                            split: parseInt(split)
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
                
                this.getEmployes()
			})
			.catch(err => {
				this.$swal({
					type: 'error',
					title: 'Acceso invalido, ingrese de nuevo, si el problema persiste comuniquese con el proveedor del servicio',
					showConfirmButton: false,
					timer: 2500
				})
				router.push({name: 'login'})
			})
        },
        onEventClick(event, e){
            this.selectedEvent = event
            console.log(event)
            this.dateModals.modal1 = true
            const split = event.cliente.split('/')
            const splitTwo = split[1].split(' ')
            const splitThree = split[0].split(' ')
            axios.get(endPoint.endpointTarget+'/clients/dataDiscount/'+splitTwo[1])
            .then(res => {
                if (res.data[0].participacion == 0) {
                    this.dateData.discount.discount = true
                    this.dateData.discount.type = 'first'
                }
                else if(res.data[0].recomendaciones > 0) {
                    this.dateData.discount.discount = true
                    this.dateData.discount.type = 'recomnd'
                }else{
                    this.dateData.discount.discount = false
                    this.dateData.discount.type = 'none'
                }
                this.dateData.history = []
                this.dateData.history = res.data[0].historical
            })
            e.stopPropagation()
        },
        dateSplit(value){
            const date = new Date(value).format('DD MM YYYY')
            var formatDate = date.split(' ')
            return formatDate[0]+'-'+formatDate[1]+'-'+formatDate[2]
        },
        dateSplitHours(value){
            const date = new Date(value)
            var formatTime = date.getHours()+':'+date.getMinutes()  
            return formatTime
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
            const startFormat = new Date(start).format('YYYY-MM-DD HH:mm')
            const endFormat = new Date(end).format('YYYY-MM-DD HH:mm')
            this.dateModals.modal2 = true
            const Datedate = this.dateSplit(startFormat)
            this.changeDateEdit = false
            const startDate = this.dateSplitHours(startFormat)
            const endDate = this.dateSplitHours(endFormat)
            const separStart = startDate.split(':')
            const separEnd = endDate.split(':')
            const dateForPicker =  new Date(start).format('MM-DD-YYYY')
            const SumHours  = ((parseFloat(separEnd[0]) - parseFloat(separStart[0])) * 60)
            const SumMinutes = parseFloat(separEnd[1]) - parseFloat(separStart[1])
            const TotalMinutes = SumHours + SumMinutes
            console.log(dateForPicker)
            this.dateData.clientEdit = cliente
            this.dateData.fechaEdit = dateForPicker
            this.dateData.fechaEditPick = dateForPicker
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
            setTimeout(() => {
                if (this.dateData.fechaEditPick != null) {
                    this.blockHourEdit = []
                    axios.post(endPoint.endpointTarget+'/citas/getBlocks', {
                        employe: this.dateData.lenderEdit,
                        date: this.dateData.fechaEditPick,
                        time: this.dateData.duracionEdit,
                        resTime:this.dateData.resTimeFinalEdit
                    })
                    .then(res => {
                        console.log(res)
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
            }, 200);
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
            const entrada = this.dateData.startEdit
            axios.put(endPoint.endpointTarget+'/citas/editDate/'+this.dateData.dateEditId, {
            entrada: this.dateData.startEdit,
            salida: this.dateData.endEdit,
            sort: sort,
            fecha: this.dateData.fechaEditPick,
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
                this.dateModals.modal2 = false
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
            this.$refs.table.$children[0].unSelectAllItems()
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
                    discountBetter:[],
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
                    discountBetter:[],
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
            $('.inputFind').val('')
            this.myFunction()
            axios.get(endPoint.endpointTarget+'/servicios')
            .then(res => {
                this.EndDateServices = []
                for (let i = 0; i < res.data.length; i++) {
                    $(`.${res.data[i]._id}`).text(0)
                }
                for (let index = 0; index < services.length; index++) {
                    for (let indexTwo = 0; indexTwo < res.data.length; indexTwo++) {
                        if (services[index].servicio == res.data[indexTwo].nombre) {
                            let valSpan = $(`.${res.data[indexTwo]._id}`).text()
                            let sumaVal = parseFloat(valSpan) + 1
                            $(`.${res.data[indexTwo]._id}`).text(sumaVal)
                            this.EndDateServices.push({name: services[index].servicio, id: res.data[indexTwo]._id, index: indexTwo, valid: true})
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
            this.selectedDates.total = 0      
            for (let index = 0; index < this.selectedDates.closedArray.length; index++) {
                const position = this.selectedDates.closedArray[index]
                position.total = position.descuento > 0 ? position.total - (position.total / 100 * position.descuento) : position.total
                position.totalLocal = position.descuento > 0 ? position.totalLocal - (position.totalLocal / 100 * position.descuento) : position.totalLocal
                position.ifrecomend= position.descuento == 15 ? 1 : 0
                position.comision = position.descuento > 0 ? position.comision - (position.comision / 100 * position.descuento) : position.comision
            }
            for (let i = 0; i < this.selectedDates.closedArray.length; i++) {
                this.selectedDates.total = parseFloat(this.selectedDates.total) + parseFloat(this.selectedDates.closedArray[i].total)
                this.selectedDates.design = parseFloat(this.selectedDates.design) + this.selectedDates.closedArray[i].design
            }  
            this.selectedDates.total = parseFloat(this.selectedDates.total) + parseFloat(this.selectedDates.design)
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
                    arrayClosedDates:this.selectedDates.closedArray,
                    pagoEfectivo: this.payCash,
                    pagoOtros: this.payOthers,
                    pagoRedCDebito: this.payDebit,
                    pagoRedCCredito: this.payCredit,
                    pagoTransf: this.payTransfer,
                    
                })
                .then(res => {
                    if (res.data.status == "Venta registrada") {
                        this.initialDate()
                        this.dateModals.modal5 = false
                        this.modalsDialog = {
                            modal2: true,
                            message: "¡Venta procesada!",
                            icon: 'ni ni-check-bold ni-5x',
                            type: 'success'
                        }
                        this.getClosed()
                        axios.post(endPoint.endpointTarget+'/notifications', {
                            userName:localStorage.getItem('nombre') + " " + localStorage.getItem('apellido'),
                            userImage:localStorage.getItem('imageUser'),
                            detail:'Procesó citas finalizadas',
                            link: 'agendamiento'
                        })
                        .then(res => {
                            this.socket.emit('sendNotification', res.data)
                        })
                        setTimeout(() => {
                            this.modalsDialog = {
                                modal2: false,
                                message: "",
                                icon: '',
                                type: ''
                            }
                        }, 1500);
                    }
                    else if(res.data.status == "no-cash"){
							this.modalsDialog = {
                                modal2: true,
                                message: "Primero debe registrar un fondo de caja",
                                icon: 'ni ni-fat-remove ni-5x',
                                type: 'danger'
                            }
                            setTimeout(() => {
                                this.modalsDialog = {
                                    modal2: false,
                                    message: "",
                                    icon: '',
                                    type: ''
                                }
                            }, 1500);
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
            const conteo = $("#"+index+esto).text()
            const conteoTotal = parseFloat(conteo) + 1
            $("#"+index+esto).text(conteoTotal)
            const servicios = {'servicio': servicio, 'comision': comision, 'precio': precio, 'descuento': discount}
            this.serviciosSelecionadosDates.push(servicios)
            this.EndDateServices.push({name: servicio, id: esto, index: index,valid: true})
        },
        discountServiceDate(esto, index, nombre){
            const conteo = $("#"+index+esto).text()
            if (parseFloat(conteo) > 0) {
                const conteoTotal = parseFloat(conteo) - 1
                $("#"+index+esto).text(conteoTotal)
                for (let index = 0; index < this.serviciosSelecionadosDates.length; index++) {
                    if (this.serviciosSelecionadosDates[index].servicio == nombre) {
                        this.serviciosSelecionadosDates.splice(index, 1)
                        break
                    }
                }
                for (let i = 0; i < this.EndDateServices.length; i++) {
                    const element = this.EndDateServices[i];
                    if (element.name == nombre) {
                        element.valid = false
                    }
                }
            }
        },
        handleFileUpload(){
            const LengthImage = this.selectedEvent.image.length + this.$refs.file.files.length
            if (LengthImage > 3) {
                
            }else{
                this.file = this.$refs.file.files
                if (this.file.length == 3) {
                    this.nameFile = this.file[0].name+', '+this.file[1].name+', '+this.file[2].name
                }else if (this.file.length == 2) {
                    this.nameFile = this.file[0].name+', '+this.file[1].name
                }else{
                    this.nameFile = this.file[0].name
                }
            }            
        },
        uploadImageDesign(id){
            let formData = new FormData();
            for (let index = 0; index < this.file.length; index++) {
                const element = this.file[index];
                formData.append('image', this.file[index])
            }
            
            formData.append('imagePrev', this.selectedEvent.image)
            axios.put(endPoint.endpointTarget+'/citas/uploadDesign/'+id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            .then(res => {
                if (res.data.status == 'ok') {
                    this.selectedEvent.image = res.data.image
                    this.selectedEvent.imageLength = res.data.image.length
                    this.$refs.file = ''
                    this.nameFile = 'Click aquí para cargar imagen'
                }
            })
        },
        deleteImage(images, index, id){
            images.splice(index, 1)
            axios.put(endPoint.endpointTarget+'/citas/removeImage/'+id, {
                images: images
            })
            .then(res => {
                this.selectedEvent.image = images
                this.selectedEvent.imageLength = this.selectedEvent.imageLength - 1
            })
        },
        endingDate(){
            const id = this.endId
            console.log(this.designEndDate)
            if (this.designEndDate == null) {
                
                this.designEndDate = 0
            }
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
                    axios.post(endPoint.endpointTarget+'/notifications', {
                        userName:localStorage.getItem('nombre') + " " + localStorage.getItem('apellido'),
                        userImage:localStorage.getItem('imageUser'),
                        detail:'Finalizó una cita',
                        link: 'agendamiento'
                    })
                    .then(res => {
                        this.socket.emit('sendNotification', res.data)
                    })   
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
                ifrecomend:0
            }
            this.selectedDates.closedArray.push(selectArray)
            console.log(this.selectedDates.closedArray)
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
        scroll(){
            
        },
        myFunction() {
			var input, filter, table, tr, td, i, txtValue;
			input = document.getElementById("myInput");
			filter = input.value.toUpperCase();
			table = document.getElementById("myTable");
			tr = table.getElementsByTagName("tr");
			for (i = 0; i < tr.length; i++) {
			td = tr[i].getElementsByTagName("td")[0];
			if (td) {
				txtValue = td.textContent || td.innerText;
				if (txtValue.toUpperCase().indexOf(filter) > -1) {
				tr[i].style.display = "";
				} else {
				tr[i].style.display = "none";
				}
			}
			}
        },
        sendConfirmation(id, name, start, end, services, lender){
            
            const nameFormat = this.formatName(name)
            const contactFormat = this.formatContact(name)
            const startFormat = this.dateSplitHours(start)
            const endFormat = this.dateSplitHours(end)
            const dateFormat = this.dateSplit(start)
            axios.post(endPoint.endpointTarget+'/citas/sendConfirmation/'+id, {
                name: nameFormat,
                contact: contactFormat,
                start: startFormat,
                end: endFormat,
                date: dateFormat,
                service: services,
                lenders: lender,
                payment: 'No especificado'
            })
            .then(res => {
                if (res.data.status == 'ok') {
                    this.dateModals.modal1 = false
                    this.modalsDialog = {
                        modal2: true,
                        message: "Se envio el correo de confirmacion, satisfactoriamente",
                        icon: 'ni ni-check-bold ni-5x',
                        type: 'success'
                    }
                    setTimeout(() => {
                        this.modalsDialog = {
                            modal2: false,
                            message: "",
                            icon: '',
                            type: ''
                        }
                        this.dateModals.modal1 = true
                    }, 1500);
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        openCalendar(){
            setTimeout(() => {
                const split = this.registerDae.date.split('-')
                this.finalDate = split[1]+'-'+split[0]+'-'+split[2]
                const restDay = new Date(this.finalDate+' 10:00')
                this.getDay = restDay.getDay()
                if (this.readyChange) {
                    for (let index = 0; index < this.registerDae.serviceSelectds.length; index++) {
                        const element = this.registerDae.serviceSelectds[index];
                        element.start = ''
                        element.end = ''
                        element.sort = ''
                        element.blocks = []
                        element.valid = false
                    }
                    this.validHour = false
                    setTimeout(() => {
                        axios.get(endPoint.endpointTarget+'/citas/availableslenders/'+this.finalDate)
                        .then(res => {
                            console.log(res)
                            var counter = 0
                            var validCounter = false
                            for (let i = 0; i < res.data.array.length; i++) {
                                const element = res.data.array[i];
                                for (let j = 0; j <  this.registerDae.serviceSelectds[0].lenders.length; j++) {
                                    const elementTwo =  this.registerDae.serviceSelectds[0].lenders[j];
                                    if (element.name == elementTwo.lender) {
                                        counter = j
                                        validCounter = true
                                        break
                                    }
                                }
                                if (validCounter) {
                                    break
                                }
                            }
                            
                            if (validCounter) {
                                const finalLender = this.registerDae.serviceSelectds[0].lenders[counter].lender
                                const finalRestime = this.registerDae.serviceSelectds[0].lenders[counter].resTime
                                this.registerDae.serviceSelectds[0].class = this.registerDae.serviceSelectds[0].lenders[counter].class
                                
                                this.registerDae.serviceSelectds[0].valid = true
                                this.registerDae.serviceSelectds[0].realLender = finalLender
                                this.validMultiLender(0, finalLender, this.registerDae.serviceSelectds[0].duration, finalRestime)
                                this.readyChange = true
                            }else{
                                this.modals.modal1 = false
                                this.modalsDialog = {
                                    modal2: true,
                                    message: "No tenemos hay prestadores disponibles, para la fecha.",
                                    icon: 'ni ni-fat-remove ni-5x',
                                    type: 'danger'
                                }
                                setTimeout(() => {
                                    this.modals.modal1 = true
                                    this.modalsDialog = {
                                        modal2: true,
                                        message: "",
                                        icon: '',
                                        type: ''
                                    }
                                }, 3000);
                            }  
                        })
                    }, 200); 
                }else{
                    setTimeout(() => {
                        axios.get(endPoint.endpointTarget+'/citas/availableslenders/'+this.finalDate)
                        .then(res => {
                            for (let j = 0; j < 3; j++) {
                                for (let index = 0; index < res.data.array.length; index++) {
                                    const element = res.data.array[index];
                                    this.availableslenders.push(element)
                                }
                            }
                            var counter = 0
                            var validCounter = false
                            for (let i = 0; i < res.data.array.length; i++) {
                                const element = res.data.array[i];
                                for (let j = 0; j <  this.registerDae.serviceSelectds[0].lenders.length; j++) {
                                    const elementTwo =  this.registerDae.serviceSelectds[0].lenders[j];
                                    if (element.name == elementTwo.lender) {
                                        counter = j
                                        validCounter = true
                                        break
                                    }
                                }
                                if (validCounter) {
                                    break
                                }
                            }
                            
                            if (validCounter) {
                                const finalLender = this.registerDae.serviceSelectds[0].lenders[counter].lender
                                const finalRestime = this.registerDae.serviceSelectds[0].lenders[counter].resTime
                                this.registerDae.serviceSelectds[0].class = this.registerDae.serviceSelectds[0].lenders[counter].class
                                
                                this.registerDae.serviceSelectds[0].valid = true
                                this.registerDae.serviceSelectds[0].realLender = finalLender
                                this.validMultiLender(0, finalLender, this.registerDae.serviceSelectds[0].duration, finalRestime)
                                this.readyChange = true
                            }else{
                                this.modals.modal1 = false
                                this.modalsDialog = {
                                    modal2: true,
                                    message: "No tenemos hay prestadores disponibles, para la fecha.",
                                    icon: 'ni ni-fat-remove ni-5x',
                                    type: 'danger'
                                }
                                setTimeout(() => {
                                    this.modals.modal1 = true
                                    this.modalsDialog = {
                                        modal2: true,
                                        message: "",
                                        icon: '',
                                        type: ''
                                    }
                                }, 3000);
                            }
                        })
                    }, 200); 
                }
            }, 200);
        },
        validMultiLender(index, lender, time, resTime, check){
            $('#'+check).removeClass('fa-check')
            this.registerDae.employeSelect = ''
            this.validSchedule = false
            this.noOneLender = true
            
            this.selectHourService(index, lender, time, resTime)
        },
        selectHourService(index, lender, time, resTime){
           
            const finalTime =  this.registerDae.design == 'si' ? time + 15 : time
            this.registerDae.serviceSelectds[index].lenderSelectData = {
                employe: lender,
                date: this.finalDate,
                time: finalTime,
                resTime: resTime,
                index: index
            }

            axios.post(endPoint.endpointTarget+'/citas/getBlocks', this.registerDae.serviceSelectds[index].lenderSelectData)
            .then(res => { 
                if (this.registerDae.serviceSelectds[index].validAfter) {
                    for (let j = index + 1; j < this.registerDae.serviceSelectds.length; j++) {
                        const element = this.registerDae.serviceSelectds[j];
                        element.start = ''
                        element.end = ''
                        element.sort = ''
                        element.realLender = ''
                        element.blocks = []
                        element.restTime = ''
                        element.class = ''
                        element.valid = false
                        this.arrayLendersSelect = []
                    } 
                }
                // var editBlock = false
                // var indexEdit = 0
                // if (index > 0) {
                //     for (let i = 0; i < this.arrayLendersSelect.length; i++) {
                //         const element = this.arrayLendersSelect[i];
                //         if (element.lender == lender) {
                            
                            
                //         }
                //     }
                // }
                var editBlock = false
                var indexEdit = 0
                const q = index - 1 
                for (let j = 0; j <= q; j++) {
                    const element = this.registerDae.serviceSelectds[j];
                    
                    if (element.realLender == lender) {
                        editBlock = true
                        indexEdit = j
                    }
                }
                if (editBlock) {
                    
                    this.registerDae.serviceSelectds[index].blocks = this.registerDae.serviceSelectds[indexEdit].blocks
                    axios.post(endPoint.endpointTarget+'/citas/editBlocks', {
                        array: this.registerDae.serviceSelectds[index].blocks,
                        time: parseFloat(time)
                    })
                    .then(res => {
                        this.arrayLendersSelect.push({index: index, lender: lender}) 
                        this.registerDae.serviceSelectds[index].blocks = res.data
                        this.registerDae.serviceSelectds[index].validAfter = true
                    })
                }else{
                    this.registerDae.serviceSelectds[index].blocks = res.data
                    this.arrayLendersSelect.push({index: index, lender: lender}) 
                   
                    this.registerDae.serviceSelectds[index].validAfter = true
                }
                
                
            })
            .catch(err => { console.log(err) })
        },
        selectBloqMulti(hora, i, indexService, open, check){
            setTimeout(() => {
                $('#'+open).toggle('slow')
            }, 500);
            
            var sortSp = this.registerDae.serviceSelectds[indexService].blocks[i].Horario.split(":") 
            this.registerDae.serviceSelectds[indexService].start = this.registerDae.serviceSelectds[indexService].blocks[i].Horario
            this.registerDae.serviceSelectds[indexService].sort = sortSp[0]+sortSp[1]
            
            axios.post(endPoint.endpointTarget+'/citas/getBlocks', this.registerDae.serviceSelectds[indexService].lenderSelectData)
            .then(res => {
                console.log(res)
                var editBlock = false
                if (indexService > 0) {
                    for (let i = 0; i < this.arrayLendersSelect.length; i++) {
                        const element = this.arrayLendersSelect[i];
                        if (element.lender == this.registerDae.serviceSelectds[indexService].realLender) {
                            editBlock = true
                        }
                    }
                }
                if (editBlock) {
                    
                    axios.post(endPoint.endpointTarget+'/citas/editBlocks', {
                        array: this.registerDae.serviceSelectds[indexService].blocks,
                        time: this.registerDae.serviceSelectds[indexService].lenderSelectData.time
                    })
                    .then(res => {
                        for (let index = 0 ; index <= this.registerDae.serviceSelectds[indexService].lenderSelectData.time / 15; index++) {
                            res.data[i].validator = 'select'
                            this.registerDae.serviceSelectds[indexService].end = res.data[i].Horario
                            i++
                        }
                        this.registerDae.serviceSelectds[indexService].blocks = res.data
                        var valid = 0 
                        for (let index = 0; index < this.registerDae.serviceSelectds.length; index++) {
                            const element = this.registerDae.serviceSelectds[index];
                            
                            if (element.start == "") {
                                valid = 1
                            }
                        }
                        if (valid == 0) {
                            this.validHour = true
                        }
                        $('#'+check).addClass('fa-check')
                    })
                }else{
                    
                    for (let index = 0 ; index <= this.registerDae.serviceSelectds[indexService].lenderSelectData.time / 15; index++) {
                        res.data[i].validator = 'select'
                        this.registerDae.serviceSelectds[indexService].end = res.data[i].Horario
                        i++
                    }
                    this.registerDae.serviceSelectds[indexService].blocks = res.data
                    this.blockHour = res.data
                    var valid = 0 
                    for (let index = 0; index < this.registerDae.serviceSelectds.length; index++) {
                        const element = this.registerDae.serviceSelectds[index];
                        
                        if (element.start == "") {
                            valid = 1
                        }
                    }
                    if (valid == 0) {
                        this.validHour = true
                    }
                    this.registerDae.serviceSelectds[indexService].blocks = res.data
                    $('#'+check).addClass('fa-check')
                }
                
                const finalIndex = parseFloat(indexService) + parseFloat(1)
                if (this.registerDae.serviceSelectds[finalIndex]) {
                    this.registerDae.serviceSelectds[finalIndex].valid = true
                    var counter = 0
                    var validCounter = false
                    for (let i = finalIndex; i < this.availableslenders.length; i++) {
                        const element = this.availableslenders[i];
                        for (let j = 0; j <  this.registerDae.serviceSelectds[finalIndex].lenders.length; j++) {
                            const elementTwo =  this.registerDae.serviceSelectds[finalIndex].lenders[j];
                            if (element.name == elementTwo.lender) {
                                counter = j
                                validCounter = true
                                break
                            }
                        }
                        if (validCounter) {
                            break
                        }
                    }
                    const finalLender = this.registerDae.serviceSelectds[finalIndex].lenders[counter].lender
                    const finalRestime = this.registerDae.serviceSelectds[finalIndex].lenders[counter].resTime
                    this.registerDae.serviceSelectds[finalIndex].class = this.registerDae.serviceSelectds[finalIndex].lenders[counter].class
                    this.registerDae.serviceSelectds[finalIndex].realLender = finalLender
                    this.validMultiLender(finalIndex, finalLender, this.registerDae.serviceSelectds[finalIndex].duration, finalRestime)
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        insertData(index, lender, restTime, Class, duration, check, lenders){
            if (lender == 'Primera disponible') {
                var lenderSelect = ''
                var validCounter = false
                for (let j = index; j < this.availableslenders.length; j++) {
                    const element = this.availableslenders[j];
                    for (let x = 0; x < lenders.length; x++) {
                        const elementTwo = lenders[x];
                        if (element.name == elementTwo.lender) {
                            lenderSelect = x
                            validCounter = true
                            break
                        }
                    }
                    if (validCounter) {
                        break
                    }
                }
                if (lenderSelect == '') {
                    for (let j = 0; j < this.availableslenders.length; j++) {
                        const element = this.availableslenders[j];
                        for (let x = 0; x < lenders.length; x++) {
                            const elementTwo = lenders[x];
                            if (element.name == elementTwo.lender) {
                                lenderSelect = x
                            }
                        }
                    }
                    this.registerDae.serviceSelectds[index].start = ''
                    this.registerDae.serviceSelectds[index].end = ''
                    this.registerDae.serviceSelectds[index].lender = 'Primera disponible'
                    this.registerDae.serviceSelectds[index].realLender = lenders[lenderSelect].lender
                    this.registerDae.serviceSelectds[index].restTime = lenders[lenderSelect].resTime
                    this.registerDae.serviceSelectds[index].class = lenders[lenderSelect].class
                    this.validHour = false 
                    this.validMultiLender(index, lenders[lenderSelect].lender, duration, lenders[lenderSelect].resTime, check)
                }else{
                    this.registerDae.serviceSelectds[index].start = ''
                    this.registerDae.serviceSelectds[index].end = ''
                    this.registerDae.serviceSelectds[index].lender = 'Primera disponible'
                    this.registerDae.serviceSelectds[index].realLender = lenders[lenderSelect].lender
                    this.registerDae.serviceSelectds[index].restTime = lenders[lenderSelect].resTime
                    this.registerDae.serviceSelectds[index].class = lenders[lenderSelect].class
                    this.validHour = false 
                    this.validMultiLender(index, lenders[lenderSelect].lender, duration, lenders[lenderSelect].resTime, check)
                }
            }else{
                this.registerDae.serviceSelectds[index].start = ''
                this.registerDae.serviceSelectds[index].end = ''
                this.registerDae.serviceSelectds[index].lender = lender
                this.registerDae.serviceSelectds[index].realLender = lender
                this.registerDae.serviceSelectds[index].restTime = restTime
                this.registerDae.serviceSelectds[index].class = Class
                this.validHour = false 
                this.validMultiLender(index, lender, duration, restTime, check) 
            }
        },
        openBlocks(open){
            $('#'+open).toggle('slow')
        },
        validateFirstStep() {
            if (this.registerDae.design != 'nada' && this.ifServices) {
                this.validWizard = true
                if (this.registerDae.date != '') {
                    for (let index = 0; index < this.registerDae.serviceSelectds.length; index++) {
                        const element = this.registerDae.serviceSelectds[index];
                            if (element.valid == false) {
                                element.valid = true
                                this.insertData(index, 'Primera disponible', '', '', element.duration, 'check'+index, element.lenders)
                                break
                            }
                    }
                }
                this.registerDae.valid = true
                return this.ifServices
            }else{
                this.registerDae.valid = false
                return false
            }
            
        },
        validateLastStep() {
            
            if (this.validHour) {
                this.validWizard = true
                this.registerDae.valid = true
                return this.validHour
            }else{
                this.validWizard = false
                this.registerDae.valid = false
                return this.validHour
            }
            
        },
        changeDiscount(i){
            

            
        },
        changePrice(pos){
            
            this.loading = true
            let discount = this.selectedDates.closedArray[pos].descuento
            this.selectedDates.closedArray[pos].comision = 0
            this.selectedDates.design = 0
            let design = this.selectedDates.closedArray[pos].design
            
            this.selectedDates.closedArray[pos].total = 0
            this.selectedDates.total = 0
            for (let index = 0; index < this.selectedDates.closedArray[pos].services.length; index++) {
                
                if (!this.selectedDates.closedArray[pos].services[index].descuento) {
                        
                        if (discount == 0) {
                            this.selectedDates.closedArray[pos].total = parseFloat(this.selectedDates.closedArray[pos].total) + parseFloat(this.selectedDates.closedArray[pos].services[index].precio)
                        }
                        else{
                            const descuento = parseFloat(discount) / 100
                        
                            const porcentaje = 1 - parseFloat(descuento)
                            
                            const precioConDescuento = parseFloat(this.selectedDates.closedArray[pos].services[index].precio) * parseFloat(porcentaje)
                            const comision = (parseFloat(this.selectedDates.closedArray[pos].services[index].comision) * parseFloat(precioConDescuento)) / 100
                            this.selectedDates.closedArray[pos].comision = parseFloat(this.selectedDates.closedArray[pos].comision) + parseFloat(comision)
                    
                            this.selectedDates.closedArray[pos].total = parseFloat(this.selectedDates.closedArray[pos].total) + parseFloat(precioConDescuento) 
                        }
                }
                else{ 
                    this.selectedDates.closedArray[pos].total = parseFloat(this.selectedDates.closedArray[pos].total) + parseFloat(this.selectedDates.closedArray[pos].services[index].precio)
                }
                
            } 
            this.selectedDates.closedArray[pos].total = parseFloat(this.selectedDates.closedArray[pos].total) + parseFloat(design)
            for (let i = 0; i < this.selectedDates.closedArray.length; i++) {
                this.selectedDates.total = parseFloat(this.selectedDates.total) + parseFloat(this.selectedDates.closedArray[i].total)
                this.selectedDates.design = parseFloat(this.selectedDates.design) + this.selectedDates.closedArray[i].design
            }
            
            
            this.selectedDates.total = parseFloat(this.selectedDates.total) + parseFloat(this.selectedDates.design)
            this.loading = false
        },
        cleanDiscount(i){
            setTimeout(() => {
                if (this.selectedDates.closedArray[i].descuento == 0) {
                    this.selectedDates.closedArray[i].descuento = ''
                }
            }, 100);
            
        },
        noBlank(){
            
            if (this.loading == true) {
                this.loading = false
            }
            for (let d = 0; d < this.selectedDates.closedArray.length; d++) {
                if (this.selectedDates.closedArray[d].descuento == '') {
                    this.selectedDates.closedArray[d].descuento = 0
                }
            }
        },
        noCero(){
            this.loading = true
        },
        discPerEmploye(employe){
            let valid = true
            for (let index = 0; index < this.selectedDates.closedArray[employe].services.length; index++) {
                if (this.selectedDates.closedArray[employe].services[index].descuento == false ) {
                    valid = false
                }
                
            }
            return valid
        }
    },
    computed: {
        ifSticky: () => {
            
            return this.$refs.aggend
        }
    },
    mounted (){
        EventBus.$on('reloadDates', status => {
            this.getDates()
        })
        this.socket.on('notify', (data) => {
            this.getClosed()
        });
    }
  };
</script>
<style>
    .dropAgend .dropdown-menu{
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
    .vuecal__split-days-headers{
        height: 3em !important;
    }
    .day-split-header {
        background-color: #0b4fa4;
        padding-top:10px;
        padding-bottom: 10px;
    }
    .vuecal__cell--selected{
        z-index: 0 !important;
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
        width: 19px;
        min-width: 0;
        height: 17px;
        padding: 2px;
        font-size: 12px;
        background-color: #172b4d; 
    }
    .vuecal__header{background-color: rgba(238, 238, 238, 0.623);border-radius: 5px 5px 0 0;}
    .vuecal__cell.today div .vuecal__cell-events-count, .vuecal__cell.current {background-color: #353535 !important;}
    .vuecal:not(.vuecal--day-view) .vuecal__cell.selected {background-color: rgba(235, 255, 245, 0.4);}
    .vuecal__cell.selected:before {border-color: rgba(66, 185, 131, 0.5);}
    .vuecal__cell-date{color:#000;font-family: 'Raleway', sans-serif;
    font-weight:600;}
    .vuecal__heading span{color:#000;font-family: 'Raleway', sans-serif;
    font-weight:600;}
    .vuecal--green-theme .vuecal__title-bar {
        background-color: #1F5673;
    }
    .vuecal__time-column .vuecal__time-cell{
        color: #0F2027
    }
    .vuecal__cell-split.class1Split {background-color: rgba(234, 197, 190, 0.6);}
    .vuecal__cell-split.class2Split {background-color: rgb(188, 209, 255, 0.6);}
    .vuecal__cell-split.class3Split {background-color: rgb(221, 239, 189, 0.6);}
    .vuecal__cell-split.class4Split {background-color: rgb(205, 242, 226, 0.6);}
    .vuecal__cell-split.class5Split {background-color: rgb(183, 232, 205, 0.6);}
    .vuecal__cell-split.class6Split {background-color: rgb(192, 229, 221, 0.6);}
    .vuecal__cell-split.class7Split {background-color: rgb(242, 230, 230, 0.6);}
    .vuecal__cell-split.class8Split {background-color: rgb(255, 214, 214, 0.6);}
    .vuecal__cell-split.class9Split {background-color: rgb(255, 209, 186, 0.6);}
    .vuecal__cell-split.class10Split {background-color: rgb(255, 243, 181, 0.6);}
    .class1 {
        background:#EAC5BE;
        border: 1px solid #EAC5BE;
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
   
    .vue-form-wizard .wizard-btn{
        min-width: 130px !important;
    }
    .fixed-top{
        margin-left:30%;
    }
    .fixed-top .drop{
        flex: 0 0 30% !important;
    }
    .calen::-webkit-scrollbar {
        width: 8px !important;     /* Tamaño del scroll en vertical */
        height: 8px !important;    /* Tamaño del scroll en horizontal */
        display: none !important;  /* Ocultar scroll */
    }
    .form-control{
        color: #2F2F2F !important;
    }
    .inputFind{
        padding: 2px 10px;
        border:none;
        border-radius: 5px;
        margin-top:-5px;
        font-size: .8rem;
    }
    #file {
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
    }
    label[for="file"] {
        font-size: 12px;
        font-weight: 600;
        color: #fff;
        background-color: #172b4d;
        display: inline-block;
        transition: all .5s;
        cursor: pointer;
        padding: 10px !important;
        text-transform: uppercase;
        width: 100%;
        text-align: center;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
    }
    .hoverDelete:hover{
        opacity: .8;
        cursor: pointer;
    }
    .buttonUpload{
        border:none;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        color:#fff;
        background-color: #2dce89;
        height: 38px !important;
    }
</style>
