<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/login">Login</router-link> |
    <router-link to="/user">Minha Página</router-link>
  </nav>
  <router-view/>
</template>

<style lang="scss">
@import 'assets/scss/app';

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0;
}

nav {
  padding: 30px;
  background: #bbe6ff;
  border-bottom: 1px solid;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.card {
  max-width: 1000px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
  &__field {
    width: 100%;
    text-align: start;
    & label {
      font-size: 1rem;
      font-weight: 600;
    }
    & input {
      border: 1px solid $neutrals600;
      border-radius: 5px;
      padding: 2px;
      margin: 6px 0;
      width: 100%;
    }
    & textarea {
      border: 1px solid $neutrals600;
      border-radius: 5px;
      margin: 6px 0;
      min-height: 60px;
      width: 100%;
    }
  }
}
</style>
