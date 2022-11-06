import { Box } from '@mantine/core'
import type { NextPage } from 'next'
import { Description } from 'src/components/landingPage/description'
import { Description2 } from 'src/components/landingPage/description2'
import { Description_camera } from 'src/components/landingPage/description_camera'
import { Features } from 'src/components/landingPage/features'

const Home: NextPage = () => {
  return (
    <>
      <Box py="100px">
        <Description />
      </Box>
      <Description2 />
      <Box py="150px">
        <Features />
      </Box>
      <Description_camera />
    </>
  )
}

export default Home
