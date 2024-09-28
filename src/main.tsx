import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {ChakraProvider} from "@chakra-ui/react";
import {QueryClient, QueryClientProvider} from "react-query";
import {theme} from "./theme/theme.ts";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,  // Los datos serán frescos por 5 minutos
      cacheTime: Infinity,  // Mantén los datos en caché indefinidamente
      retry: 2,  // Intentar máximo 2 veces en caso de error
      refetchOnWindowFocus: false,  // No hacer refetch cuando se cambia de ventana
      refetchOnMount: false,  // No volver a hacer fetch cuando el componente se monta de nuevo
      refetchInterval: false,  // No volver a hacer fetch de manera periódica
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ChakraProvider>
  </StrictMode>,
)
