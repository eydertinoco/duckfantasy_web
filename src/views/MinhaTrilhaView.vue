<template>
  <div>
    <h2>Minhas Trilhas</h2>

    <router-link :to="{ name: 'user' }">
      <button type="submit">Voltar</button>
    </router-link>

    <form class="card">
      <router-link to="/novatrilha">
        <button type="submit">Nova Trilha</button>
      </router-link>

      <h3>Minhas Trilhas</h3>
      <ListaTrilha/>

    </form>
  </div>
</template>

<script>
import ListaTrilha from "@/components/ListaTrilha.vue";

export default {
  name: "MinhaTrilhaView",
  components: {ListaTrilha},
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