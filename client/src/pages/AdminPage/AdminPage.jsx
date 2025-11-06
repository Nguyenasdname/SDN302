import AdminLayout from '../components/AdminLayout';
import AccountManagementPage from './admin/AccountManagementPage';
import ResortManagementPage from './admin/ResortManagementPage';
import ContactManagementPage from './admin/ContactManagementPage';
import RevenueAnalyticsPage from './admin/RevenueAnalyticsPage';
import ServiceManagementPage from './admin/ServiceManagementPage';
import BookingManagementPage from './admin/BookingManagementPage';
import Toaster from '../components/ui/sonner';

const AdminPage = ({ currentPage, onNavigate, onLogout, currentUser }) => {
    return (
        <>
            <AdminLayout
                currentPage={currentPage}
                onNavigate={onNavigate}
                onLogout={onLogout}
                currentUser={currentUser}
            >
                {currentPage === 'admin-accounts' && <AccountManagementPage onNavigate={onNavigate} />}
                {currentPage === 'admin-resorts' && <ResortManagementPage onNavigate={onNavigate} />}
                {currentPage === 'admin-contacts' && <ContactManagementPage onNavigate={onNavigate} />}
                {currentPage === 'admin-revenue' && <RevenueAnalyticsPage onNavigate={onNavigate} />}
                {currentPage === 'admin-services' && <ServiceManagementPage onNavigate={onNavigate} />}
                {currentPage === 'admin-bookings' && <BookingManagementPage onNavigate={onNavigate} />}
            </AdminLayout>
            <Toaster />
        </>
    );
};

export default AdminPage