import Modal from "./Modal.vue";

export default {
  components: {
    Modal
  },
  props: {
    isOpen: false
  },
  methods: {
    emitOpenState(isOpen) {
      this.$emit("update:isOpen", isOpen);
    }
  }
}
