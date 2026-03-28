import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Info, AlertTriangle, Bell } from 'lucide-react';

const AlertItem = ({ title, subtitle, time, icon: Icon, iconColor, iconBg }) => (
  <div className="card" style={{ padding: '16px', marginBottom: '16px', borderRadius: '16px', display: 'flex', gap: '16px', border: 'none', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
    <div style={{ 
      width: '44px', 
      height: '44px', 
      borderRadius: '50%', 
      background: iconBg, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      flexShrink: 0
    }}>
      <Icon size={24} color={iconColor} />
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
        <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', margin: 0 }}>{title}</h4>
        <span style={{ fontSize: '12px', color: '#94A3B8' }}>{time}</span>
      </div>
      <p style={{ fontSize: '14px', color: '#64748B', margin: 0, lineHeight: '20px' }}>{subtitle}</p>
    </div>
  </div>
);

const ResearchAlerts = () => {
  const navigate = useNavigate();

  return (
    <div className="app-container" style={{ background: '#F8FAFC' }}>
      <div className="screen" style={{ padding: '0 0 100px 0' }}>
        {/* Header */}
        <div style={{ background: 'white', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', padding: '8px', cursor: 'pointer' }}>
              <ArrowLeft size={24} color="black" />
            </button>
            <div style={{ marginLeft: '12px' }}>
              <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Research Alerts</h1>
              <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>Stay updated with your research activities</p>
            </div>
          </div>
          <button style={{ background: 'none', border: 'none', color: '#3B82F6', fontWeight: 500, cursor: 'pointer' }}>
            Mark all read
          </button>
        </div>

        <div style={{ padding: '16px' }}>
          <AlertItem 
            title="Screening Complete"
            subtitle="Gold Nanoparticles Toxicity dataset has been successfully screened"
            time="2 hours ago"
            icon={CheckCircle}
            iconColor="#22C55E"
            iconBg="#DCFCE7"
          />
          <AlertItem 
            title="New Research Available"
            subtitle="15 new papers matching your criteria have been published"
            time="5 hours ago"
            icon={Info}
            iconColor="#3B82F6"
            iconBg="#DBEAFE"
          />
          <AlertItem 
            title="Review Required"
            subtitle="Silver NPs dataset needs manual verification for 8 papers"
            time="1 day ago"
            icon={AlertTriangle}
            iconColor="#EAB308"
            iconBg="#FEF9C3"
          />
          <AlertItem 
            title="Meta-Analysis Generated"
            subtitle="Your comprehensive report is ready for download"
            time="2 days ago"
            icon={CheckCircle}
            iconColor="#22C55E"
            iconBg="#DCFCE7"
          />
          <AlertItem 
            title="Collaboration Invite"
            subtitle="Dr. Johnson invited you to collaborate on TiO₂ research"
            time="3 days ago"
            icon={Bell}
            iconColor="#9333EA"
            iconBg="#F3E8FF"
          />

          <div style={{ height: '32px' }} />

          <button style={{ 
            width: '100%', 
            height: '56px', 
            borderRadius: '12px', 
            background: 'white',
            border: '1px solid #E2E8F0',
            color: '#334155',
            fontWeight: 700,
            fontSize: '16px',
            cursor: 'pointer'
          }}>
            Notification Settings
          </button>
          
          <div style={{ height: '24px' }} />
        </div>
      </div>
    </div>
  );
};

export default ResearchAlerts;
