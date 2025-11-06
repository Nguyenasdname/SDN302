// import AdminLayout from '../../components/AdminLayout';
// import AccountManagementPage from '../admin/AccountManagementPage';
// import ResortManagementPage from '../admin/ResortManagementPage';
// import ContactManagementPage from '../admin/ContactManagementPage';
// import RevenueAnalyticsPage from '../admin/RevenueAnalyticsPage';
// import ServiceManagementPage from '../admin/ServiceManagementPage';
// import BookingManagementPage from '../admin/BookingManagementPage';
// import { Toaster } from '../../components/ui/sonner';

// const AdminPage = ({ currentPage, onNavigate, onLogout, currentUser }) => {
//     return (
//         <>
//             <AdminLayout
//                 currentPage={currentPage}
//                 onNavigate={onNavigate}
//                 onLogout={onLogout}
//                 currentUser={currentUser}
//             >
//                 {currentPage === 'admin-accounts' && <AccountManagementPage onNavigate={onNavigate} />}
//                 {currentPage === 'admin-resorts' && <ResortManagementPage onNavigate={onNavigate} />}
//                 {currentPage === 'admin-contacts' && <ContactManagementPage onNavigate={onNavigate} />}
//                 {currentPage === 'admin-revenue' && <RevenueAnalyticsPage onNavigate={onNavigate} />}
//                 {currentPage === 'admin-services' && <ServiceManagementPage onNavigate={onNavigate} />}
//                 {currentPage === 'admin-bookings' && <BookingManagementPage onNavigate={onNavigate} />}
//             </AdminLayout>
//             <Toaster />
//         </>
//     );
// };

// export default AdminPage

// src/pages/admin/AdminPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import AccountManagementPage from '../admin/AccountManagementPage';
import ResortManagementPage from '../admin/ResortManagementPage';
import ContactManagementPage from '../admin/ContactManagementPage';
import RevenueAnalyticsPage from '../admin/RevenueAnalyticsPage';
import ServiceManagementPage from '../admin/ServiceManagementPage';
import BookingManagementPage from '../admin/BookingManagementPage';
import { Toaster } from '../../components/ui/sonner';

const AdminPage = ({ currentUser }) => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState('admin-revenue');

    const handleNavigate = (pageId) => {
        setCurrentPage(pageId);
        // Nếu bạn muốn thay đổi URL, có thể dùng navigate(`/admin/${pageId}`);
    };

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/');
    };

    return (
        <>
            <AdminLayout
                currentPage={currentPage}
                onNavigate={handleNavigate}
                onLogout={handleLogout}
                currentUser={currentUser}
            >
                {currentPage === 'admin-accounts' && <AccountManagementPage />}
                {currentPage === 'admin-resorts' && <ResortManagementPage />}
                {currentPage === 'admin-contacts' && <ContactManagementPage />}
                {currentPage === 'admin-revenue' && <RevenueAnalyticsPage />}
                {currentPage === 'admin-services' && <ServiceManagementPage />}
                {currentPage === 'admin-bookings' && <BookingManagementPage />}
            </AdminLayout>
            <Toaster />
        </>
    );
};

export default AdminPage;
