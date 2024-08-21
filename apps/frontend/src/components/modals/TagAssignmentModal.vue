<template>
  <Modal
    :isOpen="isOpen"
    @update:isOpen="emitOpenState($event)"
    @ok="updateCardTags()"
  >
    <template #title>Gestion des tags</template>

    <div>
      <label>Ajouter / Retirer un tag de la carte</label>
      <div class="tags">
        <div
          v-for="tag of allTags"
          :key="tag.id"
          class="tag"
          :class="{ 'selected': isTagSelected(tag.id) }"
          @click="toggleTagSelection(tag.id)"
        >
          {{tag.name}}
        </div>
      </div>

      <label>Créer un nouveau tag</label>
      <form @submit.prevent="createAndSelectNewTag()">
        <input type="text" v-model="newTagName" />
        <button type="submit"><i class="fas fa-check"></i></button>
      </form>
    </div>

  </Modal>
</template>

<script>
  import modalMixin from "./modalMixin";
  import { fetchCard, fetchAllTags, createTag, addTagsToCard, removeTagsFromCard } from "@/service/database";

  export default {
    mixins: [modalMixin],
    props: {
      card: Object,
    },
    data() {
      return {
        allTags: [],
        selectedTagIds: [],
        newTagName: ""
      }
    },
    async created() {
      this.allTags = await fetchAllTags();
    },
    watch: {
      "card.tags": {
        handler() {
          this.selectedTagIds = this.card.tags.map(tag => tag.id);
        },
        immediate: true
      }
    },
    methods: {
      isTagSelected(tagId) {
        return this.selectedTagIds.includes(tagId);
      },
      toggleTagSelection(tagId) {
        if (this.selectedTagIds.includes(tagId)) {
          this.selectedTagIds = this.selectedTagIds.filter(selectedTagId => selectedTagId !== tagId);
        } else {
          this.selectedTagIds.push(tagId);
        }
      },
      async updateCardTags() {
        const previousTagIds = this.card.tags.map(tag => tag.id);
        const selectedTagIds = this.selectedTagIds;

        const newlySelectedTagIds = selectedTagIds.filter(tagWasNotInitiallySelected);
        const removedTagIds = previousTagIds.filter(tagSelectionHasBeenRemoved);

        function tagWasNotInitiallySelected(tagId) {
          return ! previousTagIds.includes(tagId);
        }

        function tagSelectionHasBeenRemoved(tagId) {
          return ! selectedTagIds.includes(tagId);
        }

        await addTagsToCard(this.card.id, newlySelectedTagIds);
        await removeTagsFromCard(this.card.id, removedTagIds);
        const updatedCard = await fetchCard(this.card.id);

        this.$emit("updated", updatedCard);
      },
      async createAndSelectNewTag() {
        const createdTag = await createTag({ name: this.newTagName });
        this.allTags.push(createdTag);
        this.selectedTagIds.push(createdTag.id);
        this.newTagName = "";
      }
    }
  }
</script>

<style scoped>
  label {
    font-weight: 800;
    margin: 10px 0;
  }

  .tag {
    margin-top: 10px;
    cursor: pointer;
  }

  .tag.selected {
    background-color: lightblue;
    color: white;
  }

  form {
    display: flex;
    margin-top: 10px;
  }

  form > input {
    width: 200px;
    border-radius: 5px;
    margin-right: 10px;
  }
</style>
