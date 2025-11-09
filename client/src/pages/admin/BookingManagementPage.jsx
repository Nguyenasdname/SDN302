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
import { useGet } from '../../hooks/useGet'
import BookingTableManagement from '../../components/BookingTableManagement';


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

    const {
        data: bookingList,
        loading: bookingLoading,
        refetch: refetchBooking
    } = useGet(`/booking`)

    if (bookingLoading) {
        return (
            <div>Loading...</div>
        )
    }

    const filteredBookings = bookingList.filter(booking => {
        const matchesSearch =
            booking._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.userId.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.resortId.resortName.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || booking.bookingStatus === statusFilter;

        const matchesCheckIn = !checkInDateFilter || booking.checkIn === checkInDateFilter;
        const matchesCheckOut = !checkOutDateFilter || booking.checkOut === checkOutDateFilter;

        return matchesSearch && matchesStatus && matchesCheckIn && matchesCheckOut;
    });

    // Pagination
    const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedBookings = filteredBookings.slice(startIndex, startIndex + itemsPerPage);

    const getStatusBadge = (status) => {
        const statusConfig = {
            Pending: { label: 'Pending Deposit', className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
            Confirmed: { label: 'Confirmed', className: 'bg-green-100 text-green-800 border-green-200' },
            CheckIn: { label: 'Checked-In', className: 'bg-blue-100 text-blue-800 border-blue-200' },
            CheckOut: { label: 'Checked-Out', className: 'bg-gray-100 text-gray-800 border-gray-200' },
            Cancelled: { label: 'Cancelled', className: 'bg-red-100 text-red-800 border-red-200' },
            Completed: { label: 'Completed', className: 'bg-purple-100 text-purple-800 border-purple-200' }
        };

        const config = statusConfig[status];
        return (
            <Badge className={`border ${config.className}`}>
                {config.label}
            </Badge>
        );
    };

    const handleExportBookings = () => {
        toast.success('Booking data exported successfully');
        // Implement export functionality
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
            <BookingTableManagement
                paginatedBookings={paginatedBookings}
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                getStatusBadge={getStatusBadge}
                setSelectedBooking={setSelectedBooking}
                setShowDetailsModal={setShowDetailsModal}
                setShowCancelModal={setShowCancelModal}
                refetchBooking={refetchBooking}
            />

            {/* Booking Details Modal */}
            <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle style={{ fontFamily: 'var(--font-serif)' }}>
                            Booking Details - {selectedBooking?._id}
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
                                    {getStatusBadge(selectedBooking.bookingStatus)}
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
                                        <p className="mt-1">{selectedBooking.userId.userName}</p>
                                    </div>
                                    <div>
                                        <Label className="text-gray-600">Email</Label>
                                        <p className="mt-1">{selectedBooking.userId.userName}</p>
                                    </div>
                                    <div>
                                        <Label className="text-gray-600">Phone</Label>
                                        <p className="mt-1">{selectedBooking.userId.userName}</p>
                                    </div>
                                    <div>
                                        <Label className="text-gray-600">Guests</Label>
                                        <p className="mt-1">{selectedBooking.numberOfGuests} people</p>
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
                                        <p className="mt-1">{selectedBooking.resortId.resortName}</p>
                                    </div>
                                    <div>
                                        <Label className="text-gray-600">Booking Date</Label>
                                        <p className="mt-1">{new Date(selectedBooking.createDate).toLocaleDateString('en-GB')}</p>
                                    </div>
                                    <div>
                                        <Label className="text-gray-600">Check-in</Label>
                                        <p className="mt-1">{new Date(selectedBooking.checkIn).toLocaleDateString('en-GB')}</p>
                                    </div>
                                    <div>
                                        <Label className="text-gray-600">Check-out</Label>
                                        <p className="mt-1">{new Date(selectedBooking.checkOut).toLocaleDateString('en-GB')}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <Label className="text-gray-600">Total Amount</Label>
                                        <p className="mt-1 text-2xl text-[#14b8a6]">
                                            ${selectedBooking.bookingTotal.toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Services */}
                            {/* {selectedBooking.services.length > 0 && (
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
                            )} */}

                            {/* Payment History */}
                            {/* <div>
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
                            </div> */}

                            {/* Special Requests */}
                            {/* {selectedBooking.specialRequests && (
                                <div>
                                    <h3 className="text-lg mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
                                        Special Requests
                                    </h3>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p>{selectedBooking.specialRequests}</p>
                                    </div>
                                </div>
                            )} */}

                            {/* Cancellation Information */}
                            {selectedBooking.bookingStatus === 'Cancelled' && (
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