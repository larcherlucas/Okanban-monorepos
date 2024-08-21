<template>
  <Modal
    :isOpen="isOpen"
    @update:isOpen="emitOpenState($event)"
    @ok="updateCard()"
    :isOkButtonDisabled="isInvalidUpdate"
  >
    <template #title>Modifier la carte</template>

    <form>
      <label>Description de la carte</label>
      <textarea
        rows="2"
        v-model="content"
      ></textarea>

      <label>Couleur de la carte</label>
      <input type="color" v-model="color">
    </form>

  </Modal>
</template>

<script>
  import modalMixin from "./modalMixin";
  import { updateCard } from "@/service/database";

  export default {
    mixins: [modalMixin],
    props: {
      card: Object
    },
    data() {
      return {
        content: this.card.content,
        color: this.card.color
      }
    },
    methods: {
      async updateCard() {
        const cardUpdate = {
          content: this.content,
          ...(this.color ? { color: this.color }: {})
        }
        await updateCard(this.card.id, cardUpdate);
        this.$emit("updated");
      }
    },
    computed: {
      isInvalidUpdate() {
        return this.content === "";
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
