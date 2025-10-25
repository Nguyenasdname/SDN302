import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { usePost } from '../../hooks/usePost';

const VerifyLinkPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { postData } = usePost()

    useEffect(() => {
        const token = searchParams.get('token');
        if (!token) {
            navigate('/error');
            return;
        }

        const verify = async () => {
            try {
                const res = await postData('/auth/verify-link', { token });
                if (!res) {
                    alert('Huh')
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
                console.error('Xác minh thất bại:', err);
                navigate('/error'); // hoặc hiển thị lỗi
            }
        };

        verify();
    }, [searchParams, navigate]);

    return <>
    </>;
}

export default VerifyLinkPage