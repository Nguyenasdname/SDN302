import { useState, useEffect, useRef } from 'react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Shield, Clock, QrCode, CheckCircle, AlertCircle, AwardIcon } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGet } from '../../hooks/useGet';
import { usePost } from '../../hooks/usePost';
import { usePatch } from '../../hooks/usePatch';

const PaymentPage = ({ onNavigate }) => {
    const [timeRemaining, setTimeRemaining] = useState(15 * 60); // 15 minutes in seconds
    const [paymentConfirmed, setPaymentConfirmed] = useState(false);
    const { state } = useLocation()
    const { bookingData, resortId, paymentType } = state
    const { data: resort, loading: resortLoading } = useGet(`/resort/${resortId}`)
    const { data: bookingService, loading: bookingServiceLoading } = useGet(`/bookingService/${bookingData._id}`)
    const { postData } = usePost()
    const { patchData } = usePatch()
    const navigate = useNavigate()
    const timerRef = useRef(null)

    const depositAmount = Math.round(
        paymentType === 'Deposit'
            ? bookingData.bookingTotal * 0.3
            : bookingData.bookingTotal
    );
    const deadline = new Date(Date.now() + timeRemaining * 1000);

    const paymentInfor = `bookingID${bookingData._id}${paymentType === 'Deposit' ? 'Deposit' : 'Payment'}`

    const QRUrl = `https://img.vietqr.io/image/OCB-CASS0903210704-compact.jpg?amount=${depositAmount}&addInfo=${paymentInfor}`

    const handleConfirmPayment = async () => {
        clearTimeout(timerRef.current);
        setTimeRemaining(0);

        if (paymentConfirmed) return;

        setPaymentConfirmed(true);

        try {
            const paymentData = {
                bookingId: bookingData._id,
                paymentAmount: depositAmount,
                paymentMethod: "QR code",
                paymentStatus: paymentType === "Deposit" ? "Deposit" : "Payment",
            };

            const res = await postData("/payment", { paymentData });

            if (paymentType === "Deposit") {
                await patchData(`/booking/${bookingData._id}/confirm`, {
                    depositAmount,
                });
            }

            if (res) {
                alert("Thanh toán thành công!");
                navigate("/");
                window.location.reload()
            }
        } catch (err) {
            console.error("Lỗi khi xác nhận thanh toán:", err);
        }
    };

    const checkPaid = async () => {
        if (paymentConfirmed) return;

        try {
            const res = await fetch(
                `https://script.google.com/macros/s/AKfycbxj-3eYlCmTW63LxUUPVi9QEUMA4kbb8tyWRoeVeslFY8Ymo0Yu6Sa_wmt3rQbfxrbP/exec`
            );
            const json = await res.json();
            const transaction = json.data[json.data.length - 1];
            const amount = transaction["Giá trị"];
            const infor = transaction["Mô tả"];

            console.log("Thông tin giao dịch:", infor);
            console.log("Giá trị giao dịch:", amount);

            if (depositAmount === Number(amount) && infor.includes(paymentInfor)) {
                await handleConfirmPayment();
            }
        } catch (err) {
            console.error("Lỗi khi kiểm tra thanh toán:", err);
        }
    };

    useEffect(() => {
        if (paymentConfirmed || timeRemaining <= 0) {
            clearTimeout(timerRef.current);
            return;
        }

        timerRef.current = setTimeout(() => {
            checkPaid();
            setTimeRemaining((prev) => prev - 1);
        }, 1000);

        // Cleanup mỗi lần render lại
        return () => clearTimeout(timerRef.current);
    }, [timeRemaining, paymentConfirmed]);


    if (resortLoading || bookingServiceLoading) {
        return (
            <div>Loading...</div>
        )
    }

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };



    return (
        <div className="container mx-auto px-6 py-12">
            {/* Trust Header */}
            <div className="flex items-center justify-center gap-2 mb-8">
                <Shield className="w-6 h-6 text-[#14b8a6]" />
                <h1 className="text-3xl" style={{ fontFamily: 'var(--font-serif)' }}>
                    Secure Payment
                </h1>
            </div>

            <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - QR Code */}
                    <div className="lg:col-span-2">
                        {/* Payment Deadline */}
                        <Card className="p-6 mb-6 bg-gradient-to-r from-[#14b8a6]/10 to-[#fbbf24]/10 border-[#14b8a6]">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Clock className="w-6 h-6 text-[#14b8a6]" />
                                    <div>
                                        <h3 className="mb-1" style={{ fontFamily: 'var(--font-serif)' }}>
                                            Payment Deadline
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {deadline.toLocaleString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl text-[#14b8a6]" style={{ fontFamily: 'var(--font-serif)' }}>
                                        {formatTime(timeRemaining)}
                                    </div>
                                    <p className="text-xs text-gray-600">Time Remaining</p>
                                </div>
                            </div>
                        </Card>

                        {/* QR Code Card */}
                        <Card className="p-8">
                            <div className="text-center">
                                <div className="inline-flex items-center gap-2 mb-6">
                                    <QrCode className="w-5 h-5 text-[#14b8a6]" />
                                    <h2 className="text-2xl mr-5" style={{ fontFamily: 'var(--font-serif)' }}>
                                        Scan to Pay
                                    </h2>
                                </div>

                                {/* QR Code Display */}
                                <div className="bg-white p-8 rounded-2xl border-4 border-[#14b8a6] inline-block mb-6">
                                    <div className="w-64 h-64 bg-gray-100 flex items-center justify-center rounded-lg">
                                        {/* QR Code Placeholder - In production, this would be a real QR code */}
                                        <img src={QRUrl} className='w-full h-full' />
                                    </div>
                                </div>

                                <div className="space-y-4 text-left max-w-md mx-auto mb-6">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#14b8a6] text-white flex items-center justify-center flex-shrink-0">
                                            1
                                        </div>
                                        <div>
                                            <h4 className="mb-1">Open Banking App</h4>
                                            <p className="text-sm text-gray-600">
                                                Use your mobile banking app or e-wallet (MoMo, ZaloPay, VietQR)
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#14b8a6] text-white flex items-center justify-center flex-shrink-0">
                                            2
                                        </div>
                                        <div>
                                            <h4 className="mb-1">Scan QR Code</h4>
                                            <p className="text-sm text-gray-600">
                                                Point your camera at the QR code above
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#14b8a6] text-white flex items-center justify-center flex-shrink-0">
                                            3
                                        </div>
                                        <div>
                                            <h4 className="mb-1">Confirm Payment</h4>
                                            <p className="text-sm text-gray-600">
                                                Verify the amount (${depositAmount}) and complete the transfer
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Mock Confirmation Button */}
                                {!paymentConfirmed ? (
                                    <div className="border-t pt-6">
                                        Payment...
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center gap-2 text-green-600 py-4">
                                        <CheckCircle className="w-6 h-6" />
                                        <span className="text-lg">Payment Confirmed!</span>
                                    </div>
                                )}
                            </div>
                        </Card>

                        {/* Security Notice */}
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg mt-6">
                            <Shield className="w-5 h-5 text-[#14b8a6]" />
                            <p className="text-sm text-gray-600">
                                Your payment is processed securely through VietQR banking system. We never have access to your banking credentials.
                            </p>
                        </div>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="lg:col-span-1">
                        <Card className="p-6 sticky top-24">
                            <h2 className="text-xl mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
                                Payment Summary
                            </h2>
                            <div className="space-y-3 text-gray-600 mb-6">
                                <div className="flex justify-between">
                                    <span>Property:</span>
                                    <span className="text-right">{resort.resortName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Check-in:</span>
                                    <span>{new Date(bookingData.checkIn).toLocaleDateString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Check-out:</span>
                                    <span>{new Date(bookingData.checkOut).toLocaleDateString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Guests:</span>
                                    <span>{bookingData.numberOfGuests}</span>
                                </div>
                            </div>

                            <div className="border-t pt-4 space-y-3">
                                <div className="flex justify-between text-gray-600">
                                    <span>Room ({bookingData.nights} nights)</span>
                                    <span>${bookingData.bookingTotal?.toFixed(2)}</span>
                                </div>

                                {bookingService.length > 0 && (
                                    <>
                                        <div className="text-sm text-gray-500 pt-2">Additional Services:</div>
                                        {bookingService.map((service) => (
                                            <div key={service._id} className="flex justify-between text-sm text-gray-600 pl-4">
                                                <span>
                                                    {service.serviceId.serviceName} (×{service.quantity})
                                                </span>
                                                <span>${(service.totalPrice).toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </>
                                )}

                                <div className="border-t pt-3 flex justify-between">
                                    <span>Total Amount</span>
                                    <span className="text-xl text-black" style={{ fontFamily: 'var(--font-serif)' }}>
                                        ${bookingData.bookingTotal.toFixed(2)}
                                    </span>
                                </div>

                                {paymentType === 'Deposit' && (
                                    <div className="bg-[#14b8a6]/10 rounded-lg p-4 mt-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <span>30% Deposit (Due Now)</span>
                                            <span className="text-xl text-[#14b8a6]" style={{ fontFamily: 'var(--font-serif)' }}>
                                                ${depositAmount}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600">
                                            Remaining ${(bookingData.bookingTotal * 0.7).toFixed(2)} due at check-in
                                        </p>
                                    </div>
                                )}
                            </div>

                            {timeRemaining === 0 && (
                                <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-lg mt-4 text-sm">
                                    <AlertCircle className="w-4 h-4" />
                                    <span>Payment time expired</span>
                                </div>
                            )}
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentPage