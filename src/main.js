/*!

=========================================================
* Vue Argon Dashboard - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

/* COMPONENTS */

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import ArgonDashboard from './plugins/argon-dashboard'
import VueSweetalert2 from 'vue-sweetalert2'
import VueApexCharts from 'vue-apexcharts'
import Popper from 'vue-popperjs';
import VueSingleSelect from "vue-single-select";
import VueCurrencyInput from 'vue-currency-input'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'

/* STYLES */
import VueFormWizard from 'vue-form-wizard'

/* STYLES */

import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import 'vue-popperjs/dist/vue-popper.css';
import 'sweetalert2/dist/sweetalert2.min.css';

/* I DO NOT KNOW */
Vue.config.productionTip = false
const pluginOptions = {globalOptions: { currency: {'prefix':'$ '},precision: 2, distractionFree:false, autoDecimalMode:true}}

/* USES*/
Vue.component('vue-single-select', VueSingleSelect);
Vue.use(VueCurrencyInput, pluginOptions)
Vue.use(ArgonDashboard)
Vue.use(VueSweetalert2);
Vue.use(VueApexCharts)
Vue.use(Popper)
library.add(faUserSecret, faCloudUploadAlt)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueFormWizard)
Vue.component('apexchart', VueApexCharts)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
