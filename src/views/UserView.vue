<template>
  <div>
    <h2>Página do Usuário</h2>

    <UserInfo :nome="nome" :email="email" :office="office"/>

    <div v-if="office === 'Professor'">
      <p>Sou um Professor</p>

      <div style="border: 1px solid black;">
        Panel para pesquisar do Professor
      </div>

      <div style="display: flex; ">
        <router-link to="/minhaturma">
          <button>Minhas Turmas</button>
        </router-link>
        <router-link to="/minhatrilha">
          <button>Minhas Trilhas</button>
        </router-link>
      </div>

      <div style="display: flex; flex-direction: column;">
        <h2>Análise Geral</h2>
        <div style="display: flex; width: 100%;">
          <div style="border: 1px solid black; display: flex;">

            <PieChart/>
          </div>
          <div style="border: 1px solid black; display: flex;">

            <PieChart/>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <p>Sou um Aluno</p>
    </div>

  </div>
</template>

<script>
import server from "@/services/config";
import PieChart from "@/components/PieChart.vue";
import UserInfo from "@/components/UserInfo.vue";
import {useCookies} from "vue3-cookies";

export default {
  name: "UserView",
  components: {PieChart, UserInfo},
  data() {
    return {
      nome: 'Nome do Usuário',
      email: 'Email do Usuário',
      office: 'Professor',
    }
  },
}
</script>

<style scoped>

</style>