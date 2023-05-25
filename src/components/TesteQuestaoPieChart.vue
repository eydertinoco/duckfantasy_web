<template>
  <div>
    <v-chart class="chart" :option="option" autoresize />
  </div>
</template>

<script setup>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, provide, defineProps, reactive } from 'vue';

const props = defineProps({
  titulo: String,
  respostas: Boolean,
  tentativas: Array,
  acertos: Number,
  erros: Number,
});

let acerto = 0;
let erro = 0;
x();

function x() {
  for(let i=0; i < props.tentativas.length; i++) {
    if (props.tentativas[i].nota === props.respostas) {
      acerto = acerto + 1;
    } else {
      erro = erro + 1;
    }
  }
}

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

provide(THEME_KEY, 'white');

const option = ref({
  title: {
    text: `${props.titulo}`,
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['Acertos', 'Erros'],
  },
  series: [
    {
      name: 'Desempenho do Contéudo',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        { value: acerto, name: 'Acertos' },
        { value: erro, name: 'Erros' },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
});
</script>

<style>
.chart {
  height: 300px;
  width: 49vw;
}
</style>