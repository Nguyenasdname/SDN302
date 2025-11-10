import { Star, MapPin, Users, Bed, Bath, Heart } from 'lucide-react';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { useLocation, useNavigate } from 'react-router-dom';

const PropertyCard = ({ resort, onBook, isWishlisted = true, toggleWishlist }) => {
    const navigate = useNavigate()

    const handleWishlistClick = (e) => {
        e.stopPropagation();
        if (toggleWishlist) {
            toggleWishlist(resort._id); // dùng _id từ MongoDB
        }
    };


    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
            onClick={() => navigate(`/resort-detail/${resort._id}`)}>
            <div
                className="relative h-64 overflow-hidden"

            >
                <ImageWithFallback
                    src={resort.images[0] || '/placeholder.jpg'} // resort.image giả định hoặc fallback
                    alt={resort.resortName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
                    <span className="text-[#14b8a6]">{resort.type || 'Resort'}</span>
                </div>
                {toggleWishlist && (
                    <button
                        onClick={handleWishlistClick}
                        className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-all hover:scale-110"
                    >
                        <Heart
                            className={`w-5 h-5 transition-colors ${isWishlisted
                                ? 'fill-red-500 text-red-500'
                                : 'text-gray-700'
                                }`}
                        />
                    </button>
                )}
            </div>

            <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                        <h3
                            className="mb-2 cursor-pointer hover:text-[#14b8a6] transition-colors"
                            style={{ fontFamily: 'var(--font-serif)' }}
                            onClick={() => onBook(resort)}
                        >
                            {resort.resortName}
                        </h3>
                        <div className="flex items-center gap-2 text-gray-600 mb-2">
                            <MapPin className="w-4 h-4 text-[#14b8a6]" />
                            <span>{resort.resortLocation}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-1 mb-4">
                    <Star className="w-4 h-4 fill-[#fbbf24] text-[#fbbf24]" />
                    <span>{resort.avgRating?.toFixed(1) || 0}</span>
                    <span className="text-gray-500">({resort.reviewCount || 0} reviews)</span>
                </div>

                <div className="flex items-center gap-4 mb-4 text-gray-600">
                    <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-[#14b8a6]" />
                        <span>{resort.resortCapacity || 2}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Bed className="w-4 h-4 text-[#14b8a6]" />
                        <span>{resort.bedrooms || 1}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Bath className="w-4 h-4 text-[#14b8a6]" />
                        <span>{resort.bathrooms || 1}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-2xl" style={{ fontFamily: 'var(--font-serif)' }}>
                            ${resort.resortPrice || 100}
                        </span>
                        <span className="text-gray-500"> / night</span>
                    </div>
                    <Button
                        onClick={() => navigate(`/resort-detail/${resort._id}`)}
                        style={{
                            backgroundColor: '#fbbf24',
                            color: '#000',
                        }}
                        className="cursor-pointer hover:scale-110 transition duration-500"
                    >
                        View Details
                    </Button>
                </div>
            </div>
        </Card>
    );
}

export default PropertyCard