import { useNavigate } from 'react-router-dom';
import { 
  Activity, CheckSquare, Clock, CheckCircle, 
  Calendar, ChevronRight, ArrowRight 
} from 'lucide-react';
import { getUserInfo } from '../api';

const ResearcherDashboard = () => {
  const navigate = useNavigate();
  const userInfo = getUserInfo();
  const userName = (userInfo.full_name || userInfo.email?.split('@')[0] || 'keerthana').toLowerCase();

  const metrics = [
    { 
      label: 'Compliance Score', 
      value: '100%', 
      icon: Activity, 
      color: '#10B981', 
      bgColor: '#ECFDF5' 
    },
    { 
      label: 'Tasks Completed', 
      value: '4', 
      icon: CheckSquare, 
      color: '#2563EB', 
      bgColor: '#EFF6FF' 
    },
    { 
      label: 'Tasks Missed', 
      value: '0', 
      icon: Clock, 
      color: '#F59E0B', 
      bgColor: '#FFFBEB' 
    }
  ];

  const dailyTasks = [
    { title: 'Remove and rinse prosthesis', completed: true },
    { title: 'Brush prosthesis gently', completed: true },
    { title: 'Clean mouth and gums', completed: true },
    { title: 'Soak in cleaning solution', completed: true },
  ];

  return (
    <div className="fade-in">
      <header className="header">
        <div>
          <h1 className="welcome-title">Welcome back, {userName}!</h1>
          <p className="sub-header">Here is your daily overview</p>
        </div>
        <div className="date-text">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
      </header>

      <div className="stats-grid">
        {metrics.map((metric, idx) => (
          <div key={idx} className="metric-card">
            <div className="icon-box" style={{ backgroundColor: metric.bgColor }}>
              <metric.icon size={24} color={metric.color} />
            </div>
            <div className="metric-info">
              <span className="metric-label">{metric.label}</span>
              <span className="metric-value">{metric.value}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-sections">
        <div className="section-card">
          <div className="section-header">
            <h2 className="section-title">Pending Daily Tasks (0)</h2>
          </div>
          <div className="section-content">
            {dailyTasks.map((task, idx) => (
              <div key={idx} className="task-item completed">
                <CheckCircle size={20} color="#10B981" />
                <span>{task.title}</span>
              </div>
            ))}
          </div>
          <a href="#" className="view-all" onClick={(e) => { e.preventDefault(); navigate('/meta-analysis'); }}>
            View All Tasks <ArrowRight size={14} style={{ marginLeft: '4px' }} />
          </a>
        </div>

        <div className="section-card">
          <div className="section-header">
            <h2 className="section-title">Next Appointment</h2>
          </div>
          <div className="section-content">
            <div className="empty-state">
              <div className="empty-icon">
                <Calendar size={64} strokeWidth={1} />
              </div>
              <p className="empty-text">No upcoming appointments found.</p>
              <button className="primary-btn" onClick={() => navigate('/screening')}>
                Schedule One
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearcherDashboard;
