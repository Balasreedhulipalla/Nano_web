import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Info, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { login } from '../api';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const data = await login(email, password);
      const role = data.role;
      if (onLogin) onLogin(role);
      if (role === 'admin' || role === 'super_admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/researcher-dashboard');
      }
    } catch (err) {
      setError(err?.detail || err?.error || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container" style={{ background: 'white' }}>
      <div className="screen" style={{ padding: '24px' }}>
        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button 
              onClick={() => navigate(-1)} 
              style={{ background: 'none', border: 'none', padding: '8px', cursor: 'pointer' }}
            >
              <ArrowLeft size={24} color="black" />
            </button>
            <span style={{ fontSize: '18px', fontWeight: 700, marginLeft: '8px' }}>NanoMeta Tool</span>
          </div>
          <button style={{ background: 'none', border: 'none', padding: '8px', cursor: 'pointer' }}>
            <Info size={28} color="var(--text-primary)" />
          </button>
        </div>

        <div style={{ height: '60px' }} />

        {/* Lock Icon Container */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ 
            width: '100px', 
            height: '100px', 
            background: 'var(--primary-blue)', 
            borderRadius: '25px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: '0 15px 30px rgba(37, 99, 235, 0.3)'
          }}>
            <Lock size={40} color="white" />
          </div>
        </div>

        <div style={{ height: '32px' }} />

        {/* Welcome Text */}
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 700, margin: '0 0 8px 0' }}>Welcome Back</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', margin: 0 }}>
            Sign in to continue your research
          </p>
        </div>

        <div style={{ height: '40px' }} />

        {/* Error message */}
        {error && (
          <div style={{
            background: '#FEF2F2',
            border: '1px solid #FECACA',
            borderRadius: '10px',
            padding: '12px 16px',
            color: '#DC2626',
            fontSize: '14px',
            marginBottom: '16px'
          }}>
            {error}
          </div>
        )}

        {/* Input Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ position: 'relative' }}>
            <Mail 
              size={20} 
              style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--text-secondary)' }} 
            />
            <input 
              className="input-field" 
              placeholder="Email address" 
              type="email"
              style={{ paddingLeft: '48px', border: '1px solid #e2e8f0', background: 'white' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <Lock 
              size={20} 
              style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--text-secondary)' }} 
            />
            <input 
              className="input-field" 
              type={showPassword ? 'text' : 'password'} 
              placeholder="Password" 
              style={{ paddingLeft: '48px', border: '1px solid #e2e8f0', background: 'white' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
            <button 
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: '16px', top: '16px', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {showPassword ? <EyeOff size={20} color="var(--text-secondary)" /> : <Eye size={20} color="var(--text-secondary)" />}
            </button>
          </div>
        </div>

        {/* Forgot Password */}
        <div style={{ textAlign: 'right', marginTop: '4px' }}>
          <button style={{ background: 'none', border: 'none', color: 'var(--primary-blue)', fontWeight: 600, cursor: 'pointer' }}>
            Forgot password?
          </button>
        </div>

        <div style={{ height: '32px' }} />

        {/* Login Button */}
        <button 
          className="btn btn-primary" 
          style={{ height: '56px', borderRadius: '12px', opacity: loading ? 0.7 : 1 }}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Login'}
        </button>

        <div style={{ height: '24px' }} />

        {/* Sign Up Text */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Don't have an account?</span>
          <button 
            style={{ background: 'none', border: 'none', color: 'var(--primary-blue)', fontWeight: 700, cursor: 'pointer' }}
            onClick={() => navigate('/create-account')}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
