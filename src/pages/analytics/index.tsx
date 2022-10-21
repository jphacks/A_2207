import type { NextPage } from 'next'
import { DataGraph } from 'src/components/analytics/datagraph';
import { HeatMap } from 'src/components/analytics/heatmap';
import { UserInfo } from 'src/components/analytics/userinfo';
import { SimpleGrid } from '@mantine/core';

const Home: NextPage = () => {
  return (
    <div>
      <UserInfo
        avatar = ""
        name = "Tohoku Taro"
      />
    <SimpleGrid
      cols={2}
      spacing="lg"
      breakpoints={[
        { maxWidth: 800, cols: 1, spacing: 'md' },
      ]}
    >
    <div>
      <HeatMap values={[
            { date: "2022-07-03", count: 30 },
            { date: "2022-08-22", count: 90 },
            { date: "2022-07-29", count: 60 },
            { date: '2022-10-01', count: 10 },
            { date: '2022-10-03', count: 30 },
            { date: '2022-10-06', count: 120 },
            { date: '2022-10-10', count: 5 },
            { date: '2022-10-15', count: 10 },
            { date: '2022-10-16', count: 30 },
            { date: '2022-10-17', count: 60 },
            { date: '2022-10-18', count: 90 },
            { date: '2022-10-19', count: 120 },
            { date: '2022-10-20', count: 40 },
          ]}/>
    </div>
    <div><DataGraph /></div>
    </SimpleGrid>
    </div>
  )
}

export default Home
