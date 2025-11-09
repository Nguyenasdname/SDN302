import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-50 border-t border-gray-200 mt-20">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="mb-4" style={{ fontFamily: 'var(--font-serif)' }}>MyBooking</h3>
                        <p className="text-gray-600 mb-4">
                            Premium resort and room rentals in the most beautiful destinations of Vietnam.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-600 hover:text-[#14b8a6] transition-colors">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-[#14b8a6] transition-colors">
                                    Resorts & Rooms
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-[#14b8a6] transition-colors">
                                    Destinations
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-[#14b8a6] transition-colors">
                                    About Us
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="mb-4">Contact Us</h4>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2 text-gray-600">
                                <Phone className="w-4 h-4 text-[#14b8a6]" />
                                <span>+84 123 456 789</span>
                            </li>
                            <li className="flex items-center gap-2 text-gray-600">
                                <Mail className="w-4 h-4 text-[#14b8a6]" />
                                <span>info@mybooking.com</span>
                            </li>
                            <li className="flex items-center gap-2 text-gray-600">
                                <MapPin className="w-4 h-4 text-[#14b8a6]" />
                                <span>Hoi An & Da Nang, Vietnam</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h4 className="mb-4">Follow Us</h4>
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-[#14b8a6] flex items-center justify-center text-white hover:bg-[#0d9488] transition-colors"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-[#14b8a6] flex items-center justify-center text-white hover:bg-[#0d9488] transition-colors"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-[#14b8a6] flex items-center justify-center text-white hover:bg-[#0d9488] transition-colors"
                            >
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
                    <p>&copy; 2025 MyBooking. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer