import { MantineProvider } from '@mantine/core'
import { Navigate, Route, Routes } from 'react-router-dom'
import { UserProvider } from './contexts/user'
import { AuthGuard } from './guards'
import {
  LoginPage,
  RegisterPage,
  DashboardScansIndexPage,
  DashboardScansIdViewPage,
  DashboardScansNewPage,
  DashboardScansIdIndexPage,
  DashboardSettingsPage,
  DashboardScansOldPage,
} from './pages'

export const App = () => (
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <UserProvider>
      <Routes>
        <Route index element={<Navigate to="/auth/login" replace />} />
        <Route path="auth">
          <Route index element={<Navigate to="/auth/login" />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
        <Route path="dashboard" element={<AuthGuard />}>
          <Route index element={<Navigate to="/dashboard/scans" replace />} />
          <Route path="settings" element={<DashboardSettingsPage />} />
          <Route path="scans">
            <Route index element={<DashboardScansIndexPage />} />
            <Route path="new" element={<DashboardScansNewPage />} />
            <Route path="old" element={<DashboardScansOldPage />} />
            <Route path=":scanId">
              <Route index element={<DashboardScansIdIndexPage />} />
              <Route path="view" element={<DashboardScansIdViewPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </UserProvider>
  </MantineProvider>
)
