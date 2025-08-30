import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/layout/Layout.jsx";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Applications from "@/pages/Applications";
import Interviews from "@/pages/Interviews";
import ProtectedRoute from "@/routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes with Layout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route index element={<Dashboard />} />           {/* / */}
            <Route path="dashboard" element={<Dashboard />} /> 
            <Route path="applications" element={<Applications />} />
            <Route path="interviews" element={<Interviews />} />
          </Route>
        </Route>

        {/* Catch-all redirects */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;