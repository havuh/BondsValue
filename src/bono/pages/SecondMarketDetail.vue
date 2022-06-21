<template>
  <NavbarBono></NavbarBono>
  <div class="mb-12"></div>
  <v-container>
    <p class="title-style mt-5">{{bond.name}}</p>
    <p class="title-style mt-1">Mercado secundario</p>

    <div class="bond-description mb-5 mt-5">
      <div class="d-flex">
        <span><b>Tasa de rendimiento periodica:</b> {{newTasaP}} %</span>
        <span><b>Nuevo valor del bono:</b> {{this.newBondValue}} {{this.bond.currency}}</span>
        <span><b>Duración (periodos):</b> {{durationS}}</span>
      </div>
      <div class="d-flex">
        <span><b>Duración (años):</b> {{duration}}</span>
        <span><b>Duración modificada:</b> </span>
        <span><b>Convexidad:</b> </span>
      </div>
    </div>
    <p class="subtitle">Flujo de caja</p>

    <table class="table-style mt-5 mb-8">
      <thead style="background-color: #5024fc">
      <tr>
        <th
            v-for="(item, index) in this.newCashFlow.periods"
            :key="index"
            class="text-white"
        >
          {{item}}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td
            v-for="(item, index) in this.newCashFlow.quota"
            :key="index"
        >
          {{item}}
        </td>
      </tr>
      </tbody>
    </table>

    <p class="subtitle">Indicadores financieros</p>
    <div class="d-flex justify-space-around">
      <div class="btn-indicador"><p>TIR: {{this.newTIR}} %</p></div>
      <div class="btn-indicador"><p>VA: {{this.bondPrice}}</p></div>
      <div class="btn-indicador"
           style="background-color: #90f46c !important;"><p>VAN: {{this.newVAN}}</p></div>
    </div>
  </v-container>
</template>

<script>
import NavbarBono from "@/bono/pages/NavbarBono";
export default {
  name: "SecondMarketDetail",
  components: {NavbarBono},
  data: () => ({
    id: null,
    newCashFlow: {
      periods: [],
      quota: [],
    },
    bond: {},
    durationS: null,
    duration: null,
    newBondValue: null,
    newTasaP: null,
    newTIR: null,
    newVAN: null,
    secondMarket: null,
  }),
  mounted() {
    this.secondMarket = JSON.parse(localStorage.getItem('secondMarket'));
    this.id = this.$route.params.id;
    this.bond = this.secondMarket.bond;
    this.calculateSecondMarket();
  },
  methods: {
    calculateSecondMarket() {
      this.calculateNewTasaP();
      this.calculateSecondMarketPeriods();
      this.calculateNewBondValue();
      this.calculateDuration();
      this.newTIR = this.calculateTIR(this.newCashFlow.quota);
      this.calculateVAN();
      this.results();
    },
    calculateNewTasaP() {
      let type = this.secondMarket.bond.capitalizationType;
      let r = this.secondMarket.formSecondMarket.tasaDeRendimiento;
      if (type == "Semestral") {
        this.newTasaP = Math.pow(r/100 + 1, 1/2) - 1;
      }
      else if (type == "Mensual") {
        this.newTasaP = Math.pow(r/100 + 1, 1/12) - 1;
      }
      else if (type == "Bimestral") {
        this.newTasaP = Math.pow(r/100 + 1, 1/6) - 1;
      }
      else if (type == "Anual") {
        this.newTasaP = Math.pow(r/100 + 1, 1) - 1;
      }
      else if (type == "Quincenal") {
        this.newTasaP = Math.pow(r/100 + 1, 1/24) - 1;
      }
      else if (type == "Trimestral") {
        this.newTasaP = Math.pow(r/100 + 1, 1/4) - 1;
      }
      else {
        this.newTasaP = Math.pow(r/100 + 1, 1/360) - 1;
      }
    },
    calculateNewBondValue() {
      let compra = this.secondMarket.formSecondMarket.periodoDeCompra;
      for(let i = 0; i < this.newCashFlow.periods.length; i++) {
        if (i > 0) {
          this.newBondValue = this.newBondValue + (this.secondMarket.cashFlow.quota[compra + i]/
              Math.pow(1 + this.newTasaP,i));
        }
      }
      this.newCashFlow.quota[0] = this.newBondValue.toFixed(2) * -1;
    },
    calculateSecondMarketPeriods() {
      let compra = this.secondMarket.formSecondMarket.periodoDeCompra;
      let periods = this.secondMarket.numberOfPeriods;
      for (let i = compra; i <= periods; i++) {
        this.newCashFlow.periods.push(i);
        this.newCashFlow.quota.push(this.secondMarket.cashFlow.quota[i]);
      }
    },
    calculateDuration() {
      let compra = this.secondMarket.formSecondMarket.periodoDeCompra;
      for(let i = 0; i < this.newCashFlow.periods.length; i++) {
        if (i > 0) {
          //console.log(((this.secondMarket.cashFlow.quota[compra + i]/ Math.pow(1 + this.newTasaP,i)) * i));
          this.duration = this.duration + ((this.secondMarket.cashFlow.quota[compra + i]/
              Math.pow(1 + this.newTasaP,i)) * i);
        }
      }
      this.durationS = this.duration/this.newBondValue;
      let type = this.secondMarket.bond.capitalizationType;
      if (type == "Semestral") {
        this.duration = this.durationS / 2;
      }
      else if (type == "Mensual") {
        this.duration = this.durationS / 12;
      }
      else if (type == "Bimestral") {
        this.duration = this.durationS / 6;
      }
      else if (type == "Anual") {
        this.duration = this.durationS / 1;
      }
      else if (type == "Quincenal") {
        this.duration = this.durationS / 24;
      }
      else if (type == "Trimestral") {
        this.duration = this.durationS / 4;
      }
      else {
        this.duration = this.durationS / 360;
      }
    },
    //TIR
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
    calculateVAN() {
      let compra = this.secondMarket.formSecondMarket.periodoDeCompra;
      for(let i = 0; i < this.newCashFlow.periods.length; i++) {
        if (i > 0) {
          this.newVAN = this.newVAN + (this.secondMarket.cashFlow.quota[compra + i]/
              Math.pow(1 + this.secondMarket.tasaPeriodica/100,i));
        }
      }
      this.newVAN = this.newVAN - this.newBondValue;
    },
    results() {
      this.newTasaP = (this.newTasaP * 100).toFixed(5);
      this.duration = this.duration.toFixed(2);
      this.durationS = this.durationS.toFixed(2);
      this.newBondValue = this.newBondValue.toFixed(2);
      this.newTIR = this.newTIR.toFixed(5);
      this.newVAN = this.newVAN.toFixed(5);
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
  max-width: 33%;
  flex:  1 0 auto;
}
.title-style {
  font-size: 2rem;
  color: #E21212;
  text-decoration: underline;
}
.subtitle {
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