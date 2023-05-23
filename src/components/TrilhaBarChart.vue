<template>
  <div>
    <v-chart class="chart" :option="option" autoresize />
  </div>
</template>

<script setup>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, provide, defineProps, reactive } from 'vue';

const props = defineProps({
  positivo: Number,
  negativo: Number
});

use([
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);

provide(THEME_KEY, 'white');

const option = ref({
  title: {
    text: 'Desempenho da Trilha',
    left: 'center',
  },
  xAxis: {
    data: ['Cap 1', 'Cap 2', 'Cap 3', 'Cap 4', 'Cap 5']
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      data: [23, 24, 18, 25, 27, 28, 25]
    },
  ]
});
</script>

<style>
.chart {
  height: 50vh;
  width: 100vw;
}
</style>