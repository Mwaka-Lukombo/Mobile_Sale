import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import {Routes, Route, Router} from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { SignupPage } from './pages/auth/SignupPage'
import { LoginPage } from './pages/auth/LoginPage'
import { HomePage } from './pages/home/HomePage'
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage'
import { useAuthStore } from './store/authStore'
import { Loader } from 'lucide-react';
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage'
import { SideBar } from './pages/sidebar/SideBar'
import { ProductPage } from './pages/products/ProductPage'
import { UsersPage } from './pages/users/UsersPage'
import { SettingsPage } from './pages/settings/SettingsPage'
import { HomeClient } from './pages/home/HomeClient'
import { Navbar } from './components/common/Navbar'


//Components






function App() {


    const {
    isChecking,
    user,
    check,
    isAuth,
    isAdmin,
    verifyAdmin
  } = useAuthStore();
  

  
useEffect(() => {
  const checkFunc = async()=>{
    await check();
  }
  checkFunc();
}, []);

useEffect(() => {
  if (user?.email) {
    verifyAdmin();
  }
}, [user]);




  
const PrivateRoute = ({ children }) => {
  const auth = isAuth; 
  
  if (!auth) {
    return <Navigate to="/login" replace />
  }
  
  return children
}

const PublicRoute = ({ children }) => {
  const auth = isAuth; 
  
  if (auth) {
    return <Navigate to="/" replace />
  }
  
  return children
}




if(isChecking){
  return <div className='absolute top-0 left-0 w-full h-screen flex items-center justify-center bg-black/80'>
     <Loader size={10} className='animate-spin' />
  </div>
}

  return (

  
    <>
    <div  className={`w-full min-h-screen bg-cinza-claro ${isAdmin && "flex"}`}>
      {isAuth && isAdmin && (
        <SideBar />
      )}
      {isAuth && !isAdmin && <Navbar />}
       <Routes>
         <Route path='/' element={ 
          <PrivateRoute>
            {isAdmin && <HomePage />}
            {!isAdmin && isAuth && <HomeClient />}
          </PrivateRoute>
         } />
         <Route path='/products' element={ 
          <PrivateRoute>
            <ProductPage />
          </PrivateRoute>
         } />

         <Route path='/users' element={ 
          <PrivateRoute>
            <UsersPage />
          </PrivateRoute>
         } />

         <Route path='/settings' element={ 
          <PrivateRoute>
            <SettingsPage />
          </PrivateRoute>
         } />
         
         <Route path='/login' element={ 
          <PublicRoute>
            <LoginPage/>
          </PublicRoute>
         } />
         <Route path='/signup' element={ 
          <PublicRoute>
            <SignupPage/>
          </PublicRoute>
         } />

         <Route path='/forgetPassword' element={ 
          <PublicRoute>
            <ForgotPasswordPage/>
          </PublicRoute>
         } />
         <Route path='/reset-password/:token' element={
          <PublicRoute>
            <ResetPasswordPage />
          </PublicRoute>
         } />
         <Route path='*' element={<Navigate to="/" replace />} />
       </Routes>
     <Toaster />
     </div>
    </>
  )
}

export default App
