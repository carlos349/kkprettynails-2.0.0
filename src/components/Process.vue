<template>
    <a-spin size="large" :spinning="spinning">
        <div class="row spin-content">
            <div class="col-md-8 mb-3 separatorLeft">
                <label for="Client">Cliente</label><br>
                <a-select
                    show-search
                    placeholder="Seleccione el cliente"
                    option-filter-prop="children"
                    :filter-option="filterOption"
                    :allowClear="true"
                    class="mb-2 "
                    :class="screenWidth"
                    @change="chooseClient">
                    <a-select-option v-for="client of clients" :key="client._id" :value="client._id">
                        {{client.firstName}} / {{client.email}}
                    </a-select-option>
                </a-select>
                <div class="card-container">
                    <a-tabs type="card">
                        <a-tab-pane key="1">
                            <span slot="tab">
                                <a-icon type="plus-circle" style="vertical-align: 1.5px;" />
                                Servicios
                            </span>
                            <div class="row">
                                <div class="col-md-6">
                                    <label for="service">Servicio</label>
                                    <a-select
                                        show-search
                                        placeholder="Seleccione el servicio"
                                        option-filter-prop="children"
                                        :filter-option="filterOption"
                                        :allowClear="true"
                                        class="mb-2 pt-1 w-100"
                                        @change="chooseService">
                                        <a-select-option v-for="service of services" :key="service._id" :value="service._id">
                                            {{service.name}}
                                        </a-select-option>
                                    </a-select>
                                </div>
                                <div class="col-md-6">
                                    <label for="employe">Empleado</label>
                                    <a-select
                                        show-search
                                        placeholder="Seleccione el empleado"
                                        option-filter-prop="children"
                                        :filter-option="filterOption"
                                        :allowClear="true"
                                        class="mb-2 pt-1 w-100"
                                        @change="chooseEmploye"
                                        ref="employeSelect">
                                        <a-select-option v-for="employe of registerService.lenders" :key="employe._id" :value="employe._id">
                                            {{employe.firstName}} {{employe.lastName}}
                                        </a-select-option>
                                    </a-select>
                                </div>
                                <div class="col-md-6">
                                    <label for="Client" style="margin-bottom:12px">Precio</label>
                                    <currency-input
                                        v-model="itemData.price"
                                        locale="de"
                                        class="ant-input w-100 mb-3"
                                        style="margin-top:-10px;"
                                    />
                                </div>
                                <div class="col-md-6">
                                    <label for="Client" style="margin-bottom:6px">Descuento</label>
                                    <a-input @keyup="addDiscountFunc" class="w-100" type="number" placeholder="Descuento" :disabled="itemData.discountServiceIf" v-model="itemData.discountService">
                                        <a-icon slot="suffix" type="percentage" style="vertical-align: 1.5px;" />
                                    </a-input>
                                </div>
                                <div class="col-md-6" style="margin-top: -5px;">
                                    <label :class="marginAdditional" for="Client" class="w-50">Adicionales</label><br>
                                    <a-select
                                        show-search
                                        placeholder="Seleccione un adicional"
                                        option-filter-prop="children"
                                        :filter-option="filterOption"
                                        v-model="microSelect.name"
                                        :allowClear="true"
                                        :class="screenWidthInput"
                                        class="mt-1"
                                        @change="chooseAditional">
                                        <a-select-option v-for="micro of microservices" :key="micro.microService" :value="micro.microService+'/'+micro.price">
                                            {{micro.microService}}
                                        </a-select-option>
                                    </a-select>
                                    <currency-input
                                        v-model="microSelect.price"
                                        locale="de"
                                        :class="screenWidth"
                                        class="ant-input ml-1 mt-1"
                                    />
                                    <a-button :disabled="microValid" @click="addAdditional" class="ml-3 mt-1" type="primary" shape="round">
                                        <a-icon type="plus" style="vertical-align: 1.5px;"/>
                                    </a-button>
                                </div>
                                <div class="col-md-6" style="margin-top: -5px;">
                                    <label for="Micros" style="margin-top:-20px;">Adicionales seleccionados</label><br>
                                    <template v-if="microserviceSelecteds.length > 0">
                                        <template v-for="(micros, index) in microserviceSelecteds" @click="removeMicro(index)">
                                            <badge :key="micros.id" class="ml-2 mt-2" type="primary" >{{micros.name}}</badge>
                                        </template>
                                    </template>
                                    <template v-else>
                                        <badge type="default" class="mt-2">Ninguno seleccionado</badge>
                                    </template>
                                </div>
                            </div>
                            <base-button @click="addItem('service')" class="float-right mt-1" size="sm" type="primary">Agregar item</base-button>
                        </a-tab-pane>
                        <a-tab-pane key="2">
                            <span slot="tab">
                                <a-icon type="shopping" style="vertical-align: 1.5px;"/>
                                Productos
                            </span>
                            <div class="row">
                                <div class="col-md-6">
                                    <label for="service" style="margin-bottom:3px">Producto</label>
                                    <a-select
                                        show-search
                                        placeholder="Seleccione el producto"
                                        option-filter-prop="children"
                                        :filter-option="filterOption"
                                        :allowClear="true"
                                        class="mb-2 pt-1 w-100"
                                        @change="chooseProduct"
                                        ref="serviceSelect">
                                        <a-select-option v-for="product of products" :key="product._id" :value="product._id">
                                            {{product.product}}
                                        </a-select-option>
                                    </a-select>
                                </div>
                                <div class="col-md-3">
                                    <label for="Client" style="margin-bottom:12px">Precio</label>
                                    <currency-input
                                        v-model="itemData.price"
                                        locale="de"
                                        class="ant-input w-100 mb-3"
                                        style="margin-top:-10px;"
                                    />
                                </div>
                                <div class="col-md-3">
                                    <label for="Client" style="margin-bottom:6px">Descuento</label>
                                    <a-input @keyup="addDiscountFunc" class="w-100" type="number" placeholder="Descuento" :disabled="itemData.discountServiceIf" v-model="itemData.discountService">
                                        <a-icon slot="suffix" type="percentage" style="vertical-align: 1.5px;" />
                                    </a-input>
                                </div>
                            </div>
                            <base-button @click="addItem('product')" class="float-right mt-1" size="sm" type="primary">Agregar item</base-button>
                        </a-tab-pane>
                        <a-tab-pane key="3">
                            <span slot="tab">
                                <a-icon type="schedule" style="vertical-align: 1.5px;"/>
                                Citas finalizadas
                            </span>
                            <a-config-provider>
                                <template #renderEmpty>
                                    <div style="text-align: center">
                                        <a-icon type="warning" style="font-size: 20px" />
                                        <h2>No ha ingresado items</h2>
                                    </div>
                                </template>
                                <!-- :scroll="getScreen" -->
                                <a-table :columns="columnDates" :loading="progress" :data-source="datesFinally" :scroll="getScreen" >
                                    <template slot="date-slot" slot-scope="record, column">
                                        {{column.createdAt | formatDate}}
                                    </template>
                                    <template slot="service-slot" slot-scope="record, column">
                                        {{column.service.name}}
                                    </template>
                                    <template slot="employe-slot" slot-scope="record, column">
                                        {{column.employe.name}}
                                    </template>
                                    <template slot="total-slot" slot-scope="record, column">
                                        {{column.total | formatPrice}}
                                    </template>
                                    <template slot="actionInsert" slot-scope="record, column, index">
                                        <base-button @click="addItem('date', index)" size="sm" type="success">
                                            <a-icon type="plus-circle" style="vertical-align:1.5px;" />
                                        </base-button>
                                    </template>
                                </a-table>
                            </a-config-provider>
                        </a-tab-pane>
                    </a-tabs>
                </div>
                <a-config-provider>
                    <template #renderEmpty>
                        <div style="text-align: center">
                            <a-icon type="warning" style="font-size: 20px" />
                            <h2>No ha ingresado items</h2>
                        </div>
                    </template>
                    <!-- :scroll="getScreen" -->
                    <a-table :columns="columns" :loading="progress" :data-source="serviceSelecteds" :scroll="getScreen" >
                        <template slot="price-slot" slot-scope="record, column">
                            <currency-input
                                v-model="column.price"
                                locale="de"
                                class="ant-input w-100"
                            />
                        </template>
                        <template slot="item-slot" slot-scope="record, column">
                            {{column.item.name}}
                        </template>
                        <template slot="discount-slot" slot-scope="record, column, index">
                            <a-input :disabled="column.ifDiscount" v-on:keyup="addDiscountTable(record, index)" v-model="column.discount">
                                <a-icon slot="suffix" type="percentage" style="vertical-align: 1.5px;" />
                            </a-input>
                        </template>
                        <template slot="additional-slot" slot-scope="record, column">
                            {{formatPrice(column.additionalTotal)}}
                        </template>
                        <template slot="total-slot" slot-scope="record, column">
                            {{formatPrice(column.total)}}
                        </template>
                        <template slot="actionRemove" slot-scope="record, column, index">
                            <base-button @click="removeItem(index)" size="sm" type="danger">
                                <a-icon type="minus-circle" style="vertical-align:1.5px;" />
                            </base-button>
                        </template>
                        <template slot="expandedRowRender" slot-scope="record">
                            <p>{{ record.description }}</p> 
                        </template>
                    </a-table>
                </a-config-provider>
            </div>
            <div class="col-md-4">
                <h3>Métodos de pago</h3>
                <div class="row">
                    <template v-if="typesPay.length > 0">
                        <div class="col-md-6 mt-2" v-for="(pay, index) in typesPay" :key="pay.type">
                            <a-button :disabled="serviceSelecteds.length > 0 ? false : true" @click="selectPay(index)" class="w-100" type="primary" :ghost="pay.click">
                                <a-icon class="ml-2" type="plus-square" style="vertical-align: 1.5px;" />
                                {{pay.type}}
                            </a-button>
                        </div>
                    </template>
                </div>
                <label for="type" class="mt-2"><b>Tipo</b></label>
                <a-input class="w-100 mb-2" placeholder="Método de pago" :disabled="serviceSelecteds.length > 0 ? false : true" v-model="payment.type">
                    <a-icon slot="preffix" type="credit-card" style="vertical-align: 1.5px;" />
                </a-input>
                <label for="type"><b>Total</b></label>
                <currency-input
                    :disabled="serviceSelecteds.length > 0 ? false : true"
                    v-model="payment.total"
                    locale="de"
                    class="ant-input w-100 mb-3"
                />
                <a-button @click="addPayment()" :disabled="serviceSelecteds.length > 0 ? false : true" type="primary" class="float-right w-50">
                    Agregar pago
                </a-button>
                <hr class="mt-5 mb-2">
                <a-config-provider>
                    <template #renderEmpty>
                        <div style="text-align: center">
                            <a-icon type="warning" style="font-size: 20px" />
                            <h2>no ha ingresado métodos de pago</h2>
                        </div>
                    </template>
                    <a-list bordered :data-source="paysSelecteds">
                        <a-list-item slot="renderItem" slot-scope="item, index">
                            Método: {{ item.type }} 
                            <span class="ml-4">Total: {{item.total | formatPrice}}</span>
                            <a-button style="margin-top:-6px;" @click="removePay(index)" type="danger" class="float-right">
                                <a-icon type="close-circle" style="vertical-align: 1.5px;"/>
                            </a-button>
                        </a-list-item>
                    </a-list>
                </a-config-provider>
                <hr class="mt-2 mb-2">
                <h3>Pagado: {{totalPay | formatPrice}}</h3>
                <h3>Total: {{totalSale | formatPrice}}</h3>
                <p><b>Por pagar: </b>{{showPerPay(perPay) | formatPrice}} | <b>Vuelto: {{restPay | formatPrice}}</b></p>
                <a-button style="margin-top:-6px;" type="primary" class="float-right">
                    <a-icon type="shopping" style="vertical-align: 1.5px;"/>
                    Procesar
                </a-button>
            </div>
            <modal :show.sync="modals.modal1"
                :gradient="modals.type"
                modal-classes="modal-danger modal-dialog-centered">
                <div class="py-3 text-center">
                    <i :class="modals.icon"></i>
                    <h1 class="heading mt-5">{{modals.message}}</h1>
                </div>
            </modal>
            <modal :show.sync="modals.modal2"
                body-classes="p-0"
                modal-classes="modal-dialog-centered modal-md">
                <h6 slot="header" class="modal-title" id="modal-title-default"></h6>
            <card type="secondary" shadow
                    header-classes="bg-white pb-5"
                    body-classes="px-lg-5"
                    class="border-0">
                <template>
                    <div class="text-muted text-center mb-3">
                        <h1>Datos del cliente</h1> 
                    </div>
                </template>
                <template>
                    <form role="form">
                            <base-input alternative
                                class="mb-3"
                                placeholder="Nombre"
                                v-model="registerClient.firstName"
                                v-on:keyup="validRegister(2)"
                                addon-left-icon="ni ni-single-02">
                            </base-input>
                            <base-input alternative
                                class="mb-3"
                                placeholder="Nombre"
                                v-model="registerClient.lastName"
                                v-on:keyup="validRegister(2)"
                                addon-left-icon="ni ni-single-02">
                            </base-input>
                            <base-input alternative
                                type="text"
                                placeholder="Correo"
                                v-model="registerClient.email"
                                v-on:keyup="validRegister(2)"
                                addon-left-icon="fa fa-address-card">
                            </base-input>
                            <div class="row">
                                <div class="col-md-3">
                                    <base-input alternative
                                        type="text"
                                        value="+56"
                                        readonly="true">
                                    </base-input>
                                </div>
                                <div class="col-md-9">
                                    <base-input alternative
                                        type="text"
                                        placeholder="Teléfono"
                                        v-on:input="formatPhone"
                                        maxlength="9"
                                        v-model="registerClient.phone"
                                        addon-left-icon="fa fa-address-card">
                                    </base-input>
                                </div>
                            </div>
                            <base-input alternative
                                type="text"
                                placeholder="Instagram"
                                v-model="registerClient.instagram"
                                addon-left-icon="fa fa-address-card">
                            </base-input>
                            <base-input v-if="!ifEdit" addon-left-icon="ni ni-calendar-grid-58">
                                <flat-picker 
                                        slot-scope="{focus, blur}"
                                        @on-open="focus"
                                        @on-close="blur"
                                        :config="configDate"
                                        class="form-control datepicker"
                                        placeholder="Seleccione una fecha"
                                        v-model="registerClient.birthday">
                                </flat-picker>
                            </base-input>
                            <base-checkbox v-if="!ifEdit" v-model="registerClient.discount" class="mb-3">
                                Descuento de nuevo cliente
                            </base-checkbox>
                            <vue-single-select 
                                v-if="!ifEdit"
                                v-model="registerClient.recommender"
                                :options="clientNames"
                                placeholder="Recomendador"
                            ></vue-single-select>
                            <div class="text-center">
                                <base-button type="default" v-if="!registerClient.valid" disabled class="my-4">Registrar</base-button>
                                <base-button type="default" v-on:click="registerClients()" v-if="registerClient.valid && !ifEdit" class="my-4">Registrar</base-button>
                                <base-button type="default" v-on:click="editClient()" v-if="registerClient.valid && ifEdit" class="my-4">Editar</base-button>
                            </div> 
                        </form>
                </template>
            </card>
            </modal>
            <modal :show.sync="modals.modal3"
                body-classes="p-0"
                modal-classes="modal-dialog-centered modal-md">
                <h6 slot="header" class="modal-title" id="modal-title-default"></h6>
                <card type="secondary" shadow
                    header-classes="bg-white pb-5"
                    body-classes="px-lg-5"
                    class="border-0">
                <template>
                    <div style="margin-top:-15%" class="text-muted text-center mb-3">
                        <h1>Nuevo servicio</h1> 
                    </div>
                </template>
                <template>
                        <form role="form">
                            <base-input alternative
                                v-on:change="validRegister(1)"
                                class="mb-3"
                                placeholder="Nombre"
                                addon-left-icon="ni ni-single-copy-04"
                                v-model="registerService.serviceRegister">
                            </base-input>
                            <base-input alternative
                                v-on:change="validRegister(1)"
                                type="number"
                                max-count="100"
                                placeholder="comision (%)"
                                addon-left-icon="ni ni-money-coins"
                                v-model="registerService.comissionRegister">
                            </base-input>
                            <currency-input
                                v-on:change="validRegister(1)"
                                v-model="registerService.priceRegister"
                                locale="de"
                                placeholder="Costo"
                                class="form-control mb-3"
                                style="margin-top:-10px;"
                            />	
                            <select class="form-control mb-3" v-on:change="validRegister(1)" v-model="registerService.timeRegister">
                                <option style="color:black;" selected value="Seleccione el tiempo">Seleccione el tiempo</option>
                                <option style="color:black;" value="15">15 Minutos</option>
                                <option style="color:black;" value="30">30 Minutos</option>
                                <option style="color:black;" value="45">45 Minutos</option>
                                <option style="color:black;" value="60">60 Minutos (1 Hr)</option>
                                <option style="color:black;" value="90">90 Minutos (1:30 Hr)</option>
                                <option style="color:black;" value="120">120 Minutos (2 Hr)</option>
                                <option style="color:black;" value="150">150 Minutos (2:30 Hr)</option>
                                <option style="color:black;" value="180">180 Minutos (3 Hr)</option>
                                <option style="color:black;" value="210">210 Minutos (3:30 Hr)</option>
                                <option style="color:black;" value="240">240 Minutos (4 Hr)</option>
                            </select>
                            <div  class="row mx-auto mt-2">
                                <h3 class="w-100 text-center">¿Aplica descuento?</h3>
                                <base-radio name="false" inline class="mb-3 mx-auto" v-model="registerService.addDiscount"> <b>Si</b> </base-radio>
                                <base-radio name="true" inline class="mb-3 mx-auto" v-model="registerService.addDiscount"> <b>No</b> </base-radio> 
                            </div>
                            <vue-custom-scrollbar class="maxHeight">
                                <vue-bootstrap4-table :rows="registerService.lenders" :columns="columnsLender" :classes="classes" :config="configLender" v-on:on-select-row="selected" v-on:on-all-select-rows="selectedAll" v-on:on-unselect-row="unSelected" v-on:on-all-unselect-rows="unSelectedAll">
                                </vue-bootstrap4-table>
                            </vue-custom-scrollbar >
                            <div class="text-center">
                                <base-button v-if="!registerService.valid" type="default" class="my-4" v-on:click="registerServiceProcess()" disabled>Registrar</base-button>
                                <base-button v-else type="default" class="my-4" v-on:click="registerServiceProcess()" >Registrar</base-button>
                            </div>
                        </form>
                </template>
            </card>
            </modal>
            <modal :show.sync="modals.modal4"
                body-classes="p-0"
                modal-classes="modal-dialog-centered modal-md">
                <h6 slot="header" class="modal-title" id="modal-title-default"></h6>
                <card type="secondary" shadow
                    header-classes="bg-white pb-5"
                    body-classes="px-lg-5 py-lg-5"
                    class="border-0">
                    <template>
                        <div class="text-muted text-center mb-3">
                            <h3>Registrar monto de apertura</h3>
                        </div>
                    </template>
                    <template>
                        <form role="form">
                            <base-input 
                                alternative
                                class="mb-3"
                                placeholder="Nombre el cajero"
                                v-on:keyup="validRegister(3)"
                                v-model="cashFunds.cashName"
                                addon-left-icon="ni ni-circle-08">
                            </base-input>
                            <currency-input
                                v-model="cashFunds.cashAmount"
                                v-on:keyup="validRegister(3)"
                                locale="de"
                                addon-left-icon="ni ni-money-coins"
                                class="form-control mb-3"
                                style="margin-top:-10px;"
                            />	
                            <base-button v-if="!cashFunds.valid" type="default" disabled>
                                Ingresar fondo
                            </base-button>
                            <base-button v-else type="default" v-on:click="registerFund">
                                Ingresar fondo
                            </base-button> 
                        </form>
                </template>
                </card>
            </modal>
            <modal :show.sync="modals.modal5"
                body-classes="p-0"
                modal-classes="modal-dialog-centered modal-md">
                <h6 slot="header" class="modal-title p-0 m-0" id="modal-title-default"></h6>
                <card type="secondary" shadow
                    header-classes="bg-white pb-5"
                    body-classes="px-lg-5 "
                    class="border-0">
                    <template>
                        <div style="margin-top:-10%" class="text-muted text-center mb-3">
                            <h3>Validación de código</h3>
                        </div>
                    </template>
                    <template>
                        <form role="form">
                            <base-input 
                                alternative
                                class="mb-3"
                                placeholder="Código"
                                v-model="codeArticulo"
                                addon-left-icon="ni ni-key-25">
                            </base-input>
                            
                            
                            <base-button type="default" v-on:click="validCode()">
                                Verificar
                            </base-button> 
                        </form>
                </template>
                </card>
            </modal>
            <modal :show.sync="modals.modal6"
                body-classes="p-0"
                modal-classes="modal-dialog-centered modal-md">
                <card type="secondary" shadow
                    header-classes="bg-white pb-5"
                    body-classes="px-lg-5 py-lg-5"
                    class="border-0">
                    <template>
                        <div class="col-sm-12">
                            <base-button class="col-12  p-2 mt-1" type="secondary">
                                <span class="text-center"> Comprador <br> </span>
                                <badge style="font-size:0.8em !important" type="success" class="text-default mt-2">{{compradorArticulo}}</badge>
                            </base-button>
                            <base-button class="col-12  p-2 mt-1" type="secondary">
                                <span class="text-center"> Medio de pago <br> </span>
                                <badge style="font-size:0.8em !important" type="success" class="text-default mt-2">{{medioPagoArticulo}}</badge>
                            </base-button>
                            <base-button class="col-12  p-2 mt-1" type="secondary">
                                <span class="text-center"> Articulo <br> </span>
                                <badge style="font-size:0.8em !important" type="success" class="text-default mt-2">{{articulo}}</badge>
                            </base-button>
                            <base-button class="col-12  p-2 mt-1" type="secondary">
                                <span class="text-center"> Monto del pedido <br> </span>
                                <badge style="font-size:0.8em !important" type="success" class="text-default mt-2">{{totalArticulo}}</badge>
                            </base-button>
                            <base-button class="col-12  p-2 mt-1" type="secondary">
                                <span class="text-center"> Estado <br> </span>
                                <badge v-if="estadoArticulo == 'Nconfirmado'" style="font-size:0.8em !important" type="danger" class="text-default mt-2">Sin confirmar</badge>
                                <badge v-else-if="estadoArticulo == 'confirmado'" style="font-size:0.8em !important" type="success" class="text-default mt-2">confirmado</badge>
                                <badge v-else style="font-size:0.8em !important" type="default" class="text-default mt-2">Usado</badge>
                            </base-button>
                        </div>
                        <center>
                            <base-button v-if="estadoArticulo == 'confirmado'" type="success" class="mt-5" v-on:click="verifyCode()">
                                Validar
                            </base-button>
                            <base-button v-else type="default" disabled class="mt-5">
                                Validar
                            </base-button> 
                        </center>
                    </template>
                </card>
            </modal>
            <!-- <div v-if="validRoute('procesar', 'nuevo_cliente')" v-bind:style="{  'height': '45px', 'z-index' : '1000' }" v-on:click="modals.modal2 = true" class="p-2 menuVerVentas navSVenta" v-on:mouseenter="mouseOverVenta(newClient)" v-on:mouseleave="mouseLeaveVenta(newClient)">
                <div class="row">
                    <div class="col-2 pt-1">
                        <font-awesome-icon v-if="ifEdit" class="icons" style="color:#172b4d;font-size:1em" icon="user-edit" />
                        <font-awesome-icon v-else class="icons" style="color:#172b4d;font-size:1em" icon="user-plus" />
                    </div>
                    <div v-if="newClient.valid" class="col-9 pl-4 pt-1">
                        <b style="font-size:14px;">{{newClient.text}}</b>	
                    </div>
                </div>	
            </div>
            <div v-else v-bind:style="{  'height': '45px', 'z-index' : '1000' }" class="p-2 navSVenta">
                <div class="row">
                    <div class="col-2 pt-1">
                        <font-awesome-icon v-if="ifEdit" class="icons" style="color:#f5365c;font-size:1em" icon="user-edit" />
                        <font-awesome-icon v-else class="icons" style="color:#f5365c;font-size:1em" icon="user-plus" />
                    </div>
                    <div v-if="newClient.valid" class="col-9 pl-4 pt-1">
                        <b style="font-size:14px;">{{newClient.text}}</b>	
                    </div>
                </div>	
            </div>
            <div v-if="validRoute('procesar', 'nuevo_servicio')" v-bind:style="{  'height': '45px', 'z-index' : '1000' }" v-on:click="modals.modal3 = true" class="p-2 menuVerServi navSServi" v-on:mouseenter="mouseOverVenta(newService)" v-on:mouseleave="mouseLeaveVenta(newService)">
                <div class="row">
                    <div class="col-2 pt-1">
                        <font-awesome-icon class="icons" style="color:#172b4d;font-size:1em" icon="folder-plus" />
                    </div>
                    <div v-if="newService.valid" class="col-9 pl-4 pt-1">
                        <b style="font-size:14px;">{{newService.text}}</b>	
                    </div>
                </div>
            </div>
            <div v-else v-bind:style="{  'height': '45px', 'z-index' : '1000' }" class="p-2 navSServi">
                <div class="row">
                    <div class="col-2 pt-1">
                        <font-awesome-icon class="icons" style="color:#f5365c;font-size:1em" icon="folder-plus" />
                    </div>
                    <div v-if="newService.valid" class="col-9 pl-4 pt-1">
                        <b style="font-size:14px;">{{newService.text}}</b>	
                    </div>
                </div>
            </div>
            <div v-bind:style="{  'height': '45px', 'z-index' : '1000' }" v-on:click="initialState()" class="p-2 menuVerRedo navSRedo" v-on:mouseenter="mouseOverVenta(reloadSales)" v-on:mouseleave="mouseLeaveVenta(reloadSales)">
                <div class="row">
                    <div class="col-2 pt-1">
                        <font-awesome-icon class="icons" style="color:#172b4d;font-size:1em" icon="redo" />
                    </div>
                    <div v-if="reloadSales.valid" class="col-10 pl-4 pt-1">
                        <b style="font-size:14px;">{{reloadSales.text}}</b>	
                    </div>
                </div>
            </div>
            <div v-bind:style="{  'height': '42px', 'z-index' : '1000' }" v-on:click="modals.modal5 = true, codeArticulo = ''" class="p-2 menuVerRedo navSCode" v-on:mouseenter="mouseOverVenta(reloadSales)" v-on:mouseleave="mouseLeaveVenta(reloadSales)">
                <div class="row">
                    <div class="col-2 pt-1">
                        <font-awesome-icon class="icons" style="color:#172b4d;font-size:1em" icon="pager" />
                    </div>
                    <div v-if="reloadSales.valid" class="col-10 pl-4 pt-1">
                        <b style="font-size:14px;">Validar código</b>	
                    </div>
                </div>
            </div> -->
        </div>
    </a-spin>
