import { useNavigate } from 'react-router-dom';

const MoleculeLogo = ({ size = 160 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="80" cy="80" r="12" fill="#4A90E2" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x2 = 80 + 56 * Math.cos(rad);
        const y2 = 80 + 56 * Math.sin(rad);
        return (
          <g key={i}>
            <line x1="80" y1="80" x2={x2} y2={y2} stroke="#D1D5DB" strokeWidth="2" />
            <circle cx={x2} cy={y2} r="8" fill="#8B5CF6" />
          </g>
        );
      })}
    </svg>
  );
};

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <div className="app-container" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="screen" style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '24px',
        height: '100vh'
      }}>
        {/* Logo Container with Shadow */}
        <div style={{ 
          width: '160px', 
          height: '160px', 
          background: 'white', 
          borderRadius: '40px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          boxShadow: '0 30px 60px rgba(0,0,0,0.1)',
          marginBottom: '48px'
        }}>
          <MoleculeLogo size={80} />
        </div>

        {/* Title */}
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: 700, 
          color: 'var(--text-primary)', 
          margin: '0 0 16px 0',
          letterSpacing: '-0.5px'
        }}>
          Nano Meta Tool
        </h1>

        {/* Subtitle */}
        <p style={{ 
          color: 'var(--text-secondary)', 
          fontSize: '16px', 
          lineHeight: '24px', 
          textAlign: 'center', 
          fontWeight: 500,
          margin: '0 0 24px 0',
          whiteSpace: 'pre-line' 
        }}>
          {`Nanoparticle Meta-Analysis\nScreening Platform`}
        </p>

        {/* Version */}
        <p style={{ 
          color: 'var(--version-text)', 
          fontSize: '14px', 
          fontWeight: 400,
          margin: 0
        }}>
          Version 1.0.0
        </p>

        {/* Bottom Button */}
        <div style={{ 
          position: 'absolute', 
          bottom: '60px', 
          left: '0', 
          right: '0', 
          padding: '0 32px' 
        }}>
          <button 
            className="btn btn-primary" 
            onClick={() => navigate('/login')}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
