import 'react-calendar-heatmap/dist/styles.css'
import CalendarHeatmap from 'react-calendar-heatmap'
import ReactTooltip from 'react-tooltip'
import { Center, Container, Flex, ThemeIcon, Title } from '@mantine/core'
import { css } from '@emotion/react'
import { IconPlayerStop } from '@tabler/icons'

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
  const startDate = new Date()
  const endDate = new Date()
  startDate.setMonth(endDate.getMonth() - 4)
  return (
    <Container>
      <div css={heatmap}>
        <Center
          style={{
            marginBottom: 20,
          }}
        >
          <Flex
            style={{
              borderBottom: '2px solid #1c7ed6',
              paddingBottom: '5px',
            }}
          >
            <ThemeIcon color="blue" size={28} radius="xl" mr={10}>
              <IconPlayerStop size={20} />
            </ThemeIcon>
            <Title order={3}>過去3ヵ月の作業記録</Title>
          </Flex>
        </Center>
        <CalendarHeatmap
          // 表示させる月
          startDate={startDate}
          // endDate={endDate}
          values={values}
          showWeekdayLabels={true}
          // color
          classForValue={(value: { date: string; count: number }) => {
            if (!value) {
              return 'color-empty'
            }
            return `color-scale-${Math.min(4, Math.ceil(value.count / 25))}`
          }}
          tooltipDataAttrs={(value: { date: string; count: number }) => {
            if (!value || !value.date) {
              return null
            }
            // react-tooltipの構成
            return {
              'data-tip': `${value.count} minutes on ${value.date}`,
            }
          }}
        />
        <div className="react-calendar-heatmap-week">
          <rect width={10} height={10} className="color-empty" />
        </div>
      </div>
      <ReactTooltip />
    </Container>
  )
}
