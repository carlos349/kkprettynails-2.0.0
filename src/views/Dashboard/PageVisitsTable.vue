<template>
  <div class="card">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0">10 Mejores clientes</h3>
        </div>
        <div class="col text-right">
          <a href="#!" class="btn btn-sm btn-primary">Ver todos</a>
        </div>
      </div>
    </div>
    <vue-custom-scrollbar class="maxHeight">
      <div class="table-responsive">
        <base-table thead-classes="thead-light" :data="attentions">
          <template slot="columns">
            <th>Nombre</th>
            <th>Contacto</th>
            <th>Atenciones</th>
          </template>
          <template slot-scope="{row}">
            <th scope="row">
              {{row.name}}
            </th>
            <th scope="row">
              {{row.contact}}
            </th>
            <th scope="row">
              {{row.attention}}
            </th>
          </template>
        </base-table>
      </div>
    </vue-custom-scrollbar >
  </div>
</template>
<script>
  import axios from 'axios'
  import endPoint from '../../../config-endpoint/endpoint.js'

  import vueCustomScrollbar from 'vue-custom-scrollbar'
  export default {
    components: {
      vueCustomScrollbar
    },
    name: 'page-visits-table',
    data() {
      return {
        attentions: []
      }
    },
    created(){
      this.getParticipacion()
    },
    methods: {
      getParticipacion() {
        axios.get(endPoint.endpointTarget+'/metrics/top')
        .then(res => {
          console.log(res.data)
          for (let index = 0; index < res.data.length; index++) {
            const element = res.data[index];
            this.attentions.push({name: element.nombre, contact: element.identidad, attention: element.participacion})
          }
          console.log(this.attentions)
        })
      },
    }
  }
</script>
<style>
.maxHeight{
    max-height: 395px;
    overflow: scroll;
}
</style>
