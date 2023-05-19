<template>
  <div id="burger-table">
    <div>
      <div id="burger-table-heading">
        <div style="width: 40%;">Nome dos Alunos</div>
        <div>E-mail</div>
      </div>
      <div id="burger-table-rows">
        <div class="burger-table-row" v-for="aluno in alunos" :key="aluno.id">
          <div style="width: 40%;">{{ aluno.name }}</div>
          <div>{{ aluno.email }}</div>
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
  name: "ListaTrilhaVinculadas",
  data() {
    return {
      listaAlunos: null,
      alunos: [],
    }
  },
  methods: {
    async getListaTrilhasVinculadas() {
      const auth = useAuthStore();
      const data = await server.get(
          '/turma/' + this.$route.params.id,
          { headers: {'Authorization': `Bearer ${auth.token}`}}
      );
      this.listaAlunos = data.data.listStudent;
      const tamanhoLista = this.listaAlunos.length;
      for (let i = 0; i < tamanhoLista; i++) {
        let idEstudante = this.listaAlunos[i];
        const dataAlunos = await server.get(
            '/user/' + idEstudante,
            { headers: {'Authorization': `Bearer ${auth.token}`}}
        );
        this.alunos.push(dataAlunos.data);
      }
    },
  },
  mounted () {
    this.getListaTrilhasVinculadas();
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