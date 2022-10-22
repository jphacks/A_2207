import { createStyles, Text, SimpleGrid, Container } from '@mantine/core'
import { IconHeart, IconClock, IconRun, TablerIcon } from '@tabler/icons'

const useStyles = createStyles((theme) => ({
  feature: {
    position: 'relative',
    paddingTop: theme.spacing.xl,
    paddingLeft: theme.spacing.xl,
  },

  overlay: {
    position: 'absolute',
    height: 100,
    width: 160,
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
      '作業中は常にアバターが見守ってくれます. 作業を頑張っていれば応援してくれるかもしれません.',
  },
  {
    icon: IconRun,
    title: '休憩用のスクワッドモード',
    description:
      '作業に一区切りがついたらスクワッドで気分転換しましょう. カメラによるAIポーズ認識によって, スクワッドの回数を自動計測してくれます.',
  },
  {
    icon: IconClock,
    title: 'タイマー機能',
    description:
      '作業と休憩の時間を管理することで適切なサイクルを実現できます. 時間設定はカスタマイズ可能です.',
  },
]

export function Features() {
  const items = mockdata.map((item) => <Feature {...item} key={item.title} />)

  return (
    <Container mt={30} mb={30} size="lg">
      <SimpleGrid
        cols={3}
        breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
        spacing={50}
      >
        {items}
      </SimpleGrid>
    </Container>
  )
}
