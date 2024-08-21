<template>
  <Modal
    :isOpen="isOpen"
    @update:isOpen="emitOpenState($event)"
    @ok="createCard()"
  >
    <template #title>Créer une nouvelle carte</template>

    <form>
      <label>Description de la carte</label>
      <textarea
        placeholder="Faire les courses..."
        rows="2"
        v-model="content"
      ></textarea>
    </form>

  </Modal>
</template>

<script>
  import modalMixin from "./modalMixin";
  import { createCard } from "@/service/database";

  export default {
    mixins: [modalMixin],
    props: {
      listId: Number
    },
    data() {
      return {
        content: ""
      }
    },
    methods: {
      async createCard() {
        const cardToCreate = {
          content: this.content,
          listId: this.listId
        };
        await createCard(cardToCreate);

        this.content = "";
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
  textarea {
    border-radius: 5px;
    padding: 10px;
    width: 100%;
  }
</style>
