import React, { useEffect, useState } from 'react';
import { Search, Star, MapPin } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import api from '../../api';
import debounce from 'lodash.debounce';
import { useNavigate } from 'react-router-dom';

export function ResortListPage() {
  const navigate = useNavigate();
  const [resorts, setResorts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
const [debouncedQuery, setDebouncedQuery] = useState('');
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [numberOfGuest, setNumberOfGuest] = useState(1);

  useEffect(() => {
  const handler = setTimeout(() => {
    setDebouncedQuery(searchQuery);
  }, 500); // 500ms sau khi ngừng gõ

  return () => clearTimeout(handler);
}, [searchQuery]);

useEffect(() => {
  const loadResorts = async () => {
    setLoading(true);
    try {
      const { data } = await api.post('/resort/available', {
        searchQuery: debouncedQuery,
        startDate: checkin,
        endDate: checkout,
        numberOfGuest
      });
      setResorts(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };
  loadResorts();
}, [debouncedQuery, checkin, checkout, numberOfGuest]);


  if (loading) return <div className="text-center py-20">Đang tải resort...</div>;

  const clearFilters = () => {
    setSearchQuery('');
    setCheckin('');
    setCheckout('');
    setNumberOfGuest(1);
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
            <p className="text-xl opacity-90">Tìm resort lý tưởng cho kỳ nghỉ của bạn</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Search & Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 -mt-16 mb-8 relative z-10">
          <div className="grid md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm mb-2">Tìm kiếm</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Tên resort hoặc mô tả..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Check-in */}
            <div>
              <label className="block text-sm mb-2">Check-in</label>
              <Input type="date" value={checkin} onChange={e => setCheckin(e.target.value)} />
            </div>

            {/* Check-out */}
            <div>
              <label className="block text-sm mb-2">Check-out</label>
              <Input type="date" value={checkout} onChange={e => setCheckout(e.target.value)} />
            </div>

            {/* Number of guests */}
            <div>
              <label className="block text-sm mb-2">Số khách</label>
              <Input
                type="number"
                min={1}
                value={numberOfGuest}
                onChange={e => setNumberOfGuest(parseInt(e.target.value) || 1)}
              />
            </div>
            
          </div>

          <div className="mt-4">
            <Button onClick={clearFilters} className="bg-[#14b8a6] hover:bg-[#0d9488] text-white">
              Xóa bộ lọc
            </Button>
          </div>
        </div>

        {/* Resort Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resorts.map(resort => (
            <div
              key={resort._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
              onClick={() => onNavigate('resort-detail', resort)}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={resort.images?.[0] || '/placeholder.jpg'}
                  alt={resort.resortName}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-white/90 backdrop-blur-sm text-gray-900 hover:bg-white">
                    <MapPin className="w-3 h-3 mr-1" />
                    {resort.resortLocation}
                  </Badge>
                </div>
              </div>

              <div className="p-5">
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
                    onClick={(e) => {
      e.stopPropagation();
      navigate(`/resort-detail/${resort._id}`);
    }}
                  >
                    Xem chi tiết
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {resorts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
              Không tìm thấy resort
            </h3>
            <p className="text-gray-600 mb-6">Hãy thử điều chỉnh bộ lọc của bạn</p>
            <Button onClick={clearFilters} className="bg-[#14b8a6] hover:bg-[#0d9488] text-white">
              Xóa bộ lọc
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
