import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AdminContextProvider from './context/adminContext.jsx'
import TrainerContextProvider from './context/TrainerContext.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AdminContextProvider>
      <TrainerContextProvider>
        <App />
      </TrainerContextProvider>
    </AdminContextProvider>
  </BrowserRouter>

)