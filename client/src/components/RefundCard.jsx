
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
import { Button } from '../components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '../components/ui/dialog';


const RefundCard = ({
    showConfirmRefundModal,
    setShowConfirmRefundModal,
    selectedRefund
}) => {
    return (
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

                {selectedRefund && selectedRefund.contactStatus === 'Pending-Refund' ? (
                    <div className="space-y-4">
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <div className="flex gap-3">
                                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm">
                                        Have you completed the refund process for <strong>Refund request ID: {selectedRefund._id}</strong>?
                                    </p>
                                    <p className="text-sm font-medium mb-2">Payment Confirmation Image: </p>
                                    <div className="w-full flex justify-center">
                                        <img
                                            src="https://via.placeholder.com/200x200.png?text=QR+Code"
                                            alt="QR Code"
                                            className="rounded-md shadow-md border border-gray-300 w-60 h-60"
                                        />
                                    </div>

                                    <p className="text-sm text-gray-600 mt-2">
                                        Refund Amount: <strong className="text-[#14b8a6]">${selectedRefund.refundAmount}</strong>
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Customer: <strong>{selectedRefund.userId.userName}</strong>
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Cancel Reason: <strong>{selectedRefund.contactContent}</strong>
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
                ) : selectedRefund && (
                    <div className="space-y-4">
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <div className="flex gap-3">
                                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Cancel Reason: <strong>{selectedRefund.contactContent}</strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {selectedRefund && selectedRefund.contactStatus === 'Pending-Refund' ? (
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowConfirmRefundModal(false)}>
                            Cancel
                        </Button>
                        <Button
                            // onClick={handleMarkAsRefunded}
                            className="bg-green-600 hover:bg-green-700 text-white"
                        >
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Confirm Refund Completed
                        </Button>
                    </DialogFooter>
                ) : selectedRefund && (
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowConfirmRefundModal(false)}>
                            Exist
                        </Button>
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default RefundCard