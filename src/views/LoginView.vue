<template>
  <div class="loginPage">
    <div class="loginPage__screen loginPage__background"/>

    <div class="loginPage__screen">
      <h2>Login</h2>

      <form class="card" @submit.prevent="login($event)">
        <div class="card__field">
          <label for="emailLogin">E-mail:</label>
          <input id="emailLogin" type="email" placeholder="Email" v-model="email"/>
        </div>

        <div class="card__field">
          <label for="passwordLogin">Senha:</label>
          <input id="passwordLogin" type="password" placeholder="Password" v-model="password">
        </div>

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
      userId: '',
      email: '',
      password: ''
    }
  },
  methods: {
    async login(e) {
      e.preventDefault();
      const user = {
        email: this.email,
        password: this.password
      }
      const auth = useAuthStore();
      try {
        const data = await server.post('/auth/login', user);
        console.log(data)
        auth.setToken(data.data.access_token);

        const getUserInfo = await server.get(
            '/user',
            { headers: {'Authorization': `Bearer ${auth.token}`}}
        );
        const allUser = getUserInfo.data;
        const quntUser = allUser.length;
        for (let i=0; i < quntUser; i++) {
          if (user.email === allUser[i].email) {
            this.userId = allUser[i].id;
          }
        }

        window.location = `/user`
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
    background-image: url("https://media.istockphoto.com/id/1394860063/pt/vetorial/back-to-school-concept-with-young-smiling-woman-teacher-and-group-of-kids-stand-in-row-in.jpg?s=2048x2048&w=is&k=20&c=P1sb63iVyVHcmWfQYmxAoJvR03LpOwA_-6Qj9rFddY8=");
    background-position: bottom;
    background-repeat: no-repeat;
    background-size: contain;
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
    &__field {
      display: flex;
      flex-direction: column;
      width: 100%;
      &:first-child {
        margin-bottom: 1.2rem;
      }
    }
    & label {
      color: #00000050;
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 5px;
    }
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