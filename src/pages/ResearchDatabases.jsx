import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';

const DatabaseCard = ({ data, onClick }) => (
  <div 
    className="card" 
    onClick={onClick} 
    style={{ 
      margin: '0 0 12px 0', 
      borderRadius: '16px', 
      padding: '16px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
    }}
  >
    <div style={{ 
      width: '56px', 
      height: '56px', 
      borderRadius: '12px', 
      background: data.iconBg, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontSize: '28px',
      flexShrink: 0,
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    }}>
      {data.emoji}
    </div>
    <div style={{ width: '16px' }} />
    <div style={{ flex: 1 }}>
      <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', margin: 0 }}>{data.name}</h4>
      <p style={{ fontSize: '12px', color: '#64748B', margin: '2px 0', lineHeight: '16px', whiteSpace: 'pre-line' }}>{data.description}</p>
      <p style={{ fontSize: '10px', color: '#94A3B8', margin: 0, lineHeight: '14px' }}>{data.availability}</p>
    </div>
    <ExternalLink size={20} color={data.url ? '#2563EB' : '#CBD5E1'} />
  </div>
);

const ResearchDatabases = () => {
  const navigate = useNavigate();

  const databases = [
    { name: "PubMed", description: "Biomedical literature\ndatabase", availability: "35M+ papers\navailable", iconBg: "#2563EB", emoji: "🔬", url: "https://pubmed.ncbi.nlm.nih.gov/" },
    { name: "Scopus", description: "Abstract and citation\ndatabase", availability: "87M+ papers\navailable", iconBg: "#F97316", emoji: "📊", url: "https://www.scopus.com/sources.uri" },
    { name: "Cochrane Library", description: "Evidence-based\nmedicine reviews", availability: "500K+ papers\navailable", iconBg: "#0D9488", emoji: "📚", url: "https://www.cochranelibrary.com/" },
    { name: "Web of Science", description: "Multidisciplinary\nresearch database", availability: "100M+ papers\navailable", iconBg: "#A855F7", emoji: "🌐", url: "https://www.webofscience.com/" },
    { name: "IEEE Xplore", description: "Engineering\nand technology", availability: "5M+ papers\navailable", iconBg: "#4F46E5", emoji: "⚡", url: "https://ieeexplore.ieee.org/" },
    { name: "EMBASE", description: "Biomedical and\npharmacological", availability: "36M+ papers\navailable", iconBg: "#EC4899", emoji: "💊", url: "https://www.embase.com/" },
    { name: "Google Scholar", description: "Scholarly literature search", availability: "389M+ papers\navailable", iconBg: "#22C55E", emoji: "🎓", url: "https://scholar.google.com/" },
    { name: "PsycINFO", description: "Psychology and\nbehavioral sciences", availability: "5M+ papers\navailable", iconBg: "#06B6D4", emoji: "🧠", url: "https://www.apa.org/pubs/databases/psycinfo" }
  ];

  return (
    <div className="app-container" style={{ background: '#F8FAFC' }}>
      <div className="screen" style={{ padding: '0 0 100px 0' }}>
        {/* Header */}
        <div style={{ background: 'white', padding: '16px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #E2E8F0' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', padding: '8px', cursor: 'pointer' }}>
            <ArrowLeft size={24} color="black" />
          </button>
          <div style={{ marginLeft: '12px' }}>
            <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Research Databases</h1>
            <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>Access leading scientific literature sources</p>
          </div>
        </div>

        <div style={{ padding: '16px' }}>
          {/* Stats Card */}
          <div style={{ 
            background: '#2563EB', 
            borderRadius: '16px', 
            padding: '16px', 
            height: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: 'white',
            marginBottom: '24px'
          }}>
            <div>
              <p style={{ fontSize: '12px', opacity: 0.8, margin: 0 }}>Total Papers Indexed</p>
              <h2 style={{ fontSize: '28px', fontWeight: 700, margin: 0 }}>657M+</h2>
            </div>
            <span style={{ fontSize: '40px' }}>📖</span>
          </div>

          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', marginBottom: '16px' }}>Available Databases</h3>

          {databases.map((db, i) => (
            <DatabaseCard key={i} data={db} onClick={() => window.open(db.url, '_blank')} />
          ))}

          <div style={{ height: '16px' }} />

          {/* Integration Card */}
          <div className="card" style={{ background: '#F1F7FF', border: 'none' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: '0 0 8px 0' }}>Direct Integration</h4>
            <p style={{ fontSize: '12px', color: '#475569', lineHeight: '18px', margin: '0 0 16px 0' }}>
              Connect your institutional access to import papers directly into your screening workflow.
            </p>
            <button 
              className="btn" 
              style={{ 
                background: '#2563EB', 
                color: 'white', 
                fontSize: '12px', 
                height: '40px', 
                width: 'auto',
                padding: '0 24px',
                borderRadius: '10px'
              }}
            >
              Configure Access
            </button>
          </div>
          
          <div style={{ height: '32px' }} />
        </div>
      </div>
    </div>
  );
};

export default ResearchDatabases;
