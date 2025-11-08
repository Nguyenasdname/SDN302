"use client";

import { useEffect, useState } from 'react';
import PropertyCard from '../../components/PropertyCard';
import { properties } from '../../lib/data.js';
import { Slider } from '../../components/ui/slider';
import { Checkbox } from '../../components/ui/checkbox';
import { Label } from '../../components/ui/label';
import { useGet } from '../../hooks/useGet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import SearchBar from '../../components/SearchBar.jsx';
import { usePost } from '../../hooks/usePost.js';


export function ResortListPage({ onNavigate, wishlist, toggleWishlist }) {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedType, setSelectedType] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [sortBy, setSortBy] = useState('popularity');
  const [resorts, setResort] = useState([])
  const { postData, loading: resortLoading } = usePost()


  const toggleType = (type) => {
    setSelectedType((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  useEffect(() => {
    const fetchInitialResort = async () => {
      const res = await postData('/resort/available', {})
      if (res) {
        setResort(res)
        console.log(res)
      }
    }
    fetchInitialResort()
  }, [])


  const handleSearhBar = async ({ checkIn, checkOut, guests }) => {
    const res = await postData('/resort/available', {
      startDate: checkIn,
      endDate: checkOut,
      numberOfGuest: parseInt(guests)
    })

    if (res) {
      setResort(res)
    }
  }



  // let filteredProperties = resorts.filter((property) => {
  //   const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];
  //   const matchesLocation = !selectedLocation || property.location === selectedLocation;
  //   const matchesType = selectedType.length === 0 || selectedType.includes(property.type);
  //   const matchesAmenities =
  //     selectedAmenities.length === 0 ||
  //     selectedAmenities.every((amenity) => property.amenities.includes(amenity));

  //   return matchesPrice && matchesLocation && matchesType && matchesAmenities;
  // });

  let filteredProperties = resorts.filter((property) => {
    const matchesPrice =
      typeof property.resortPrice === 'number' &&
      property.resortPrice >= priceRange[0] &&
      property.resortPrice <= priceRange[1];

    const matchesLocation =
      selectedLocation === '' ||
      selectedLocation === 'all' ||
      property.resortLocation === selectedLocation;

    const matchesType =
      selectedType.length === 0 || selectedType.includes(property.type); // <-- bạn tự xử lý nếu cần

    const matchesAmenities =
      selectedAmenities.length === 0 ||
      (Array.isArray(property.amenities) &&
        selectedAmenities.every((amenity) => property.amenities.includes(amenity))); // <-- bạn tự xử lý nếu cần

    return matchesPrice && matchesLocation && matchesType && matchesAmenities;
  });


  filteredProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'popularity':
      default:
        return b.rating - a.rating;
    }
  });

  return (
    <div className="container mx-auto px-6 py-12 relative">

      <div className="absolute left-0 right-0 top-10 px-6">
        <SearchBar onSearch={handleSearhBar} />
      </div>

      <h1 className="text-4xl md:text-5xl mb-8 mt-40" style={{ fontFamily: 'var(--font-serif)' }}>
        Resorts & Rooms
      </h1>



      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters - Left Column */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
            <h3 className="mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
              Filters
            </h3>

            {/* Price Range */}
            <div className="mb-6">
              <Label className="mb-3 block">Price Range</Label>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={500}
                step={10}
                className="mb-2"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            {/* Location */}
            <div className="mb-6">
              <Label className="mb-3 block">Location</Label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="Hoi An">Hoi An</SelectItem>
                  <SelectItem value="Da Nang">Da Nang</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Property Type */}
            <div className="mb-6">
              <Label className="mb-3 block">Property Type</Label>
              <div className="space-y-3">
                {['Resort', 'Apartment', 'Room'].map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={type}
                      checked={selectedType.includes(type)}
                      onCheckedChange={() => toggleType(type)}
                    />
                    <Label htmlFor={type} className="cursor-pointer">
                      {type}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="mb-6">
              <Label className="mb-3 block">Amenities</Label>
              <div className="space-y-3">
                {['Pool', 'WiFi', 'Kitchen', 'Air Conditioning', 'Parking', 'Beach Access'].map(
                  (amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox
                        id={amenity}
                        checked={selectedAmenities.includes(amenity)}
                        onCheckedChange={() => toggleAmenity(amenity)}
                      />
                      <Label htmlFor={amenity} className="cursor-pointer">
                        {amenity}
                      </Label>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Property List - Right Column */}
        <div className="lg:col-span-3">
          {/* Sort By */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              {filteredProperties.length} properties found
            </p>
            <div className="flex items-center gap-3">
              <Label>Sort by:</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Popularity</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property._id}
                resort={property}
                onBook={(property) => onNavigate('details', property)}
                isWishlisted={true}
                toggleWishlist={toggleWishlist}
              />
            ))}
          </div>

          {filteredProperties.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                No properties found matching your criteria. Try adjusting your filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
