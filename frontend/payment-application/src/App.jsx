import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Signup } from './Pages/Signup';
import { Signin } from './Pages/Signin';
import { Dashboard } from './Pages/Dashboard';
import { SendMoney } from './Pages/SendMoney';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/sendmoney' element={<SendMoney />} />
          <Route path="/" element={<Navigate to="/signin" />} />
          <Route path="*" element={<Navigate to="/signin" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
