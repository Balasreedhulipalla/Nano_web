import { useNavigate } from 'react-router-dom';
import { 
  Folder, CheckCircle, Timer, Upload, 
  BrainCircuit, Bell, ChevronRight 
} from 'lucide-react';
import { getUserInfo } from '../api';

const StatCard = ({ icon: Icon, iconColor, value, label }) => (
  <div className="stat-card" style={{ flex: 1 }}>
    <Icon size={24} style={{ color: iconColor }} />
    <div style={{ height: '12px' }} />
    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
      <span style={{ fontSize: '32px', fontWeight: 700, color: 'var(--text-primary)' }}>{value}</span>
    </div>
    <span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 500 }}>{label}</span>
  </div>
);

const ActionCard = ({ title, subtitle, icon: Icon, iconBgColor, onClick }) => (
  <div className="card" onClick={onClick} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
    <div style={{ 
      width: '52px', 
      height: '52px', 
      borderRadius: '12px', 
      background: iconBgColor, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      flexShrink: 0
    }}>
      <Icon size={28} color="white" />
    </div>
    <div style={{ width: '16px' }} />
    <div style={{ flex: 1 }}>
      <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{title}</h3>
      <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>{subtitle}</p>
    </div>
  </div>
);

const ResearcherDashboard = () => {
  const navigate = useNavigate();
  const userInfo = getUserInfo();
  const userName = userInfo.full_name || userInfo.email?.split('@')[0] || 'Researcher';

  return (
    <div className="screen">
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#0F172A', margin: '0 0 8px 0' }}>
          Welcome back, {userName}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: '22px', margin: 0 }}>
          Your research command center for intelligent nanoparticle analysis
        </p>
      </header>

      {/* Summary Stats Grid */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
        <StatCard 
          icon={Folder} 
          iconColor="#0D9488" 
          value="24" 
          label="Total Datasets" 
        />
        <StatCard 
          icon={CheckCircle} 
          iconColor="#0D9488" 
          value="156" 
          label="Completed Screenings" 
        />
      </div>
      <div style={{ display: 'flex', width: 'calc(50% - 8px)', marginBottom: '32px' }}>
        <StatCard 
          icon={Timer} 
          iconColor="#0D9488" 
          value="342" 
          label="Hours Saved" 
        />
      </div>

      {/* Quick Actions */}
      <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', marginBottom: '16px' }}>
        Quick Actions
      </h2>

      <div className="dashboard-grid">
        <ActionCard 
          title="New Dataset Screening" 
          subtitle="Upload and screen research data" 
          icon={Upload} 
          iconBgColor="var(--primary-blue)" 
          onClick={() => navigate('/screening')} 
        />
        <ActionCard 
          title="Meta-Analysis" 
          subtitle="Run intelligent analysis" 
          icon={BrainCircuit} 
          iconBgColor="#0D9488" 
          onClick={() => navigate('/meta-analysis')} 
        />
        <ActionCard 
          title="Research Alerts" 
          subtitle="View notifications" 
          icon={Bell} 
          iconBgColor="#9333EA" 
          onClick={() => navigate('/research-alerts')} 
        />
      </div>

      <div style={{ height: '40px' }} />
    </div>
  );
};

export default ResearcherDashboard;
