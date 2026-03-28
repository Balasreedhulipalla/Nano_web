import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, FileText } from 'lucide-react';

const NewDataset = () => {
  const navigate = useNavigate();

  return (
    <div className="app-container" style={{ background: '#F8FAFC' }}>
      <div className="screen" style={{ padding: '0 0 100px 0' }}>
        {/* Header */}
        <div style={{ background: '#F8FAFC', padding: '16px', display: 'flex', alignItems: 'center' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', padding: '8px', cursor: 'pointer' }}>
            <ArrowLeft size={24} color="#0F172A" />
          </button>
          <div style={{ marginLeft: '12px' }}>
            <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', margin: 0 }}>New Dataset Screening</h1>
            <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>Upload and analyze your research data</p>
          </div>
        </div>

        <div style={{ padding: '16px' }}>
          {/* Dataset Name Card */}
          <div className="card" style={{ padding: '16px', borderRadius: '16px', marginBottom: '24px' }}>
            <label style={{ fontSize: '16px', fontWeight: 500, color: '#334155', display: 'block', marginBottom: '8px' }}>
              Dataset Name
            </label>
            <input 
              className="input-field" 
              placeholder="e.g., Gold Nanoparticles Toxicity Study" 
              style={{ border: '1px solid #CBD5E1' }}
            />
          </div>

          {/* Upload Card */}
          <div className="card" style={{ padding: '16px', borderRadius: '16px', marginBottom: '16px' }}>
            <label style={{ fontSize: '16px', fontWeight: 500, color: '#334155', display: 'block', marginBottom: '16px' }}>
              Upload Research Files
            </label>
            <div style={{ 
              width: '100%', 
              height: '150px', 
              background: '#F8FAFC', 
              borderRadius: '12px', 
              border: '1px dashed #E2E8F0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}>
              <Upload size={48} color="#64748B" style={{ marginBottom: '8px' }} />
              <div style={{ fontWeight: 600, fontSize: '16px', color: '#334155' }}>Upload Files</div>
              <div style={{ fontSize: '12px', color: '#94A3B8' }}>CSV, Excel, or Bibliography formats</div>
            </div>
          </div>

          {/* Supported Formats Card */}
          <div style={{ padding: '16px', borderRadius: '16px', background: '#E0F2FE', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <FileText color="#0284C7" />
            <div>
              <div style={{ fontWeight: 700, color: '#0369A1' }}>Supported Formats</div>
              <div style={{ fontSize: '12px', color: '#075985' }}>CSV, Excel (.xlsx), BibTeX, RIS, EndNote, PubMed XML</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewDataset;
