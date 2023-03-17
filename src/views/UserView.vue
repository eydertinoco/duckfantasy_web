<template>
  <div>
    <h2>Página do Usuário</h2>

    <UserInfo :nome="nome" :email="email" :office="office"/>

    <div v-if="office === 'Professor'">
      <p>Sou um Professor</p>

      <div style="border: 1px solid black;">
        Panel para pesquisar do Professor
      </div>

      <div style="display: flex;">
        <div style="display: flex; flex-direction: column; border: 1px solid black; width: 50%;">
          <button>Criar Turma</button>
          <h4>Turmas Ativas</h4>
          <table>
            <tr>
              <th>Turma</th>
              <th>Ano</th>
              <th>Gerenciar</th>
            </tr>
            <tr>
              <td>Matemática IFAL 8º2023</td>
              <td>8 Ano</td>
              <td><button/></td>
            </tr>
            <tr>
              <td>Matemática IFAL 9º2023</td>
              <td>9 Ano</td>
              <td><button/></td>
            </tr>
          </table>
        </div>

        <div style="display: flex; flex-direction: column; border: 1px solid black; width: 50%;">
          <button>Criar Trilha</button>
          <h4>Minhas Trilhas</h4>
          <table>
            <tr>
              <th>Trilha</th>
              <th>Gerênciar</th>
            </tr>
            <tr>
              <td>Livro 1 - 9 Ano</td>
              <td><button/></td>
            </tr>
            <tr>
              <td>Livro 2 - 9 Ano</td>
              <td><button/></td>
            </tr>
          </table>
        </div>
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