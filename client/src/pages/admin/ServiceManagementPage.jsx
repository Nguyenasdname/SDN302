import { useState } from 'react';
import { Plus, Search, Edit, Upload, X } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Textarea } from '../../components/ui/textarea';
import { Switch } from '../../components/ui/switch';
import { Label } from '../../components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../../components/ui/select';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '../../components/ui/dialog';
import { toast } from 'sonner';



const serviceCategories = [
    'Wellness',
    'Dining',
    'Transportation',
    'Activities',
    'Entertainment',
    'Business',
];

const mockServices= [
    {
        id: 1,
        name: 'Spa & Massage Treatment',
        description: 'Luxurious 90-minute full body massage with aromatherapy oils',
        price: 120,
        pricingUnit: 'per person',
        category: 'Wellness',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800',
        status: 'active',
        availabilityRules: 'Available daily 9AM-8PM',
    },
    {
        id: 2,
        name: 'Airport Transfer',
        description: 'Private car service from/to Da Nang International Airport',
        price: 45,
        pricingUnit: 'fixed price',
        category: 'Transportation',
        image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800',
        status: 'active',
        availabilityRules: '24/7 available, 2 hours advance booking required',
    },
    {
        id: 3,
        name: 'Private Chef Dinner',
        description: 'Exclusive 5-course Vietnamese dinner prepared by our chef at your resort',
        price: 200,
        pricingUnit: 'per person',
        category: 'Dining',
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
        status: 'active',
        availabilityRules: 'Requires 24-hour advance booking',
    },
    {
        id: 4,
        name: 'Yoga Class',
        description: 'Private or group yoga session on the beach at sunrise or sunset',
        price: 35,
        pricingUnit: 'per person',
        category: 'Wellness',
        image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800',
        status: 'active',
        availabilityRules: 'Available 6AM-7AM and 5PM-6PM',
    },
    {
        id: 5,
        name: 'Hoi An Ancient Town Tour',
        description: 'Half-day guided tour of Hoi An Ancient Town with English-speaking guide',
        price: 60,
        pricingUnit: 'per person',
        category: 'Activities',
        image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800',
        status: 'active',
    },
    {
        id: 6,
        name: 'Winter Bonfire Night',
        description: 'Cozy bonfire experience with BBQ and live music on the beach',
        price: 75,
        pricingUnit: 'per person',
        category: 'Entertainment',
        image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800',
        status: 'inactive',
        availabilityRules: 'Seasonal (November - February)',
    },
];

