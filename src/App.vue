<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="white"
      flat
    >
      <v-tabs
        centered
        class="ml-n9"
        color="grey darken-1"
      >
        <v-tab
          v-for="link in links"
          :key="link.name"
          :to="link.to"
        >
          {{ link.name }}
        </v-tab>
      </v-tabs>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('getIp')
  },
  data: () => ({
    links: [
      { name: 'Main', to: '/main'},
      { name: 'Search', to: '/search'},
      { name: 'Contact', to: '/contact'},
    ],
  }),
};
</script>
