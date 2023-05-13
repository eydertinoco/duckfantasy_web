<template>
  <div>
    <router-link to="/trilha/645e283d9188788071e320f1">
      <button type="submit">Voltar</button>
    </router-link>
    <h2>Vincular Turma</h2>

    <form class="card" @submit.prevent="vincularTrilhaTurma($event)">

      <label for="turma">Turma Selecionada: {{ className }}</label>

      <label for="trilha">Trilha:</label>
      <select id="trilha" name="trilha" v-model="trilha">
        <option value="">Selecione a trilha</option>
        <option v-for="trilha in trilhas" :key="trilha.id" :value="trilha.id">{{ trilha.trailName }}</option>
      </select>

        <button class="delete-btn" type="submit">Vincular</button>


    </form>
  </div>
</template>

<script>

import {useAuthStore} from "@/store/auth";
import server from "@/services/config";
import router from "@/router";

export default {
  name: "VincularTurma",
  data() {
    return {
      turmaId: '',
      className: '',
      trilhas: '',
      listaTrilha: []
    }
  },
  methods: {
    async getTurma() {
      const auth = useAuthStore();
      const dataTurma = await server.get(
          '/turma/' + this.$route.params.id,
          { headers: {'Authorization': `Bearer ${auth.token}`}}
      );
      this.turma = dataTurma.data;
      this.turmaId = this.turma.id;
      this.listaTrilha = this.turma.listaTrilha;
      this.className = this.turma.className
      const dataTrilha = await server.get(
          '/trial',
          { headers: {'Authorization': `Bearer ${auth.token}`}}
      );
      this.trilhas = dataTrilha.data;
    },
    async vincularTrilhaTurma(e) {
      e.preventDefault();
      console.log(this.turmaId);
      console.log(this.trilha);

      console.log(this.listaTrilha);
      this.listaTrilha.push(this.trilha);
      console.log(this.listaTrilha);

      try {
        const auth = useAuthStore();
        const data = await server.patch(
            '/turma/' + this.turmaId,
            listaTrilha,
            { headers: {'Authorization': `Bearer ${auth.token}`}}
        );
        console.log(data);
        router.push({ path: '/turma/' + this.turmaId});
      } catch (error) {
        console.log(error?.response?.data);
      }
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