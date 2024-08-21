<template>
  <Modal
    :isOpen="isOpen"
    @update:isOpen="emitOpenState($event)"
    @ok="deleteList()"
  >
    <template #title>Supprimer la liste ?</template>

    <div>
      <p><b>Êtes-vous certain de vouloir supprimer cette liste ?</b></p>
      <p>Supprimer une liste supprime également les cartes de cette liste.</p>
      <p>Cette opération est irréversible.</p>
    </div>

  </Modal>
</template>

<script>
  import modalMixin from "./modalMixin";
  import { deleteList } from "@/service/database";

  export default {
    mixins: [modalMixin],
    props: {
      listId: Number
    },
    methods: {
      async deleteList() {
        await deleteList(this.listId);
        this.$emit("deleted");
      }
    }
  }
</script>
