<template>
    <section>
        <h2>Page Not Found</h2>
        <router-link to="/teams">Back to Teams</router-link>
    </section>
</template>

<style scoped>
section {
    text-align: center;
    margin-top: 2rem;
}
section h2 {
    font-size: 2rem;
    color: #11005c;
}
section a {
    text-decoration: none;
    color: white;
    display: inline-block;
    padding: 0.5rem 1.5rem;
    background-color: #11005c;
}
section a:hover,
section a:active {
    background-color: #220a8d;
}
</style>