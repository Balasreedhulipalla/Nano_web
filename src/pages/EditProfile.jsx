import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Save } from 'lucide-react';
import { getProfile, editProfile } from '../api';

const EditProfile = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    getProfile()
      .then(data => {
        setFullName(data.full_name || '');
        setEmail(data.email || '');
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    if (!fullName) {
      setError('Full name is required.');
      return;
    }
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      await editProfile({ full_name: fullName, email });
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError(err?.email?.[0] || err?.detail || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="app-container" style={{ background: '#F8FAFC' }}>
      <div className="screen" style={{ padding: '0 0 100px 0' }}>
        {/* Header */}
        <div style={{ background: 'white', padding: '16px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #E2E8F0' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', padding: '8px', cursor: 'pointer' }}>
            <ArrowLeft size={24} color="#0F172A" />
          </button>
          <div style={{ marginLeft: '12px' }}>
            <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Edit Profile</h1>
            <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>Update your personal information</p>
          </div>
        </div>

        <div style={{ padding: '16px' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px', color: '#64748B' }}>Loading...</div>
          ) : (
            <>
              {/* Avatar */}
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px', marginTop: '24px' }}>
                <div style={{
                  width: '100px', height: '100px', borderRadius: '50%',
                  background: '#2563EB', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '40px', color: 'white',
                  boxShadow: '0 8px 24px rgba(37, 99, 235, 0.3)'
                }}>
                  👨‍🔬
                </div>
              </div>

              {/* Form */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '14px', color: '#64748B', display: 'block', marginBottom: '6px', fontWeight: 500 }}>
                    Full Name
                  </label>
                  <div style={{ position: 'relative' }}>
                    <User size={18} style={{ position: 'absolute', left: '14px', top: '17px', color: '#94A3B8' }} />
                    <input
                      className="input-field"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                      style={{ paddingLeft: '44px', border: '1px solid #E2E8F0', background: 'white' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '14px', color: '#64748B', display: 'block', marginBottom: '6px', fontWeight: 500 }}>
                    Email Address
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={18} style={{ position: 'absolute', left: '14px', top: '17px', color: '#94A3B8' }} />
                    <input
                      className="input-field"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="Enter email"
                      type="email"
                      style={{ paddingLeft: '44px', border: '1px solid #E2E8F0', background: 'white' }}
                    />
                  </div>
                </div>
              </div>

              {error && (
                <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '10px', padding: '12px 16px', color: '#DC2626', fontSize: '14px', marginTop: '16px' }}>
                  {error}
                </div>
              )}
              {success && (
                <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '10px', padding: '12px 16px', color: '#166534', fontSize: '14px', marginTop: '16px' }}>
                  {success}
                </div>
              )}

              <div style={{ height: '32px' }} />

              <button
                className="btn btn-primary"
                style={{ height: '56px', borderRadius: '12px', opacity: saving ? 0.7 : 1, gap: '8px' }}
                onClick={handleSave}
                disabled={saving}
              >
                <Save size={20} />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
