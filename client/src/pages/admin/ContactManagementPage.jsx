import { useState } from 'react';
import {
    Mail,
    Send,
    Search,
    MessageCircle,
    Clock,
    CheckCircle2,
    Circle,
    Eye,
    DollarSign,
    AlertCircle,
    XCircle
} from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '../../components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../../components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../../components/ui/table';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '../../components/ui/tabs';
import { toast } from 'sonner';
import { ScrollArea } from '../../components/ui/scroll-area';


// Mock inquiry data
const mockInquiries = [
    {
        id: 1,
        senderName: 'John Smith',
        senderEmail: 'john.smith@email.com',
        subject: 'Question about Resort Booking',
        message: 'Hi, I would like to know if your beachfront resort is available for the dates Dec 20-25? Also, do you offer any discounts for extended stays? Looking forward to your response.',
        date: '2025-11-06T10:30:00',
        status: 'new',
    },
    {
        id: 2,
        senderName: 'Emily Johnson',
        senderEmail: 'emily.j@email.com',
        subject: 'Spa Services Availability',
        message: 'Dear MyBooking team, I have an upcoming booking and would like to pre-book spa services. Could you please share the spa menu and availability for November 15-18?',
        date: '2025-11-05T15:45:00',
        status: 'new',
    },
    {
        id: 3,
        senderName: 'Michael Chen',
        senderEmail: 'michael.chen@email.com',
        subject: 'Amenities Inquiry',
        message: 'Hello, I am interested in booking the Luxury Pool Resort. Does it include kitchen facilities? Also, is there parking available? Thank you.',
        date: '2025-11-04T09:20:00',
        status: 'seen',
    },
    {
        id: 4,
        senderName: 'Sarah Williams',
        senderEmail: 'sarah.w@email.com',
        subject: 'Group Booking Discount',
        message: 'Hi there! I am planning a family reunion and would like to book 3 resorts from Jan 10-17. Do you offer group discounts? What would be the best rate you can offer?',
        date: '2025-11-03T14:10:00',
        status: 'replied',
    },
    {
        id: 5,
        senderName: 'David Brown',
        senderEmail: 'david.brown@email.com',
        subject: 'Payment Issue',
        message: 'I tried to complete my booking payment but the transaction failed. My card was charged but I did not receive a confirmation. Please help urgently!',
        date: '2025-11-03T11:30:00',
        status: 'replied',
    },
    {
        id: 6,
        senderName: 'Lisa Anderson',
        senderEmail: 'lisa.anderson@email.com',
        subject: 'Pet-Friendly Policy',
        message: 'Good morning! I would like to know if you allow pets at your properties. I have a small dog and would love to bring him along for our vacation.',
        date: '2025-11-02T08:45:00',
        status: 'seen',
    },
    {
        id: 7,
        senderName: 'Robert Taylor',
        senderEmail: 'robert.t@email.com',
        subject: 'Airport Transfer Service',
        message: 'Hello, do you provide airport transfer service? If yes, what are the rates and how do I arrange it for my upcoming stay?',
        date: '2025-11-01T16:20:00',
        status: 'replied',
    },
];

