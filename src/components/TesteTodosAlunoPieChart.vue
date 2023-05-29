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
  info: Array,
});

console.log(props.info);

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
    text: `${props.info[0]}`,
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
      name: `${props.info[0]}`,
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        { value: props.info[1], name: 'Acertos' },
        { value: props.info[2], name: 'Erros' },
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
  width: 48vw;
}
</style>