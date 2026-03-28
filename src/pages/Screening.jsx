import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, FileSpreadsheet, CheckCircle, Loader2, Search, Filter } from 'lucide-react';

const Screening = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isScreened, setIsScreened] = useState(false);
  const [results, setResults] = useState([]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      startSimulation();
    }
  };

  const startSimulation = () => {
    setIsUploading(true);
    setUploadProgress(0);
    setIsScreened(false);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            setIsScreened(true);
            generateMockResults();
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const generateMockResults = () => {
    setResults([
      { id: 1, title: "Size Distribution Analysis", status: "Validated", match: "98%", tags: ["Gold", "TEM"] },
      { id: 2, title: "Zeta Potential Measurements", status: "Review Required", match: "72%", tags: ["Silver", "DLS"] },
      { id: 3, title: "Cytotoxicity Assay - HepG2", status: "Validated", match: "95%", tags: ["Toxicology", "AuNP"] },
      { id: 4, title: "UV-Vis Surface Plasmon", status: "Validated", match: "91%", tags: ["Optical", "Characterization"] },
    ]);
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
            <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Dataset Screening</h1>
            <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>Screen nanoparticle studies automatically</p>
          </div>
        </div>

        <div style={{ padding: '16px' }}>
          {!isScreened && !isUploading && (
            <div 
              className="card" 
              style={{ 
                height: '300px', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                border: '2px dashed #E2E8F0',
                cursor: 'pointer',
                background: 'white',
                marginTop: '24px'
              }}
              onClick={() => fileInputRef.current.click()}
            >
              <div style={{ 
                width: '64px', 
                height: '64px', 
                borderRadius: '20px', 
                background: '#F1F5F9', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <Upload size={32} color="var(--primary-blue)" />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 8px 0' }}>Upload Excel Sheet</h3>
              <p style={{ color: '#64748B', fontSize: '14px', textAlign: 'center', padding: '0 24px' }}>
                Click to browse or drag and drop your .xlsx or .csv files
              </p>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                style={{ display: 'none' }} 
                accept=".xlsx, .xls, .csv" 
              />
            </div>
          )}

          {isUploading && (
            <div className="card" style={{ textAlign: 'center', padding: '64px', marginTop: '24px' }}>
              <Loader2 size={48} color="var(--primary-blue)" style={{ animation: 'spin 1s linear infinite', marginBottom: '24px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Screening Dataset...</h3>
              <div style={{ 
                width: '100%', 
                height: '8px', 
                background: '#F1F5F9', 
                borderRadius: '4px', 
                overflow: 'hidden'
              }}>
                <div style={{ 
                  width: `${uploadProgress}%`, 
                  height: '100%', 
                  background: 'var(--primary-blue)', 
                  transition: 'width 0.1s linear' 
                }} />
              </div>
              <p style={{ color: '#64748B', fontSize: '12px', marginTop: '16px' }}>
                Analyzing data patterns and verifying chemical metrics...
              </p>
            </div>
          )}

          {isScreened && (
            <div style={{ marginTop: '24px' }}>
              <div className="card" style={{ background: '#DCFCE7', color: '#166534', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', padding: '16px' }}>
                <CheckCircle size={24} />
                <div style={{ fontWeight: 600 }}>Screening Complete! {file?.name} has been processed.</div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>Screening Results</h3>
                <div style={{ display: 'flex', gap: '8px' }}>
                   <button 
                    className="btn btn-primary" 
                    style={{ height: '40px', padding: '0 16px', fontSize: '14px' }}
                    onClick={() => { setFile(null); setIsScreened(false); }}
                  >
                    Upload New
                  </button>
                </div>
              </div>

              <div className="card" style={{ padding: 0 }}>
                {results.map((item, i) => (
                  <div key={item.id} style={{ 
                    padding: '16px', 
                    borderBottom: i === results.length - 1 ? 'none' : '1px solid #F1F5F9',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <h4 style={{ margin: '0 0 6px 0', fontSize: '15px', fontWeight: 700 }}>{item.title}</h4>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        {item.tags.map(tag => (
                          <span key={tag} style={{ fontSize: '10px', background: '#F1F5F9', padding: '2px 8px', borderRadius: '4px', color: '#64748B', fontWeight: 600 }}>{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: item.status === 'Validated' ? '#166534' : '#991B1B' }}>{item.status}</div>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>{item.match} match</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ height: '32px' }} />
              <button 
                className="btn btn-primary" 
                style={{ height: '56px' }}
                onClick={() => navigate('/meta-analysis')}
              >
                Proceed to Meta-Analysis
              </button>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default Screening;
