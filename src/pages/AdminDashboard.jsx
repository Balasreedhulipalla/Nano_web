import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, Folder, CheckCircle, Timer, Upload,
  BrainCircuit, Bell, ChevronRight,
  TrendingUp, Clock
} from 'lucide-react';
import { getAdminDashboard, getUserInfo } from '../api';

const AdminStatCard = ({ icon: Icon, iconColor, value, label, badgeText }) => (
  <div className="card" style={{ flex: 1, height: '140px', display: 'flex', flexDirection: 'column' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div style={{
        width: '44px',
        height: '44px',
        borderRadius: '12px',
        background: `${iconColor}1A`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Icon size={24} style={{ color: iconColor }} />
      </div>
      {badgeText && (
        <div style={{
          background: '#FEF9C3',
          padding: '4px 8px',
          borderRadius: '8px',
          fontSize: '10px',
          fontWeight: 700,
          color: '#854D0E',
          lineHeight: '12px'
        }}>
          {badgeText}
        </div>
      )}
    </div>
    <div style={{ height: '12px' }} />
    <span style={{ fontSize: '28px', fontWeight: 700, color: '#1E293B' }}>{value}</span>
    <span style={{ fontSize: '12px', color: '#64748B' }}>{label}</span>
  </div>
);

const AdminActionCard = ({ title, subtitle, icon: Icon, iconColor, onClick }) => (
  <div className="card" onClick={onClick} style={{
    flex: 1,
    height: '160px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    cursor: 'pointer'
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      borderRadius: '10px',
      background: `${iconColor}1A`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '12px'
    }}>
      <Icon size={20} style={{ color: iconColor }} />
    </div>
    <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#1E293B', margin: '0 0 4px 0', lineHeight: '16px' }}>{title}</h4>
    <p style={{ fontSize: '11px', color: '#64748B', margin: 0, lineHeight: '14px' }}>{subtitle}</p>
  </div>
);

const ActivityItem = ({ name, action, time, initials, color, isLast }) => (
  <div style={{ padding: '12px 0' }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 700,
        fontSize: '14px',
        flexShrink: 0
      }}>
        {initials}
      </div>
      <div style={{ width: '16px' }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '14px' }}>
          <span style={{ fontWeight: 700, color: '#1E293B' }}>{name}</span>
          <span style={{ color: '#64748B' }}> {action}</span>
        </div>
        <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Clock size={12} /> {time}
        </div>
      </div>
    </div>
    {!isLast && <div style={{ height: '1px', background: '#F1F5F9', marginTop: '12px' }} />}
  </div>
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [userCount, setUserCount] = useState('--');
  const userInfo = getUserInfo();
  const userName = userInfo.full_name || userInfo.email?.split('@')[0] || 'Administrator';

  useEffect(() => {
    getAdminDashboard()
      .then(data => {
        if (data.users) setUserCount(data.users.length);
      })
      .catch(err => console.error("Failed to load user count:", err));
  }, []);

  return (
    <div className="screen">
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#1E293B', margin: '0 0 4px 0' }}>
          Welcome back, {userName}!
        </h1>
        <p style={{ fontSize: '16px', fontWeight: 500, color: '#64748B', margin: 0 }}>
          {userInfo.role === 'super_admin' ? 'Super Administrator' : 'Administrator'}
        </p>
        <p style={{ fontSize: '14px', color: '#94A3B8', margin: '2px 0 0 0' }}>
          Ready to analyze nanoparticle resistance patterns
        </p>
      </header>

      {/* Main Stats Row */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
        <AdminStatCard icon={Users} iconColor="#EC4899" value={userCount} label="Total Users" />
        <AdminStatCard icon={Folder} iconColor="#10B981" value="34" label="Active Projects" badgeText="12 Pending" />
      </div>

      {/* System Health Card */}
      <div className="card" style={{ display: 'flex', alignItems: 'center', padding: '16px', marginBottom: '32px' }}>
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '12px',
          background: '#A855F71A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <TrendingUp size={24} style={{ color: '#A855F7' }} />
        </div>
        <div style={{ width: '16px' }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#1E293B' }}>98%</div>
          <div style={{ fontSize: '14px', color: '#64748B' }}>System Health</div>
        </div>
        <div style={{
          background: '#DCFCE7',
          color: '#166534',
          fontSize: '12px',
          fontWeight: 500,
          padding: '4px 12px',
          borderRadius: '8px'
        }}>
          Optimal
        </div>
      </div>

      {/* Quick Actions */}
      <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1E293B', marginBottom: '16px' }}>
        Quick Actions
      </h2>
      <div className="dashboard-grid" style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <AdminActionCard title="User Management" subtitle="Manage system users" icon={Users} iconColor="#10B981" onClick={() => navigate('/user-management')} />
          <AdminActionCard title="New Dataset Screening" subtitle="Upload and screen data" icon={Upload} iconColor="var(--primary-blue)" onClick={() => navigate('/screening')} />
          <AdminActionCard title="Analytics" subtitle="View statistics" icon={BrainCircuit} iconColor="#8B5CF6" onClick={() => navigate('/system-analytics')} />
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <AdminActionCard title="Reports" subtitle="Generate reports" icon={Bell} iconColor="#3B82F6" onClick={() => navigate('/system-reports')} />
          <AdminActionCard title="Data Export" subtitle="Export system data" icon={Timer} iconColor="#F59E0B" onClick={() => navigate('/data-export')} />
          <AdminActionCard title="Approvals" subtitle="Review requests" icon={CheckCircle} iconColor="#EA580C" onClick={() => navigate('/pending-approvals')} />
        </div>
      </div>

      {/* Recent Activity */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1E293B', margin: 0 }}>
          Recent Activity
        </h2>
        <button style={{ background: 'none', border: 'none', color: '#DB2777', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}>
          View All
        </button>
      </div>
      <div className="card" style={{ padding: '16px' }}>
        <ActivityItem name="Dr. Sarah Chen" action="submitted new screening" time="2 min ago" initials="SC" color="#EC4899" isLast={false} />
        <ActivityItem name="Prof. Michael Brown" action="approved project review" time="15 min ago" initials="MB" color="#10B981" isLast={false} />
        <ActivityItem name="Dr. Emily Davis" action="uploaded 25 research papers" time="1 hour ago" initials="ED" color="#A855F7" isLast={false} />
        <ActivityItem name="Dr. John Martinez" action="completed meta-analysis" time="2 hours ago" initials="JM" color="#3B82F6" isLast={true} />
      </div>

      <div style={{ height: '40px' }} />
    </div>
  );
};

export default AdminDashboard;
