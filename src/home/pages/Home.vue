<template>
  <div></div>
  <p>See you</p>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'HomeView',
  components: {
  },
  mounted() {
    this.$router.push({path: `/auth/sign-in`});
  }
}
</script>
<style scoped>
div {
  width: 100%;
  height: 100vh;
  background-color: #000;
}
</style>