<template>
  <div>
    <router-link to="/trilha/645e283d9188788071e320f1">
      <button type="submit">Voltar</button>
    </router-link>
    <h2>Vincular Turma</h2>

    <form class="card" @submit.prevent="vincularTrilhaTurma($event)">

      <label for="turma">Trilha Selecionada: {{ trailName }}</label>

      <label for="turma">Turma:</label>
      <select id="turma" name="turma" v-model="turma">
        <option value="">Selecione a turma</option>
        <option v-for="turma in turmas" :key="turma.id" :value="turma.className">{{ turma.className }}</option>
      </select>

        <button class="delete-btn" type="submit">Vincular</button>


    </form>
  </div>
</template>

<script>

import {useAuthStore} from "@/store/auth";
import server from "@/services/config";

export default {
  name: "VincularTurma",
  data() {
    return {
      turmas: '',
      trailName: ''
    }
  },
  methods: {
    async getTurma() {
      const auth = useAuthStore();
      const dataTrilha = await server.get(
          '/trial/' + this.$route.params.id,
          { headers: {'Authorization': `Bearer ${auth.token}`}}
      );
      this.trilha = dataTrilha.data;
      this.trailName = this.trilha.trailName
      const dataTurma = await server.get(
          '/turma',
          { headers: {'Authorization': `Bearer ${auth.token}`}}
      );
      this.turmas = dataTurma.data;
    },
    async vincularTrilhaTurma(e) {
      e.preventDefault();
      console.log(this.trailName);
      console.log(this.turma);
    },
  },
  mounted () {
    this.getTurma();
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