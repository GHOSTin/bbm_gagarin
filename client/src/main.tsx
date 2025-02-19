import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@mantine/core/styles.css';
import './index.css'
import App from './app/App.tsx'
import { Provider as JotaiProvider } from 'jotai'
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({

});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <JotaiProvider>
      <MantineProvider theme={theme} >
        <App />
      </MantineProvider >
    </JotaiProvider>
  </StrictMode>,
)
