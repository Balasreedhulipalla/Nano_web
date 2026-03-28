import { useNavigate } from 'react-router-dom';
import { Search, Settings } from 'lucide-react';
import { useState } from 'react';

const RoleCard = ({ title, description1, description2, icon: Icon, isSelected, onClick }) => (
  <div 
    className="card" 
    onClick={onClick} 
    style={{ 
      cursor: 'pointer', 
      display: 'flex', 
      alignItems: 'center',
      border: isSelected ? '2px solid var(--button-end)' : '1px solid #E2E8F0',
      boxShadow: isSelected ? '0 4px 12px rgba(59, 130, 246, 0.2)' : 'none',
      borderRadius: '20px',
      padding: '20px'
    }}
  >
    <div style={{ 
      width: '56px', 
      height: '56px', 
      borderRadius: '12px', 
      background: '#F1F5F9', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      flexShrink: 0
    }}>
      <Icon size={28} color="#475569" />
    </div>
    <div style={{ width: '20px' }} />
    <div style={{ flex: 1 }}>
      <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1E293B', margin: 0 }}>{title}</h3>
      <p style={{ fontSize: '14px', color: '#64748B', margin: '4px 0 0 0' }}>{description1}</p>
      <p style={{ fontSize: '12px', color: '#94A3B8', margin: '2px 0 0 0' }}>{description2}</p>
    </div>
  </div>
);

const SelectRole = ({ onRoleSelect }) => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);

  const handleEnterDashboard = () => {
    if (selectedRole) {
      onRoleSelect(selectedRole);
      navigate(selectedRole === 'Admin' ? '/admin-dashboard' : '/researcher-dashboard');
    }
  };

  return (
    <div className="app-container" style={{ background: 'white' }}>
      <div className="screen" style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <div style={{ height: '40px' }} />

        <h1 style={{ fontSize: '32px', fontWeight: 700, color: '#1E293B', margin: 0, textAlign: 'center' }}>
          Select Your Role
        </h1>

        <p style={{ color: '#64748B', fontSize: '16px', marginTop: '8px', textAlign: 'center' }}>
          Choose how you'll use the platform
        </p>

        <div style={{ height: '48px' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <RoleCard 
            title="Researcher" 
            description1="Screen nanoparticle studies" 
            description2="Perform meta-analysis" 
            icon={Search} 
            isSelected={selectedRole === 'Researcher'}
            onClick={() => setSelectedRole('Researcher')}
          />

          <RoleCard 
            title="Admin" 
            description1="Manage users" 
            description2="Oversee data screening" 
            icon={Settings} 
            isSelected={selectedRole === 'Admin'}
            onClick={() => setSelectedRole('Admin')}
          />
        </div>

        <div style={{ flex: 1 }} />

        {/* Enter Dashboard Button */}
        <button 
          className="btn" 
          disabled={!selectedRole}
          style={{ 
            height: '56px', 
            borderRadius: '12px',
            background: selectedRole 
              ? 'linear-gradient(to right, var(--button-start), var(--button-end))' 
              : '#E2E8F0',
            color: selectedRole ? 'white' : '#94A3B8',
            boxShadow: selectedRole ? '0 8px 16px rgba(59, 130, 246, 0.3)' : 'none',
            fontSize: '18px',
            fontWeight: 700
          }}
          onClick={handleEnterDashboard}
        >
          Enter Dashboard
        </button>
        <div style={{ height: '24px' }} />
      </div>
    </div>
  );
};

export default SelectRole;
