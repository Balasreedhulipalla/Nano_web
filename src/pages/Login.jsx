import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Info, Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import { login } from '../api';

// Import logos
import simatsLogo from '../assets/simats_logo.png';
import molecularLogo from '../assets/molecular_node_logo.png';
import sesLogo from '../assets/ses_logo.png';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    <div className="login-wrapper" style={{ 
      minHeight: '100vh', 
      background: '#0D0F12', // Slightly dark charcoal/black
      color: 'white', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      padding: '16px',
      fontFamily: "'Inter', system-ui, sans-serif"
    }}>
      <div className="login-container" style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', height: '100%' }}>
        
        {/* Header Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', marginBottom: '60px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button 
              onClick={() => navigate(-1)} 
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white', display: 'flex', alignItems: 'center' }}
            >
              <ArrowLeft size={24} strokeWidth={2} />
            </button>
            <span style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '0.3px' }}>NanoMeta Tool</span>
          </div>
          <div style={{ 
            width: '32px', 
            height: '32px', 
            borderRadius: '50%', 
            background: '#ffffff', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            cursor: 'help'
          }}>
            <span style={{ color: 'black', fontWeight: 'bold', fontSize: '18px' }}>i</span>
          </div>
        </div>

        {/* Logos Display */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '50px', alignItems: 'center' }}>
          <div style={{ width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white', borderRadius: '4px', overflow: 'hidden' }}>
            <img src={simatsLogo} alt="SIMATS" style={{ width: '90%', height: '90%', objectFit: 'contain' }} />
          </div>
          <div style={{ width: '82px', height: '82px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white', borderRadius: '12px', overflow: 'hidden' }}>
            <img src={molecularLogo} alt="Molecular" style={{ width: '85%', height: '85%', objectFit: 'contain' }} />
          </div>
          <div style={{ width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white', borderRadius: '4px', overflow: 'hidden' }}>
            <img src={sesLogo} alt="SES" style={{ width: '90%', height: '90%', objectFit: 'contain' }} />
          </div>
        </div>

        {/* Welcome Section */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 700, margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>Welcome Back</h1>
          <p style={{ color: '#94A3B8', fontSize: '16px', fontWeight: 500 }}>Sign in to your research portal</p>
        </div>

        {/* Errors */}
        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: '12px',
            padding: '14px',
            color: '#F87171',
            fontSize: '14px',
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        {/* Login Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center' }}>
              <Mail size={22} color="#CBD5E1" strokeWidth={1.5} />
            </div>
            <input 
              placeholder="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                height: '64px',
                background: 'transparent',
                border: '1px solid #334155',
                borderRadius: '18px',
                padding: '0 24px 0 60px',
                color: 'white',
                fontSize: '17px',
                outline: 'none',
                transition: 'border-color 0.2s',
                '::placeholder': { color: '#64748B' }
              }}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center' }}>
              <Lock size={22} color="#CBD5E1" strokeWidth={1.5} />
            </div>
            <input 
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                height: '64px',
                background: 'transparent',
                border: '1px solid #334155',
                borderRadius: '18px',
                padding: '0 60px 0 60px',
                color: 'white',
                fontSize: '17px',
                outline: 'none'
              }}
            />
            <div style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', opacity: 0.6 }}>
              <Lock size={18} color="#CBD5E1" strokeWidth={2} />
            </div>
          </div>
        </div>

        {/* Forgot Password Link */}
        <div style={{ textAlign: 'right', marginTop: '12px', marginBottom: '40px' }}>
          <button 
            style={{ background: 'none', border: 'none', color: '#88aaff', fontWeight: 600, cursor: 'pointer', fontSize: '15px' }}
            onClick={() => navigate('/change-password')}
          >
            Forgot password?
          </button>
        </div>

        {/* Login Button */}
        <button 
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: '100%',
            height: '64px',
            borderRadius: '20px',
            background: '#A5C4FF', // Light blue from screenshot
            color: '#0F172A',
            border: 'none',
            fontSize: '19px',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            opacity: loading ? 0.7 : 1,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          }}
        >
          {loading ? 'Signing in...' : 'Login'}
        </button>

        {/* Footer Links */}
        <div style={{ textAlign: 'center', marginTop: '36px' }}>
          <span style={{ color: '#94A3B8', fontSize: '16px' }}>Don't have an account? </span>
          <button 
            style={{ background: 'none', border: 'none', color: '#88aaff', fontWeight: 600, cursor: 'pointer', fontSize: '16px' }}
            onClick={() => navigate('/create-account')}
          >
            Sign up
          </button>
        </div>

        {/* Bottom Attribution */}
        <div style={{ marginTop: 'auto', textAlign: 'center', paddingTop: '60px', paddingBottom: '20px' }}>
          <p style={{ color: '#475569', fontSize: '14px', fontWeight: 600, letterSpacing: '0.2px' }}>
            Powered by SIMATS Engineering
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

