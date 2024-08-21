<template>
  <Modal
    :isOpen="isOpen"
    @update:isOpen="emitOpenState($event)"
    @ok="deleteCard()"
  >
    <template #title>Supprimer la carte ?</template>

    <div>
      <p><b>Êtes-vous certain de vouloir supprimer cette carte ?</b></p>
      <p>Cette opération est irréversible.</p>
    </div>

  </Modal>
</template>

<script>
  import modalMixin from "./modalMixin";
  import { deleteCard } from "@/service/database";

  export default {
    mixins: [modalMixin],
    props: {
      cardId: Number
    },
    methods: {
      async deleteCard() {
        await deleteCard(this.cardId);
        this.$emit("deleted");
      }
    }
  }
</script>
