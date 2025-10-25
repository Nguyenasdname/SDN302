import './App.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import AppRouter from './routes/AppRouter'


function App() {

  return (
    <>
      <GoogleOAuthProvider clientId='737984428384-jtleetlqjdtt74u7jd38usd88i1b5dsm.apps.googleusercontent.com'>
        <AppRouter />
      </GoogleOAuthProvider>
    </>
  )
}

export default App
