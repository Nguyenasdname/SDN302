import { useEffect, useState } from 'react';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { Calendar, Users, MapPin, Plus, Minus, Clock } from 'lucide-react';
import { Checkbox } from '../../components/ui/checkbox';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGet } from '../../hooks/useGet';
import { usePost } from '../../hooks/usePost';


const BookingRoomPage = ({ onNavigate, currentUser }) => {
    const navigate = useNavigate()
    const { state } = useLocation()
    const { resortId, checkIn, checkOut, numberOfGuests, totalPrice } = state || {}

    const { postData, error: postError, loading: postLoading } = usePost()
    const { data: resort, loading: resortLoading } = useGet(`/resort/${resortId}`)
    const { data: serviceResorts, loading: serviceResortLoading } = useGet('/serviceResort')

    const formatDateInput = (date) => {
        if (!date) return '';
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [formData, setFormData] = useState({
        fullName: currentUser.userFirstName + ' ' + currentUser.userLastName || '',
        email: currentUser.userEmail || '',
        phone: currentUser.userPhone || '',
        checkIn: formatDateInput(checkIn) || '',
        checkOut: formatDateInput(checkOut) || '',
        checkInTime: '07:00',
        checkOutTime: '17:00',
        guests: numberOfGuests || 1,
        specialRequests: '',
    });

    const [additionalServices, setAdditionalServices] = useState([]);
    useEffect(() => {
        if (!serviceResortLoading && serviceResorts?.length > 0) {
            console.log(`service list: ${serviceResorts}`)
            const mappedService = serviceResorts.map((service) => ({
                _id: service._id,
                serviceName: service.serviceName,
                servicePrice: service.servicePrice,
                serviceIMG: service.serviceIMG,
                selected: false,
                quantity: 1,
            }))

            setAdditionalServices(mappedService)
        }
    }, [serviceResortLoading, serviceResorts])

    const calculateNights = () => {
        if (!formData.checkIn || !formData.checkOut) return 0;
        const start = new Date(formData.checkIn);
        const end = new Date(formData.checkOut);
        const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        return nights > 0 ? nights : 0;
    };

    const calculateHours = () => {
        if (!formData.checkIn || !formData.checkOut || !formData.checkInTime || !formData.checkOutTime) return 0;

        const checkInDateTime = new Date(`${formData.checkIn}T${formData.checkInTime}`);
        const checkOutDateTime = new Date(`${formData.checkOut}T${formData.checkOutTime}`);

        const hours = (checkOutDateTime.getTime() - checkInDateTime.getTime()) / (1000 * 60 * 60);
        return hours > 0 ? Math.ceil(hours) : 0;
    };

    const isSameDayBooking = () => {
        return formData.checkIn === formData.checkOut;
    };

    const toggleService = (serviceId) => {
        setAdditionalServices(prev =>
            prev.map(service =>
                service._id === serviceId
                    ? { ...service, selected: !service.selected }
                    : service
            )
        );
    };

    const updateQuantity = (serviceId, delta) => {
        setAdditionalServices(prev =>
            prev.map(service =>
                service._id === serviceId
                    ? { ...service, quantity: Math.max(1, service.quantity + delta) }
                    : service
            )
        );
    };

    const calculateServicesTotal = () => {
        return additionalServices.reduce((sum, service) => {
            if (service.selected) {
                return sum + (service.servicePrice * service.quantity);
            }
            return sum;
        }, 0);
    };
    if (resortLoading) {
        return (
            <div>Loading...</div>
        )
    }

    const nights = calculateNights();
    const hours = calculateHours();
    const sameDayBooking = isSameDayBooking();

    // Calculate room total based on booking type
    const roomTotal = sameDayBooking && hours > 0
        ? (Math.round(resort.resortPrice * 0.17)) * hours
        : resort.resortPrice * nights;

    const servicesTotal = calculateServicesTotal();
    const total = roomTotal + servicesTotal;
    const depositAmount = total * 0.3;


    const getSelectedServicesPayload = () => {
        return additionalServices
            .filter(service => service.selected)
            .map(service => ({
                serviceId: service._id,
                quantity: service.quantity
            }))
    }

    const handleSubmit = async () => {
        console.log('Submit')
        const bookingServiceData = getSelectedServicesPayload()
        const bookingData = {
            resortId,
            checkIn: `${formatDateInput(checkIn)}T${formData.checkInTime || '00:00'}`,
            checkOut: `${formatDateInput(checkOut)}T${formData.checkOutTime || '00:00'}`,
            bookingTotal: total,
            numberOfGuests: formData.guests
        }
        console.log(bookingServiceData)
        console.log(bookingData)
        try {
            const res = await postData(`/booking`, {
                bookingData,
                bookingServiceData
            })
            if (res) {
                navigate('/payment', {
                    state: {
                        bookingData: res.newBooking,
                        resortId,
                        paymentType: 'Deposit'
                    }
                })
            }
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-4xl md:text-5xl mb-8" style={{ fontFamily: 'var(--font-serif)' }}>
                Complete Your Booking
            </h1>


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Guest Information */}
                <div className="lg:col-span-2">
                    <Card className="p-8">
                        <h2 className="text-2xl mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
                            Guest Information
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <Label htmlFor="fullName">Full Name *</Label>
                                <Input
                                    id="fullName"
                                    required
                                    value={formData.fullName}
                                    onChange={(e) =>
                                        setFormData({ ...formData, fullName: e.target.value })
                                    }
                                    placeholder="Enter your full name"
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <Label htmlFor="email">Email Address *</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                    placeholder="your.email@example.com"
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <Label htmlFor="phone">Phone Number *</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    required
                                    value={formData.phone}
                                    onChange={(e) =>
                                        setFormData({ ...formData, phone: e.target.value })
                                    }
                                    placeholder="+1 234 567 8900"
                                    className="mt-2"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="checkIn">Check-in Date *</Label>
                                    <Input
                                        id="checkIn"
                                        type="date"
                                        required
                                        value={formData.checkIn}
                                        onChange={(e) =>
                                            setFormData({ ...formData, checkIn: e.target.value })
                                        }
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="checkOut">Check-out Date *</Label>
                                    <Input
                                        id="checkOut"
                                        type="date"
                                        required
                                        value={formData.checkOut}
                                        onChange={(e) =>
                                            setFormData({ ...formData, checkOut: e.target.value })
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="checkInTime">Check-in Time *</Label>
                                    <Input
                                        id="checkInTime"
                                        type="time"
                                        required
                                        value={formData.checkInTime}
                                        onChange={(e) =>
                                            setFormData({ ...formData, checkInTime: e.target.value })
                                        }
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="checkOutTime">Check-out Time *</Label>
                                    <Input
                                        id="checkOutTime"
                                        type="time"
                                        required
                                        value={formData.checkOutTime}
                                        onChange={(e) =>
                                            setFormData({ ...formData, checkOutTime: e.target.value })
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            {sameDayBooking && hours > 0 && (
                                <div className="bg-[#fbbf24]/10 rounded-lg p-4 border border-[#fbbf24]/30">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Clock className="w-5 h-5 text-[#fbbf24]" />
                                        <span className="text-[#14b8a6]">Hourly Booking</span>
                                    </div>
                                    <p className="text-sm">
                                        {hours} hour{hours !== 1 ? 's' : ''} at ${Math.round(resort.resortPrice * 0.17)}/hour
                                    </p>
                                </div>
                            )}

                            {!sameDayBooking && nights > 0 && (
                                <div className="bg-[#14b8a6]/10 rounded-lg p-4 border border-[#14b8a6]/30">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Calendar className="w-5 h-5 text-[#14b8a6]" />
                                        <span className="text-[#14b8a6]">Nightly Booking</span>
                                    </div>
                                    <p className="text-sm">
                                        {nights} night{nights !== 1 ? 's' : ''} at ${resort.resortPrice}/night
                                    </p>
                                </div>
                            )}

                            <div>
                                <Label htmlFor="guests">Number of Guests *</Label>
                                <Input
                                    id="guests"
                                    type="number"
                                    required
                                    min="1"
                                    max={resort.resortCapacity}
                                    value={formData.guests}
                                    onChange={(e) =>
                                        setFormData({ ...formData, guests: parseInt(e.target.value) })
                                    }
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <Label htmlFor="requests">Special Requests (Optional)</Label>
                                <Textarea
                                    id="requests"
                                    value={formData.specialRequests}
                                    onChange={(e) =>
                                        setFormData({ ...formData, specialRequests: e.target.value })
                                    }
                                    placeholder="Any special requests or requirements?"
                                    className="mt-2 min-h-32"
                                />
                            </div>
                        </div>
                    </Card>

                    {/* Additional Services Section */}
                    <Card className="p-8 mt-8">
                        <h2 className="text-2xl mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
                            Select Additional Services:
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {additionalServices.map((service) => (
                                <div
                                    key={service._id}
                                    className={`border rounded-xl overflow-hidden transition-all ${service.selected ? 'border-[#14b8a6] shadow-md' : 'border-gray-200'
                                        }`}
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <ImageWithFallback
                                            src={service.serviceIMG}
                                            alt={service.serviceName}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="p-4">
                                        <div className="flex items-start gap-3 mb-4">
                                            <Checkbox
                                                id={`service-${service._id}`}
                                                checked={service.selected}
                                                onCheckedChange={() => toggleService(service._id)}
                                                className="mt-1"
                                            />
                                            <div className="flex-1">
                                                <label
                                                    htmlFor={`service-${service._id}`}
                                                    className="cursor-pointer"
                                                >
                                                    <h3 className="mb-1" style={{ fontFamily: 'var(--font-serif)' }}>
                                                        {service.serviceName}
                                                    </h3>
                                                    <p className="text-[#14b8a6]">
                                                        +${service.servicePrice.toFixed(1)}
                                                    </p>
                                                </label>
                                            </div>
                                        </div>

                                        {service.selected && (
                                            <div className="flex items-center justify-center gap-3 bg-gray-50 rounded-lg p-2">
                                                <button
                                                    type="button"
                                                    onClick={() => updateQuantity(service._id, -1)}
                                                    className="w-10 h-10 rounded-lg bg-[#14b8a6] text-white flex items-center justify-center hover:bg-[#0f9a8a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                    disabled={service.quantity <= 1}
                                                >
                                                    <Minus className="w-5 h-5" />
                                                </button>
                                                <span className="w-12 text-center text-lg">
                                                    {service.quantity}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => updateQuantity(service._id, 1)}
                                                    className="w-10 h-10 rounded-lg bg-[#14b8a6] text-white flex items-center justify-center hover:bg-[#0f9a8a] transition-colors"
                                                >
                                                    <Plus className="w-5 h-5" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Right Column - Booking Summary */}
                <div className="lg:col-span-1">
                    <Card className="p-6 sticky top-24">
                        <h3 className="text-xl mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
                            Booking Summary
                        </h3>

                        {/* Property Image */}
                        <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                            <ImageWithFallback
                                src={resort.images[0]}
                                alt={resort.resortName}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Property Name */}
                        <h4 className="mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
                            {resort.resortName}
                        </h4>

                        {/* Details */}
                        <div className="space-y-3 mb-6 text-gray-600">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-[#14b8a6]" />
                                <span>{resort.resortLocation}</span>
                            </div>
                            {formData.checkIn && formData.checkOut && (
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-[#14b8a6]" />
                                    <span>
                                        {new Date(formData.checkIn).toLocaleDateString()} -{' '}
                                        {new Date(formData.checkOut).toLocaleDateString()}
                                    </span>
                                </div>
                            )}
                            {formData.checkInTime && formData.checkOutTime && (
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-[#14b8a6]" />
                                    <span>
                                        {formData.checkInTime} - {formData.checkOutTime}
                                    </span>
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-[#14b8a6]" />
                                <span>{formData.guests} guests</span>
                            </div>
                        </div>

                        {/* Price Breakdown */}
                        <div className="border-t pt-4 space-y-3">
                            <div className="flex justify-between text-gray-600">
                                <span>
                                    {sameDayBooking && hours > 0
                                        ? `$${Math.round(resort.resortPrice * 0.17)} x ${hours} hour${hours !== 1 ? 's' : ''}`
                                        : `$${resort.resortPrice} x ${nights} night${nights !== 1 ? 's' : ''}`
                                    }
                                </span>
                                <span>${roomTotal.toFixed(2)}</span>
                            </div>
                            {servicesTotal > 0 && (
                                <div className="flex justify-between text-gray-600">
                                    <span>Additional Services</span>
                                    <span>${servicesTotal.toFixed(2)}</span>
                                </div>
                            )}
                            <div className="border-t pt-3 flex justify-between">
                                <span>Total</span>
                                <span className="text-xl" style={{ fontFamily: 'var(--font-serif)' }}>
                                    ${total.toFixed(2)}
                                </span>
                            </div>
                            <div className="bg-[#14b8a6]/10 rounded-lg p-3 mt-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">30% Deposit Required</span>
                                    <span className="text-lg text-[#14b8a6]" style={{ fontFamily: 'var(--font-serif)' }}>
                                        ${depositAmount.toFixed(2)}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-600 mt-1">
                                    Pay 30% now, rest at check-in
                                </p>
                            </div>
                        </div>

                        {/* Continue Button */}
                        <Button
                            type="submit"
                            className="w-full mt-6 h-12 cursor-pointer"
                            disabled={roomTotal === 0}
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
                            onClick={handleSubmit}
                        >
                            {postLoading ? 'Loading...' : 'Continue to Payment'}
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default BookingRoomPage