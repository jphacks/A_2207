import type { NextPage } from 'next'
import { Description } from 'src/components/landingPage/description'
import { Features } from 'src/components/landingPage/features'
import LandingPageLayout from 'src/components/layout/landingPage/mainLayout'

const Home: NextPage = () => {
  return (
    <LandingPageLayout>
      <Description />
      <Features />
    </LandingPageLayout>
  )
}

export default Home
