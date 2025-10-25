import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { usePost } from '../../hooks/usePost';
import LoadingSpinner from '../../components/ui/LoadingSpiner';
import { BsArrowLeft } from "react-icons/bs";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const { postData, loading } = usePost()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate();


    const handleForgotPassword = async () => {
        if (!email) {
            setError('Missing Field');
            return
        }
        const aciton = searchParams.get('action')
        try {
            const res = await postData(`/auth/send-otp?action=${aciton}`, {
                email: email
            })
            if (!res) {
                setError('Not Found Your Email');
                return
            }
            const token = res.token;
            localStorage.setItem('token', token);
            localStorage.setItem('email', res.email)
            navigate(`/verify-otp?action=${aciton}`);

            // eslint-disable-next-line no-unused-vars
        } catch (err) {
            console.error(err)
            setError('Email không tồn tại trong hệ thống');
        }
    };

    return (
        <>
            <div className="min-h-screen bg-[url('/images/loginPage/login-background.jpg')] 
            bg-cover bg-center grid grid-cols-2">
                <div></div>
                <div className="flex justify-center items-center p-8">
                    <div className="relative bg-white w-[600px] px-20 py-40 rounded-lg shadow-lg">

                        <button className='absolute top-10 left-20 cursor-pointer
                                            hover:bg-[#f1f6ff] rounded-full p-1
                                            transition duration-300'
                            onClick={() => navigate('/')}
                        >
                            <BsArrowLeft className='text-[30px] text-[#899cc9]' />
                        </button>

                        <div>
                            <div className='inline-block p-2 bg-[#f1f6ff] rounded-full'>
                                <img
                                    className='w-8 h-8 '
                                    src='/images/loginPage/password-icon.png' />
                            </div>
                        </div>

                        <div>
                            <h1 className="text-3xl font-bold fw-500 ">Forgot Password?</h1>
                            <p className="text-gray-600">Enter your email to reset your password</p>
                        </div>

                        <div className="mt-10">
                            <label className="block mb-1 text-sm">Email</label>
                            <div className={`w-full flex items-center border p-3 ${error ? 'border-red-500' : 'border-blue-300'} rounded-full text-black`}>
                                <img
                                    src="/images/loginPage/email-icon.png"
                                    className="w-5 h-5 object-contain"
                                />
                                <input
                                    className="flex-1 ml-3 rounded-md text-black focus:outline-none"
                                    placeholder="Enter Your Email"
                                    type="text"
                                    required={true}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
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
                                onClick={(e) => handleForgotPassword(e)}
                            >
                                {loading ? <LoadingSpinner /> : 'Submit'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
