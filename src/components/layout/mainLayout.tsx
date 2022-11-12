import React from 'react'
import { AppShell, ThemeIcon } from '@mantine/core'
import { useFullscreen, useMediaQuery } from '@mantine/hooks'
import { MainNavbar } from './mainNavbar'
import { MainFooter } from './mainFooter'
import { MainHeader } from './mainHeader'
import { IconMaximize, IconMinimize } from '@tabler/icons'
import { useState } from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const sm = useMediaQuery('(min-width: 576px)')
  const [expanded, setExpanded] = useState(false)
  const { toggle } = useFullscreen()
  return (
    <AppShell
      padding={0}
      navbar={sm ? <MainNavbar /> : <></>}
      footer={sm || expanded ? <></> : <MainFooter />}
      header={sm || expanded ? <></> : <MainHeader />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
      style={{
        position: 'fixed',
        left: '0px',
        right: '0px',
        top: '0px',
        bottom: '0px',
      }}
    >
      {!sm && (
        <div
          style={{
            position: 'absolute',
            zIndex: 100,
            top: '10px',
            right: '10px',
          }}
          onClick={() => setExpanded(!expanded)}
        >
          <ThemeIcon
            variant="light"
            radius="xl"
            size="xl"
            style={{
              backgroundColor: 'white',
              border: expanded ? '2px solid #339af0' : undefined,
            }}
            onClick={toggle}
          >
            {expanded ? <IconMinimize /> : <IconMaximize />}
          </ThemeIcon>
        </div>
      )}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      >
        {children}
      </div>
    </AppShell>
  )
}
export default Layout
