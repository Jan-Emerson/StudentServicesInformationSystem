import { Bell, Settings, Menu } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { useState } from 'react'
import { mockActivityFeed } from '../data/mockData.js'

export default function Navbar({ onToggleSidebar }) {
  const { user } = useAuth()
  const [showNotifs, setShowNotifs] = useState(false)
  const unreadCount = mockActivityFeed.filter(a => !a.read).length

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-5 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="text-gray-500 hover:text-gray-700 lg:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
        <div>
          <p className="text-sm font-semibold text-gray-800">{user?.studentNumber}</p>
          <p className="text-xs text-gray-400">{user?.course} | {user?.year}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Notification bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifs(v => !v)}
            className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
            aria-label="Notifications"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifs && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="font-semibold text-gray-800 text-sm">Notifications</p>
              </div>
              <ul>
                {mockActivityFeed.map(item => (
                  <li
                    key={item.id}
                    className={`px-4 py-3 border-b border-gray-50 last:border-0 ${!item.read ? 'bg-blue-50/50' : ''}`}
                  >
                    <p className={`text-sm ${!item.read ? 'text-gray-800 font-medium' : 'text-gray-600'}`}>
                      {item.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{item.time}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <button className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors" aria-label="Settings">
          <Settings size={20} />
        </button>

        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold ml-1">
          {user?.avatar || 'S'}
        </div>
      </div>
    </header>
  )
}
