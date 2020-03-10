<template>
    <div>
        <base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
            style="min-height: 50px; background-image: url(img/theme/clients.jpg); background-size: cover; background-position: center top;height:45vh;">
            <!-- Mask -->
            <span style="background-color:#172b4d !important" class="mask  opacity-7"></span>
            <!-- Header container -->
            <div class="container-fluid d-flex align-items-center">
                <div class="row">
                    <div class="col-lg-12 col-md-12">
                        <h1 class="display-2 text-white w-100">Sección de citas</h1>
                        <a @click="modals.modal1 = true"  class="btn btn-info text-white">Registre una cita</a>
                        <a @click="modals.modal1 = true"  class="btn btn-info text-white">Manicuristas</a>
                        <a @click="modals.modal1 = true"  class="btn btn-info text-white">Ventas por procesar</a>
                    </div>
                </div>
            </div>
        </base-header>
    </div>
</template>