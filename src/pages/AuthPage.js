import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import './AuthPage.css';

const AuthPage = ({ mode = 'login' }) => {
  const { user, login, register } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState(mode); // 'login' | 'signup'
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setActiveTab(mode);
  }, [mode]);

  useEffect(() => {
    if (user) {
      const redirectTo = location.state?.from || '/dashboard';
      navigate(redirectTo, { replace: true });
    }
  }, [user, location.state, navigate]);

  const handleChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result =
        activeTab === 'login'
          ? await login(formData.email, formData.password)
          : await register(formData.name, formData.email, formData.password);

      if (result.success) {
        toast.success(activeTab === 'login' ? 'Login successful!' : 'Account created!');
        // redirect handled by user effect
      } else {
        toast.error(result.message || 'Operation failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="container auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>{activeTab === 'login' ? 'Welcome back' : 'Create your account'}</h1>
            <p className="auth-subtitle">
              {activeTab === 'login'
                ? 'Login to save your downloads to your dashboard.'
                : 'Sign up to save your download history and access it anytime.'}
            </p>
          </div>

          <div className="auth-tabs">
            <Link className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`} to="/login">
              Login
            </Link>
            <Link className={`auth-tab ${activeTab === 'signup' ? 'active' : ''}`} to="/signup">
              Sign up
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="auth-form-page">
            {activeTab === 'signup' && (
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
              </div>
            )}

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                placeholder="At least 6 characters"
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? 'Please wait...' : activeTab === 'login' ? 'Login' : 'Create account'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              {activeTab === 'login' ? (
                <>
                  Don’t have an account? <Link to="/signup">Sign up</Link>
                </>
              ) : (
                <>
                  Already have an account? <Link to="/login">Login</Link>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

