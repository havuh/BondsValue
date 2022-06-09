<template>
  <div class="container">
    <div class="transparent-font">
      <div class="divider">
        <aside class="title">
          <h1>BONDS VALUE</h1>
        </aside>
        <div class="signIn">
          <p>algo</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignIn"
}
</script>

<style scoped>
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
.divider {
  display: flex;
}
.title {
  flex: 1 1 auto;
  background-color: blue;
}
.signIn {
  flex: 1 1 auto;
  background-color: yellow;
}
h1 {
  color: hsla(0, 100%, 50%, 0.79);
}
</style>