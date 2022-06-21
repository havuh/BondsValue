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
        <span><b>Tasa cupón periodica:</b> {{tasaPeriodica}} %</span>
      </div>
    </div>
    <p class="detail-subtitle">Flujo de caja</p>

    <!--TODO: FLUJO DE CAJA-->
    <table class="table-style mt-5 mb-10">
      <thead style="background-color: #5024fc">
      <tr>
        <th style="background-color: #fff;"></th>
        <th
            v-for="(item, index) in this.cashFlow.periods"
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
            v-for="(item, index) in this.cashFlow.periods"
            :key="index"
        >
          {{this.cashFlow.capital[index]}}
        </td>
      </tr>
      <tr>
        <td>Amortización</td>
        <td
            v-for="(item, index) in this.cashFlow.periods"
            :key="index"
        >
          {{this.cashFlow.amortization[index]}}
        </td>
      </tr>
      <tr>
        <td>Intereses</td>
        <td
            v-for="(item, index) in this.cashFlow.periods"
            :key="index"
        >
          {{this.cashFlow.interes[index]}}
        </td>
      </tr>
      <tr>
        <td>Cuota</td>
        <td
            v-for="(item, index) in this.cashFlow.periods"
            :key="index"
        >
          {{this.cashFlow.quota[index]}}
        </td>
      </tr>
      </tbody>
    </table>

    <p class="detail-subtitle">Indicadores financieros</p>
    <div class="d-flex justify-space-around">
      <div class="btn-indicador"><p>TIR: {{this.bond.TIR}}</p></div>
      <div class="btn-indicador"><p>VA: {{this.bondPrice}}</p></div>
      <div class="btn-indicador"
           style="background-color: #90f46c !important;"><p>VAN: {{this.bond.VAN}}</p></div>
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
    tasaPeriodica: null,
    bondPrice: null,
    cashFlow: {
      periods: [],
      capital: [],
      amortization: [],
      interes: [],
      quota: [],
    }
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
            this.calculateBond();
          }).catch(error => {
            this.errors.push(error);
      })
    },
    calculateBond() {
      this.calculatePeriods();
      this.calculateValuation();
      this.calculateCashFlow();
      this.calculateBondPrice();
      this.calculateVAN();
      this.bond.TIR = this.calculateTIR(this.cashFlow.quota).toFixed(5);
    },
    calculatePeriods() {
      let numberOfPeriods = null;
      if (this.bond.capitalizationType == "Semestral") {
        numberOfPeriods = this.bond.expiration * 2;
      }
      else if (this.bond.capitalizationType == "Mensual") {
        numberOfPeriods = this.bond.expiration * 12;
      }
      else if (this.bond.capitalizationType == "Bimestral") {
        numberOfPeriods = this.bond.expiration * 6;
      }
      else if (this.bond.capitalizationType == "Anual") {
        numberOfPeriods = this.bond.expiration;
      }
      else if (this.bond.capitalizationType == "Quincenal") {
        numberOfPeriods = this.bond.expiration * 24;
      }
      else if (this.bond.capitalizationType == "Trimestral") {
        numberOfPeriods = this.bond.expiration * 4;
      }
      else {
        numberOfPeriods = this.bond.expiration * 360;
      }
      for (let i = 0; i <= numberOfPeriods; i++) {
        this.cashFlow.periods.push(i);
      }
    },
    calculateValuation() {
      if (this.bond.capitalizationType == "Semestral") {
        this.tasaPeriodica = this.bond.couponRate/2;
      }
      else if (this.bond.capitalizationType == "Mensual") {
        this.tasaPeriodica = this.bond.couponRate/12;
      }
      else if (this.bond.capitalizationType == "Bimestral") {
        this.tasaPeriodica = this.bond.couponRate/6;
      }
      else if (this.bond.capitalizationType == "Anual") {
        this.tasaPeriodica = this.bond.couponRate/1;
      }
      else if (this.bond.capitalizationType == "Quincenal") {
        this.tasaPeriodica = this.bond.couponRate/24;
      }
      else if (this.bond.capitalizationType == "Trimestral") {
        this.tasaPeriodica = this.bond.couponRate/4;
      }
      else {
        this.tasaPeriodica = this.bond.couponRate/360;
      }
    },
    calculateCashFlow() {
      let interes = this.bond.nominalValue * this.tasaPeriodica/100;
      let p = this.cashFlow.periods.length;

      for(let i = 0; i < p; i++) {
        this.cashFlow.capital.push(this.bond.nominalValue);
        this.cashFlow.amortization.push(0);
        this.cashFlow.interes.push(interes);
      }
      this.cashFlow.capital[p - 1] = 0;
      this.cashFlow.amortization[p - 1] = this.bond.nominalValue;
      this.cashFlow.amortization[0] = null;
      this.cashFlow.interes[0] = null;

      for(let i = 0; i < p; i++) {
        if (i == 0) this.cashFlow.quota.push(this.bond.nominalValue * -1);
        else this.cashFlow.quota.push(this.cashFlow.interes[i] + this.cashFlow.amortization[i]);
      }
    },
    calculateBondPrice() {
      for (let i = 0; i < this.cashFlow.periods.length; i++) {
        if (i > 0) {
          this.bondPrice = this.bondPrice + (this.cashFlow.quota[i]/(Math.pow(1 + this.tasaPeriodica/100, i)));
        }
      }
      this.bondPrice = this.bondPrice.toFixed(5);
    },
    calculateVAN() {
      for (let i = 0; i < this.cashFlow.periods.length; i++) {
        if (i > 0) {
          this.bond.VAN = this.bond.VAN + (this.cashFlow.quota[i]/(Math.pow(1 + this.tasaPeriodica/100, i)));
        }
      }
      this.bond.VAN = this.bond.VAN.toFixed(5);
      this.bond.VAN = this.bond.VAN - this.bond.nominalValue;
    },
    calculateTIR(periods) {
      let ret = -1000000000.0;
      let interesInicial = -1.0;
      let interesMedio = 0.0;
      let interesFinal = 1.0;
      let vpl_inicial = 0.0;
      let vpl_final = 0.0;
      let err = 1e-5;

      for (let i=0; i<100; i++) {
        vpl_inicial = this.vpl(interesInicial, periods);
        vpl_final = this.vpl(interesFinal, periods);
        if (this.sign(vpl_inicial) != this.sign(vpl_final))
          break;
        interesInicial -= 1.0;
        interesFinal += 1.0;
      }

      let count = 0;
      for (;;) {
        // Buscar bisección
        interesMedio = (interesInicial + interesFinal) / 2.0;
        let vpl_medio = this.vpl(interesMedio, periods)

        if (Math.abs(vpl_medio) <= err) {
          // Resultado
          return interesMedio*100.0;
        }

        if (this.sign(vpl_inicial) == this.sign(vpl_medio)) {
          interesInicial = interesMedio;
          vpl_inicial = this.vpl(interesMedio, periods);
        } else {
          interesFinal = interesMedio;
          vpl_final = this.vpl(interesMedio, periods);
        }

        if (++count > 10000) throw "looping invalid";
      }

      // eslint-disable-next-line
      return ret;
    },
    vpl(valuation, periods) {
      let ret = periods[0];

      for (let i=1; i<periods.length; i++)
        ret += periods[i] / Math.pow( (1.0 + valuation), i);
      return ret;
    },
    sign(x) {
      return x < 0.0 ? -1 : 1;
    },
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