import { useState } from 'react';
import { Search, Filter, Eye, Edit, Ban, Shield, UserCheck, UserX } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../../components/ui/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../../components/ui/select';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '../../components/ui/dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '../../components/ui/alert-dialog';
import { toast } from 'sonner';


// Mock user data
const mockUsers = [
    { id: 1, fullName: 'Nguyen Admin', email: 'nguyen@mybooking.com', role: 'admin', status: 'active', joinDate: '2024-01-15' },
    { id: 2, fullName: 'Thanh Customer', email: 'thanh@gmail.com', role: 'customer', status: 'active', joinDate: '2024-03-20' },
    { id: 3, fullName: 'Loi Employee', email: 'loi@mybooking.com', role: 'employee', status: 'active', joinDate: '2024-02-10' },
    { id: 4, fullName: 'Minh Tran', email: 'minh.tran@gmail.com', role: 'customer', status: 'active', joinDate: '2024-04-05' },
    { id: 5, fullName: 'Anh Le', email: 'anh.le@gmail.com', role: 'customer', status: 'banned', joinDate: '2024-03-12' },
    { id: 6, fullName: 'Hoa Nguyen', email: 'hoa.nguyen@gmail.com', role: 'employee', status: 'active', joinDate: '2024-01-25' },
    { id: 7, fullName: 'Tuan Pham', email: 'tuan.pham@gmail.com', role: 'customer', status: 'active', joinDate: '2024-05-01' },
    { id: 8, fullName: 'Linh Vo', email: 'linh.vo@gmail.com', role: 'customer', status: 'active', joinDate: '2024-04-18' },
];


const AccountManagementPage = ({ onNavigate }) => {
    const [users, setUsers] = useState(mockUsers);
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showRoleDialog, setShowRoleDialog] = useState(false);
    const [newRole, setNewRole] = useState('');
    const [userToBan, setUserToBan] = useState(null);
    const [showBanDialog, setShowBanDialog] = useState(false);

    const itemsPerPage = 6;

    // Filter users
    const filteredUsers = users.filter(user => {
        const matchesSearch =
            user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.id.toString().includes(searchQuery);

        const matchesRole = roleFilter === 'all' || user.role === roleFilter;
        const matchesStatus = statusFilter === 'all' || user.status === statusFilter;

        return matchesSearch && matchesRole && matchesStatus;
    });

    // Pagination
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

    const handleUpdateRole = () => {
        if (!selectedUser || !newRole) return;

        setUsers(users.map(u =>
            u.id === selectedUser.id ? { ...u, role: newRole } : u
        ));

        toast.success('Role updated successfully!');
        setShowRoleDialog(false);
        setSelectedUser(null);
        setNewRole('');
    };

    const handleBanToggle = () => {
        if (!userToBan) return;

        const newStatus = userToBan.status === 'active' ? 'banned' : 'active';
        setUsers(users.map(u =>
            u.id === userToBan.id ? { ...u, status: newStatus } : u
        ));

        toast.success(`User ${newStatus === 'banned' ? 'banned' : 'unbanned'} successfully!`);
        setShowBanDialog(false);
        setUserToBan(null);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-6 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
                        Account Management
                    </h1>
                    <p className="text-gray-600">
                        Manage user accounts, roles, and permissions
                    </p>
                </div>

                {/* Search and Filter Bar */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Search */}
                        <div className="md:col-span-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <Input
                                    placeholder="Search by name, email, or ID..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        {/* Role Filter */}
                        <div>
                            <Select value={roleFilter} onValueChange={setRoleFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Filter by role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Roles</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="employee">Employee</SelectItem>
                                    <SelectItem value="customer">Customer</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Status Filter */}
                        <div>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="banned">Banned</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User ID</TableHead>
                                <TableHead>Full Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Join Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedUsers.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>#{user.id}</TableCell>
                                    <TableCell>{user.fullName}</TableCell>
                                    <TableCell className="text-gray-600">{user.email}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="outline"
                                            className={
                                                user.role === 'admin'
                                                    ? 'bg-purple-100 text-purple-700 border-purple-200'
                                                    : user.role === 'employee'
                                                        ? 'bg-blue-100 text-blue-700 border-blue-200'
                                                        : 'bg-gray-100 text-gray-700 border-gray-200'
                                            }
                                        >
                                            {user.role === 'admin' && <Shield className="w-3 h-3 mr-1" />}
                                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={user.status === 'active' ? 'default' : 'destructive'}
                                            className={
                                                user.status === 'active'
                                                    ? 'bg-green-100 text-green-700 border-green-200'
                                                    : 'bg-red-100 text-red-700 border-red-200'
                                            }
                                        >
                                            {user.status === 'active' ? <UserCheck className="w-3 h-3 mr-1" /> : <UserX className="w-3 h-3 mr-1" />}
                                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-gray-600">
                                        {new Date(user.joinDate).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => {
                                                    setSelectedUser(user);
                                                    setNewRole(user.role);
                                                    setShowRoleDialog(true);
                                                }}
                                            >
                                                <Edit className="w-4 h-4 mr-1" />
                                                Update Role
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => {
                                                    setUserToBan(user);
                                                    setShowBanDialog(true);
                                                }}
                                                className={user.status === 'banned' ? 'text-green-600 hover:text-green-700' : 'text-red-600 hover:text-red-700'}
                                            >
                                                {user.status === 'banned' ? (
                                                    <>
                                                        <UserCheck className="w-4 h-4 mr-1" />
                                                        Unban
                                                    </>
                                                ) : (
                                                    <>
                                                        <Ban className="w-4 h-4 mr-1" />
                                                        Ban
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between px-6 py-4 border-t">
                            <p className="text-sm text-gray-600">
                                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredUsers.length)} of {filteredUsers.length} users
                            </p>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </Button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <Button
                                        key={page}
                                        variant={currentPage === page ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => setCurrentPage(page)}
                                        className={currentPage === page ? 'bg-[#14b8a6] hover:bg-[#0d9488]' : ''}
                                    >
                                        {page}
                                    </Button>
                                ))}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Update Role Dialog */}
                <Dialog open={showRoleDialog} onOpenChange={setShowRoleDialog}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Update User Role</DialogTitle>
                            <DialogDescription>
                                Change the role for {selectedUser?.fullName}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                            <label className="block text-sm mb-2">Select New Role</label>
                            <Select value={newRole} onValueChange={setNewRole}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="employee">Employee</SelectItem>
                                    <SelectItem value="customer">Customer</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setShowRoleDialog(false)}>
                                Cancel
                            </Button>
                            <Button
                                onClick={handleUpdateRole}
                                style={{ backgroundColor: '#14b8a6' }}
                                className="hover:bg-[#0d9488]"
                            >
                                Confirm
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Ban/Unban Confirmation Dialog */}
                <AlertDialog open={showBanDialog} onOpenChange={setShowBanDialog}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                {userToBan?.status === 'active' ? 'Ban User' : 'Unban User'}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to {userToBan?.status === 'active' ? 'ban' : 'unban'} {userToBan?.fullName}?
                                {userToBan?.status === 'active' && ' This user will no longer be able to access their account.'}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleBanToggle}
                                className={userToBan?.status === 'active' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}
                            >
                                Confirm
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
}

export default AccountManagementPage