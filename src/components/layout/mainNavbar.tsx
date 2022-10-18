import {
  Navbar,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
  Center,
} from '@mantine/core'
import { TablerIcon, IconHome2, IconRun, IconBook } from '@tabler/icons'
import { useState } from 'react'
import { IconInfo } from './mainIconInfo'
import { IconConfig } from './mainIconConfig'
import { useSettingsStore } from 'src/stores/settingsStore'
import shallow from 'zustand/shallow'
import Signin from '../firebase/Signin'
import SignOut from '../firebase/SignOut'
import { auth } from "../firebase/firebase"
import { useAuthState } from "react-firebase-hooks/auth"

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
    <Tooltip label={label} position="right" transitionDuration={0}>
      <UnstyledButton
        component="a"
        onClick={onClick}
        className={cx(classes.link, {
          [classes.active]: mode === modeTitle,
        })}
      >
        <Icon stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  )
}

export function MainNavbar() {
  const { setMode } = useSettingsStore(
    (state) => ({
      setMode: state.setMode,
    }),
    shallow,
  )
  const [infoOpened, setInfoOpened] = useState(false)
  const [configOpened, setConfigOpened] = useState(false)

  const [user] = useAuthState(auth);

  return (
    <Navbar width={{ base: 80 }} p="md">
      <Center>Logo</Center>
      {/* <Navbar.Section grow mt={50}> */}
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={0}>
          <NavbarLink
            icon={IconHome2}
            modeTitle="initial"
            label="Home"
            onClick={() => setMode('initial')}
          />
          <NavbarLink
            icon={IconBook}
            modeTitle="study"
            label="study"
            onClick={() => setMode('study')}
          />
          <NavbarLink
            icon={IconRun}
            modeTitle="fitness"
            label="fitness"
            onClick={() => setMode('fitness')}
          />
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={10}>
          {user ? <SignOut /> : <Signin />}
          <IconConfig opened={configOpened} setOpened={setConfigOpened} />
          <IconInfo opened={infoOpened} setOpened={setInfoOpened} />
        </Stack>
      </Navbar.Section>
    </Navbar>
  )
}
