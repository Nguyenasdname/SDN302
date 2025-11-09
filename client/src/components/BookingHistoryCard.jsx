import { useState, useEffect } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import {
    Calendar,
    Users,
    Settings,
    Heart,
    LogOut,
    MapPin,
    Bed,
    Bath,
    Star,
    Eye,
    XCircle,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const BookingHistoryCard = ({ booking, setSelectedBooking, setShowDetailsModal, setShowCancelModal }) => {
    const navigate = useNavigate()
    const handleDeposit = () => {
        navigate('/payment', {
            state: {
                bookingData: booking,
                resortId: booking.resortId._id,
                paymentType: 'Deposit'
            }
        })
    }

        const handlePayment = () => {
        navigate('/payment', {
            state: {
                bookingData: booking,
                resortId: booking.resortId._id,
                paymentType: 'Payment'
            }
        })
    }

    return (
        <Card key={booking._id} className="p-6">
            <div className="flex gap-6">
                <div className="w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                        src={booking.resortId.resortIMG}
                        alt={booking.resortId.resortIMG}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="flex-1">
                    <div className='flex flex-row justify-between'>
                        <h3 className="mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
                            {booking.resortId.resortName}
                        </h3>
                        <div className={`${{
                            Pending: 'text-yellow-500',
                            Confirmed: 'text-blue-500',
                            Completed: 'text-green-600',
                            CheckIn: 'text-teal-500',
                            CheckOut: 'text-indigo-500',
                            Cancelled: 'text-red-500',
                        }[booking.bookingStatus] || 'text-gray-500'
                            }`}>
                            {booking.bookingStatus}
                        </div>

                    </div>

                    <div className="space-y-2 text-gray-600 mb-4">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[#14b8a6]" />
                            <span>
                                {new Date(booking.checkIn).toLocaleDateString()} -{' '}
                                {new Date(booking.checkOut).toLocaleDateString()}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-[#14b8a6]" />
                            <span>{booking.numberOfGuests} guests</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-gray-500">Total: </span>
                            <span className="text-xl" style={{ fontFamily: 'var(--font-serif)' }}>
                                ${booking.bookingTotal}
                            </span>
                        </div>
                        {booking.bookingStatus === 'Pending' && (
                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    className="cursor-pointer"
                                    onClick={() => {
                                        setSelectedBooking(booking);
                                        setShowDetailsModal(true);
                                    }}
                                >
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Details
                                </Button>
                                <Button
                                    variant="outline"
                                    className="text-red-600 border-red-600 hover:bg-red-50 cursor-pointer"
                                    onClick={() => {
                                        setSelectedBooking(booking);
                                        setShowCancelModal(true);
                                    }}
                                >
                                    <XCircle className="w-4 h-4 mr-2" />
                                    Cancel
                                </Button>
                                <Button
                                    variant="outline"
                                    className="text-green-500 border-green-600 hover:bg-green-50 cursor-pointer"
                                    onClick={handleDeposit}
                                >
                                    <Star className="w-4 h-4 mr-2" />
                                    Deposit Now
                                </Button>
                            </div>
                        )}

                        {['Confirmed', 'CheckIn'].includes(booking.bookingStatus) && (
                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    className="cursor-pointer"
                                    onClick={() => {
                                        setSelectedBooking(booking);
                                        setShowDetailsModal(true);
                                    }}
                                >
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Details
                                </Button>
                                <Button
                                    variant="outline"
                                    className="text-red-600 border-red-600 hover:bg-red-50 cursor-pointer"
                                    onClick={() => {
                                        setSelectedBooking(booking);
                                        setShowCancelModal(true);
                                    }}
                                >
                                    <XCircle className="w-4 h-4 mr-2" />
                                    Cancel
                                </Button>
                            </div>
                        )}

                        {booking.bookingStatus === 'CheckOut' && (
                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    className="cursor-pointer"
                                    onClick={() => {
                                        setSelectedBooking(booking);
                                        setShowDetailsModal(true);
                                    }}
                                >
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Details
                                </Button>
                                <Button
                                    variant="outline"
                                    className="text-green-500 border-green-600 hover:bg-green-50 cursor-pointer"
                                    onClick={handlePayment}
                                >
                                    <Star className="w-4 h-4 mr-2" />
                                    Payment
                                </Button>
                            </div>
                        )}

                        {booking.bookingStatus === 'Completed' && (
                            <div className="flex items-center justify-between">
                                <Button
                                    variant="outline"
                                    className="cursor-pointer"
                                >Leave Review</Button>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </Card>
    )
}

export default BookingHistoryCard