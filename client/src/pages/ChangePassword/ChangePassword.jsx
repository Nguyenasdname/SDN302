import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePut } from "../../hooks/usePut";
import { BsArrowLeft } from "react-icons/bs";
import LoadingSpinner from "../../components/ui/LoadingSpiner";


const ChangePassword = () => {
    const [error, setError] = useState('');
    const [checkPassword, setCheckPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const navigate = useNavigate()
    const { putData, loading } = usePut()
    const [showPassword, setShowPassword] = useState(false)
    const [checkChange, setCheckChange] = useState(false)

    const handleChangePassword = async () => {
        if (!newPassword || !checkPassword) {
            setError('Missing Field!')
            return
        }

        if (newPassword !== checkPassword) {
            setError('Incorrect Confirm Password')
            return
        }
        const id = localStorage.getItem('id')
        try {
            const res = await putData('/auth/change-forgot-password', { newPassword: newPassword, id: id })
            if (!res) {
                setError('Change Password Failed')
                return
            }
            setCheckChange(true)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <div className="min-h-screen bg-[url('/images/loginPage/login-background.jpg')] 
            bg-cover bg-center grid grid-cols-2">
                <div></div>
                {/* Card */}
                <div className="flex justify-center items-center p-8">
                    <div className="relative bg-white w-[600px] px-20 py-25 rounded-lg shadow-lg">

                        {!checkChange ?
                            (
                                <>
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
                                    {/* Title */}
                                    <div>
                                        <h1 className="text-3xl font-bold fw-500 ">Change Password</h1>
                                        <p className="text-gray-600">Enter your new password to complete the reset process</p>
                                    </div>

                                    <div className="mt-5">
                                        <label className="block mb-1 text-sm">New Password</label>
                                        <div className={`w-full flex items-center border p-3 ${error ? 'border-red-500' : 'border-blue-300'} rounded-full text-black`}>
                                            <img
                                                src="/images/loginPage/password-icon.png"
                                                className="w-5 h-5 object-contain"
                                            />
                                            <input
                                                className="flex-1 ml-3 rounded-md text-black focus:outline-none"
                                                placeholder="Enter New Password..."
                                                type={`${showPassword ? 'text' : 'password'}`}
                                                required={true}
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                            />
                                            <button className="cursor-pointer"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                <img
                                                    src="/images/loginPage/eye-off-icon.png"
                                                    className="w-5 h-5 object-contain"
                                                />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-5">
                                        <label className="block mb-1 text-sm">Confirm New Password</label>
                                        <div className={`w-full flex items-center border p-3 ${error ? 'border-red-500' : 'border-blue-300'} rounded-full text-black`}>
                                            <img
                                                src="/images/loginPage/password-icon.png"
                                                className="w-5 h-5 object-contain"
                                            />
                                            <input
                                                className="flex-1 ml-3 rounded-md text-black focus:outline-none"
                                                placeholder="Confirm New Password..."
                                                type={`${showPassword ? 'text' : 'password'}`}
                                                required={true}
                                                value={checkPassword}
                                                onChange={(e) => setCheckPassword(e.target.value)}
                                            />
                                            <button className="cursor-pointer"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                <img
                                                    src="/images/loginPage/eye-off-icon.png"
                                                    className="w-5 h-5 object-contain"
                                                />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="min-h-[20px] mt-2">
                                        {error && <p className="text-red-500 text-[13px]">{error}</p>}
                                    </div>

                                    <div className="mt-10 flex text-center items-center justify-center">
                                        <button
                                            className="w-full border p-3 border-[#4045ef] rounded-full text-white bg-[#4045ef]
                                    hover:bg-white hover:text-[#4045ef] transition duration-300 cursor-pointer
                                    "
                                            onClick={() => handleChangePassword()}
                                        >
                                            {loading ? <LoadingSpinner /> : 'Change Password'}
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <div className='inline-block rounded-full'>
                                            <img
                                                className='w-15 h-15 '
                                                src='/images/loginPage/success-icon.png' />
                                        </div>
                                    </div>
                                    {/* Title */}
                                    <div>
                                        <h1 className="text-3xl font-bold fw-500">Your Password</h1>
                                        <h1 className="text-3xl font-bold fw-500">Successfully Changed</h1>
                                        <p className="text-gray-600">Sign in to your account with your new password</p>
                                    </div>

                                    <div className="mt-10 flex text-center items-center justify-center">
                                        <button
                                            className="w-full border p-3 border-[#4045ef] rounded-full text-white bg-[#4045ef]
                                                    hover:bg-white hover:text-[#4045ef] transition duration-300 cursor-pointer"
                                            onClick={() => navigate('/login')}
                                        >
                                            {loading ? <LoadingSpinner /> : 'Login'}
                                        </button>
                                    </div>
                                </>
                            )}

                    </div>
                </div>
            </div>
        </>
    )
}

export default ChangePassword