import React from 'react'
import { AppShell } from '@mantine/core'
import { MainHeader } from './mainHeader'

const LandingPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppShell
      padding={0}
      navbar={<MainHeader />}
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
export default LandingPageLayout
