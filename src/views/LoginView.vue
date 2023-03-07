<template>
  <div class="loginPage">
    <div class="loginPage__screen loginPage__background"/>

    <div class="loginPage__screen">
      <h2>Login</h2>

      <form class="card" @submit.prevent="login($event)">
        <input id="emailLogin" type="email" placeholder="Email" v-model="email"/>
        <input id="passwordLogin" type="password" placeholder="Password" v-model="password">
        <button type="submit">Entrar</button>
      </form>
    </div>
  </div>
</template>

<script>
import server from '@/services/config.ts';
import {reactive} from "vue";
import {useAuthStore} from '@/store/auth.ts';

export default {
  name: "LoginView",
  data() {
    return {
      email: 'eydertinoco@outlook.com',
      password: '123'
    }
  },
  methods: {
    async login(e) {
      e.preventDefault();
      console.log(e);
      const user = {
        email: this.email,
        password: this.password
      }
      const auth = useAuthStore();
      try {
        const data = await server.post('/auth/login', user);
        console.log(data);
        console.log(data.data.access_token);
        auth.setToken(data.data.access_token);
      } catch (error) {
        console.log(error?.response?.data);
      }
    }
  }
}
</script>

<style scoped lang="scss">
.loginPage {
  display: flex;
  align-items: center;
  justify-content: center;
  &__screen {
    height: calc(100vh - 79px);
    width: 50vw;
  }
  &__background {
    background-image: url("https://wallpaperaccess.com/full/4269598.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  & .card {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border: 1px solid;
    box-shadow: 0px 0px 15px 0px black;
    border-radius: 5px;
    width: 300px;
    margin: 20px auto;
    padding: 30px 20px;
    & input {
      margin-bottom: 10px;
      width: 100%;
      font-size: 1.5rem;
    }
    & button {
      width: 100%;
      padding: 5px;
      font-size: 1.2rem;
      background: #46b0ed;
      color: white;
      font-weight: 600;
      border: none;
      border-radius: 5px;
    }
  }
}
</style>