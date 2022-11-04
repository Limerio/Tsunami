import { Navigate, useLocation } from 'react-router-dom'

export function DashboardScansIdIndexPage() {
  const location = useLocation()
  return <Navigate to={location?.pathname + '/view'} />
}
