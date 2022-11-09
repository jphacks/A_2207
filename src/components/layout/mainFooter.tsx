import {
  Footer,
  Tooltip,
  UnstyledButton,
  createStyles,
  Group,
  Image,
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
import { useState } from 'react'
import { IconInfo } from './mainIconInfo'
import { IconConfig } from './mainIconConfig'
import { useSettingsStore } from 'src/stores/settingsStore'
import shallow from 'zustand/shallow'
import Signin from '../firebase/Signin'
import SignOut from '../firebase/Signout'
import { auth } from '../firebase/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

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
        <Stack spacing={0}>
          <Center>
            <UnstyledButton
                component="a"
                onClick={onClick}
                className={cx(classes.link, {
                  [classes.active]: mode === modeTitle,
                })}
              >
              <Icon stroke={1.5} />
            </UnstyledButton>
          </Center>
          <Center>
            <Text>{label}</Text>
          </Center>
        </Stack>
      </div>
    </Tooltip>
  )
}

export function MainFooter() {
  const { setMode } = useSettingsStore(
    (state) => ({
      setMode: state.setMode,
    }),
    shallow,
  )
  const [infoOpened, setInfoOpened] = useState(false)
  const [configOpened, setConfigOpened] = useState(false)

  const [user] = useAuthState(auth as any)

  return (
    <Footer height={100} p="md">
      <Grid>
        <Grid.Col span={3}>
          <NavbarLink
            icon={IconHome2}
            modeTitle="initial"
            label="スタート"
            onClick={() => setMode('initial')}
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <NavbarLink
            icon={IconBook}
            modeTitle="study"
            label="勉強"
            onClick={() => setMode('study')}
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <NavbarLink
            icon={IconRun}
            modeTitle="fitness"
            label="運動"
            onClick={() => setMode('fitness')}
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <NavbarLink
            icon={IconCoffee}
            modeTitle="break"
            label="休憩"
            onClick={() => setMode('break')}
          />
        </Grid.Col>
      </Grid>
    </Footer>
  )
}
