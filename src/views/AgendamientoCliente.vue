<template>
    <div class="font">
        <nav class="headerStyles" id="upView">  
            <div class="borderImageBrand">
                <img src="img/brand/logokk.png" class="imageBrand" alt="" >
            </div>
        </nav>
        <div class="container-fluid" style="margin-top:8rem;">
            <card shadow>
                <form-wizard @on-complete="finalFunction" color="#174c8e" back-button-text="Atras" next-button-text="Siguiente" finish-button-text="¡Agendar!"> 
                    <h2 v-if="validWizard" slot="title">Datos de agendamiento </h2>
                    <h2 v-else slot="title" class="text-danger">¡Debe completar los datos!</h2>
                    <tab-content title="Servicios" icon="fa fa-layer-group" :before-change="validateFirstStep" >
                        <div class="row">
                            <div class="showDevice col-md-12 row">
                                <div style="width:auto;" class="mx-auto" >
                                    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                        <li v-for="(category, index) of categories" :key="category._id" class="nav-item responsiveItem" role="presentation">
                                            <button class="categoryButton text-uppercase responsiveItem" :id="'cat'+index" data-toggle="pill" :href="'#v-pills-'+category._id" role="tab" aria-controls="v-pills-home" aria-selected="true" v-on:click="selectCat('cat'+index)">{{category.name}}</button>
                                        </li>
                                    </ul>   
                                </div>
                                <div class="col-md-12">
                                    <div class="tab-content" id="pills-tabContent">
                                        <div v-for="category of categories" :key="category._id" class="tab-pane fade " :id="'v-pills-'+category._id" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                            <div class="row mt-2">
                                                <div v-for="(service, index) of services" :key="service" class="col-xl-3 col-md-6 px-4" v-if="service.category == category.name && service.active == true">
                                                    <div class="card-service row mt-2" :id="'cardS'+index">
                                                        <h3 class="name-service"> {{service.nombre}}</h3>
                                                        <div class="col-12"><img src="img/brand/calendar.png" alt=""></div>
                                                        
                                                        <div class="col-md-6 col-sm-12 mt-4" style="padding: 0px !important;padding-top: 5px !important;">
                                                            <div class="price-service ">{{formatPrice(service.precio)}} $</div> 
                                                        </div>
                                                        <div class="col-md-6 col-sm-12 mt-4" style="padding: 0px !important;margin-top:-5px;">
                                                            
                                                            <div class="button-service-group">
                                                                <button class="button-service-left" ><i class="fa fa-minus" v-on:click="lessService(index, service.nombre, service.tiempo, 'cardS'+index, service.precio)"></i></button>
                                                                <span class="span-button-service">{{serviceCount[index].count}}</span>
                                                                <button class="button-service-right" 
                                                                v-on:click="plusService(index, service.nombre, service.tiempo, service.comision, service.precio, service.prestadores, 'cardS'+index)"
                                                                ><i class="fa fa-plus"></i></button>
                                                            </div>
                                                            
                                                        </div>  
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            <div class="showPhone col-md-12">
                                <base-dropdown class="w-100 mx-auto mb-3 styleDropdown">
                                    <base-button style="border-radius:14px;background-color:#d5dadd;color:#1c2021;border:none;" slot="title" type="default" class="dropdown-toggle w-100">
                                        {{CatSelected}}
                                    </base-button>
                                    <b v-for="category of categories" :key="category._id" v-on:click="selectCategoryPhone(category.name)" class="dropdown-item w-100" style="color:#fff;"> {{category.name}} </b>
                                </base-dropdown>
                                <base-dropdown class="w-100 mx-auto styleDropdown" v-if="servicesPhoneShow">
                                    <base-button style="border-radius:14px;background-color:#d5dadd;color:#1c2021;border:none;" slot="title" type="default" class="dropdown-toggle w-100">
                                        Servicios 
                                    </base-button>
                                    <b v-for="service of servicesCat" :key="service" v-on:click="selectServicePhone(service._id)" v-if="service.active == true" class="dropdown-item w-100" style="color:#fff;"> {{service.nombre}} </b>
                                </base-dropdown>
                                <div v-if="validObject()">
                                    <div v-for="(service, index) of serviceSelected" :key="service" class="w-100 mx-auto">
                                        <div class="card-service row m-0 mt-2" :id="'cardSP'+index">
                                            <h3 class="name-service"> {{service.nombre}}</h3>
                                            <div class="col-12"><img src="img/brand/calendar.png" alt=""></div>
                                            
                                            <div class="col-6 mt-4" style="padding: 0px !important;padding-top: 5px !important;">
                                                <div class="price-service ">{{formatPrice(service.precio)}} $</div> 
                                            </div>
                                            <div class="col-6 mt-4" style="padding: 0px !important;margin-top:-5px;">
                                                
                                                <div class="button-service-group">
                                                    <button class="button-service-left" ><i class="fa fa-minus" v-on:click="lessServicePhone(index, service.nombre, service.tiempo, 'cardSP'+index, service.precio)"></i></button>
                                                    <span class="span-button-service">{{servicePhoneCount[index].count}}</span>
                                                    <button class="button-service-right" 
                                                    v-on:click="plusServicePhone(index, service.nombre, service.tiempo, service.comision, service.precio, service.prestadores, 'cardSP'+index)"
                                                    ><i class="fa fa-plus"></i></button>
                                                </div>
                                                
                                            </div>  
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="mx-auto mt-3">
                                <h2 style="font-weight:500;color:#090909;">¿Se realizará un diseño?</h2> 
                                <div class="ml-1">
                                    <span class="ml-5 font-weight-bold spanSelect" style="color:#090909;" id="yes" v-on:click="selectDesign('first')">Sí</span>
                                    <span class="ml-5 font-weight-bold spanSelect" style="color:#090909;" id="not" v-on:click="selectDesign('second')">No</span>
                                </div>
                            </div>
                            <div class="w-100 mt-2">
                                <h4 class="text-center"><b style="color:red;font-weight:600;">¡Atención!</b> El costo del servicio no incluye diseños, estos tienen un valor adicional <br> y será indicado por la profesionales durante la atención.</h4>
                            </div>
                            
                        </div>
                    </tab-content>
                    <tab-content title="Profesionales" icon="fa fa-users" :before-change="validateLastStep">
                        <div class="row">
                            <div class="col-md-4" style="margin-top:16px;">
                                <div class="w-75 mx-auto" >
                                    <h4 class="text-center text-uppercase">Fechas disponibles</h4>
                                    <base-input addon-left-icon="ni ni-calendar-grid-58 clickCalendar" v-model="dates.simple" v-on:change="openCalendar" style="cursor:pointer;" >
                                        <flat-picker 
                                                @on-change="openCalendar"
                                                slot-scope="{focus, blur}"
                                                @on-open="focus"
                                                @on-close="blur"
                                                :config="configDate"
                                                placeholder="Seleccione una fecha" 
                                                class="form-control date-client datepicker pl-3"
                                                aria-placeholder="Seleccione una fecha"
                                                v-model="dates.simple">
                                        </flat-picker>
                                    </base-input>
                                    
                                </div>
                            </div>
                            <div class="col-md-8">
                                <div class="row mb-3">
                                    <div class="col-12 text-center mt-2" v-for="(servicesSelect, indexService) of registerDate.serviceSelectds" :key="servicesSelect">
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
                                    <div class="card-services-information col-lg-6" v-for="(data, index) in registerDate.serviceSelectds" :key="data">
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
                                <base-dropdown class="mt-1 responsiveButtonsPercent mx-auto styleDropdown">
                                    <base-button slot="title" type="default" class="dropdown-toggle w-100 dropdownPay" style="border-radius:14px;background-color:#d5dadd;color:#1c2021;border:none;">
                                        Tipo de pago
                                    </base-button>
                                    <b class="dropdown-item w-100" style="color:#fff;" v-on:click="selectPay('Presencial efectivo')">Presencial efectivo</b>
                                    <b class="dropdown-item w-100" style="color:#fff;" v-on:click="selectPay('Presencial Débito')">Presencial Débito</b>
                                    <b class="dropdown-item w-100" style="color:#fff;" v-on:click="selectPay('Presencial Crédito')">Presencial Crédito</b>
                                    <b class="dropdown-item w-100" style="color:#fff;" v-on:click="selectPay('Transferencia')">Transferencia</b>
                                    <!-- <b class="dropdown-item w-100" style="color:#32325d;" v-on:click="selectPay('WebPay')">WebPay</b>  -->
                                </base-dropdown><br>
                                <base-button class="mt-3 responsiveButtonsPercent mx-auto" type="secondary" style="border-radius:14px;background-color:#d5dadd;color:#1c2021;border:none;">
                                Fecha: <strong>{{dates.simple}}</strong>
                                </base-button><br>
                                <base-button class="mt-3 responsiveButtonsPercent mx-auto" type="secondary" style="border-radius:14px;background-color:#d5dadd;color:#1c2021;border:none;">
                                    Diseño: <strong class="text-uppercase">{{registerDate.design}}</strong>
                                </base-button><br>
                                <base-button class="mt-3 responsiveButtonsPercent mx-auto" type="secondary" style="border-radius:14px;background-color:#d5dadd;color:#1c2021;border:none;">
                                    Hora de inicio: <strong v-if="registerDate.serviceSelectds[0]">{{registerDate.serviceSelectds[0].start}}</strong>
                                </base-button><br>
                                <base-button class="mt-3 responsiveButtonsPercent mx-auto" type="secondary" style="border-radius:14px;background-color:#d5dadd;color:#1c2021;border:none;">
                                    Total: <strong class="text-uppercase">$ {{formatPrice(totalPrice)}}</strong>
                                </base-button>
                                
                                </center><br>
                            </div>
                        </div>
                    </tab-content>
                </form-wizard>
            </card>
        </div>
        <nav class="navbar navbar-expand-lg navbar-light bg-Secondary row m-0 p-0">
            <div  id="navbarTogglerDemo01" class="mx-auto col-6 m-0">
               <a href="https://syswa.net">
                    <img src="img/brand/syswa-gestion.png" class="logoSyswaFooter" alt="" style="">
                </a>
            </div>
            <span class="navbar-text col-6 m-0" style="float: right !important;">
                © {{year}} | <a href="https://www.syswa.com" class="font-weight-bold ml-1" target="_blank">SYSWA</a> Todos los derechos reservados
            </span>
        </nav>
        <modal :show.sync="modals.modal2"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-lg">
               <h6 slot="header" class="modal-title" id="modal-title-default"></h6>
            <card type="secondary" shadow
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-4 py-lg-4"
                  class="border-0">
                <template>
                    <div class="text-muted text-center mb-3">
                        <h3>Formulario de compra</h3>
                    </div>
                </template>
                <template>
                    <form role="form">
                        <div class="row">
                            <div class="col-md-6 borderRight">
                                <span style="color:red;position:absolute;right:20px;top:5px;z-index:1;">*</span>
                                <base-input alternative
                                    type="text"
                                    v-on:keyup="validFields()"
                                    placeholder="Escriba su nombre"
                                    v-model="registerUser.name"
                                    addon-left-icon="fa fa-user">
                                </base-input>
                                <span style="color:red;position:absolute;right:20px;top:70px;z-index:1;">*</span>
                                <base-input alternative
                                    type="text"
                                    v-on:keyup="validFields()"
                                    placeholder="Escriba su apellido"
                                    v-model="registerUser.lastName"
                                    addon-left-icon="fa fa-user">
                                </base-input>
                                <span style="color:red;position:absolute;right:20px;top:140px;z-index:1;">*</span>
                                <base-input alternative
                                    type="email"
                                    v-on:keyup="validFields()"
                                    placeholder="Escriba su correo"
                                    v-model="registerUser.mail"
                                    addon-left-icon="ni ni-email-83">
                                </base-input>
                                <span style="color:blue;position:absolute;right:20px;top:200px;z-index:1;">+</span>
                                <base-input alternative
                                    type="text"
                                    v-on:input="formatPhone"
                                    maxlength="9"
                                    class="text-lowercase"
                                    placeholder="Escriba su número de teléfono"
                                    v-model="registerUser.phone"
                                    addon-left-icon="fa fa-phone">
                                </base-input>
                                <base-input alternative
                                    type="text"
                                    v-on:keyup="validFields()"
                                    placeholder="Escriba su correo"
                                    readonly
                                    v-model="registerUser.pay"
                                    addon-left-icon="fa fa-money-check-alt"
                                    style="margin-bottom: 0px !important;">
                                </base-input>
                            </div>
                            <div class="col-md-6">
                                <label v-if="registerUser.pay == 'Transferencia'" for="pay">Comprobante de pago <span style="color:red;">*</span></label>
                                <input alternative
                                    v-if="registerUser.pay == 'Transferencia'"
                                    type="file"
                                    ref="file" class="form-control mb-1"
                                    v-on:change="handleFileUpload()">
                                <hr style="margin-bottom:5px !important;margin-top:10px !important;" v-if="registerUser.pay == 'Transferencia'">
                                <div class="card-info">
                                    <div>
                                        <p v-if="registerUser.pay == 'Presencial efectivo'">
                                            Al finalizar su agendamiento usted debe considerar que su hora está tomada con pago de forma presencial mediante <b style="font-weight:600;">efectivo</b> en nuestro establecimiento.
                                            <br><br>
                                            <b style="font-weight:600;">Importante:</b> para evitar retrasos en los servicios, <b style="font-weight:600;">no se atenderá una vez pasado los 15 minutos de la hora agendada.</b>
                                        </p>
                                        <p v-if="registerUser.pay == 'Presencial Débito'">
                                            Al finalizar su agendamiento usted debe considerar que su hora está tomada con pago de forma presencial mediante <b style="font-weight:600;">débito</b> en nuestro establecimiento.
                                            <br><br>
                                            <b style="font-weight:600;">Importante:</b> para evitar retrasos en los servicios, <b style="font-weight:600;">no se atenderá una vez pasado los 15 minutos de la hora agendada.</b>
                                        </p>
                                        <p v-if="registerUser.pay == 'Presencial Crédito'">
                                            Al finalizar su agendamiento usted debe considerar que su hora está tomada con pago de forma presencial mediante <b style="font-weight:600;">crédito</b> en nuestro establecimiento.
                                            <br><br>
                                            <b style="font-weight:600;">Importante:</b> para evitar retrasos en los servicios, <b style="font-weight:600;">no se atenderá una vez pasado los 15 minutos de la hora agendada.</b>
                                        </p>
                                        <p v-if="registerUser.pay == 'Transferencia'">
                                            Al finalizar su agendamiento usted debe considerar que su hora está tomada con pago mediante <b style="font-weight:600;">transferencia electrónica por validar.</b> 
                                            <br><br>
                                            Una vez validado su pago le llegará un correo donde debe confirmar su cita.
                                        </p>
                                    </div>
                                </div> 
                                <div v-if="registerUser.pay == 'Transferencia'">
                                    <base-button style="float:right;margin-top:-10px;border-radius:14px;background-color:#174c8e;color:#fff;border:none;" :disabled="ifDisabled" v-if="validRegister" type="success" v-on:click="finallyAgend()">
                                        Finalizar agenda
                                    </base-button>  
                                    <base-button style="float:right;margin-top:-10px;border-radius:14px;background-color:#d5dadd;color:#1c2021;border:none;" v-else type="default" v-on:click="finallyAgend()" disabled>
                                        Finalizar agenda
                                    </base-button>
                                </div>
                                <div v-else class="mt-5">
                                    <base-button style="float:right;margin-top:15px;border-radius:14px;background-color:#174c8e;color:#fff;border:none;" :disabled="ifDisabled" v-if="validRegister" type="success" v-on:click="finallyAgend()">
                                        Finalizar agenda
                                    </base-button>  
                                    <base-button style="float:right;margin-top:15px;border-radius:14px;background-color:#d5dadd;color:#1c2021;border:none;" v-else type="default" v-on:click="finallyAgend()" disabled>
                                        Finalizar agenda
                                    </base-button>
                                </div>
                            </div>
                        </div>
                        
                        
                    </form>
                </template>
            </card>
        </modal>
        <modal :show.sync="modals.modal4"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-lg">
            <card type="secondary" shadow
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-4 py-lg-4"
                  class="border-0">
                <template>
                    <div class="text-muted text-center">
                        <h3>Formulario de compra</h3>
                    </div>
                </template>
                <template>
                    <div class="card-info text-justify">
                        <hr>
                        <div>
                            <p>
                                ¡Listo! Hemos enviado la confirmación de la cita al correo electrónico. 
                                <b style="font-weight:600;">Para que la cita quede confirmada deberás darle clic al botón de confirmar.</b>
                                <br><br>
                                Para confirmar su cita tendrás un plazo máximo de 24 horas, de lo contrario su hora quedará cancelada, habilitando ese espacio para otro cliente. <br><br>
                                Recuerde revisar la casilla de spam o correo no deseado. Si este correo electrónico no llega por favor ponte en contacto con nosotros mediante WhatsApp y verificaremos de inmediato
                            </p>
                            <hr>
                            <p class="text-center">+56 9 7262 8949</p>
                        </div>
                    </div>
                    <base-button style="width:200px;float:right;border-radius:14px;background-color:#d5dadd;color:#1c2021;border:none;" type="success" v-on:click="location">
                        Finalizar
                    </base-button>
                </template>
            </card>
        </modal>
        <modal :show.sync="modals.modal5"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-lg">
               <h6 slot="header" class="modal-title" id="modal-title-default"></h6>
            <card type="secondary" shadow
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-4 py-lg-4"
                  class="border-0">
                <template>
                    <div class="text-muted text-center mb-3">
                        <h3>Formulario de compra</h3>
                    </div>
                </template>
                <template>
                    <div class="row">
                        <div class="col-md-7 borderRight">
                            <div class="card-info-data text-justify">
                                <div>
                                    <p style="font-size:0.9em;">
                                        <b style="font-weight:600;">Los datos de transferencia son:</b>
                                        <br><br>
                                        <b style="font-weight:600;">Nombre:</b> Katriel Capacho<br>
                                        <b style="font-weight:600;">Banco:</b> Banco estado<br>
                                        <b style="font-weight:600;">Cuenta rut:</b> 262530322<br>
                                        <b style="font-weight:600;">Rut:</b> 26253022-1<br>
                                        <b style="font-weight:600;">Correo: </b>kkprettynails@gmail.com
                                    </p><br>
                                    <h3 class="text-center">El monto a trasferir es:</h3>
                                    <h2 class="text-center font-weight-bold">$ {{this.formatPrice(totalPrice)}}</h2>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-5 pt-3">
                            <div class="card-info text-center">
                                <div>
                                    <p style="font-size:0.9em;line-height:1.4em;">
                                        <b style="font-weight:600;">Importante.</b>
                                        <br><br>
                                        Al realizar el pago mediante transferencia electrónica deberás adjuntar este comprobante en el formulario de pago que se mostrará a continuación. 
                                    </p>
                                </div>
                            </div>
                            <base-button class="w-100" style="margin-top:55px;border-radius:14px;background-color:#d5dadd;color:#1c2021;border:none;" type="success" v-on:click="modals.modal5 = false, modals.modal2 = true">
                                Continuar
                            </base-button>
                        </div>
                    </div>
                    
                    
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
                    inline:false,
                    allowInput: false,
                    dateFormat: 'd-m-Y',
                    locale: Spanish, // locale for this instance only
                    minDate: new Date(),
                    "disable": [
                        function(date) {
                            // return true to disable
                            return (date.getDay() === 0 );

                        }
                    ]        
                },
                validPay:false,
                progress:false,
                dates:{
                    simple: ''
                },
                servicesCat: [],
                serviceSelected: [],
                servicesPhoneShow:false,
                CatSelected: 'Categorias',
                finalDate: '',
                registerUser: {
                    name: '',
                    mail: '',
                    lastName: '',
                    phone: '',
                    pay: 'Presencial efectivo',
                    pdf: 'danger'
                },
                totalPrice: 0,
                validWizard: true,
                year: new Date().getFullYear(),
                modals: {
                    modal1: false,
                    modal2: false,
                    modal3: false,
                    modal4: false,
                    modal5: false,
                    message: "Disculpa, las citas todavia no están habilitadas",
                    icon: 'ni ni-fat-remove ni-5x',
                    type:''
                },
                arrayLendersSelect: [],
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
                getDay: 0,
                lenders: [],
                services: [],
                serviceCount: [],
                servicePhoneCount: [],
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
                client: '',
                file: '',
                ifDisabled: false,
                availableslenders: []
            }
        },
        created(){
            this.getLenders()
            this.getServices()
            this.getCategories()
            this.device()
        },
        methods: {
            handleFileUpload(){
                this.file = this.$refs.file.files[0]
                console.log(this.file)
            },
            location(){
                this.modals = {
                    modal3: true,
                    message: "¡Cita creada con exito!",
                    icon: 'ni ni-check-bold ni-5x',
                    type: 'success'
                }
                setTimeout(() => {
                    this.modals = {
                        modal1:false,
                        modal2:false,
                        modal3: false,
                        modal4: false,
                        modal5: false,
                        message: "",
                        icon: '',
                        type: ''
                    }
                    window.location = 'https://kkprettynails.cl/'
                }, 3000);
                
            },
            finalFunction(){
                if (this.validPay) {
                    if (this.registerUser.pay == 'Transferencia') {
                        this.modals.modal5 = true
                    }else{
                        this.modals.modal2 = true
                    }
                }else{
                    $('.dropdownPay').css({'color': 'red'})
                    this.modals = {
                        modal3: true,
                        message: "Por favor, Seleccione el tipo de pago.",
                        icon: 'ni ni-fat-remove ni-5x',
                        type: 'danger'
                    }
                    setTimeout(() => {
                        this.modals = {
                            modal1:false,
                            modal2:false,
                            modal3: false,
                            modal4: false,
                            modal5: false,
                            message: "",
                            icon: '',
                            type: ''
                        }
                    }, 3000);
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
            formatPhone(){
                var number = this.registerUser.phone.replace(/[^\d]/g, '')
                if (number.length == 9) {
                    number = number.replace(/(\d{1})(\d{4})/, "$1-$2-");
                } else if (number.length == 10) {
                    number = number.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
                }
                this.registerUser.phone = number
            },
            validFields(){
                const split = this.registerUser.mail.split('@')
                var splitTwo = ''
                if (this.registerUser.mail.length == 1) {
                    this.registerUser.mail = this.registerUser.mail.toLowerCase()
                }
                if (split.length == 2) {
                    splitTwo = split[1].split('.')
                }
                if (this.registerUser.pay == 'Transferencia') {
                    if (this.file != '', this.registerUser.name != '' && this.registerUser.mail != '' && this.registerUser.lastName != '') {
                        if (split.length == 2) {
                            if (splitTwo.length == 2) {
                                this.validRegister = true
                            }else{
                                this.validRegister = false
                            }
                        }else{
                            this.validRegister = false
                        }
                    }else{
                        this.validRegister = false
                    }
                }else{
                    if (this.registerUser.name != '' && this.registerUser.mail != '' && this.registerUser.lastName != '') {
                        if (split.length == 2) {
                            if (splitTwo.length == 2) {
                                this.validRegister = true
                            }else{
                                this.validRegister = false
                            }
                        }else{
                            this.validRegister = false
                        }
                    }else{
                        this.validRegister = false
                    }
                }
            },
            sendConfirmation(id, name, mail, start, end, services, lender){
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
                    payment: this.registerUser.pay
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
                this.ifDisabled = true
                const phone = '+56 '+this.registerUser.phone
                console.log(phone)
                if (this.registerUser.pay == 'Transferencia' && this.file == '') {
                    this.modals = {
                        modal3: true,
                        message: "Por favor, agregue el comprobante de pago.",
                        icon: 'ni ni-fat-remove ni-5x',
                        type: 'danger'
                    }
                    setTimeout(() => {
                        this.ifDisabled = false
                        this.modals = {
                            modal1:false,
                            modal2:true,
                            modal3: false,
                            modal4: false,
                            modal5: false,
                            message: "",
                            icon: '',
                            type: ''
                        }
                    }, 3000);
                }else{
                    const name = this.registerUser.name+' '+this.registerUser.lastName
                    axios.post(endPoint.endpointTarget+'/clients/verifyClient', {
                        name: name,
                        mail: this.registerUser.mail,
                        number: phone,
                        referidoId: ''
                    })
                    .then(res => {
                        this.client = res.data.data.nombre+' / '+res.data.data.identidad
                        var lenderFinal = ''
                        var hourFinal = ''
                        for (let index = 0; index < this.registerDate.serviceSelectds.length; index++) {
                            const element = this.registerDate.serviceSelectds[index];
                            if (index > 0){
                                lenderFinal = lenderFinal+' - '+element.realLender
                                hourFinal = hourFinal+' - '+element.start+'Hrs'
                            }else{
                                lenderFinal = element.realLender
                                hourFinal = element.start+'Hrs'
                            }
                        }
                        if (this.registerUser.pay == 'Transferencia') {
                            let formData = new FormData();
                            formData.append('file', this.file)
                            axios.post(endPoint.endpointTarget+'/citas/uploadPdf', formData, {
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                }
                            })
                            .then(res => {
                                axios.post(endPoint.endpointTarget+'/citas/noOneLender', {
                                    dataDate: this.registerDate,
                                    date: this.finalDate,
                                    client: this.registerUser,
                                    pdf: res.data.nameFile,
                                    ifClient: true
                                })
                                .then(res => {
                                    if (res.data.status == "cita creada") {
                                        this.sendConfirmation(res.data.id, name, this.registerUser.mail, hourFinal, this.registerDate.serviceSelectds[0].end, this.registerDate.serviceSelectds, lenderFinal)
                                        this.modals.modal2 = false
                                        this.modals.modal4 = true
                                        this.ifDisabled = false
                                    }    
                                })   
                            })
                        }else{
                            axios.post(endPoint.endpointTarget+'/citas/noOneLender', {
                                dataDate: this.registerDate,
                                date: this.finalDate,
                                client: this.registerUser,
                                pdf: 'not',
                                ifClient: true
                            })
                            .then(res => {
                                if (res.data.status == "cita creada") {
                                    this.ifDisabled = false
                                    this.sendConfirmation(res.data.id, name, this.registerUser.mail, hourFinal, this.registerDate.serviceSelectds[0].end, this.registerDate.serviceSelectds, lenderFinal)
                                    this.modals.modal2 = false
                                    this.modals.modal4 = true
                                }    
                            })
                        }
                        
                    })
                }
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
            validMultiLender(index, lender, time, resTime, check){
                $('#'+check).removeClass('fa-check')
                this.registerDate.employeSelect = ''
                this.validSchedule = false
                this.noOneLender = true
                console.log(this.registerDate.serviceSelectds[index])
                this.selectHourService(index, lender, time, resTime)
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
                        this.registerDate.serviceSelectds[index].start = ''
                        this.registerDate.serviceSelectds[index].end = ''
                        this.registerDate.serviceSelectds[index].lender = 'Primera disponible'
                        this.registerDate.serviceSelectds[index].realLender = lenders[lenderSelect].lender
                        this.registerDate.serviceSelectds[index].restTime = lenders[lenderSelect].resTime
                        this.registerDate.serviceSelectds[index].class = lenders[lenderSelect].class
                        this.validHour = false 
                        this.validMultiLender(index, lenders[lenderSelect].lender, duration, lenders[lenderSelect].resTime, check)
                    }else{
                        this.registerDate.serviceSelectds[index].start = ''
                        this.registerDate.serviceSelectds[index].end = ''
                        this.registerDate.serviceSelectds[index].lender = 'Primera disponible'
                        this.registerDate.serviceSelectds[index].realLender = lenders[lenderSelect].lender
                        this.registerDate.serviceSelectds[index].restTime = lenders[lenderSelect].resTime
                        this.registerDate.serviceSelectds[index].class = lenders[lenderSelect].class
                        this.validHour = false 
                        this.validMultiLender(index, lenders[lenderSelect].lender, duration, lenders[lenderSelect].resTime, check)
                    }
                }else{
                    this.registerDate.serviceSelectds[index].start = ''
                    this.registerDate.serviceSelectds[index].end = ''
                    this.registerDate.serviceSelectds[index].lender = lender
                    this.registerDate.serviceSelectds[index].realLender = lender
                    this.registerDate.serviceSelectds[index].restTime = restTime
                    this.registerDate.serviceSelectds[index].class = Class
                    this.validHour = false 
                    this.validMultiLender(index, lender, duration, restTime, check) 
                }
            },
            selectHourService(index, lender, time, resTime){
                console.log(lender+'--'+ time+'--'+ resTime+'--'+index)
                const finalTime =  this.registerDate.design == 'si' ? time + 15 : time
                this.registerDate.serviceSelectds[index].lenderSelectData = {
                    employe: lender,
                    date: this.finalDate,
                    time: finalTime,
                    resTime: resTime,
                    index: index
                }

                axios.post(endPoint.endpointTarget+'/citas/getBlocks', this.registerDate.serviceSelectds[index].lenderSelectData)
                .then(res => { 
                    if (this.registerDate.serviceSelectds[index].validAfter) {
                       for (let j = index + 1; j < this.registerDate.serviceSelectds.length; j++) {
                            const element = this.registerDate.serviceSelectds[j];
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
                        const element = this.registerDate.serviceSelectds[j];
                        console.log(element.realLender +' == '+ lender)
                        if (element.realLender == lender) {
                            editBlock = true
                            indexEdit = j
                        }
                    }
                    if (editBlock) {
                        console.log(this.arrayLendersSelect)
                        this.registerDate.serviceSelectds[index].blocks = this.registerDate.serviceSelectds[indexEdit].blocks
                        axios.post(endPoint.endpointTarget+'/citas/editBlocks', {
                            array: this.registerDate.serviceSelectds[index].blocks,
                            time: parseFloat(time)
                        })
                        .then(res => {
                            this.arrayLendersSelect.push({index: index, lender: lender}) 
                            this.registerDate.serviceSelectds[index].blocks = res.data
                            this.registerDate.serviceSelectds[index].validAfter = true
                        })
                    }else{
                        this.registerDate.serviceSelectds[index].blocks = res.data
                        this.arrayLendersSelect.push({index: index, lender: lender}) 
                        console.log(this.arrayLendersSelect)
                        this.registerDate.serviceSelectds[index].validAfter = true
                    }
                    
                    
                })
                .catch(err => { console.log(err) })
            },
            validLender(){
                this.generateLender()
                if (this.registerDate.serviceSelectds.length > 0 && this.finalDate != '') {
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
                    element.realLender = ''
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
                        date: this.finalDate,
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
            plusServicePhone(index, service, time, comision, precio, lenders, card){
                $('#'+card).css({'border-bottom': 'solid 8px #174c8e'})
                this.ifServices = true
                this.servicePhoneCount[index].count++
                this.serviceSelected[index].set = true
                this.registerDate.duration = this.registerDate.duration + parseFloat(time)
                var lendersName = [{lender: 'Primera disponible', resTime: '', restDay: '', class: '', valid:true}]
                for (let indexThree = 0; indexThree < this.lenders.length; indexThree++) {
                    for (let indexTwo = 0; indexTwo < lenders.length; indexTwo++) {
                        if (this.lenders[indexThree]._id == lenders[indexTwo]) {
                            lendersName.push({lender: this.lenders[indexThree].nombre, resTime: this.lenders[indexThree].restTime, restDay: this.lenders[indexThree].restDay, class: this.lenders[indexThree].class, valid: true})
                            break
                        }
                    }  
                }
                console.log(lendersName)
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
                this.registerDate.serviceSelectds.push({comision: comision, precio: precio, servicio: service, realLender:'', lender: 'Primera disponible', lenders: lendersName, start: '', end:'', sort: 0, duration: time, restTime: '', class: '', blocks: [],lenderSelectData: {}, valid: false, validAfter: false })
                this.registerDate.start = ''  
                this.registerDate.end = '' 
                this.registerDate.sort = ''    
                this.validHour = false  
                this.totalPrice = this.totalPrice + precio
            },
            lessServicePhone(index, service, time, card, precio){
                if (this.servicePhoneCount[index].count > 0) {
                    this.servicePhoneCount[index].count--
                    if (this.servicePhoneCount[index].count == 0) {
                        $('#'+card).css({'border-bottom': 'solid 8px #e2e3de'})
                        this.serviceSelected[index].set = false
                    }
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
                this.totalPrice = this.totalPrice - precio
                console.log(this.registerDate.serviceSelectds)
            },
            plusService(index, service, time, comision, precio, lenders, card){
                $('#'+card).css({'border-bottom': 'solid 8px #174c8e'})
                this.ifServices = true
                this.serviceCount[index].count++
                this.registerDate.duration = this.registerDate.duration + parseFloat(time)
                var lendersName = [{lender: 'Primera disponible', resTime: '', restDay: '', class: '', valid:true}]
                for (let indexThree = 0; indexThree < this.lenders.length; indexThree++) {
                    for (let indexTwo = 0; indexTwo < lenders.length; indexTwo++) {
                        if (this.lenders[indexThree]._id == lenders[indexTwo]) {
                            lendersName.push({lender: this.lenders[indexThree].nombre, resTime: this.lenders[indexThree].restTime, restDay: this.lenders[indexThree].restDay, class: this.lenders[indexThree].class, valid: true})
                            break
                        }
                    }  
                }
                console.log(lendersName)
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
                this.registerDate.serviceSelectds.push({comision: comision, precio: precio, servicio: service, realLender:'', lender: 'Primera disponible', lenders: lendersName, start: '', end:'', sort: 0, duration: time, restTime: '', class: '', blocks: [],lenderSelectData: {}, valid: false, validAfter: false })
                this.registerDate.start = ''  
                this.registerDate.end = '' 
                this.registerDate.sort = ''    
                this.validHour = false  
                this.totalPrice = this.totalPrice + precio
            },
            lessService(index, service, time, card, precio){
                if (this.serviceCount[index].count > 0) {
                    this.serviceCount[index].count--
                    if (this.serviceCount[index].count == 0) {
                        $('#'+card).css({'border-bottom': 'solid 8px #e2e3de'})
                    }
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
                this.totalPrice = this.totalPrice - precio
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
                    date: this.finalDate,
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
            selectBloqMulti(hora, i, indexService, open, check){
                setTimeout(() => {
                    $('#'+open).toggle('slow')
                }, 500);
                console.log(indexService)
                var sortSp = this.registerDate.serviceSelectds[indexService].blocks[i].Horario.split(":") 
                this.registerDate.serviceSelectds[indexService].start = this.registerDate.serviceSelectds[indexService].blocks[i].Horario
                this.registerDate.serviceSelectds[indexService].sort = sortSp[0]+sortSp[1]
                console.log(this.registerDate.serviceSelectds[indexService])
                axios.post(endPoint.endpointTarget+'/citas/getBlocks', this.registerDate.serviceSelectds[indexService].lenderSelectData)
                .then(res => {
                    console.log(res)
                    var editBlock = false
                    if (indexService > 0) {
                        for (let i = 0; i < this.arrayLendersSelect.length; i++) {
                            const element = this.arrayLendersSelect[i];
                            if (element.lender == this.registerDate.serviceSelectds[indexService].realLender) {
                                editBlock = true
                            }
                        }
                    }
                    if (editBlock) {
                        console.log('entre en el edit')
                        console.log(this.arrayLendersSelect)
                        axios.post(endPoint.endpointTarget+'/citas/editBlocks', {
                            array: this.registerDate.serviceSelectds[indexService].blocks,
                            time: this.registerDate.serviceSelectds[indexService].lenderSelectData.time
                        })
                        .then(res => {
                            for (let index = 0 ; index <= this.registerDate.serviceSelectds[indexService].lenderSelectData.time / 15; index++) {
                                res.data[i].validator = 'select'
                                this.registerDate.serviceSelectds[indexService].end = res.data[i].Horario
                                i++
                            }
                            this.registerDate.serviceSelectds[indexService].blocks = res.data
                            var valid = 0 
                            for (let index = 0; index < this.registerDate.serviceSelectds.length; index++) {
                                const element = this.registerDate.serviceSelectds[index];
                                console.log(element.start)
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
                        console.log('NO entre en el edit')
                        for (let index = 0 ; index <= this.registerDate.serviceSelectds[indexService].lenderSelectData.time / 15; index++) {
                            res.data[i].validator = 'select'
                            this.registerDate.serviceSelectds[indexService].end = res.data[i].Horario
                            i++
                        }
                        this.registerDate.serviceSelectds[indexService].blocks = res.data
                        this.blockHour = res.data
                        var valid = 0 
                        for (let index = 0; index < this.registerDate.serviceSelectds.length; index++) {
                            const element = this.registerDate.serviceSelectds[index];
                            console.log(element.start)
                            if (element.start == "") {
                                valid = 1
                            }
                        }
                        if (valid == 0) {
                            this.validHour = true
                        }
                        this.registerDate.serviceSelectds[indexService].blocks = res.data
                        $('#'+check).addClass('fa-check')
                    }
                    
                    const finalIndex = parseFloat(indexService) + parseFloat(1)
                    if (this.registerDate.serviceSelectds[finalIndex]) {
                        this.registerDate.serviceSelectds[finalIndex].valid = true
                        var counter = 0
                        var validCounter = false
                        for (let i = finalIndex; i < this.availableslenders.length; i++) {
                            const element = this.availableslenders[i];
                            for (let j = 0; j <  this.registerDate.serviceSelectds[finalIndex].lenders.length; j++) {
                                const elementTwo =  this.registerDate.serviceSelectds[finalIndex].lenders[j];
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
                        const finalLender = this.registerDate.serviceSelectds[finalIndex].lenders[counter].lender
                        const finalRestime = this.registerDate.serviceSelectds[finalIndex].lenders[counter].resTime
                        this.registerDate.serviceSelectds[finalIndex].class = this.registerDate.serviceSelectds[finalIndex].lenders[counter].class
                        this.registerDate.serviceSelectds[finalIndex].realLender = finalLender
                        this.validMultiLender(finalIndex, finalLender, this.registerDate.serviceSelectds[finalIndex].duration, finalRestime)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            },
            validateFirstStep() {
                window.scrollTo(0, 0);
                if (this.registerDate.design != 'nada' && this.ifServices) {
                    this.validWizard = true
                    if ( this.dates.simple != '') {
                        for (let index = 0; index < this.registerDate.serviceSelectds.length; index++) {
                            const element = this.registerDate.serviceSelectds[index];
                                if (element.valid == false) {
                                    element.valid = true
                                    this.insertData(index, 'Primera disponible', '', '', element.duration, 'check'+index, element.lenders)
                                    break
                                }
                        }
                    }
                    return this.ifServices
                }else{
                    this.modals = {
                        modal3: true,
                        message: "Elija un servicio y diseño",
                        icon: 'ni ni-fat-remove ni-5x',
                        type: 'danger'
                    }
                    setTimeout(() => {
                        this.modals = {
                            modal1:false,
                            modal2:false,
                            modal3: false,
                            modal4: false,
                            modal5: false,
                            message: "",
                            icon: '',
                            type: ''
                        }
                    }, 2000);
                    this.validWizard = false
                    return false
                }
                
            },
            validateLastStep() {
                window.scrollTo(0, 0);
                console.log(this.validHour)
                if (this.validHour) {
                    this.validWizard = true
                    return this.validHour
                }else{
                    this.validWizard = false
                    return this.validHour
                }
                
            },
            openCalendar(){ 
                console.log(this.dates.simple)
                this.configDate.inline = false
                setTimeout(() => {
                    const split = this.dates.simple.split('-')
                    this.finalDate = split[1]+'-'+split[0]+'-'+split[2]
                    const restDay = new Date(this.finalDate+' 10:00')
                    this.getDay = restDay.getDay()
                    if (this.getDay == 0) {
                        this.modals = {
                            modal3: true,
                            message: "Disculpa, No laboramos Sábados y Domingos.",
                            icon: 'ni ni-fat-remove ni-5x',
                            type: 'danger'
                        }
                        setTimeout(() => {
                            this.modals = {
                                modal1:false,
                                modal2:false,
                                modal3: false,
                                modal4: false,
                                modal5: false,
                                message: "",
                                icon: '',
                                type: ''
                            }
                            this.dates.simple = ''
                        }, 3000);
                    }else{
                        if (this.readyChange) {
                            for (let index = 0; index < this.registerDate.serviceSelectds.length; index++) {
                                const element = this.registerDate.serviceSelectds[index];
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
                                        for (let j = 0; j <  this.registerDate.serviceSelectds[0].lenders.length; j++) {
                                            const elementTwo =  this.registerDate.serviceSelectds[0].lenders[j];
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
                                    console.log(validCounter)
                                    if (validCounter) {
                                        const finalLender = this.registerDate.serviceSelectds[0].lenders[counter].lender
                                        const finalRestime = this.registerDate.serviceSelectds[0].lenders[counter].resTime
                                        this.registerDate.serviceSelectds[0].class = this.registerDate.serviceSelectds[0].lenders[counter].class
                                        console.log(finalLender)
                                        this.registerDate.serviceSelectds[0].valid = true
                                        this.registerDate.serviceSelectds[0].realLender = finalLender
                                        this.validMultiLender(0, finalLender, this.registerDate.serviceSelectds[0].duration, finalRestime)
                                        this.readyChange = true
                                    }else{
                                        this.modals = {
                                            modal3: true,
                                            message: "No contamos con profesionales disponibles para la fecha seleccionada.",
                                            icon: 'ni ni-fat-remove ni-5x',
                                            type: 'danger'
                                        }
                                        setTimeout(() => {
                                            this.modals = {
                                                modal1:false,
                                                modal2:false,
                                                modal3: false,
                                                modal4: false,
                                                modal5: false,
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
                                    console.log(res)
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
                                        for (let j = 0; j <  this.registerDate.serviceSelectds[0].lenders.length; j++) {
                                            const elementTwo =  this.registerDate.serviceSelectds[0].lenders[j];
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
                                    console.log(validCounter)
                                    if (validCounter) {
                                        const finalLender = this.registerDate.serviceSelectds[0].lenders[counter].lender
                                        const finalRestime = this.registerDate.serviceSelectds[0].lenders[counter].resTime
                                        this.registerDate.serviceSelectds[0].class = this.registerDate.serviceSelectds[0].lenders[counter].class
                                        console.log(finalLender)
                                        this.registerDate.serviceSelectds[0].valid = true
                                        this.registerDate.serviceSelectds[0].realLender = finalLender
                                        this.validMultiLender(0, finalLender, this.registerDate.serviceSelectds[0].duration, finalRestime)
                                        this.readyChange = true
                                    }else{
                                        this.modals = {
                                            modal3: true,
                                            message: "No tenemos hay prestadores disponibles, para la fecha.",
                                            icon: 'ni ni-fat-remove ni-5x',
                                            type: 'danger'
                                        }
                                        setTimeout(() => {
                                            this.modals = {
                                                modal1:false,
                                                modal2:false,
                                                modal3: false,
                                                modal4: false,
                                                modal5: false,
                                                message: "",
                                                icon: '',
                                                type: ''
                                            }
                                        }, 3000);
                                    }
                                    
                                    
                                })
                            }, 200); 
                        }
                    }
                }, 200);
            },
            openBlocks(open){
                $('#'+open).toggle('slow')
            },
            selectPay(pay){
                $('.dropdownPay').text(pay)
                $('.dropdownPay').css({'color':'#090909'})
                this.registerUser.pay = pay
                this.validPay = true
            },
            selectDesign(type){
                if (type == 'first') {
                    $('.spanSelect').css({'background-color':'#fff', 'color':'#090909'})
                    $('#yes').css({'background-color':'#7a91cb'})
                    this.registerDate.design = 'si'
                }else{
                    $('.spanSelect').css({'background-color':'#fff', 'color':'#090909'})
                    $('#not').css({'background-color':'#7a91cb'})
                    this.registerDate.design = 'no'
                }
            },
            selectCat(cat){
                $('.categoryButton').css({'padding':'10px', 'background-color': '#d5dadd', 'color': '#434a54', 'box-shadow':'0px 0px 0px 0px rgba(0,0,0,0)'})
                $('#'+cat).css({'padding-top':'14px', 'background-color': '#174c8e', 'color': '#fff', '-webkit-box-shadow':'0px 9px 25px -7px rgba(0,0,0,0.75)', 'box-shadow':'0px 9px 25px -7px rgba(0,0,0,0.75)'})
            }, 
            async selectCategoryPhone(name){
                for (let j = 0; j < this.serviceSelected.length; j++) {
                    const element = this.serviceSelected[j];
                    if (element.set == false) {
                        this.serviceSelected.splice(j, 1)
                        this.servicePhoneCount.splice(j, 1)
                    }
                }
                this.servicesPhoneShow = false
                this.servicesCat = []
                try {
                    const services = await  axios.post(endPoint.endpointTarget+'/servicios/servicesByCategory', {
                        name: name
                    })
                    if (services.data.status == 'ok') {
                        this.servicesPhoneShow = true
                        this.servicesCat = services.data.services
                        this.CatSelected = name
                    }else{
                        this.modals = {
                            modal3: true,
                            message: "categoria sin servicios",
                            icon: 'ni ni-fat-remove ni-5x',
                            type: 'danger'
                        }
                        setTimeout(() => {
                            this.modals = {
                                modal1:false,
                                modal2:false,
                                modal3: false,
                                modal4: false,
                                modal5: false,
                                message: "",
                                icon: '',
                                type: ''
                            }
                        }, 2000);
                    }
                }catch (err){
                    console.log(err)
                }
            },
            validObject (){
                if (this.serviceSelected.length === 0) {
                    return false
                }else{
                    return true
                }
            },
            device(){
                if (screen.width < 768) {
                    this.configDate.inline = true
                }
            },
            async selectServicePhone(id){
                for (let j = 0; j < this.serviceSelected.length; j++) {
                    const element = this.serviceSelected[j];
                    if (element.set == false) {
                        this.serviceSelected.splice(j, 1)
                        this.servicePhoneCount.splice(j, 1)
                    }
                }
                try {
                    const service = await axios.get(endPoint.endpointTarget+'/servicios/getServiceInfo/'+id)
                    if (service.data.status == 'ok') {
                        service.data.service.set = false
                        console.log(service.data.service)
                        this.serviceSelected.unshift(service.data.service)
                        this.servicePhoneCount.unshift({count: 0})
                    }else{
                        this.modals = {
                            modal3: true,
                            message: "Error técnico",
                            icon: 'ni ni-fat-remove ni-5x',
                            type: 'danger'
                        }
                        setTimeout(() => {
                            this.modals = {
                                modal1:false,
                                modal2:false,
                                modal3: false,
                                modal4: false,
                                modal5: false,
                                message: "",
                                icon: '',
                                type: ''
                            }
                        }, 2000);
                    }
                }catch(err){
                    console.log(err)
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
.headerStyles{
    background-image: url('/img/theme/Banner.png');
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    top: 0;
    width: 100%;
    margin-bottom: 100px;
    z-index: 1;
    max-height:80px;
}
.borderImageBrand{
    height:110px;
    width:110px;
    margin-top: 15px;
    margin-left: 25px;
    padding: 10px;
    border-radius: 50%;
    background-color: #fff;
}
.imageBrand{
    height:90px;
    width:90px;
}
.inactiveButton{
    background-color: #959595 !important;
}
.activeButton{
    background-color: #174c8e !important;
}
.categoryButton{
    background-color: #d5dadd;
    border:none;
    color: #434a54;
    padding: 10px;
    border-radius: 15px;
    font-family: Open Sans, sans-serif;
    font-weight: 600;
    font-size:1em;
    transition: all 0.5s ease-out;
}
.categoryButton:hover{
    background-color: #174c8e;
    color: #fff;
}
button:focus{
    outline: none !important;
}
.card-service{
    padding: 10px 10px;
    background-color: #e2e3de;
    border-radius: 10px;
    width: 100%;
    transition: all 0.5s ease-out;
    overflow: hidden;
    min-height: 145px;
    border-bottom: solid 8px #e2e3de;
}
.card-service:hover{
    background-color: #D4D8D4;
}
.price-service{
    background-color: #fff;
    padding: 4px;
    width: 80%;
    letter-spacing: .02em; 
    text-align:center;
    border-radius: 20px;
    font-weight: 600;
    color: #090909;
    font-size: 1.2em;
}
.name-service{
    font-size: 1.2em;
    line-height: normal;
    max-width: 80%;
    letter-spacing: .02em; 
    margin-left:4px; 
    margin-bottom: 10px;
    font-weight: 500;
}
.name-service{
    color: #090909;
}

.card-service img{
    width: 80px;
    position: absolute;
    top:-50px;
    right: -50px;
}
.stepTitle {
    font-weight: 600;
}
.wizard-progress-bar{
    color:#eff2f7 !important;
    background-color:#eff2f7 !important;
}
/* .wizard-icon-container{
    background: rgb(2,0,36);
    background: linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(225,233,246,1) 0%, rgba(173,190,230,1) 100%);
    
}
.wizard-icon-container i{
color: #174c8e;
}
.wizard-icon-circle{
    border-color: #adbee6 !important;
} */
.button-service-group{
    float: right;
    background-color: #fff;
    border-radius: 18px;
    margin-top:3px;
    padding: 4px;
}
.span-button-service{
    padding: 5px;
    margin-top: 5px;
    background-color: transparent;
    font-weight: 600;
    color: #090909;
    font-size: 1.2em;
}
.button-service-left{
    border:none;
    border-radius: 20px;
    padding: 2px 6px;
    background-color: #fff;
    color: #090909;
    border: solid .5px #090909;
    font-weight: 400;
    font-size: 1rem;
    transition: all 0.5s ease-out;
    margin-right:5px;
}
.button-service-right{
    border:none;
    border-radius: 20px;
    padding: 2px 6px;
    background-color: #fff;
    border: solid .5px #090909;
    color: #090909;
    font-weight: 400;
    font-size: 1rem;
    transition: all 0.4s ease-out;
    margin-left: 5px;
}
.button-service-left i{
    transition: all 0.4s ease-out;
}
.button-service-right i{
    transition: all 0.5s ease-out;
}
.button-service-left:hover i{
    transform: rotate(360deg);
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
.card-info-data{
    width: 100%;
    padding: 4px;
    background-color: #d5dadd;
    border-radius: 5px;
    -webkit-box-shadow: 0px 0px 16px -11px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 16px -11px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 16px -11px rgba(0,0,0,0.75);
}
.card-info-data div{
    width: 100%;
    padding: 10px;
    background-color: #fefefe;
    padding-top: 20px;
    border-radius: 5px;
}
.card-info{
    width: 100%;
    padding: 4px;
    border-radius: 5px;
}
.card-info div{
    width: 100%;
    padding: 10px;
    padding-top: 4px;
    border-radius: 5px;
}
.card-info div p{
    font-size: .9em;
    line-height: 1.2em;
}
.spanSelect{
    cursor:pointer;
    border-radius: 50%; 
    transition: all 0.4s ease-out;
}
.spanSelect:nth-child(1n){
    padding: 8px 12px;
}
.spanSelect:nth-child(2n){
    padding: 10px 10px;
}
.spanSelect:hover{
    background-color: #7a91cb;
    color:#fff;
}
.card-services-information{
    padding: 20px;
}
.wizard-header h2{
    font-size: 1.6em;
}
.responsiveButtonsPercent{
    width: 75%;
}
.styleDropdown .dropdown-menu{
    background-color:#2dce89;
    width: 80%;
    left: 10%;
    cursor:pointer;
}
.styleDropdown .dropdown-item{
    transition: all 0.4s ease-out;
}
.styleDropdown .dropdown-item:hover{
    background-color: #96e6c4 !important; 
    color:#090909 !important;  
}
.borderRight{
    border-right: solid 1px #e0e5e8;
}
.showPhone{
    display: none;
}
.logoSyswaFooter{
    height:140px;
    width:220px
}
@media only screen and (max-width: 468px)
{
    .styleDropdown .dropdown-menu{
        width: 100%;
        left: 0%;
    }
    .styleDropdown .dropdown-item{
        font-size:0.600rem !important;
    }
	.name-service{
        font-size: 1em;
        z-index:1;
        max-width: 85%;
        margin-bottom:20px;
    }
    .card-service img{
        top:-40px;
    }
    .responsiveItem{
        width: 100%;
    }
    .borderImageBrand{
        margin-left:35%;
    }
    .showDevice{
        display: none !important;
    }
    .showPhone{
        display: block;
    }
    .card-services-information {
        padding: 0;
    }
    .logoSyswaFooter{
        height:110px;
        width:180px
    }
}
@media only screen and (max-width: 768px)
{
    .card-service{
        margin-top:10px;
    }
    .responsiveButtonsPercent{
        width: 100% !important;
    }
    .wizard-btn{
      min-width: 80px !important;  
    }
    .borderRight{
        border:none;
    }
}
</style>