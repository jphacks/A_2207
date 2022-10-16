import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from '@mantine/core'
import { useState } from 'react'
import Layout from 'src/components/layout/mainLayout'

type AppProviderProps = {
  children: React.ReactNode
}

const AppProvider = ({ children }: AppProviderProps) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light')
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          colorScheme,
          fontFamily: 'Open Sans, sans serif',
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Layout>{children}</Layout>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}
export default AppProvider
