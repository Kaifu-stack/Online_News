import React, { useState, useEffect } from 'react';
import { FaSearch, FaUserEdit, FaTrash, FaUserShield, FaUser, FaFilter, FaPlus } from 'react-icons/fa';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import api from '../Service/api';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [showUserModal, setShowUserModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, [currentPage, roleFilter]);

    const fetchUsers = async () => {
        setLoading(true);

        try {
            const params = {
                page: currentPage,
                limit: 10,
            };

            if (roleFilter !== 'all') params.role = roleFilter;

            const { data } = await api.get('/users', { params });

            const result = data.data || data;

            setUsers(result.users || []);
            setTotalPages(result.totalPages || 1);
        } catch (error) {
            console.error("User fetch error:", error);
            toast.error("Failed to load users");
        }

        setLoading(false);
    };

    // Reset page on search
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handleDeleteUser = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user?"))
            return;

        try {
            const { data } = await api.delete(`/users/${userId}`);

            if (data.success) {
                toast.success("User deleted");
                fetchUsers();
            } else toast.error(data.message || "Failed to delete");
        } catch (err) {
            toast.error("Failed to delete user");
        }
    };

    const handleUpdateRole = async (userId, newRole) => {
        try {
            const { data } = await api.put(`/users/${userId}/role`, { role: newRole });

            if (data.success) {
                toast.success("Role updated");
                fetchUsers();
            } else toast.error(data.message || "Failed to update role");
        } catch {
            toast.error("Update failed");
        }
    };

    const handleToggleStatus = async (userId, currentStatus) => {
        const newStatus = currentStatus === "active" ? "inactive" : "active";

        try {
            const { data } = await api.put(`/users/${userId}/status`, { status: newStatus });

            if (data.success) {
                toast.success(`User ${newStatus}`);
                fetchUsers();
            } else toast.error("Failed to update status");
        } catch {
            toast.error("Failed to update status");
        }
    };

    // Apply search filter
    const filteredUsers = users.filter(
        (u) =>
            u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const UserModal = ({ user, onClose }) => {
        const [name, setName] = useState(user?.name || "");
        const [email, setEmail] = useState(user?.email || "");
        const [role, setRole] = useState(user?.role || "user");

        const handleSubmit = async () => {
            if (!name || !email) {
                toast.error("Name & Email required");
                return;
            }

            if (user) {
                try {
                    const { data } = await api.put(`/users/${user._id}`, { name, email, role });

                    if (data.success) {
                        toast.success("User updated");
                        fetchUsers();
                        onClose();
                    }
                } catch {
                    toast.error("Failed to update user");
                }
            } else {
                try {
                    const { data } = await api.post(`/users`, { name, email, role });

                    if (data.success) {
                        toast.success("User created");
                        fetchUsers();
                        onClose();
                    }
                } catch {
                    toast.error("Failed to create user");
                }
            }
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl max-w-md w-full p-6">

                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {user ? "Edit User" : "Add User"}
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="input-field"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input-field"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Role</label>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="input-field"
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        <div className="flex justify-end space-x-3 pt-4">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 border border-gray-300 rounded-lg"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleSubmit}
                                className="btn-primary"
                            >
                                {user ? "Update" : "Create"}
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                    <p className="text-gray-600 mt-1">Manage users and permissions</p>
                </div>

                <button
                    onClick={() => {
                        setSelectedUser(null);
                        setShowUserModal(true);
                    }}
                    className="btn-primary flex items-center space-x-2"
                >
                    <FaPlus /> <span>Add User</span>
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-card">
                    <p className="text-gray-600">Total Users</p>
                    <p className="text-3xl font-bold">{users.length}</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-card">
                    <p className="text-gray-600">Admins</p>
                    <p className="text-3xl font-bold">{users.filter(u => u.role === 'admin').length}</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-card">
                    <p className="text-gray-600">Active Users</p>
                    <p className="text-3xl font-bold">{users.filter(u => u.status === 'active').length}</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-6 rounded-xl shadow-card">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            className="input-field pl-10"
                            placeholder="Search name or email..."
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <FaFilter className="text-gray-400" />
                        <select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            className="input-field"
                        >
                            <option value="all">All Roles</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>

                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-card">

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-gray-500 text-left uppercase text-xs">User</th>
                                <th className="px-6 py-3 text-gray-500 text-left uppercase text-xs">Role</th>
                                <th className="px-6 py-3 text-gray-500 text-left uppercase text-xs">Status</th>
                                <th className="px-6 py-3 text-gray-500 text-left uppercase text-xs">Joined</th>
                                <th className="px-6 py-3 text-gray-500 text-left uppercase text-xs">Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-12">
                                        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin mx-auto" />
                                    </td>
                                </tr>
                            ) : filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-12 text-gray-500">
                                        No users found
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((u) => (
                                    <tr key={u._id} className="hover:bg-gray-50">

                                        <td className="px-6 py-4">
                                            <p className="font-medium">{u.name}</p>
                                            <p className="text-gray-500 text-sm">{u.email}</p>
                                        </td>

                                        <td className="px-6 py-4">
                                            <select
                                                value={u.role}
                                                onChange={(e) => handleUpdateRole(u._id, e.target.value)}
                                                className="border px-3 py-1 rounded-lg"
                                            >
                                                <option value="user">User</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        </td>

                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleToggleStatus(u._id, u.status)}
                                                className={`px-3 py-1 rounded-full text-xs 
                                                ${u.status === "active"
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-red-100 text-red-800"}`}
                                            >
                                                {u.status}
                                            </button>
                                        </td>

                                        <td className="px-6 py-4 text-gray-500">
                                            {format(new Date(u.createdAt), "MMM dd, yyyy")}
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex space-x-3">
                                                <button
                                                    onClick={() => {
                                                        setSelectedUser(u);
                                                        setShowUserModal(true);
                                                    }}
                                                    className="text-primary-600"
                                                >
                                                    <FaUserEdit />
                                                </button>

                                                <button
                                                    onClick={() => handleDeleteUser(u._id)}
                                                    className="text-danger-600"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>

                                    </tr>
                                ))
                            )}

                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="px-6 py-4 flex items-center justify-between border-t">

                        <button
                            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded-lg 
                                ${currentPage === 1
                                    ? "bg-gray-100 text-gray-400"
                                    : "bg-primary-500 text-white"}`}
                        >
                            Previous
                        </button>

                        <span className="text-gray-600">
                            Page {currentPage} of {totalPages}
                        </span>

                        <button
                            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 rounded-lg 
                                ${currentPage === totalPages
                                    ? "bg-gray-100 text-gray-400"
                                    : "bg-primary-500 text-white"}`}
                        >
                            Next
                        </button>

                    </div>
                )}
            </div>

            {/* Modal */}
            {showUserModal && (
                <UserModal
                    user={selectedUser}
                    onClose={() => {
                        setSelectedUser(null);
                        setShowUserModal(false);
                    }}
                />
            )}

        </div>
    );
};

export default UserManagement;
