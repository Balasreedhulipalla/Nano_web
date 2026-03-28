import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Info, AlertTriangle, Clock, Bell } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getNotifications } from '../api';

const NotificationCard = ({ message, time, isUnread }) => (
  <div className="card" style={{ padding: '16px', display: 'flex', marginBottom: '16px', position: 'relative' }}>
    <div style={{ 
      width: '48px', height: '48px', borderRadius: '50%', background: '#3B82F61A', 
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
    }}>
      <Bell size={24} style={{ color: '#3B82F6' }} />
    </div>
    <div style={{ width: '16px' }} />
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1E293B', margin: 0 }}>Notification</h3>
        {!isUnread && (
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3B82F6' }} />
        )}
      </div>
      <p style={{ fontSize: '14px', color: '#64748B', margin: '4px 0 8px 0', lineHeight: '20px' }}>{message}</p>
      <div style={{ fontSize: '12px', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '4px' }}>
        <Clock size={12} /> {time}
      </div>
    </div>
  </div>
);

// Fallback static notifications for non-authenticated state
const FALLBACK = [
  { id: 1, message: 'Submission Approved: Your Gold NP meta-analysis has been approved.', is_read: false, created_at: new Date(Date.now() - 2 * 3600000).toISOString() },
  { id: 2, message: '3 new papers match your research interests.', is_read: false, created_at: new Date(Date.now() - 5 * 3600000).toISOString() },
  { id: 3, message: 'Deadline Reminder: Silver NP project due in 3 days.', is_read: true, created_at: new Date(Date.now() - 86400000).toISOString() },
];

function timeAgo(isoString) {
  const diff = (Date.now() - new Date(isoString)) / 1000;
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  return `${Math.floor(diff / 86400)} days ago`;
}

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNotifications()
      .then(data => setNotifications(data))
      .catch(() => setNotifications(FALLBACK))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="app-container" style={{ background: '#F8FAFC' }}>
      <div className="screen" style={{ padding: '0 0 100px 0' }}>
        {/* Header */}
        <div style={{ background: '#F8FAFC', padding: '16px', display: 'flex', alignItems: 'center' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', padding: '8px', cursor: 'pointer' }}>
            <ArrowLeft size={24} color="#1E293B" />
          </button>
          <div style={{ marginLeft: '12px' }}>
            <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#1E293B', margin: 0 }}>Notifications</h1>
            <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>Stay updated with your research</p>
          </div>
        </div>

        <div style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1E293B', margin: 0 }}>Recent Notifications</h2>
            <button style={{ background: 'none', border: 'none', color: '#3B82F6', fontWeight: 500, fontSize: '14px', cursor: 'pointer' }}>
              Mark all as read
            </button>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#64748B' }}>Loading...</div>
          ) : notifications.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#64748B' }}>No notifications yet.</div>
          ) : notifications.map(n => (
            <NotificationCard 
              key={n.id}
              message={n.message}
              time={timeAgo(n.created_at)}
              isUnread={n.is_read}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
