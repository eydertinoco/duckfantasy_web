<template>
  <div>
    <h2>Minhas Trilhas</h2>


    <form class="card">

      <button type="submit">Nova Trilha</button>

      <table>
        <tr>
          <th>Company</th>
          <th>Contact</th>
          <th style="width: 75px;">Visualizar</th>
        </tr>
        <tr>
          <td>Alfreds Futterkiste</td>
          <td>Maria Anders</td>
          <td>
            <button type="submit">Visualizar Trilha</button>
          </td>
        </tr>
      </table>

    </form>
  </div>
</template>

<script>
export default {
  name: "CriarTurmaView",
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