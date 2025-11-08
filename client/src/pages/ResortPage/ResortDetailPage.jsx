import { useState, useEffect } from "react";
import {
  MapPin,
  Users,
  Bed,
  Star,
  Heart,
  Share2,
  Calendar,
  ArrowLeft,
  CheckCircle,
  Wifi,
  Car,
  Coffee,
  Tv,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";
import { Dialog, DialogContent } from "../../components/ui/dialog";
import api from "../../api";
import { toast } from "sonner";
import { useParams } from "react-router-dom";

export function ResortDetailPage() {
  const [resort, setResort] = useState(null); // dữ liệu resort từ backend
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const { resortId } = useParams();

  // mapping tên tiện nghi sang icon
  const amenityIcons = {
    WiFi: Wifi,
    Parking: Car,
    Kitchen: Coffee,
    TV: Tv,
  };

  // call backend để lấy chi tiết resort
  useEffect(() => {
  const fetchResort = async () => {
    try {
      const res = await api.get(`/resort/${resortId}`);
      
      console.log("API Response:", res.data); // ← XEM DỮ LIỆU THẬT
      console.table(res.data);

      setResort(res.data);
      setIsWishlisted(res.data.isWishlisted || false);
    } catch (err) {
      console.error("Lỗi:", err.response?.data || err.message);
      toast.error("Không thể tải dữ liệu resort");
    }
  };
  fetchResort();
}, [resortId]);

  // toggle wishlist, vẫn hiển thị UI, backend chưa có thì bỏ qua
  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    // TODO: gọi backend để lưu wishlist
  };

  // dữ liệu mặc định khi backend chưa trả
  if (!resort) {
  return <div className="text-center py-10">Đang tải...</div>;
}

const resortData = {
  name: resort.resortName || "Chưa có tên",
  description: resort.resortDescription || "Chưa có mô tả",
  images: Array.isArray(resort.images) ? resort.images : [],
  price: resort.resortPrice || 0,
  guests: resort.resortCapacity || 0,
  rating: resort.avgRating || 0,
  reviews: resort.reviewCount || 0,
  location: resort.resortLocation || "Chưa xác định",
  type: "Resort",
  bedrooms: resort.bedrooms || 0,
  bathrooms: resort.bathrooms || 0,
  amenities: resort.amenities || [],
};

  const nextImage = () => {
    if (resortData.images.length === 0) return;
    setCurrentImageIndex((prev) => (prev + 1) % resortData.images.length);
  };

  const prevImage = () => {
    if (resortData.images.length === 0) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? resortData.images.length - 1 : prev - 1
    );
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: resortData.name,
        text: resortData.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link đã được copy!");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="border-b">
        <div className="container mx-auto px-6 py-4">
          <Button
            variant="ghost"
            onClick={() => onNavigate("resort-list")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Quay lại danh sách
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <h1 className="text-4xl mb-2" style={{ fontFamily: "var(--font-serif)" }}>
  {resortData.name}
</h1>
<div className="flex items-center gap-4 text-gray-600">
  <div className="flex items-center gap-1">
    <Star className="w-5 h-5 fill-[#fbbf24] text-[#fbbf24]" />
    <span>{resortData.rating}</span>
    <span className="text-gray-400">({resortData.reviews} đánh giá)</span>
  </div>
  <div className="flex items-center gap-1">
    <MapPin className="w-5 h-5 text-[#14b8a6]" />
    <span>{resortData.location}, Việt Nam</span>
  </div>
</div>


        {/* Image Gallery */}
        {/* Image Gallery (chỉ 1 ảnh lớn + chuyển trái phải) */}
        <div className="relative w-full h-[500px] mb-8 rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center">
          {resortData.images && resortData.images.length > 0 ? (
            <>
              <img
                src={resortData.images[currentImageIndex]}
                alt={resortData.name}
                className="w-full h-full object-cover"
              />

              {/* Nút chuyển trái */}
              {resortData.images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>

                  {/* Nút chuyển phải */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white"
                    onClick={nextImage}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                </>
              )}

              {/* Chỉ số ảnh */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {resortData.images.length}
              </div>
            </>
          ) : (
            <div className="text-gray-400 text-lg">Chưa có ảnh</div>
          )}
        </div>

        {/* Full Screen Gallery Dialog */}
        <Dialog open={showGallery} onOpenChange={setShowGallery}>
          <DialogContent className="max-w-7xl h-[90vh] p-0">
            <div className="relative w-full h-full bg-black">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
                onClick={() => setShowGallery(false)}
              >
                <X className="w-6 h-6" />
              </Button>
              {resortData.images.length > 0 && (
                <>
                  <img
                    src={resortData.images[currentImageIndex]}
                    alt={resortData.name}
                    className="w-full h-full object-contain"
                  />
                  {resortData.images.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                        onClick={prevImage}
                      >
                        <ChevronLeft className="w-8 h-8" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                        onClick={nextImage}
                      >
                        <ChevronRight className="w-8 h-8" />
                      </Button>
                    </>
                  )}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white">
                    {currentImageIndex + 1} / {resortData.images.length}
                  </div>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <Users className="w-6 h-6 mx-auto mb-2 text-[#14b8a6]" />
                <p className="text-sm text-gray-600">Khách</p>
                <p className="text-xl">{resortData.guests}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <Bed className="w-6 h-6 mx-auto mb-2 text-[#14b8a6]" />
                <p className="text-sm text-gray-600">Phòng ngủ</p>
                <p className="text-xl">{resortData.bedrooms}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <svg
                  className="w-6 h-6 mx-auto mb-2 text-[#14b8a6]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <p className="text-sm text-gray-600">Phòng tắm</p>
                <p className="text-xl">{resortData.bathrooms}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <Badge className="mx-auto mb-2 bg-[#14b8a6]">
                  {resortData.type}
                </Badge>
                <p className="text-sm text-gray-600">Loại hình</p>
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h2
                className="text-2xl mb-4"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Mô tả
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {resortData.description}
              </p>
            </div>

            <Separator />

            {/* Amenities */}
            <div>
              <h2
                className="text-2xl mb-4"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Tiện nghi
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {resortData?.amenities?.length > 0 ? (
                  resortData.amenities.map((amenity, index) => {
                    const IconComponent = amenityIcons[amenity] || CheckCircle;
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full bg-[#14b8a6]/10 flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-[#14b8a6]" />
                        </div>
                        <span>{amenity}</span>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-400">Chưa có tiện nghi nào</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white border-2 rounded-2xl p-6 shadow-lg">
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span
                      className="text-4xl text-[#14b8a6]"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      ${resortData.price}
                    </span>
                    <span className="text-gray-600">/ đêm</span>
                  </div>
                  {resortData.hourlyPrice && (
                    <p className="text-sm text-gray-500">
                      Hoặc ${resortData.hourlyPrice} / giờ
                    </p>
                  )}
                </div>
                <div className="space-y-3 mb-6">
                  <Button
                    className="w-full bg-[#fbbf24] hover:bg-[#f59e0b] text-black"
                    onClick={() =>
                      onNavigate("booking", { property: resortData })
                    }
                  >
                    <Calendar className="w-4 h-4 mr-2" /> Đặt ngay
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-[#14b8a6] text-[#14b8a6] hover:bg-[#14b8a6]/10"
                    onClick={handleShare}
                  >
                    <Share2 className="w-4 h-4 mr-2" /> Chia sẻ
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
