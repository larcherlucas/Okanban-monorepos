<template>
  <Modal
    :isOpen="isOpen"
    @update:isOpen="emitOpenState($event)"
    @ok="createList()"
  >
    <template #title>Créer une nouvelle liste</template>

    <form @submit.prevent>
      <label>Nom de la liste</label>
      <input type="text"
        placeholder="Liste des choses à faire..."
        v-model="name"
      />
    </form>

  </Modal>
</template>

<script>
  import modalMixin from "./modalMixin";
  import { createList } from "@/service/database";

  export default {
    mixins: [modalMixin],
    data() {
      return {
        name: ""
      }
    },
    methods: {
      async createList() {
        await createList({ name: this.name });
        this.name = "";
        this.$emit("created");
      }
    }
  }
</script>

<style scoped>
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px;
  }
  label {
    font-weight: 800;
    margin: 10px 0;
  }
  input {
    border-radius: 5px;
    padding: 10px;
    width: 100%;
  }
</style>
