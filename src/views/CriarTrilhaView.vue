<template>
  <div>
    <h2>Criar nova Trilha</h2>

    <form class="card">
      <div class="card__field">
        <label for="nomeTrilha">Nome Trilha:</label>
        <input id="nomeTrilha" type="text" v-model="nomeTrilha"/>
      </div>

      <div class="card__field">
        <label for="descricaoTrilha">Descrição da trilha:</label>
        <textarea id="descricaoTrilha" v-model="descricaoTrilha"/>
      </div>

      <button type="submit">Criar Turma</button>

    </form>
  </div>
</template>

<script>
export default {
  name: "CriarTrilhaView",
  data() {
    return {
      nomeTrilha: '',
      descricaoTrilha: ''
    }
  },
}
</script>