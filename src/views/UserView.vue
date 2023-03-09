<template>
  <h2>Página do Usuário</h2>

  <div v-if="office === 'professor'">
    <p>Sou um Professor</p>

    <div style="border: 1px solid black;">
      Panel para pesquisar do Professor
    </div>

    <div style="display: flex;">
      <div style="border: 1px solid black; display: flex; flex-direction: column;">
        <h2>Individual</h2>

        <PieChart/>
      </div>
      <div style="border: 1px solid black; display: flex; flex-direction: column;">
        <h2>Turma</h2>

        <PieChart/>
      </div>
    </div>
  </div>

  <div v-else>
    <p>Sou um Aluno</p>
  </div>

</template>

<script>
import server from "@/services/config";
import PieChart from "@/components/PieChart.vue";

export default {
  name: "UserView",
  components: {PieChart},
  data() {
    return {
      nome: null,
      email: null,
      office: 'professor',
    }
  },

}
</script>

<style scoped>

</style>