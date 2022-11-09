import { css , keyframes } from '@emotion/react'
import { useEffect, useState } from 'react';

const WiperTransition = () => {
    const [animState, setAnimState] = useState(false)

    useEffect(() => {
        setAnimState(true)
        setTimeout(() => setAnimState(false), 4*1000)
    }, [])

    return (
        <>
            {animState && <div css={[transition, animTrans]} />}
        </>
    )
}

const anim = keyframes`
    0% { }
    20% { transform: skewX(5deg) translateX(-100vw); background: #A5D8FF}
    40% { transform: skewX(0deg) translateX(0); width: 100vw; z-index: 11; box-shadow: 10px 10px 5px #eaeaea; background: #74C0FC}
    60% { transform: skewX(3deg) translateX(0); width: 100vw; z-index: 11; box-shadow: 10px 10px 5px #eaeaea; background: #4DABF7}
    80% { transform: skewX(1deg) translateX(-100vw); width: 60vw; z-index: 11; box-shadow: 10px 10px 5px #eaeaea; background: #A5D8FF}
    100% { transform: skewX(-5deg) translateX(-50vw); width: 30vw; z-index: 1; box-shadow: none; background: #E7F5FF;}
`

const animTrans = css`
    animation: ${anim} 4s ease-in-out;
`

const transition = css`
    position: absolute;
    height: 100vh;
    width: 100vw;
    background: #E7F5FF;
    transform: translateX(-100vw);
    transition: 2s all ease-in-out;
    -webkit-transition: 2s all ease-in-out;
`

export default WiperTransition