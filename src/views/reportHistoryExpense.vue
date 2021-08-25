<template>
    <div class="mx-2">
        <h1 class="text-center mt-2">Reporte preliminar de gastos mes {{dict[month]}} {{year}}</h1>
        <div class="row">
            <div class="col-6">
                <img src="img/brand/syswa-gestion.png" class="w-50 ml-4" alt="" style="">
            </div>
            <div class="col-5 pt-3 pl-2 pr-2 border border-5 ml-1 mb-2">
                <p>
                    <strong>Saldo inicial:</strong> {{this.reinvestmentTotal}} <span class="float-right"><strong>Saldo final:</strong> {{this.totalFinal}}</span>
                </p>
                <p>
                    <strong>Ingreso:</strong> {{this.totalSales}} <span class="float-right"><strong>Ganancia:</strong> {{this.gain}}%</span>
                </p>
                <p>
                    <strong>Egreso:</strong> {{this.totalExpenses}}<span class="float-right"><strong>Gasto Inventario:</strong> {{this.inventoryTotal | formatPrice}}</span>
                </p>
            </div>
        </div>
        <a-config-provider>
            <template #renderEmpty>
                <div style="text-align: center">
                    <a-icon type="warning" style="font-size: 20px" />
                    <h2>Sin gastos registrados en el mes</h2>
                </div>
            </template>
            <a-table :columns="columnsReport" :data-source="expenses" :pagination="false">
                <template slot="amount-slot" slot-scope="record, column">
                    {{column.amount | formatPrice}}
                </template>
            </a-table>
        </a-config-provider>
    </div>
</template>
<script>
import axios from 'axios'
import endPoint from '../../config-endpoint/endpoint.js'
export default {
    data(){
        return {
            configHeader: {
                headers:{
                    "x-database-connect": endPoint.database, 
                    "x-access-token": localStorage.userToken
                }
            },
            month: '',
            year: '',
            dict: {
                0: 'Enero',
                1: 'Febrero',
                2: 'Marzo',
                3: 'Abril',
                4: 'Mayp',
                5: 'Junio',
                6: 'Julio',
                7: 'Agosto',
                8: 'Septiembre',
                9: 'Octubre',
                10: 'Noviembre',
                11: 'Diciembre'
            },
            inventoryTotal: 0,
            id: this.$route.query.id,
            columnsReport: [
                {
                    title: 'Fecha',
                    dataIndex: 'createdAt',
                    key: 'createdAt',
                    width: "20%"
                },
                {
                    title: 'Descripción',
                    dataIndex: 'detaill',
                    key: 'detaill',
                    width: "40%"
                },
                {
                    title: 'Tipo',
                    dataIndex: 'typee',
                    key: 'typee',
                    width: "20%"
                },
                {
                    title: 'Total',
                    dataIndex: 'amount',
                    key: 'amount',
                    scopedSlots: { customRender: 'amount-slot' },
                    width: "20%"
                } 
            ],
            reinvestmentTotal: 0,
            totalSales: 0,
            totalExpenses: 0,
            totalFinal: 0,
            expenses: []
        }
    },
    created(){
        this.getHistoryData()
        this.print()
    },
    methods: {
        async getHistoryData(){
            try {
                const getHistory = await axios.get(`${endPoint.endpointTarget}/expenses/getHistoryClosesExpense/${this.id}`, this.configHeader)
                this.reinvestmentTotal = getHistory.data.data.totals.reinvestment
                this.totalSales = getHistory.data.data.totals.sales
                this.totalExpenses = getHistory.data.data.totals.expenses
                this.totalFinal = getHistory.data.data.totals.totalFinal
                this.gain = getHistory.data.data.totals.gain
                this.expenses = getHistory.data.data.expenses
                this.month = new Date(getHistory.data.data.createdAt).getMonth(),
                this.year = new Date(getHistory.data.data.createdAt).getFullYear()
                for (const expense of this.expenses) {
                    if (expense.detaill == 'Stock en inventario') {
                        this.inventoryTotal = this.inventoryTotal + expense.amount
                    }
                }
            }catch(err){
                console.log(err)
            }
        },
        print(){
            setTimeout(() => {
                print()
                setTimeout(() => {
                    window.close()
                }, 200);
            }, 200);
        }
    }
}
</script>