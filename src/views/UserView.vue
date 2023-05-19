<template>
  <div>
    <h2>Página do Usuário</h2>

    <UserInfo :nome="name" :email="email" :office="office"/>

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

      <div>
        <div>
          <h2>Turmas Vinculadas</h2>

          <ListaTurmasVinculadas/>
        </div>

        <div>
          <h2>Turmas Dispóniveis</h2>
          <ListaTurmasTotais/>
        </div>
      </div>


    </div>

  </div>
</template>

<script>
import server from "@/services/config";
import PieChart from "@/components/PieChart.vue";
import UserInfo from "@/components/UserInfo.vue";
import {useCookies} from "vue3-cookies";
import {useAuthStore} from "@/store/auth";
import ListaTurmasVinculadas from "@/components/ListaTurmasVinculadas.vue";
import ListaTurmasTotais from "@/components/ListaTurmasTotais.vue";

export default {
  name: "UserView",
  components: {PieChart, UserInfo, ListaTurmasVinculadas, ListaTurmasTotais},
  data() {
    return {
      name: 'Nome do Usuário',
      email: 'Email do Usuário',
      office: 'Professor',
    }
  },
  methods: {
    getURI(id) {
      return `/turma/${id}/vincularturma`;
    },
    async getUser() {
      const auth = useAuthStore();
      const dataUser = await server.get(
          '/auth/me',
          { headers: {'Authorization': `Bearer ${auth.token}`}}
      );
      this.name = dataUser.data.name;
      this.email = dataUser.data.email;
      this.office = dataUser.data.office;
    },
  },
  mounted () {
    this.getUser();
  }
}
</script>

<style scoped>

</style>