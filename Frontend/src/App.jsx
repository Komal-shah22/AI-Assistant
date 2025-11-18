import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/Signin';
import SignUp from './pages/Signup';
import { useContext } from 'react';
import { userdatacontext } from './context/userContext';
import Home from './pages/Home';
import Customize from './pages/customize';
import Customize_2 from './pages/Customize_2';

function App() {
  const { userData } = useContext(userdatacontext);

  return (
    <Routes>

      {/* Home Route */}
      <Route
        path="/"
        element={
          userData?.assistantImage && userData?.assistantName
            ? <Home />
            : <Navigate to="/customize" />
        }
      />

      {/* Sign In – always accessible */}
      <Route path="/signin" element={<SignIn />} />

      {/* Sign Up – always accessible */}
      <Route path="/signup" element={<SignUp />} />

      {/* Customize */}
      <Route
        path="/customize"
        element={userData ? <Customize /> : <Navigate to="/signup" />}
      />

      {/* Customize Step 2 */}
      <Route
        path="/customize_2"
        element={userData ? <Customize_2 /> : <Navigate to="/signup" />}
      />

      {/* Extra Home Route */}
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;

