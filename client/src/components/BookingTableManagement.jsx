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
    Download,
    DoorOpen
} from 'lucide-react';
import { Button } from '../components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { usePatch } from '../hooks/usePatch'


const BookingTableManagement = ({
    paginatedBookings, currentPage, totalPages, setCurrentPage, getStatusBadge,
    setSelectedBooking, setShowDetailsModal, setShowCancelModal, refetchBooking
}) => {
    const { patchData, error: patchError } = usePatch()

    const handleCheckIn = async (booking) => {
        try {
            const res = await patchData(`/booking/${booking._id}/checkIn`)
            if (res) {
                refetchBooking()
            }
        } catch (err) {
            console.log(patchError)
        }
    }

    const handleCheckOut = async (booking) => {
        try {
            const res = await patchData(`/booking/${booking._id}/checkOut`)
            if (res) {
                refetchBooking()
            }
        } catch (err) {
            console.log(patchError)
        }
    }

    const handleResendConfirmation = (booking) => {
        toast.success(`Confirmation email sent to ${booking.customerEmail}`);
    };


    return (
        <>
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
                                    <TableRow key={booking._id}>
                                        <TableCell>
                                            <span className="text-[#14b8a6]">{booking._id}</span>
                                        </TableCell>
                                        <TableCell>{booking.resortId.resortName}</TableCell>
                                        <TableCell>{booking.userId.userName}</TableCell>
                                        <TableCell>{new Date(booking.checkIn).toLocaleDateString('en-GB')}</TableCell>
                                        <TableCell>{new Date(booking.checkOut).toLocaleDateString('en-GB')}</TableCell>
                                        <TableCell>${booking.bookingTotal.toLocaleString()}</TableCell>
                                        <TableCell>{getStatusBadge(booking.bookingStatus)}</TableCell>
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
                                                        {booking.bookingStatus !== 'Cancelled' && booking.bookingStatus !== 'CheckOut'
                                                            && booking.bookingStatus !== 'Completed' && booking.bookingStatus !== 'CheckIn' && (
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
                                                        {booking.bookingStatus === 'CheckIn' && (
                                                            <DropdownMenuItem
                                                                onClick={() => {
                                                                    handleCheckOut(booking)
                                                                }}
                                                                className="text-indigo-500"
                                                            >
                                                                <DoorOpen className="w-4 h-4 mr-2" />
                                                                Check Out
                                                            </DropdownMenuItem>
                                                        )}
                                                        {booking.bookingStatus === 'Confirmed' && (
                                                            <DropdownMenuItem
                                                                onClick={() => {
                                                                    handleCheckIn(booking)
                                                                }}
                                                                className="text-teal-500"
                                                            >
                                                                <LogIn className="w-4 h-4 mr-2" />
                                                                Check In
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
        </>
    )
}
export default BookingTableManagement