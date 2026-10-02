import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  ClipboardList,
  CheckSquare,
  User,
  LogOut,
  GraduationCap,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/document-request', icon: FileText, label: 'Document Request' },
  { to: '/grades', icon: BookOpen, label: 'My Grades' },
  { to: '/enrollment', icon: ClipboardList, label: 'Enrollment' },
  { to: '/clearance', icon: CheckSquare, label: 'Clearance' },
  { to: '/profile', icon: User, label: 'My Profile' },
]

export default function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <aside className="w-64 min-h-screen bg-navy-800 flex flex-col" style={{ backgroundColor: '#0d1f3c' }}>
      {/* Logo / Branding */}
      <div className="px-5 py-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gold-400 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#f5c842' }}>
            <GraduationCap size={20} color="#0d1f3c" />
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-tight">CuyoTech University</p>
            <p className="text-blue-300 text-xs mt-0.5">Student Services IS</p>
          </div>
        </div>
      </div>

      {/* Student Info */}
      <div className="px-5 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {user?.avatar || 'S'}
          </div>
          <div className="overflow-hidden">
            <p className="text-white text-sm font-semibold truncate">{user?.name}</p>
            <p className="text-blue-300 text-xs truncate">{user?.studentNumber}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-blue-100 hover:bg-white/10'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-6">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-300 hover:bg-red-500/10 hover:text-red-200 transition-all duration-200"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  )
}
