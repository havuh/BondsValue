<template>
  <NavbarBono></NavbarBono>
  <div class="mb-12"></div>
  <v-container>
    <div class="d-flex justify-space-between mt-5 mb-5">
      <p class="detail-title">{{this.bond.name}}</p>
      <p class="detail-title">Método Americano</p>
      <v-btn flat class="btn-a">Calcular Mercado Secundario</v-btn>
    </div>
    <div class="bond-description mb-5">
      <div class="d-flex ml-p">
        <span><b>Valor nominal:</b> {{this.bond.nominalValue}} {{this.bond.currency}}</span>
        <span><b>Vencimiento:</b> {{this.bond.expiration}} {{this.bond.expirationType}}</span>
        <span><b>Tasa cupón:</b> {{this.bond.couponRate}}%</span>
      </div>
      <div class="d-flex ml-p">
        <span><b>Capitalización:</b> {{this.bond.capitalizationType}}</span>
        <span><b>Tasa cupón periodica:</b> Tasa periodica %</span>
        <span><b>Periodos convertidos:</b> Numero nuevos periodos</span>
      </div>
    </div>
    <p class="detail-subtitle">Flujo de caja</p>

    <!--TODO: FLUJO DE CAJA-->
    <table class="table-style mt-5 mb-10">
      <thead style="background-color: #5024fc">
      <tr>
        <th style="background-color: #fff;"></th>
        <th
            v-for="(item, index) in periods"
            :key="index"
            class="text-white"
        >
          {{item}}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>Capital</td>
        <td
            v-for="(item, index) in periods"
            :key="index"
        >
          {{capital}}
        </td>
      </tr>
      <tr>
        <td>Amortización</td>
        <td
            v-for="(item, index) in periods"
            :key="index"
        >
          {{amortization}}
        </td>
      </tr>
      <tr>
        <td>Intereses</td>
        <td
            v-for="(item, index) in periods"
            :key="index"
        >
          {{interes}}
        </td>
      </tr>
      <tr>
        <td>Cuota</td>
        <td
            v-for="(item, index) in periods"
            :key="index"
        >
          {{quota}}
        </td>
      </tr>
      </tbody>
    </table>

    <p class="detail-subtitle">Indicadores financieros</p>
    <div class="d-flex justify-space-around">
      <div class="btn-indicador"><p>TIR: TIR CALCULADO</p></div>
      <div class="btn-indicador"><p>VA: VA</p></div>
      <div class="btn-indicador"
           style="background-color: #90f46c !important;"><p>VAN: VAN</p></div>
    </div>
  </v-container>
</template>

<script>
import NavbarBono from "@/bono/pages/NavbarBono";
import BonoService from '../services/bono.service'
export default {
  name: "BonoDetail",
  components: {NavbarBono},
  data: () => ({
    id: null,
    bond: {},
    periods: [0,1,2,3,4,5],
    capital: 0,
    amortization: 0,
    interes: 0,
    quota: 0,
  }),
  mounted() {
    this.id = this.$route.params.id;
    this.retrieveBondInformation(this.id);
  },
  methods: {
    retrieveBondInformation(id) {
      BonoService.getById(id)
          .then(response => {
            this.bond = response.data;
            this.capital = this.bond.nominalValue;
          }).catch(error => {
            this.errors.push(error);
      })
    }
  }
}
</script>

<style scoped>
* {
  font-family: "Agency FB";
  font-size: 1.2rem;
}
.d-flex span {
  max-width: 30%;
  flex:  1 0 auto;
}
.detail-title {
  font-size: 1.7rem;
  color: #E21212;
  text-decoration: underline;
}
.detail-subtitle {
  font-size: 1.5rem;
  font-weight: bold;
}
.table-style {
  table-layout: auto;
  border: 1px solid #000;
  border-collapse: collapse;
  width: 100%;
}
th, td {
  border: 1px solid #000;
  border-collapse: collapse;
  padding: 0.3em;
}
tr {
  height: 30px;
}
.ml-p {
  margin-left: 12.5%;
}
.btn-a {
  color: #fff;
  background-color: #58dcd4;
  font-size: 1rem;
  border-radius: 8px;
  width: 170px;
}
.btn-indicador {
  margin-top: 1.2rem;
  color: #fff;
  background-color: #58dcd4;
  text-align: center;
  padding: 3px 10px;
  width: 170px;
  border-radius: 8px;
}
.btn-indicador p {
  font-size: 1.4rem;
}
</style>