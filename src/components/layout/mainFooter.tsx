import {
  Footer,
  Tooltip,
  UnstyledButton,
  createStyles,
  Text,
  Center,
  Grid,
  Stack,
} from '@mantine/core'
import {
  TablerIcon,
  IconHome2,
  IconRun,
  IconBook,
  IconCoffee,
} from '@tabler/icons'
import { useSettingsStore } from 'src/stores/settingsStore'
import shallow from 'zustand/shallow'

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
        .color,
    },
  },
}))

interface NavbarLinkProps {
  icon: TablerIcon
  label: string
  modeTitle: string
  onClick?(): void
}

function NavbarLink({
  icon: Icon,
  label,
  modeTitle,
  onClick,
}: NavbarLinkProps) {
  const { mode } = useSettingsStore(
    (state) => ({
      mode: state.mode,
    }),
    shallow,
  )
  const { classes, cx } = useStyles()

  return (
    <Tooltip label={label} position="top" transitionDuration={0}>
      <div>
        <Center>
          <UnstyledButton
            component="a"
            onClick={onClick}
            className={cx(classes.link, {
              [classes.active]: mode === modeTitle,
            })}
          >
            <Stack spacing={0}>
              <Center>
                <Icon stroke={1.5} />
              </Center>

              <Center>
                <Text size="xs">{label}</Text>
              </Center>
            </Stack>
          </UnstyledButton>
        </Center>
      </div>
    </Tooltip>
  )
}

export function MainFooter() {
  const { setTransitionMode } = useSettingsStore(
    (state) => ({
      setTransitionMode: state.setTransitionMode,
    }),
    shallow,
  )

  return (
    <Footer height={70} p="xs">
      <Grid>
        <Grid.Col span={3}>
          <NavbarLink
            icon={IconHome2}
            modeTitle="initial"
            label="スタート"
            onClick={() => setTransitionMode('initial')}
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <NavbarLink
            icon={IconBook}
            modeTitle="study"
            label="勉強"
            onClick={() => setTransitionMode('study')}
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <NavbarLink
            icon={IconRun}
            modeTitle="fitness"
            label="運動"
            onClick={() => setTransitionMode('fitness')}
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <NavbarLink
            icon={IconCoffee}
            modeTitle="break"
            label="休憩"
            onClick={() => setTransitionMode('break')}
          />
        </Grid.Col>
      </Grid>
    </Footer>
  )
}
