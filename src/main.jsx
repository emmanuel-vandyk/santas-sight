import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()


import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
)