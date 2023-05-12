<template>
  <div>
    <h2>Criar nova turma</h2>

    <form class="card" @submit.prevent="criarTurma($event)">
      <div class="card__field">
        <label for="nomeTurma">Nome Turma:</label>
        <input id="nomeTurma" type="text" v-model="className"/>
      </div>

      <div class="card__field">
        <label for="dataIni">Data Inicio da turma:</label>
        <input id="dataIni" type="date" v-model="createdDate">
      </div>

      <div class="card__field">
        <label for="dataFim">Data finalização da turma:</label>
        <input id="dataFim" type="date" v-model="completionDate">
      </div>

      <button type="submit">Criar Turma</button>

      <router-link to="/minhaturma">
        <button type="submit">Voltar</button>
      </router-link>

    </form>
  </div>
</template>

<script>
import {useAuthStore} from "@/store/auth";
import server from "@/services/config";
import {isJWT} from "class-validator";
import router from "@/router";

export default {
  name: "CriarTurmaView",
  data() {
    return {
      className: 'Nova Turma no Front 1',
      createdDate: '2023-05-03',
      completionDate: '2023-05-08'
    }
  },
  methods: {
    async criarTurma(e) {
      e.preventDefault();
      const novaTurma = {
        className: this.className,
        createdDate: this.createdDate,
        completionDate: this.completionDate
      }
      console.log(novaTurma);

      const auth = useAuthStore();

      try {
        const data = await server.post(
            '/turma',
            novaTurma,
            { headers: {'Authorization': `Bearer ${auth.token}`}}
        );
        console.log(data);
        router.push({ path: '/minhaturma'});
      } catch (error) {
        console.log(error?.response?.data);
      }

    }
  }
}
</script>