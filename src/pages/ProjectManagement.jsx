import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Edit2, Trash2 } from 'lucide-react';

const ProjectCard = ({ project }) => (
  <div className="card" style={{ padding: '16px', marginBottom: '16px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
      <div style={{ flex: 1 }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1E293B', margin: 0 }}>{project.title}</h3>
        <p style={{ fontSize: '13px', color: '#64748B', margin: '2px 0 0 0' }}>Lead: {project.lead}</p>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#EFF6FF', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Edit2 size={18} color="#3B82F6" />
        </button>
        <button style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#FEF2F2', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Trash2 size={18} color="#EF4444" />
        </button>
      </div>
    </div>

    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
      <div style={{ 
        background: project.statusBg, 
        color: project.statusColor, 
        fontSize: '11px', 
        fontWeight: 500, 
        padding: '4px 10px', 
        borderRadius: '8px' 
      }}>
        {project.status}
      </div>
      <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>
        {project.progress}% complete
      </span>
    </div>

    <div style={{ width: '100%', height: '8px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
      <div style={{ 
        width: `${project.progress}%`, 
        height: '100%', 
        background: 'linear-gradient(to right, #60A5FA, #8B5CF6)', 
        borderRadius: '4px' 
      }} />
    </div>
  </div>
);

const ProjectManagement = () => {
  const navigate = useNavigate();

  const projects = [
    { title: "Gold Nanoparticles Cytotoxicity", lead: "Dr. Sarah Chen", status: "Active", progress: 75, statusBg: "#DBEAFE", statusColor: "#2563EB" },
    { title: "Silver NP Meta-Analysis", lead: "Dr. John Martinez", status: "In Progress", progress: 45, statusBg: "#FEF9C3", statusColor: "#854D0E" },
    { title: "Quantum Dots Safety Study", lead: "Dr. Emily Watson", status: "Completed", progress: 100, statusBg: "#DCFCE7", statusColor: "#166534" }
  ];

  return (
    <div className="app-container" style={{ background: '#F8FAFC' }}>
      <div className="screen" style={{ padding: '0 0 100px 0' }}>
        {/* Header */}
        <div style={{ background: '#F8FAFC', padding: '16px', display: 'flex', alignItems: 'center' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', padding: '8px', cursor: 'pointer' }}>
            <ArrowLeft size={24} color="#1E293B" />
          </button>
          <div style={{ marginLeft: '12px' }}>
            <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#1E293B', margin: 0 }}>Project Management</h1>
            <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>Manage all research projects</p>
          </div>
        </div>

        <div style={{ padding: '16px' }}>
          <button 
            style={{ 
              width: '100%', 
              height: '56px', 
              borderRadius: '12px', 
              background: 'linear-gradient(to right, #8B5CF6, #3B82F6)',
              border: 'none',
              color: 'white',
              fontWeight: 700,
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              marginBottom: '24px'
            }}
          >
            <Plus size={24} />
            Create New Project
          </button>

          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}

          <div style={{ height: '32px' }} />
        </div>
      </div>
    </div>
  );
};

export default ProjectManagement;
