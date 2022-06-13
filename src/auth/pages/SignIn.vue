<template>
  <div class="container">
    <div class="transparent-font">
      <div class="d-flex">
        <aside class="content d-flex flex-column justify-center">
          <p class="title">BONDS</p>
          <p class="title">VALUE</p>
        </aside>
        <div class="content d-flex justify-center">
          <div class="signIn pa-16">
            <h1 class="mt-14 mb-6">Inicia Sesión</h1>
            <v-form ref="formSignIn" v-model="valid" lazy-validation>
              <v-text-field label="Correo electrónico"
                            variant="contained"
                            prepend-inner-icon="mdi-account"
                            class="text-white"
                            :rules="emailRules"
                            v-model="user.email"
                            error-count="1"
                            required>
              </v-text-field>
              <v-text-field label="Contraseña"
                            v-model="user.password"
                            :rules="passwordRules"
                            error-count="1"
                            type="password"
                            variant="contained"
                            class="text-white"
                            prepend-inner-icon="mdi-lock"
                            required>
              </v-text-field>
              <v-btn class="button-ing text-white font-1-5rem" @click="signIn()">Ingresar</v-btn>
            </v-form>
            <div class="d-flex align-center mt-4">
              <v-checkbox class="text-white font-1-5rem" color="#E21212" hide-details>
                <template v-slot:label>
                  <div class="font-1-5rem">Recuérdame</div>
                </template>
              </v-checkbox>
              <span style="cursor: pointer;" class="text-white font-1-5rem">¿Necesitas ayuda?</span>
            </div>
            <p class="text-white font-1-5rem">¿Aún no tienes una cuenta? <a @click="goToSignUp()" style="cursor: pointer" class="text-red">Registrate aquí</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignIn",
  data: () => ({
    user: {
      email: '',
      password: '',
    },
    emailRules: [
      v => !!v || 'El correo electrónico es requerido',
      v => /.+@.+/.test(v) || 'El correo electrónico no es válido'
    ],
    passwordRules: [
      v => !!v || 'La contraseña es requerida',
    ],
    valid: true,
  }),
  methods: {
    goToSignUp(){
      this.$router.push({path: `/auth/sign-up`});
    },
    validate(){
      this.$refs.formSignIn.validate();
    },
    signIn(){
      this.$refs.formSignIn.validate();
      if(this.valid){
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
.content .signIn {
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