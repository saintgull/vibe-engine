import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import VibesPage from './pages/VibesPage';
import VibeDetailPage from './pages/VibeDetailPage';
import CreateVibePage from './pages/CreateVibePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserProfile(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        // Invalid token
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
    </div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} onLogout={logout} />
      <main className="flex-grow container py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vibes" element={<VibesPage />} />
          <Route path="/vibes/:id" element={<VibeDetailPage />} />
          <Route 
            path="/create-vibe" 
            element={user ? <CreateVibePage /> : <LoginPage onLogin={login} />} 
          />
          <Route 
            path="/login" 
            element={<LoginPage onLogin={login} />} 
          />
          <Route 
            path="/register" 
            element={<RegisterPage onRegister={login} />} 
          />
          <Route 
            path="/profile" 
            element={user ? <ProfilePage user={user} /> : <LoginPage onLogin={login} />} 
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;