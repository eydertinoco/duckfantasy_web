<template>
  <div>
    <h2>Minhas Trilhas</h2>

    <form class="card">

      <router-link :to="getURI()">
        <button type="submit">Voltar</button>
      </router-link>

      <router-link to="/novatrilha">
        <button type="submit">Nova Trilha</button>
      </router-link>

      <h3>Minhas Trilhas</h3>
      <ListaTrilha/>

    </form>
  </div>
</template>

<script>
import ListaTrilha from "@/components/ListaTrilha.vue";
import {useAuthStore} from "@/store/auth";
import server from "@/services/config";

export default {
  name: "MinhaTrilhaView",
  components: {ListaTrilha},
  data() {
    return {
      nomeTurma: '',
      dataFim: '',
      user: '123',
    }
  },
  methods: {
    getURI() {
      return `/user`;
    },
  }
}
</script>

<style lang="scss" scoped>
button {
  max-width: 300px;
  width: 100%;
  margin: 0 0 15px;
  height: 30px;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>