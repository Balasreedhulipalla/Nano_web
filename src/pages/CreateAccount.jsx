import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Info, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { register } from '../api';

const CreateAccount = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (!fullName || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await register(fullName, email, password);
      navigate('/login');
    } catch (err) {
      const msg = err?.email?.[0] || err?.password?.[0] || err?.detail || 'Registration failed. Try again.';
      setError(msg);
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

        <div style={{ height: '40px' }} />

        {/* Profile Icon Container */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ 
            width: '100px', 
            height: '100px', 
            background: '#06B6D4', 
            borderRadius: '25px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: '0 15px 30px rgba(6, 182, 212, 0.3)'
          }}>
            <User size={50} color="white" />
          </div>
        </div>

        <div style={{ height: '32px' }} />

        {/* Create Account Text */}
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 700, margin: '0 0 8px 0' }}>Create Account</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', margin: 0 }}>
            Join us to start your research journey
          </p>
        </div>

        <div style={{ height: '32px' }} />

        {/* Input Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ position: 'relative' }}>
            <User 
              size={20} 
              style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--text-secondary)' }} 
            />
            <input 
              className="input-field" 
              placeholder="Full name" 
              style={{ paddingLeft: '48px', border: '1px solid #e2e8f0', background: 'white' }}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <Mail 
              size={20} 
              style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--text-secondary)' }} 
            />
            <input 
              className="input-field" 
              placeholder="Email address" 
              style={{ paddingLeft: '48px', border: '1px solid #e2e8f0', background: 'white' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            />
            <button 
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: '16px', top: '16px', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <Info size={20} color="var(--text-secondary)" />
            </button>
          </div>

          <div style={{ position: 'relative' }}>
            <Lock 
              size={20} 
              style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--text-secondary)' }} 
            />
            <input 
              className="input-field" 
              type={showPassword ? 'text' : 'password'} 
              placeholder="Confirm password" 
              style={{ paddingLeft: '48px', border: '1px solid #e2e8f0', background: 'white' }}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button 
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: '16px', top: '16px', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <Info size={20} color="var(--text-secondary)" />
            </button>
          </div>
        </div>

        {error && (
          <div style={{
            background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '10px',
            padding: '12px 16px', color: '#DC2626', fontSize: '14px', marginTop: '12px'
          }}>
            {error}
          </div>
        )}
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', textAlign: 'center', margin: '16px 0', padding: '0 16px' }}>
          By signing up, you agree to our Terms of Service and Privacy Policy
        </p>

        <div style={{ height: '32px' }} />

        {/* Create Account Button */}
        <button 
          className="btn btn-primary" 
          style={{ height: '56px', borderRadius: '12px', opacity: loading ? 0.7 : 1 }}
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>

        <div style={{ height: '24px' }} />

        {/* Login Text */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Already have an account?</span>
          <button 
            style={{ background: 'none', border: 'none', color: 'var(--primary-blue)', fontWeight: 700, cursor: 'pointer' }}
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
