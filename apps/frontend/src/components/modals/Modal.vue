<template>
  <div class="modal" :class="{ 'is-active': isOpen }">
    <div class="modal-background" @click="close()"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          <slot name="title"></slot>
        </p>
        <button class="delete" aria-label="close" @click="close"></button>
      </header>
      <section class="modal-card-body">
        <slot></slot>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="ok()" :disabled="isOkButtonDisabled">
          <slot name="primary-button">Ok</slot>
        </button>
        <button class="button" @click="cancel()">
          <slot name="secondary-button">Annuler</slot>
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: Boolean,
    isOkButtonDisabled: Boolean
  },
  methods: {
    ok() {
      this.$emit("ok");
      this.close();
    },
    cancel() {
      this.close();
    },
    close() {
      this.$emit("update:isOpen", false);
    }
  }
}
</script>
