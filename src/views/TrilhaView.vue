<template>
  <div>
    <h2>{{trailName}}</h2>

    <p>{{trailDescription}}</p>

    <router-link :to="{ name: 'minhatrilha' }">
      <button type="submit">Voltar</button>
    </router-link>

    <form class="card">

      <router-link :to="{ name: 'novoconteudo' }" v-if="office === 'Professor'">
        <button type="submit">Criar Capítulo</button>
      </router-link>

      <h3>Lista de Capítulos</h3>
      <ListaCapitulos/>

      <div style="display: flex; width: 100%; flex-direction: column;" v-if="office === 'Professor'">
        <div style="width: 100%; margin-bottom: 30px;">
          <h3>Analíse da Trilha</h3>
          <div style="border: 1px solid black; display: flex; flex-direction: column;">

            <TrilhaBarChart :notaMediaGeral="notaMediaGeral" :todasRespostas="numeroRespostasEnviadas"
                            :key="atualizarGrafico"/>

          </div>
        </div>
      </div>

    </form>
  </div>
</template>

<script>
import UserInfo from "@/components/UserInfo.vue";
import ListaCapitulos from "@/components/ListaCapitulos.vue";
import {useAuthStore} from "@/store/auth";
import server from "@/services/config";
import minhaTrilhaView from "@/views/MinhaTrilhaView.vue";
import TrilhaBarChart from "@/components/TrilhaBarChart.vue";

export default {
  name: "TrilhaView",
  components: {TrilhaBarChart, ListaCapitulos},
  data() {
    return {
      trailName: '',
      trailDescription: '',
      trialPage: this.$route.params.id,
      office: null,
      quantRespostas: [],
      notaMediaCap: 0,
      notaAlunos: 0,
      numeroRespostasEnviadas: [],
      notaMediaGeral: [],
      atualizarGrafico: 0,
    }
  },
  methods: {
    minhaTrilhaView() {
      return minhaTrilhaView
    },
    async getTrilha() {
      const auth = useAuthStore();
      const dataUser = await server.get(
          '/auth/me',
          { headers: {'Authorization': `Bearer ${auth.token}`}}
      );
      this.office = dataUser.data.office;
      const data = await server.get(
          '/trial/' + this.$route.params.id,
          { headers: {'Authorization': `Bearer ${auth.token}`}}
      );
      this.trial = data.data;
      this.trailName = this.trial.trailName;
      this.trailDescription = this.trial.trailDescription;

      const meusCapitulos = this.trial.listChapter;
      const quantCapitulos = meusCapitulos.length;
      for (let i = 0; i < quantCapitulos; i++) {
        let capituloId = meusCapitulos[i];
        let dataTeste = await server.get(
            '/teste/chapter/' + capituloId,
            { headers: {'Authorization': `Bearer ${auth.token}`}}
        );
        const quantTeste = dataTeste.data.length;
        let notaMedia = 0;
        let quantRespostas = 0;
        for (let j = 0; j < quantTeste; j++) {
          let respostaCorreta = dataTeste.data[j].testeValue;
          this.quantRespostas = dataTeste.data[j].notaQuestion;
          this.notaMediaAlunos = 0;
          for (let e = 0; e < this.quantRespostas.length; e++) {
            if (this.quantRespostas[e].nota === respostaCorreta) {
              this.notaMediaAlunos = this.notaMediaAlunos + 1;
            }
          }
          quantRespostas = quantRespostas + this.quantRespostas.length;
          notaMedia = notaMedia + this.notaMediaAlunos;
        }
        this.notaMediaGeral.push(notaMedia);
        this.numeroRespostasEnviadas.push(quantRespostas);
      }
      this.atualizarGrafico = 1;
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