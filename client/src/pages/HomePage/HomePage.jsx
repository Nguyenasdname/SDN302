import { Play, Award, Shield, HeadphonesIcon } from 'lucide-react';
import SearchBar from '../../components/SearchBar';
import PropertyCard from '../../components/PropertyCard'
import { properties } from '../../lib/data';
// import { Property } from '../../lib/data';
import { ImageWithFallback } from '../../components/ImageWithFallBack'
import { useGet } from '../../hooks/useGet';
import { useNavigate } from 'react-router-dom';


const HomePage = ({ onNavigate, wishlist, toggleWishlist }) => {
    const { data: resorts, loading: resortLoading } = useGet('/resort')
    const navigate = useNavigate()
    if (resortLoading) {
        return (
            <div>Loading...</div>
        )
    }
    const featuredProperties = resorts.slice(0, 3);

    return (
        <div>
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                    <ImageWithFallback
                        src="https://images.unsplash.com/photo-1672841828482-45faa4c70e50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGJlYWNoJTIwc3Vuc2V0fGVufDF8fHx8MTc2MjIyMDQ3MHww&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Tropical beach"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30"></div>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 text-center text-white max-w-4xl px-6">
                    <h1 className="text-5xl md:text-7xl mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
                        Find Your Serenity in Vietnam
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-white/90">
                        Discover luxury resorts and rooms in the heart of Hoi An and Da Nang
                    </p>
                    <button className="flex items-center gap-2 mx-auto text-white hover:text-[#fbbf24] transition-colors">
                        <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center hover:border-[#fbbf24] transition-colors">
                            <Play className="w-5 h-5 fill-white" />
                        </div>
                        <span className="text-lg">Watch Video</span>
                    </button>
                </div>

                {/* Search Bar */}
                <div className="absolute bottom-20 left-0 right-0 px-6">
                    <SearchBar onSearch={() => navigate('/list')} />
                </div>
            </section>

            {/* Featured Properties */}
            <section className="container mx-auto px-6 py-20">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
                        Featured Properties
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Handpicked resorts and rooms for an unforgettable stay
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredProperties.map((property) => (
                        <PropertyCard
                            key={property._id}
                            resort={property}
                            onBook={(property) => onNavigate('details', property)}
                            toggleWishlist={true}
                        />
                    ))}
                </div>
            </section>

            {/* Popular Destinations */}
            <section className="container mx-auto px-6 py-20">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
                        Popular Destinations
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Explore the beauty of Vietnam's coastal gems
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Hoi An */}
                    <div className="relative h-96 rounded-3xl overflow-hidden group cursor-pointer">
                        <ImageWithFallback
                            src="https://images.unsplash.com/photo-1664650440553-ab53804814b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIb2klMjBBbiUyMFZpZXRuYW18ZW58MXx8fHwxNzYyMjM5MzMyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                            alt="Hoi An"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                            <h3 className="text-3xl mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
                                Hoi An
                            </h3>
                            <p className="text-white/90">
                                Ancient town charm meets modern luxury in this UNESCO World Heritage site
                            </p>
                        </div>
                    </div>

                    {/* Da Nang */}
                    <div className="relative h-96 rounded-3xl overflow-hidden group cursor-pointer">
                        <ImageWithFallback
                            src="https://images.unsplash.com/photo-1723142282970-1fd415eec1ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxEYSUyME5hbmclMjBiZWFjaHxlbnwxfHx8fDE3NjIyMzkzMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                            alt="Da Nang"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                            <h3 className="text-3xl mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
                                Da Nang
                            </h3>
                            <p className="text-white/90">
                                Pristine beaches and vibrant city life in Vietnam's most liveable city
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="bg-gradient-to-br from-[#14b8a6]/5 to-[#fbbf24]/5 py-20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
                            Why Choose MyBooking
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Your comfort and satisfaction are our top priorities
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Luxury Guaranteed */}
                        <div className="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#14b8a6] to-[#0d9488] flex items-center justify-center mx-auto mb-6">
                                <Award className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
                                Luxury Guaranteed
                            </h3>
                            <p className="text-gray-600">
                                Hand-picked premium properties that meet our highest standards of quality and comfort
                            </p>
                        </div>

                        {/* 24/7 Support */}
                        <div className="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#14b8a6] to-[#0d9488] flex items-center justify-center mx-auto mb-6">
                                <HeadphonesIcon className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
                                24/7 Support
                            </h3>
                            <p className="text-gray-600">
                                Our dedicated team is always available to assist you before, during, and after your stay
                            </p>
                        </div>

                        {/* Best Locations */}
                        <div className="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#14b8a6] to-[#0d9488] flex items-center justify-center mx-auto mb-6">
                                <Shield className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
                                Best Locations
                            </h3>
                            <p className="text-gray-600">
                                Prime beachfront and city locations with easy access to attractions and local culture
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HomePage