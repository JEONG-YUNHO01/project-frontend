<template>
  <v-overlay :value="isLoading">
    <v-progress-circular
      indeterminate
      size="64"
    ></v-progress-circular>
  </v-overlay>
</template>

<script>
  export default {
    props: {
      isLoading: Boolean,
    }
  }
</script>
