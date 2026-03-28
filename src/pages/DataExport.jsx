import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Database, FileText, Download } from 'lucide-react';

const ExportOptionItem = ({ title, subtitle, icon: Icon }) => (
  <div className="card" style={{ padding: '20px', marginBottom: '16px', display: 'flex', alignItems: 'center', borderRadius: '20px' }}>
    <div style={{ 
      width: '60px', 
      height: '60px', 
      borderRadius: '16px', 
      background: 'linear-gradient(to bottom, #818CF8, #6366F1)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      flexShrink: 0
    }}>
      <Icon size={28} color="white" />
    </div>
    <div style={{ width: '20px' }} />
    <div style={{ flex: 1 }}>
      <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#1E293B', margin: 0 }}>{title}</h4>
      <p style={{ fontSize: '12px', color: '#64748B', margin: '2px 0 0 0' }}>{subtitle}</p>
    </div>
    <button style={{ 
      width: '44px', 
      height: '44px', 
      borderRadius: '12px', 
      background: '#EFF6FF', 
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer'
    }}>
      <Download size={22} color="#3B82F6" />
    </button>
  </div>
);

const DataExport = () => {
  const navigate = useNavigate();

  return (
    <div className="app-container" style={{ background: '#F8FAFC' }}>
      <div className="screen" style={{ padding: '0 0 100px 0' }}>
        {/* Header */}
        <div style={{ background: 'white', padding: '16px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #E2E8F0' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', padding: '8px', cursor: 'pointer' }}>
            <ArrowLeft size={24} color="#1E293B" />
          </button>
          <div style={{ marginLeft: '12px' }}>
            <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#1E293B', margin: 0 }}>Data Export</h1>
            <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>Export platform data</p>
          </div>
        </div>

        <div style={{ padding: '20px' }}>
          <ExportOptionItem title="User Database" subtitle="Export all user data" icon={Database} />
          <ExportOptionItem title="Project Reports" subtitle="Export all project reports" icon={FileText} />
          <ExportOptionItem title="Screening Results" subtitle="Export screening data" icon={Database} />
          <ExportOptionItem title="Analytics Data" subtitle="Export system analytics" icon={FileText} />

          <div style={{ height: '32px' }} />

          <button style={{ 
            width: '100%', 
            height: '64px', 
            borderRadius: '20px', 
            background: 'linear-gradient(to right, #818CF8, #6366F1)',
            border: 'none',
            color: 'white',
            fontWeight: 700,
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
          }}>
            <Download size={24} />
            Export All Data
          </button>
          
          <div style={{ height: '32px' }} />
        </div>
      </div>
    </div>
  );
};

export default DataExport;
