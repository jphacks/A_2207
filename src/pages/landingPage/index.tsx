import type { NextPage } from 'next'
import { Description } from 'src/components/landingPage/description'
import { Description2 } from 'src/components/landingPage/description2'
import { Description_camera } from 'src/components/landingPage/description_camera'
import { Features } from 'src/components/landingPage/features'
import { DataGraph } from 'src/components/landingPage/datagraph';
import { DataGraph2 } from 'src/components/landingPage/datagraph2';
import LandingPageLayout from 'src/components/layout/landingPage/mainLayout'

const Home: NextPage = () => {
  return (
    <LandingPageLayout>
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
