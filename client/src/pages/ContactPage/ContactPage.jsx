import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../../components/ui/select';
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Send,
    CheckCircle2,
    MessageSquare
} from 'lucide-react';
import { toast } from 'sonner';
import { usePost } from '../../hooks/usePost';



const ContactPage = ({ currentUser }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        subject: '',
        bookingId: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showBookingId, setShowBookingId] = useState(false);
    const { postData, error: postError } = usePost()
    // Pre-fill form if user is logged in
    useEffect(() => {
        if (currentUser) {
            setFormData(prev => ({
                ...prev,
                fullName: currentUser.userName || '',
                email: currentUser.userEmail || '',
            }));
        }
    }, [currentUser]);

    const handleSubjectChange = (value) => {
        setFormData(prev => ({ ...prev, subject: value }));

        // Show booking ID field for booking-related subjects
        const bookingRelated = ['booking_question', 'complaint'].includes(value);
        setShowBookingId(bookingRelated);

        // Clear booking ID if not needed
        if (!bookingRelated) {
            setFormData(prev => ({ ...prev, bookingId: '' }));
        }
    };

    const handleSubmit = async () => {
        toast.success('Oke')
        if (!formData.fullName || !formData.email || !formData.subject || !formData.message) {
            toast.error('Please fill in all required fields');
            return;
        }

        try {
            const contactData = {
                contactTitle: formData.subject,
                contactContent: formData.message
            }
            const res = await postData('/contact', {
                contactData
            })
            if (res) {
                setTimeout(() => {
                    setIsSubmitting(false);
                    setIsSubmitted(true);
                    toast.success('Message sent successfully!');
                }, 1000);
            }
        } catch (err) {
            toast.error(postError)
        }

    };

    const getSubjectLabel = (value) => {
        const subjects = {
            'general': 'General Inquiry',
            'booking_question': 'Question About a Booking',
            'feedback': 'Feedback and Suggestions',
            'complaint': 'Complaint',
        };
        return subjects[value] || value;
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-6 max-w-6xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
                        We'd Love to Hear From You
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Have questions or need assistance? Our team is here to help. Reach out to us anytime.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Contact Information */}
                    <div className="lg:col-span-1">
                        <Card className="p-6 sticky top-24">
                            <h2 className="text-2xl mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
                                Contact Information
                            </h2>

                            <div className="space-y-6">
                                {/* Address */}
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-[#14b8a6]/10 flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-6 h-6 text-[#14b8a6]" />
                                    </div>
                                    <div>
                                        <h3 className="mb-1">Our Location</h3>
                                        <p className="text-sm text-gray-600">
                                            123 Beach Road<br />
                                            Hoi An, Quang Nam<br />
                                            Vietnam
                                        </p>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-[#14b8a6]/10 flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-6 h-6 text-[#14b8a6]" />
                                    </div>
                                    <div>
                                        <h3 className="mb-1">Phone Number</h3>
                                        <a
                                            href="tel:+84123456789"
                                            className="text-sm text-[#14b8a6] hover:underline"
                                        >
                                            +84 123 456 789
                                        </a>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-[#14b8a6]/10 flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-6 h-6 text-[#14b8a6]" />
                                    </div>
                                    <div>
                                        <h3 className="mb-1">Email Address</h3>
                                        <a
                                            href="mailto:support@mybooking.com"
                                            className="text-sm text-[#14b8a6] hover:underline"
                                        >
                                            support@mybooking.com
                                        </a>
                                    </div>
                                </div>

                                {/* Operating Hours */}
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-[#14b8a6]/10 flex items-center justify-center flex-shrink-0">
                                        <Clock className="w-6 h-6 text-[#14b8a6]" />
                                    </div>
                                    <div>
                                        <h3 className="mb-1">Support Hours</h3>
                                        <p className="text-sm text-gray-600">
                                            Monday - Friday<br />
                                            9:00 AM - 5:00 PM (ICT)<br />
                                            <span className="text-xs text-gray-500 mt-1 block">
                                                We aim to respond within 24 hours
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Social or Additional Info */}
                            <div className="mt-8 pt-6 border-t">
                                <p className="text-sm text-gray-600 text-center">
                                    Available 24/7 for urgent matters involving active bookings
                                </p>
                            </div>
                        </Card>
                    </div>

                    {/* Right Column - Contact Form */}
                    <div className="lg:col-span-2">
                        <Card className="p-8">
                            {!isSubmitted ? (
                                <>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-12 h-12 rounded-lg bg-[#14b8a6]/10 flex items-center justify-center">
                                            <MessageSquare className="w-6 h-6 text-[#14b8a6]" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl" style={{ fontFamily: 'var(--font-serif)' }}>
                                                Send Us a Message
                                            </h2>
                                            <p className="text-sm text-gray-600">
                                                Fill out the form below and we'll get back to you soon
                                            </p>
                                        </div>
                                    </div>


                                    {/* Full Name */}
                                    <div>
                                        <Label htmlFor="fullName">
                                            Full Name <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="fullName"
                                            type="text"
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                            placeholder="Enter your full name"
                                            disabled={!!currentUser}
                                            className={currentUser ? 'bg-gray-50' : ''}
                                            required
                                        />
                                        {currentUser && (
                                            <p className="text-xs text-gray-500 mt-1">
                                                This field is automatically filled from your account
                                            </p>
                                        )}
                                    </div>

                                    {/* Email Address */}
                                    <div>
                                        <Label htmlFor="email">
                                            Email Address <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={formData.userEmail}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="your.userEmail@example.com"
                                            disabled={!!currentUser}
                                            className={currentUser ? 'bg-gray-50' : ''}
                                            required
                                        />
                                        {currentUser && (
                                            <p className="text-xs text-gray-500 mt-1">
                                                Replies will be sent to your registered email
                                            </p>
                                        )}
                                    </div>

                                    {/* Subject / Topic */}
                                    <div>
                                        <Label htmlFor="subject">
                                            Subject / Topic <span className="text-red-500">*</span>
                                        </Label>
                                        <Select
                                            value={formData.subject}
                                            onValueChange={handleSubjectChange}
                                            required
                                        >
                                            <SelectTrigger id="subject">
                                                <SelectValue placeholder="Please select a topic" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="general">General Inquiry</SelectItem>
                                                <SelectItem value="booking_question">Question About a Booking</SelectItem>
                                                <SelectItem value="feedback">Feedback and Suggestions</SelectItem>
                                                <SelectItem value="complaint">Complaint</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Booking ID (Conditional) */}
                                    {showBookingId && (
                                        <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                                            <Label htmlFor="bookingId">
                                                Booking ID <span className="text-gray-500">(Optional)</span>
                                            </Label>
                                            <Input
                                                id="bookingId"
                                                type="text"
                                                value={formData.bookingId}
                                                onChange={(e) => setFormData({ ...formData, bookingId: e.target.value })}
                                                placeholder="e.g., MB12345678"
                                            />
                                            <p className="text-xs text-gray-500 mt-1">
                                                Providing your Booking ID helps us assist you faster
                                            </p>
                                        </div>
                                    )}

                                    {/* Message */}
                                    <div>
                                        <Label htmlFor="message">
                                            Your Message <span className="text-red-500">*</span>
                                        </Label>
                                        <Textarea
                                            id="message"
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            placeholder="Please provide as much detail as possible so we can assist you better..."
                                            rows={8}
                                            className="resize-none"
                                            required
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            {formData.message.length} characters
                                        </p>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="pt-4">
                                        <Button
                                            onClick={handleSubmit}
                                            className="w-full h-12 text-lg"
                                            style={{
                                                backgroundColor: '#fbbf24',
                                                color: '#000',
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!isSubmitting) {
                                                    e.currentTarget.style.backgroundColor = '#f59e0b';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = '#fbbf24';
                                            }}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin mr-2" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-5 h-5 mr-2" />
                                                    Send Message
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                // Success Message
                                <div className="py-12 text-center">
                                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                                        <CheckCircle2 className="w-12 h-12 text-green-600" />
                                    </div>
                                    <h2 className="text-3xl mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
                                        Thank You!
                                    </h2>
                                    <p className="text-lg text-gray-700 mb-2">
                                        Your message has been sent successfully.
                                    </p>
                                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                                        Our team will review your inquiry and get back to you within 24 hours at{' '}
                                        <span className="text-[#14b8a6]">{formData.userEmail}</span>
                                    </p>
                                    <Button
                                        onClick={() => {
                                            setIsSubmitted(false);
                                            setFormData({
                                                fullName: currentUser?.userName || '',
                                                email: currentUser?.userEmail || '',
                                                subject: '',
                                                bookingId: '',
                                                message: '',
                                            });
                                            setShowBookingId(false);
                                        }}
                                        variant="outline"
                                        className="border-[#14b8a6] text-[#14b8a6] hover:bg-[#14b8a6]/10"
                                    >
                                        Send Another Message
                                    </Button>
                                </div>
                            )}
                        </Card>

                        {/* Additional Help Section */}
                        {!isSubmitted && (
                            <div className="mt-6 p-6 bg-gradient-to-r from-[#14b8a6]/5 to-[#fbbf24]/5 rounded-lg border border-[#14b8a6]/20">
                                <h3 className="mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
                                    Need Immediate Assistance?
                                </h3>
                                <p className="text-sm text-gray-700 mb-3">
                                    For urgent matters related to an active booking (check-in issues, emergency situations, etc.),
                                    please call us directly at{' '}
                                    <a href="tel:+84123456789" className="text-[#14b8a6] hover:underline">
                                        +84 123 456 789
                                    </a>
                                    {' '}for immediate support.
                                </p>
                                <p className="text-xs text-gray-600">
                                    Our 24/7 emergency line ensures you're never without help during your stay.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactPage