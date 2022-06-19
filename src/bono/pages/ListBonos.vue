<template>
  <v-container class="d-flex justify-space-between align-center">
    <p style="font-size: 2rem;">Mis bonos</p>
    <div>
      <v-btn
          flat
          @click="addNewBond()"
          class="mr-2 btn-a"
          style="background-color: #40c464;">
        Agregar
      </v-btn>
      <v-btn
          flat
          class="btn-a"
          style="background-color: #e03c34;">
        Eliminar
      </v-btn>
    </div>
  </v-container>
  <v-container>
    <v-table class="bg-transparent">
      <thead style="background-color: #5024fc">
      <tr>
        <th class="text-left text-white" style="font-size: 1rem">
          Codigo
        </th>
        <th class="text-left text-white" style="font-size: 1rem">
          Nombre
        </th>
        <th class="text-left text-white" style="font-size: 1rem">
          Valor nominal
        </th>
        <th class="text-left text-white" style="font-size: 1rem">
          Tasa de cupón (%)
        </th>
        <th class="text-center text-white" style="font-size: 1rem">
          Acciones
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="(item, index) in bonds"
          :key="index"
      >
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.nominalValue }}</td>
        <td>{{ item.couponRate }} %</td>
        <td class="text-center">
          <v-btn icon="mdi-eye" size="small"
                 color="primary" class="mr-2" @click="goToComponent(index)"></v-btn>
          <v-btn icon="mdi-pencil" size="small"
                 color="primary" class="mr-2"></v-btn>
          <v-btn icon="mdi-delete" size="small"
                 color="warning"></v-btn>
        </td>
      </tr>
      </tbody>
    </v-table>
  </v-container>
  <!--Form new bond-->
  <v-dialog
      persistent
      v-model="dialogNewBond"
  >
    <v-card class="card-new-bond">
      <div class="title-new-bond">
        <p class="mt-2">Bono Corporativo</p>
      </div>

      <v-form ref="formNewBond" v-model="valid" lazy-validation class="form-new-bond">
        <p class="form-new-bond_title">Nombre</p>
        <v-text-field placeholder="Founding Bound"
                      class="mb-4"
                      density="compact"
                      variant="contained"
                      hide-details
                      single-line>
        </v-text-field>
        <p class="form-new-bond_title">Valor Nominal</p>
        <div class="d-flex">
          <v-text-field placeholder="10000"
                        class="mb-4"
                        style="max-width: 70%"
                        density="compact"
                        variant="contained"
                        hide-details
                        single-line>
          </v-text-field>
          <v-autocomplete density="compact"
                          class="mb-4"
                          style="max-width: 30%"
                          v-model="formNewBonds.currency"
                          :items="currency"
                          :readonly="true"
                          variant="contained"
                          hide-details>
          </v-autocomplete>
        </div>
        <p class="form-new-bond_title">Tasa cupón (anual)</p>
        <v-text-field placeholder="2%"
                      class="mb-4"
                      density="compact"
                      variant="contained"
                      hide-details
                      single-line>
        </v-text-field>
        <p class="form-new-bond_title">Vencimiento</p>
        <v-text-field class="mb-4"
                      density="compact"
                      variant="contained"
                      type="date"
                      hide-details
                      single-line>
        </v-text-field>
        <p class="form-new-bond_title">Tipo de capitalización</p>
        <v-autocomplete density="compact"
                        class="mb-4"
                        v-model="formNewBonds.capitalizationType"
                        :items="capitalizationType"
                        :readonly="true"
                        variant="contained"
                        hide-details>
        </v-autocomplete>
        <p class="form-new-bond_title">Tipo de mercado</p>
        <v-autocomplete density="compact"
                        class="mb-4"
                        v-model="formNewBonds.marketType"
                        :items="marketType"
                        :readonly="true"
                        variant="contained"
                        hide-details>
        </v-autocomplete>
      </v-form>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="button-can" @click="dialogNewBond = false">
          Cancelar
        </v-btn>
        <v-btn class="button-fin text-white" @click="dialogNewBond = false">
          Agregar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import BonoService from '../services/bono.service'
export default {
  name: "ListBonos",
  data () {
    return {
      selected: [],
      headers: [
        { text: 'Codigo', value: 'codigo' },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Valor nominal', value: 'valorN' },
        { text: 'Tasa de cupón (%)', value: 'tasa' }
      ],
      currency: ['USD', 'PEN'],
      capitalizationType: ['Diario', 'Quincenal', 'Mensual', 'Bimestral', 'Trimestral', 'Semestral', 'Anual'],
      marketType: ['Primario', 'Secundario'],
      bonds: [],
      formNewBonds: {
        currency: 'USD',
        capitalizationType: 'Anual',
        marketType: 'Primario',
      },
      dialogNewBond: false,
      valid: true,
    }
  },
  mounted() {
    this.retrieveBondsByUserId();
  },
  methods: {
    retrieveBondsByUserId() {
      BonoService.getAllByUserId(this.$store.state.user.id)
      .then(response => {
        this.bonds = response.data;
      }).catch(error => {
        this.errors.push(error);
      })
    },
    addNewBond() {
      this.openFormNewBond();

    },
    openFormNewBond() {
      this.dialogNewBond = true;
    },
    goToComponent(index) {
      console.log(this.bonds[index]);
    }
  }
}
</script>

<style scoped>
* {
  font-family: "Agency FB";
}
.btn-a {
  color: #fff;
  border-radius: 8px;
  width: 120px;
}
.card-new-bond {
  border-radius: 18px !important;
}
.title-new-bond {
  font-size: 1.5rem;
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
  border-radius: 10px;
  border: 1px #e6e8e8 solid;
  width: 70px;
}
.button-fin {
  background-color: #90f46c;
  border-radius: 10px;
  margin-right: 30px;
  font-weight: bold;
  width: 70px;
}
</style>