<template>
  <navbar-bono></navbar-bono>
  <div class="mb-12"></div>
  <v-container>
    <h1>Bonds Value</h1>
    <p class="mb-4">Bonds value es una aplicación web para el cálculo de bonos en base a una tasa nominal anual y una fecha de vencimiento. Con Bonds Value podrás conocer el flujo de caja, VAN, TIR, VA, duración y convexidad de cualquier bono que registres.</p>
    <h2>¿Cómo funcionan los cálculos de bonos?</h2>
    <p>Bonds Value se basa en las fórmulas estándar de cálculo de bonos. A continuación podrás ver cuales son estas:</p>

    <!--Tabla de ayuda-->
    <table class="table-style mt-5 mb-10">
      <thead style="background-color: #5024fc">
      <tr>
        <th style="background-color: #fff;"></th>
        <th class="text-white">Fórmula</th>
        <th class="text-white">Descripción</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>Flujo de caja</td>
        <td><v-img src="../../assets/flujo-de-caja.jpg" width="200px"></v-img></td>
        <td><v-img src="../../assets/flujo-de-caja-d.jpg"></v-img></td>
      </tr>
      </tbody>
    </table>
  </v-container>
</template>

<script>
import NavbarBono from "@/bono/pages/NavbarBono";
export default {
  name: "UserHelp",
  components: {NavbarBono}
}
</script>

<style scoped>

</style>