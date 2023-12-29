import {Navigate, Outlet, useLocation} from 'react-router-dom'

export default function Protect() {
    const location = useLocation()
  return (
    <div>
        {location.state !== null ? <Outlet /> : <Navigate to='/forgot-password' />}
    </div>
  )
}
