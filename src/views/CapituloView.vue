<template>
  <div>
    <form class="card">
      <div style="background-color: gray; width: 100%;">
        <h4>Area do Professor</h4>

        <p>Adicionar Atividade</p>

        <p>Graficos de Analise do Capítulo</p>
      </div>

      <h2>nomeCapitulo</h2>

      <div class="card__field">
        <p>conteudoCapitulo</p>
      </div>

    </form>
  </div>
</template>

<script>
export default {
  name: "CapituloView",
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