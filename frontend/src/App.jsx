import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import {Toaster} from "react-hot-toast"
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import { axiosInstance } from './lib/axios'
import { useAuthStore } from './store/useAuthStore'
import { useThemeStore } from './store/useThemeStore'
import { Navigate } from 'react-router-dom'

const App = () => {
  const {authUser, checkAuth, isCheckingAuth, onlineUsers} = useAuthStore();
  const {theme} = useThemeStore();

  useEffect(()=>{
    checkAuth();
  }, [checkAuth]);


  if(isCheckingAuth && !authUser) return (
    <div className='h-screen flex items-center justify-center' data-theme={theme}>
      <span className="loading loading-spinner text-primary"></span>
    </div>
  )
  

  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login"/>} />
        <Route path='/signup' element={!authUser ? <SignupPage /> : <Navigate to="/"/>} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to="/"/>} />
        <Route path='/settings' element={ <SettingsPage /> } />
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to="/login"/>} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App