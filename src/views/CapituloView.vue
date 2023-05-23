<template>
  <div>
    <form class="card">
      <h2>{{ chapterTitle }}</h2>

      <div class="divProfessor" v-if="office === 'Professor'">
        <ChapterPieChart :positivo="positivo" :negativo="negativo" :key="positivo"/>
      </div>

      <div class="card__field">
        <p>{{ chapterText }}</p>
      </div>

      <div class="divAluno" v-if="office === 'Aluno'">
        <button id="btnPositivo" type="submit" @click="acaoPositivo($event)">Eu Entendi</button>
        <button id="btnNegativo" type="submit" @click="acaoNegativo($event)">Não Entendi</button>
      </div>

    </form>
  </div>
</template>

<script>
import {useAuthStore} from "@/store/auth";
import server from "@/services/config";
import ChapterPieChart from "@/components/ChapterPieChart.vue";

export default {
  name: "CapituloView",
  components: {ChapterPieChart},
  data() {
    return {
      trilhaId: '645e2f3b9188788071e320f9',
      chapterTitle: '',
      chapterText: '',
      capituloPontuacao: [],
      office: null,
      positivo: null,
      negativo: null,
    }
  },
  methods: {
    async acaoPositivo(e) {
      e.preventDefault();
      console.log('Eu aluno entendi o contéudo desse capítulo!');
      this.capituloPontuacao = true;
      await this.atualizarNotaAluno(this.capituloPontuacao);

    },
    async acaoNegativo(e) {
      e.preventDefault();
      console.log('Eu aluno não entendi o contéudo desse capítulo');
      this.capituloPontuacao = false;
      await this.atualizarNotaAluno(this.capituloPontuacao);
    },
    async atualizarNotaAluno(minhaNota) {
      try {
        const addNota = {
          nota: minhaNota,
        }
        console.log(addNota);
        const auth = useAuthStore();
        const dataNota = await server.patch(
            '/trial/645e2f3b9188788071e320f9/chapter/' + this.$route.params.id +'/nota',
            addNota,
            { headers: {'Authorization': `Bearer ${auth.token}`}}
        );
      } catch(error) {
        console.log(error?.response?.data);
      }
    },
    async getCurrentUser() {
      const auth = useAuthStore();
      const dataUser = await server.get(
          '/auth/me',
          { headers: {'Authorization': `Bearer ${auth.token}`}}
      );
      this.office = dataUser.data.office;
      await this.getCapitulo(auth);
    },
    async getCapitulo(auth) {
      const dataCapitulo = await server.get(
          '/trial/' + this.trilhaId +  '/chapter/' + this.$route.params.id,
          { headers: {'Authorization': `Bearer ${auth.token}`}}
      );
      this.chapterTitle = dataCapitulo.data.chapterTitle;
      this.chapterText = dataCapitulo.data.chapterText;
      if (this.office === 'Professor') {
        const infoNotaAlunos = dataCapitulo.data.notaAlunos;
        const quantNotas = infoNotaAlunos.length;
        for(let i=0; i < quantNotas; i++) {
          if(infoNotaAlunos[i].nota === true) {
            this.positivo = this.positivo + 1;
          } else {
            this.negativo = this.negativo + 1;
          }
        }
      }
    },
  },
  mounted () {
    this.getCurrentUser();
  }
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

.divAluno {
  display: flex;
  align-items: center;
  justify-content: center;
  & button {
    height: 30px;
    width: 150px;
    margin: 5px;
  }
}
</style>