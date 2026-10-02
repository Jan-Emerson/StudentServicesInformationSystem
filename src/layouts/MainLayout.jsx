import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from '../components/Sidebar.jsx'
import Navbar from '../components/Navbar.jsx'

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'block' : 'hidden'} lg:block flex-shrink-0`}>
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar onToggleSidebar={() => setSidebarOpen(v => !v)} />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
