import {
  createStyles,
  Container,
  Title,
  Text,
  List,
  Button,
  Group,
  ThemeIcon,
} from '@mantine/core'
import { IconCircleCheck, IconExternalLink } from '@tabler/icons'
import { Image } from '@mantine/core'

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
  },

  content: {
    maxWidth: 480,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 60,
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan('xs')]: {
      fontSize: 28,
    },
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  highlight: {
    position: 'relative',
    backgroundColor: theme.fn.variant({
      variant: 'light',
      color: theme.primaryColor,
    }).background,
    borderRadius: theme.radius.sm,
    padding: '4px 12px',
  },
}))

export function Description() {
  const { classes } = useStyles()
  return (
    <div>
      <Container>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: 'blue', to: 'cyan' }}
              >
                VRooM
              </Text>
            </Title>
            <Text color="dimmed" mt="md">
              作業を見守るパートナー
            </Text>
            <List
              mt={30}
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon color="blue" size={20} radius="xl">
                  <IconCircleCheck size={16} />
                </ThemeIcon>
              }
            >
              <List.Item>
                <b>VRMモデルと一緒に作業</b>{' '}
                魅力的な3Dモデルがあなたの作業のパートナーになってくれます.
              </List.Item>
              <List.Item>
                <b>作業効率の最適化</b>{'　'}
                作業に集中できるような機能が実装されています.
              </List.Item>
              <List.Item>
                <b>簡単に利用可能</b>{'　'}
                Webアプリのため簡単に利用できます. <br></br>{'　'}
                スマートフォンからの利用も可能です.
              </List.Item>
            </List>
            <Group mt={30}>
              <Button component="a" href="https://jphacks-2022-4839e.web.app/" variant="outline" leftIcon={<IconExternalLink size={20} />}>
                今すぐ VRooM をはじめる
              </Button>
            </Group>
          </div>
          <Image
            src="/picture/LP_image.png"
            className={classes.image}
          />
        </div>
      </Container>
    </div>
  )
}
