import React, { MouseEvent, useRef } from 'react';
import type { InteractionItem } from 'chart.js';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from 'chart.js';
import {
  Chart,
  getDatasetAtEvent,
  getElementAtEvent,
  getElementsAtEvent,
} from 'react-chartjs-2';
import { Data } from './data';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

export const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const labels=Data.labels;
const tdata=Data.data;

export const data = {
  labels,
  datasets: [
    {
      type: 'bar' as const,
      label: '時間',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      data: tdata,
      borderColor: 'rgb(53, 162, 235)',
      borderWidth: 2,
    },
  ],
};

export function DataGraph() {
  const printDatasetAtEvent = (dataset: InteractionItem[]) => {
    if (!dataset.length) return;

    const datasetIndex = dataset[0].datasetIndex;

    console.log(data.datasets[datasetIndex].label);
  };

  const printElementAtEvent = (element: InteractionItem[]) => {
    if (!element.length) return;

    const { datasetIndex, index } = element[0];

    console.log(data.labels[index], data.datasets[datasetIndex].data[index]);
  };

  const printElementsAtEvent = (elements: InteractionItem[]) => {
    if (!elements.length) return;

    console.log(elements.length);
  };

  const chartRef = useRef<ChartJS>(null);

  const onClick = (event: MouseEvent<HTMLCanvasElement>) => {
    const { current: chart } = chartRef;

    if (!chart) {
      return;
    }

    printDatasetAtEvent(getDatasetAtEvent(chart, event));
    printElementAtEvent(getElementAtEvent(chart, event));
    printElementsAtEvent(getElementsAtEvent(chart, event));
  };

  return (
    <Chart
      ref={chartRef}
      type='bar'
      onClick={onClick}
      options={options}
      data={data}
    />
  );
}
