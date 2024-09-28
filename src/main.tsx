import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {ChakraProvider, extendTheme} from "@chakra-ui/react";
import {QueryClient, QueryClientProvider} from "react-query";


const colors = {
  'bold-blue': '#121E6C',
  'bold-red': '#EE424E',
  'bold-dark-gray': '#606060',
  'bold-light-gray': '#F3F3F3',
  'bold-background': '#F6F4F9',
}

const theme = extendTheme({
  colors,
  styles: {
    global: {
      'html, body': {
        background: 'bold-background',

      }
    }
  }
})

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ChakraProvider>
  </StrictMode>,
)
