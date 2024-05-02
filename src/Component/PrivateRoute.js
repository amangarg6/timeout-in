import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

function PrivateRoute() {
    const navigate = useNavigate();

    useEffect(() => {
      const userdetails = localStorage.getItem('userData');
  
      if (!userdetails) {      
        localStorage.removeItem('userData');
        navigate('/login');
      }
    }, [navigate]);
  
    return <Outlet />;
  }
  
export default PrivateRoute