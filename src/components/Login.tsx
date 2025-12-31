import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLock, FiLogIn, FiEye, FiEyeOff } from 'react-icons/fi';
import toast from 'react-hot-toast';
import './Login.css';

interface LoginProps {
  onLogin: (password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password) {
      setError('Please enter password');
      toast.error('Password required!');
      return;
    }

    // Check password (default: admin123)
    const correctPassword = 'admin123'; // You can change this
    
    if (password === correctPassword) {
      setError('');
      toast.success('Welcome back! 🎉');
      setTimeout(() => {
        onLogin(password);
        // Store auth token
        sessionStorage.setItem('dashboard_auth', 'authenticated');
      }, 500);
    } else {
      setError('Incorrect password!');
      toast.error('Access denied! ❌');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setPassword('');
    }
  };

  return (
    <motion.div 
      className="login-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className={`login-container ${isShaking ? 'shake' : ''}`}
        initial={{ scale: 0.8, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
      >
        <motion.div 
          className="login-icon"
          animate={{ rotate: [0, -5, 5, -5, 0] }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FiLock size={32} />
        </motion.div>
        
        <h2 className="login-title">Dashboard Access</h2>
        <p className="login-subtitle">Enter password to continue</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Enter password"
                className={`login-input ${error ? 'error' : ''}`}
                autoFocus
              />
              <motion.button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </motion.button>
            </div>
            <AnimatePresence>
              {error && (
                <motion.span 
                  className="error-message"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {error}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <motion.button 
            type="submit" 
            className="btn btn-primary btn-block"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiLogIn size={20} />
            Unlock Dashboard
          </motion.button>
        </form>

        {/* Password hint removed for security */}
      </motion.div>
    </motion.div>
  );
};

export default Login;
