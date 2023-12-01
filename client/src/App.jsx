import { Route, Routes } from 'react-router-dom'
import './App.css'
import logo from './assets/logo_transparent.png'
import IndexPage from './pages/IndexPage'
import SignInPage from './pages/SignInPage'
import RegisterPage from './pages/SignUpPage'
import Layout from './Layout'

function App() {

  return (
    // <div className='p-4 flex justify-between'>
    // <img src={logo} alt="Logo" className='w-20 h-20'/>

    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path='/signin' element={<SignInPage />} />
        <Route path='/signup' element={<RegisterPage />} />
      </Route>
    </Routes>
  )
}

export default App
