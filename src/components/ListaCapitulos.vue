<template>
  <div id="burger-table">
    <div>
      <div id="burger-table-heading">
        <div>Nome do Capítulo</div>
        <div>Ações</div>
      </div>
      <div id="burger-table-rows">
        <div class="burger-table-row" v-for="capitulo in capitulos" :key="capitulo.id">
          <div>{{ capitulo.chapterTitle }}</div>
          <div>
            <router-link :to="getURI(capitulo.id)">
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
  name: "ListaTrilha",
  data() {
    return {
      trilha: null,
      capitulos: []
    }
  },
  methods: {
    getURI(id) {
      return `/conteudo/${id}`;
    },
    async getPedidos() {
      const auth = useAuthStore();
      const dataTrilha = await server.get(
          '/trial/' + this.$route.params.id,
          { headers: {'Authorization': `Bearer ${auth.token}`}}
      );
      this.trilha = dataTrilha.data;
      const meusCapitulos = this.trilha.listChapter;
      const quantCapitulos = meusCapitulos.length;
      for (let i = 0; i < quantCapitulos; i++) {
        let capituloId = meusCapitulos[i];
        const dataCapitulo = await server.get(
            '/trial/' + this.$route.params.id + '/chapter/' + capituloId,
            { headers: {'Authorization': `Bearer ${auth.token}`}}
        );
        this.capitulos.push(dataCapitulo.data);
      }
    },
  },
  mounted () {
    this.getPedidos();
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