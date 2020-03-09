<template>
    <div>
        <base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                     style="min-height: 50px; background-image: url(img/theme/clients.jpg); background-size: cover; background-position: center top;">
            <!-- Mask -->
            <span class="mask bg-gradient-success opacity-8"></span>
            <!-- Header container -->
            <div class="container-fluid d-flex align-items-center">
                <div class="row">
                    <div class="col-lg-7 col-md-10">
                        <h1 class="display-2 text-white">Sección de clientes</h1>
                        <p class="text-white mt-0 mb-5">Esta es la sección administrativa de tus clientes, aquí podrás registrar, editar y visualizar todos tus clientes.</p>
                        <a href="#!" class="btn btn-info">Registrar un cliente</a>
                    </div>
                </div>
            </div>
        </base-header>
        <vue-bootstrap4-table :rows="rows" :columns="columns" :classes="classes" :config="config">
            <template slot="pagination-info" slot-scope="props">
                Actuales {{props.currentPageRowsLength}} | 
                 Filtrados {{props.filteredRowsLength}} | 
                Registros totales {{props.originalRowsLength}}
            </template>
            <template slot="selected-rows-info" slot-scope="props">
                Total Number of rows selected : {{props.selectedItemsCount}}
            </template>
        </vue-bootstrap4-table>
    </div> 
</template>

<script>
//Back - End 
import axios from 'axios'
import endPoint from '../../config-endpoint/endpoint.js'
import VueBootstrap4Table from 'vue-bootstrap4-table'

  export default {
    components: {
        VueBootstrap4Table    
    },
    data() {
      return {
        rows: [],
        columns: [{
                label: "Nombre",
                name: "nombre",
                // filter: {
                //     type: "simple",
                //     placeholder: "id"
                // },
                sort: true,
            },
            {
                label: "Identidad",
                name: "identidad",
                // filter: {
                //     type: "simple",
                //     placeholder: "Enter first name"
                // },
                sort: true,
            },
            {
                label: "Correo",
                name: "correoCliente",
                sort: true,
            },
            {
                label: "Instagram",
                name: "instagramCliente",
                // filter: {
                //     type: "simple",
                //     placeholder: "Enter country"
                // },
            }],
        config: {
            card_title: "Tabla de clientes",
            checkbox_rows: true,
            rows_selectable : true,
            highlight_row_hover_color:"rgba(238, 238, 238, 0.623)",
            rows_selectable: true,
            per_page_options: [5, 10, 20, 30, 40, 50, 80, 100],
            global_search: {
                placeholder: "Enter custom Search text",
                visibility: false,
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
		this.getClients();

    },
    methods: {
        getClients(){
            axios.get(endPoint.endpointTarget+'/clients')
            .then(res => {
				console.log(res.data)
				this.rows = res.data
				// for (let i = 0; i < this.clients.length; i++) {
				// 	// this.clients[i].push({thatId:this.clients[i].identidad}) 
				// 	if (this.clients[i].correoCliente) {
				// 		this.clients[i].identidad = this.clients[i].identidad + '\n / ' + this.clients[i].correoCliente 
				// 	}
				// 	if (this.clients[i].instagramCliente) {
				// 		this.clients[i].identidad = this.clients[i].identidad + '\n / ' + this.clients[i].instagramCliente
				// 	}
				// 	this.clients[i].fecha = this.formatDate(this.clients[i].fecha)
				// 	this.clients[i].ultimaFecha = this.formatDate(this.clients[i].ultimaFecha)
					
				// }
				// console.log(this.clients)
            })
		},
    }
  };
</script>
<style lang="scss">
</style>