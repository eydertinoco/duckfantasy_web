<template>
  <div>
    <h2>Criar nova Trilha</h2>

    <form class="card" @submit.prevent="criarTrilha($event)">
      <div class="card__field">
        <label for="nomeTrilha">Nome Trilha:</label>
        <input id="nomeTrilha" type="text" v-model="trailName"/>
      </div>

      <div class="card__field">
        <label for="descricaoTrilha">Descrição da trilha:</label>
        <textarea id="descricaoTrilha" v-model="trailDescription"/>
      </div>

      <button type="submit">Criar Turma</button>

    </form>
  </div>
</template>

<script>
import {useAuthStore} from "@/store/auth";
import server from "@/services/config";
import router from "@/router";

export default {
  name: "CriarTrilhaView",
  data() {
    return {
      trailName: '',
      trailDescription: 'Ensinando a instalar windows no seu computador da xuxa.'
    }
  },
  methods: {
    async criarTrilha(e) {
      e.preventDefault();
      const novaTrilha = {
        trailName: this.trailName,
        trailDescription: this.trailDescription
      }
      console.log(novaTrilha);

      const auth = useAuthStore();

      try {
        const data = await server.post(
            '/trial',
            novaTrilha,
            { headers: {'Authorization': `Bearer ${auth.token}`}}
        );
        console.log(data);
        router.push({ path: '/minhatrilha'});
      } catch (error) {
        console.log(error?.response?.data);
      }

    }
  }
}
</script>