import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Navigation from './components/Navigation';
import Portfolio from './components/Portfolio';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState<'portfolio' | 'dashboard'>('portfolio');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is already authenticated
  useEffect(() => {
    const authToken = sessionStorage.getItem('dashboard_auth');
    if (authToken === 'authenticated') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (_password: string) => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('dashboard_auth');
    setCurrentPage('portfolio');
  };

  const handleNavigate = (page: 'portfolio' | 'dashboard') => {
    if (page === 'dashboard' && !isAuthenticated) {
      // Show login screen if trying to access dashboard without auth
      setCurrentPage('dashboard');
    } else {
      setCurrentPage(page);
    }
  };

  return (
    <div className="app">
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#0f172a',
            fontFamily: '"Fira Code", monospace',
            fontWeight: 600,
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
          },
          success: {
            iconTheme: {
              primary: '#6366f1',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />

      <Navigation 
        currentPage={currentPage} 
        onNavigate={handleNavigate}
      />
      
      <main className="main-content">
        {currentPage === 'portfolio' ? (
          <Portfolio />
        ) : (
          <>
            {!isAuthenticated ? (
              <Login onLogin={handleLogin} />
            ) : (
              <>
                <Dashboard />
                {/* Logout button */}
                <button 
                  onClick={handleLogout}
                  className="logout-btn"
                  title="Logout from Dashboard"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  Logout
                </button>
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
