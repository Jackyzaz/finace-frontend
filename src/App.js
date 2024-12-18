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
import { Header } from "antd/es/layout/layout";

function App() {
  return (
    <Layout>
      <Content />
    </Layout>
  );
}

function Content() {
  return (
    <AuthProvider>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <HeaderNavbar />
      </Header>
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
