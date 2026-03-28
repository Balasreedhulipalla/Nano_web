import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const GrowthChart = () => (
  <div style={{ height: '200px', position: 'relative', marginTop: '20px' }}>
    <svg width="100%" height="100%" viewBox="0 0 400 200">
      {/* Grid lines */}
      {[0, 50, 100, 150].map(y => (
        <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#E2E8F0" strokeWidth="1" />
      ))}
      {/* Path */}
      <path 
        d="M 20,160 L 80,140 L 140,120 L 200,90 L 260,60 L 320,40 L 380,20" 
        fill="none" 
        stroke="#3B82F6" 
        strokeWidth="4" 
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Points */}
      {[
        {x: 20, y: 160}, {x: 80, y: 140}, {x: 140, y: 120}, 
        {x: 200, y: 90}, {x: 260, y: 60}, {x: 320, y: 40}, {x: 380, y: 20}
      ].map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="5" fill="white" stroke="#3B82F6" strokeWidth="2" />
      ))}
    </svg>
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 10px 0 10px' }}>
      {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"].map(m => (
        <span key={m} style={{ fontSize: '10px', color: '#94A3B8' }}>{m}</span>
      ))}
    </div>
  </div>
);

const ProjectsChart = () => (
  <div style={{ height: '200px', position: 'relative', marginTop: '20px' }}>
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '160px', padding: '0 10px' }}>
      {[30, 50, 70, 45, 85, 60, 95].map((h, i) => (
        <div key={i} style={{ 
          width: '24px', 
          height: `${h}%`, 
          background: 'linear-gradient(to top, #8B5CF6, #6D28D9)', 
          borderRadius: '4px 4px 0 0' 
        }} />
      ))}
    </div>
    <div style={{ height: '1px', background: '#E2E8F0' }} />
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 10px 0 10px' }}>
      {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"].map(m => (
        <span key={m} style={{ fontSize: '10px', color: '#94A3B8' }}>{m}</span>
      ))}
    </div>
  </div>
);

const AnalyticsCard = ({ title, children }) => (
  <div className="card" style={{ padding: '20px', borderRadius: '24px', marginBottom: '24px' }}>
    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1E293B', margin: 0 }}>{title}</h3>
    {children}
  </div>
);

const SystemAnalytics = () => {
  const navigate = useNavigate();

  return (
    <div className="app-container" style={{ background: '#F8FAFC' }}>
      <div className="screen" style={{ padding: '0 0 100px 0' }}>
        {/* Header */}
        <div style={{ background: '#F8FAFC', padding: '16px', display: 'flex', alignItems: 'center' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', padding: '8px', cursor: 'pointer' }}>
            <ArrowLeft size={24} color="#1E293B" />
          </button>
          <div style={{ marginLeft: '12px' }}>
            <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#1E293B', margin: 0 }}>System Analytics</h1>
            <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>Platform usage statistics</p>
          </div>
        </div>

        <div style={{ padding: '16px' }}>
          <AnalyticsCard title="User Growth">
            <GrowthChart />
          </AnalyticsCard>

          <AnalyticsCard title="Active Projects">
            <ProjectsChart />
          </AnalyticsCard>
          
          <div style={{ height: '32px' }} />
        </div>
      </div>
    </div>
  );
};

export default SystemAnalytics;
