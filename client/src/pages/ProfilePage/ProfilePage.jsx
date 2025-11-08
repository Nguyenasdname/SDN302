import { useState, useEffect } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { mockBookings, mockUser, properties } from '../../lib/data';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useGet } from '../../hooks/useGet';


const ProfilePage = ({ onNavigate, wishlist, toggleWishlist, currentUser }) => {

    const [activeTab, setActiveTab] = useState('bookings');
    const [userBookings, setUserBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [cancellationReason, setCancellationReason] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        const savedBookings = JSON.parse(localStorage.getItem('mybooking-bookings') || '[]');
        setUserBookings(savedBookings);
    }, []);

    // Combine saved bookings with mock bookings
    const allBookings = [...userBookings, ...mockBookings];
    const upcomingBookings = allBookings.filter((b) => b.status === 'upcoming');
    const pastBookings = allBookings.filter((b) => b.status === 'past');
    // const wishlistProperties = properties.filter((p) => wishlist.includes(p.id));

    const handleCancelBooking = () => {
        if (!cancellationReason.trim()) {
            toast.error('Please provide a cancellation reason');
            return;
        }

        // Update the booking status
        const updatedBookings = userBookings.map(booking =>
            booking.id === selectedBooking.id
                ? { ...booking, status: 'cancelled', cancellationReason, cancellationDate: new Date().toISOString() }
                : booking
        );

        setUserBookings(updatedBookings);
        localStorage.setItem('mybooking-bookings', JSON.stringify(updatedBookings));

        toast.success('Booking cancelled successfully');
        setShowCancelModal(false);
        setCancellationReason('');
        setSelectedBooking(null);
    };

    return (

        <div className="container mx-auto px-6 py-12">


            <h1 className="text-4xl md:text-5xl mb-8" style={{ fontFamily: 'var(--font-serif)' }}>
                My Profile
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left Sidebar - User Info & Navigation */}
                <div className="lg:col-span-1">
                    <Card className="p-6">
                        {/* User Avatar & Info */}
                        <div className="text-center mb-6">
                            <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-4 border-[#14b8a6]">
                                <ImageWithFallback
                                    src={currentUser.userImg}
                                    alt={currentUser.userName}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="mb-1" style={{ fontFamily: 'var(--font-serif)' }}>
                                {currentUser.userName}
                            </h3>
                            <p className="text-gray-600 text-sm">{currentUser.userEmail}</p>
                        </div>

                        {/* Navigation Menu */}
                        <nav className="space-y-2">
                            <button
                                onClick={() => setActiveTab('bookings')}
                                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${activeTab === 'bookings'
                                    ? 'bg-[#14b8a6] text-white'
                                    : 'hover:bg-gray-100'
                                    }`}
                            >
                                <Calendar className="w-5 h-5" />
                                <span>My Bookings</span>
                            </button>

                            <button
                                onClick={() => setActiveTab('wishlist')}
                                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${activeTab === 'wishlist'
                                    ? 'bg-[#14b8a6] text-white'
                                    : 'hover:bg-gray-100'
                                    }`}
                            >
                                <Heart className="w-5 h-5" />
                                <span>Wishlist</span>
                            </button>

                            <button
                                onClick={() => navigate('editProfile')}
                                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <Settings className="w-5 h-5" />
                                <span>Account Settings</span>
                            </button>

                            <button
                                onClick={() => onNavigate('home')}
                                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-red-600"
                            >
                                <LogOut className="w-5 h-5" />
                                <span>Logout</span>
                            </button>
                        </nav>
                    </Card>
                </div>

                {/* Right Content Area */}
                <div className="lg:col-span-3">
                    {activeTab === 'bookings' && (
                        <div>
                            <Tabs defaultValue="upcoming" className="w-full">
                                <TabsList className="mb-6">
                                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                                    <TabsTrigger value="past">Past Stays</TabsTrigger>
                                </TabsList>

                                <TabsContent value="upcoming">
                                    <div className="space-y-6">
                                        {upcomingBookings.map((booking) => (
                                            <Card key={booking.id} className="p-6">
                                                <div className="flex gap-6">
                                                    <div className="w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                                                        <ImageWithFallback
                                                            src={booking.propertyImage}
                                                            alt={booking.propertyName}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>

                                                    <div className="flex-1">
                                                        <h3 className="mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
                                                            {booking.propertyName}
                                                        </h3>

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
                                                                <span>{booking.guests} guests</span>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                <span className="text-gray-500">Total: </span>
                                                                <span className="text-xl" style={{ fontFamily: 'var(--font-serif)' }}>
                                                                    ${booking.totalPrice}
                                                                </span>
                                                            </div>

                                                            <div className="flex gap-3">
                                                                <Button
                                                                    variant="outline"
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
                                                                    className="text-red-600 border-red-600 hover:bg-red-50"
                                                                    onClick={() => {
                                                                        setSelectedBooking(booking);
                                                                        setShowCancelModal(true);
                                                                    }}
                                                                >
                                                                    <XCircle className="w-4 h-4 mr-2" />
                                                                    Cancel
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        ))}

                                        {upcomingBookings.length === 0 && (
                                            <div className="text-center py-12">
                                                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                                <p className="text-gray-500 text-lg mb-4">No upcoming bookings</p>
                                                <Button
                                                    onClick={() => onNavigate('list')}
                                                    style={{
                                                        backgroundColor: '#fbbf24',
                                                        color: '#000',
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.backgroundColor = '#f59e0b';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.backgroundColor = '#fbbf24';
                                                    }}
                                                >
                                                    Browse Properties
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </TabsContent>

                                <TabsContent value="past">
                                    <div className="space-y-6">
                                        {pastBookings.map((booking) => (
                                            <Card key={booking.id} className="p-6 opacity-75">
                                                <div className="flex gap-6">
                                                    <div className="w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                                                        <ImageWithFallback
                                                            src={booking.propertyImage}
                                                            alt={booking.propertyName}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>

                                                    <div className="flex-1">
                                                        <h3 className="mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
                                                            {booking.propertyName}
                                                        </h3>

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
                                                                <span>{booking.guests} guests</span>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                <span className="text-gray-500">Total: </span>
                                                                <span className="text-xl" style={{ fontFamily: 'var(--font-serif)' }}>
                                                                    ${booking.totalPrice}
                                                                </span>
                                                            </div>

                                                            <Button variant="outline">Leave Review</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                    )}

                    {activeTab === 'wishlist' && (
                        <div>
                            {wishlistProperties.length === 0 ? (
                                <div className="text-center py-12">
                                    <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500 text-lg mb-4">Your wishlist is empty</p>
                                    <p className="text-gray-400 mb-6">
                                        Save your favorite properties to easily find them later
                                    </p>
                                    <Button
                                        onClick={() => onNavigate('list')}
                                        style={{
                                            backgroundColor: '#fbbf24',
                                            color: '#000',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#f59e0b';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = '#fbbf24';
                                        }}
                                    >
                                        Browse Properties
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <h2 className="text-2xl mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
                                        My Wishlist ({wishlistProperties.length})
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {wishlistProperties.map((property) => (
                                            <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                                <div className="relative h-48 overflow-hidden cursor-pointer"
                                                    onClick={() => onNavigate('details', property)}
                                                >
                                                    <ImageWithFallback
                                                        src={property.images[0]}
                                                        alt={property.name}
                                                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                                    />
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            toggleWishlist(property.id);
                                                        }}
                                                        className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-all hover:scale-110"
                                                    >
                                                        <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                                                    </button>
                                                </div>

                                                <div className="p-4">
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div>
                                                            <h3
                                                                className="mb-2 cursor-pointer hover:text-[#14b8a6] transition-colors"
                                                                style={{ fontFamily: 'var(--font-serif)' }}
                                                                onClick={() => onNavigate('details', property)}
                                                            >
                                                                {property.name}
                                                            </h3>
                                                            <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                                                                <MapPin className="w-4 h-4 text-[#14b8a6]" />
                                                                <span>{property.location}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-1 mb-3">
                                                        <Star className="w-4 h-4 fill-[#fbbf24] text-[#fbbf24]" />
                                                        <span>{property.rating}</span>
                                                        <span className="text-gray-500 text-sm">({property.reviews})</span>
                                                    </div>

                                                    <div className="flex items-center gap-4 mb-3 text-gray-600 text-sm">
                                                        <div className="flex items-center gap-1">
                                                            <Users className="w-4 h-4 text-[#14b8a6]" />
                                                            <span>{property.guests}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Bed className="w-4 h-4 text-[#14b8a6]" />
                                                            <span>{property.bedrooms}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Bath className="w-4 h-4 text-[#14b8a6]" />
                                                            <span>{property.bathrooms}</span>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <span className="text-xl" style={{ fontFamily: 'var(--font-serif)' }}>
                                                                ${property.price}
                                                            </span>
                                                            <span className="text-gray-500 text-sm"> / night</span>
                                                        </div>
                                                        <Button
                                                            onClick={() => onNavigate('details', property)}
                                                            size="sm"
                                                            style={{
                                                                backgroundColor: '#fbbf24',
                                                                color: '#000',
                                                            }}
                                                            onMouseEnter={(e) => {
                                                                e.currentTarget.style.backgroundColor = '#f59e0b';
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                e.currentTarget.style.backgroundColor = '#fbbf24';
                                                            }}
                                                        >
                                                            View
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Booking Details Modal */}
            <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle style={{ fontFamily: 'var(--font-serif)' }}>
                            Booking Details
                        </DialogTitle>
                        <DialogDescription>
                            Complete information about your booking
                        </DialogDescription>
                    </DialogHeader>

                    {selectedBooking && (
                        <div className="space-y-6">
                            {/* Property Image and Name */}
                            <div className="flex gap-4">
                                <div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                                    <ImageWithFallback
                                        src={selectedBooking.propertyImage}
                                        alt={selectedBooking.propertyName}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
                                        {selectedBooking.propertyName}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Booking ID: <span className="text-[#14b8a6]">{selectedBooking.id}</span>
                                    </p>
                                    {selectedBooking.bookingDate && (
                                        <p className="text-sm text-gray-600">
                                            Booked on: {new Date(selectedBooking.bookingDate).toLocaleDateString('en-GB')}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Stay Information */}
                            <div>
                                <h3 className="text-lg mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
                                    Stay Information
                                </h3>
                                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                                    <div>
                                        <Label className="text-gray-600">Check-in</Label>
                                        <p className="mt-1">{new Date(selectedBooking.checkIn).toLocaleDateString('en-GB')}</p>
                                    </div>
                                    <div>
                                        <Label className="text-gray-600">Check-out</Label>
                                        <p className="mt-1">{new Date(selectedBooking.checkOut).toLocaleDateString('en-GB')}</p>
                                    </div>
                                    <div>
                                        <Label className="text-gray-600">Guests</Label>
                                        <p className="mt-1">{selectedBooking.guests} people</p>
                                    </div>
                                    {selectedBooking.nights && (
                                        <div>
                                            <Label className="text-gray-600">Duration</Label>
                                            <p className="mt-1">{selectedBooking.nights} night{selectedBooking.nights !== 1 ? 's' : ''}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Guest Information */}
                            {selectedBooking.guestInfo && (
                                <div>
                                    <h3 className="text-lg mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
                                        Guest Information
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                                        <div>
                                            <Label className="text-gray-600">Name</Label>
                                            <p className="mt-1">{selectedBooking.guestInfo.fullName}</p>
                                        </div>
                                        <div>
                                            <Label className="text-gray-600">Email</Label>
                                            <p className="mt-1">{selectedBooking.guestInfo.email}</p>
                                        </div>
                                        <div className="col-span-2">
                                            <Label className="text-gray-600">Phone</Label>
                                            <p className="mt-1">{selectedBooking.guestInfo.phone}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Services */}
                            {selectedBooking.selectedServices && selectedBooking.selectedServices.length > 0 && (
                                <div>
                                    <h3 className="text-lg mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
                                        Additional Services
                                    </h3>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <ul className="space-y-2">
                                            {selectedBooking.selectedServices.map((service, index) => (
                                                <li key={index} className="flex justify-between">
                                                    <span>{service.name} (×{service.quantity})</span>
                                                    <span>${(service.price * service.quantity).toFixed(2)}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {/* Payment Information */}
                            <div>
                                <h3 className="text-lg mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
                                    Payment Information
                                </h3>
                                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                                    <div className="flex justify-between">
                                        <span>Total Amount</span>
                                        <span className="text-xl text-[#14b8a6]" style={{ fontFamily: 'var(--font-serif)' }}>
                                            ${selectedBooking.totalPrice.toFixed(2)}
                                        </span>
                                    </div>
                                    {selectedBooking.depositPaid && (
                                        <>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Deposit Paid (30%)</span>
                                                <span className="text-green-600">${selectedBooking.depositPaid.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Remaining Balance</span>
                                                <span>${selectedBooking.remainingBalance.toFixed(2)}</span>
                                            </div>
                                            <p className="text-xs text-gray-500 pt-2 border-t">
                                                Remaining balance due at check-in
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
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
                            Are you sure you want to cancel this booking?
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <p className="text-sm">
                                <strong>Cancellation Policy:</strong> You may be eligible for a partial refund depending on how far in advance you cancel. Our team will review your request and process the refund accordingly.
                            </p>
                        </div>

                        <div>
                            <Label htmlFor="cancellationReason">Reason for Cancellation *</Label>
                            <Textarea
                                id="cancellationReason"
                                placeholder="Please let us know why you're cancelling..."
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

export default ProfilePage