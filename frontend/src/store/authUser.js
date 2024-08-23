import axios from 'axios'
import {create} from 'zustand'
import toast from 'react-hot-toast'

export const useAuthStore = create(set=>({
      user:null,
      isSigningUp:false,
      isLoggingIn :false,
      isCheckingAuth:true,
      isLoggingOut:false,
      signUp:async(credentials)=>{
          try {
            set({isSigningUp:true})
            const {data} = await axios.post('/api/v1/auth/signup',credentials)
            set({user:data.user, isSigningUp:false})
            toast.success("Account created successfully")
          } catch (error) {
            toast.error(error.response.data.message || 'An error occurred')
            set({user:null, isSigningUp:false})
          }
      },
      login:async(credentials)=>{
        try {
            set({isLoggingIn:true})
            const {data} = await axios.post('/api/v1/auth/login',credentials)
            set({user:data.user, isLoggingIn:false})
            toast.success("Logged in successfully")
          } catch (error) {
            toast.error(error.response.data.message || 'An error occurred')
            set({user:null, isLoggingIn:false})
          }
      },
      logout:async()=>{
        try {
          set({isLoggingOut:true})
          await axios.post('/api/v1/auth/logout')
          toast.success('Logged out successfully')
          set({user:null,isLoggingOut:false})
        } catch (error) {
          toast.error(error.response.data.message || 'An error occurred')
        }
      },
      checkAuth:async()=>{
         try {
          set({isCheckingAuth:true})
          const {data} = await axios.get('/api/v1/auth/checkAuth')
          set({user:data.user,isCheckingAuth:false})
         } catch (error) {
          set({user:null,isCheckingAuth:false})
         }
      }
}))

