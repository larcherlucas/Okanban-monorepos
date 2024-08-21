<template>
  <main class="kanban">
    <Draggable v-model="lists" class="draggable" item-key="id" @change="saveAllListsCurrentPositions()">
      <template #item="{element: list}">
        <List
          :list="list"
          @deleted="removeListFromKanban(list.id)"
          @cardCreated="refreshLists()"
          @cardUpdated="refreshLists()"
        />
      </template>
    </Draggable>

    <div class="create-list-button" @click="openCreateListModal()">+</div>

    <CreateListModal v-model:isOpen="isCreateListModalOpen" @created="refreshLists()"/>
  </main>
</template>

<script>
import Draggable from "vuedraggable";
import { fetchAllLists, updateList } from "@/service/database";
import { CreateListModal } from "./modals";
import List from "./List.vue";

export default {
  components: {
    CreateListModal,
    Draggable,
    List
  },
  data() {
    return {
      lists: [],
      isCreateListModalOpen: false
    }
  },
  async created() {
    this.refreshLists();
  },
  methods: {
    openCreateListModal() {
      this.isCreateListModalOpen = true;
    },
    async refreshLists() {
      this.lists = await fetchAllLists();
    },
    removeListFromKanban(listId) {
      const indexOfList = this.lists.findIndex(list => list.id === listId);
      this.lists.splice(indexOfList, 1);
    },
    async saveAllListsCurrentPositions() {
      const promises = this.lists.map((list, index) => updateList(list.id, { position: index + 1 }));
      await Promise.all(promises);
    }
  }
}
</script>

<style scoped>
  .kanban {
    display: flex;
    flex-wrap: wrap;
    padding: 0 20px;
  }

  .draggable {
    display: flex;
  }

  .create-list-button {
    cursor: pointer;
    font-size: 80px;
    width: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    border: 1px solid lightgrey;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 3px rgb(10 10 10 / 10%), 0 0 0 1px rgb(10 10 10 / 10%);
  }
</style>
