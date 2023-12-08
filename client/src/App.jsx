import { Route, Routes } from 'react-router-dom'
import './App.css'
import logo from './assets/logo_transparent.png'
import IndexPage from './pages/IndexPage'
import SignInPage from './pages/SignInPage'
import RegisterPage from './pages/SignUpPage'
import Layout from './Layout'
import axios from 'axios'
import { UserContextProvider } from './UserContext';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;
function App() {

  return (
    // <div className='p-4 flex justify-between'>
    // <img src={logo} alt="Logo" className='w-20 h-20'/>
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/signin' element={<SignInPage />} />
          <Route path='/signup' element={<RegisterPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
