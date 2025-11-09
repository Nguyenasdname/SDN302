import { useState } from 'react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Calendar } from '../../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover';
import {
  Star,
  MapPin,
  Users,
  Bed,
  Bath,
  Wifi,
  Car,
  Utensils,
  Wind,
  Waves,
  Flame,
  ChevronLeft,
  ChevronRight,
  X,
  Calendar as CalendarIcon,
  Heart,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGet } from '../../hooks/useGet';
import ReviewLayout from '../../layouts/ReviewLayout/ReviewLayout';

const ResortDetailsPage = ({ onNavigate, isWishlisted = true, toggleWishlist }) => {
  const { resortId } = useParams();
  const { data: resort, loading: resortLoading } = useGet(`/resort/${resortId}`);
  const navigate = useNavigate();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [guests, setGuests] = useState(2);

  const amenityIcons = {
    WiFi: Wifi,
    Parking: Car,
    Kitchen: Utensils,
    'Air Conditioning': Wind,
    'Beach Access': Waves,
    Pool: Waves,
    BBQ: Flame,
  };

  // Safe image navigation
  const nextImage = () => {
    if (!resort?.images || resort.images.length === 0) return;
    setCurrentImageIndex((prev) => (prev + 1) % resort.images.length);
  };

  const prevImage = () => {
    if (!resort?.images || resort.images.length === 0) return;
    setCurrentImageIndex((prev) =>
      (prev - 1 + resort.images.length) % resort.images.length
    );
  };

  // Loading state
  if (resortLoading) {
    return <div className="container mx-auto p-6">Loading...</div>;
  }

  if (!resort) {
    return <div className="container mx-auto p-6">Resort not found</div>;
  }

  // Calculate nights
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const diff = checkOut.getTime() - checkIn.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();
  const totalPrice = nights * resort.resortPrice;
  const depositAmount = totalPrice * 0.3;

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleBookNow = () => {
    if (!checkIn || !checkOut) {
      alert('Please select check-in and check-out dates');
      return;
    }

    navigate('/booking', {
      state: {
        resortId: resortId,
        checkIn: checkIn,
        checkOut: checkOut,
        numberOfGuests: guests,
      },
    });
  };

  return (
    <div className="bg-gray-50">
      {/* Image Gallery */}
      <div className="container mx-auto px-6 py-8">
        <button
          onClick={() => navigate('/list')}
          className="flex items-center gap-2 text-gray-600 hover:text-[#14b8a6] mb-6 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to listings
        </button>

        <div className="grid grid-cols-4 gap-4 mb-8">
          {/* Main Image */}
          <div className="col-span-4 md:col-span-3 h-[400px] rounded-2xl overflow-hidden relative group cursor-pointer">
            {resort.images && resort.images.length > 0 ? (
              <ImageWithFallback
                src={resort.images[currentImageIndex]}
                alt={resort.resortName}
                className="w-full h-full object-cover"
                onClick={() => setShowLightbox(true)}
              />
            ) : (
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center">
                <span className="text-gray-500">No image available</span>
              </div>
            )}

            {/* Navigation arrows */}
            {resort.images?.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Grid */}
          <div className="col-span-4 md:col-span-1 grid grid-cols-2 md:grid-cols-1 gap-4">
            {resort.images?.slice(0, 4).map((image, index) => (
              <div
                key={index}
                className={`h-[100px] rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                  currentImageIndex === index ? 'border-[#14b8a6]' : 'border-transparent'
                }`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <ImageWithFallback
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Property Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-[#14b8a6]/10 text-[#14b8a6] rounded-full text-sm">
                  Resort
                </span>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4 text-[#14b8a6]" />
                  <span>{resort.resortLocation}, Vietnam</span>
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-4xl md:text-5xl" style={{ fontFamily: 'var(--font-serif)' }}>
                  {resort.resortName}
                </h1>
                <button
                  onClick={() => toggleWishlist(resort._id)}
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all hover:scale-110"
                >
                  <Heart
                    className={`w-6 h-6 transition-colors ${
                      isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-700'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center gap-6 text-gray-700">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#14b8a6]" />
                  <span>{resort.resortCapacity} guests</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bed className="w-5 h-5 text-[#14b8a6]" />
                  <span>5 bedrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="w-5 h-5 text-[#14b8a6]" />
                  <span>5 bathrooms</span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <Star className="w-5 h-5 fill-[#fbbf24] text-[#fbbf24]" />
                <span>5</span>
                <span className="text-gray-500">(100 reviews)</span>
              </div>
            </div>

            {/* Host Info */}
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#14b8a6] to-[#0d9488] flex items-center justify-center text-white text-xl">
                  MG
                </div>
                <div>
                  <h3 className="mb-1" style={{ fontFamily: 'var(--font-serif)' }}>
                    Hosted by MyBooking
                  </h3>
                  <p className="text-gray-600 text-sm">Superhost · 5 years hosting</p>
                </div>
              </div>
            </Card>

            {/* Description */}
            <div>
              <h2 className="text-2xl md:text-3xl mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
                About this place
              </h2>
              <p className="text-gray-700 leading-relaxed">{resort.resortDescription}</p>
              <p className="text-gray-700 leading-relaxed mt-4">
                This beautiful property offers the perfect blend of luxury and comfort. Located in the heart of{' '}
                {resort.resortLocation}, you'll have easy access to beaches, restaurants, and local attractions.
              </p>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-2xl md:text-3xl mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
                Amenities
              </h2>
              {/* Uncomment and map resort.amenities if available */}
              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resort.amenities?.map((amenity) => {
                  const Icon = amenityIcons[amenity] || Star;
                  return (
                    <div key={amenity} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200">
                      <Icon className="w-5 h-5 text-[#14b8a6]" />
                      <span>{amenity}</span>
                    </div>
                  );
                })}
              </div> */}
            </div>

            {/* Location */}
            <div>
              <h2 className="text-2xl md:text-3xl mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
                Location
              </h2>
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-[#14b8a6] mt-1" />
                  <div>
                    <h3 className="mb-1" style={{ fontFamily: 'var(--font-serif)' }}>
                      {resort.resortLocation}, Vietnam
                    </h3>
                    <p className="text-gray-600">
                      {resort.resortLocation === 'Hoi An'
                        ? 'Located in the charming UNESCO World Heritage ancient town.'
                        : 'Situated along the beautiful coast with easy access to beaches.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <ReviewLayout resortId={resortId} />
          </div>

          {/* Right Column - Booking Widget */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl" style={{ fontFamily: 'var(--font-serif)' }}>
                    ${resort.resortPrice}
                  </span>
                  <span className="text-gray-600">/ night</span>
                </div>
              </div>

              {/* Date Selection */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm mb-2">Check-in</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
                        <CalendarIcon className="mr-2 h-4 w-4 text-[#14b8a6]" />
                        {checkIn
                          ? checkIn.toLocaleDateString('en-US', {
                              weekday: 'short',
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })
                          : 'Select date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={checkIn}
                        onSelect={setCheckIn}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <label className="block text-sm mb-2">Check-out</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
                        <CalendarIcon className="mr-2 h-4 w-4 text-[#14b8a6]" />
                        {checkOut
                          ? checkOut.toLocaleDateString('en-US', {
                              weekday: 'short',
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })
                          : 'Select date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={checkOut}
                        onSelect={setCheckOut}
                        disabled={(date) => date < (checkIn || new Date())}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <label className="block text-sm mb-2">Guests</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#14b8a6] focus:ring-1 focus:ring-[#14b8a6]"
                  >
                    {[...Array(resort.resortCapacity)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i === 0 ? 'guest' : 'guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price Breakdown */}
              {nights > 0 && (
                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between text-gray-700">
                    <span>
                      ${resort.resortPrice} × {nights} nights
                    </span>
                    <span>${(nights * resort.resortPrice).toFixed(2)}</span>
                  </div>
                </div>
              )}

              {nights > 0 && (
                <>
                  <div className="flex justify-between mb-4">
                    <span style={{ fontFamily: 'var(--font-serif)' }}>Total</span>
                    <span className="text-xl" style={{ fontFamily: 'var(--font-serif)' }}>
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="bg-[#14b8a6]/10 rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">30% Deposit Required</span>
                      <span className="text-lg text-[#14b8a6]" style={{ fontFamily: 'var(--font-serif)' }}>
                        ${depositAmount.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      Pay 30% now, remaining balance due at check-in
                    </p>
                  </div>
                </>
              )}

              <Button
                onClick={handleBookNow}
                className="w-full py-6"
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
                Book Now
              </Button>

              <p className="text-center text-sm text-gray-500 mt-4">
                You won't be charged yet
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {showLightbox && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          <button
            onClick={() => setShowLightbox(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 p-2"
          >
            <X className="w-8 h-8" />
          </button>
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 p-2"
          >
            <ChevronLeft className="w-12 h-12" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 p-2"
          >
            <ChevronRight className="w-12 h-12" />
          </button>
          {resort.images && resort.images.length > 0 && (
            <img
              src={resort.images[currentImageIndex]}
              alt={resort.resortName}
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />
          )}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white">
            {currentImageIndex + 1} / {resort.images?.length || 0}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResortDetailsPage;