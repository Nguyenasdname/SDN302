import { useState } from 'react';
import {
    Search,
    Filter,
    Eye,
    LogIn,
    LogOut as CheckOutIcon,
    MoreVertical,
    Calendar,
    X,
    Mail,
    XCircle,
    Download
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../../components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../../components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '../../components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { toast } from 'sonner';

// Mock booking data
const mockBookings = [
    {
        id: 'BK001',
        resortName: 'Oceanview Villa Paradise',
        customerName: 'Nguyen Van A',
        customerEmail: 'nguyen.a@email.com',
        customerPhone: '+84 901 234 567',
        checkInDate: '2025-11-10',
        checkOutDate: '2025-11-15',
        totalAmount: 1750,
        status: 'confirmed',
        bookingDate: '2025-10-20',
        guests: 4,
        services: ['Spa Package', 'Airport Transfer'],
        paymentHistory: [
            { date: '2025-10-20', amount: 525, type: 'Deposit (30%)', status: 'Paid' },
            { date: '2025-11-09', amount: 1225, type: 'Final Payment', status: 'Pending' }
        ],
        specialRequests: 'Late check-in requested'
    },
    {
        id: 'BK002',
        resortName: 'Ancient Town Retreat',
        customerName: 'Tran Thi B',
        customerEmail: 'tran.b@email.com',
        customerPhone: '+84 902 345 678',
        checkInDate: '2025-11-05',
        checkOutDate: '2025-11-08',
        totalAmount: 900,
        status: 'pending_deposit',
        bookingDate: '2025-11-01',
        guests: 2,
        services: ['Breakfast Included'],
        paymentHistory: [
            { date: '2025-11-01', amount: 270, type: 'Deposit (30%)', status: 'Pending' }
        ],
        specialRequests: ''
    },
    {
        id: 'BK003',
        resortName: 'Marble Mountain Lodge',
        customerName: 'Le Van C',
        customerEmail: 'le.c@email.com',
        customerPhone: '+84 903 456 789',
        checkInDate: '2025-11-05',
        checkOutDate: '2025-11-06',
        totalAmount: 250,
        status: 'checked_in',
        bookingDate: '2025-10-15',
        guests: 3,
        services: ['Dinner', 'City Tour'],
        paymentHistory: [
            { date: '2025-10-15', amount: 75, type: 'Deposit (30%)', status: 'Paid' },
            { date: '2025-11-05', amount: 175, type: 'Final Payment', status: 'Paid' }
        ],
        specialRequests: 'Non-smoking room'
    },
    {
        id: 'BK004',
        resortName: 'Riverside Boutique Resort',
        customerName: 'Pham Thi D',
        customerEmail: 'pham.d@email.com',
        customerPhone: '+84 904 567 890',
        checkInDate: '2025-10-28',
        checkOutDate: '2025-11-02',
        totalAmount: 1500,
        status: 'checked_out',
        bookingDate: '2025-09-15',
        guests: 6,
        services: ['All Meals', 'Spa Package', 'Beach Activities'],
        paymentHistory: [
            { date: '2025-09-15', amount: 450, type: 'Deposit (30%)', status: 'Paid' },
            { date: '2025-10-27', amount: 1050, type: 'Final Payment', status: 'Paid' }
        ],
        specialRequests: 'Anniversary celebration - requested room decoration'
    },
    {
        id: 'BK005',
        resortName: 'Sunset Beach Resort',
        customerName: 'Hoang Van E',
        customerEmail: 'hoang.e@email.com',
        customerPhone: '+84 905 678 901',
        checkInDate: '2025-10-25',
        checkOutDate: '2025-10-27',
        totalAmount: 600,
        status: 'cancelled' ,
        bookingDate: '2025-10-10',
        guests: 2,
        services: [],
        paymentHistory: [
            { date: '2025-10-10', amount: 180, type: 'Deposit (30%)', status: 'Refunded' }
        ],
        specialRequests: '',
        cancellationReason: 'Change of travel plans',
        cancellationDate: '2025-10-20'
    },
    {
        id: 'BK006',
        resortName: 'Dragon Bridge View',
        customerName: 'Vo Thi F',
        customerEmail: 'vo.f@email.com',
        customerPhone: '+84 906 789 012',
        checkInDate: '2025-11-07',
        checkOutDate: '2025-11-12',
        totalAmount: 2250,
        status: 'confirmed' ,
        bookingDate: '2025-10-18',
        guests: 8,
        services: ['Full Board', 'Private Pool', 'Butler Service'],
        paymentHistory: [
            { date: '2025-10-18', amount: 675, type: 'Deposit (30%)', status: 'Paid' },
            { date: '2025-11-06', amount: 1575, type: 'Final Payment', status: 'Pending' }
        ],
        specialRequests: 'Family reunion - need connecting rooms'
    },
    {
        id: 'BK007',
        resortName: 'Lantern Town Heritage',
        customerName: 'Bui Van G',
        customerEmail: 'bui.g@email.com',
        customerPhone: '+84 907 890 123',
        checkInDate: '2025-11-05',
        checkOutDate: '2025-11-05',
        totalAmount: 180,
        status: 'checked_out' ,
        bookingDate: '2025-11-04',
        guests: 2,
        services: ['Breakfast'],
        paymentHistory: [
            { date: '2025-11-05', amount: 180, type: 'Full Payment', status: 'Paid' }
        ],
        specialRequests: 'Day-use booking only'
    },
    {
        id: 'BK008',
        resortName: 'Palm Garden Estate',
        customerName: 'Dao Thi H',
        customerEmail: 'dao.h@email.com',
        customerPhone: '+84 908 901 234',
        checkInDate: '2025-11-12',
        checkOutDate: '2025-11-20',
        totalAmount: 3200,
        status: 'confirmed' ,
        bookingDate: '2025-10-01',
        guests: 10,
        services: ['Wedding Package', 'Photography', 'Catering', 'Decoration'],
        paymentHistory: [
            { date: '2025-10-01', amount: 960, type: 'Deposit (30%)', status: 'Paid' },
            { date: '2025-11-11', amount: 2240, type: 'Final Payment', status: 'Pending' }
        ],
        specialRequests: 'Beach wedding ceremony - needs event coordinator'
    }
];


const BookingManagementPage = ({ onNavigate }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [checkInDateFilter, setCheckInDateFilter] = useState('');
    const [checkOutDateFilter, setCheckOutDateFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [cancellationReason, setCancellationReason] = useState('');
    const itemsPerPage = 10;

    // Filter bookings
    const filteredBookings = mockBookings.filter(booking => {
        const matchesSearch =
            booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.resortName.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;

        const matchesCheckIn = !checkInDateFilter || booking.checkInDate === checkInDateFilter;
        const matchesCheckOut = !checkOutDateFilter || booking.checkOutDate === checkOutDateFilter;

        return matchesSearch && matchesStatus && matchesCheckIn && matchesCheckOut;
    });

    // Pagination
    const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedBookings = filteredBookings.slice(startIndex, startIndex + itemsPerPage);

    const getStatusBadge = (status) => {
        const statusConfig = {
            pending_deposit: { label: 'Pending Deposit', className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
            confirmed: { label: 'Confirmed', className: 'bg-green-100 text-green-800 border-green-200' },
            checked_in: { label: 'Checked-In', className: 'bg-blue-100 text-blue-800 border-blue-200' },
            checked_out: { label: 'Checked-Out', className: 'bg-gray-100 text-gray-800 border-gray-200' },
            cancelled: { label: 'Cancelled', className: 'bg-red-100 text-red-800 border-red-200' }
        };

        const config = statusConfig[status];
        return (
            <Badge className={`border ${config.className}`}>
                {config.label}
            </Badge>
        );
    };

    const canCheckIn = (booking) => {
        const today = new Date().toISOString().split('T')[0];
        return booking.status === 'confirmed' && booking.checkInDate === today;
    };

    const canCheckOut = (booking) => {
        const today = new Date().toISOString().split('T')[0];
        return booking.status === 'checked_in' && booking.checkOutDate >= today;
    };

    const handleCheckIn = (booking) => {
        toast.success(`Guest ${booking.customerName} has been checked in successfully!`);
        // Update booking status in real implementation
    };

    const handleCheckOut = (booking) => {
        toast.success(`Guest ${booking.customerName} has been checked out successfully!`);
        // Update booking status in real implementation
    };

    const handleCancelBooking = () => {
        if (!cancellationReason.trim()) {
            toast.error('Please provide a cancellation reason');
            return;
        }
        toast.success(`Booking ${selectedBooking.id} has been cancelled`);
        setShowCancelModal(false);
        setCancellationReason('');
        setSelectedBooking(null);
        // Update booking status in real implementation
    };

    const handleResendConfirmation = (booking) => {
        toast.success(`Confirmation email sent to ${booking.customerEmail}`);
    };

    const handleExportBookings = () => {
        toast.success('Booking data exported successfully');
        // Implement export functionality
    };

    const clearFilters = () => {
        setSearchTerm('');
        setStatusFilter('all');
        setCheckInDateFilter('');
        setCheckOutDateFilter('');
        setCurrentPage(1);
    };

    const hasActiveFilters = searchTerm || statusFilter !== 'all' || checkInDateFilter || checkOutDateFilter;

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl" style={{ fontFamily: 'var(--font-serif)' }}>
                        Booking Management
                    </h1>
                    <p className="text-gray-500 mt-1">
                        View and manage all resort bookings
                    </p>
                </div>
                <Button onClick={handleExportBookings} className="bg-[#fbbf24] hover:bg-[#f59e0b] text-gray-900">
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                </Button>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Filter className="w-5 h-5 text-gray-500" />
                        <span className="text-sm">Filters</span>
                    </div>
                    {hasActiveFilters && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearFilters}
                            className="text-[#14b8a6] hover:text-[#0d9488]"
                        >
                            <X className="w-4 h-4 mr-1" />
                            Clear Filters
                        </Button>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Search */}
                    <div className="lg:col-span-2">
                        <Label htmlFor="search">Search</Label>
                        <div className="relative mt-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                                id="search"
                                placeholder="Search by Booking ID, Customer Name, or Resort Name"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>

                    {/* Status Filter */}
                    <div>
                        <Label htmlFor="status">Status</Label>
                        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value)}>
                            <SelectTrigger id="status" className="mt-1">
                                <SelectValue placeholder="All Statuses" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Statuses</SelectItem>
                                <SelectItem value="pending_deposit">Pending Deposit</SelectItem>
                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                <SelectItem value="checked_in">Checked-In</SelectItem>
                                <SelectItem value="checked_out">Checked-Out</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Check-in Date Filter */}
                    <div>
                        <Label htmlFor="checkin">Check-in Date</Label>
                        <div className="relative mt-1">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            <Input
                                id="checkin"
                                type="date"
                                value={checkInDateFilter}
                                onChange={(e) => setCheckInDateFilter(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>

                    {/* Check-out Date Filter */}
                    <div>
                        <Label htmlFor="checkout">Check-out Date</Label>
                        <div className="relative mt-1">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            <Input
                                id="checkout"
                                type="date"
                                value={checkOutDateFilter}
                                onChange={(e) => setCheckOutDateFilter(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                <div className="pt-2 border-t">
                    <p className="text-sm text-gray-600">
                        Showing <span className="font-medium">{paginatedBookings.length}</span> of{' '}
                        <span className="font-medium">{filteredBookings.length}</span> bookings
                    </p>
                </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Booking ID</TableHead>
                                <TableHead>Resort Name</TableHead>
                                <TableHead>Customer Name</TableHead>
                                <TableHead>Check-in</TableHead>
                                <TableHead>Check-out</TableHead>
                                <TableHead>Total Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedBookings.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                                        No bookings found matching your filters
                                    </TableCell>
                                </TableRow>
                            ) : (
                                paginatedBookings.map((booking) => (
                                    <TableRow key={booking.id}>
                                        <TableCell>
                                            <span className="text-[#14b8a6]">{booking.id}</span>
                                        </TableCell>
                                        <TableCell>{booking.resortName}</TableCell>
                                        <TableCell>{booking.customerName}</TableCell>
                                        <TableCell>{new Date(booking.checkInDate).toLocaleDateString('en-GB')}</TableCell>
                                        <TableCell>{new Date(booking.checkOutDate).toLocaleDateString('en-GB')}</TableCell>
                                        <TableCell>${booking.totalAmount.toLocaleString()}</TableCell>
                                        <TableCell>{getStatusBadge(booking.status)}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {/* View Details */}
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => {
                                                        setSelectedBooking(booking);
                                                        setShowDetailsModal(true);
                                                    }}
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Button>

                                                {/* Check-in Button */}
                                                {canCheckIn(booking) && (
                                                    <Button
                                                        size="sm"
                                                        onClick={() => handleCheckIn(booking)}
                                                        className="bg-blue-600 hover:bg-blue-700 text-white"
                                                    >
                                                        <LogIn className="w-4 h-4 mr-1" />
                                                        Check-In
                                                    </Button>
                                                )}

                                                {/* Check-out Button */}
                                                {canCheckOut(booking) && (
                                                    <Button
                                                        size="sm"
                                                        onClick={() => handleCheckOut(booking)}
                                                        className="bg-green-600 hover:bg-green-700 text-white"
                                                    >
                                                        <CheckOutIcon className="w-4 h-4 mr-1" />
                                                        Check-Out
                                                    </Button>
                                                )}

                                                {/* More Actions */}
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="sm">
                                                            <MoreVertical className="w-4 h-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => handleResendConfirmation(booking)}>
                                                            <Mail className="w-4 h-4 mr-2" />
                                                            Resend Confirmation
                                                        </DropdownMenuItem>
                                                        {booking.status !== 'cancelled' && booking.status !== 'checked_out' && (
                                                            <DropdownMenuItem
                                                                onClick={() => {
                                                                    setSelectedBooking(booking);
                                                                    setShowCancelModal(true);
                                                                }}
                                                                className="text-red-600"
                                                            >
                                                                <XCircle className="w-4 h-4 mr-2" />
                                                                Cancel Booking
                                                            </DropdownMenuItem>
                                                        )}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between px-6 py-4 border-t">
                        <div className="text-sm text-gray-600">
                            Page {currentPage} of {totalPages}
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* Booking Details Modal */}
            <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle style={{ fontFamily: 'var(--font-serif)' }}>
                            Booking Details - {selectedBooking?.id}
                        </DialogTitle>
                        <DialogDescription>
                            Complete information about this booking
                        </DialogDescription>
                    </DialogHeader>

                    {selectedBooking && (
                        <div className="space-y-6">
                            {/* Status */}
                            <div>
                                <Label>Current Status</Label>
                                <div className="mt-2">
                                    {getStatusBadge(selectedBooking.status)}
                                </div>
                            </div>

                            {/* Customer Information */}
                            <div>
                                <h3 className="text-lg mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
                                    Customer Information
                                </h3>
                                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                                    <div>
                                        <Label className="text-gray-600">Name</Label>
                                        <p className="mt-1">{selectedBooking.customerName}</p>
                                    </div>
                                    <div>
                                        <Label className="text-gray-600">Email</Label>
                                        <p className="mt-1">{selectedBooking.customerEmail}</p>
                                    </div>
                                    <div>
                                        <Label className="text-gray-600">Phone</Label>
                                        <p className="mt-1">{selectedBooking.customerPhone}</p>
                                    </div>
                                    <div>
                                        <Label className="text-gray-600">Guests</Label>
                                        <p className="mt-1">{selectedBooking.guests} people</p>
                                    </div>
                                </div>
                            </div>

                            {/* Booking Information */}
                            <div>
                                <h3 className="text-lg mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
                                    Booking Information
                                </h3>
                                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                                    <div>
                                        <Label className="text-gray-600">Resort</Label>
                                        <p className="mt-1">{selectedBooking.resortName}</p>
                                    </div>
                                    <div>
                                        <Label className="text-gray-600">Booking Date</Label>
                                        <p className="mt-1">{new Date(selectedBooking.bookingDate).toLocaleDateString('en-GB')}</p>
                                    </div>
                                    <div>
                                        <Label className="text-gray-600">Check-in</Label>
                                        <p className="mt-1">{new Date(selectedBooking.checkInDate).toLocaleDateString('en-GB')}</p>
                                    </div>
                                    <div>
                                        <Label className="text-gray-600">Check-out</Label>
                                        <p className="mt-1">{new Date(selectedBooking.checkOutDate).toLocaleDateString('en-GB')}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <Label className="text-gray-600">Total Amount</Label>
                                        <p className="mt-1 text-2xl text-[#14b8a6]">
                                            ${selectedBooking.totalAmount.toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Services */}
                            {selectedBooking.services.length > 0 && (
                                <div>
                                    <h3 className="text-lg mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
                                        Additional Services
                                    </h3>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <ul className="list-disc list-inside space-y-1">
                                            {selectedBooking.services.map((service, index) => (
                                                <li key={index}>{service}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {/* Payment History */}
                            <div>
                                <h3 className="text-lg mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
                                    Payment History
                                </h3>
                                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                                    {selectedBooking.paymentHistory.map((payment, index) => (
                                        <div key={index} className="flex items-center justify-between pb-3 border-b last:border-0 last:pb-0">
                                            <div>
                                                <p>{payment.type}</p>
                                                <p className="text-sm text-gray-600">{new Date(payment.date).toLocaleDateString('en-GB')}</p>
                                            </div>
                                            <div className="text-right">
                                                <p>${payment.amount.toLocaleString()}</p>
                                                <Badge className={payment.status === 'Paid' ? 'bg-green-100 text-green-800' : payment.status === 'Refunded' ? 'bg-gray-100 text-gray-800' : 'bg-yellow-100 text-yellow-800'}>
                                                    {payment.status}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Special Requests */}
                            {selectedBooking.specialRequests && (
                                <div>
                                    <h3 className="text-lg mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
                                        Special Requests
                                    </h3>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p>{selectedBooking.specialRequests}</p>
                                    </div>
                                </div>
                            )}

                            {/* Cancellation Information */}
                            {selectedBooking.status === 'cancelled' && (
                                <div>
                                    <h3 className="text-lg mb-3 text-red-600" style={{ fontFamily: 'var(--font-serif)' }}>
                                        Cancellation Information
                                    </h3>
                                    <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label className="text-gray-600">Cancellation Date</Label>
                                                <p className="mt-1">{new Date(selectedBooking.cancellationDate).toLocaleDateString('en-GB')}</p>
                                            </div>
                                            <div className="col-span-2">
                                                <Label className="text-gray-600">Reason</Label>
                                                <p className="mt-1">{selectedBooking.cancellationReason}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowDetailsModal(false)}>
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Cancel Booking Modal */}
            <Dialog open={showCancelModal} onOpenChange={setShowCancelModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle style={{ fontFamily: 'var(--font-serif)' }}>
                            Cancel Booking
                        </DialogTitle>
                        <DialogDescription>
                            Are you sure you want to cancel booking {selectedBooking?.id}? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="cancellationReason">Cancellation Reason *</Label>
                            <Textarea
                                id="cancellationReason"
                                placeholder="Please provide a reason for cancelling this booking..."
                                value={cancellationReason}
                                onChange={(e) => setCancellationReason(e.target.value)}
                                className="mt-1"
                                rows={4}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => {
                            setShowCancelModal(false);
                            setCancellationReason('');
                        }}>
                            Keep Booking
                        </Button>
                        <Button
                            onClick={handleCancelBooking}
                            className="bg-red-600 hover:bg-red-700 text-white"
                        >
                            Cancel Booking
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default BookingManagementPage