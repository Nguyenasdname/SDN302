import { useState, useEffect } from 'react';
import { ArrowLeft, Upload, Check, X, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Alert, AlertDescription } from '../components/ui/alert';
import { toast } from 'sonner';
import api from '../lib/api';

const availableAmenities = [
  'WiFi', 'Pool', 'Kitchen', 'Air Conditioning', 'TV', 'Parking', 'Garden',
  'Balcony', 'Beach Access', 'Mountain View', 'Ocean View', 'Hot Tub', 'BBQ',
  'Gym', 'Spa', 'Room Service', 'Bicycle', 'Traditional Architecture', 'Eco-Friendly'
];

export function ResortFormPage({ onNavigate, currentUser, resortData }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFiles, setImageFiles] = useState([]); // Files to send to backend
  const [imagePreviews, setImagePreviews] = useState([]);
  const [formData, setFormData] = useState({
    resortName: '',
    resortDescription: '',
    resortPrice: '',
    resortLocation: 'Hoi An',
    resortCapacity: '',
    resortStatus: 'Available',
    amenities: [],
  });

  // Check employee access
  useEffect(() => {
    if (!currentUser || currentUser.role !== 'employee') {
      toast.error('Bạn không có quyền truy cập trang này');
      onNavigate('home');
    }
  }, [currentUser, onNavigate]);

  // Load resort data if editing
  useEffect(() => {
    if (resortData) {
      setFormData({
        resortName: resortData.resortName || '',
        resortDescription: resortData.resortDescription || '',
        resortPrice: resortData.resortPrice ? resortData.resortPrice.toString() : '',
        resortLocation: resortData.resortLocation || 'Hoi An',
        resortCapacity: resortData.resortCapacity ? resortData.resortCapacity.toString() : '',
        resortStatus: resortData.resortStatus || 'Available',
        amenities: resortData.amenities || [],
      });

      if (resortData.images) {
        setImagePreviews(resortData.images);
      }
    }
  }, [resortData]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length + imagePreviews.length > 5) {
      toast.error('Tối đa 5 ảnh');
      return;
    }

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });

    setImageFiles(prev => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  const toggleAmenity = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const validateForm = () => {
    if (!formData.resortName.trim()) {
      toast.error('Vui lòng nhập tên resort');
      return false;
    }
    if (!formData.resortDescription.trim()) {
      toast.error('Vui lòng nhập mô tả');
      return false;
    }
    if (!formData.resortPrice || parseFloat(formData.resortPrice) <= 0) {
      toast.error('Vui lòng nhập giá hợp lệ');
      return false;
    }
    if (!formData.resortCapacity || parseInt(formData.resortCapacity) <= 0) {
      toast.error('Vui lòng nhập sức chứa hợp lệ');
      return false;
    }
    if (imagePreviews.length === 0) {
      toast.error('Vui lòng tải lên ít nhất 1 ảnh');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append('resortName', formData.resortName);
      data.append('resortDescription', formData.resortDescription);
      data.append('resortPrice', parseFloat(formData.resortPrice));
      data.append('resortLocation', formData.resortLocation);
      data.append('resortCapacity', parseInt(formData.resortCapacity));
      data.append('resortStatus', formData.resortStatus);
      data.append('amenities', JSON.stringify(formData.amenities));

      imageFiles.forEach(file => data.append('images', file));

      let response;
      if (resortData) {
        // Update resort
        response = await api.put(`/resorts/${resortData._id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        // Create new resort
        response = await api.post('/resorts', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      toast.success(resortData ? 'Cập nhật resort thành công' : 'Tạo resort mới thành công');
      onNavigate('admin-resorts');
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Lỗi server');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!currentUser || currentUser.role !== 'employee') return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <Button
            variant="ghost"
            onClick={() => onNavigate('admin-resorts')}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Quay lại
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <h1 className="text-4xl mb-2">{resortData ? 'Chỉnh sửa Resort' : 'Tạo Resort Mới'}</h1>
        <p className="text-gray-600 mb-6">
          {resortData ? 'Cập nhật thông tin resort' : 'Điền thông tin để thêm resort mới'}
        </p>

        <Alert className="mb-6 border-[#14b8a6] bg-[#14b8a6]/5">
          <AlertCircle className="h-4 w-4 text-[#14b8a6]" />
          <AlertDescription className="text-[#14b8a6]">
            Bạn đang đăng nhập với quyền Employee. Thông tin resort sẽ được lưu sau khi xác nhận.
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Hình ảnh */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl mb-4">Hình ảnh Resort</h2>
            <p className="text-sm text-gray-600 mb-4">
              Tải lên tối đa 5 ảnh. Ảnh đầu tiên sẽ là ảnh đại diện.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-48 object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                    <Button type="button" size="icon" variant="destructive" onClick={() => removeImage(index)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  {index === 0 && (
                    <div className="absolute top-2 left-2 bg-[#14b8a6] text-white text-xs px-2 py-1 rounded">
                      Ảnh chính
                    </div>
                  )}
                </div>
              ))}

              {imagePreviews.length < 5 && (
                <label className="border-2 border-dashed border-gray-300 rounded-xl h-48 flex flex-col items-center justify-center cursor-pointer hover:border-[#14b8a6] transition-colors">
                  <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Tải ảnh lên</p>
                </label>
              )}
            </div>
          </div>

          {/* Thông tin cơ bản */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl mb-6">Thông tin cơ bản</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="resortName">Tên Resort *</Label>
                <Input
                  id="resortName"
                  value={formData.resortName}
                  onChange={e => setFormData({...formData, resortName: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="resortDescription">Mô tả *</Label>
                <Textarea
                  id="resortDescription"
                  value={formData.resortDescription}
                  onChange={e => setFormData({...formData, resortDescription: e.target.value})}
                  rows={5}
                  required
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="resortLocation">Địa điểm</Label>
                  <Select value={formData.resortLocation} onValueChange={(value) => setFormData({...formData, resortLocation: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Hoi An">Hội An</SelectItem>
                      <SelectItem value="Da Nang">Đà Nẵng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="resortStatus">Trạng thái</Label>
                  <Select value={formData.resortStatus} onValueChange={(value) => setFormData({...formData, resortStatus: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Available">Available</SelectItem>
                      <SelectItem value="Unavailable">Unavailable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Giá cả */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl mb-6">Giá cả</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="resortPrice">Giá mỗi đêm ($) *</Label>
                <Input
                  id="resortPrice"
                  type="number"
                  min="0"
                  value={formData.resortPrice}
                  onChange={e => setFormData({...formData, resortPrice: e.target.value})}
                  required
                />
              </div>
            </div>
          </div>

          {/* Sức chứa */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl mb-6">Sức chứa</h2>
            <div>
              <Label htmlFor="resortCapacity">Sức chứa khách *</Label>
              <Input
                id="resortCapacity"
                type="number"
                min="1"
                value={formData.resortCapacity}
                onChange={e => setFormData({...formData, resortCapacity: e.target.value})}
                required
              />
            </div>
          </div>

          {/* Tiện nghi */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl mb-6">Tiện nghi</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {availableAmenities.map(amenity => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity}
                    checked={formData.amenities.includes(amenity)}
                    onCheckedChange={() => toggleAmenity(amenity)}
                  />
                  <label htmlFor={amenity} className="text-sm cursor-pointer">{amenity}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 justify-end">
            <Button type="button" variant="outline" onClick={() => onNavigate('admin-resorts')} disabled={isSubmitting}>Hủy</Button>
            <Button type="submit" className="bg-[#14b8a6] hover:bg-[#0d9488]" disabled={isSubmitting}>
              {isSubmitting ? 'Đang lưu...' : (resortData ? 'Cập nhật Resort' : 'Tạo Resort')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
