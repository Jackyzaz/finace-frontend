import "./App.css";
import { Route, Routes } from "react-router";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import ProfilePage from "./pages/Profile";
import { AuthProvider } from "./context/useAuth";
import { ProtectedRoute } from "./context/ProtectedRoute";
import { Layout } from "antd";
import HeaderNavbar from "./components/HeaderNavbar";
import DashboardPage from "./pages/Dashboard";

function App() {
  return (
    <Layout>
      <HeaderNavbar />
      <Content />
    </Layout>
  );
}

function Content() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
