import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import './index.css'
import App from './app/App.tsx'
import { Provider as JotaiProvider } from 'jotai';
import { createTheme, MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { NavigationProgress } from '@mantine/nprogress';
import { Notifications } from '@mantine/notifications';


const theme = createTheme({});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <JotaiProvider>
      <MantineProvider theme={theme} >
        <NavigationProgress />
        <Notifications />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MantineProvider >
    </JotaiProvider>
  </StrictMode>,
)
