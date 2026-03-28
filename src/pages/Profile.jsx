import { useNavigate } from 'react-router-dom';
import { User, Lock, LogOut, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getProfile, logout } from '../api';

const ProfileInfoRow = ({ label, value, isBadge }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
    <span style={{ fontSize: '14px', color: '#64748B' }}>{label}</span>
    {isBadge ? (
      <div style={{ 
        background: '#DBEAFE', color: '#2563EB', fontSize: '12px', 
        fontWeight: 500, padding: '4px 12px', borderRadius: '8px' 
      }}>
        {value}
      </div>
    ) : (
      <span style={{ fontSize: '14px', fontWeight: 500, color: '#0F172A' }}>{value}</span>
    )}
  </div>
);

const SectionHeader = ({ text }) => (
  <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A', margin: '24px 0 12px 0' }}>{text}</h2>
);

const StatItem = ({ value, label, color }) => (
  <div style={{ textAlign: 'center' }}>
    <div style={{ fontSize: '24px', fontWeight: 700, color }}>{value}</div>
    <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>{label}</div>
  </div>
);

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile()
      .then(data => setProfile(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const displayName = profile?.full_name || 'User';
  const displayEmail = profile?.email || '—';
  const displayRole = profile?.role || 'user';
  const roleLabel = displayRole === 'super_admin' ? 'Super Admin' 
                  : displayRole === 'admin' ? 'Admin' 
                  : 'Researcher';

  return (
    <div className="app-container" style={{ background: '#F8FAFC' }}>
      <div className="screen" style={{ padding: 0, maxWidth: '100%' }}>
        {/* Blue Header */}
        <div style={{ 
          background: '#2563EB', padding: '48px 24px', textAlign: 'center', color: 'white'
        }}>
          <div style={{ 
            width: '100px', height: '100px', background: 'white', borderRadius: '50%', 
            margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '50px'
          }}>
            👨‍🔬
          </div>
          {loading ? (
            <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0 }}>Loading...</p>
          ) : (
            <>
              <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>{displayName}</h1>
              <p style={{ fontSize: '14px', opacity: 0.8, margin: '4px 0 0 0' }}>{roleLabel}</p>
            </>
          )}
        </div>

        <div style={{ padding: '0 16px 100px 16px', maxWidth: '500px', margin: '0 auto' }}>
          <SectionHeader text="Personal Information" />
          <div className="card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ 
                width: '40px', height: '40px', borderRadius: '50%', background: '#DBEAFE', 
                display: 'flex', alignItems: 'center', justifyContent: 'center' 
              }}>
                <User size={24} color="#2563EB" />
              </div>
              <div style={{ marginLeft: '12px', flex: 1 }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#000', margin: 0 }}>Personal Details</h3>
                <p style={{ fontSize: '12px', color: 'gray', margin: 0 }}>View and edit your information</p>
              </div>
              <button 
                onClick={() => navigate('/edit-profile')}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <ChevronRight size={20} color="#CBD5E1" />
              </button>
            </div>

            <div style={{ height: '1px', background: '#F1F5F9', marginBottom: '8px' }} />
            
            <ProfileInfoRow label="Full Name" value={displayName} />
            <ProfileInfoRow label="Email" value={displayEmail} />
            <ProfileInfoRow label="Type of User" value={roleLabel} isBadge={true} />
          </div>

          <SectionHeader text="Security Settings" />
          <div 
            className="card" 
            style={{ padding: '16px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            onClick={() => navigate('/change-password')}
          >
            <div style={{ 
              width: '40px', height: '40px', borderRadius: '50%', background: '#F1F5F9', 
              display: 'flex', alignItems: 'center', justifyContent: 'center' 
            }}>
              <Lock size={20} color="#64748B" />
            </div>
            <div style={{ marginLeft: '12px', flex: 1 }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#000', margin: 0 }}>Change Password</h3>
              <p style={{ fontSize: '12px', color: 'gray', margin: 0 }}>Update your account password</p>
            </div>
            <ChevronRight size={20} color="#CBD5E1" />
          </div>

          <div style={{ height: '32px' }} />

          <button 
            className="btn" 
            style={{ 
              background: '#FEF2F2', color: '#EF4444', height: '56px', borderRadius: '12px',
              border: 'none', fontWeight: 700, display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '8px'
            }}
            onClick={handleLogout}
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
