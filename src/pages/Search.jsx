import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search as SearchIcon, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const NanoTypeCard = ({ data, onClick }) => (
  <div 
    className="card" 
    onClick={onClick} 
    style={{ 
      flex: 1, 
      borderRadius: '12px', 
      padding: '12px', 
      display: 'flex', 
      alignItems: 'center',
      cursor: 'pointer',
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
    }}
  >
    <div style={{ 
      width: '40px', 
      height: '40px', 
      borderRadius: '50%', 
      background: `${data.color}1A`, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontSize: '20px',
      flexShrink: 0
    }}>
      {data.icon}
    </div>
    <div style={{ width: '12px' }} />
    <div style={{ overflow: 'hidden' }}>
      <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{data.name}</h4>
      <p style={{ fontSize: '11px', color: '#64748B', margin: 0 }}>{data.category}</p>
    </div>
  </div>
);

const DatasetCard = ({ dataset, onClick }) => (
  <div 
    className="card" 
    onClick={onClick} 
    style={{ 
      margin: '0 0 12px 0', 
      borderRadius: '16px', 
      padding: '16px',
      cursor: 'pointer',
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
      <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', margin: 0, flex: 1 }}>{dataset.title}</h3>
      <div style={{ 
        background: dataset.isComplete ? '#DCFCE7' : '#FEF9C3', 
        color: dataset.isComplete ? '#166534' : '#854D0E',
        fontSize: '11px',
        fontWeight: 500,
        padding: '2px 10px',
        borderRadius: '12px',
        whiteSpace: 'nowrap'
      }}>
        {dataset.isComplete ? 'Complete' : 'Processing'}
      </div>
    </div>
    
    <div style={{ height: '12px' }} />
    
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
      <div style={{ 
        background: '#F1F5F9', 
        color: '#475569',
        fontSize: '11px',
        fontWeight: 500,
        padding: '2px 10px',
        borderRadius: '12px'
      }}>
        {dataset.category}
      </div>
      <span style={{ color: '#CBD5E1' }}>•</span>
      <span style={{ fontSize: '12px', color: '#64748B' }}>{dataset.papers}</span>
      <span style={{ color: '#CBD5E1' }}>•</span>
      <span style={{ fontSize: '12px', color: '#64748B' }}>{dataset.date}</span>
    </div>
  </div>
);

const Search = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ["All", "Toxicology", "Medicine", "Environment", "Industrial", "Mining", "Factory"];
  
  const nanoTypes = [
    { name: "Gold (Au)", category: "Biomedical", color: "#FBBF24", icon: "🥇" },
    { name: "Silver (Ag)", category: "Antimicrobial", color: "#94A3B8", icon: "🥈" },
    { name: "Aluminum (Al)", category: "Industrial", color: "#64748B", icon: "⚙️" },
    { name: "Zinc Oxide", category: "UV Protection", color: "#FACC15", icon: "☀️" },
    { name: "Titanium Dioxide", category: "Photocatalysis", color: "#22D3EE", icon: "💎" },
    { name: "Iron Oxide", category: "Magnetic", color: "#EF4444", icon: "🧲" },
    { name: "Silica (SiO2)", category: "Drug Delivery", color: "#A855F7", icon: "🧪" }
  ];

  const allDatasets = [
    { title: "Gold Nanoparticles Toxicity Studies", category: "Toxicology", papers: "230 papers", date: "Jan 2024", isComplete: true, nanoType: "Gold (Au)" },
    { title: "Silver Nanoparticles in Medical Applications", category: "Medicine", papers: "175 papers", date: "Dec 2023", isComplete: true, nanoType: "Silver (Ag)" },
    { title: "Zinc Oxide NPs in Dermatology", category: "Toxicology", papers: "124 papers", date: "Nov 2023", isComplete: false, nanoType: "Zinc Oxide" },
    { title: "Titanium Dioxide Photocatalysis", category: "Environment", papers: "210 papers", date: "Oct 2023", isComplete: true, nanoType: "Titanium Dioxide" },
    { title: "Iron Oxide NPs for Drug Delivery", category: "Medicine", papers: "85 papers", date: "Sep 2023", isComplete: true, nanoType: "Iron Oxide" },
    { title: "Silica Nanoparticles in Cancer Treatment", category: "Medicine", papers: "104 papers", date: "Aug 2023", isComplete: true, nanoType: "Silica (SiO2)" },
    { title: "Aluminum Oxide NPs Industrial Safety", category: "Mining", papers: "78 papers", date: "Jul 2023", isComplete: true, nanoType: "Aluminum (Al)" }
  ];

  const filteredDatasets = allDatasets.filter(d => 
    (selectedCategory === 'All' || d.category === selectedCategory) &&
    (d.title.toLowerCase().includes(searchQuery.toLowerCase()) || d.nanoType.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="app-container" style={{ background: '#F8FAFC' }}>
      <div className="screen" style={{ padding: '0 0 100px 0' }}>
        {/* Header */}
        <div style={{ background: 'white', padding: '16px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #E2E8F0' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', padding: '8px', cursor: 'pointer' }}>
            <ArrowLeft size={24} color="#0F172A" />
          </button>
          <div style={{ marginLeft: '12px' }}>
            <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Search Datasets</h1>
            <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>Browse and filter nanoparticle research datasets</p>
          </div>
        </div>

        <div style={{ padding: '24px 16px' }}>
          {/* Type Selection */}
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', margin: '0 0 12px 0' }}>Type of Nanoparticles</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
            {nanoTypes.map((type, i) => (
              <NanoTypeCard key={i} data={type} onClick={() => navigate(`/detail/${type.name.split(' ')[0].toLowerCase()}`)} />
            ))}
          </div>

          {/* Search Bar */}
          <div style={{ position: 'relative', marginBottom: '16px' }}>
            <SearchIcon size={20} style={{ position: 'absolute', left: '16px', top: '16px', color: '#64748B' }} />
            <input 
              className="input-field" 
              placeholder="Search by title, category, or keyword..." 
              style={{ paddingLeft: '48px', margin: 0, background: 'white', border: '1px solid #E2E8F0' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Chips */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '16px', scrollbarWidth: 'none' }}>
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{ 
                  padding: '6px 16px', 
                  borderRadius: '20px', 
                  fontSize: '14px', 
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                  border: 'none',
                  background: selectedCategory === cat ? '#2563EB' : '#F1F5F9',
                  color: selectedCategory === cat ? 'white' : '#64748B',
                  cursor: 'pointer'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '12px' }}>
            {filteredDatasets.length} datasets found
          </p>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {filteredDatasets.map((dataset, i) => (
              <DatasetCard key={i} dataset={dataset} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
