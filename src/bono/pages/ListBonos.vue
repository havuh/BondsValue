<template>
  <v-container class="d-flex justify-space-between align-center">
    <p style="font-size: 2rem;">Mis bonos</p>
    <div>
      <v-btn
          flat
          @click="addNewBond()"
          class="btn-a"
          style="background-color: #40c464;">
        Agregar
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
        <td>{{ index + 1 }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.nominalValue }} {{item.currency}}</td>
        <td>{{ item.couponRate }} %</td>
        <td class="text-center">
          <v-btn icon="mdi-eye" size="small"
                 color="primary" class="mr-2" @click="goToComponent(item.id)"></v-btn>
          <!--
          <v-btn icon="mdi-pencil" size="small"
                 color="primary" class="mr-2"></v-btn> -->
          <v-btn icon="mdi-delete" size="small"
                 color="warning" @click="goToDeleteComponent(index)"></v-btn>
        </td>
      </tr>
      </tbody>
    </v-table>

    <h1 v-if="bonds.length == 0"
        class="text-center mt-10">No hay bonos disponibles. Click en "Agregar" para crear uno</h1>

  </v-container>

  <!--Form new bond-->
  <v-dialog
      persistent
      v-model="dialogNewBond"
  >
    <v-card class="card-new-bond">
      <div class="title-new-bond">
        <p class="mt-2">Bono Coorporativo</p>
      </div>

      <v-form ref="formNewBond" v-model="valid" lazy-validation class="form-new-bond">
        <p class="form-new-bond_title">Nombre</p>
        <v-text-field placeholder="Founding Bound"
                      v-model="formNewBonds.name"
                      :rules="oblRule"
                      class="mb-4"
                      density="compact"
                      variant="contained"
                      hide-details
                      single-line>
        </v-text-field>
        <p class="form-new-bond_title">Valor Nominal</p>
        <div class="d-flex">
          <v-text-field placeholder="10000"
                        v-model="formNewBonds.nominalValue"
                        :rules="oblRule"
                        type="number"
                        class="mb-4"
                        style="max-width: 60%"
                        density="compact"
                        variant="contained"
                        hide-details
                        single-line>
          </v-text-field>
          <v-autocomplete density="compact"
                          class="mb-4"
                          style="max-width: 40%"
                          v-model="formNewBonds.currency"
                          :items="currency"
                          :readonly="true"
                          variant="contained"
                          hide-details>
          </v-autocomplete>
        </div>
        <p class="form-new-bond_title">Tasa cupón (anual)</p>
        <v-text-field placeholder="2%"
                      v-model="formNewBonds.couponRate"
                      :rules="oblRule"
                      type="number"
                      class="mb-4"
                      density="compact"
                      variant="contained"
                      hide-details
                      single-line>
        </v-text-field>
        <p class="form-new-bond_title">Vencimiento</p>
        <div class="d-flex">
          <v-text-field placeholder="0"
                        v-model="formNewBonds.expiration"
                        :rules="oblRule"
                        type="number"
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
                          v-model="formNewBonds.expirationType"
                          :items="expirationType"
                          :readonly="true"
                          variant="contained"
                          hide-details>
          </v-autocomplete>
        </div>
        <!--
        <v-text-field class="mb-4"
                      v-model="formNewBonds.expiration"
                      :rules="expirationRules"
                      density="compact"
                      variant="contained"
                      type="date"
                      hide-details
                      single-line>
        </v-text-field>
        -->
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
        <!--TODO: Form para mercado secundario-->
      </v-form>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="button-can" @click="dialogNewBond = false">
          Cancelar
        </v-btn>
        <v-btn class="button-fin text-white" @click="createBond()">
          Agregar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!--Delete bond-->
  <v-dialog
      persistent
      v-model="dialogDeleteBond"
  >
    <v-card class="card-new-bond">
      <div class="title-new-bond" style="background-color: #E21212 !important">
        <p class="mt-2">Bono Coorporativo</p>
      </div>

      <v-card-text style="font-size: 1.3rem;">
        ¿Estás seguro de querer eliminar <span class="title-delete-bond">{{ deleteBondItem.name }}</span> ?
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="button-can" @click="dialogDeleteBond = false">
          Cancelar
        </v-btn>
        <v-btn class="button-fin text-white"
               style="background-color: #E21212 !important"
               @click="deleteBond(deleteBondItem.id)">
          Eliminar
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
      headers: [
        { text: 'Codigo', value: 'codigo' },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Valor nominal', value: 'valorN' },
        { text: 'Tasa de cupón (%)', value: 'tasa' }
      ],
      currency: ['PEN S/', 'USD $', 'EUR €', 'JPY ¥'],
      capitalizationType: ['Diario', 'Quincenal', 'Mensual', 'Bimestral', 'Trimestral', 'Semestral', 'Anual'],
      marketType: ['Primario'],
      expirationType: ['Dias', 'Quincenas', 'Meses', 'Bimestres', 'Trimestres', 'Semestres', 'Años'],
      bonds: [],
      formNewBonds: {
        id: '',
        name: '',
        nominalValue: null,
        currency: 'USD $',
        couponRate: null,
        expiration: null,
        expirationType: 'Años',
        capitalizationType: 'Anual',
        marketType: 'Primario',
        VAN: 0,
        TIR: 0,
        userId: this.$store.state.user.id
      },
      dialogNewBond: false,
      deleteBondItem: {},
      dialogDeleteBond: false,
      valid: true,
      dateToday: null,
      oblRule: [
          v => !!v || 'Campo obligatorio'
      ],
      expirationRules: [
          v => (this.dateToday < v) || 'Fecha no válida'
      ]
    }
  },

  mounted() {
    this.retrieveBondsByUserId();
    //TODO: BORRAR OBTENER DÍA
    let date = new Date()
    if (date.getMonth() + 1 < 10)
      this.dateToday = `${date.getFullYear()}-0${date.getMonth() + 1}-${date.getDate()}`;
    else
      this.dateToday = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    console.log(this.dateToday);
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
      this.dialogNewBond = true;
    },
    goToComponent(id) {
      this.$router.push({
        name: "bonoDetail",
        params: {
          id: id,
        }
      })
    },
    async createBond() {
      this.$refs.formNewBond.validate();
      if (this.valid) {
        //TODO: mostrar errores en el formulario
        await BonoService.getAll()
            .then(response => {
              this.formNewBonds.id = response.data[response.data.length - 1].id + 1;
              BonoService.create(this.formNewBonds).then(response => {
                if(response.status == 201) {
                  this.dialogNewBond = false;
                  this.retrieveBondsByUserId()}
              }).catch(error => {
                this.errors.push(error);
              });
            }).catch(error => {
              this.errors.push(error);
            })
      }
    },
    goToDeleteComponent(index) {
      this.dialogDeleteBond = true;
      this.deleteBondItem = this.bonds[index];
    },
    async deleteBond(id) {
      await BonoService.delete(id)
          .then(response => {
            if(response.status == 200) {
              this.deleteBondItem = {},
              this.dialogDeleteBond = false;
              this.retrieveBondsByUserId();
            }
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
.title-delete-bond {
  font-weight: bold;
  color: #90f46c;
}
</style>