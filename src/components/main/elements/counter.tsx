import { Center } from '@mantine/core'
import { css } from '@emotion/react'
import { IoPause, IoPlay } from 'react-icons/io5'
import { useMediaQuery } from '@mantine/hooks'

type CounterType = {
  timerSeconds: number
  countdown: number
  isRunning: boolean
  handleClick: () => void
}
const Counter = ({
  timerSeconds,
  countdown,
  isRunning,
  handleClick,
}: CounterType) => {
  const md = useMediaQuery('(min-width: 992px)')
  const sm = useMediaQuery('(min-width: 576px)')
  const percentage = (countdown * 100) / (timerSeconds * 1000)
  const length = Math.PI * 2 * 100
  const offset = -length - (length * percentage) / 100
  const deg = (360 * percentage) / 100
  return (
    <Center
      className="container"
      css={style(offset, deg, md, sm)}
      onClick={() => handleClick()}
    >
      <svg
        width={md ? '250' : sm ? '220' : '160'}
        height={md ? '250' : sm ? '220' : '160'}
        viewBox="0 0 220 220"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(110,110)">
          <circle r="100" className="e-c-base" />
          <g transform="rotate(-90)">
            <circle r="100" className="e-c-progress" />
            <circle cx="100" cy="0" r="6" className="e-c-pointer" />
          </g>
        </g>
      </svg>
      <div className="controlls">
        <div className="display-remain-time">
          {new Date(countdown).toISOString().slice(14, 19)}
        </div>
        <div>
          {isRunning ? (
            <IoPause fontSize={md ? 30 : 20} color="#1c7ed6" />
          ) : (
            <IoPlay fontSize={md ? 30 : 20} color="#1c7ed6" />
          )}
        </div>
      </div>
    </Center>
  )
}

const style = (
  strokeDashoffset: number,
  deg: number,
  md: boolean,
  sm: boolean,
) => css`
  .controlls {
    position: absolute;
    text-align: center;
  }
  .display-remain-time {
    font-weight: ${md ? 400 : 200};
    font-size: ${md ? '50' : sm ? '40' : '35'}px;
    color: #1c7ed6;
  }
  .e-c-base {
    fill: none;
    stroke: #b6b6b6;
    stroke-width: ${md ? '3' : '2'};
  }
  .e-c-progress {
    fill: none;
    stroke: #1c7ed6;
    stroke-width: ${md ? '3' : '2'};
    transition: stroke-dashoffset 0.7s;
    stroke-dasharray: ${Math.PI * 2 * 100};
    stroke-dashoffset: ${strokeDashoffset};
  }
  .e-c-pointer {
    fill: #fff;
    stroke: #1c7ed6;
    stroke-width: ${md ? '3' : '2'};
    transition: transform 0.7s;
    transform: rotate(${deg}deg);
  }
`

export default Counter
