import React from 'react'
import { AppShell } from '@mantine/core'
import { MainNavbar } from './mainNavbar'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppShell
      padding={0}
      navbar={<MainNavbar />}
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
