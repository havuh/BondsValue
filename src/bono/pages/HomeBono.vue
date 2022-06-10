<template>
  <v-card class="mb-12">
    <v-layout>
      <v-app-bar
          style="background-color: cadetblue"
          density="compact"
          app
      >
        <v-app-bar-title class="text-white">Bonds Value</v-app-bar-title>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
                color="primary"
                v-bind="props">
              USUARIO
            </v-btn>
          </template>
          <v-list>
            <v-list-item
                v-for="(item, index) in items"
                :key="index"
                :value="index"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>

    </v-layout>
  </v-card>

  <v-container class="d-flex justify-end">

    <v-btn
        flat
        color="secondary"
        class="mr-2"
    >
      Agregar
    </v-btn>
    <v-btn
        flat
        color="error"
    >
      Eliminar
    </v-btn>
  </v-container>

  <v-container>
    <v-table class="bg-transparent">
      <thead class="blue">
      <tr>
        <th class="text-left text-white">
          Codigo
        </th>
        <th class="text-left text-white">
          Nombre
        </th>
        <th class="text-left text-white">
          Valor nominal (USD)
        </th>
        <th class="text-left text-white">
          Tasa de cupon (%)
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="item in desserts"
          :key="item.codigo"
      >
        <td>{{ item.codigo }}</td>
        <td>{{ item.nombre }}</td>
        <td>{{ item.valorN }}</td>
        <td>{{ item.tasa }}</td>
        <template>
          <v-switch
              v-model="singleSelect"
              label="Single select"
              class="pa-3"
          ></v-switch>
        </template>
      </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script>
export default {
  name: "HomeBono",
  data () {
    return {
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
      items: [
        { title: 'Mi perfil' },
        { title: 'Salir' },
      ],

    }
  }
}
</script>

<style scoped>
body
{
  background-color: white;
}
.blue
{
  background-color: blue;
}
</style>