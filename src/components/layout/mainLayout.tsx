import React from 'react'
import { AppShell } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { MainNavbar } from './mainNavbar'
import { MainFooter } from './mainFooter'
import { MainHeader } from './mainHeader'
import { IconArrowsMaximize, IconArrowsMinimize } from '@tabler/icons'
import { useState } from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const sm = useMediaQuery('(min-width: 576px)')
  const [expanded, setExpanded] = useState(false)
  return (
    <AppShell
      padding={0}
      navbar={sm ? <MainNavbar /> : <></>}
      footer={(sm || expanded) ? <></> : <MainFooter />}
      header={(sm || expanded) ? <></> : <MainHeader />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {!sm &&
        <div
          style={{
            position: 'absolute',
            zIndex: 100,
            top: '2.5%',
            right: '2%',
          }}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ?
            <IconArrowsMinimize color='gray' />
            :
            <IconArrowsMaximize color='gray' />
          }
        </div>
 
      }
      {children}
    </AppShell>
  )
}
export default Layout
