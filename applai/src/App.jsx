import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Applications from "@/pages/Applications";
import Interviews from "@/pages/Interviews";
import ProtectedRoute from "@/routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          {/* Layout wraps the main pages */}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/interviews" element={<Interviews />} />
            {/* redirect root to dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;