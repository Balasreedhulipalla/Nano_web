import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { Home, Search as SearchIcon, FileText, User, Bell, LayoutDashboard, Database, BarChart, Settings, CheckSquare, Plus, AlertCircle, BarChart3, Download, LogOut, ChevronLeft } from 'lucide-react'
import './App.css'

// Import components
import Welcome from './pages/Welcome'
import Login from './pages/Login'
import SelectRole from './pages/SelectRole'
import Detail from './pages/Detail'
import Search from './pages/Search'
import ResearcherDashboard from './pages/ResearcherDashboard'
import AdminDashboard from './pages/AdminDashboard'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'
import MetaAnalysis from './pages/MetaAnalysis'
import Screening from './pages/Screening'
import CreateAccount from './pages/CreateAccount'
import ResearchDatabases from './pages/ResearchDatabases'
import UserManagement from './pages/UserManagement'
import ProjectManagement from './pages/ProjectManagement'
import SystemAnalytics from './pages/SystemAnalytics'
import SystemReports from './pages/SystemReports'
import DataExport from './pages/DataExport'
import PendingApprovals from './pages/PendingApprovals'
import NewDataset from './pages/NewDataset'
import EditProfile from './pages/EditProfile'
import ResearchAlerts from './pages/ResearchAlerts'
import ChangePassword from './pages/ChangePassword'

const DashboardShell = ({ children, userRole, currentRoute }) => {
  const navigate = useNavigate();
  // detect role from localStorage so it survives page refresh
  const role = localStorage.getItem('user_role') || userRole || 'user';
  const isAdmin = role === 'admin' || role === 'super_admin' || role === 'Admin';
  const menuItems = isAdmin ? [
    { title: 'Dashboard', route: '/admin-dashboard', icon: Home },
    { title: 'Projects', route: '/project-management', icon: CheckSquare },
    { title: 'Notifications', route: '/notifications', icon: Bell },
    { title: 'Profile', route: '/profile', icon: User }
  ] : [
    { title: 'Home', route: '/researcher-dashboard', icon: Home },
    { title: 'Search', route: '/search', icon: SearchIcon },
    { title: 'Reports', route: '/full-report', icon: FileText },
    { title: 'Profile', route: '/profile', icon: User }
  ];

  return (
    <div className="app-container">
      <main className="screen" style={{ paddingBottom: '100px' }}>
        {children}
      </main>
      
      <nav className="bottom-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentRoute === item.route;
          return (
            <button 
              key={item.route} 
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => navigate(item.route)}
            >
              <Icon size={24} />
              <span>{item.title}</span>
            </button>
          )
        })}
      </nav>
      
      <style>{`
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: #ffffff;
          display: flex;
          justify-content: space-around;
          padding: 8px 0;
          border-top: 1px solid #E2E8F0;
          z-index: 1000;
          box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.05);
        }
        
        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          background: none;
          border: none;
          color: #64748B;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          padding: 8px 12px;
          flex: 1;
        }
        
        .nav-item.active {
          color: #2563EB;
          font-weight: 700;
        }
      `}</style>
    </div>
  )
}

function App() {
  const [userRole, setUserRole] = useState(() => localStorage.getItem('user_role') || 'user');
  const location = useLocation();
  const currentRoute = location.pathname;

  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login onLogin={(role) => setUserRole(role)} />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/select-role" element={<SelectRole onRoleSelect={(role) => setUserRole(role)} />} />
      
      <Route path="/researcher-dashboard" element={<DashboardShell userRole={userRole} currentRoute={currentRoute}><ResearcherDashboard /></DashboardShell>} />
      <Route path="/admin-dashboard" element={<DashboardShell userRole={userRole} currentRoute={currentRoute}><AdminDashboard /></DashboardShell>} />
      <Route path="/search" element={<DashboardShell userRole={userRole} currentRoute={currentRoute}><Search /></DashboardShell>} />
      <Route path="/profile" element={<DashboardShell userRole={userRole} currentRoute={currentRoute}><Profile userRole={userRole} /></DashboardShell>} />
      <Route path="/notifications" element={<DashboardShell userRole={userRole} currentRoute={currentRoute}><Notifications /></DashboardShell>} />
      <Route path="/full-report" element={<DashboardShell userRole={userRole} currentRoute={currentRoute}><ResearchDatabases /></DashboardShell>} />
      <Route path="/meta-analysis" element={<DashboardShell userRole={userRole} currentRoute={currentRoute}><MetaAnalysis /></DashboardShell>} />
      <Route path="/screening" element={<DashboardShell userRole={userRole} currentRoute={currentRoute}><Screening /></DashboardShell>} />
      
      <Route path="/detail/:id" element={<Detail />} />

      <Route path="/user-management" element={<DashboardShell userRole={userRole} currentRoute={currentRoute}><UserManagement /></DashboardShell>} />
      <Route path="/project-management" element={<DashboardShell userRole={userRole} currentRoute={currentRoute}><ProjectManagement /></DashboardShell>} />
      <Route path="/system-analytics" element={<DashboardShell userRole={userRole} currentRoute={currentRoute}><SystemAnalytics /></DashboardShell>} />
      <Route path="/system-reports" element={<DashboardShell userRole={userRole} currentRoute={currentRoute}><SystemReports /></DashboardShell>} />
      <Route path="/data-export" element={<DashboardShell userRole={userRole} currentRoute={currentRoute}><DataExport /></DashboardShell>} />
      <Route path="/pending-approvals" element={<DashboardShell userRole={userRole} currentRoute={currentRoute}><PendingApprovals /></DashboardShell>} />

      <Route path="/new-dataset" element={<DashboardShell userRole={userRole} currentRoute={currentRoute}><NewDataset /></DashboardShell>} />
      <Route path="/research-alerts" element={<DashboardShell userRole={userRole} currentRoute={currentRoute}><ResearchAlerts /></DashboardShell>} />
      <Route path="/edit-profile" element={<DashboardShell userRole={userRole} currentRoute={currentRoute}><EditProfile /></DashboardShell>} />
      <Route path="/change-password" element={<DashboardShell userRole={userRole} currentRoute={currentRoute}><ChangePassword /></DashboardShell>} />
      <Route path="*" element={<div className="app-container"><div className="screen"><h1>404 Not Found</h1><button onClick={() => window.location.href='/'}>Go to Home</button></div></div>} />
    </Routes>
  )
}

// Remaining placeholders (to be expanded as needed)
export default App
