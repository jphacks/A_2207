import { createStyles, Text, SimpleGrid, Container } from '@mantine/core'
import { IconHeart, IconClock, IconCamera, IconCoin, TablerIcon } from '@tabler/icons'

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
    title: 'いつでも来てくれる Zoom 友達',
    description:
      'As electricity builds up inside its body, it becomes more aggressive. One theory is that the electricity.',
  },
  {
    icon: IconClock,
    title: '時間管理で集中力アップ',
    description:
      'Slakoth’s heart beats just once a minute. Whatever happens, it is content to loaf around motionless.',
  },
  {
    icon: IconCamera,
    title: 'カメラ機能を使ったスクワットゲーム',
    description:
      'Thought to have gone extinct, Relicanth was given a name that is a variation of the name of the person who discovered.',
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
