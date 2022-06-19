<template>
  <v-layout>
    <v-app-bar
        density="compact"
        color="#fffcec"
        app
    >
      <v-app-bar-title class="title">BONDS VALUE</v-app-bar-title>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn
              class="btn-menu"
              v-bind="props">
            {{ this.$store.state.user.name }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item
              v-for="(item, index) in items"
              :key="index"
              :value="index"
          >
            <v-list-item-title @click="n(index)">{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </v-layout>
</template>

<script>
//import AuthService from '../../auth/services/auth.service'
export default {
  name: "NavbarBono",
  data: () => ({
    items: [
      { title: 'Mi perfil' },
      { title: 'Configuración'},
      { title: 'Cerrar sesión' },
    ],
  }),
  methods: {
    n(index) {
      if (index == 0) console.log("Go to mi perfil")
      else if (index == 1) console.log("Go to configuración")
      else {
        this.$router.push({path: `/auth/sign-in`});
      }
    }
  }
}
</script>

<style scoped>
* {
  font-family: "Agency FB";
}
.title {
  font-family: Garamond;
  color: hsla(0, 100%, 50%, 0.79);
  font-size: 2rem;
  font-weight: bold;
}
.btn-menu {
  font-weight: bold;
  color: #fff;
  background-color: #684ce4;
}
</style>