<template>
  <button @click="confirmAction">Confirm</button>
  <button @click="saveChanges">Save Changes</button>
  <ul>
    <user-item v-for="user in users" :key="user.id" :name="user.fullName" :role="user.role"></user-item>
  </ul>
</template>

<script>
import UserItem from './UserItem.vue';

export default {
  components: {
    UserItem,
  },
  data() {
    return {
      changesSaved: false,
    };
  },
  inject: ['users'],
  methods: {
    confirmAction() {
      alert('Confirmed!');
      this.$router.push('/teams');
    },
    saveChanges() {
      this.changesSaved = true;
      alert('Changes saved!');
    },
  },
  beforeRouteLeave(to, from, next) {
    next(this.changesSaved || window.confirm('Are you sure you want to leave?'));
  },
  unmounted() {
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