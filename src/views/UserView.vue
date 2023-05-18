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

      <div style="display: flex;">
        <div style="display: flex; flex-direction: column; width: 50%;">
          <h1>Minhas Turmas</h1>

          <ListaTurmasVinculadas/>
        </div>

        <div style="display: flex; flex-direction: column; width: 50%;">
          <h1>Vincular Turma</h1>

          <ListaTodasTurmas/>
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
import minhaTrilhaView from "@/views/MinhaTrilhaView.vue";
import {useAuthStore} from "@/store/auth";
import ListaTurmasVinculadas from "@/components/ListaTurmasVinculadas.vue";
import ListaTodasTurmas from "@/components/ListaTodasTurmas.vue";

export default {
  name: "UserView",
  components: {ListaTurmasVinculadas, ListaTodasTurmas, PieChart, UserInfo},
  data() {
    return {
      nome: 'Nome do Usuário',
      email: 'Email do Usuário',
      office: 'Professor',
    }
  },
  methods: {
    async getUser() {
      const auth = useAuthStore();
      const data = await server.get(
          '/user/' + this.$route.params.id,
          { headers: {'Authorization': `Bearer ${auth.token}`}}
      );
      this.nome = data.data.name;
      this.email = data.data.email;
      this.office = data.data.office;
    },
  },
  mounted () {
    this.getUser();
  }
}
</script>

<style scoped>

</style>