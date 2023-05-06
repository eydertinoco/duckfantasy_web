<template>
  <div>
    <h2>{{ className }}</h2>

    <form class="card">
      <h3>Alunos Vinculados</h3>
      <table>
        <tr>
          <th>Nome</th>
        </tr>
        <tr>
          <td>Alfreds Futterkiste</td>
        </tr>
      </table>

      <div style="display: flex; width: 100%;">
        <div style="width: 100%;">
          <h3>Trilhas Vinculadas</h3>

          <table>
            <tr>
              <th>Nome</th>
              <th style="width: 75px;">Visualizar</th>
            </tr>
            <tr>
              <td>Segunda Guerra Mundial</td>
              <td>
                <router-link to="/trilha">
                  <button type="submit">Visualizar</button>
                </router-link>
              </td>
            </tr>
          </table>
        </div>
        <div style="width: 100%;">
          <h3>Analíse da Turma</h3>
          <div style="border: 1px solid black; display: flex; flex-direction: column;">

            <PieChart/>

          </div>
        </div>
      </div>

    </form>
  </div>
</template>

<script>
import PieChart from "@/components/PieChart.vue";
import UserInfo from "@/components/UserInfo.vue";
import server from "@/services/config";
import {useAuthStore} from "@/store/auth";

export default {
  name: "TrilhaView",
  components: {PieChart},
  data() {
    return {
      className: '',
      createdDate: '',
      completionDate: ''
    }
  },
  props: {

  },
  methods: {
    async getTurma() {
      const auth = useAuthStore();
      const data = await server.get(
          '/turma/6455a2046915406c4bec464a',
          { headers: {'Authorization': `Bearer ${auth.token}`}}
      );
      this.turma = data.data;
      this.className = this.turma.className;
      this.createdDate = this.turma.createdDate
      this.completionDate = this.turma.completionDate
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