// Mock refund request data
const mockRefundRequests = [
    {
        id: 'RF001',
        bookingId: 'BK005',
        resortName: 'Sunset Beach Resort',
        customerName: 'Hoang Van E',
        customerEmail: 'hoang.e@email.com',
        cancellationDate: '2025-10-20',
        refundAmount: 180,
        originalBookingAmount: 600,
        checkInDate: '2025-10-25',
        checkOutDate: '2025-10-27',
        cancellationReason: 'Change of travel plans',
        status: 'pending_refund',
    },
    {
        id: 'RF002',
        bookingId: 'BK012',
        resortName: 'Dragon Bridge View',
        customerName: 'Nguyen Thi L',
        customerEmail: 'nguyen.l@email.com',
        cancellationDate: '2025-10-28',
        refundAmount: 450,
        originalBookingAmount: 1500,
        checkInDate: '2025-11-15',
        checkOutDate: '2025-11-20',
        cancellationReason: 'Medical emergency - unable to travel',
        status: 'pending_refund',
    },
    {
        id: 'RF003',
        bookingId: 'BK018',
        resortName: 'Oceanview Villa Paradise',
        customerName: 'Tran Van M',
        customerEmail: 'tran.m@email.com',
        cancellationDate: '2025-10-30',
        refundAmount: 700,
        originalBookingAmount: 2100,
        checkInDate: '2025-11-18',
        checkOutDate: '2025-11-25',
        cancellationReason: 'Flight cancellation by airline',
        status: 'pending_refund',
    },
    {
        id: 'RF004',
        bookingId: 'BK003',
        resortName: 'Ancient Town Retreat',
        customerName: 'Le Thi N',
        customerEmail: 'le.n@email.com',
        cancellationDate: '2025-10-15',
        refundAmount: 300,
        originalBookingAmount: 900,
        checkInDate: '2025-10-22',
        checkOutDate: '2025-10-25',
        cancellationReason: 'Change in vacation dates',
        status: 'refunded',
    },
    {
        id: 'RF005',
        bookingId: 'BK007',
        resortName: 'Marble Mountain Lodge',
        customerName: 'Pham Van O',
        customerEmail: 'pham.o@email.com',
        cancellationDate: '2025-10-10',
        refundAmount: 525,
        originalBookingAmount: 1750,
        checkInDate: '2025-10-18',
        checkOutDate: '2025-10-23',
        cancellationReason: 'Work commitment conflict',
        status: 'refunded',
    },
];


