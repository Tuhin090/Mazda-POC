import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ConnectedServices from "./pages/ConnectedServices";
import Support from "./pages/Support";

function PrivateRoute({ children }) {
  const token = sessionStorage.getItem("mazda_auth");
  if (!token) return <Navigate to="/" replace />;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.exp * 1000 < Date.now()) {
      sessionStorage.removeItem("mazda_auth");
      return <Navigate to="/" replace />;
    }
  } catch {
    sessionStorage.removeItem("mazda_auth");
    return <Navigate to="/" replace />;
  }

  return children;
}

function AuthHandoff() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("t");
    if (token) {
      sessionStorage.setItem("mazda_auth", decodeURIComponent(token));
    }
    navigate("/dashboard", { replace: true });
  }, []);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/auth" element={<AuthHandoff />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/connected-services" element={<PrivateRoute><ConnectedServices /></PrivateRoute>} />
        <Route path="/support" element={<PrivateRoute><Support /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
