import logo from './logo.svg';
import './App.css';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './Component/Navbar';
import Home from './Component/Home';
import Login from './Component/Login';
import Register from './Component/Register';
import PrivateRoute from './Component/PrivateRoute';
import Punch from './Component/Punch';
import Status from './Component/Status';
import Leave from './Component/Leave';
import Calendar from './Component/Calndar';

function App() {
  const location = useLocation();
  const pathname = location.pathname;
  const userData = localStorage.getItem('userData');
  const user = userData ? JSON.parse(userData) : null;
  return (
    <div>

      {pathname !== '/' && pathname !== '/register' && pathname !== '/login' && <Navbar />}

      <Routes>
        <Route path="/app" element={<PrivateRoute />}>
          <Route path="/app/home" element={<Home />} />
          <Route path="/app/punch" element={<Punch />} />
          <Route path="/app/status" element={<Status />} />
          <Route path="/app/leave" element={<Leave />} />
          <Route path="/app/calendar" element={<Calendar/>}/>
        </Route>
        {/* public routes */}
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
  </div>
  );
}

export default App;
