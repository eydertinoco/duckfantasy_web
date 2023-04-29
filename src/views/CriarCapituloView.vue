<template>
  <div>
    <h2>Adicionar novo capítulo</h2>

    <form class="card">
      <div class="card__field">
        <label for="nomeCapitulo">Nome do Capítulo:</label>
        <input id="nomeCapitulo" type="text" v-model="nomeCapitulo"/>
      </div>

      <div class="card__field">
        <label for="conteudoCapitulo">Conteúdo do Capítulo:</label>
        <QuillEditor id="conteudoCapitulo" v-model="conteudoCapitulo" theme="snow" />
      </div>

      <button type="submit">Adicionar Conteúdo</button>

    </form>
  </div>
</template>

<script>
export default {
  name: "CriarTurmaView",
  data() {
    return {
      nomeCapitulo: '',
      conteudoCapitulo: ''
    }
  },
}
</script>

<style lang="scss" scoped>
.ql-toolbar {
  margin-top: 6px;
}
.ql-container {
  margin-bottom: 6px;
}

button {
  width: 100%;
  max-width: 300px;
  height: 100%;
  min-height: 30px;
  margin: 10px 0 25px;
}
</style>