<template>
  <div class="list">

    <div class="head">

      <div class="name"
        v-if="! isEditMode"
        @click="switchToEditMode()"
      >{{list.name}}
      </div>

      <form v-else @submit.prevent="updateListName()">
        <input type="text" v-model="list.name" />
        <button><i class="fas fa-check"></i></button>
      </form>

      <div class="edit-container" v-if="! isEditMode">
        <span @click="openCreateCardModal()"><i class="fas fa-plus"></i></span>
        <span @click="openDeleteListModal()"><i class="fas fa-trash-alt"></i></span>
      </div>

    </div>

    <Draggable v-model="list.cards" class="cards" @change="moveCard($event)" group="cards" item-key="id">
      <template #item="{element: card}">
        <Card
          class="card"
          :card="card"
          @deleted="removeCardFromList(card.id)"
          @updated="$emit('cardUpdated')"
        />
      </template>
    </Draggable>

    <CreateCardModal
      v-model:isOpen="isCreateCardModalOpen"
      :listId="list.id"
      @created="$emit('cardCreated')"
    />

    <DeleteListModal
      v-model:isOpen="isDeleteListModalOpen"
      :listId="list.id"
      @deleted="$emit('deleted')"
    />
  </div>
</template>

<script>
  import Draggable from "vuedraggable";
  import { updateCard, updateList } from '@/service/database';
  import Card from "./Card.vue";
  import { CreateCardModal } from "./modals";
  import { DeleteListModal } from "./modals";

  export default {
    components: {
      Card,
      CreateCardModal,
      DeleteListModal,
      Draggable
    },
    props: {
      list: Object
    },
    data() {
      return {
        isEditMode: false,
        isCreateCardModalOpen: false,
        isDeleteListModalOpen: false
      }
    },
    methods: {
      openCreateCardModal() {
        this.isCreateCardModalOpen = true;
      },
      openDeleteListModal() {
        this.isDeleteListModalOpen = true;
      },
      removeCardFromList(cardId) {
        const cardIndex = this.list.cards.findIndex(card => card.id === cardId);
        this.list.cards.splice(cardIndex, 1);
      },
      switchToEditMode() {
        this.isEditMode = true;
      },
      async updateListName() {
        await updateList(this.list.id, { name: this.list.name });
        this.isEditMode = false;
      },
      async moveCard({ added, moved }) {
        const cardId = added?.element?.id || moved?.element?.id;
        
        if (added) {
          const newCardListId = this.list.id;
          await updateCard(cardId, { listId: newCardListId });
        }
        await saveListCardsOrder(this.list.cards);

        async function saveListCardsOrder(cards) {
          const promises = cards.map((card, index) => updateCard(card.id, { position: index + 1 }));
          await Promise.all(promises);
        }
      }
    }
  }
</script>

<style scoped>
  .list {
    display: flex;
    width: 250px;
    padding: 20px;
    margin: 10px;
    flex-direction: column;
    align-items: center;
    border: 1px solid lightgrey;
  }

  .head {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .name {
    cursor: pointer;
  }

  .cards {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
  }

  .card {
    margin: 10px 0;
  }

  .edit-container {
    padding-left: 10px;
    flex-shrink: 0;
  }

  span {
    opacity: 0;
  }

  .list:hover span {
    opacity: 1;
  }

  form {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
