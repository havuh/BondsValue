<template>
  <div class="container">
    <div class="transparent-font">
      <div class="d-flex">
        <aside class="content d-flex flex-column justify-center">
          <p class="title">BONDS</p>
          <p class="title">VALUE</p>
        </aside>
        <div class="content d-flex justify-center">
          <div class="signUp pa-16">
            <h1 class="mt-8 mb-6">Regístrate</h1>
            <v-form ref="formSignUp" v-model="valid" lazy-validation>
              <div class="d-flex" style="gap: 20px;">
                <v-text-field label="Nombres"
                              variant="contained"
                              style="max-width: 45%"
                              class="text-white"
                              v-model="user.name"
                              :rules="nameRules"
                              prepend-inner-icon="mdi-alpha-n-circle"
                              required>
                </v-text-field>
                <v-text-field label="Apellidos"
                              style="max-width: 51%"
                              v-model="user.lastname"
                              :rules="lastnameRules"
                              variant="contained"
                              class="text-white"
                              prepend-inner-icon="mdi-alpha-a-circle"
                              required>
                </v-text-field>
              </div>
              <v-text-field label="Correo electrónico"
                            variant="contained"
                            class="text-white"
                            prepend-inner-icon="mdi-account"
                            v-model="user.email"
                            :rules="emailRules"
                            required>
              </v-text-field>
              <v-text-field label="Contraseña"
                            v-model="user.password"
                            type="password"
                            :rules="passwordRules"
                            variant="contained"
                            class="text-white"
                            prepend-inner-icon="mdi-lock"
                            required>
              </v-text-field>
              <v-btn class="button-ing text-white font-1-5rem" @click="signUp()">Registrarse</v-btn>
            </v-form>
            <p class="text-white font-1-5rem mt-5">¿Ya tienes una cuenta? <a @click="goToSignIn()" style="cursor: pointer" class="text-red">Ingresa aquí</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignUp",
  data: () => ({
    user: {
      name: '',
      lastname: '',
      email: '',
      password: '',
      photo: '',
    },
    emailRules: [
      v => !!v || 'El correo electronico es obligatorio',
      v => /.+@.+/.test(v) || 'El correo electronico no es válido'
    ],
    passwordRules: [
      v => !!v || 'La contraseña es obligatoria',
      v => (v && v.length >= 8) || 'La contraseña debe tener al menos 8 caracteres',
      v => /(?=.*\d)/.test(v) || 'La contraseña debe contener al menos un número',
      v => /([!@$%?¿])/.test(v) || 'Debe contener al menos un caracter especial [!@$%¿?]'
    ],
    nameRules: [
      v => !!v || 'El nombre es obligatorio',
    ],
    lastnameRules: [
      v => !!v || 'El apellido es obligatorio',
    ],
    valid: true,
  }),
  methods: {
    goToSignIn(){
      this.$router.push({path: `/auth/sign-in`});
    },
    validate(){
      this.$refs.formSignUp.validate();
    },
    signUp(){
      this.$refs.formSignUp.validate();
      if(this.valid) {

        console.log(this.user);
      }
    }
  }
}
</script>

<style scoped>
* {
  font-family: "Agency FB";
}
.font-1-5rem{
  font-size: 1.5rem;
}
.container {
  height: 100vh;
  width: 100%;
  background-image: url("../../assets/login-background.jpg");
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  background-size: cover;
}
.transparent-font {
  background-color: hsla(0, 0%, 0%, 0.5);
  height: 100vh;
  width: 100%;
}
.content {
  flex: 1 1 auto;
  max-width: 50%;
}
.content .signUp {
  background-color: hsla(0, 0%, 0%, 0.80);
  width: 80%;
  height: 100vh;
}
.title {
  font-family: Garamond;
  color: hsla(0, 100%, 50%, 0.79);
  font-size: 10rem;
  font-weight: normal;
  margin-left: 10%;
}
h1 {
  color: #fff;
  font-weight: normal;
  font-size: 4rem;
}
.button-ing {
  background-color: #E21212;
  width: 100%;
  height: 45px;
  border-radius: 10px;
}
</style>