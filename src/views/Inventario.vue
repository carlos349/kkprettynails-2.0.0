<template>
  <div>
    <base-header class="header pb-4 pt-2 pt-lg-4 d-flex align-items-center" style="min-height: 50px; background-image: url(img/theme/inventario.jpg); background-size: cover; background-position: center top;">
        <!-- Mask -->
        <span style="background-color:#172b4d !important" class="mask  opacity-7"></span>
        <!-- Header container -->
        <div class="container-fluid d-flex align-items-center">
            <div class="row">
                <div class="col-12">
                    <h1 class="display-2 text-white">Sección de inventario</h1>
                    <p class="text-white mt-0 mb-2">Esta es la sección administrativa de tu inventario, aquí podrás registrar, editar y visualizar todos tus productos.</p>
                    <a @click="modals.modal1 = true ,validForm = 1, initialState(2)" class="btn btn-success text-white cursor-pointer">Registrar un producto</a>
                </div>
            </div>
        </div>
    </base-header>
    <vue-bootstrap4-table class="tableClient" :rows="rows" :columns="columns" :classes="classes" :config="config">
        <template slot="edit" slot-scope="props">
            <b>
              <center>
                  <base-button size="sm" type="default" @click="modals.modal1 = true ,validForm = 2, initialState(3), pushData(props.row.producto, props.row.cantidad, props.row.monto,props.row._id)" icon="ni ni-bullet-list-67">Editar</base-button>
                  <base-button size="sm" type="success" @click="modals.modal1 = true,dataProduct.id = props.row._id,dataProduct.entry = ''" icon="fa fa-plus">Agregar mas</base-button>
                  <base-button size="sm" type="danger" @click="deleteItem(props.row._id)" icon="fa fa-trash">Eliminar</base-button>
              </center>
            </b>
        </template>
        <template slot="total" slot-scope="props">
          {{parseFloat(props.row.cantidad) + parseFloat(props.row.entry) - parseFloat(props.row.consume)}}
        </template>
        <template slot="price" slot-scope="props">
          $ {{formatPrice(props.row.monto)}}
        </template>
        
        <template slot="pagination-info" slot-scope="props">
            Actuales {{props.currentPageRowsLength}} | 
              Filtrados {{props.filteredRowsLength}} | 
            Registros totales {{props.originalRowsLength}}
        </template>
        <template slot="selected-rows-info" slot-scope="props">
            Total Number of rows selected : {{props.selectedItemsCount}}
        </template>
    </vue-bootstrap4-table>
    <modal :show.sync="modals.modal1"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-sm">
        <h6 slot="header" class="modal-title p-0 m-0" id="modal-title-default"></h6>
        <card type="secondary" shadow
              header-classes="bg-white pb-5"
              body-classes="px-lg-5 py-lg-5"
              class="border-0">
            <template>
            </template>
            <template>
                <div v-if="validForm != 3" style="margin-top:-30%" class="text-center text-muted mb-4">
                    <small>Datos del producto</small>
                </div>
                <div v-else style="margin-top:-30%" class="text-center text-muted mb-4">
                    <small>Anexa mas productos</small>
                </div>
                <form role="form">
                    <base-input v-if="validForm == 3" alternative
                                placeholder="Cantidad para anexar"
                                v-model="dataProduct.entry"
                                addon-left-icon="fa fa-box-open">
                    </base-input>
                    <base-input v-if="validForm != 3" alternative
                                class="mb-3"
                                placeholder="Nombre"
                                v-model="dataProduct.name"
                                addon-left-icon="fa fa-edit">
                    </base-input>
                    <base-input v-if="validForm != 3" alternative
                                placeholder="Cantidad"
                                v-model="dataProduct.initial"
                                addon-left-icon="fa fa-box-open">
                    </base-input>
                    <currency-input 
                        v-if="validForm != 3"
                        v-on:keyup="validRegister(3)"
                        locale="de"
                        placeholder="Precio"
                        addon-left-icon="ni ni-money-coins"
                        v-model="dataProduct.price"
                        class="form-control mb-3"
                        style="margin-top:-10px;"
                    />	
                    
                    <div class="text-center">
                        <base-button v-on:click="addProduct()" v-if="validForm == 1" type="default">Registrar</base-button>
                        <base-button v-on:click="updateProducts()" v-if="validForm == 2" type="default">Editar</base-button>
                        <base-button v-on:click="addMore()" v-if="validForm == 3" type="success">Agregar</base-button>
                    </div>
                </form>
            </template>
        </card>
    </modal>
    <modal :show.sync="modals.modal2"
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
//Back - End 
import axios from 'axios'
import endPoint from '../../config-endpoint/endpoint.js'
import VueBootstrap4Table from 'vue-bootstrap4-table'
import EventBus from '../components/EventBus'
// COMPONENTS

  export default {
    components: {
        VueBootstrap4Table 
    },
    data() {
      return {
        validForm:0,
        modals: {
          modal1: false,
          modal2: false,
          message: "",
          icon: '',
          type:''
        },
        dataProduct:{
          name:'',
          price:'',
          initial:'',
          entry:'',
          id:''
        },
        rows: [],
        columns: [
          {
            label: "Producto",
            name: "producto",
            sort: true,
          },
          {
            label: "precio",
            name: "monto",
            slot_name: "price",
            sort: true
          },
          {
            label: "Cantidad inicial",
            name: "cantidad",
            sort: true,
          },
          {
            label: "Cantidad ingresada",
            name: "entry",
            sort: false,
            
          },
          {
            label: "Consumo",
            name: "consume",
            sort: false,
            
          },
          {
            label: "Total",
            name: "",
            sort: false,
            slot_name: "total"
          },
          {
            label: "Administrar",
            name: "_id",
            sort: false,
            slot_name: "edit"
          },
        ],
        config: {
          card_title: "Tabla de productos",
          checkbox_rows: false,
          rows_selectable : true,
          highlight_row_hover_color:"rgba(238, 238, 238, 0.623)",
          rows_selectable: true,
          per_page_options: [5, 10, 20, 30, 40, 50, 80, 100],
          global_search: {
              placeholder: "Filtrar productos",
              visibility: true,
              case_sensitive: false
          },
          show_refresh_button: false,
          show_reset_button: false,  
          selected_rows_info: true,
          preservePageOnDataChange : true,
          pagination_info : true
        },
        classes: {
          table: "table-bordered table-striped"
        }     
      };
    },
    created(){
		  this.getProducts();
    },
    methods: {
      getProducts() {
        axios.get(endPoint.endpointTarget+'/inventario')
        .then(res => {
          this.rows = res.data 
        })
      },
      addProduct(){
        axios.post(endPoint.endpointTarget+'/inventario', {
          product: this.dataProduct.name,
          quantity: this.dataProduct.initial,
          price: this.dataProduct.price
        })
        .then(res => {
          if (res.data.status === 'ok') {
            this.$swal({
              type: 'success',
              title: 'Producto registrado',
              showConfirmButton: false,
              timer: 1500
            })
            this.getProducts();
          }else{
            this.$swal({
              type: 'error',
              title: 'El producto ya existe',
              showConfirmButton: false,
              timer: 1500
            })
          }
        })
        .catch(err => {
          this.$swal({
            type: 'error',
            title: 'Problemas con el servidor',
            showConfirmButton: false,
            timer: 1500
          })
          console.log(err)
        })
      },
      initialState(){
        this.dataProduct = {
          name:'',
          price:'',
          initial:'',
          add:'',
          id:''
        }
      },
      pushData(name,cantidad,precio,id){
        this.validForm = 2
        this.dataProduct = {
          name:name,
          price:precio,
          initial:cantidad,
          id:id
        }
      },
      formatDate(date) {
        let dateFormat = new Date(date)
        return dateFormat.getDate()+"-"+(dateFormat.getMonth() + 1)+"-"+dateFormat.getFullYear()+" "+" ("+ dateFormat.getHours()+":"+ dateFormat.getMinutes()+")"
      },
      formatPrice(value) {
          let val = (value/1).toFixed(2).replace('.', ',')
          return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      },
      updateProducts(){
        axios.put(endPoint.endpointTarget+'/inventario/'+this.dataProduct.id, {
          product:this.dataProduct.name,
          cantidad:this.dataProduct.initial,
          monto:this.dataProduct.price,
        })
        .then(res => {
          this.$swal({
              type: 'success',
              title: 'Producto Actualizado',
              showConfirmButton: false,
              timer: 1500
            })
            this.getProducts();
        })
        .catch(err => {
          this.$swal({
              type: 'error',
              title: 'El producto no fue actualizado',
              showConfirmButton: false,
              timer: 1500
            })
        })
      },
      addMore(){
        axios.put(endPoint.endpointTarget+'/inventario/addMore/'+this.dataProduct.id, {
          entry:this.dataProduct.entry
        })
        .then(res => {
          this.$swal({
              type: 'success',
              title: 'Producto Actualizado',
              showConfirmButton: false,
              timer: 1500
            })
            this.getProducts();
        })
        .catch(err => {
          this.$swal({
              type: 'error',
              title: 'El producto no fue actualizado',
              showConfirmButton: false,
              timer: 1500
            })
        })
      },
      deleteItem(id){
        this.$swal({
          title: '¿Está seguro de borrar el producto?',
          text: 'No puedes revertir esta acción',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Estoy seguro',
          cancelButtonText: 'No, evitar acción',
          showCloseButton: true,
          showLoaderOnConfirm: true
        }).then((result) => {
          if(result.value) {
            axios.put(endPoint.endpointTarget+'/inventario/deleteItem/'+id)
            .then(res => {
              if (res.data.status == 'ok') {
                this.modals = {
                    modal2: true,
                    message: "Producto borrado con exito",
                    icon: 'ni ni-check-bold ni-5x',
                    type: 'success'
                }
                setTimeout(() => {
                    this.modals = {
                        modal1: false,
                        modal2: false,
                        message: "",
                        icon: '',
                        type:''
                    }
                    this.getProducts()
                }, 1500);
              }
            })
          }
          else{
            this.modals = {
                modal2: true,
                message: "Acción cancelada",
                icon: 'ni ni-check-bold ni-5x',
                type: 'success'
            }
            setTimeout(() => {
                this.modals = {
                    modal1: false,
                    modal2: false,
                    message: "",
                    icon: '',
                    type:''
                }
            }, 1500);
          }
        })
      }
    }
  };
</script>
<style lang="scss">
  .card-header{
    font-size: 2.5vw;
  }
  .cursor-pointer{
    cursor: pointer;
  }
</style>