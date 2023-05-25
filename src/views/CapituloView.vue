<template>
  <div>
    <form class="card">
      <h2>{{ chapterTitle }}</h2>

      <div class="divProfessor" v-if="office === 'Professor'">

        <div style="display: flex; border: 1px solid;">
          <ChapterPieChart :positivo="positivo" :negativo="negativo" :key="positivo"/>
          <TestePieChart :acertos="acertos" :erros="erros" :key="acertos"/>
        </div>

        <div style="display: flex; border: 1px solid; flex-direction: column; align-items: center; justify-content: center;">
          <h2>Desempenho invidual de cada questão</h2>
          <div style="display: flex;">
            <div v-for="teste in testes" :key="teste.id">
              <TesteQuestaoPieChart :titulo="teste.testeQuestion" :respostas="teste.testeValue"
                                    :tentativas="teste.notaQuestion" :key="teste.notaQuestion"/>
            </div>
          </div>

        </div>

      </div>

      <div class="card__field">
        <p>{{ chapterText }}</p>
      </div>

      <div class="divTeste" v-if="office === 'Aluno'">

        <div class="divAluno">
          <button id="btnPositivo" type="submit" @click="acaoPositivo($event)">Eu Entendi</button>
          <button id="btnNegativo" type="submit" @click="acaoNegativo($event)">Não Entendi</button>
        </div>

        <div class="divTeste">

              <div>
                <div>Lista de Atividade</div>
              </div>

              <div class="divTeste__question" v-for="teste in testes" :key="teste.id">
                <p>{{ teste.testeQuestion }}</p>
                <div>
                  <input type="radio" id="trueQ" :name="teste.id" value="true">
                  <label for="trueQ">Verdadeiro</label><br>
                  <input type="radio" id="falseQ" :name="teste.id" value="false">
                  <label for="falseQ">Falso</label><br>
                </div>
              </div>

          <button id="salvarRespostas" type="submit" @click="salvarRespostas($event)">Salvar Respostas</button>

        </div>

      </div>

    </form>
  </div>
</template>

<script>
import {useAuthStore} from "@/store/auth";
import server from "@/services/config";
import ChapterPieChart from "@/components/ChapterPieChart.vue";
import TestePieChart from "@/components/TestePieChart.vue";
import TesteQuestaoPieChart from "@/components/TesteQuestaoPieChart.vue";

export default {
  name: "CapituloView",
  components: {TesteQuestaoPieChart, TestePieChart, ChapterPieChart},
  data() {
    return {
      trilhaId: '645e2f3b9188788071e320f9',
      chapterTitle: '',
      chapterText: '',
      chapterId: '',
      capituloPontuacao: [],
      office: null,
      positivo: null,
      negativo: null,
      testes: null,
      titulo: null,
      acertos: null,
      erros: null,
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
            '/chapter/' + this.$route.params.id +'/nota',
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
      await this.getTeste(auth);
    },
    async getCapitulo(auth) {
      const dataCapitulo = await server.get(
          '/chapter/' + this.$route.params.id,
          { headers: {'Authorization': `Bearer ${auth.token}`}}
      );
      this.chapterTitle = dataCapitulo.data.chapterTitle;
      this.chapterText = dataCapitulo.data.chapterText;
      this.chapterId = dataCapitulo.data.id;
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

    async getTeste(auth) {
      const dataTeste = await server.get(
          '/teste',
          { headers: {'Authorization': `Bearer ${auth.token}`}}
      );
      const quantQuest = dataTeste.data.length;
      for(let i=0; i < quantQuest; i++) {
        let quantRespostas = dataTeste.data[i].notaQuestion.length;
        let resposta = dataTeste.data[i].testeValue;
        for(let j=0; j < quantRespostas; j++) {
          if (dataTeste.data[i].notaQuestion[j].nota === resposta) {
            this.acertos = this.acertos + 1;
          } else {
            this.erros = this.erros + 1;
          }
        }
      }

      this.testes = dataTeste.data;
    },
    async salvarRespostas(e) {
      e.preventDefault();
      const auth = useAuthStore();
      const quantQuestoes = this.testes.length;
      for (let i=0; i < quantQuestoes; i++) {
        let question = document.getElementsByName(this.testes[i].id);
        for (let j=0; j < question.length; j++) {
          if (question[j].checked) {
            if (question[j].value === "true") {
              try {
                let minhaNota = {nota: true}
                await server.patch(
                    '/teste/' + this.testes[i].id +'/addnota',
                    minhaNota,
                    { headers: {'Authorization': `Bearer ${auth.token}`}}
                );
              } catch (error) {
                console.log(error?.response?.data);
              }

            } else {
              try {
                let minhaNota = {nota: false}
                await server.patch(
                    '/teste/' + this.testes[i].id +'/addnota',
                    minhaNota,
                    { headers: {'Authorization': `Bearer ${auth.token}`}}
                );
              } catch (error) {
                console.log(error?.response?.data);
              }
            }

          }
        }
      }
    }
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

.divTeste {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  & button {
    height: 30px;
    width: 150px;
    margin: 5px;
  }
}
</style>