import { useState } from 'react';
import { Plus, Search, Edit, Eye, Bed, Users, Maximize, MapPin, X, Upload, Check } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Textarea } from '../../components/ui/textarea';
import { Checkbox } from '../../components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '../../components/ui/dialog';
import { toast } from 'sonner';
import { properties as initialProperties } from '../../lib/data';


const availableAmenities = [
    'Wi-Fi',
    'Swimming Pool',
    'Kitchen',
    'Air Conditioning',
    'TV',
    'Parking',
    'Garden',
    'Balcony',
    'Sea View',
    'Mountain View',
    'Hot Tub',
    'BBQ Grill',
    'Gym',
    'Beach Access',
    'Room Service',
];


export function ResortManagementPage({ onNavigate }) {
    const [resorts, setResorts] = useState(
        initialProperties.map(p => ({
            ...p,
            status: 'available',
            area: 120,
            beds: 2,
            amenities: ['Wi-Fi', 'Swimming Pool', 'Air Conditioning'],
        }))
    );
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddEditDialog, setShowAddEditDialog] = useState(false);
    const [editingResort, setEditingResort] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0,
        hourlyPrice: 0,
        type: '',
        maxOccupancy: 2,
        area: 100,
        beds: 1,
        amenities: [],
        status: 'available',
        location: 'Hoi An',
    });
    const [imagePreview, setImagePreview] = useState('');

    // Filter resorts
    const filteredResorts = resorts.filter(resort =>
        resort.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resort.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resort.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleOpenAddDialog = () => {
        setEditingResort(null);
        setFormData({
            name: '',
            description: '',
            price: 0,
            hourlyPrice: 0,
            type: '',
            maxOccupancy: 2,
            area: 100,
            beds: 1,
            amenities: [],
            status: 'available',
            location: 'Hoi An',
        });
        setImagePreview('');
        setShowAddEditDialog(true);
    };

    const handleOpenEditDialog = (resort) => {
        setEditingResort(resort);
        setFormData(resort);
        setImagePreview(resort.image);
        setShowAddEditDialog(true);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setFormData({ ...formData, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const toggleAmenity = (amenity) => {
        const current = formData.amenities || [];
        if (current.includes(amenity)) {
            setFormData({ ...formData, amenities: current.filter(a => a !== amenity) });
        } else {
            setFormData({ ...formData, amenities: [...current, amenity] });
        }
    };

    const handleSave = () => {
        if (!formData.name || !formData.description || !formData.price) {
            toast.error('Please fill in all required fields');
            return;
        }

        if (editingResort) {
            // Update existing resort
            setResorts(resorts.map(r =>
                r.id === editingResort.id ? { ...r, ...formData } : r
            ));
            toast.success('Resort updated successfully!');
        } else {
            // Add new resort
            const newResort = {
                ...formData,
                id: Math.max(...resorts.map(r => r.id)) + 1,
                image: imagePreview || 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800',
            };
            setResorts([...resorts, newResort]);
            toast.success('Resort added successfully!');
        }

        setShowAddEditDialog(false);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-6 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
                            Resort Management
                        </h1>
                        <p className="text-gray-600">
                            Manage all properties and accommodations
                        </p>
                    </div>
                    <Button
                        onClick={handleOpenAddDialog}
                        className="bg-[#fbbf24] hover:bg-[#f59e0b] text-black"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Add New Resort
                    </Button>
                </div>

                {/* Search Bar */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                            placeholder="Search resorts by name, type, or location..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>

                {/* Resort Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredResorts.map((resort) => (
                        <div key={resort.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                            {/* Image */}
                            <div className="relative h-48 bg-gray-200">
                                <img
                                    src={resort.image}
                                    alt={resort.name}
                                    className="w-full h-full object-cover"
                                />
                                <Badge
                                    className={`absolute top-3 right-3 ${resort.status === 'available'
                                        ? 'bg-green-500 hover:bg-green-600'
                                        : 'bg-orange-500 hover:bg-orange-600'
                                        }`}
                                >
                                    {resort.status === 'available' ? 'Available' : 'Maintenance'}
                                </Badge>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h3 className="text-xl mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
                                    {resort.name}
                                </h3>

                                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                                    <MapPin className="w-4 h-4" />
                                    {resort.location}
                                </div>

                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                    {resort.description}
                                </p>

                                {/* Details */}
                                <div className="grid grid-cols-3 gap-2 mb-4 text-sm text-gray-600">
                                    <div className="flex items-center gap-1">
                                        <Users className="w-4 h-4" />
                                        {resort.maxOccupancy}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Bed className="w-4 h-4" />
                                        {resort.beds}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Maximize className="w-4 h-4" />
                                        {resort.area}m²
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="mb-4">
                                    <p className="text-2xl text-[#14b8a6]" style={{ fontFamily: 'var(--font-serif)' }}>
                                        ${resort.price}
                                        <span className="text-sm text-gray-500"> / night</span>
                                    </p>
                                    {resort.hourlyPrice && (
                                        <p className="text-sm text-gray-600">
                                            ${resort.hourlyPrice} / hour
                                        </p>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1"
                                        onClick={() => onNavigate('details')}
                                    >
                                        <Eye className="w-4 h-4 mr-1" />
                                        View
                                    </Button>
                                    <Button
                                        size="sm"
                                        className="flex-1 bg-[#14b8a6] hover:bg-[#0d9488]"
                                        onClick={() => handleOpenEditDialog(resort)}
                                    >
                                        <Edit className="w-4 h-4 mr-1" />
                                        Edit
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Add/Edit Resort Dialog */}
                <Dialog open={showAddEditDialog} onOpenChange={setShowAddEditDialog}>
                    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>
                                {editingResort ? 'Edit Resort' : 'Add New Resort'}
                            </DialogTitle>
                            <DialogDescription>
                                {editingResort ? 'Update resort information' : 'Fill in the details to add a new resort'}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-6 py-4">
                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm mb-2">Resort Images</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#14b8a6] transition-colors cursor-pointer">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        id="image-upload"
                                    />
                                    <label htmlFor="image-upload" className="cursor-pointer">
                                        {imagePreview ? (
                                            <div className="relative">
                                                <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
                                                <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
                                                    <Check className="w-4 h-4 text-white" />
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <Upload className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                                                <p className="text-gray-600">Click to upload or drag and drop</p>
                                                <p className="text-sm text-gray-400 mt-1">PNG, JPG up to 10MB</p>
                                            </div>
                                        )}
                                    </label>
                                </div>
                            </div>

                            {/* Resort Name */}
                            <div>
                                <label className="block text-sm mb-2">Resort Name *</label>
                                <Input
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="e.g., Luxury Beachfront Resort"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm mb-2">Description *</label>
                                <Textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Describe the resort..."
                                    rows={4}
                                />
                            </div>

                            {/* Grid for numbers */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm mb-2">Price per Night ($) *</label>
                                    <Input
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                        placeholder="150"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm mb-2">Hourly Price ($)</label>
                                    <Input
                                        type="number"
                                        value={formData.hourlyPrice}
                                        onChange={(e) => setFormData({ ...formData, hourlyPrice: Number(e.target.value) })}
                                        placeholder="25"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm mb-2">Property Type</label>
                                    <Input
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                        placeholder="e.g., Resort, Room, Apartment"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm mb-2">Location</label>
                                    <Input
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        placeholder="Hoi An"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm mb-2">Max Occupancy</label>
                                    <Input
                                        type="number"
                                        value={formData.maxOccupancy}
                                        onChange={(e) => setFormData({ ...formData, maxOccupancy: Number(e.target.value) })}
                                        min="1"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm mb-2">Area (m²)</label>
                                    <Input
                                        type="number"
                                        value={formData.area}
                                        onChange={(e) => setFormData({ ...formData, area: Number(e.target.value) })}
                                        min="1"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm mb-2">Beds</label>
                                    <Input
                                        type="number"
                                        value={formData.beds}
                                        onChange={(e) => setFormData({ ...formData, beds: Number(e.target.value) })}
                                        min="1"
                                    />
                                </div>
                            </div>

                            {/* Amenities */}
                            <div>
                                <label className="block text-sm mb-3">Amenities</label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {availableAmenities.map((amenity) => (
                                        <div key={amenity} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={amenity}
                                                checked={formData.amenities?.includes(amenity)}
                                                onCheckedChange={() => toggleAmenity(amenity)}
                                            />
                                            <label
                                                htmlFor={amenity}
                                                className="text-sm cursor-pointer select-none"
                                            >
                                                {amenity}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="flex justify-end gap-3 pt-4 border-t">
                            <Button variant="outline" onClick={() => setShowAddEditDialog(false)}>
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSave}
                                className="bg-[#14b8a6] hover:bg-[#0d9488]"
                            >
                                {editingResort ? 'Update Resort' : 'Save Resort'}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
