import { useState } from "react"
import { usePost } from "../../hooks/usePost"
import { GoogleLogin } from '@react-oauth/google'

const LoginPage = () => {
    const [loginId, setLoginId] = useState("")
    const [userPass, setUserPass] = useState("")
    const [error, setError] = useState(null)
    const { postData, loading } = usePost()

    const handleLogin = async (e) => {
        e.preventDefault()
        setError("")
        localStorage.clear()
        console.log(`${loginId + userPass}`)
        try {
            const res = await postData("/auth/login", {
                loginId: loginId.toLowerCase(),
                userPass: userPass
            })
            if (res.token) {
                localStorage.setItem('token', res.token)
                alert(`Oke cu ${res.user + res.token}`)
            } else {
                setError(`Fail, no token`)
            }

            // eslint-disable-next-line no-unused-vars
        } catch (err) {
            setError(`Wrong Email Or Password`)
        }
    }

    return (
        <>
            <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
                <h2>Đăng nhập</h2>
                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: 10 }}>
                        <label>Tên đăng nhập:</label>
                        <input
                            type="text"
                            value={loginId}
                            onChange={(e) => setLoginId(e.target.value)}
                            required
                            style={{ width: "100%" }}
                        />
                    </div>
                    <div style={{ marginBottom: 10 }}>
                        <label>Mật khẩu:</label>
                        <input
                            type="password"
                            value={userPass}
                            onChange={(e) => setUserPass(e.target.value)}
                            required
                            style={{ width: "100%" }}
                        />
                    </div>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <button type="submit" disabled={loading}>
                        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                    </button>
                </form>
            </div>
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
                useOneTap
            />
        </>
    )
}

export default LoginPage