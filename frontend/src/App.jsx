import { useState } from 'react'

import './App.css'
// import { authContext } from './contexts/AuthConext';
import {BrowserRouter , Route , Routes} from 'react-router-dom';
import LandingPage from './pages/landing';
import Authentication from './pages/authentication';
// import AuthProvider from './contexts/AuthProvider';
import { AuthProvider } from './contexts/AuthContext';
import VideoMeet from './pages/VideoMeet';
import StateDemo from '../StateDemo';
import RefDemo from '../RefDemo';

function App() {
 

  return (
    <>
     
       
   
       <BrowserRouter>
         <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/auth" element={<Authentication/>}/>
          <Route path="/:url" element={<VideoMeet/>}/>
          <Route path="/state" element={<StateDemo/>}/>
          <Route path="/ref" element={<RefDemo/>}/>
        </Routes>
         </AuthProvider>

      </BrowserRouter>
     
    
    </>
  )
}

export default App