const ContactManagementPage = ({ onNavigate }) => {
    const [activeTab, setActiveTab] = useState('inquiries');

    // Inquiry states
    const [inquiries, setInquiries] = useState(mockInquiries);
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [replyMessage, setReplyMessage] = useState('');

    // Refund states
    const [refundRequests, setRefundRequests] = useState(mockRefundRequests);
    const [selectedRefund, setSelectedRefund] = useState(null);
    const [showBookingDetailsModal, setShowBookingDetailsModal] = useState(false);
    const [showConfirmRefundModal, setShowConfirmRefundModal] = useState(false);
    const [refundSearchQuery, setRefundSearchQuery] = useState('');
    const [refundStatusFilter, setRefundStatusFilter] = useState('all');

    // Inquiry functions
    const filteredInquiries = inquiries.filter(inquiry => {
        const matchesSearch =
            inquiry.senderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            inquiry.senderEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
            inquiry.subject.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = statusFilter === 'all' || inquiry.status === statusFilter;
        return matchesSearch && matchesStatus;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const handleSelectInquiry = (inquiry) => {
        setSelectedInquiry(inquiry);

        // Mark as seen if it was new
        if (inquiry.status === 'new') {
            setInquiries(inquiries.map(i =>
                i.id === inquiry.id ? { ...i, status: 'seen' } : i
            ));
        }
    };

    const handleSendReply = () => {
        if (!selectedInquiry || !replyMessage.trim()) {
            toast.error('Please enter a reply message');
            return;
        }

        // Update inquiry status to replied
        setInquiries(inquiries.map(i =>
            i.id === selectedInquiry.id ? { ...i, status: 'replied' } : i
        ));

        // Update selected inquiry
        setSelectedInquiry({ ...selectedInquiry, status: 'replied' });

        toast.success('Reply sent successfully!');
        setReplyMessage('');
    };

    // Refund functions
    const filteredRefundRequests = refundRequests.filter(request => {
        const matchesSearch =
            request.bookingId.toLowerCase().includes(refundSearchQuery.toLowerCase()) ||
            request.customerName.toLowerCase().includes(refundSearchQuery.toLowerCase());

        const matchesStatus = refundStatusFilter === 'all' || request.status === refundStatusFilter;
        return matchesSearch && matchesStatus;
    }).sort((a, b) => {
        // Sort by status first (pending first), then by date
        if (a.status === 'pending_refund' && b.status !== 'pending_refund') return -1;
        if (a.status !== 'pending_refund' && b.status === 'pending_refund') return 1;
        return new Date(b.cancellationDate).getTime() - new Date(a.cancellationDate).getTime();
    });

    const handleMarkAsRefunded = () => {
        if (!selectedRefund) return;

        setRefundRequests(refundRequests.map(r =>
            r.id === selectedRefund.id ? { ...r, status: 'refunded' } : r
        ));

        toast.success(`Refund for booking ${selectedRefund.bookingId} has been marked as completed`);
        setShowConfirmRefundModal(false);
        setSelectedRefund(null);
    };

    const newInquiryCount = inquiries.filter(i => i.status === 'new').length;
    const seenInquiryCount = inquiries.filter(i => i.status === 'seen').length;
    const pendingRefundCount = refundRequests.filter(r => r.status === 'pending_refund').length;

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl" style={{ fontFamily: 'var(--font-serif)' }}>
                    Inbox: Inquiries & Refunds
                </h1>
                <p className="text-gray-500 mt-1">
                    Manage customer inquiries and process refund requests
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg border border-gray-200 p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">New Inquiries</p>
                            <p className="text-3xl" style={{ fontFamily: 'var(--font-serif)' }}>
                                {newInquiryCount}
                            </p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <MessageCircle className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Pending Response</p>
                            <p className="text-3xl" style={{ fontFamily: 'var(--font-serif)' }}>
                                {seenInquiryCount}
                            </p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                            <Clock className="w-6 h-6 text-orange-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Pending Refunds</p>
                            <p className="text-3xl" style={{ fontFamily: 'var(--font-serif)' }}>
                                {pendingRefundCount}
                            </p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                            <AlertCircle className="w-6 h-6 text-red-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabbed Interface */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="bg-white border border-gray-200 p-1">
                    <TabsTrigger value="inquiries" className="data-[state=active]:bg-[#14b8a6] data-[state=active]:text-white">
                        User Inquiries
                    </TabsTrigger>
                    <TabsTrigger value="refunds" className="data-[state=active]:bg-[#14b8a6] data-[state=active]:text-white relative">
                        Refund Requests
                        {pendingRefundCount > 0 && (
                            <Badge className="ml-2 bg-red-500 text-white border-0 h-5 px-2">
                                {pendingRefundCount}
                            </Badge>
                        )}
                    </TabsTrigger>
                </TabsList>

                {/* Tab 1: User Inquiries */}
                <TabsContent value="inquiries" className="mt-0">
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-5 divide-x divide-gray-200 min-h-[600px]">
                            {/* Left Panel - Inquiry List */}
                            <div className="lg:col-span-2">
                                {/* Search and Filters */}
                                <div className="p-4 border-b bg-gray-50">
                                    <div className="relative mb-3">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <Input
                                            placeholder="Search inquiries..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="pl-9 h-9 text-sm"
                                        />
                                    </div>

                                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                                        <SelectTrigger className="h-9 text-sm">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Status</SelectItem>
                                            <SelectItem value="new">New</SelectItem>
                                            <SelectItem value="seen">Seen</SelectItem>
                                            <SelectItem value="replied">Replied</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Inquiry List */}
                                <ScrollArea className="h-[540px]">
                                    {filteredInquiries.length === 0 ? (
                                        <div className="flex items-center justify-center h-full text-gray-400">
                                            <div className="text-center p-8">
                                                <Mail className="w-12 h-12 mx-auto mb-3 opacity-30" />
                                                <p>No inquiries found</p>
                                            </div>
                                        </div>
                                    ) : (
                                        filteredInquiries.map((inquiry) => (
                                            <div
                                                key={inquiry.id}
                                                onClick={() => handleSelectInquiry(inquiry)}
                                                className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${selectedInquiry?.id === inquiry.id ? 'bg-blue-50 border-l-4 border-l-[#14b8a6]' : ''
                                                    }`}
                                            >
                                                <div className="flex items-start gap-3">
                                                    {/* Status Indicator */}
                                                    <div className="mt-1">
                                                        {inquiry.status === 'new' && (
                                                            <Circle className="w-3 h-3 fill-blue-500 text-blue-500" />
                                                        )}
                                                        {inquiry.status === 'seen' && (
                                                            <Circle className="w-3 h-3 text-gray-400" />
                                                        )}
                                                        {inquiry.status === 'replied' && (
                                                            <CheckCircle2 className="w-3 h-3 text-green-500" />
                                                        )}
                                                    </div>

                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-start justify-between gap-2 mb-1">
                                                            <p className="text-sm truncate">
                                                                {inquiry.senderName}
                                                            </p>
                                                            <span className="text-xs text-gray-500 whitespace-nowrap">
                                                                {new Date(inquiry.date).toLocaleDateString('en-US', {
                                                                    month: 'short',
                                                                    day: 'numeric'
                                                                })}
                                                            </span>
                                                        </div>
                                                        <p className="text-xs text-gray-600 mb-1 truncate">
                                                            {inquiry.senderEmail}
                                                        </p>
                                                        <p className="text-sm mb-1 truncate">
                                                            {inquiry.subject}
                                                        </p>
                                                        <p className="text-xs text-gray-500 line-clamp-1">
                                                            {inquiry.message}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </ScrollArea>
                            </div>

                            {/* Right Panel - Inquiry Details & Reply */}
                            <div className="lg:col-span-3">
                                {selectedInquiry ? (
                                    <div className="flex flex-col h-full">
                                        {/* Header */}
                                        <div className="p-6 border-b bg-gray-50">
                                            <div className="flex items-start justify-between mb-4">
                                                <div>
                                                    <h2 className="text-xl mb-1" style={{ fontFamily: 'var(--font-serif)' }}>
                                                        {selectedInquiry.subject}
                                                    </h2>
                                                    <div className="flex items-center gap-2">
                                                        <p className="text-sm text-gray-600">
                                                            {selectedInquiry.senderName}
                                                        </p>
                                                        <span className="text-gray-400">•</span>
                                                        <p className="text-sm text-gray-500">
                                                            {selectedInquiry.senderEmail}
                                                        </p>
                                                    </div>
                                                </div>
                                                <Badge
                                                    className={
                                                        selectedInquiry.status === 'new'
                                                            ? 'bg-blue-100 text-blue-700 border-blue-200'
                                                            : selectedInquiry.status === 'replied'
                                                                ? 'bg-green-100 text-green-700 border-green-200'
                                                                : 'bg-gray-100 text-gray-700 border-gray-200'
                                                    }
                                                >
                                                    {selectedInquiry.status.charAt(0).toUpperCase() + selectedInquiry.status.slice(1)}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                {new Date(selectedInquiry.date).toLocaleString('en-US', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </p>
                                        </div>

                                        {/* Message Body */}
                                        <div className="p-6 border-b">
                                            <div className="bg-gray-50 rounded-lg p-4">
                                                <p className="text-gray-700 whitespace-pre-wrap">
                                                    {selectedInquiry.message}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Reply Section */}
                                        <div className="flex-1 p-6 bg-gray-50">
                                            <Label className="text-base mb-3 block">Reply</Label>
                                            <Textarea
                                                value={replyMessage}
                                                onChange={(e) => setReplyMessage(e.target.value)}
                                                placeholder="Type your reply here..."
                                                rows={6}
                                                className="resize-none mb-4"
                                            />
                                            <Button
                                                onClick={handleSendReply}
                                                className="w-full bg-[#fbbf24] hover:bg-[#f59e0b] text-gray-900"
                                                disabled={!replyMessage.trim()}
                                            >
                                                <Send className="w-4 h-4 mr-2" />
                                                Send Reply
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400">
                                        <div className="text-center">
                                            <Mail className="w-16 h-16 mx-auto mb-3 opacity-30" />
                                            <p>Select an inquiry to view details</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </TabsContent>

                {/* Tab 2: Refund Requests */}
                <TabsContent value="refunds" className="mt-0">
                    <div className="bg-white rounded-lg border border-gray-200">
                        {/* Search and Filters */}
                        <div className="p-6 border-b bg-gray-50">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="refund-search">Search</Label>
                                    <div className="relative mt-1">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <Input
                                            id="refund-search"
                                            placeholder="Search by Booking ID or Customer Name"
                                            value={refundSearchQuery}
                                            onChange={(e) => setRefundSearchQuery(e.target.value)}
                                            className="pl-9"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="refund-status">Status</Label>
                                    <Select value={refundStatusFilter} onValueChange={setRefundStatusFilter}>
                                        <SelectTrigger id="refund-status" className="mt-1">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Status</SelectItem>
                                            <SelectItem value="pending_refund">Pending Refund</SelectItem>
                                            <SelectItem value="refunded">Refunded</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        {/* Refund Requests Table */}
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Booking ID</TableHead>
                                        <TableHead>Customer Name</TableHead>
                                        <TableHead>Resort</TableHead>
                                        <TableHead>Cancellation Date</TableHead>
                                        <TableHead>Refund Amount</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredRefundRequests.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                                                No refund requests found
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredRefundRequests.map((request) => (
                                            <TableRow key={request.id}>
                                                <TableCell>
                                                    <button
                                                        onClick={() => onNavigate('admin-bookings')}
                                                        className="text-[#14b8a6] hover:underline"
                                                    >
                                                        {request.bookingId}
                                                    </button>
                                                </TableCell>
                                                <TableCell>{request.customerName}</TableCell>
                                                <TableCell>{request.resortName}</TableCell>
                                                <TableCell>
                                                    {new Date(request.cancellationDate).toLocaleDateString('en-GB')}
                                                </TableCell>
                                                <TableCell>
                                                    <span className="text-[#14b8a6]">
                                                        ${request.refundAmount.toLocaleString()}
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        className={
                                                            request.status === 'pending_refund'
                                                                ? 'bg-red-100 text-red-700 border-red-200'
                                                                : 'bg-green-100 text-green-700 border-green-200'
                                                        }
                                                    >
                                                        {request.status === 'pending_refund' ? 'Pending Refund' : 'Refunded'}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => {
                                                                setSelectedRefund(request);
                                                                setShowBookingDetailsModal(true);
                                                            }}
                                                        >
                                                            <Eye className="w-4 h-4 mr-1" />
                                                            View Details
                                                        </Button>
                                                        {request.status === 'pending_refund' && (
                                                            <Button
                                                                size="sm"
                                                                onClick={() => {
                                                                    setSelectedRefund(request);
                                                                    setShowConfirmRefundModal(true);
                                                                }}
                                                                className="bg-[#fbbf24] hover:bg-[#f59e0b] text-gray-900"
                                                            >
                                                                <CheckCircle2 className="w-4 h-4 mr-1" />
                                                                Mark as Refunded
                                                            </Button>
                                                        )}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>

            {/* Booking Details Modal */}
            <Dialog open={showBookingDetailsModal} onOpenChange={setShowBookingDetailsModal}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle style={{ fontFamily: 'var(--font-serif)' }}>
                            Booking Details - {selectedRefund?.bookingId}
                        </DialogTitle>
                        <DialogDescription>
                            Complete information about this refund request
                        </DialogDescription>
                    </DialogHeader>

                    {selectedRefund && (
                        <div className="space-y-6">
                            {/* Status */}
                            <div>
                                <Label>Refund Status</Label>
                                <div className="mt-2">
                                    <Badge
                                        className={
                                            selectedRefund.status === 'pending_refund'
                                                ? 'bg-red-100 text-red-700 border-red-200'
                                                : 'bg-green-100 text-green-700 border-green-200'
                                        }
                                    >
                                        {selectedRefund.status === 'pending_refund' ? 'Pending Refund' : 'Refunded'}
                                    </Badge>
                                </div>
                            </div>

                            {/* Customer Information */}
                            <div>
                                <h3 className="text-lg mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
                                    Customer Information
                                </h3>
                                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                                    <div>
                                        <Label className="text-gray-600">Name</Label>
                                        <p className="mt-1">{selectedRefund.customerName}</p>
                                    </div>
                                    <div>
                                        <Label className="text-gray-600">Email</Label>
                                        <p className="mt-1">{selectedRefund.customerEmail}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Booking Information */}
                            <div>
                                <h3 className="text-lg mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
                                    Booking Information
                                </h3>
                                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                                    <div>
                                        <Label className="text-gray-600">Resort</Label>
                                        <p className="mt-1">{selectedRefund.resortName}</p>
                                    </div>
                                    <div>
                                        <Label className="text-gray-600">Booking ID</Label>
                                        <p className="mt-1 text-[#14b8a6]">{selectedRefund.bookingId}</p>
                                    </div>
                                    <div>
                                        <Label className="text-gray-600">Check-in Date</Label>
                                        <p className="mt-1">{new Date(selectedRefund.checkInDate).toLocaleDateString('en-GB')}</p>
                                    </div>
                                    <div>
                                        <Label className="text-gray-600">Check-out Date</Label>
                                        <p className="mt-1">{new Date(selectedRefund.checkOutDate).toLocaleDateString('en-GB')}</p>
                                    </div>
                                    <div>
                                        <Label className="text-gray-600">Original Amount</Label>
                                        <p className="mt-1">${selectedRefund.originalBookingAmount.toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <Label className="text-gray-600">Refund Amount</Label>
                                        <p className="mt-1 text-2xl text-[#14b8a6]">
                                            ${selectedRefund.refundAmount.toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Cancellation Information */}
                            <div>
                                <h3 className="text-lg mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
                                    Cancellation Information
                                </h3>
                                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                                    <div>
                                        <Label className="text-gray-600">Cancellation Date</Label>
                                        <p className="mt-1">{new Date(selectedRefund.cancellationDate).toLocaleDateString('en-GB')}</p>
                                    </div>
                                    <div>
                                        <Label className="text-gray-600">Reason</Label>
                                        <p className="mt-1">{selectedRefund.cancellationReason}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowBookingDetailsModal(false)}>
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Confirm Refund Modal */}
            <Dialog open={showConfirmRefundModal} onOpenChange={setShowConfirmRefundModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle style={{ fontFamily: 'var(--font-serif)' }}>
                            Confirm Refund Completion
                        </DialogTitle>
                        <DialogDescription>
                            Please confirm that you have completed the refund process
                        </DialogDescription>
                    </DialogHeader>

                    {selectedRefund && (
                        <div className="space-y-4">
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <div className="flex gap-3">
                                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm">
                                            Have you completed the refund process for <strong>Booking ID: {selectedRefund.bookingId}</strong>?
                                        </p>
                                        <p className="text-sm text-gray-600 mt-2">
                                            Refund Amount: <strong className="text-[#14b8a6]">${selectedRefund.refundAmount.toLocaleString()}</strong>
                                        </p>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Customer: <strong>{selectedRefund.customerName}</strong>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <div className="flex gap-3">
                                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-red-700">
                                        This action cannot be undone. Only mark as refunded after you have successfully processed the payment through your payment system.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowConfirmRefundModal(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleMarkAsRefunded}
                            className="bg-green-600 hover:bg-green-700 text-white"
                        >
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Confirm Refund Completed
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default ContactManagementPage