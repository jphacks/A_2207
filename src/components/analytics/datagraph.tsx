import React, { MouseEvent, useEffect, useRef, useState } from 'react'
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from 'chart.js'
import { Chart } from 'react-chartjs-2'
import { Container } from '@mantine/core'

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
)

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
}

export const formatDate = (dt: Date) => {
  const y = dt.getFullYear();
  const m = ('00' + (dt.getMonth()+1)).slice(-2);
  const d = ('00' + dt.getDate()).slice(-2);
  return (y + '-' + m + '-' + d);
}

const getBefore7days = () => {
  const daysLabel : string[] = [];
  for (let i=6; i>=0; i--) {
    const dt = new Date();
    dt.setDate(dt.getDate()-i);
    daysLabel.push(formatDate(dt));
  }
  return daysLabel;
}


export const DataGraph = ({values}: {values: Array<{ date: string; count: number }>}) => {
  const [labels, setLabels] = useState<Array<string>>([]);
  const [tdata, setTdata] = useState<Array<number>>([]);

  useEffect(() => {
    const newLabels = getBefore7days();

    const newTdata = Array(7).fill(0);

    console.log(newLabels);
    for (let i=0; i<7; i++) {
      const label = newLabels[i];
      for (const value of values) {
        if (value.date === label) {
          newTdata[i] = value.count;
          break;
        }
      }
    }
    setLabels(newLabels);
    setTdata(newTdata);
  }, [])

  const chartRef = useRef<ChartJS>(null)

  return (
    <Container>
      <Chart
        ref={chartRef}
        type="bar"
        // onClick={onClick}
        options={options}
        data={
          {
            labels,
            datasets: [
              {
                type: 'bar' as const,
                label: '今週の作業時間（分）',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                data: tdata,
                borderColor: 'rgb(53, 162, 235)',
                borderWidth: 2,
              },
            ],
          }
        }
      />

    </Container>

  )
}
