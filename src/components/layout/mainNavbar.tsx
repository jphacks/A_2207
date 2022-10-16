import {
  Navbar,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
  Center,
} from '@mantine/core'
import { TablerIcon, IconHome2 } from '@tabler/icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { IconInfo } from './mainIconInfo'
import { IconConfig } from './mainIconConfig'

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
  href: string
  onClick?(): void
}

function NavbarLink({ icon: Icon, label, href, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles()
  const router = useRouter()

  return (
    <Tooltip label={label} position="right" transitionDuration={0}>
      <Link href={href} passHref>
        <UnstyledButton
          component="a"
          onClick={onClick}
          className={cx(classes.link, {
            [classes.active]: router.pathname === href,
          })}
        >
          <Icon stroke={1.5} />
        </UnstyledButton>
      </Link>
    </Tooltip>
  )
}

export function MainNavbar() {
  const [infoOpened, setInfoOpened] = useState(false)
  const [configOpened, setConfigOpened] = useState(false)

  return (
    <Navbar width={{ base: 80 }} p="md">
      <Center>Logo</Center>
      {/* <Navbar.Section grow mt={50}> */}
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={0}>
          <NavbarLink icon={IconHome2} href="/" label="Home" />
          <IconConfig opened={configOpened} setOpened={setConfigOpened} />
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          <IconInfo opened={infoOpened} setOpened={setInfoOpened} />
        </Stack>
      </Navbar.Section>
    </Navbar>
  )
}
