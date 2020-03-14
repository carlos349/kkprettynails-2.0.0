<template>
    <div>
        <base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                     style="min-height: 50px; background-image: url(img/theme/users.jpg); background-size: cover; background-position: center top;">
            <!-- Mask -->
            <span style="background-color:#172b4d !important" class="mask  opacity-7"></span>
            <!-- Header container -->
            <div class="container-fluid d-flex align-items-center">
                <div class="row">
                    <div class="col-lg-7 col-md-10">
                        <h1 class="display-2 text-white">Sección de gastos</h1>
                        <p class="text-white mt-0 mb-5">Esta es la sección de gastos del negocio, aquí podrás registrar, y visualizar todos tus gastos.</p>
                        <a class="btn btn-success text-white cursor-pointer">Registrar gasto</a>
                    </div>
                </div>
            </div>
        </base-header>
        <vue-bootstrap4-table :rows="expenses" :columns="columns" :classes="classes" :config="config">
            <!-- <template slot="date-format" slot-scope="props">
                <p>{{formatDate(props.row.LastAccess)}}</p>
            </template> -->
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
import router from '../router'
import endPoint from '../../config-endpoint/endpoint.js'
import jwtDecode from 'jwt-decode'
// COMPONENTS
import VueBootstrap4Table from 'vue-bootstrap4-table'
export default {
    components: {
        VueBootstrap4Table 
    },
    data(){
        return {
            columns: [{
                    label: "Nombre",
                    name: "first_name",
                    // filter: {
                    //     type: "simple",
                    //     placeholder: "id"
                    // },
                    sort: true,
                },
                {
                    label: "Apellido",
                    name: "last_name",
                    // filter: {
                    //     type: "simple",
                    //     placeholder: "id"
                    // },
                    sort: true,
                },
                {
                    label: "Correo",
                    name: "email",
                    // filter: {
                    //     type: "simple",
                    //     placeholder: "Enter first name"
                    // },
                    sort: true,
                },
                {
                    label: "Ultimo acceso",
                    name: "LastAccess",
                    slot_name:'date-format',
                    sort: true,
                },
                {
                    label: "Estado",
                    name: "status",
                    slot_name:"status-format",
                    sort: true,
                    // filter: {
                    //     type: "simple",
                    //     placeholder: "Enter country"
                    // },
                },
                {
                    label: "Eliminar",
                    name: "_id",
                    sort: false,
                    slot_name: "Administrar"
                },
            ],
            config: {
                card_title: "Tabla de usuarios",
                checkbox_rows: false,
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
            },
            expenses:[]
        }
    },
    created(){
        this.getExpenses()
    }, 
    methods: {
        getExpenses(){
            axios.get(endPoint.endpointTarget+'/expenses')
            .then(res => {
                this.expenses = res.data
            })
        },
    }
}
</script>
<style>

</style>