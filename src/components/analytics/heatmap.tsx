import 'react-calendar-heatmap/dist/styles.css'
import CalendarHeatmap from 'react-calendar-heatmap'
import ReactTooltip from 'react-tooltip'
import { Container } from '@mantine/core'
import { css } from '@emotion/react'

const heatmap = css`
  .react-calendar-heatmap .color-scale-0 {
    fill: #add6f3;
  }
  .react-calendar-heatmap .color-scale-1 {
    fill: #63bdfe;
  }
  .react-calendar-heatmap .color-scale-2 {
    fill: #2da7fe;
  }
  .react-calendar-heatmap .color-scale-3 {
    fill: #016ab6;
  }
  .react-calendar-heatmap .color-scale-4 {
    fill: #263e5d;
  }
`

export const HeatMap = ({
  values,
}: {
  values: Array<{ date: string; count: number }>
}) => {
  const startDate = new Date('2022-10-20')
  const endDate = new Date('2022-10-20')
  startDate.setMonth(startDate.getMonth() - 4)
  return (
    <Container>
      <div css={heatmap}>
        <CalendarHeatmap
          // 表示させる月
          startDate={startDate}
          endDate={endDate}
          values={values}
          // color
          classForValue={(value: { date: string; count: number }) => {
            if (!value) {
              return 'color-empty'
            }
            return `color-scale-${Math.min(4, Math.floor(value.count / 30))}`
          }}
          tooltipDataAttrs={(value: { date: string; count: number }) => {
            if (!value || !value.date) {
              return null
            }
            // react-tooltipの構成
            return {
              'data-tip': `${value.date} has count: ${value.count}`,
            }
          }}
        />
        <div className="react-calendar-heatmap-week">
          {' '}
          <rect width={10} height={10} className="color-empty" />
        </div>
      </div>
      <ReactTooltip />
    </Container>
  )
}
