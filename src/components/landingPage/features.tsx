import { createStyles, Text, SimpleGrid, Container } from '@mantine/core'
import { IconHeart, IconClock, IconRun, TablerIcon, IconChartBar } from '@tabler/icons'

const useStyles = createStyles((theme) => ({
  feature: {
    position: 'relative',
    paddingTop: theme.spacing.xl,
    paddingLeft: theme.spacing.xl,
  },

  overlay: {
    position: 'absolute',
    height: 100,
    width: 240,
    top: 0,
    left: 0,
    backgroundColor: theme.fn.variant({
      variant: 'light',
      color: theme.primaryColor,
    }).background,
    zIndex: 1,
  },

  content: {
    position: 'relative',
    zIndex: 2,
  },

  icon: {
    color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
      .color,
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },
}))

interface FeatureProps extends React.ComponentPropsWithoutRef<'div'> {
  icon: TablerIcon
  title: string
  description: string
}

function Feature({
  icon: Icon,
  title,
  description,
  className,
  ...others
}: FeatureProps) {
  const { classes, cx } = useStyles()

  return (
    <div className={cx(classes.feature, className)} {...others}>
      <div className={classes.overlay} />

      <div className={classes.content}>
        <Icon size={38} className={classes.icon} stroke={1.5} />
        <Text weight={700} size="lg" mb="xs" mt={5} className={classes.title}>
          {title}
        </Text>
        <Text color="dimmed" size="sm">
          {description}
        </Text>
      </div>
    </div>
  )
}

const mockdata = [
  {
    icon: IconHeart,
    title: '作業モード',
    description:
      'VRMモデルがあなたと一緒に作業をしてくれます. 作業を頑張っていれば応援してくれるかもしれません.',
  },
  {
    icon: IconRun,
    title: 'スクワッドモード',
    description:
      '作業が済んだらスクワッドで気分転換しましょう. カメラによるAIポーズ認識によって, スクワッドの回数を自動計測してくれます.',
  },
  {
    icon: IconClock,
    title: 'タイマー機能',
    description:
      '作業と休憩の時間を管理することで作業の集中に適切なサイクルを実現できます. 時間設定はカスタマイズ可能です.',
  },
  {
    icon: IconChartBar,
    title: '自動記録',
    description:
      'アカウント連携をすることで,作業時間を自動で記録できます.統計画面で過去の自分の頑張りを振り返ることが可能です.',
  },
]

export function Features() {
  const items = mockdata.map((item) => <Feature {...item} key={item.title} />)

  return (
    <Container mt={30} mb={30} size="lg">
      <SimpleGrid
        cols={4}
        breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
        spacing={50}
      >
        {items}
      </SimpleGrid>
    </Container>
  )
}
