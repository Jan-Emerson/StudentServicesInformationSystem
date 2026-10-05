import { useNavigate } from 'react-router-dom'
import {
  FileText,
  BookOpen,
  ClipboardList,
  CheckSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { mockDocumentRequests, mockActivityFeed, mockClearanceItems } from '../data/mockData.js'

const StatCard = ({ label, value, color, icon: Icon }) => (
  <div className={`card p-5 flex items-center gap-4`}>
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
      <Icon size={22} className="text-white" />
    </div>
    <div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  </div>
)

const QuickActionBtn = ({ icon: Icon, label, to, color, navigate }) => (
  <button
    onClick={() => navigate(to)}
    className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl text-white text-sm font-semibold transition-transform hover:scale-105 active:scale-95 shadow-sm ${color}`}
    aria-label={label}
  >
    <Icon size={22} />
    <span className="text-xs text-center leading-tight">{label}</span>
  </button>
)

const StatusBadge = ({ status }) => {
  const map = {
    Released: 'bg-green-100 text-green-700',
    Processing: 'bg-blue-100 text-blue-700',
    Pending: 'bg-amber-100 text-amber-700',
    Cleared: 'bg-green-100 text-green-700',
  }
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${map[status] || 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  )
}

export default function DashboardPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const clearedCount = mockClearanceItems.filter(c => c.status === 'Cleared').length
  const pendingDocs = mockDocumentRequests.filter(d => d.status === 'Pending' || d.status === 'Processing').length
  const gwa = '1.25'

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div
        className="rounded-2xl p-6 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0d1f3c 0%, #1a3260 100%)' }}
      >
        <div className="relative z-10">
          <p className="text-blue-200 text-sm mb-1">Welcome back,</p>
          <h1 className="text-2xl font-bold mb-1">Welcome to SSIS!</h1>
          <p className="text-blue-200 text-sm">
            University of CuyoTech Student Services Information System (SSIS)
          </p>
        </div>
        {/* Decorative circle */}
        <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/5 rounded-full" />
        <div className="absolute -right-4 -bottom-12 w-60 h-60 bg-white/5 rounded-full" />
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Units Enrolled" value="21" color="bg-blue-600" icon={BookOpen} />
        <StatCard label="GWA" value={gwa} color="bg-green-600" icon={TrendingUp} />
        <StatCard label="Status" value="CLEARED" color="bg-emerald-600" icon={CheckCircle} />
        <StatCard label="Pending Docs" value={pendingDocs} color="bg-amber-500" icon={Clock} />
      </div>

      {/* Quick Actions */}
      <div className="card p-5">
        <h2 className="font-semibold text-gray-800 mb-4 text-sm uppercase tracking-wider">Quick Actions</h2>
        <div className="grid grid-cols-4 gap-3">
          <QuickActionBtn icon={FileText} label="Request Document" to="/document-request" color="bg-blue-600" navigate={navigate} />
          <QuickActionBtn icon={ClipboardList} label="Enroll Now" to="/enrollment" color="bg-indigo-600" navigate={navigate} />
          <QuickActionBtn icon={CheckSquare} label="Get Cleared" to="/clearance" color="bg-green-600" navigate={navigate} />
          <QuickActionBtn icon={BookOpen} label="View Grades" to="/grades" color="bg-purple-600" navigate={navigate} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Feed */}
        <div className="card p-5">
          <h2 className="font-semibold text-gray-800 mb-4 text-sm uppercase tracking-wider">Activity Feed</h2>
          <ul className="space-y-3">
            {mockActivityFeed.map(item => (
              <li key={item.id} className={`flex items-start gap-3 p-3 rounded-lg ${!item.read ? 'bg-blue-50' : 'bg-gray-50'}`}>
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${!item.read ? 'bg-blue-500' : 'bg-gray-300'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700">{item.message}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Document Requests */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800 text-sm uppercase tracking-wider">My Document Requests</h2>
            <button
              onClick={() => navigate('/document-request')}
              className="text-xs text-blue-600 font-semibold hover:underline"
            >
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 px-1 text-xs font-semibold text-gray-500">Request ID</th>
                  <th className="text-left py-2 px-1 text-xs font-semibold text-gray-500">Document</th>
                  <th className="text-left py-2 px-1 text-xs font-semibold text-gray-500">Date</th>
                  <th className="text-left py-2 px-1 text-xs font-semibold text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockDocumentRequests.map(req => (
                  <tr key={req.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-2.5 px-1 text-xs text-gray-600 font-mono">{req.id}</td>
                    <td className="py-2.5 px-1 text-xs text-gray-700 max-w-[120px] truncate">{req.type}</td>
                    <td className="py-2.5 px-1 text-xs text-gray-500">{req.requestDate}</td>
                    <td className="py-2.5 px-1"><StatusBadge status={req.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
