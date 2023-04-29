<template>
  <div>
    <h2>Criar nova turma</h2>

    <form class="card">
      <div class="card__field">
        <label for="nomeTurma">Nome Turma:</label>
        <input id="nomeTurma" type="text" v-model="nomeTurma"/>
      </div>

      <div class="card__field">
        <label for="dataIni">Data Inicio da turma:</label>
        <input id="dataIni" type="date" v-model="dataIni">
      </div>

      <div class="card__field">
        <label for="dataFim">Data finalização da turma:</label>
        <input id="dataFim" type="date" v-model="dataFim">
      </div>

      <button type="submit">Criar Turma</button>

    </form>
  </div>
</template>

<script>
export default {
  name: "CriarTurmaView",
  data() {
    return {
      nomeTurma: '',
      dataIni: '',
      dataFim: ''
    }
  },
}
</script>