import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Contact from "./pages/Contact.jsx";
import Forecast from "./pages/Forecast.jsx";
import Location from "./pages/Location.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Index from "./pages/Index.jsx";
import Profile from "./pages/Profile.jsx";

import { WeatherProvider } from "./context/WeatherContext";
import { UserProvider } from "./context/UserContext.jsx";
import Policy from "./pages/Policy.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      
      {/* public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/help" element={<Contact />} />
      <Route path="/privacy-policy" element={<Policy />} />

      {/* App routes (protected layout) */}
      <Route path="/app" element={<Index />}>
        <Route index element={<Home />} />

        <Route
          path="forecast"
          element={
            <ProtectedRoute>
              <Forecast />
            </ProtectedRoute>
          }
        />

        <Route
          path="search"
          element={
            <ProtectedRoute>
              <Location />
            </ProtectedRoute>
          }
        />

        <Route
          path="search/:cityname"
          element={
            <ProtectedRoute>
              <Location />
            </ProtectedRoute>
          }
        />

        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* fallback route */}
      <Route path="*" element={<div>404 Not Found</div>} />
    
    </>,
  ),
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <UserProvider>
      <WeatherProvider>
        <RouterProvider router={router} />
      </WeatherProvider>
      </UserProvider>
    </AuthProvider>
  </StrictMode>,
);
