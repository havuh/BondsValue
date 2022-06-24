<template>
  <NavbarBono></NavbarBono>
  <div class="mb-12"></div>
  <v-container>
    <div class="d-flex justify-space-between mt-5 mb-5">
      <p class="detail-title">{{this.bond.name}}</p>
      <p class="detail-title">Método Americano</p>
      <v-btn flat class="btn-a" @click="openAddSecondMarket()">Calcular Mercado Secundario</v-btn>
    </div>
    <div class="bond-description mb-5">
      <div class="d-flex ml-p">
        <span><b>Valor nominal:</b> {{this.bond.nominalValue}} {{this.bond.currency}}</span>
        <span><b>Vencimiento:</b> {{this.expirationM}} {{this.bond.expirationType}}</span>
        <span><b>Tasa cupón:</b> {{this.bond.couponRate}} %</span>
      </div>
      <div class="d-flex ml-p">
        <span><b>Capitalización:</b> {{this.bond.capitalizationType}}</span>
        <span><b>Tasa cupón periodica:</b> {{tasaPeriodica}} % {{this.bond.capitalizationType}}</span>
      </div>
    </div>
    <p class="detail-subtitle">Flujo de caja</p>

    <!--Flujo de caja-->
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
      <div class="btn-indicador"><p>TIR: {{this.bond.TIR}} %</p></div>
      <div class="btn-indicador"><p>VA: {{this.bondPrice}}</p></div>
      <div class="btn-indicador"
           style="background-color: #90f46c !important;"><p>VAN: {{this.bond.VAN}}</p></div>
    </div>
  </v-container>

  <v-dialog
      persistent
      v-model="dialogSecondMarket"
  >
    <v-card class="card-new-bond">
      <div class="title-new-bond">
        <p class="mt-2" style="font-size: 1.5rem;">Mercado Secundario</p>
      </div>

      <v-form ref="formSecondMarket" v-model="valid" lazy-validation class="form-new-bond">
        <p class="form-new-bond_title">Tasa de rendimiento (anual)</p>
        <v-text-field placeholder="0%"
                      v-model="formSecondMarket.tasaDeRendimiento"
                      :rules="oblRule"
                      type="number"
                      class="mb-4"
                      density="compact"
                      variant="contained"
                      hide-details
                      single-line>
        </v-text-field>
        <p class="form-new-bond_title">Período de compra</p>
        <v-text-field placeholder="1"
                      v-model="formSecondMarket.periodoDeCompra"
                      :rules="periodoRules"
                      type="number"
                      class="mb-4"
                      density="compact"
                      variant="contained"
                      hide-details
                      single-line>
        </v-text-field>
      </v-form>
      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="button-can" @click="dialogSecondMarket = false">
          Cancelar
        </v-btn>
        <v-btn class="button-fin text-white" @click="createSecondMarket()">
          Agregar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
    numberOfPeriods: null,
    expirationM: null,
    cashFlow: {
      periods: [],
      capital: [],
      amortization: [],
      interes: [],
      quota: [],
    },
    formSecondMarket: {
      tasaDeRendimiento: null,
      periodoDeCompra: null,
    },
    dialogSecondMarket: false,
    valid: true,
    oblRule: [
      v => !!v || 'Campo obligatorio'
    ],
    periodoRules: [
      v => !!v || 'Campo obligatorio',
        //TODO: VALIDAR PERIODO
      //v => (v >= 0 && v < this.numberOfPeriods) || 'Periodo de compra invalido'
    ]
  }),
  mounted() {
    this.id = this.$route.params.id;
    if (this.$store.state.auth == false) {
      this.$router.push({path: `/auth/sign-in`});
    }
    else {
      this.retrieveBondInformation(this.id);
    }
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
      this.expirationM = this.bond.expiration;

      if (this.bond.expirationType == "Semestres") {
        this.bond.expiration = this.bond.expiration / 2;
      }
      else if (this.bond.expirationType == "Meses") {
        this.bond.expiration = this.bond.expiration / 12;
      }
      else if (this.bond.expirationType == "Bimestres") {
        this.bond.expiration = this.bond.expiration / 6;
      }
      else if (this.bond.expirationType == "Años") {
        this.bond.expiration = this.bond.expiration * 1;
      }
      else if (this.bond.expirationType == "Quincenas") {
        this.bond.expiration = this.bond.expiration / 24;
      }
      else if (this.bond.expirationType == "Trimestres") {
        this.bond.expiration = this.bond.expiration / 4;
      }
      else {
        this.numberOfPeriods = this.bond.expiration / 360;
      }

      if (this.bond.capitalizationType == "Semestral") {
        this.numberOfPeriods = this.bond.expiration * 2;
      }
      else if (this.bond.capitalizationType == "Mensual") {
        this.numberOfPeriods = this.bond.expiration * 12;
      }
      else if (this.bond.capitalizationType == "Bimestral") {
        this.numberOfPeriods = this.bond.expiration * 6;
      }
      else if (this.bond.capitalizationType == "Anual") {
        this.numberOfPeriods = this.bond.expiration;
      }
      else if (this.bond.capitalizationType == "Quincenal") {
        this.numberOfPeriods = this.bond.expiration * 24;
      }
      else if (this.bond.capitalizationType == "Trimestral") {
        this.numberOfPeriods = this.bond.expiration * 4;
      }
      else {
        this.numberOfPeriods = this.bond.expiration * 360;
      }
      for (let i = 0; i <= this.numberOfPeriods; i++) {
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
    openAddSecondMarket() {
      this.dialogSecondMarket = true;
    },
    createSecondMarket() {
      this.$refs.formSecondMarket.validate();
      if(this.valid) {
        this.dialogSecondMarket = false;
        this.$store.state.secondMarket.tasaPeriodica = this.tasaPeriodica;
        this.$store.state.secondMarket.bondPrice = this.bondPrice;
        this.$store.state.secondMarket.numberOfPeriods = this.numberOfPeriods;
        this.$store.state.secondMarket.cashFlow = this.cashFlow;
        this.$store.state.secondMarket.formSecondMarket = this.formSecondMarket;
        this.$store.state.secondMarket.bond = this.bond;
        BonoService.saveSecondMarket(this.$store.state.secondMarket);
        this.$router.push({ name: "secondMarket", params: {id: this.id}});
      }
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
.card-new-bond {
  border-radius: 18px !important;
}
.title-new-bond {
  font-weight: bold;
  color: #fff;
  text-align: center;
  background-color: #90f46c;
  height: 40px;
}
.form-new-bond {
  width: 280px;
  margin: 25px 35px 0px 35px;
}
.form-new-bond_title {
  font-size: 1.25rem;
  font-weight: bold;
}
.button-can {
  font-size: 1rem;
  border-radius: 10px;
  border: 1px #e6e8e8 solid;
  width: 70px;
}
.button-fin {
  font-size: 1rem;
  background-color: #90f46c;
  border-radius: 10px;
  margin-right: 30px;
  font-weight: bold;
  width: 70px;
}
</style>