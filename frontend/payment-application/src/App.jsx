import { HashRouter, Routes, Route, , HashRouterNavigate } from 'react-router-dom'
import { Signup } from './Pages/Signup'
import { Signin } from './Pages/Signin'
import { Dashboard } from './Pages/Dashboard'


function App() {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path="/" element={<Navigate to="/signin" />} />
          <Route path="*" element={<Navigate to="/signin" />} />
        </Routes>
      </HashRouter>
    </div>
  )
}



export default App
