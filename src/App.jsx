import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import LoginPage from './pages/LoginPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import DocumentRequestPage from './pages/DocumentRequestPage.jsx'
import GradesPage from './pages/GradesPage.jsx'
import EnrollmentPage from './pages/EnrollmentPage.jsx'
import ClearancePage from './pages/ClearancePage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import MainLayout from './layouts/MainLayout.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="document-request" element={<DocumentRequestPage />} />
            <Route path="grades" element={<GradesPage />} />
            <Route path="enrollment" element={<EnrollmentPage />} />
            <Route path="clearance" element={<ClearancePage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
