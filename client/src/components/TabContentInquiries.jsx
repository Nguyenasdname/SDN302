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
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../components/ui/select';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '../components/ui/tabs';

import { ScrollArea } from '../components/ui/scroll-area';
import { usePatch } from '../hooks/usePatch'
import { toast } from 'sonner';


const TabContentInquiries = ({
    searchQuery,
    statusFilter,
    setStatusFilter,
    filteredInquiries,
    selectedInquiry,
    setSearchQuery,
    setSelectedInquiry,
    replyMessage,
    setReplyMessage,
    refetchInquiries
}) => {
    const { patchData, error: patchError } = usePatch()

    const handleSendReply = async () => {
        if (replyMessage === '') {
            toast.error('Missing Field')
            return
        }
        try {
            const res = patchData(`/contact/${selectedInquiry._id}/replied`,{
                replyMessage
            })
            if (res) {
                setReplyMessage('')
                toast.success('Successful')
                refetchInquiries()
            }
        } catch (err) {
            console.log(patchError)
        }
    }
    const handleSelectSeen = async (inquiry) => {
        setSelectedInquiry(inquiry)
        if (inquiry.contactStatus === 'Seen' || inquiry === 'Replied') {
            return
        }
        try {
            const res = await patchData(`/contact/${inquiry._id}/seen`)
            if (res) {
                refetchInquiries()
            }
        } catch (err) {
            alert(patchError)
        }
    }
    return (
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
                                    <SelectItem value="New">New</SelectItem>
                                    <SelectItem value="Seen">Seen</SelectItem>
                                    <SelectItem value="Replied">Replied</SelectItem>
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
                                        onClick={() => handleSelectSeen(inquiry)}
                                        key={inquiry._id}
                                        className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${selectedInquiry?._id === inquiry._id ? 'bg-blue-50 border-l-4 border-l-[#14b8a6]' : ''
                                            }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            {/* Status Indicator */}
                                            <div className="mt-1">
                                                {inquiry.contactStatus === 'New' && (
                                                    <Circle className="w-3 h-3 fill-blue-500 text-blue-500" />
                                                )}
                                                {inquiry.contactStatus === 'Seen' && (
                                                    <Circle className="w-3 h-3 text-gray-400" />
                                                )}
                                                {inquiry.contactStatus === 'Replied' && (
                                                    <CheckCircle2 className="w-3 h-3 text-green-500" />
                                                )}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-2 mb-1">
                                                    <p className="text-sm truncate">
                                                        {inquiry.userId.userName}
                                                    </p>
                                                    <span className="text-xs text-gray-500 whitespace-nowrap">
                                                        {new Date(inquiry.createDate).toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-gray-600 mb-1 truncate">
                                                    {inquiry.userId.userEmail}
                                                </p>
                                                <p className="text-sm mb-1 truncate">
                                                    {inquiry.contactTitle}
                                                </p>
                                                <p className="text-xs text-gray-500 line-clamp-1">
                                                    {inquiry.contactContent}
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
                                                {selectedInquiry.contactTitle}
                                            </h2>
                                            <div className="flex items-center gap-2">
                                                <p className="text-sm text-gray-600">
                                                    {selectedInquiry.userId.userName}
                                                </p>
                                                <span className="text-gray-400">•</span>
                                                <p className="text-sm text-gray-500">
                                                    {selectedInquiry.userId.userName}
                                                </p>
                                            </div>
                                        </div>
                                        <Badge
                                            className={
                                                selectedInquiry.contactStatus === 'New'
                                                    ? 'bg-blue-100 text-blue-700 border-blue-200'
                                                    : selectedInquiry.contactStatus === 'Replied'
                                                        ? 'bg-green-100 text-green-700 border-green-200'
                                                        : 'bg-gray-100 text-gray-700 border-gray-200'
                                            }
                                        >
                                            {selectedInquiry.contactStatus.charAt(0).toUpperCase() + selectedInquiry.contactStatus.slice(1)}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        {new Date(selectedInquiry.createDate).toLocaleString('en-US', {
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
                                            {selectedInquiry.contactContent}
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
    )
}
export default TabContentInquiries