<template>
    <div class="mx-2">
        <template v-if="dataSale != null">
            <h2>Detalle de la venta (ID: {{dataSale.uuid}})</h2>
            <a-tooltip placement="top">
                <template slot="title">
                    <span>Anular venta</span>
                </template>
                <base-button size="sm" class="mr-2 float-right" type="warning">
                    <a-icon type="close-circle" style="vertical-align:1px;font-size:1.5em;" />
                </base-button>
            </a-tooltip>
            <a-tooltip placement="top">
                <template slot="title">
                    <span>Imprimir reporte</span>
                </template>
                <base-button @click="printReport" size="sm" class="mr-2 float-right" type="secondary">
                    <a-icon type="printer" style="vertical-align:1px;font-size:1.5em;" />
                </base-button>
            </a-tooltip>
            <a-tooltip placement="top">
                <template slot="title">
                    <span>Enviar correo</span>
                </template>
                <base-button size="sm" class="mr-2 float-right" type="secondary">
                    <a-icon type="mail" style="vertical-align:1px;font-size:1.5em;" />
                </base-button>
            </a-tooltip>
        </template>
        <template v-if="dataSale != null">
            <h3>Resumen de pago</h3>
            <hr class="mt-0 mb-0">
            <div class="row">
                <div class="col-md-4 mt-2">
                    <label for="date" style="margin-bottom:0px;"><b>Fecha</b></label><br>
                    <span class="ml-1">{{dataSale.createdAt | formatDate}}</span>
                </div>
                <div class="col-md-4 mt-2">
                    <label for="date" style="margin-bottom:0px;"><b>Cliente</b></label><br>
                    <span class="ml-1">{{dataSale.client.firstName}} {{dataSale.client.lastName}}</span>
                </div>
                <div class="col-md-4 mt-2">
                    <label for="date" style="margin-bottom:0px;"><b>Correo cliente</b></label><br>
                    <span class="ml-1">{{dataSale.client.email}}</span>
                </div>
                <div class="col-md-4 mt-2">
                    <label for="date" style="margin-bottom:0px;"><b>Monto total</b></label><br>
                    <span class="ml-1">{{dataSale.totals.total | formatPrice}}</span>
                </div>
                <div class="col-md-4 mt-2">
                    <label for="date" style="margin-bottom:0px;"><b>Monto pagado</b></label><br>
                    <span class="ml-1">{{dataSale.totals.totalPay | formatPrice}}</span>
                </div>
                <div class="col-md-4 mt-2">
                    <label for="date" style="margin-bottom:0px;"><b>Vuelto</b></label><br>
                    <span class="ml-1">{{dataSale.totals.total - dataSale.totals.totalPay | formatPrice}}</span>
                </div>
            </div>
            <h3 class="mt-3">Abonos</h3>
            <hr class="mt-0 mb-0">
            <div class="row" v-for="pay of dataSale.typesPay" :key="pay.type">
                <div class="col-md-4 mt-2">
                    <label for="date" style="margin-bottom:0px;"><b>Fecha</b></label><br>
                    <span class="ml-1">{{dataSale.createdAt | formatDate}}</span>
                </div>
                <div class="col-md-4 mt-2">
                    <label for="date" style="margin-bottom:0px;"><b>Medio de pago</b></label><br>
                    <span class="ml-1">
                        {{pay.type}}
                    </span>
                </div>
                <div class="col-md-4 mt-2">
                    <label for="date" style="margin-bottom:0px;"><b>Total</b></label><br>
                    <span class="ml-1">{{pay.total | formatPrice}}</span>
                </div>
            </div>
            <!-- <hr class="mt-3 mb-1" style="height:2px;background-color:#353535;border-radius:5px;"> -->
            <hr class="mt-3 mb-1">
            <h3 class="mt-3">ítems</h3>
            <hr class="mt-1 mb-0">
            <a-table :columns="columnsReport" :loading="progress" :data-source="dataSale.items" :scroll="getScreen">
                <template slot="total-slot" slot-scope="record, column">
                    {{column.totalItem | formatPrice}}
                </template>
                <template slot="type-slot" slot-scope="record, column">
                    <span v-if="column.type == 'service'">Servicio, Empleada: {{column.employe.name}}</span>
                    <span v-else>Producto, Cantidad: {{column.quantityProduct}}</span>
                </template>
            </a-table>
        </template>
    </div>
</template>
<script>
import axios from 'axios'
import endPoint from '../../config-endpoint/endpoint.js'
export default {
    data(){
        return {
            dataSale: {},
            configHeader: {
                headers:{
                    "x-database-connect": endPoint.database, 
                    "x-access-token": localStorage.userToken
                }
            },
            id: this.$route.query.id,
        }
    },
    created(){
        this.getData()
    },
    methods: {
        async getData(){
            try {
                const sale = await axios.get(endPoint.endpointTarget+'/sales/getSale/'+this.id, this.configHeader)
                console.log(sale)
                this.dataSale = sale.data.data
                setTimeout(() => {
                    print()
                }, 200);
            }catch(err){

            }
        }
    }
}
</script>