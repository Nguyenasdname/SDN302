import { Children } from 'react'
import Header from '../components/Header'
import { useGet } from '../hooks/useGet'
import Footer from '../components/Footer'

const MainLayout = ({ children }) => {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    )
}
export default MainLayout