import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <div className="min-h-screen">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout