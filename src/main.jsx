import React from 'react'
import { createRoot } from 'react-dom/client'
import router from './Routes/Routes'
import { RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<HelmetProvider>
      <RouterProvider router={router} />

  </HelmetProvider>  
  </React.StrictMode>,
)