</template>
<script>
import axios from 'axios'
import router from '../router'
import endPoint from '../../config-endpoint/endpoint.js'
import jwtDecode from 'jwt-decode'
import io from 'socket.io-client';
import EventBus from './EventBus'
import vueCustomScrollbar from 'vue-custom-scrollbar'
import VueBootstrap4Table from 'vue-bootstrap4-table'
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
export default {
    components: {
        vueCustomScrollbar,
        VueBootstrap4Table,
        flatPicker
    },
    data(){
        return {
            socket: io(endPoint.endpointTarget),
            auth: [],
            validator:true,
            validatorBtn:true,
            spinning:false,
            modals: {
                modal1: false,
                modal2: false,
                modal3: false,
                modal4: false,
                modal5: false,
                modal6: false,
                message: "",
                icon: '',
                type:''
            },
            priceService: 0,
            priceServiceReal: 0,
            discountService: '',
            discountServiceIf: false,
            typesPay: [],
            payment: {
                type: '',
                total: 0
            },
            configHeader: {
                headers: {
                    "x-database-connect": endPoint.database, 
                    "x-access-token": localStorage.userToken
                }
            },
            configDate: {
                allowInput: true, 
                dateFormat: 'd-m-Y',
            },
            registerClient: {
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                instagram: '',
                birthday: '',
                discount: false,
                recommender: '',
                valid: false,
            },
            articulo:'',
            compradorArticulo:'',
            medioPagoArticulo:'',
            estadoArticulo:'',
            idArticulo:'',
            codeArticulo:'',
            totalArticulo:'',
            cashFunds: {
                cashName: '',
                cashAmount: 0,
                valid: false,
            },
            registerService: {
                serviceRegister: '',
                comissionRegister: '',
                priceRegister: 0,
                timeRegister: 'Seleccione el tiempo',
                addDiscount: false,
                lenderSelecteds: [],
                lenders: [],
                valid:false
            },
            columnsLender: [{
                label: "Nombre",
                name: "firstName",
                // filter: {
                //     type: "simple",
                //     placeholder: "id"
                // },
                sort: true,
            }],
            progress: false,
            columnDates: [
                {
                    title: 'Fecha',
                    dataIndex: 'createdAT',
                    key: 'createdAT',
                    ellipsis: true,
                    scopedSlots: { customRender: 'date-slot' }
                },
                {
                    title: 'Servicio',
                    dataIndex: 'service',
                    key: 'service',
                    ellipsis: true,
                    scopedSlots: { customRender: 'service-slot' }
                },
                {
                    title: 'Empleado',
                    dataIndex: 'employe',
                    key: 'employe',
                    ellipsis: true,
                    scopedSlots: { customRender: 'employe-slot' }
                },
                {
                    title: 'Total',
                    dataIndex: 'total',
                    key: 'total',
                    ellipsis: true,
                    scopedSlots: { customRender: 'total-slot' }
                },
                {
                    title: '',
                    dataIndex: '_id',
                    key: '_id',
                    ellipsis: true,
                    scopedSlots: { customRender: 'actionInsert' }
                },
            ],
            columns: [
                {
                    title: 'Item',
                    dataIndex: 'item',
                    key: 'item',
                    width: '25%',
                    ellipsis: true,
                    scopedSlots: { customRender: 'item-slot' }
                },
                {
                    title: 'Precio',
                    dataIndex: 'price',
                    key: 'price',
                    width: '20%',
                    ellipsis: false,
                    scopedSlots: { customRender: 'price-slot' }
                },
                {
                    title: 'Descuento',
                    dataIndex: 'discount',
                    key: 'discount',
                    width: '15%',
                    ellipsis: false,
                    scopedSlots: { customRender: 'discount-slot' }
                },
                {
                    title: 'Adicional',
                    dataIndex: 'additionalTotal',
                    key: 'additionalTotal',
                    width: '15%',
                    ellipsis: false,
                    scopedSlots: { customRender: 'additional-slot' }
                },
                {
                    title: 'Total',
                    dataIndex: 'total',
                    key: 'total',
                    width: '15%',
                    ellipsis: true,
                    scopedSlots: { customRender: 'total-slot' }
                },
                {
                    title: '',
                    dataIndex: 'id',
                    key: 'id',
                    width: '10%',
                    ellipsis: false,
                    scopedSlots: { customRender: 'actionRemove' }
                }
            ],
            configLender: {
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
                    visibility: true,
                    case_sensitive: false,
                    showClearButton: true,
                    searchOnPressEnter: false,
                    searchDebounceRate: 200,                      
                },
            },
            classes: {
                table: "table-bordered table-striped"
            },
            clientNames: [],
            clientIds: [],
            clients: [],
            clientSelect: null,
            lenderNames: [],
            lenderSelect: null,
            services: [],
            inspector: false,
            countServices: [],
            price: 0,
            discount: '',
            design: 0,
            payOrder:0,
            haveCode:false,
            subTotal: 0,
            total: 0,
            discountSelect: "Descuento",
            totalSinFormato:0,           
            serviciosSelecionados:[],
            resto: 0,
            dates: {
                dateSale: new Date()
            },
            idProcess: '',
            docLender: '',
            newClient: {
                valid: false,
                text: 'Nuevo cliente'
            },
            newService: {
                valid: false,
                text: 'Nuevo servicio'
            },
            reloadSales: {
                valid: false,
                text: 'Reiniciar datos'
            },
            ifEdit: false, 
            inspectorDate: false,
            editClientId: '',
            ifrecomend: false,
            branchName: '',
            branch: '',
            microservices: [],
            microSelect: {
                name: '',
                price: 0
            },
            quantityMicro: 1,
            microserviceSelecteds: [],
            serviceSelecteds: [],
            datesFinally: [],
            itemData: {
                item: {},
                price: 0,
                realPrice: 0,
                discountServiceIf: false,
                discountService: '',
                employe: {
                    id: '',
                    name: '',
                    document: ''
                },
                commission: 0
            },
            totalSale: 0,
            products: [],
            perPay: 0,
            restPay: 0,
            totalPay: 0,
            paysSelecteds: [],
            microValid: true
        }
    },
    created(){
        this.getToken()
        this.getBranch()
        setTimeout(() => {
            $('.anticon-close-circle').click()
        }, 1000);
    },
    methods: {
        getToken(){
            const token = localStorage.userToken
            const decoded = jwtDecode(token)  
            this.auth = decoded.access
        },
        changeDate(){
            this.inspectorDate = true
        },
        selected(value){
            this.registerService.lenderSelecteds.push(value.selected_item._id)
            this.validRegister(1)
        },
        async getTypesPay(){
            try {
                const pays = await axios.get(endPoint.endpointTarget+'/configurations/'+this.branch, this.configHeader)
                if (pays.data.status == 'ok') {
                    
                    for (const element of pays.data.data.typesPay) {
                        this.typesPay.push({
                            type: element,
                            total: 0,
                            click: true
                        })
                    }
                }
            }catch(err){
                this.$swal({
					icon: 'error',
					title: 'Acceso invalido, ingrese de nuevo, si el problema persiste comuniquese con el proveedor del servicio',
					showConfirmButton: false,
					timer: 2500
				})
				router.push({name: 'login'})
            }
        },
        getBranch(){
            this.branchName = localStorage.branchName  
            this.branch = localStorage.branch
            this.getClient()
            this.getLenders()
            this.getServices()
            this.getTypesPay()
            this.getMicroservices()
            this.getProducts()
            this.getFinallyDates()
        },
        async getFinallyDates(){
            try {
                const datesFinally = await axios.get(endPoint.endpointTarget+'/dates/getEndingDates/'+this.branch, this.configHeader)
                if (datesFinally.data.status == 'ok') {
                    this.datesFinally = datesFinally.data.data
                } 
                console.log(datesFinally)
            }catch(err){
                console.log(err)
            }
        },
        unSelected(value){
            for (let i = 0; i < this.registerService.lenderSelecteds.length; i++) {
                if (this.registerService.lenderSelecteds[i] == value.unselected_item._id) {
                    this.registerService.lenderSelecteds.splice(i, 1)
                    break
                }
            }
            this.validRegister(1)
        },
        selectedAll(value){
            for (let index = 0; index < value.selected_items.length; index++) {
                this.registerService.lenderSelecteds.push(value.selected_items[index]._id)
            }
            this.validRegister(1)
        },
        unSelectedAll(value){
            this.registerService.lenderSelecteds = []
            this.validRegister(1)
        },
        validRegister(valid){
            if (valid == 1) {
                this.registerService.valid = this.registerService.lenderSelecteds.length > 0 && this.registerService.serviceRegister != '' && this.registerService.priceRegister > 0 && this.registerService.timeRegister != 'Seleccione el tiempo' && this.registerService.comissionRegister != '' ? true : false
            }else if (valid == 2) {
                if (this.registerClient.firstName != '' && this.registerClient.lastName != '' && this.registerClient.email != '') {
                    if (this.registerClient.email.split('@').length == 2) {
                        if (this.registerClient.email.split('@')[1].split('.').length == 2) {
                            this.registerClient.valid = true
                        }else{
                            this.registerClient.valid = false
                        }
                    }else{
                        this.registerClient.valid = false
                    }
                }else{
                    this.registerClient.valid = false
                }
            }else{
                this.cashFunds.valid = this.cashFunds.cashName != '' && this.cashFunds.cashAmount > 0 ? true : false
            }
        },
        formatPhone(){
            var number = this.registerClient.contactOne.replace(/[^\d]/g, '')
            if (number.length == 9) {
                number = number.replace(/(\d{1})(\d{4})/, "$1-$2-");
            } else if (number.length == 10) {
                number = number.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
            }
            this.registerClient.contactOne = number
        },
        registerFund(){
			axios.post(endPoint.endpointTarget+'/sales/registerFund', {
				userRegister: this.cashFunds.cashName,
				amount: this.cashFunds.cashAmount,
                branch: this.branch
			}, this.configHeader).then(res => {
				if (res.data.status == 'ok') {
                    this.$swal({
                        icon: 'success',
                        title: 'Monto de caja registrado.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.cashFunds.cashName = ''
                    this.cashFunds.cashAmount = ''
                    this.cashFunds.valid = false
				}
			})
        },
        editClient(){
            const phone = this.registerClient.phone.length > 0 ? '+56 '+this.registerClient.phone : ''
            axios.put(endPoint.endpointTarget+'/clients/'+this.editClientId, {
                firstName: this.registerClient.firstName,
                lastName: this.registerClient.lastName,
                email: this.registerClient.email,
                phone: phone,
                instagram: this.registerClient.instagram
            }, this.configHeader)
            .then(res => {
                if (res.data.status == 'update client') {
                    this.$swal({
                        icon: 'success',
                        title: 'El cliente se editó con éxito.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.getClient()
                }else{
                    this.$swal({
                        icon: 'error',
                        title: 'El cliente ya existe.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
        },
        registerClients(){
            var date = this.registerClient.birthday
            if (this.registerClient.birthday.split('-')[1]) {
                var split = this.registerClient.birthday.split('-')
                date = split[1]+'-'+split[0]+'-'+split[2]
            }
            if (this.registerClient.recommender != '') {
                for (let i = 0; i < this.clientIds.length; i++) {
                    const spId = this.clientIds[i].split("-")
                    if (spId[0] == this.registerClient.recommender) {
                        idRecomender = spId[1]
                    } 
                }
            }
            var ifCheck = this.registerClient.discount ? 0 : 1
            const phone = this.registerClient.phone.length > 0 ? '+56 '+this.registerClient.phone : ''
            axios.post(endPoint.endpointTarget+'/clients', {
                firstName: this.registerClient.firstName,
                lastName: this.registerClients.lastName,
                email: this.registerClient.email,
                recommender: this.registerClient.recommender,
                idRecommender: idRecomender,
                phone: phone,
                birthday: date,
                instagram: this.registerClient.instagram,
                ifCheck: ifCheck
            })
            .then(res => {
                if (res.data.status == 'client create') {
                    this.$swal({
                        icon: 'success',
                        title: 'Cliente registrado.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.getClient()
                    this.registerClient = {
                        name: '',
                        id: '',
                        contactOne: '',
                        contactTwo: '',
                        discount: false,
                        recommender: '',
                        valid: false,
                    }
                }else{
                    this.$swal({
                        icon: 'error',
                        title: 'El cliente ya existe.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
        },
        mouseOverVenta(objectType){
            setTimeout(() => {
               objectType.valid = true 
            }, 500);
             
		},
		mouseLeaveVenta(objectType){
            objectType.valid = false
		},
        registerServiceProcess(){
            var ifCheck = this.registerService.addDiscount ? false : true
            axios.post(endPoint.endpointTarget+'/services', {
                branch: this.branch,
                name: this.registerService.serviceRegister,
                price: this.registerService.priceRegister,
                commission: this.registerService.comissionRegister,
                duration: this.registerService.timeRegister,
                employes: this.registerService.lenderSelecteds,
                descuento: ifCheck,
                products: []
            }, this.configHeader)
            .then(res => {
                if(res.data.status == 'ok'){
                    this.$swal({
                        icon: 'success',
                        title: 'Servicio registrado.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.registerService = {
                        serviceRegister: '',
                        comissionRegister: '',
                        priceRegister: 0,
                        timeRegister: 'Seleccione el tiempo',
                        addDiscount: false,
                        lenderSelecteds: [],
                        lenders: [],
                        valid:false
                    }
                    this.getServices();
                    
                }else{
                    this.$swal({
                        icon: 'error',
                        title: 'El servicio ya existe.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
		},
        async getClient(){
            try {
                const getClient = await axios.get(endPoint.endpointTarget+'/clients', this.configHeader)
                if (getClient.data.status == 'ok') {
                    this.clients = getClient.data.data
                    this.clientNames = []
                    for (let index = 0; index < getClient.data.data.length; index++) {
                        this.clientNames.push(getClient.data.data[index].firstName+ ' / ' +getClient.data.data[index].email)
                        this.clientIds.push(getClient.data.data[index].firstName + " / " + getClient.data.data[index].email + "-" + getClient.data.data[index]._id)
                    }
                }
            }catch(err){
                this.$swal({
					icon: 'error',
					title: 'Acceso invalido, ingrese de nuevo, si el problema persiste comuniquese con el proveedor del servicio',
					showConfirmButton: false,
					timer: 2500
				})
				router.push({name: 'login'})
            }
        },
        async getLenders(){
            try {
                const employes = await axios.get(endPoint.endpointTarget+'/employes/employesbybranch/'+this.branch, this.configHeader)
                if (employes.data.status == 'ok') {
                    this.registerService.lenders = employes.data.data
                }
            }catch(err){
                this.$swal({
					icon: 'error',
					title: 'Acceso invalido, ingrese de nuevo, si el problema persiste comuniquese con el proveedor del servicio',
					showConfirmButton: false,
					timer: 2500
				})
				router.push({name: 'login'})
            }
        },
        async getServices(){
            try {
                const services = await axios.get(endPoint.endpointTarget+'/services/'+this.branch, this.configHeader)
                if (services.data.status == 'ok') {
                    this.services = services.data.data
                }
            }catch(err){
                this.$swal({
					icon: 'error',
					title: 'Acceso invalido, ingrese de nuevo, si el problema persiste comuniquese con el proveedor del servicio',
					showConfirmButton: false,
					timer: 2500
				})
				router.push({name: 'login'})
            }
        },
        async getProducts(){
            try {
                const product = await axios.get(endPoint.endpointTarget+'/stores/getproductsales/'+this.branch, this.configHeader)
                if (product.data.status == 'ok') {
                    this.products = product.data.data
                    console.log(this.products)
                }
            }catch(err){
                this.$swal({
					icon: 'error',
					title: 'Acceso invalido, ingrese de nuevo, si el problema persiste comuniquese con el proveedor del servicio',
					showConfirmButton: false,
					timer: 2500
				})
				router.push({name: 'login'})
            }
        },
        addItem(type, index){
            var dateItem = 'none'
            if (type == 'date') {
                for (const micro of this.datesFinally[index].microServices) {
                    this.microserviceSelecteds.push({id: new Date().getTime(), name: micro.name, price: micro.price})
                }
                this.itemData.item = this.datesFinally[index].service
                this.itemData.tag = 'service'
                this.itemData.employe = this.datesFinally[index].employe
                this.itemData.realPrice = this.datesFinally[index].total
                this.itemData.price = this.datesFinally[index].total
                this.itemData.commission = this.datesFinally[index].service.commission
                this.itemData.discountServiceIf = this.datesFinally[index].service.discount
                this.itemData.discountService = this.datesFinally[index].discount
                dateItem = this.datesFinally[index]
                this.datesFinally.splice(index, 1)
            }
            var total = 0
            var additionals = ''
            for (const micro of this.microserviceSelecteds) {
                total = total + parseFloat(micro.price)
                additionals = additionals == '' ? micro.name : additionals + ', '+micro.name 
            }
            var description = this.itemData.tag == 'service' ? `Servicio: ${this.itemData.item.name} | Empleado: ${this.itemData.employe.name} | Adicionales: ${additionals}` : `1 ${this.itemData.item.measure}`
            if (this.itemData.item.name && this.itemData.realPrice > 0 && this.itemData.price > 0 && this.itemData.tag != '') {
                var valid = false
                if (this.itemData.tag == 'service') {
                    valid = this.itemData.employe.name != '' ? true : false
                }else{
                    valid = true
                }
                if (valid) {
                    this.serviceSelecteds.push({
                        item: this.itemData.item,
                        price: this.itemData.realPrice,
                        discount: this.itemData.discountService == '' ? 0 : this.itemData.discountService,
                        additionalTotal: total,
                        additionals: this.microserviceSelecteds,
                        ifDiscount: this.itemData.discountServiceIf,
                        total: this.itemData.price + total,
                        commission: this.itemData.commission,
                        productsService: this.itemData.item.products ? this.itemData.item.products : 'none',
                        tag: this.itemData.tag,
                        employe: this.itemData.tag == 'service' ? this.itemData.employe : 'none',
                        description: description,
                        datesItem: dateItem
                    })
                    this.itemData = {
                        item: {},
                        price: 0,
                        realPrice: 0,
                        discountServiceIf: false,
                        discountService: '',
                        employe: {
                            id: '',
                            name: '',
                            document: ''
                        },
                        commission: 0,
                        tag: ''
                    }
                    this.calculatedTotal()
                    this.microserviceSelecteds = []
                    console.log(this.serviceSelecteds)
                    $('.ant-select-selection__clear').click()
                }else{
                    this.$swal({
                        icon: 'error',
                        title: 'Debe llenar todos los campos',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            }else{
                this.$swal({
                    icon: 'error',
                    title: 'Debe llenar todos los campos',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        },
        calculatedTotal(){
            var total = 0
            for (const items of this.serviceSelecteds) {
                total = total + items.total
            }
            this.totalSale = total
            this.perPay = this.totalSale - this.totalPay
            this.restPay = this.perPay < 0 ? Math.abs(this.perPay) : 0
        },
        removeItem(key){
            if (this.serviceSelecteds[key].datesItem != 'none') {
                this.datesFinally.push(this.serviceSelecteds[key].datesItem)
            }
            this.serviceSelecteds.splice(key, 1)
            this.calculatedTotal()
            if (this.serviceSelecteds.length == 0) {
                this.paysSelecteds = []
                this.perPay = 0
                this.totalPay = 0
                this.restPay = 0
            }
        },
        showPerPay(value){
            return value < 0 ? 0 : value
        },
        selectPay(key){
            for (const pay of this.typesPay) {
                pay.click = true
            }
            this.typesPay[key].click = false
            this.payment.type = this.typesPay[key].type
            this.payment.total = this.perPay
        },
        addPayment(){
            for (const pay of this.typesPay) {
                pay.click = true
            }
            var valid = true
            for (const pay of this.paysSelecteds) {
                if (pay.type == this.payment.type) {
                    pay.total = pay.total + this.payment.total
                    valid = false
                    break
                }
            }
            if (valid) {
                this.paysSelecteds.push({
                    type: this.payment.type,
                    total: this.payment.total
                })
            }
            var total = 0
            for (const pay of this.paysSelecteds) {
                total = total + pay.total
            }
            this.totalPay = total
            this.calculatedTotal()
            this.payment.type = ''
            this.payment.total = 0
        },
        removePay(key){
            this.totalPay = this.totalPay - this.paysSelecteds[key].total
            this.paysSelecteds.splice(key, 1)
            this.calculatedTotal()
        },
        formatPrice(value) {
            let val = (value/1).toFixed(2).replace('.', ',')
            return '$ '+val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        hundredPercent(index){
            this.typesPay.forEach(element => {
                element.total = 0
            });
            this.typesPay[index].total = parseFloat(this.totalSinFormato) - parseFloat(this.payOrder)
        },
        addDiscountFunc(){
            var discount = this.itemData.discountService < 10 ? '0'+this.itemData.discountService : this.itemData.discountService
            if (this.itemData.discountService != '') {
                console.log(this.itemData.realPrice +' '+(this.itemData.price * parseFloat('0.'+discount)))
                this.itemData.price = this.itemData.realPrice - (this.itemData.realPrice * parseFloat('0.'+discount))
            }else{
                this.itemData.price = this.itemData.realPrice
            }
        },
        addDiscountTable(record, key){
            var discount = record < 10 ? '0'+record : record
            if (this.serviceSelecteds[key].discount > 0) {
                this.serviceSelecteds[key].total = this.serviceSelecteds[key].price - (this.serviceSelecteds[key].price * parseFloat('0.'+discount)) + this.serviceSelecteds[key].additionalTotal
            }else{
                this.serviceSelecteds[key].total = this.serviceSelecteds[key].price + this.serviceSelecteds[key].additionalTotal
            }
            this.calculatedTotal()
        },
        chooseAditional(value){
            if (value) {
                this.microSelect = {
                    name: value.split('/')[0],
                    price: parseFloat(value.split('/')[1])
                }  
                this.microValid = false
            }else{
                this.microValid = true
            }
        },
        addAdditional(){
            this.microValid = true
            this.microserviceSelecteds.push({id: new Date().getTime(), name: this.microSelect.name, price: this.microSelect.price})
            this.microSelect.price = 0
            this.microSelect.name = 'Seleccione'
        },
        removeMicro(index){
            this.itemData.price = this.itemData.price - this.microserviceSelecteds[index].price
            this.itemData.realPrice = this.itemData.realPrice - this.microserviceSelecteds[index].price
            this.microserviceSelecteds.splice(index, 1)
        },
        async chooseEmploye(value){
            if (value) {
                try {
                    const getEmploye = await axios.get(`${endPoint.endpointTarget}/employes/justonebyid/${value}`, this.configHeader)
                    this.itemData.employe.id = getEmploye.data.data._id
                    this.itemData.employe.name = getEmploye.data.data.firstName+' '+getEmploye.data.data.lastName
                    this.itemData.employe.document = getEmploye.data.data.document
                }catch(err) {
                    console.log(err)
                }
            }else{
                this.itemData.employe.id = ''
                this.itemData.employe.name = ''
                this.itemData.employe.document = ''
            }
        },
        async getMicroservices(){
            try {
                const getMicro = await axios.get(`${endPoint.endpointTarget}/configurations/getMicroservice/${this.branch}`, this.configHeader) 
                this.microservices = getMicro.data.data
                console.log(getMicro)
            }catch(err) {
                console.log(err)
            }
        },
        async chooseProduct(value){
            if (value) {
                try {
                    const product = await axios.get(`${endPoint.endpointTarget}/stores/getinventorybyid/${value}`, this.configHeader)
                    product.data.data.name =  product.data.data.product
                    this.itemData.item = product.data.data
                    this.itemData.price = product.data.data.price
                    this.itemData.realPrice = product.data.data.price
                    this.itemData.discountServiceIf = false
                    this.itemData.commission = 0
                    this.itemData.tag = 'product'
                }catch(err){
                    console.log(err)
                }
            }else{
                this.itemData.item = {}
                this.itemData.price = 0
                this.itemData.realPrice = 0
                this.itemData.commission = 0
                this.itemData.discountServiceIf = false
                this.itemData.discountService = ''
                this.microserviceSelecteds = []
                this.itemData.tag = ''
            }
        },
        async chooseService(value){
            if (value) {
                try {
                    const getService = await axios.get(`${endPoint.endpointTarget}/services/getServiceInfo/${value}`, this.configHeader)
                    console.log(getService)
                    this.itemData.item = getService.data.data
                    this.itemData.price = getService.data.data.price
                    this.itemData.realPrice = getService.data.data.price
                    this.itemData.discountServiceIf = getService.data.data.discount
                    this.itemData.commission = getService.data.data.commission
                    this.itemData.tag = 'service'
                }catch(err){
                    console.log(err)
                }
            }else{
                this.itemData.item = {}
                this.itemData.price = 0
                this.itemData.realPrice = 0
                this.itemData.commission = 0
                this.itemData.discountServiceIf = false
                this.itemData.discountService = ''
                this.microserviceSelecteds = []
                this.itemData.tag = ''
            }
        },
        async chooseClient(value){
            this.discount = ''
            this.discountSelect = 'Descuento'
            this.ifrecomend = false
            console.log(value)
            this.clientSelect = value
            if (this.clientSelect) {
                try {
                    const getClient = await axios.get(`${endPoint.endpointTarget}/clients/findOne/${value}`, this.configHeader)
                    this.newClient.text = "Editar cliente"
                    this.ifEdit = true
                    this.editClientId = getClient.data.data._id
                    this.registerClient.firstName = getClient.data.data.firstName
                    this.registerClient.lastName = getClient.data.data.lastName
                    this.registerClient.email = getClient.data.data.email
                    this.registerClient.phone = getClient.data.data.phone.formatNational
                    this.registerClient.instagram = getClient.data.data.instagram
                    this.validRegister(2)
                    if(getClient.data.data.birthday){
                        var birthday = new Date(getClient.data.data.birthday).getMonth()
                        var monthNow = new Date().getMonth()
                        if (birthday == monthNow) {
                            this.discount = 10
                            this.discountSelect = 'Descuento por cumpleaños'
                        }else if (getClient.data.data.recommendations > 0) {
                            this.discount = 15
                            this.ifrecomend = true
                            this.discountSelect = 'Descuento por recomendacion'
                        }else if (getClient.data.data.attends == 0) {
                            this.discount = 10
                            this.discountSelect = 'Descuento por primera atención'
                        }
                    }else if (getClient.data.data.recommendations > 0) {
                        this.discount = 15
                        this.ifrecomend = true
                        this.discountSelect = 'Descuento por recomendacion'
                    }else if (getClient.data.data.attends == 0) {
                        this.discount = 10
                        this.discountSelect = 'Descuento por primera atención'
                    }
                    this.clientSelect = {
                        name: getClient.data.data.firstName,
                        email:getClient.data.data.email
                    }
                }catch(err){
                    console.log(err)
                }
            }else{
                this.newClient.text = "Nuevo cliente"
                this.ifEdit = false
                this.registerClient.firstName = ""
                this.registerClient.lastName = ""
                this.registerClient.email = ""
                this.registerClient.phone = ""
                this.registerClient.instagram = ""
                this.validRegister(2)
            }
            if (this.clientSelect != '' && this.lenderSelect != '') {
                this.validator = false
                this.validatorBtn = false
            }
            else{
                this.validator = true
                this.validatorBtn = true
            }
        },
        getDataToDate(id){
            this.initialState()
            this.validator = false
			this.servicesProcess = []
			this.serviciosSelecionados = []
			this.idProcess = id
			axios.get(endPoint.endpointTarget+'/citas/getDataToDate/'+id)
			.then(res => {
				this.clientSelect = res.data.client
				this.lenderSelect = res.data.employe
				this.servicesProcess = res.data.services
				this.chooseLenderByDataToDate(this.lenderSelect)
				const split = res.data.client.split('/')
				const splitTwo = split[1].split(' ')
				axios.get(endPoint.endpointTarget+'/clients/dataDiscount/'+splitTwo[1])
				.then(res => {
					if (res.data[0].recomendaciones > 0) {
                        this.discount = 15
                        this.ifrecomend = true
                    }else if (res.data[0].participacion == 0) {
                        this.discount = 10
                    }
                    var subTotal = 0
                    var desc = 0
                    for (let index = 0; index < this.servicesProcess.length; index++) {
                        this.serviciosSelecionados.push({servicio: this.servicesProcess[index].servicio, comision: this.servicesProcess[index].comision, precio: this.servicesProcess[index].precio, descuento: this.servicesProcess[index].descuento})
                        let valSpan = ''
                        let sumaVal = 0
                        for (let indexTwo = 0; indexTwo < this.services.length; indexTwo++) {
                            if (this.servicesProcess[index].servicio == this.services[indexTwo].nombre) {
                                subTotal = subTotal + parseFloat(this.services[indexTwo].precio)
                                this.countServices[indexTwo].count++
                            }
                        }
                    }
                    this.price = this.formatPrice(subTotal)
                    if (this.discount == 10) {
                        desc = subTotal * 0.90
                    }
                    else if (this.discount == 15) {
                        desc = subTotal * 0.85
                    }
                    else{
                        desc = subTotal
                    }
                    this.total = this.formatPrice(desc)
                    this.totalSinFormato = desc
                    this.subTotal = subTotal
                
				})
            })
		},
        initialState(){
            this.getServices()
            $('#myInput').val('')
            this.myFunction()
            this.validator = true
            this.validatorBtn = true
			this.price = '0';
			this.serviciosSelecionados = [];
			this.discount = "";
			this.total = 0;
			this.totalSinFormato = 0;
			this.design = 0
			this.typesPay.forEach(element => {
                element.total = 0
            });
            this.docLender = ''
			this.payTransfer = 0
			this.lenderSelect = null
			this.clientSelect = null
			this.resto  = 0
            this.subTotal = 0
            this.nombreManicurista = ''
            this.inspector = false
            this.ifEdit = false
            this.newClient.text = "Nuevo cliente"
            this.registerClient.name = ''
            this.registerClient.id = ''
            this.ifrecomend = false
            this.validRegister()
            this.haveCode = false
            $('.anticon-close-circle').click()
        },
        filterOption(input, option) {
            return (
                option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
            );
        },
        processSale() {
            
            this.spinning = true
            var totalPay = 0
            var payType = ''
			this.typesPay.forEach(element => {
                if (element.total == '') {
                    element.total = 0
                }
                totalPay = totalPay + element.total
                payType = element.total > 0 ? element.type : ''
            });
            if (this.clientSelect != null && this.lenderSelect != null) {
				if (Math.round(this.totalSinFormato) == Math.round(totalPay)) {
                    const itemList = []
                    for (let index = 0; index < this.serviciosSelecionados.length; index++) {
                        if (this.serviciosSelecionados[index].products) {
                            for (let i = 0; i < this.serviciosSelecionados[index].products.length; i++) {
                                itemList.push(this.serviciosSelecionados[index].products[i])
                            }
                        }
                        
                    }
                    axios.post(endPoint.endpointTarget+'/inventario/procesarVenta',{
                        array:itemList
                    })
                    .then(res => {})
					axios.post(endPoint.endpointTarget+'/sales/process', {
						client: this.clientSelect,
						employe: this.lenderSelect,
						services: this.serviciosSelecionados,
						typesPay: this.typesPay,
                        branch: this.branch,
                        payType: payType,
                        purchaseOrder: this.payOrder,
                        discount: this.discount,
                        processDate: this.inspectorDate,
						date: this.dates.dateSale,
						total: this.totalSinFormato,
						ifProcess: this.idProcess,
						design: this.design,
                        ifrecomend: this.ifrecomend
					}, this.configHeader)
					.then(res => {
                        console.log(res)
						if (res.data.status == "Sale register") {
                            this.$swal({
                                icon: 'success',
                                title: 'Venta procesada.',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            if (this.haveCode == true) {
                                axios.get(endPoint.endpointTarget+'/pedidos/useCode/'+this.idArticulo)
                                .then( res =>{})
                            }
                            this.haveCode = false
                            this.alertProducts()
							this.servicios =''
							this.initialState()
							EventBus.$emit('reloadDates', 'process')
                            EventBus.$emit('reloadSales', 'process')
                            this.spinning = false
						}else if(res.data.status == "no-cash"){
							this.$swal({
                                icon: 'info',
                                title: 'Primero debe registrar un fondo de caja.',
                                showConfirmButton: false,
                                timer: 2000
                            })
                            this.spinning = false
						}
					}).catch(err => {
						this.$swal({
							type: 'error',
							title: 'experimentamos problemas :(',
							showConfirmButton: false,
							timer: 1500
                        })
                        this.spinning = false
					})
				}else{
                    this.$swal({
                        icon: 'error',
                        title: 'Los montos no coinciden.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.spinning = false
					if (this.pagoEfectivo == 0) {
						this.pagoEfectivo = ''
					}
					if (this.pagoTransf == 0) {
						this.pagoTransf = ''
					}
					if (this.pagoOtros == 0) {
						this.pagoOtros = ''
					}
					if (this.pagoRedC == 0) {
						this.pagoRedC = ''
					}
					if (this.pagoTransf == 0) {
						this.pagoTransf = ''
					}
				}	
			}else{
                this.$swal({
                    icon: 'error',
                    title: 'Complete los datos necesarios.',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.spinning = false
			}
        },
        alertProducts(){
            axios.get(endPoint.endpointTarget+'/inventario/alertProducts')
            .then(res => {
                if (res.data.status) {
                    var Detail = ''
                    if (res.data.productsToAlert.length == 1) {
                        Detail = 'Hace falta reintegrar el producto: '
                    }else{
                        Detail = 'Hace falta reintegrar los productos: '
                    }
                    for (let index = 0; index < res.data.productsToAlert.length; index++) {
                        const element = res.data.productsToAlert[index];
                        if (index == 0) {
                            Detail = Detail + element.nameProduct
                        }else{
                            Detail = Detail + ', ' + element.nameProduct
                        } 
                    } 
                    axios.post(endPoint.endpointTarget+'/notifications', {
                        userName:localStorage.getItem('nombre') + " " + localStorage.getItem('apellido'),
                        userImage:localStorage.getItem('imageUser'),
                        detail: Detail,
                        link: 'Inventario'
                    })
                    .then(res => {
                        this.socket.emit('sendNotification', res.data)
                    })
                }
            })
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
        validCode(){
            axios.get(endPoint.endpointTarget+'/pedidos/validCode/'+this.codeArticulo)
            .then( res =>{
                if (res.data) {
                    this.articulo = res.data.articulo
                    this.estadoArticulo = res.data.estado
                    this.idArticulo = res.data._id
                    this.compradorArticulo = res.data.cliente
                    this.medioPagoArticulo = res.data.tipoPago
                    this.totalArticulo = res.data.total
                    this.modals.modal6 = true
                }
                else{
                    this.$swal({
                        icon: 'error',
                        title: 'Código no existe',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
        },
        verifyCode(){
            this.$swal({
					icon: 'warning',
					title: '¿Seguro que desea verificar el código?',
					showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonColor: '#2dce89',
                    cancelButtonColor: '#f5365c',
                    confirmButtonText: 'Si',
                    cancelButtonText: 'No'
				}).then((result) => {
                    if (result.value) {
                        var remp = this.totalArticulo.replace('.', "")
                        var remp1 = remp.replace(',00', "")
                        var remp2 = remp1.replace('$ ', "")
                        this.payOrder = remp2
                        this.haveCode = true
                        this.modals.modal5 = false
                        this.modals.modal6 = false
                    }
                })
        }
    },
    computed: {
        getScreen: () => {
            return screen.width < 780 ? { x: 'calc(700px + 50%)', y: 240 } : {}
        },
        screenWidth: () => {
            return screen.width < 780 ? "w-100" : "w-25"
        },
        screenWidthInput: () => {
            return screen.width < 780 ? "w-100" : "w-50"
        },
        marginAdditional: () => {
            return screen.width < 780 ? "mt-3" : "mt-0"
        }
    },
    mounted (){
        EventBus.$on('reloadServices', status => {
            this.getServices()
        })
        EventBus.$on('reloadLenders', status => {
            this.getLenders()
        })
        EventBus.$on('reloadClients', status => {
            this.getClient()
        })
        EventBus.$on('processDate', status => {
            this.initialState()
            this.getDataToDate(status)
        })
        EventBus.$on('changeBranch', status => {
            this.getBranch()
        })
    }
}
</script>
<style >
    .inputFilter{
        padding: 5px;
        border:1px solid #cad1d7;
        border-radius:0.375rem;
        font-weight: 400;
        line-height: 1.5;
        color: #8898aa;
        font-size: 0.675rem;
    }
    .table thead tr th{
        padding-bottom: 5px;
        padding-top: 5px;
        padding-left: 15px !important;
    }
    .table thead tr th .form-group{
        margin-bottom: 0;
    }
    .ListaProcesar{
        overflow:hidden;
		overflow-x: hidden;
		overflow-y:hidden;
		max-height: 220px;
		height:170px;
    }
    .align .form-control{
        text-align:center;
    }
    .shadowTop{
		-webkit-box-shadow: 0px -16px 21px -10px rgba(0,0,0,0.75);
		-moz-box-shadow: 0px -16px 21px -10px rgba(0,0,0,0.75);
		box-shadow: 0px -16px 21px -10px rgba(0,0,0,0.75);
    }
    .hundred{
        cursor: pointer;
        transition: all 0.5s ease-out;
    }
    .hundred:hover{
        background-color: rgba(31, 86, 115, 0.342);
        color: white !important;
        border-radius: 5px;
    }
    
    .vbt-table-tools th{
        padding: 5px !important;
        max-height: 20px !important;
        overflow: hidden !important;
    }
    .vbt-table-tools th div .col-md-8{
        display:none !important;
    }
    .vbt-table-tools th div .col-md-4{
        flex: 0 0 100%; 
        max-width: 100%;
    }
    .vbt-table-tools th div .col-md-4 .no-gutters .col-md-6{
        display:none;
    }
    .vbt-table-tools th div .col-md-4 .no-gutters .vbt-global-search{
        display:block !important;
        flex: 0 0 100%; 
        max-width: 100%;
    }
    .vbt-table-tools th div .col-md-4 .no-gutters .vbt-global-search .form-group{
        margin-bottom: 2px !important;
    }
    .vbt-table-tools th div .col-md-4 .no-gutters .vbt-global-search .form-group input{
       border-left: 1px solid #cad1d7;
       padding-left: 5px;
    }
    .maxHeight .card .card-header{
        display:none ;
    }
    .maxHeight .table td {
        padding: 5px;
        padding-bottom: 5px;
    } 
    .menuVerVentas{
	transition: all 0.3s ease-out;
	overflow: hidden;
}
.navSVenta{
	cursor: pointer;
	width:7%;
	top:3.5%;
	right:-11%;
	background-color: white;
	position: absolute;
	border-radius: 0 5px 5px 0;
}
.menuVerServi{
	transition: all 0.3s ease-out;
	overflow: hidden;
}
.navSServi{
	cursor: pointer;
	width:7%;
	top:9.5%;
	right:-11%;
	background-color: white;
	position: absolute;
	border-radius: 0 5px 5px 0;
}
.menuVerRedo{
	transition: all 0.3s ease-out;
	overflow: hidden;
}
.navSRedo{
	cursor: pointer;
	width:7%;
	top:15.5%;
	right:-11%;
	background-color: white;
	position: absolute;
	border-radius: 0 5px 5px 0;
}
.navSCode{
	cursor: pointer;
	width:7%;
	top:22.6%;
	right:-11%;
	background-color: white;
	position: absolute;
	border-radius: 0 5px 5px 0;
}
.menuVerVentas:hover{
	width: 33%;
	right:-37%;
	z-index:2;
}
.menuVerServi:hover{
	width: 33%;
	right:-37%;
	z-index:2;
}
.menuVerRedo:hover{
	width: 33%;
	right:-37%;
	z-index:2;
}

.card-container > .ant-tabs-card > .ant-tabs-content {
  margin-top: -16px;
}

.card-container > .ant-tabs-card > .ant-tabs-content > .ant-tabs-tabpane {
  background: #fff;
  padding: 3px;
  padding-bottom: 40px;
}

.card-container > .ant-tabs-card > .ant-tabs-bar {
  border-color: #fff !important;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
  border-color: transparent !important;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab:hover {
  color: #111111 !important;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab-active {
  border-color: #fff !important;
  background: #fff;
  color: #111111 !important;
  font-weight: 600 !important;
}

.separatorLeft{
    border-right: 5px solid #fff;
}
.ant-select-selection{
    border: 1px solid #d9d9d9;
}
</style>
