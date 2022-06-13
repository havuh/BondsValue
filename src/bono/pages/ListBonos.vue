<template>
  <v-container class="d-flex justify-space-between align-center">
    <p style="font-size: 2rem;">Mis bonos</p>
    <div>
      <v-btn
          flat
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
          v-for="(item, index) in desserts"
          :key="index"
      >
        <td>{{ item.codigo }}</td>
        <td>{{ item.nombre }}</td>
        <td>{{ item.valorN }}</td>
        <td>{{ item.tasa }}</td>
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
</template>

<script>
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
      desserts: [
        {
          codigo: '1',
          nombre: 'BBVA Group',
          valorN: 2000,
          tasa: 2.00,
        },
        {
          codigo: '2',
          nombre: 'Interbank',
          valorN: 5000,
          tasa: 8.00,
        },
        {
          codigo: '3',
          nombre: 'BCP',
          valorN: 1000,
          tasa: 9.00,
        },
        {
          codigo: '4',
          nombre: 'Santander',
          valorN: 2500,
          tasa: 10.00,
        },
        {
          codigo: '5',
          nombre: 'Caja Huancayo',
          valorN: 15000,
          tasa: 15.00,
        },
        {
          codigo: '6',
          nombre: 'Banco Ripley',
          valorN: 8000,
          tasa: 25.00,
        },
        {
          codigo: '7',
          nombre: 'Caja Arequipa',
          valorN: 1200,
          tasa: 5.00,
        },
        {
          codigo: '8',
          nombre: 'Pichincha',
          valorN: 5000.20,
          tasa: 15.00,
        },
        {
          codigo: '9',
          nombre: 'Banco Falabella',
          valorN: 2500,
          tasa: 10.00,
        },
        {
          codigo: '10',
          nombre: 'Scotiabank',
          valorN: 18000,
          tasa: 6.50,
        },
      ],
    }
  },
  methods: {
    goToComponent(index) {
      console.log(this.desserts[index]);
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
</style>