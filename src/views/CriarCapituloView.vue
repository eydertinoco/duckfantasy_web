<template>
  <div>
    <router-link :to="getURI(this.$route.params.id)">
      <button type="submit">Voltar</button>
    </router-link>

    <h2>Adicionar novo capítulo</h2>

    <form class="card" @submit.prevent="criarCapitulo($event)">
      <div class="card__field">
        <label for="nomeCapitulo">Nome do Capítulo:</label>
        <input id="nomeCapitulo" type="text" v-model="chapterTitle"/>
      </div>

      <div class="card__field">
        <label for="conteudoCapitulo">Conteúdo do Capítulo:</label>
        <textarea v-model="chapterText"/>
      </div>

      <button type="submit">Adicionar Conteúdo</button>

    </form>
  </div>
</template>

<script>
import {useAuthStore} from "@/store/auth";
import server from "@/services/config";
import router from "@/router";

export default {
  name: "CriarCapituloView",
  props: ['trialPage'],
  data() {
    return {
      chapterTitle: 'Teste Front',
      chapterText: 'Um texto bem longo...',
      chapterRef: '',
      trialId: this.$route.params.id,
    }
  },
  methods: {
    getURI(id) {
      return `/trilha/${id}`;
    },
    async criarCapitulo(e) {
      e.preventDefault();
      const novoCapitulo = {
        chapterTitle: this.chapterTitle,
        chapterText: this.chapterText,
        chapterRef: this.chapterRef,
        trialId: this.trialId
      }
      try {
        const auth = useAuthStore();
        const data = await server.post(
            '/chapter',
            novoCapitulo,
            { headers: {'Authorization': `Bearer ${auth.token}`}}
        );
        console.log(data);
        router.push({ path: '/trilha/' + novoCapitulo.trialId});
      } catch (error) {
        console.log(error?.response?.data);
      }

    }
  },
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
</style>