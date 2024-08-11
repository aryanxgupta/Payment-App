import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Signup } from './Pages/Signup'
import { Signin } from './Pages/Signin'
import { Dashboard } from './Pages/Dashboard'
import { SendMoney } from './Pages/SendMoney'


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/sendmoney' element={<SendMoney />} />
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="*" element={<Navigate to="/signup" />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}



export default App
