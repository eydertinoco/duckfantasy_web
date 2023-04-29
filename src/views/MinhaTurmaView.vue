<template>
  <div>
    <h2>Minhas Turmas</h2>


    <form class="card">
      <router-link to="/novaturma">
        <button type="submit">Nova Turma</button>
      </router-link>

      <h3>Turma Ativa</h3>
      <table>
        <tr>
          <th>Nome</th>
          <th>Data Inicio</th>
          <th>Data Encerramento</th>
          <th style="width: 75px;">Visualizar</th>
        </tr>
        <tr>
          <td>IFAL GESI 2023.1</td>
          <td>01/02/2023</td>
          <td>13/06/2023</td>
          <td>
            <router-link to="/turma">
              <button type="submit">Visualizar</button>
            </router-link>
          </td>
        </tr>
      </table>

      <h3>Turma Desativada</h3>
      <table>
        <tr>
          <th>Nome</th>
          <th>Data Inicio</th>
          <th>Data Encerramento</th>
          <th style="width: 75px;">Visualizar</th>
        </tr>
        <tr>
          <td>IFAL GESI 2022.2</td>
          <td>19/06/2022</td>
          <td>29/12/2022</td>
          <td>
            <router-link to="/turma">
              <button type="submit">Visualizar</button>
            </router-link>
          </td>
        </tr>
      </table>

    </form>
  </div>
</template>

<script>
export default {
  name: "MinhaTurmaView",
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