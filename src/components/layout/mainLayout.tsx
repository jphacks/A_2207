import React from 'react'
import { AppShell } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { MainNavbar } from './mainNavbar'
import { MainFooter } from './mainFooter'
import { MainHeader } from './mainHeader'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const matches = useMediaQuery('(min-width: 576px)')
  return (
    <AppShell
      padding={0}
      navbar={matches ? <MainNavbar /> : <></>}
      footer={matches ? <></> : <MainFooter />}
      header={matches ? <></> : <MainHeader />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  )
}
export default Layout
