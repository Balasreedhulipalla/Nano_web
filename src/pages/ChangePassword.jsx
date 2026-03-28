import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, Eye, EyeOff, Check } from 'lucide-react';

const PasswordInputField = ({ label, value, onChange }) => {
  const [visible, setVisible] = useState(false);
  
  return (
    <div className="card" style={{ padding: '16px', marginBottom: '16px', borderRadius: '16px' }}>
      <label style={{ fontSize: '14px', color: '#64748B', display: 'block', marginBottom: '8px' }}>{label}</label>
      <div style={{ position: 'relative' }}>
        <Lock 
          size={20} 
          color="#CBD5E1" 
          style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} 
        />
        <input 
          type={visible ? "text" : "password"}
          className="input-field" 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Enter ${label.toLowerCase()}`}
          style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', paddingLeft: '44px', paddingRight: '44px' }}
        />
        <button 
          onClick={() => setVisible(!visible)}
          style={{ 
            position: 'absolute', 
            right: '12px', 
            top: '50%', 
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {visible ? <Eye size={20} color="#CBD5E1" /> : <EyeOff size={20} color="#CBD5E1" />}
        </button>
      </div>
    </div>
  );
};

const RequirementRow = ({ text }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '8px 0' }}>
    <Check size={16} color="#CBD5E1" />
    <span style={{ fontSize: '14px', color: '#64748B' }}>{text}</span>
  </div>
);

const ChangePassword = () => {
  const navigate = useNavigate();
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');

  return (
    <div className="app-container" style={{ background: '#F8FAFC' }}>
      <div className="screen" style={{ padding: '0 0 100px 0' }}>
        {/* Header */}
        <div style={{ background: 'white', padding: '16px', display: 'flex', alignItems: 'center' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', padding: '8px', cursor: 'pointer' }}>
            <ArrowLeft size={24} color="black" />
          </button>
          <div style={{ marginLeft: '12px' }}>
            <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Change Password</h1>
            <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>Update your account password</p>
          </div>
        </div>

        <div style={{ padding: '16px' }}>
          <PasswordInputField label="Current Password" value={currentPwd} onChange={setCurrentPwd} />
          <PasswordInputField label="New Password" value={newPwd} onChange={setNewPwd} />
          <PasswordInputField label="Confirm New Password" value={confirmPwd} onChange={setConfirmPwd} />

          <div style={{ height: '24px' }} />

          {/* Requirements Card */}
          <div className="card" style={{ padding: '16px', borderRadius: '16px', background: '#F0F7FF', border: 'none' }}>
            <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', margin: '0 0 12px 0' }}>Password Requirements</h4>
            <RequirementRow text="At least 8 characters long" />
            <RequirementRow text="One uppercase letter" />
            <RequirementRow text="One lowercase letter" />
            <RequirementRow text="One number" />
            <RequirementRow text="One special character (!@#$%^&*)" />
          </div>

          <div style={{ height: '32px' }} />

          <button 
            style={{ 
              width: '100%', 
              height: '56px', 
              borderRadius: '12px', 
              background: '#2563EB',
              border: 'none',
              color: 'white',
              fontWeight: 700,
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Update Password
          </button>

          <button 
            onClick={() => navigate(-1)}
            style={{ 
              width: '100%', 
              height: '56px', 
              borderRadius: '12px', 
              background: 'white',
              border: '1px solid #E2E8F0',
              color: '#64748B',
              fontWeight: 700,
              fontSize: '16px',
              marginTop: '12px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
          
          <div style={{ height: '24px' }} />
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
