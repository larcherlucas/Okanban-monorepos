<template>
  <div class="card" :style="borderColor">
    <div class="head">
      <div>{{card.content}}</div>
      <div class="edit-container">
        <span @click="openEditCardModal()"><i class="fas fa-pen"></i></span>
        <span @click="openDeleteCardModal()"><i class="fas fa-trash-alt"></i></span>
      </div>
    </div>

    <div class="tags">
      <div>
        <Tag
          v-for="tag of card.tags"
          :key="tag.id"
          :tag="tag"
          class="tag"
          @deleted="removeTagFromCard($event)"
        />
      </div>
      <span @click="openTagAssignmentModal()" class="add-tag-button"><i class="fas fa-tag"></i></span>
    </div>

    <EditCardModal
      :card="card"
      v-model:isOpen="isEditCardModalOpen"
      @updated="$emit('updated')"
    />

    <DeleteCardModal
      :cardId="card.id"
      v-model:isOpen="isDeleteCardModalOpen"
      @deleted="$emit('deleted')"
    />

    <TagAssignmentModal
      v-model:isOpen="isTagAssignmentModalOpen"
      :card="card"
      @updated="$emit('updated')"
    />
  </div>
</template>

<script>
import { removeTagFromCard } from '@/service/database';
  import { DeleteCardModal, EditCardModal, TagAssignmentModal } from "./modals";
  import Tag from "./Tag.vue";

  export default {
    components: {
      DeleteCardModal,
      EditCardModal,
      Tag,
      TagAssignmentModal
    },
    props: {
      card: Object
    },
    data() {
      return {
        isDeleteCardModalOpen: false,
        isEditCardModalOpen: false,
        isTagAssignmentModalOpen: false
      }
    },
    computed: {
      borderColor() {
        return `border-color: ${this.card.color}`;
      }
    },
    methods: {
      openEditCardModal() {
        this.isEditCardModalOpen = true;
      },
      openDeleteCardModal() {
        this.isDeleteCardModalOpen = true;
      },
      openTagAssignmentModal() {
        this.isTagAssignmentModalOpen = true;
      },
      async removeTagFromCard(tagId) {
        await removeTagFromCard(this.card.id, tagId);
        this.card.tags = this.card.tags.filter(tag => tag.id !== tagId);
      }
    }
  }
</script>

<style scoped>
  .head {
    display: flex;
    justify-content: space-between;
  }
  .tags {
    display: flex;
    align-items: center;
    margin: 20px 0 0 0;
  }
  .card {
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid black;
  }

  .edit-container {
    padding-left: 10px;
    flex-shrink: 0;
  }

  span {
    opacity: 0;
  }

  .card:hover span {
    opacity: 1;
  }
</style>
