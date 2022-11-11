import {
  createStyles,
  Container,
  Title,
  Text,
  List,
  ThemeIcon,
} from '@mantine/core'
import { IconCircle} from '@tabler/icons'
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
    marginLeft: theme.spacing.xl * 2,

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 50,
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

export function Description_vrm() {
  const { classes } = useStyles()
  return (
    <div>
      <Container>
        <div className={classes.inner}>
          <Image
            src="/picture/LP_image_vrm.png"
            className={classes.image}
          />
          <div className={classes.content}>
            <Title className={classes.title}>
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: 'blue', to: 'cyan' }}
              >
                モデル
              </Text>
              の追加
            </Title>
            <Text color="dimmed" mt="md">
              自由にモデルを変更可能
            </Text>
            <List
              mt={30}
              spacing="sm"
              size="sm"
              type="ordered"
              icon={
                <ThemeIcon color="blue" size={18} radius="xl">
                  <IconCircle size={14} />
                </ThemeIcon>
              }
            >
              <List.Item>
                <b>VRMモデルをダウンロード</b>
              </List.Item>
              <List.Item>
                <b>ファイルを画面にドラッグ<br></br>(または設定画面からアップロード)</b>
              </List.Item>
            </List>
          </div>
        </div>
      </Container>
    </div>
  )
}
