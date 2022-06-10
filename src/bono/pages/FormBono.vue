<template>
  <v-container>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >
      <v-text-field
          v-model="name"
          :counter="10"
          :rules="nameRules"
          label="Nombre"
          required
      ></v-text-field>
      <v-text-field
          v-model="name"
          :counter="10"
          :rules="nameRules"
          label="Valor nominal"
          required
      >
      </v-text-field>
      <v-text-field
          v-model="name"
          :counter="10"
          :rules="nameRules"
          label="Tasa de cupon (%)"
          required
      >
      </v-text-field>
      <v-select
          v-model="select"
          :items="items"
          :rules="[v => !!v || 'Item is required']"
          label="Tipo de capitalizacion"
          required
      ></v-select>
      <v-btn
          color="warning"
          @click="resetValidation"
      >
        Guardar
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: "FormBono",
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    select: null,
    items: [
      'Semestral',
      'Bimestral',
      'Trimestral',
      'Cuatrimestral',
    ],
  }),

  methods: {
    validate () {
      this.$refs.form.validate()
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
  },
}

</script>

<style scoped>

</style>