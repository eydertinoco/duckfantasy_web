<template>
  <div id="burger-table">
    <div>
      <div id="burger-table-heading">
        <div class="order-id">#</div>
        <div>Nome da Turma</div>
        <div>Ações</div>
      </div>
      <div id="burger-table-rows">
        <div class="burger-table-row" v-for="turma in turmas" :key="turma.id">
          <div class="order-number">{{ turma.id }}</div>
          <div>{{ turma.className }}</div>
          <div>
            <router-link :to="getURI(turma.id)">
              <button class="delete-btn" type="submit">Visualizar</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import server from "@/services/config";
import {useAuthStore} from "@/store/auth";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "ListaTurmas",
  data() {
    return {
      turmas: null,
    }
  },
  methods: {
    getURI(id) {
      return `/turma/${id}`;
    },
    async getTurmasVinculadas() {
      const auth = useAuthStore();
      const data = await server.get(
          '/turma/aluno',
          { headers: {'Authorization': `Bearer ${auth.token}`}}
      );
      this.turmas = data.data;
      console.log('estou aqui')
      console.log(this.turmas);
    },
  },
  mounted () {
    this.getTurmasVinculadas();
  }
}
</script>

<style scoped lang="scss">
#burger-table {
  width: 100%;
  margin: 0 auto;
}
#burger-table-heading,
#burger-table-rows,
.burger-table-row {
  display: flex;
  flex-wrap: wrap;
}
#burger-table-heading {
  font-weight: bold;
  padding: 12px;
  border-bottom: 3px solid #333;
}
.burger-table-row {
  width: 100%;
  padding: 12px;
  border-bottom: 1px solid #CCC;
}
#burger-table-heading div,
.burger-table-row div {
  width: 19%;
}
select {
  padding: 12px 6px;
  margin-right: 12px;
}
.delete-btn {
  background-color: #222;
  color:#fcba03;
  font-weight: bold;
  border: 2px solid #222;
  padding: 10px;
  font-size: 16px;
  margin: 0 auto;
  cursor: pointer;
  transition: .5s;
}
.delete-btn:hover {
  background-color: transparent;
  color: #222;
}
</style>