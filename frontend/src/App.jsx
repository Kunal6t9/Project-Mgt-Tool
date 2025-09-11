import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Register from './features/auth/components/Register.jsx'
import Login from './features/auth/components/Login.jsx'
import VerifyOTP from './features/auth/components/VerifyOtp.jsx'
import ForgotPassword from './features/auth/components/ForgotPassword.jsx'
import ResetPassword from './features/auth/components/ResetPassword.jsx'
import Main from './components/MainPage.jsx'

const App = () => {
  //Add user and loading state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Start loading until check is complete

  //useEffect to check authentication status on initial load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // fetch request automatically sends the httpOnly cookie
        const response = await fetch('http://localhost:3000/api/user/me', {
          credentials: 'include', // sends the cookie
        });

        if (response.ok) {
          const data = await response.json();
          setIsAuthenticated(true);
          setUser(data.user);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false); // Stop loading once the check is done
      }
    };

    checkAuthStatus();
  }, []); // The empty array ensures this runs only once on mount

  //Show a loading indicator while we check the auth status
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login onLoginSuccess={() => setIsAuthenticated(true)} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* Note the URL param for the reset token */}
        <Route path="/password/reset/:token" element={<ResetPassword />} />

        {/* Protected Route */}
        <Route
          path="/main"
          element={
            isAuthenticated ? (
              <Main user={user} onLogout={() => setIsAuthenticated(false)} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Redirect root path */}
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/main" : "/login"} />}
        />
        
        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
