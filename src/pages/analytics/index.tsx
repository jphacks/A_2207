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
            { date: "2022-07-03", count: 1 },
            { date: "2022-08-22", count: 2 },
            { date: "2022-07-29", count: 4 },
            { date: '2022-10-01', count: 1 },
            { date: '2022-10-03', count: 2 },
            { date: '2022-10-06', count: 3 },
            { date: '2022-10-10', count: 5 },
            { date: '2022-10-11', count: 1 },
            { date: '2022-10-12', count: 3 },
            { date: '2022-10-13', count: 4 },
            { date: '2022-10-14', count: 6 },
            { date: '2022-10-15', count: 8 },
            { date: '2022-10-19', count: 10 },
          ]}/>
    </div>
    <div><DataGraph /></div>
    </SimpleGrid>
    </div>
  )
}

export default Home
