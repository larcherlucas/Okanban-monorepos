<template>
  <div class="tag" :style="borderColor">
    <div>
      {{tag.name}}
    </div>
    <span @click="$emit('deleted', tag.id)"><i class="fas fa-trash"></i></span>
  </div>
</template>

<script>
  export default {
    props: {
      tag: Object
    },
    computed: {
      borderColor() {
        return `border-color: ${this.tag.color}`;
      }
    }
  }
</script>

<style scoped>
  .tag {
    width: fit-content;
    padding: 10px 0 10px 10px;
    margin: 5px 5px 5px 0;
    border: 1px solid black;
  }

  .tag:hover .fa-trash {
    opacity: 0.5;
  }

  .fa-trash {
    opacity: 0;
  }
</style>
