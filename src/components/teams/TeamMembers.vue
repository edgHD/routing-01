<template>
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
  <section v-else>
    <h2>Team Not Found</h2>
    <router-link to="/teams">Back to Teams</router-link>
  </section>
</template>

<script>
import UserItem from '../users/UserItem.vue';

export default {
  inject: ['teams', 'users'],
  props: ['teamID'],
  components: {
    UserItem
  },
  data() {
    return {
      teamName: '',
      members: []
    };
  },
  created() {
    this.loadTeamMembers(this.teamID);
    console.log(this.$route.query.sort); // For debugging purposes
  },
  methods: {
    loadTeamMembers(teamID) {
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
    }
  },
  watch: {
    teamID(newID) {
      this.loadTeamMembers(newID);
    }
  }
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