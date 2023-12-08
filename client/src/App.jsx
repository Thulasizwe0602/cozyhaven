import { Route, Routes } from 'react-router-dom'
import './App.css'
import logo from './assets/logo_transparent.png'
import IndexPage from './pages/IndexPage'
import SignInPage from './pages/SignInPage'
import RegisterPage from './pages/SignUpPage'
import AccountPage from './pages/AccountPage'
import Layout from './Layout'
import axios from 'axios'
import { UserContextProvider } from './UserContext';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;
function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/signin' element={<SignInPage />} />
          <Route path='/signup' element={<RegisterPage />} />
          <Route path='/account/:subpage?' element={<AccountPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
