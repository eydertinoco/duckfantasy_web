<template>
  <div id="burger-table">
    <div>
      <div id="burger-table-heading">
        <div class="order-id">#</div>
        <div style="width: 60%;">Nome da Turma</div>
        <div>Ações</div>
      </div>
      <div id="burger-table-rows">
        <div class="burger-table-row" v-for="turma in turmas" :key="turma.id">
          <div class="order-number">{{ turma.id }}</div>
          <div style="width: 60%;">{{ turma.className }}</div>
          <div>
            <button class="delete-btn" type="submit" @click="vincularTurma($event, turma.id)">
              Vincular
            </button>
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
  name: "ListaTurmasTotais",
  data() {
    return {
      turmas: null,
    }
  },
  methods: {
    async getTurmasVinculadas() {
      const auth = useAuthStore();
      const data = await server.get(
          '/turma',
          { headers: {'Authorization': `Bearer ${auth.token}`}}
      );
      this.turmas = data.data;
    },
    async vincularTurma(e, turmaId) {
      e.preventDefault();
      const auth = useAuthStore();
      const dataUser = await server.get(
          '/auth/me',
          { headers: {'Authorization': `Bearer ${auth.token}`}}
      );
      const novoAluno = {
        studentId: dataUser.data.id,
      }

      try {
        const addAlunoTurma = await server.patch(
            '/turma/' + turmaId + '/aluno/vincular',
            novoAluno,
            { headers: {'Authorization': `Bearer ${auth.token}`}}
        );
        this.$forceUpdate();
        window.location.reload();
      } catch (error) {
        console.log(error?.response?.data);
      }
    }
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