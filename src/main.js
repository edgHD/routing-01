// Import necessary modules from Vue and Vue Router
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

// Import application components
import App from "./App.vue";
import TeamsList from "./pages/TeamsList.vue";
import UsersList from "./pages/UsersList.vue";
import TeamMembers from "./components/teams/TeamMembers.vue";
import NotFound from "./pages/NotFound.vue";
import TeamsFooter from "./components/teams/TeamsFooter.vue";
import UsersFooter from "./components/users/UsersFooter.vue";

// Create a router instance with routes and configurations
const router = createRouter({
  history: createWebHistory(), // Use HTML5 history mode for navigation
  routes: [
    { path: "/", redirect: "/teams" }, // Redirect root path to /teams
    {
      name: "teams",
      path: "/teams",
      meta: { needsAuth: true }, // Meta field to indicate authentication requirement
      components: { default: TeamsList, footer: TeamsFooter }, // Define main and footer components
      children: [
        {
          name: "team-members",
          path: ":teamID", // Dynamic segment for team ID
          component: TeamMembers,
          props: true, // Pass route params as props to the component
        },
      ],
    },
    {
      path: "/users",
      components: {
        default: UsersList,
        footer: UsersFooter,
      },
      beforeEnter(to, from, next) {
        // Route-specific navigation guard
        console.log("users beforeEnter");
        console.log(to, from);
        next(); // Allow navigation
      },
    },
    { path: "/:notFound(.*)", component: NotFound }, // Catch-all route for 404 Not Found
  ],
  linkActiveClass: "vue-active", // Custom class for active links
  linkExactActiveClass: "vue-exact-active", // Custom class for exact active links

  scrollBehavior(_, _2, savedPosition) {
    // Handle scroll behavior during navigation
    if (savedPosition) {
      return savedPosition; // Restore saved scroll position
    } else {
      return { left: 0, top: 0 }; // Scroll to top-left by default
    }
  },
});

// Global navigation guard executed before every route change
router.beforeEach((to, from, next) => {
  console.log("Global beforeEach");
  console.log(to, from);
  if (to.meta.needsAuth) {
    // Check if the route requires authentication
    console.log("Needs auth");
    next(); // Allow navigation
  } else {
    next(); // Allow navigation
  }
  // if (to.name === "team-members") {
  //   next();
  // } else {
  //   next({name: "team-members", params: { teamID: "t2" }});
  // }
  next(); // Ensure navigation proceeds
});

// Global navigation guard executed after every route change
router.afterEach((to, from) => {
  console.log("Global afterEach");
  console.log(to, from);
});

// Create the Vue application instance and mount it
const app = createApp(App);
app.use(router); // Register the router with the app
app.mount("#app"); // Mount the app to the DOM element with ID 'app'
