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
  const role = localStorage.getItem('user_role') || userRole || 'user';
  const isAdmin = role === 'admin' || role === 'super_admin' || role === 'Admin';
  
  const menuItems = isAdmin ? [
    { title: 'Dashboard', route: '/admin-dashboard', icon: LayoutDashboard },
    { title: 'User Management', route: '/user-management', icon: User },
    { title: 'Project Management', route: '/project-management', icon: CheckSquare },
    { title: 'System Analytics', route: '/system-analytics', icon: BarChart3 },
    { title: 'Data Export', route: '/data-export', icon: Download },
    { title: 'Notifications', route: '/notifications', icon: Bell },
    { title: 'Profile', route: '/profile', icon: User },
    { title: 'Settings', route: '/change-password', icon: Settings },
  ] : [
    { title: 'Dashboard', route: '/researcher-dashboard', icon: LayoutDashboard },
    { title: 'Appointments', route: '/screening', icon: CheckSquare }, // Using existing routes
    { title: 'Daily Tasks', route: '/meta-analysis', icon: CheckSquare },
    { title: 'Reminders', route: '/notifications', icon: Bell },
    { title: 'Health Screening', route: '/screening', icon: BarChart },
    { title: 'Profile', route: '/profile', icon: User },
    { title: 'Prosthesis Details', route: '/full-report', icon: Database },
    { title: 'Education & Info', route: '/search', icon: SearchIcon },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_role');
    navigate('/login');
  };

  return (
    <div className="layout-container">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span className="logo-text">Reports</span>
        </div>
        
        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentRoute === item.route;
            const title = item.title === 'Prosthesis Details' ? 'Reports' : item.title;
            return (
              <button 
                key={item.route} 
                className={`sidebar-item ${isActive ? 'active' : ''}`}
                onClick={() => navigate(item.route)}
              >
                <Icon size={20} />
                <span>{title}</span>
              </button>
            )
          })}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
      
      <main className="main-content">
        {children}
      </main>
    </div>
  )
}

function App() {
  const [userRole, setUserRole] = useState(() => localStorage.getItem('user_role') || 'user');
  const location = useLocation();
  const currentRoute = location.pathname;

  return (
    <Routes>
      <Route path="/" element={<Login onLogin={(role) => setUserRole(role)} />} />
      <Route path="/welcome" element={<Welcome />} />
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
