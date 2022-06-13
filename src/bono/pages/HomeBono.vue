<template>
  <NavbarBono></NavbarBono>
  <div class="mb-12"></div>
  <ListBonos></ListBonos>
</template>

<script>
import NavbarBono from "@/bono/pages/NavbarBono";
import ListBonos from "@/bono/pages/ListBonos";

export default {
  name: "HomeBono",
  components: {ListBonos, NavbarBono },
}
</script>

<style scoped>
body
{
  background-color: white;
}
</style>