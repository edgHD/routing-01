<template>
  <!-- Buttons for user actions -->
  <button @click="confirmAction">Confirm</button>
  <button @click="saveChanges">Save Changes</button>
  
  <!-- List of users -->
  <ul>
    <user-item 
      v-for="user in users" 
      :key="user.id" 
      :name="user.fullName" 
      :role="user.role">
    </user-item>
  </ul>
</template>

<script>
import UserItem from '../components/users/UserItem.vue';

export default {
  components: {
    UserItem, // Register the UserItem component
  },
  data() {
    return {
      changesSaved: false, // Track if changes are saved
    };
  },
  inject: ['users'], // Inject users data from a parent component
  methods: {
    confirmAction() {
      // Confirm action and navigate to the teams page
      alert('Confirmed!');
      this.$router.push('/teams');
    },
    saveChanges() {
      // Save changes and notify the user
      this.changesSaved = true;
      alert('Changes saved!');
    },
  },
  beforeRouteLeave(to, from, next) {
    // Prompt the user before leaving the route if changes are unsaved
    next(this.changesSaved || window.confirm('Are you sure you want to leave?'));
  },
  unmounted() {
    // Log when the component is unmounted
    console.log('Users List is unmounted');
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>