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
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Label } from '../components/ui/label';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../components/ui/table';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '../components/ui/tabs';

const TabContentRefundRequest = ({
    refundSearchQuery,
    setRefundSearchQuery,
    refundStatusFilter,
    setRefundStatusFilter,
    filteredRefundRequests,
    onNavigate,
    setSelectedRefund,
    setShowBookingDetailsModal,
    setShowConfirmRefundModal
}) => {
    return (
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
                                    <SelectItem value="Pending-Refund">Pending Refund</SelectItem>
                                    <SelectItem value="Refunded">Refunded</SelectItem>
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
                                <TableHead>RefundId</TableHead>
                                <TableHead>Customer Name</TableHead>
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
                                    <TableRow key={request._id}>
                                        <TableCell>
                                            <button
                                                onClick={() => onNavigate('admin-bookings')}
                                                className="text-[#14b8a6] hover:underline"
                                            >
                                                {request._id}
                                            </button>
                                        </TableCell>
                                        <TableCell>{request.userId.userName}</TableCell>
                                        <TableCell>
                                            {new Date(request.createDate).toLocaleDateString('en-GB')}
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-[#14b8a6]">
                                                ${request.refundAmount}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                className={
                                                    request.contactStatus === 'Pending-Refund'
                                                        ? 'bg-red-100 text-red-700 border-red-200'
                                                        : 'bg-green-100 text-green-700 border-green-200'
                                                }
                                            >
                                                {request.contactStatus === 'Pending-Refund' ? 'Pending Refund' : 'Refunded'}
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
                                                        setShowConfirmRefundModal(true);
                                                    }}
                                                >
                                                    <Eye className="w-4 h-4 mr-1" />
                                                    View Details
                                                </Button>
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
    )
}

export default TabContentRefundRequest