import { useState } from "react"
import { usePost } from "../../hooks/usePost"
import { useNavigate } from "react-router-dom"
import { BsArrowLeft } from "react-icons/bs";
import LoadingSpinner from "../../components/ui/LoadingSpiner";
import { GoogleLogin } from '@react-oauth/google'

const RegisterPage = () => {
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const { postData, loading } = usePost()
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            setError('Incorrect confirm password!')
            return
        }

        if (!password || !confirmPassword) {
            setError('Missing Password!')
            return
        }

        let hasError = false
        if (!userName) {
            setUsernameError('Missing Field Username!')
            hasError = true
        }

        if (!userEmail) {
            setEmailError('Missing Field Email!')
            hasError = true
        }

        if (hasError) {
            hasError = false
            return
        }

        try {
            const res = await postData('/auth/register', {
                userName: userName,
                userEmail: userEmail,
                userPass: password
            })

            if (!res) {
                setError('Server Error!')
                return
            }
            localStorage.setItem('token', res.token)
            localStorage.setItem('email', res.email)
            navigate('/verify-otp?action=register')

        } catch (err) {
            console.log(err.response?.data)
            if (err.response?.status === 400) {
                const errors = err.response.data.errors
                if (errors.userName) setUsernameError(errors.userName)
                if (errors.userEmail) setEmailError(errors.userEmail)
            }
            setPassword('')
            setConfirmPassword('')
            setError('')
        }
    }
    return (
        <>
            <div className="min-h-screen bg-[url('/images/loginPage/login-background.jpg')] 
            bg-cover bg-center grid grid-cols-2">
                <div></div>
                <div className="flex justify-center items-center p-8">
                    <div className="bg-white w-[600px] px-18 py-10 rounded-lg shadow-lg">
                        <h1 className="text-3xl font-bold fw-500 mb-4">Get Started Now</h1>
                        <p className="text-gray-600">Let's create your account!</p>

                        <div className="mt-10">
                            <label className="block mb-1 text-sm">Username</label>
                            <div className={`w-full flex items-center border p-3 ${error || usernameError ? 'border-red-500' : 'border-blue-300'} rounded-full text-black`}>
                                <img
                                    src="/images/loginPage/user-icon.png"
                                    className="w-5 h-5 object-contain"
                                />
                                <input
                                    className="flex-1 ml-3 rounded-md text-black focus:outline-none"
                                    placeholder="Enter Your Username..."
                                    type="text"
                                    required={true}
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="min-h-[20px]">
                            {usernameError && <p className="text-red-500 text-[12px]">{usernameError}</p>}
                        </div>

                        <div className="mt-3">
                            <label className="block mb-1 text-sm">Email</label>
                            <div className={`w-full flex items-center border p-3 ${error || emailError ? 'border-red-500' : 'border-blue-300'} rounded-full text-black`}>
                                <img
                                    src="/images/loginPage/email-icon.png"
                                    className="w-5 h-5 object-contain"
                                />
                                <input
                                    className="flex-1 ml-3 rounded-md text-black focus:outline-none"
                                    placeholder="Enter Your Email..."
                                    type="text"
                                    required={true}
                                    value={userEmail}
                                    onChange={(e) => setUserEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="min-h-[20px]">
                            {emailError && <p className="text-red-500 text-[12px]">{emailError}</p>}
                        </div>

                        <div className="mt-3">
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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

                        <div className="mt-8">
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
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                            {error && <p className="text-red-500 text-[12px]">{error}</p>}
                        </div>

                        <div className="mt-5 flex text-center items-center justify-center">
                            <button
                                className="w-full border p-3 border-[#4045ef] rounded-full text-white bg-[#4045ef]
                                    hover:bg-white hover:text-[#4045ef] transition duration-300 cursor-pointer
                                    "
                                onClick={() => handleRegister()}
                            >
                                {loading ? <LoadingSpinner /> : 'Register'}
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
                            <p className="">Already have an account ?
                                <button className="ml-2 cursor-pointer text-blue-500"
                                    onClick={() => navigate('/login')}
                                >
                                    Login
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegisterPage