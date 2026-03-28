import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Timer, BarChart, FileDown, CheckCircle, Clock } from 'lucide-react';
import { useState } from 'react';

const DatasetItem = ({ title, subtitle, status, statusColor, statusBg }) => (
  <div className="card" style={{ padding: '16px', display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
    <div style={{ flex: 1 }}>
      <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', margin: 0 }}>{title}</h3>
      <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>{subtitle}</p>
    </div>
    <div style={{ 
      background: statusBg, 
      color: statusColor, 
      fontSize: '12px', 
      fontWeight: 500, 
      padding: '4px 12px', 
      borderRadius: '12px' 
    }}>
      {status}
    </div>
  </div>
);

const AnalysisTypeItem = ({ title, subtitle, icon: Icon, iconColor, iconBg, onClick }) => (
  <div 
    className="card" 
    onClick={onClick} 
    style={{ 
      padding: '16px', 
      display: 'flex', 
      alignItems: 'center', 
      marginBottom: '12px', 
      cursor: 'pointer' 
    }}
  >
    <div style={{ 
      width: '48px', 
      height: '48px', 
      borderRadius: '12px', 
      background: iconBg, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      flexShrink: 0
    }}>
      <Icon size={24} style={{ color: iconColor }} />
    </div>
    <div style={{ width: '16px' }} />
    <div>
      <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', margin: 0 }}>{title}</h3>
      <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>{subtitle}</p>
    </div>
  </div>
);

const MetaAnalysis = () => {
  const navigate = useNavigate();

  return (
    <div className="app-container" style={{ background: '#F8FAFC' }}>
      <div className="screen" style={{ padding: '0 0 100px 0' }}>
        {/* Header */}
        <div style={{ background: 'white', padding: '16px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #E2E8F0' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', padding: '8px', cursor: 'pointer' }}>
            <ArrowLeft size={24} color="#0F172A" />
          </button>
          <div style={{ marginLeft: '12px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Meta-Analysis</h1>
            <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>Generate comprehensive statistical analysis</p>
          </div>
        </div>

        <div style={{ padding: '16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A', margin: '12px 0' }}>Select Dataset</h2>
          
          <DatasetItem 
            title="Gold Nanoparticles Toxicity" 
            subtitle="156 papers analyzed" 
            status="Ready" 
            statusColor="#22C55E" 
            statusBg="#DCFCE7" 
          />
          <DatasetItem 
            title="Silver NPs in Medicine" 
            subtitle="89 papers analyzed" 
            status="Ready" 
            statusColor="#22C55E" 
            statusBg="#DCFCE7" 
          />
          <DatasetItem 
            title="Zinc Oxide Applications" 
            subtitle="124 papers analyzed" 
            status="Processing" 
            statusColor="#CA8A04" 
            statusBg="#FEF9C3" 
          />

          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A', margin: '24px 0 12px 0' }}>Analysis Type</h2>

          <AnalysisTypeItem 
            title="Forest Plot Analysis" 
            subtitle="Visualize effect sizes and confidence intervals" 
            icon={Timer} 
            iconColor="#3B82F6" 
            iconBg="#DBEAFE" 
            onClick={() => {}} 
          />
          <AnalysisTypeItem 
            title="Funnel Plot" 
            subtitle="Detect publication bias in studies" 
            icon={BarChart} 
            iconColor="#0D9488" 
            iconBg="#CCFBF1" 
            onClick={() => {}} 
          />
          <AnalysisTypeItem 
            title="Full Report" 
            subtitle="Complete statistical analysis with tables" 
            icon={FileDown} 
            iconColor="#9333EA" 
            iconBg="#F3E8FF" 
            onClick={() => navigate('/full-report')} 
          />

          <div style={{ height: '32px' }} />

          <button 
            className="btn" 
            style={{ 
              background: '#009688', 
              color: 'white', 
              height: '56px', 
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: 700
            }}
          >
            Generate Meta-Analysis
          </button>
        </div>
      </div>
    </div>
  );
};

export default MetaAnalysis;
