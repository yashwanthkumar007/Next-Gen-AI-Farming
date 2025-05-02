import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/admin/users');
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const toggleUserStatus = async (id, isActive) => {
    try {
      await fetch(`http://localhost:5000/api/admin/users/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive })
      });
      alert(`User ${isActive ? 'activated' : 'deactivated'}`);
      window.location.reload();
    } catch (err) {
      console.error('Status update failed:', err);
    }
  };

  const handleRemove = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await fetch(`http://localhost:5000/api/admin/users/${id}`, {
        method: 'DELETE'
      });
      alert('User deleted');
      window.location.reload();
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    const matchStatus = statusFilter === 'all' || (u.isActive ? 'active' : 'inactive') === statusFilter;
    return matchRole && matchStatus;
  });

  return (
    <div className="container py-5">
      <h4 className="mb-4 text-primary">👥 Registered Users</h4>

      <div className="d-flex justify-content-end gap-3 mb-3">
        <select className="form-select w-auto" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
          <option value="all">All Roles</option>
          <option value="farmer">Farmer</option>
          <option value="buyer">Buyer</option>
        </select>

        <select className="form-select w-auto" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center mt-4">
          <div className="spinner-border text-primary" role="status" />
        </div>
      ) : filteredUsers.length === 0 ? (
        <p className="text-muted">No users match your filter criteria.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover shadow-sm">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, idx) => (
                <tr key={user._id}>
                  <td>{idx + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`badge bg-${user.role === 'farmer' ? 'success' : 'info'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span className={`badge bg-${user.isActive ? 'success' : 'secondary'}`}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <button
                      className={`btn btn-sm ${user.isActive ? 'btn-outline-danger' : 'btn-outline-success'} me-2`}
                      onClick={() => toggleUserStatus(user._id, !user.isActive)}
                    >
                      {user.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      className="btn btn-sm btn-outline-dark"
                      onClick={() => handleRemove(user._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUserList;
