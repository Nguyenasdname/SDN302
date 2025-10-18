import './App.css'
import LoginPage from './pages/LoginPage/LoginPage'
import { GoogleOAuthProvider } from '@react-oauth/google'

function App() {

  return (
    <>
      <GoogleOAuthProvider clientId='737984428384-jtleetlqjdtt74u7jd38usd88i1b5dsm.apps.googleusercontent.com'>
        <LoginPage />
      </GoogleOAuthProvider>
    </>
  )
}

export default App
