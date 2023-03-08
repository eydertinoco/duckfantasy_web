<template>
  <div class="about">
    <h1>This is an about page</h1>

    <PieChart/>
  </div>
</template>

<script>
import PieChart from '@/components/PieChart.vue'; // @ is an alias to /src

export default {
  name: "LoginView",
  components: {
    PieChart,
  },
}
</script>

<style>
.chart {
  height: 100vh;
}
</style>