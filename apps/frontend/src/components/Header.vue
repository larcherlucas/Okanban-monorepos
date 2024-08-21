<template>
  <header>
    <img :src="logo" alt="Logo">
    <h1>O'Kanban</h1>
  </header>
</template>

<script>
  import logo from "@/assets/logo.svg";

  export default {
    data() {
      return {
        logo
      }
    },
  }
</script>

<style scoped>
  header {
    display: flex;
    justify-content: center;
  }

  img {
    width: 50px;
  }

  h1 {
    padding: 20px;
    text-align: center;
    font-size: 50px;
    font-weight: 800;
  }
</style>
