import React from "react";
import { BrowserRouter , Routes ,Route, Navigate } from "react-router-dom";
import HomePage from "scenes/homePage/index.jsx";
import AdminPage from "scenes/adminPage/index.jsx";
import LoginPage from "scenes/loginPage/LoginPage";
import ProfilePage from "scenes/profilePage/index.jsx";
import { CssBaseline , ThemeProvider } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";
import Navbar from "scenes/navbar";

//pushing to main for vercel

function App() {
  const isAdmin = Boolean(useSelector((state) => state.admin));
  console.log(isAdmin + " is")
  const mode = useSelector((state)=> state.mode);
  const theme = useMemo(()=>createTheme(themeSettings(mode)) , [mode]);
   
  return (
    <div className="app">
     <BrowserRouter>
     <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route
            path="/admin"
            element={isAdmin ? <AdminPage /> : <Navigate to="/home" />}
          />
        <Route path="/" element={<LoginPage />} /> 
            
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/navbar" element={<Navbar />} />
      </Routes>
     </ThemeProvider>
     </BrowserRouter>
    </div>
  );
}

export default App;
