<template>
  <div>
    <h2>Minhas Turmas</h2>

    <router-link :to="getURI()">
      <button type="submit">Voltar</button>
    </router-link>

    <form class="card">
      <router-link to="/novaturma">
        <button type="submit">Nova Turma</button>
      </router-link>

      <h3>Minhas Turmas</h3>
      <ListaTurmas/>

    </form>
  </div>
</template>

<script>
import ListaTurmas from "@/components/ListaTurmas.vue";
import server from "@/services/config";
import {useAuthStore} from "@/store/auth";

export default {
  name: "MinhaTurmaView",
  components: {ListaTurmas},
  data() {
    return {
      nomeTurma: '',
      dataFim: ''
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