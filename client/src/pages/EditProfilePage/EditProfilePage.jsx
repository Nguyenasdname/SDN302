import { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { mockUser } from '../../lib/data';
import { ImageWithFallback } from '../../components/ImageWithFallBack';
import { Camera, ArrowLeft } from 'lucide-react';


const EditProfilePage = ({ onNavigate }) => {
    const [formData, setFormData] = useState({
        name: mockUser.name,
        email: mockUser.email,
        phone: mockUser.phone,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Profile updated successfully!');
        onNavigate('profile');
    };

    return (
        <div className="container mx-auto px-6 py-12">
            {/* Back Button */}
            <button
                onClick={() => onNavigate('profile')}
                className="flex items-center gap-2 text-gray-600 hover:text-[#14b8a6] transition-colors mb-6"
            >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Profile</span>
            </button>

            <h1 className="text-4xl md:text-5xl mb-8" style={{ fontFamily: 'var(--font-serif)' }}>
                Account Settings
            </h1>

            <div className="max-w-2xl">
                <form onSubmit={handleSubmit}>
                    {/* Profile Picture */}
                    <Card className="p-6 mb-6">
                        <h2 className="text-xl mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
                            Profile Picture
                        </h2>

                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#14b8a6]">
                                    <ImageWithFallback
                                        src={mockUser.avatar}
                                        alt={mockUser.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-[#14b8a6] flex items-center justify-center text-white hover:bg-[#0d9488] transition-colors"
                                >
                                    <Camera className="w-5 h-5" />
                                </button>
                            </div>

                            <div>
                                <p className="text-gray-600 mb-3">
                                    Upload a new profile picture. Recommended size: 400x400px
                                </p>
                                <Button type="button" variant="outline">
                                    Choose File
                                </Button>
                            </div>
                        </div>
                    </Card>

                    {/* Personal Information */}
                    <Card className="p-6 mb-6">
                        <h2 className="text-xl mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
                            Personal Information
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </Card>

                    {/* Change Password */}
                    <Card className="p-6 mb-6">
                        <h2 className="text-xl mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
                            Change Password
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <Label htmlFor="currentPassword">Current Password</Label>
                                <Input
                                    id="currentPassword"
                                    type="password"
                                    value={formData.currentPassword}
                                    onChange={(e) =>
                                        setFormData({ ...formData, currentPassword: e.target.value })
                                    }
                                    placeholder="Enter current password"
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <Label htmlFor="newPassword">New Password</Label>
                                <Input
                                    id="newPassword"
                                    type="password"
                                    value={formData.newPassword}
                                    onChange={(e) =>
                                        setFormData({ ...formData, newPassword: e.target.value })
                                    }
                                    placeholder="Enter new password"
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={(e) =>
                                        setFormData({ ...formData, confirmPassword: e.target.value })
                                    }
                                    placeholder="Confirm new password"
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </Card>

                    {/* Save Button */}
                    <div className="flex gap-4">
                        <Button
                            type="submit"
                            className="px-8 h-12"
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
                            Save Changes
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onNavigate('profile')}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProfilePage