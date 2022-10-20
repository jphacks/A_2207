import type { NextPage } from 'next'
import { Description } from 'src/components/landingPage/description'
import { Description2 } from 'src/components/landingPage/description2'
import { Description_camera } from 'src/components/landingPage/description_camera'
import { Features } from 'src/components/landingPage/features'
import { DataGraph } from 'src/components/landingPage/datagraph';
import { DataGraph2 } from 'src/components/landingPage/datagraph2';
import { HeatMap } from 'src/components/landingPage/heatmap';
import LandingPageLayout from 'src/components/layout/landingPage/mainLayout'

const Home: NextPage = () => {
  return (
    <LandingPageLayout>
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
      <Description />
      <Features />
      <Description2 />
      <Description_camera />
      <DataGraph />
      <DataGraph2 />
    </LandingPageLayout>
  )
}

export default Home
