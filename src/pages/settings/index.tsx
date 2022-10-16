import { css } from '@emotion/react'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return <h1 css={helloStyle}>Hello</h1>
}

const helloStyle = css({
  color: 'red',
})

export default Home
