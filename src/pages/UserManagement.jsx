import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Plus, Trash2, X } from 'lucide-react';
import { getAdminDashboard, deleteUser, createAdmin } from '../api';

const UserCard = ({ user, onDelete }) => (
  <div className="card" style={{ padding: '16px', marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
    <div style={{ flex: 1 }}>
      <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1E293B', margin: 0 }}>{user.full_name}</h3>
      <p style={{ fontSize: '14px', color: '#64748B', margin: '2px 0 2px 0' }}>Login: {user.email}</p>
      <p style={{ fontSize: '14px', color: '#64748B', margin: '0 0 8px 0' }}>Password: ••••••••</p>
      <div style={{ display: 'flex', gap: '8px' }}>
        <div style={{ background: '#DBEAFE', color: '#2563EB', fontSize: '12px', fontWeight: 500, padding: '4px 8px', borderRadius: '8px' }}>
          {user.role}
        </div>
        <div style={{ 
          background: user.is_active ? '#DCFCE7' : '#FEF9C3', 
          color: user.is_active ? '#166534' : '#854D0E', 
          fontSize: '12px', fontWeight: 500, padding: '4px 8px', borderRadius: '8px' 
        }}>
          {user.is_active ? 'Active' : 'Inactive'}
        </div>
      </div>
    </div>
    
    <button 
      onClick={() => onDelete(user.id)}
      style={{ 
        width: '40px', height: '40px', borderRadius: '8px', background: '#FEF2F2', border: 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
      }}
    >
      <Trash2 size={18} color="#EF4444" />
    </button>
  </div>
);

const UserManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState({ full_name: '', email: '', password: '' });
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    setLoading(true);
    getAdminDashboard()
      .then(data => setUsers(data.users || []))
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  };

  const filteredUsers = users.filter(user => 
    user.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await deleteUser(id);
      setUsers(prev => prev.filter(u => u.id !== id));
    } catch {
      alert('Failed to delete user.');
    }
  };

  const handleAddUser = async () => {
    if (!newUser.full_name || !newUser.email || !newUser.password) {
      setAddError('All fields are required.');
      return;
    }
    setAddLoading(true);
    setAddError('');
    try {
      await createAdmin(newUser.full_name, newUser.email, newUser.password);
      setShowAddDialog(false);
      setNewUser({ full_name: '', email: '', password: '' });
      loadUsers();
    } catch (err) {
      setAddError(err?.detail || 'Failed to create user.');
    } finally {
      setAddLoading(false);
    }
  };

  return (
    <div className="app-container" style={{ background: '#F8FAFC' }}>
      <div className="screen" style={{ padding: '0 0 100px 0' }}>
        {/* Header */}
        <div style={{ background: '#F8FAFC', padding: '16px', display: 'flex', alignItems: 'center' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', padding: '8px', cursor: 'pointer' }}>
            <ArrowLeft size={24} color="#1E293B" />
          </button>
          <div style={{ marginLeft: '12px' }}>
            <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#1E293B', margin: 0 }}>User Management</h1>
            <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>
              {loading ? 'Loading...' : `${users.length} total users`}
            </p>
          </div>
        </div>

        <div style={{ padding: '16px' }}>
          {/* Search Bar */}
          <div style={{ position: 'relative', marginBottom: '20px' }}>
            <Search size={20} style={{ position: 'absolute', left: '16px', top: '16px', color: '#94A3B8' }} />
            <input 
              className="input-field" 
              placeholder="Search users..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '48px', background: 'white', border: '1px solid #E2E8F0' }}
            />
          </div>

          {/* Add New User Button */}
          <button 
            onClick={() => setShowAddDialog(true)}
            style={{ 
              width: '100%', height: '56px', borderRadius: '12px', 
              background: 'linear-gradient(to right, #8B5CF6, #3B82F6)',
              border: 'none', color: 'white', fontWeight: 700, fontSize: '16px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              cursor: 'pointer', marginBottom: '24px'
            }}
          >
            <Plus size={24} />
            Add New User
          </button>

          {/* User Cards */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#64748B' }}>Loading users...</div>
          ) : filteredUsers.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#64748B' }}>
              {searchQuery ? 'No users found matching your search.' : 'No users found.'}
            </div>
          ) : filteredUsers.map(user => (
            <UserCard key={user.id} user={user} onDelete={handleDelete} />
          ))}
        </div>
      </div>

      {/* Add User Dialog */}
      {showAddDialog && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          background: 'rgba(0,0,0,0.5)', zIndex: 2000,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
        }}>
          <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0 }}>Add New User</h3>
              <button onClick={() => setShowAddDialog(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={24} color="#64748B" />
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '14px', color: '#64748B', display: 'block', marginBottom: '4px' }}>Full Name</label>
                <input 
                  className="input-field" placeholder="Enter name" 
                  value={newUser.full_name}
                  onChange={e => setNewUser(p => ({ ...p, full_name: e.target.value }))}
                  style={{ border: '1px solid #E2E8F0' }} 
                />
              </div>
              <div>
                <label style={{ fontSize: '14px', color: '#64748B', display: 'block', marginBottom: '4px' }}>Email Address</label>
                <input 
                  className="input-field" placeholder="Enter email" type="email"
                  value={newUser.email}
                  onChange={e => setNewUser(p => ({ ...p, email: e.target.value }))}
                  style={{ border: '1px solid #E2E8F0' }} 
                />
              </div>
              <div>
                <label style={{ fontSize: '14px', color: '#64748B', display: 'block', marginBottom: '4px' }}>Password</label>
                <input 
                  className="input-field" placeholder="Enter password" type="password"
                  value={newUser.password}
                  onChange={e => setNewUser(p => ({ ...p, password: e.target.value }))}
                  style={{ border: '1px solid #E2E8F0' }} 
                />
              </div>
            </div>

            {addError && (
              <div style={{ background: '#FEF2F2', borderRadius: '8px', padding: '10px', color: '#DC2626', fontSize: '13px', marginTop: '12px' }}>
                {addError}
              </div>
            )}

            <button 
              className="btn btn-primary" 
              style={{ marginTop: '24px', height: '48px', opacity: addLoading ? 0.7 : 1 }}
              onClick={handleAddUser}
              disabled={addLoading}
            >
              {addLoading ? 'Adding...' : 'Add User'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
