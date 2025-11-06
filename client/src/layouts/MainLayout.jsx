import { Children } from 'react'
import Header from '../components/Header'
import { useGet } from '../hooks/useGet'

const MainLayout = ({ children }) => {
    return (
        <>
            <Header />
            <main>{children}</main>
        </>
    )
}
export default MainLayout