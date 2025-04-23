<template>
  <!-- Nested router view for child routes -->
  <router-view></router-view>
  
  <!-- List of teams -->
  <ul>
    <teams-item
      v-for="team in teams"
      :key="team.id"
      :id="team.id"
      :name="team.name"
      :member-count="team.members.length">
    </teams-item>
  </ul>
</template>

<script>
import TeamsItem from '../components/teams/TeamsItem.vue';

export default {
  components: {
    TeamsItem, // Register the TeamsItem component
  },
  inject: ['teams'], // Inject teams data from a parent component
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 40rem;
  padding: 0;
}
</style>