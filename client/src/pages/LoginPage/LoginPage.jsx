import { useState } from "react"
import { usePost } from "../../hooks/usePost"
import { GoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from "../../components/ui/LoadingSpiner";

const LoginPage = () => {
    const navigate = useNavigate();

    const [loginId, setLoginId] = useState("")
    const [userPass, setUserPass] = useState("")
    const [error, setError] = useState(null)
    const { postData, loading } = usePost()
    const [showPassword, setShowPassword] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault()
        setError(null)
        localStorage.clear()

        if (!loginId.trim() || !userPass.trim()) {
            setError('Missing Field');
            return;
        }
        try {
            const res = await postData("/auth/login", {
                loginId: loginId.toLowerCase(),
                userPass: userPass
            })

            if (res.token) {
                localStorage.setItem('token', res.token)
                navigate('/')
            } else {
                setError(res.message || 'Login Failed')
                return
            }

        } catch (err) {
            setError('Incorrect email or password!');
            setUserPass("")
        }
    }

    return (
        <>
            <div className="min-h-screen bg-[url('/images/loginPage/login-background.jpg')] 
            bg-cover bg-center grid grid-cols-2">
                <div></div>
                <div className="flex justify-center items-center p-8">
                    <div className="bg-white w-[600px] px-18 py-10 rounded-lg shadow-lg">
                        <h1 className="text-3xl font-bold fw-500 mb-4">Welcome Back</h1>
                        <p className="text-gray-600">Sign to your account!</p>

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
                                    value={loginId}
                                    onChange={(e) => setLoginId(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mt-5">
                            <label className="block mb-1 text-sm">Password</label>
                            <div className={`w-full flex items-center border p-3 ${error ? 'border-red-500' : 'border-blue-300'} rounded-full text-black`}>
                                <img
                                    src="/images/loginPage/password-icon.png"
                                    className="w-5 h-5 object-contain"
                                />
                                <input
                                    className="flex-1 ml-3 rounded-md text-black focus:outline-none"
                                    placeholder="Enter Your Password"
                                    type={`${showPassword ? 'text' : 'password'}`}
                                    required={true}
                                    value={userPass}
                                    onChange={(e) => setUserPass(e.target.value)}
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
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input type="checkbox" className="w-[16px] h-[16px]" />
                                <p className="text-sm text-gray-700 ml-2">Remember me</p>
                            </div>

                            <div className="">
                                <button className="text-blue-500 text-[14px] cursor-pointer"
                                    onClick={() => navigate('/forgot-password?action=forgotPassword')}
                                >
                                    Forgot password?
                                </button>
                            </div>
                        </div>

                        <div className="mt-10 flex text-center items-center justify-center">
                            <button
                                className="w-full border p-3 border-[#4045ef] rounded-full text-white bg-[#4045ef]
                                    hover:bg-white hover:text-[#4045ef] transition duration-300 cursor-pointer
                                    "
                                onClick={(e) => handleLogin(e)}
                            >
                                {loading ? <LoadingSpinner /> : 'Login'}
                            </button>
                        </div>

                        <div className="flex items-center gap-4 mt-3">
                            <hr className="flex-grow border-t border-gray-300" />
                            <span className="">or</span>
                            <hr className="flex-grow border-t border-gray-300" />
                        </div>

                        <div className="mt-3 ">
                            <GoogleLogin
                                onSuccess={async (credentialResponse) => {
                                    const { credential } = credentialResponse
                                    const res = await postData('/auth/google-login', { googleToken: credential })
                                    console.log(`res is: ${res}`)
                                    if (res.token) {
                                        localStorage.setItem('token', res.token)
                                        alert(`Oke cu ${res.user + res.token}`)
                                    } else {
                                        alert(`No Token`)
                                    }
                                }}
                                onError={() => console.log('Login Failed')}
                            />
                        </div>

                        <div className="flex items-center gap-4 mt-6 justify-center text-[14px]">
                            <p className="">Don't have an account?
                                <button className="ml-2 cursor-pointer text-blue-500"
                                    onClick={() => navigate('/register')}
                                >
                                    Register
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default LoginPage