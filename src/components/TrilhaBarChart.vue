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
  notaMediaGeral: [],
  todasRespostas: [],
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
    text: 'Desempenho Geral dos Capítulos',
    left: 'center',
  },
  xAxis: {
    data: [`Instalando Python`, 'Instalação do VSCode']
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      data: [props.notaMediaGeral[0], props.notaMediaGeral[1]]
    },
    {
      type: 'bar',
      data: [props.todasRespostas[0], props.todasRespostas[1]]
    },
  ]
});
</script>

<style>
.chart {
  height: 50vh;
  width: 100%;
}
</style>