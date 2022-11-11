import { Box } from '@mantine/core'
import type { NextPage } from 'next'
import { Description } from 'src/components/landingPage/description'
import { Description2 } from 'src/components/landingPage/description2'
import { Description_mode } from 'src/components/landingPage/description_mode'
import { Description_vrm } from 'src/components/landingPage/description_vrm'
import { Features } from 'src/components/landingPage/features'

const Home: NextPage = () => {
  return (
    <>
      <></>
      <Box py="80px">
        <Description />
      </Box>
      <Description_mode />
      <Box py="100px">
        <Features />
      </Box>
      <Description2 />
      <Description_vrm />
    </>
  )
}

export default Home
