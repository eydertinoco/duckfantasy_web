<template>
  <div>
    <h2>Nome da Trilha</h2>

    <form class="card">
      <router-link to="/novoconteudo">
        <button type="submit">Criar Capítulo</button>
      </router-link>

      <h3>Lista de Capítulos</h3>
      <table>
        <tr>
          <th>Nome</th>
          <th style="width: 75px;">Visualizar</th>
        </tr>
        <tr>
          <td>Alfreds Futterkiste</td>
          <td>
            <router-link to="/conteudo">
              <button type="submit">Visualizar</button>
            </router-link>
          </td>
        </tr>
      </table>

      <div style="display: flex; width: 100%;">
        <div style="width: 100%;">
          <h3>Turmas Vinculadas</h3>

          <table>
            <tr>
              <th>Nome</th>
              <th>Ano</th>
              <th style="width: 75px;">Status</th>
            </tr>
            <tr>
              <td>Colégio Romano - 2ºAno Médio - Geografia</td>
              <td>2023</td>
              <td>Ativo</td>
            </tr>
            <tr>
              <td>Colégio Romano - 2ºAno Médio - Geografia</td>
              <td>2022</td>
              <td>Desativado</td>
            </tr>
          </table>
        </div>
        <div style="width: 100%;">
          <h3>Analíse da Trilha</h3>
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

export default {
  name: "TrilhaView",
  components: {PieChart},
  data() {
    return {
      nomeTurma: '',
      dataFim: ''
    }
  },
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