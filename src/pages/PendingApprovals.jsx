import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, Clock } from 'lucide-react';
import { getPendingApprovals, approveSubmission } from '../api';

const ApprovalCard = ({ submission, onApprove }) => {
  const [loading, setLoading] = useState(false);

  const handleApprove = async () => {
    setLoading(true);
    try {
      await approveSubmission(submission.id);
      onApprove(submission.id);
    } catch {
      alert('Failed to approve submission. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ padding: '16px', marginBottom: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
        <div style={{ 
          width: '40px', height: '40px', borderRadius: '50%', background: '#F59E0B1A',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
        }}>
          <Clock size={22} color="#F59E0B" />
        </div>
        <div style={{ marginLeft: '12px', flex: 1 }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1E293B', margin: 0 }}>
            Submission #{submission.id}
          </h3>
          <p style={{ fontSize: '13px', color: '#64748B', margin: '2px 0 0 0' }}>
            Dataset: {submission.dataset} · Status: {submission.status}
          </p>
        </div>
        <div style={{
          background: '#FEF3C7', color: '#92400E', fontSize: '11px',
          fontWeight: 600, padding: '4px 10px', borderRadius: '8px'
        }}>
          Pending Review
        </div>
      </div>

      {submission.notes && (
        <p style={{ fontSize: '13px', color: '#475569', background: '#F8FAFC', 
          borderRadius: '8px', padding: '10px', margin: '0 0 12px 0' }}>
          📝 {submission.notes}
        </p>
      )}

      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={handleApprove}
          disabled={loading}
          style={{
            flex: 1, height: '40px', borderRadius: '10px', border: 'none',
            background: '#DCFCE7', color: '#166534', fontWeight: 600, fontSize: '14px',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
            opacity: loading ? 0.6 : 1
          }}
        >
          <CheckCircle size={18} />
          {loading ? 'Approving...' : 'Approve'}
        </button>
        <button
          style={{
            flex: 1, height: '40px', borderRadius: '10px', border: 'none',
            background: '#FEF2F2', color: '#991B1B', fontWeight: 600, fontSize: '14px',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
          }}
        >
          <XCircle size={18} />
          Reject
        </button>
      </div>
    </div>
  );
};

const PendingApprovals = () => {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPendingApprovals()
      .then(data => setSubmissions(Array.isArray(data) ? data : []))
      .catch(() => setSubmissions([]))
      .finally(() => setLoading(false));
  }, []);

  const handleApproved = (id) => {
    setSubmissions(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="app-container" style={{ background: '#F8FAFC' }}>
      <div className="screen" style={{ padding: '0 0 100px 0' }}>
        {/* Header */}
        <div style={{ background: 'white', padding: '16px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #E2E8F0' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', padding: '8px', cursor: 'pointer' }}>
            <ArrowLeft size={24} color="#1E293B" />
          </button>
          <div style={{ marginLeft: '12px' }}>
            <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#1E293B', margin: 0 }}>Pending Approvals</h1>
            <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>Review and approve submissions</p>
          </div>
        </div>

        <div style={{ padding: '16px' }}>
          {/* Count badge */}
          <div style={{ marginBottom: '16px' }}>
            <span style={{ 
              background: '#FEF3C7', color: '#92400E', fontWeight: 600, 
              fontSize: '14px', padding: '6px 14px', borderRadius: '10px'
            }}>
              {submissions.length} pending
            </span>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px', color: '#64748B' }}>Loading...</div>
          ) : submissions.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px' }}>
              <CheckCircle size={48} color="#10B981" style={{ marginBottom: '16px' }} />
              <h3 style={{ color: '#1E293B' }}>All Clear!</h3>
              <p style={{ color: '#64748B' }}>No pending approvals at this time.</p>
            </div>
          ) : submissions.map(s => (
            <ApprovalCard key={s.id} submission={s} onApprove={handleApproved} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PendingApprovals;
