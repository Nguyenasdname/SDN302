import React, { useEffect, useState } from 'react';
import { Search, MapPin, Star, Heart, Filter } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Slider } from '../../components/ui/slider';
import { Checkbox } from '../../../components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '../../components/ui/sheet';
import api from '../lib/api';

export function ResortListPage({ onNavigate, wishlist, toggleWishlist }) {
  const [resorts, setResorts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [sortBy, setSortBy] = useState('recommended');

  // Load resorts từ backend
  useEffect(() => {
    const loadResorts = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/api/resorts');
        // data: array resort với hình ảnh trong field images
        setResorts(data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    loadResorts();
  }, []);

  if (loading) return <div className="text-center py-20">Đang tải resort...</div>;

  // Tạo danh sách location và amenities
  const locations = ['all', ...Array.from(new Set(resorts.map(r => r.resortLocation)))];
  const amenities = Array.from(new Set(resorts.flatMap(r => r.amenities || [])));

  // Filter resorts
  const filteredResorts = resorts.filter(resort => {
    const matchesSearch =
      resort.resortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resort.resortLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (resort.resortDescription || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLocation = selectedLocation === 'all' || resort.resortLocation === selectedLocation;

    const matchesPrice = resort.resortPrice >= priceRange[0] && resort.resortPrice <= priceRange[1];

    const matchesAmenities =
      selectedAmenities.length === 0 ||
      (resort.amenities && selectedAmenities.some(a => resort.amenities.includes(a)));

    return matchesSearch && matchesLocation && matchesPrice && matchesAmenities;
  });

  // Sort resorts
  const sortedResorts = [...filteredResorts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.resortPrice - b.resortPrice;
      case 'price-high': return b.resortPrice - a.resortPrice;
      case 'rating': return (b.avgRating || 0) - (a.avgRating || 0);
      default: return 0;
    }
  });

  const toggleAmenity = amenity => {
    setSelectedAmenities(prev =>
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedLocation('all');
    setPriceRange([0, 1000]);
    setSelectedAmenities([]);
    setSortBy('recommended');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#14b8a6] to-[#0d9488] text-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-5xl mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              Khám Phá Resort Cao Cấp
            </h1>
            <p className="text-xl opacity-90">
              Tìm resort lý tưởng cho kỳ nghỉ tại Hội An & Đà Nẵng
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Search & Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 -mt-16 mb-8 relative z-10">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm mb-2">Tìm kiếm</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Tên resort, địa điểm..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2">Địa điểm</label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(loc => (
                    <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm mb-2 opacity-0">Filters</label>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Filter className="w-4 h-4 mr-2" />
                    Bộ lọc
                    {(selectedAmenities.length > 0 || priceRange[0] > 0 || priceRange[1] < 1000) && (
                      <Badge className="ml-2 bg-[#14b8a6]">
                        {selectedAmenities.length + (priceRange[0] > 0 || priceRange[1] < 1000 ? 1 : 0)}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Bộ lọc</SheetTitle>
                    <SheetDescription>Tinh chỉnh tìm kiếm của bạn</SheetDescription>
                  </SheetHeader>

                  <div className="mt-6 space-y-6">
                    <div>
                      <label className="block mb-4">
                        Giá mỗi đêm: ${priceRange[0]} - ${priceRange[1]}
                      </label>
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        min={0}
                        max={1000}
                        step={10}
                        className="mb-2"
                      />
                    </div>

                    <div>
                      <label className="block mb-3">Tiện nghi</label>
                      <div className="space-y-3">
                        {amenities.map(a => (
                          <div key={a} className="flex items-center space-x-2">
                            <Checkbox
                              id={a}
                              checked={selectedAmenities.includes(a)}
                              onCheckedChange={() => toggleAmenity(a)}
                            />
                            <label htmlFor={a} className="text-sm cursor-pointer">{a}</label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button variant="outline" onClick={clearFilters} className="w-full">
                      Xóa bộ lọc
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        {/* Resort Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedResorts.map(resort => (
            <div
              key={resort._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={resort.images?.[0] || '/placeholder.jpg'}
                  alt={resort.resortName}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onClick={() => onNavigate('resort-detail', resort)}
                />
                <button
                  onClick={e => { e.stopPropagation(); toggleWishlist(resort._id); }}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      wishlist.includes(resort._id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
                    }`}
                  />
                </button>
                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-white/90 backdrop-blur-sm text-gray-900 hover:bg-white">
                    <MapPin className="w-3 h-3 mr-1" />
                    {resort.resortLocation}
                  </Badge>
                </div>
              </div>

              <div className="p-5" onClick={() => onNavigate('resort-detail', resort)}>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl line-clamp-1" style={{ fontFamily: 'var(--font-serif)' }}>
                    {resort.resortName}
                  </h3>
                  <div className="flex items-center gap-1 bg-[#fbbf24] px-2 py-1 rounded-lg">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm">{resort.avgRating || 0}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{resort.resortDescription}</p>
                <div className="flex items-end justify-between pt-4 border-t">
                  <div>
                    <p className="text-sm text-gray-500">Từ</p>
                    <p className="text-2xl text-[#14b8a6]" style={{ fontFamily: 'var(--font-serif)' }}>
                      ${resort.resortPrice} <span className="text-sm text-gray-500">/ đêm</span>
                    </p>
                  </div>
                  <Button
                    className="bg-[#fbbf24] hover:bg-[#f59e0b] text-black"
                    onClick={e => { e.stopPropagation(); onNavigate('resort-detail', resort); }}
                  >
                    Xem chi tiết
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {sortedResorts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl mb-2" style={{ fontFamily: 'var(--font-serif)' }}>Không tìm thấy resort</h3>
            <p className="text-gray-600 mb-6">Hãy thử điều chỉnh bộ lọc của bạn</p>
            <Button onClick={clearFilters} className="bg-[#14b8a6] hover:bg-[#0d9488]">Xóa bộ lọc</Button>
          </div>
        )}
      </div>
    </div>
  );
}
