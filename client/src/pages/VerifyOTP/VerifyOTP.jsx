import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { usePost } from '../../hooks/usePost';
import { BsArrowLeft } from "react-icons/bs";
import LoadingSpinner from '../../components/ui/LoadingSpiner';


export default function VerifyOTPPage() {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { postData, loading } = usePost()
    const [timeLeft, setTimeLeft] = useState(5);
    const [canResend, setCanResend] = useState(false);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (timeLeft === 0) {
            setCanResend(true);
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        const mm = m < 10 ? `0${m}` : m;
        const ss = s < 10 ? `0${s}` : s;
        return `${mm}:${ss}`;
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("text").slice(0, otp.length);
        const newOtp = [...otp];
        for (let i = 0; i < pasteData.length; i++) {
            newOtp[i] = pasteData[i];
        }
        setOtp(newOtp);

        // Focus vào ô cuối cùng
        const lastIndex = pasteData.length - 1;
        if (lastIndex >= 0) {
            document.getElementById(`otp-${lastIndex}`).focus();
        }
    };

    const handleChange = (value, index) => {
        if (!/^[0-9a-zA-Z]?$/.test(value)) return; // chỉ cho phép ký tự và số
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Tự động chuyển sang ô tiếp theo
        if (value && index < otp.length - 1) {
            document.getElementById(`otp-${index + 1}`).focus();
        }
    };

    const handleVerifyOTP = async () => {
        const action = searchParams.get('action')
        const otpString = otp.join("")
        console.log(localStorage.getItem('token'))
        try {
            const res = await postData(`/auth/verify-otp?action${action}`, { otp: otpString });
            if (!res) {
                setError('Invalid OTP. Please enter a valid OTP.!')
                return
            }
            if (res.action === 'forgotPassword') {
                const id = res.id
                localStorage.clear()
                localStorage.setItem('id', id)
                navigate('/change-password');
            }
            if (res.action === 'register') {
                localStorage.clear()
                localStorage.setItem('token', res.token)
                navigate('/')
            }

        } catch (err) {
            setError(err.response?.data?.message);
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            document.getElementById(`otp-${index - 1}`).focus();
        }
    };

    const resendOTP = async () => {
        try {
            const res = await postData('/auth/send-otp', { email: localStorage.getItem('email') })
            if (!res) {
                setError('Resend Failed');
                return
            }
            const token = res.token;
            localStorage.setItem('token', token);
            localStorage.setItem('email', res.email)
            navigate('/verify-otp');
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <div className="min-h-screen bg-[url('/images/loginPage/login-background.jpg')] 
            bg-cover bg-center grid grid-cols-2">
                <div></div>
                {/* Card */}
                <div className="flex justify-center items-center p-8">
                    <div className="relative bg-white w-[600px] px-20 py-40 rounded-lg shadow-lg">

                        <button className='absolute top-10 left-20 cursor-pointer
                                            hover:bg-[#f1f6ff] rounded-full p-1
                                            transition duration-300'
                            onClick={() => navigate('/')}
                        >
                            <BsArrowLeft className='text-[30px] text-[#899cc9]' />
                        </button>
                        {/* Icon Img */}
                        <div>
                            <div className='inline-block p-2 bg-[#f1f6ff] rounded-full'>
                                <img
                                    className='w-8 h-8 '
                                    src='/images/loginPage/email-icon.png' />
                            </div>
                        </div>
                        {/* Title */}
                        <div>
                            <h1 className="text-3xl font-bold fw-500 ">OTP Verification</h1>
                            <p className="text-gray-600">Check your email to see the verification code</p>
                        </div>

                        <div className='mt-5'>
                            <div className="flex gap-4 justify-center items-center" onPaste={handlePaste}>
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        id={`otp-${index}`}
                                        type="text"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleChange(e.target.value, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        className={`w-15 h-15 text-center text-xl font-bold border-1 ${error ? 'border-red-500' : 'border-blue-300'} rounded-full focus:outline-none`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="min-h-[20px] mt-2">
                            {error && <p className="text-red-500 text-[13px]">{error}</p>}
                        </div>

                        <div className="mt-2 flex text-center items-center justify-center">
                            <button
                                className="w-full border p-3 border-[#4045ef] rounded-full text-white bg-[#4045ef]
                                    hover:bg-white hover:text-[#4045ef] transition duration-300 cursor-pointer
                                    "
                                onClick={(e) => handleVerifyOTP(e)}
                            >
                                {loading ? <LoadingSpinner /> : 'Verify'}
                            </button>
                        </div>

                        <div className="mt-4 text-center text-sm text-gray-600">
                            {canResend ? (
                                <div className='flex justify-center'>
                                    <p>Didn't receive the code?</p>
                                    <button
                                        onClick={() => resendOTP()}
                                        className="text-blue-500 hover:underline ml-1 cursor-pointer"
                                    >
                                        Resend OTP
                                    </button>
                                </div>
                            ) : (
                                <p>Resend code in <span className="font-semibold text-[#4045ef]">{formatTime(timeLeft)}</span></p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
