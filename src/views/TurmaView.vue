<template>
  <div>
    <h2>{{ className }}</h2>

    <router-link :to="{ name: 'minhaturma' }">
      <button type="submit">Voltar</button>
    </router-link>

    <form class="card">

      <div>
        <h3>Professor: {{ teacherName }}</h3>
      </div>

      <div>
        <h3>Alunos Vinculados</h3>
        <table>
          <tr>
            <th>Nome</th>
          </tr>
          <tr>
            <td>Alfreds Futterkiste</td>
          </tr>
        </table>
      </div>

      <div style="width: 100%;">
        <h3>Trilhas Vinculadas</h3>

        <router-link :to="getURI(this.$route.params.id)" v-if="office === 'Professor'">
          <button type="submit">Vincular turma com nova trilha</button>
        </router-link>

        <ListaTrilhaVinculadas/>
      </div>

      <div style="width: 100%;">
        <h3>Analíse da Turma</h3>
        <div style="border: 1px solid black; display: flex; flex-direction: column;">

          <PieChart/>

        </div>
      </div>

    </form>
  </div>
</template>

<script>
import PieChart from "@/components/PieChart.vue";
import ListaTrilhaVinculadas from "@/components/ListaTrilhaVinculadas.vue";
import UserInfo from "@/components/UserInfo.vue";
import server from "@/services/config";
import {useAuthStore} from "@/store/auth";

export default {
  name: "TrilhaView",
  components: {PieChart, ListaTrilhaVinculadas},
  data() {
    return {
      className: '',
      createdDate: '',
      completionDate: '',
      teacherId: '',
      teacherName: '',
      office: '',
    }
  },
  methods: {
    getURI(id) {
      return `/turma/${id}/vincularturma`;
    },
    async getTurma() {
      const auth = useAuthStore();
      const dataUser = await server.get(
          '/auth/me',
          { headers: {'Authorization': `Bearer ${auth.token}`}}
      );
      this.office = dataUser.data.office;
      const dataTurma = await server.get(
          '/turma/' + this.$route.params.id,
          { headers: {'Authorization': `Bearer ${auth.token}`}}
      );
      this.turma = dataTurma.data;
      this.className = this.turma.className;
      this.createdDate = this.turma.createdDate;
      this.completionDate = this.turma.completionDate;
      this.teacherId = this.turma.teacherId;
      const dataTeacher = await server.get(
          '/user/' + this.teacherId,
          { headers: {'Authorization': `Bearer ${auth.token}`}}
      );
      const teacher = dataTeacher.data;
      this.teacherName = teacher.name;
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