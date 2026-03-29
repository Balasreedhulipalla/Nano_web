// ========================================
// Central API Service for Nano Meta Tool
// Django backend runs on http://localhost:8000
// ========================================

const BASE_URL = 'http://180.235.121.253:8109';

// -----------------------------------------------
// Token helpers (stored in localStorage)
// -----------------------------------------------
export const getToken = () => localStorage.getItem('access_token');
export const getRefreshToken = () => localStorage.getItem('refresh_token');
export const saveTokens = (access, refresh) => {
  localStorage.setItem('access_token', access);
  if (refresh) localStorage.setItem('refresh_token', refresh);
};
export const clearTokens = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user_role');
  localStorage.removeItem('user_info');
};
export const saveUserInfo = (info) => {
  localStorage.setItem('user_info', JSON.stringify(info));
  localStorage.setItem('user_role', info.role || 'user');
};
export const getUserInfo = () => {
  try { return JSON.parse(localStorage.getItem('user_info')) || {}; } catch { return {}; }
};
export const getUserRole = () => localStorage.getItem('user_role') || 'user';

// -----------------------------------------------
// Core fetch wrapper with JWT Bearer auth
// -----------------------------------------------
async function apiFetch(path, options = {}, auth = true) {
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (auth) {
    const token = getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });

  // Auto-refresh on 401
  if (res.status === 401 && auth) {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      const refreshRes = await fetch(`${BASE_URL}/api/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: refreshToken }),
      });
      if (refreshRes.ok) {
        const data = await refreshRes.json();
        saveTokens(data.access, data.refresh);
        headers['Authorization'] = `Bearer ${data.access}`;
        return fetch(`${BASE_URL}${path}`, { ...options, headers });
      } else {
        clearTokens();
        window.location.href = '/login';
      }
    }
  }

  return res;
}

// -----------------------------------------------
// AUTH APIs
// -----------------------------------------------

/**
 * Register a new user
 * POST /api/user/register/
 * Body: { full_name, email, password }
 */
export async function register(full_name, email, password) {
  const res = await apiFetch('/api/user/register/', {
    method: 'POST',
    body: JSON.stringify({ full_name, email, password }),
  }, false);
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}

/**
 * Login with email & password using JWT
 * POST /api/login/
 * Returns { access, refresh, role, message }
 */
export async function login(email, password) {
  const res = await apiFetch('/api/login/', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  }, false);
  const data = await res.json();
  if (!res.ok) throw data;
  saveTokens(data.access, data.refresh);
  saveUserInfo({ email, role: data.role || 'user' });
  return data;
}

/**
 * Logout - clears local tokens
 */
export function logout() {
  clearTokens();
}

/**
 * Forgot password - sends OTP
 * POST /api/user/forgot-password/
 */
export async function forgotPassword(email) {
  const res = await apiFetch('/api/user/forgot-password/', {
    method: 'POST',
    body: JSON.stringify({ email }),
  }, false);
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}

/**
 * Reset password with OTP
 * POST /api/user/reset-password/
 */
export async function resetPassword(email, otp, new_password) {
  const res = await apiFetch('/api/user/reset-password/', {
    method: 'POST',
    body: JSON.stringify({ email, otp, new_password }),
  }, false);
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}

// -----------------------------------------------
// PROFILE APIs
// -----------------------------------------------

/**
 * Get current user profile
 * GET /api/user/profile/
 */
export async function getProfile() {
  const res = await apiFetch('/api/user/profile/');
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}

/**
 * Edit profile
 * PUT /api/user/edit/
 * Body: { full_name?, email? }
 */
export async function editProfile(updates) {
  const res = await apiFetch('/api/user/edit/', {
    method: 'PUT',
    body: JSON.stringify(updates),
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}

// -----------------------------------------------
// NOTIFICATIONS API
// -----------------------------------------------

/**
 * Get notifications for current user
 * GET /api/user/notifications/
 */
export async function getNotifications() {
  const res = await apiFetch('/api/user/notifications/');
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}

// -----------------------------------------------
// DATASET APIs
// -----------------------------------------------

/**
 * Create a new dataset
 * POST /api/user/datasets/create/
 */
export async function createDataset(title, description) {
  const res = await apiFetch('/api/user/datasets/create/', {
    method: 'POST',
    body: JSON.stringify({ title, description }),
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}

// -----------------------------------------------
// SUBMISSION APIs
// -----------------------------------------------

/**
 * Get all submissions
 * GET /api/user/submissions/
 */
export async function getSubmissions() {
  const res = await apiFetch('/api/user/submissions/');
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}

/**
 * Create a submission (upload a file against a dataset)
 * POST /api/user/submissions/create/
 * Uses FormData since there's a file field
 */
export async function createSubmission(datasetId, file, notes = '') {
  const formData = new FormData();
  formData.append('dataset', datasetId);
  formData.append('file', file);
  formData.append('notes', notes);
  formData.append('submitted_by', getUserInfo().id || '');

  const token = getToken();
  const res = await fetch(`${BASE_URL}/api/user/submissions/create/`, {
    method: 'POST',
    headers: token ? { 'Authorization': `Bearer ${token}` } : {},
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}

/**
 * Screen a submission
 * POST /api/user/submissions/<pk>/screen/
 * action: "pass" | "reject"
 */
export async function screenSubmission(pk, action) {
  const res = await apiFetch(`/api/user/submissions/${pk}/screen/`, {
    method: 'POST',
    body: JSON.stringify({ action }),
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}

/**
 * Review a submission
 * POST /api/user/submissions/<pk>/review/
 * action: "approve_review" | "reject"
 */
export async function reviewSubmission(pk, action) {
  const res = await apiFetch(`/api/user/submissions/${pk}/review/`, {
    method: 'POST',
    body: JSON.stringify({ action }),
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}

/**
 * Get pending approvals (submissions with status='review')
 * GET /api/user/submissions/pending-approvals/
 */
export async function getPendingApprovals() {
  const res = await apiFetch('/api/user/submissions/pending-approvals/');
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}

/**
 * Approve a submission
 * POST /api/user/submissions/<pk>/approve/
 */
export async function approveSubmission(pk) {
  const res = await apiFetch(`/api/user/submissions/${pk}/approve/`, {
    method: 'POST',
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}

// -----------------------------------------------
// ADMIN APIs
// -----------------------------------------------

/**
 * Admin dashboard - get all users
 * GET /api/admin/dashboard/
 */
export async function getAdminDashboard() {
  const res = await apiFetch('/api/admin/dashboard/');
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}

/**
 * Delete a user (super admin only)
 * DELETE /api/admin/delete-user/<user_id>/
 */
export async function deleteUser(userId) {
  const res = await apiFetch(`/api/admin/delete-user/${userId}/`, {
    method: 'DELETE',
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}

/**
 * Create an admin account
 * POST /api/admin/create-admin/
 */
export async function createAdmin(full_name, email, password) {
  const res = await apiFetch('/api/admin/create-admin/', {
    method: 'POST',
    body: JSON.stringify({ full_name, email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}
