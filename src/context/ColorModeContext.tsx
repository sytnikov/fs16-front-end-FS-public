import { ReactNode, createContext, useEffect, useMemo, useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material'
import { deepPurple, grey, deepOrange, blueGrey} from '@mui/material/colors'

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
})

type ColorModeProviderProps = {
  children: ReactNode
}
export type Theme = 'light' | 'dark'

export default function ColorModeProvider({
  children,
}: ColorModeProviderProps) {
  const [mode, setMode] = useState<Theme>('dark')
  
  useEffect(() => {
    const savedColorMode = localStorage.getItem('themeMode');
    if (savedColorMode) {
      setMode(savedColorMode as Theme);
    }
  }, []);
  
  const colorMode = {
      toggleColorMode: () => {
        // setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))

        const newMode = mode === 'dark' ? 'light' : 'dark';
        setMode(newMode);
        console.log('mode:', newMode)
        localStorage.setItem('themeMode', newMode);
        
      },
    }

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                // palette values for light mode
                primary: {
                  main: "#b0c4b1"
                },
                secondary: grey,
                divider: deepPurple[200],
                highlight: deepOrange[900],
                text: {
                  primary: grey[800],
                  secondary: grey[700],
                },
                typography: {
                  fontfamily: ['Poppins', 'sans-serif'].join(','),
                },
              }
            : {
                // palette values for dark mode
                primary: blueGrey,
                divider: deepOrange[700],
                highlight: '#ddf472',
                background: {
                  default: grey[900],
                  paper: grey[900],
                },
                text: {
                  primary: '#ffff',
                  secondary: grey[200],
                },
                typography: {
                  fontfamily: ['Poppins', 'sans-serif'].join(','),
                },
              }),
        },
      }),
    [mode]
  )

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  )
}
