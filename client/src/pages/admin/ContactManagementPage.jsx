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
import { useGet } from '../../hooks/useGet'
import TabContentRefundRequest from '../../components/TabContentRefundRequest';
import TabContentInquiries from '../../components/TabContentInquiries';
import RefundCard from '../../components/RefundCard';

const ContactManagementPage = ({ onNavigate }) => {
    const [activeTab, setActiveTab] = useState('inquiries');

    // Inquiry states
    // const [inquiries, setInquiries] = useState(mockInquiries);
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [replyMessage, setReplyMessage] = useState('');

    // Refund states
    // const [refundRequests, setRefundRequests] = useState(mockRefundRequests);
    const [selectedRefund, setSelectedRefund] = useState(null);
    const [showBookingDetailsModal, setShowBookingDetailsModal] = useState(false);
    const [showConfirmRefundModal, setShowConfirmRefundModal] = useState(false);
    const [refundSearchQuery, setRefundSearchQuery] = useState('');
    const [refundStatusFilter, setRefundStatusFilter] = useState('all');

    const {
        data: inquiriesContact,
        loading: inquiriesLoading,
        refetch: refetchInquiries
    } = useGet('/contact/inquiries')

    const {
        data: refundContact,
        loading: refundLoading,
        refetch: refetchRefund
    } = useGet('/contact/refund')

    if (inquiriesLoading || refundLoading) {
        return (
            <div>Loading...</div>
        )
    }

    const filteredInquiries = inquiriesContact.filter(inquiry => {
        const matchesSearch =
            inquiry.userId.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            inquiry.userId.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
            inquiry.contactTitle.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = statusFilter === 'all' || inquiry.contactStatus === statusFilter;
        return matchesSearch && matchesStatus;
    }).sort((a, b) => new Date(b.createDate).getTime() - new Date(a.createDate).getTime());


    // Refund functions
    const filteredRefundRequests = refundContact.filter(request => {
        const matchesSearch =
            request.userId.userName.toLowerCase().includes(refundSearchQuery.toLowerCase());

        const matchesStatus = refundStatusFilter === 'all' || request.contactStatus === refundStatusFilter;
        return matchesSearch && matchesStatus;
    }).sort((a, b) => {
        // Sort by status first (pending first), then by date
        if (a.contactStatus === 'Pending-Refund' && b.contactStatus !== 'Pending-Refund') return -1;
        if (a.contactStatus !== 'Pending-Refund' && b.contactStatus === 'Pending-Refund') return 1;
        return new Date(b.createDate).getTime() - new Date(a.createDate).getTime();
    });

    const newInquiryCount = inquiriesContact.filter(i => i.contactStatus === 'New').length;
    const seenInquiryCount = inquiriesContact.filter(i => i.contactStatus === 'Seen').length;
    const pendingRefundCount = refundContact.filter(r => r.contactStatus === 'Pending-Refund').length;

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
                <TabContentInquiries
                    searchQuery={searchQuery}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                    filteredInquiries={filteredInquiries}
                    selectedInquiry={selectedInquiry}
                    setSearchQuery={setSearchQuery}
                    setSelectedInquiry={setSelectedInquiry}
                    replyMessage={replyMessage}
                    setReplyMessage={setReplyMessage}
                    refetchInquiries={refetchInquiries}
                />

                {/* Tab 2: Refund Requests */}
                <TabContentRefundRequest
                    refundSearchQuery={refundSearchQuery}
                    setRefundSearchQuery={setRefundSearchQuery}
                    refundStatusFilter={refundStatusFilter}
                    setRefundStatusFilter={setRefundStatusFilter}
                    filteredRefundRequests={filteredRefundRequests}
                    onNavigate={onNavigate}
                    setSelectedRefund={setSelectedRefund}
                    setShowBookingDetailsModal={setShowBookingDetailsModal}
                    setShowConfirmRefundModal={setShowConfirmRefundModal}
                />
            </Tabs>

            {/* Confirm Refund Modal */}
            <RefundCard
            showConfirmRefundModal={showConfirmRefundModal}
            setShowConfirmRefundModal={setShowConfirmRefundModal}
            selectedRefund={selectedRefund}
            />
        </div>
    );
}

export default ContactManagementPage