const ServiceManagementPage = ({ onNavigate }) => {
    const [services, setServices] = useState (mockServices);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [showAddEditDialog, setShowAddEditDialog] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [imagePreview, setImagePreview] = useState ('');
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0,
        pricingUnit: 'per person',
        category: 'Wellness',
        image: '',
        status: 'active',
        availabilityRules: '',
    });

    // Filter services
    const filteredServices = services.filter(service => {
        const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            service.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || service.category === categoryFilter;
        const matchesStatus = statusFilter === 'all' || service.status === statusFilter;
        return matchesSearch && matchesCategory && matchesStatus;
    });

    const handleOpenAddDialog = () => {
        setEditingService(null);
        setFormData({
            name: '',
            description: '',
            price: 0,
            pricingUnit: 'per person',
            category: 'Wellness',
            image: '',
            status: 'active',
            availabilityRules: '',
        });
        setImagePreview('');
        setShowAddEditDialog(true);
    };

    const handleOpenEditDialog = (service) => {
        setEditingService(service);
        setFormData(service);
        setImagePreview(service.image);
        setShowAddEditDialog(true);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setFormData({ ...formData, image: reader.result});
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveService = () => {
        if (!formData.name || !formData.description || !formData.price) {
            toast.error('Please fill in all required fields');
            return;
        }

        if (editingService) {
            // Update existing service
            setServices(services.map(s =>
                s.id === editingService.id ? { ...s, ...formData }: s
            ));
            toast.success('Service updated successfully!');
        } else {
            // Add new service
            const newService = {
                ...formData,
                id: Math.max(...services.map(s => s.id), 0) + 1,
                image: imagePreview || 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800',
            } ;
            setServices([...services, newService]);
            toast.success('Service added successfully!');
        }

        setShowAddEditDialog(false);
    };

    const handleToggleStatus = (serviceId) => {
        setServices(services.map(s =>
            s.id === serviceId
                ? { ...s, status: s.status === 'active' ? 'inactive' : 'active' }
                : s
        ));
        const service = services.find(s => s.id === serviceId);
        toast.success(`Service ${service?.status === 'active' ? 'deactivated' : 'activated'} successfully!`);
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
                        Service Management
                    </h1>
                    <p className="text-gray-600">
                        Manage resort services and ancillary offerings
                    </p>
                </div>
                <Button
                    onClick={handleOpenAddDialog}
                    className="bg-[#fbbf24] hover:bg-[#f59e0b] text-white"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Add New Service
                </Button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                            placeholder="Search services..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    {/* Category Filter */}
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                        <SelectTrigger>
                            <SelectValue placeholder="Filter by category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            {serviceCategories.map((category) => (
                                <SelectItem key={category} value={category}>
                                    {category}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Status Filter */}
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger>
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service) => (
                    <div key={service.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                        {/* Image */}
                        <div className="relative h-48 bg-gray-200">
                            <img
                                src={service.image}
                                alt={service.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-3 right-3">
                                <Badge variant={service.status === 'active' ? 'default' : 'secondary'}>
                                    {service.status === 'active' ? 'Active' : 'Inactive'}
                                </Badge>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-5">
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                    <h3 className="mb-1" style={{ fontFamily: 'var(--font-serif)' }}>
                                        {service.name}
                                    </h3>
                                    <Badge variant="outline" className="text-xs">
                                        {service.category}
                                    </Badge>
                                </div>
                            </div>

                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                {service.description}
                            </p>

                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <div className="text-2xl text-[#14b8a6]">
                                        ${service.price}
                                    </div>
                                    <div className="text-xs text-gray-500">{service.pricingUnit}</div>
                                </div>
                            </div>

                            {service.availabilityRules && (
                                <div className="text-xs text-gray-500 mb-4 p-2 bg-gray-50 rounded">
                                    {service.availabilityRules}
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex items-center gap-3 pt-3 border-t">
                                <Button
                                    onClick={() => handleOpenEditDialog(service)}
                                    variant="outline"
                                    size="sm"
                                    className="flex-1"
                                >
                                    <Edit className="w-4 h-4 mr-1" />
                                    Edit
                                </Button>
                                <div className="flex items-center gap-2">
                                    <Label htmlFor={`status-${service.id}`} className="text-xs cursor-pointer">
                                        {service.status === 'active' ? 'Active' : 'Inactive'}
                                    </Label>
                                    <Switch
                                        id={`status-${service.id}`}
                                        checked={service.status === 'active'}
                                        onCheckedChange={() => handleToggleStatus(service.id)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredServices.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg">
                    <p className="text-gray-500">No services found matching your criteria.</p>
                </div>
            )}

            {/* Add/Edit Service Dialog */}
            <Dialog open={showAddEditDialog} onOpenChange={setShowAddEditDialog}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle style={{ fontFamily: 'var(--font-serif)' }}>
                            {editingService ? 'Edit Service' : 'Add New Service'}
                        </DialogTitle>
                        <DialogDescription>
                            {editingService ? 'Update service details' : 'Create a new service offering'}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 py-4">
                        {/* Service Name */}
                        <div>
                            <Label htmlFor="name" className="mb-2 block">
                                Service Name *
                            </Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g., Spa & Massage Treatment"
                            />
                        </div>

                        {/* Service Description */}
                        <div>
                            <Label htmlFor="description" className="mb-2 block">
                                Service Description *
                            </Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Detailed description of the service..."
                                rows={4}
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <Label htmlFor="category" className="mb-2 block">
                                Category *
                            </Label>
                            <Select
                                value={formData.category}
                                onValueChange={(value) => setFormData({ ...formData, category: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {serviceCategories.map((category) => (
                                        <SelectItem key={category} value={category}>
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Price and Pricing Unit */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="price" className="mb-2 block">
                                    Price ($) *
                                </Label>
                                <Input
                                    id="price"
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                                    placeholder="0"
                                />
                            </div>
                            <div>
                                <Label htmlFor="pricingUnit" className="mb-2 block">
                                    Pricing Unit *
                                </Label>
                                <Select 
                                    value={formData.pricingUnit}
                                    onValueChange={(value) => setFormData({ ...formData, pricingUnit: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="per person">Per Person</SelectItem>
                                        <SelectItem value="per hour">Per Hour</SelectItem>
                                        <SelectItem value="fixed price">Fixed Price</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Availability Rules */}
                        <div>
                            <Label htmlFor="availabilityRules" className="mb-2 block">
                                Availability Rules (Optional)
                            </Label>
                            <Input
                                id="availabilityRules"
                                value={formData.availabilityRules}
                                onChange={(e) => setFormData({ ...formData, availabilityRules: e.target.value })}
                                placeholder="e.g., Available daily 9AM-8PM"
                            />
                        </div>

                        {/* Image Upload */}
                        <div>
                            <Label htmlFor="image" className="mb-2 block">
                                Service Image
                            </Label>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <Input
                                        id="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                    />
                                </div>
                                {imagePreview && (
                                    <div className="relative w-24 h-24 rounded-lg overflow-hidden border">
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                        <button
                                            onClick={() => {
                                                setImagePreview('');
                                                setFormData({ ...formData, image: '' });
                                            }}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Status */}
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <Label htmlFor="status" className="mb-1 block">
                                    Service Status
                                </Label>
                                <p className="text-sm text-gray-500">
                                    {formData.status === 'active' ? 'Service is available for booking' : 'Service is temporarily disabled'}
                                </p>
                            </div>
                            <Switch
                                id="status"
                                checked={formData.status === 'active'}
                                onCheckedChange={(checked) =>
                                    setFormData({ ...formData, status: checked ? 'active' : 'inactive' })
                                }
                            />
                        </div>
                    </div>

                    {/* Dialog Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <Button
                            variant="outline"
                            onClick={() => setShowAddEditDialog(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSaveService}
                            className="bg-[#fbbf24] hover:bg-[#f59e0b] text-white"
                        >
                            {editingService ? 'Update Service' : 'Save Service'}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default ServiceManagementPage