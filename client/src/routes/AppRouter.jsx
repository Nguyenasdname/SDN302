import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage/LoginPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage/ForgotPasswordPage';
import VerifyOTPPage from '../pages/VerifyOTP/VerifyOTP';
import VerifyLinkPage from '../pages/VerifyOTP/VerifyLink';
import ChangePassword from '../pages/ChangePassword/ChangePassword';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import HomePage from '../pages/HomePage/HomePage';
import MainLayout from '../layouts/MainLayout';
import AdminPage from '../pages/AdminPage/AdminPage';
import { useGet } from '../hooks/useGet';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import EditProfilePage from '../pages/EditProfilePage/EditProfilePage';

const AppRouter = () => {
    const {
        user, loading
    } = useGet('/user/profile')

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
                <Route path="/admin-dashboard" element={<AdminPage currentUser={user} />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/verify-otp" element={<VerifyOTPPage />} />
                <Route path="/verify_link" element={<VerifyLinkPage />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path='/profile' element={<MainLayout><ProfilePage /></MainLayout>} />
                <Route path='/profile/editProfile' element={<MainLayout><EditProfilePage /></MainLayout>} />
            </Routes>
        </Router>
    )
}

export default AppRouter