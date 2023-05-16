<template>
  <div>
    <h2>{{trailName}}</h2>

    <p>{{trailDescription}}</p>

    <router-link :to="{ name: 'minhatrilha' }">
      <button type="submit">Voltar</button>
    </router-link>

    <form class="card">

      <router-link :to="{ name: 'novoconteudo' }">
        <button type="submit">Criar Capítulo</button>
      </router-link>

      <h3>Lista de Capítulos</h3>
      <ListaCapitulos/>

      <div style="display: flex; width: 100%; flex-direction: column;">
        <div style="width: 100%;">
          <h3>Analíse da Trilha</h3>
          <div style="border: 1px solid black; display: flex; flex-direction: column;">

            <PieChart/>

          </div>
        </div>
      </div>

    </form>
  </div>
</template>

<script>
import PieChart from "@/components/PieChart.vue";
import UserInfo from "@/components/UserInfo.vue";
import ListaCapitulos from "@/components/ListaCapitulos.vue";
import {useAuthStore} from "@/store/auth";
import server from "@/services/config";
import minhaTrilhaView from "@/views/MinhaTrilhaView.vue";

export default {
  name: "TrilhaView",
  components: {PieChart, ListaCapitulos},
  data() {
    return {
      trailName: '',
      trailDescription: '',
      trialPage: this.$route.params.id
    }
  },
  methods: {
    minhaTrilhaView() {
      return minhaTrilhaView
    },
    async getTrilha() {
      const auth = useAuthStore();
      const data = await server.get(
          '/trial/' + this.$route.params.id,
          { headers: {'Authorization': `Bearer ${auth.token}`}}
      );
      this.trial = data.data;
      this.trailName = this.trial.trailName;
      this.trailDescription = this.trial.trailDescription;
    },
  },
  mounted () {
    this.getTrilha();
  }
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