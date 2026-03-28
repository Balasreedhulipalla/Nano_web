import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Download } from 'lucide-react';

const ReportItem = ({ title, details }) => (
  <div className="card" style={{ padding: '16px', marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
    <div style={{ 
      width: '56px', 
      height: '56px', 
      borderRadius: '12px', 
      background: '#EFF6FF', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      flexShrink: 0
    }}>
      <FileText size={28} color="#3B82F6" />
    </div>
    <div style={{ width: '16px' }} />
    <div style={{ flex: 1 }}>
      <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#1E293B', margin: 0 }}>{title}</h4>
      <p style={{ fontSize: '13px', color: '#94A3B8', margin: '4px 0 0 0' }}>{details}</p>
    </div>
    <button style={{ 
      width: '40px', 
      height: '40px', 
      borderRadius: '12px', 
      background: '#EFF6FF', 
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer'
    }}>
      <Download size={20} color="#3B82F6" />
    </button>
  </div>
);

const SystemReports = () => {
  const navigate = useNavigate();

  return (
    <div className="app-container" style={{ background: '#F8FAFF' }}>
      <div className="screen" style={{ padding: '0 0 100px 0' }}>
        {/* Header */}
        <div style={{ background: 'white', padding: '16px', display: 'flex', alignItems: 'center' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', padding: '8px', cursor: 'pointer' }}>
            <ArrowLeft size={24} color="#1E293B" />
          </button>
          <div style={{ marginLeft: '12px' }}>
            <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#1E293B', margin: 0 }}>System Reports</h1>
            <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>Generate and download system reports</p>
          </div>
        </div>

        <div style={{ padding: '20px' }}>
          {/* Generate New Report Card */}
          <div className="card" style={{ padding: '24px', borderRadius: '24px', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1E293B', marginBottom: '20px' }}>Generate New Report</h3>
            
            <button style={{ 
              width: '100%', 
              height: '80px', 
              borderRadius: '16px', 
              background: 'linear-gradient(to right, #818CF8, #6366F1)',
              border: 'none',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              cursor: 'pointer',
              marginBottom: '16px'
            }}>
              <FileText size={24} />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 700, fontSize: '16px' }}>Generate System</div>
                <div style={{ fontWeight: 700, fontSize: '16px' }}>Usage Report</div>
              </div>
            </button>

            <button style={{ 
              width: '100%', 
              height: '80px', 
              borderRadius: '16px', 
              background: 'white',
              border: '1px solid #E2E8F0',
              color: '#1E293B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              cursor: 'pointer',
              marginBottom: '16px'
            }}>
              <FileText size={24} color="#64748B" />
              <span style={{ fontWeight: 700, fontSize: '16px' }}>Generate User Activity Report</span>
            </button>

            <button style={{ 
              width: '100%', 
              height: '80px', 
              borderRadius: '16px', 
              background: 'white',
              border: '1px solid #E2E8F0',
              color: '#1E293B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              cursor: 'pointer'
            }}>
              <FileText size={24} color="#64748B" />
              <span style={{ fontWeight: 700, fontSize: '16px' }}>Generate Custom Report</span>
            </button>
          </div>

          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1E293B', marginBottom: '16px' }}>Available Reports</h3>
          
          <ReportItem title="System Usage Report - February 2024" details="2024-02-28 - 3.2 MB" />
          <ReportItem title="User Activity Report - Q1 2024" details="2024-01-31 - 4.5 MB" />
          <ReportItem title="Project Performance Analytics" details="2024-01-15 - 2.8 MB" />
          <ReportItem title="Annual System Report 2023" details="2024-01-15 - 6.3 MB" />
          
          <div style={{ height: '32px' }} />
        </div>
      </div>
    </div>
  );
};

export default SystemReports;
