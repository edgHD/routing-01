<template>
  <!-- Display team members if the team exists -->
  <section v-if="teamName !== 'Team Not Found'">
    <h2>{{ teamName }}</h2>
    <ul>
      <user-item 
        v-for="member in members" 
        :key="member.id" 
        :name="member.fullName" 
        :role="member.role">
      </user-item>
      <router-link to="/teams">Back to Teams</router-link>
    </ul>
  </section>
  
  <!-- Display a not found message if the team does not exist -->
  <section v-else>
    <h2>Team Not Found</h2>
    <router-link to="/teams">Back to Teams</router-link>
  </section>
</template>

<script>
import UserItem from '../users/UserItem.vue';

export default {
  inject: ['teams', 'users'], // Inject teams and users data from a parent component
  props: ['teamID'], // Accept teamID as a prop
  components: {
    UserItem, // Register the UserItem component
  },
  data() {
    return {
      teamName: '', // Store the team name
      members: [], // Store the team members
    };
  },
  created() {
    // Load team members when the component is created
    this.loadTeamMembers(this.teamID);
    console.log(this.$route.query.sort); // For debugging purposes
  },
  beforeRouteUpdate(to, from, next) {
    // Handle route updates when switching teams
    console.log('Route is switching teams');
    next();
  },
  methods: {
    loadTeamMembers(teamID) {
      // Find the selected team and its members
      const selectedTeam = this.teams.find(team => team.id === teamID);
      const members = selectedTeam ? selectedTeam.members : [];
      const selectedMembers = [];
      for (const member of members) {
        const user = this.users.find(user => user.id === member);
        if (user) {
          selectedMembers.push(user);
        }
      }
      this.members = selectedMembers;
      this.teamName = selectedTeam ? selectedTeam.name : 'Team Not Found';
    },
  },
  watch: {
    teamID(newID) {
      // Reload team members when the teamID changes
      this.loadTeamMembers(newID);
    },
  },
};
</script>

<style scoped>
section {
  margin: 2rem auto;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  border-radius: 12px;
}

h2 {
  margin: 0.5rem 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>