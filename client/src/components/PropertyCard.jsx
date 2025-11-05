import { Star, MapPin, Users, Bed, Bath, Heart } from 'lucide-react';
// import { Property } from '../lib/data';
import { Card } from './ui/card';
import { ImageWithFallback } from './ImageWithFallBack'
import { Button } from './ui/button';

const PropertyCard = ({ property, onBook, isWishlisted = false, toggleWishlist }) => {
    const handleWishlistClick = (e) => {
        e.stopPropagation();
        if (toggleWishlist) {
            toggleWishlist(property.id);
        }
    };

    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
            <div
                className="relative h-64 overflow-hidden"
                onClick={() => onBook(property)}
            >
                <ImageWithFallback
                    src={property.images[0]}
                    alt={property.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
                    <span className="text-[#14b8a6]">{property.type}</span>
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
                            onClick={() => onBook(property)}
                        >
                            {property.name}
                        </h3>
                        <div className="flex items-center gap-2 text-gray-600 mb-2">
                            <MapPin className="w-4 h-4 text-[#14b8a6]" />
                            <span>{property.location}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-1 mb-4">
                    <Star className="w-4 h-4 fill-[#fbbf24] text-[#fbbf24]" />
                    <span>{property.rating}</span>
                    <span className="text-gray-500">({property.reviews} reviews)</span>
                </div>

                <div className="flex items-center gap-4 mb-4 text-gray-600">
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
                        <span className="text-2xl" style={{ fontFamily: 'var(--font-serif)' }}>
                            ${property.price}
                        </span>
                        <span className="text-gray-500"> / night</span>
                    </div>
                    <Button
                        onClick={() => onBook(property)}
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
                        View Details
                    </Button>
                </div>
            </div>
        </Card>
    );
}

export default PropertyCard