<template>
  <div>
    <form class="card">


      <h2>{{ chapterTitle }}</h2>

      <div class="card__field">
        <p>{{ chapterText }}</p>
      </div>

    </form>
  </div>
</template>

<script>
import {useAuthStore} from "@/store/auth";
import server from "@/services/config";

export default {
  name: "CapituloView",
  data() {
    return {
      trilhaId: '645e2f3b9188788071e320f9',
      chapterTitle: '',
      chapterText: ''
    }
  },
  methods: {
    async getCapitulo() {
      console.log(this.$route.params.id);
      const auth = useAuthStore();
      const dataCapitulo = await server.get(
          '/trial/' + this.trilhaId +  '/chapter/' + this.$route.params.id,
          { headers: {'Authorization': `Bearer ${auth.token}`}}
      );
      this.chapterTitle = dataCapitulo.data.chapterTitle;
      this.chapterText = dataCapitulo.data.chapterText;
    },
  },
  mounted () {
    this.getCapitulo();
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
</style>