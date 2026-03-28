import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Info, Beaker, ShieldCheck, BarChart3, Binary } from 'lucide-react';

const DetailCard = ({ title, icon, children }) => (
  <div className="card" style={{ marginBottom: '16px', padding: '16px' }}>
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px', gap: '8px' }}>
      <span style={{ fontSize: '20px' }}>{icon}</span>
      <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A', margin: 0 }}>{title}</h3>
    </div>
    {children}
  </div>
);

const PropertyItem = ({ label, value }) => (
  <div style={{ flex: 1, padding: '12px', background: '#F8FAFC', borderRadius: '12px' }}>
    <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '4px' }}>{label}</div>
    <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', whiteSpace: 'pre-line' }}>{value}</div>
  </div>
);

const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const particleData = {
    gold: {
      name: "Gold Nanoparticles",
      symbol: "Au",
      gradient: ['#EAB308', '#CA8A04'],
      icon: "⚛️",
      overview: "Gold nanoparticles are widely used in biomedical applications due to their unique optical properties and biocompatibility.",
      properties: [
        { label: "Size", value: "1-100 nm" },
        { label: "Shape", value: "Spherical,\nRod, Star" },
        { label: "Color", value: "Red to purple" },
        { label: "Stability", value: "High" }
      ],
      applications: [
        "Cancer therapy and diagnosis",
        "Drug delivery systems",
        "Biosensing and imaging",
        "Photothermal therapy",
        "Catalysis"
      ],
      toxicity: "Generally considered biocompatible with minimal toxicity at therapeutic doses.",
      stats: { papers: "45,230", citations: "892,450", trend: "+12%" }
    },
    silver: {
      name: "Silver Nanoparticles",
      symbol: "Ag",
      gradient: ['#94A3B8', '#64748B'],
      icon: "⚛️",
      overview: "Silver nanoparticles are well-known for their broad-spectrum antimicrobial properties and are used in medicine and industry.",
      properties: [
        { label: "Size", value: "10-100 nm" },
        { label: "Shape", value: "Spherical" },
        { label: "Color", value: "Yellow to gray" },
        { label: "Stability", value: "Moderate" }
      ],
      applications: [
        "Wound dressings",
        "Water treatment",
        "Antimicrobial surfaces",
        "Textiles",
        "Biosensors"
      ],
      toxicity: "Shows dose-dependent cytotoxicity; research focuses on long-term environmental accumulation.",
      stats: { papers: "38,156", citations: "742,110", trend: "+8%" }
    }
  };

  const data = particleData[id] || particleData.gold;

  return (
    <div className="app-container" style={{ background: '#F8FAFC' }}>
      <div className="screen" style={{ padding: 0 }}>
        {/* Gradient Header */}
        <div style={{ 
          height: '180px', 
          background: `linear-gradient(to bottom, ${data.gradient[0]}, ${data.gradient[1]})`,
          padding: '40px 16px',
          color: 'white'
        }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', padding: '8px', cursor: 'pointer', marginBottom: '8px' }}>
            <ArrowLeft size={24} color="white" />
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ 
              width: '56px', 
              height: '56px', 
              background: 'rgba(255,255,255,0.2)', 
              borderRadius: '12px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: '32px'
            }}>
              {data.icon}
            </div>
            <div style={{ marginLeft: '16px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>{data.name}</h1>
              <p style={{ fontSize: '16px', opacity: 0.8, margin: 0 }}>{data.symbol}</p>
            </div>
          </div>
        </div>

        <div style={{ padding: '0 16px 100px 16px', marginTop: '-20px' }}>
          <DetailCard title="Overview" icon="💠">
            <p style={{ fontSize: '14px', color: '#475569', lineHeight: '20px', margin: 0 }}>
              {data.overview}
            </p>
          </DetailCard>

          <DetailCard title="Physical Properties" icon="🏺">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {data.properties.map((p, i) => (
                <PropertyItem key={i} label={p.label} value={p.value} />
              ))}
            </div>
          </DetailCard>

          <DetailCard title="Applications" icon="🧪">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {data.applications.map((app, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ 
                    width: '20px', 
                    height: '20px', 
                    borderRadius: '10px', 
                    background: '#DCFCE7', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center'
                  }}>
                    <span style={{ color: '#166534', fontSize: '12px', fontWeight: 700 }}>✓</span>
                  </div>
                  <span style={{ fontSize: '14px', color: '#475569' }}>{app}</span>
                </div>
              ))}
            </div>
          </DetailCard>

          <DetailCard title="Toxicity Assessment" icon="⚠️">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '14px', color: '#64748B' }}>Toxicity Level</span>
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#166534' }}>Low</span>
            </div>
            <p style={{ fontSize: '14px', color: '#475569', lineHeight: '20px', margin: 0 }}>
              {data.toxicity}
            </p>
          </DetailCard>

          <DetailCard title="Research Statistics" icon="📊">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#2563EB' }}>{data.stats.papers}</div>
                <div style={{ fontSize: '12px', color: '#64748B' }}>Papers</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#9333EA' }}>{data.stats.citations}</div>
                <div style={{ fontSize: '12px', color: '#64748B' }}>Citations</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#166534' }}>{data.stats.trend}</div>
                <div style={{ fontSize: '12px', color: '#166534' }}>this year</div>
              </div>
            </div>
          </DetailCard>

          <div style={{ 
            background: '#EFF6FF', 
            borderRadius: '16px', 
            padding: '16px', 
            display: 'flex', 
            gap: '12px',
            border: 'none'
          }}>
            <span style={{ fontSize: '20px' }}>🛡️</span>
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#1E40AF', margin: '0 0 4px 0' }}>Safety Guidelines</h4>
              <p style={{ fontSize: '12px', color: '#1E40AF', opacity: 0.8, lineHeight: '18px', margin: 0 }}>
                Always follow proper handling procedures when working with nanoparticles. Use appropriate PPE and work in well-ventilated areas.
              </p>
            </div>
          </div>

          <div style={{ height: '32px' }} />
        </div>
      </div>
    </div>
  );
};

export default Detail;
