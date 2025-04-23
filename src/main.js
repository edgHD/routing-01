// Import necessary module from Vue Router
import { createApp } from "vue";

// Import application components
import App from "./App.vue";
import router from "./router"; 

// Create the Vue application instance and mount it
const app = createApp(App);
app.use(router); // Register the router with the app
app.mount("#app"); // Mount the app to the DOM element with ID 'app'