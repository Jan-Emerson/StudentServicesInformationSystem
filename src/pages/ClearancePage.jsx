import { CheckCircle, Clock, AlertCircle, CheckSquare } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { mockClearanceItems } from '../data/mockData.js'

const StatusIcon = ({ status }) => {
  if (status === 'Cleared') return <CheckCircle size={18} className="text-green-500" />
  return <Clock size={18} className="text-amber-500" />
}

export default function ClearancePage() {
  const { user } = useAuth()
  const clearedCount = mockClearanceItems.filter(c => c.status === 'Cleared').length
  const pendingCount = mockClearanceItems.filter(c => c.status === 'Pending').length
  const isFullyCleared = pendingCount === 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Clearance</h1>
        <p className="text-gray-500 text-sm mt-1">2nd Semester AY 2024–2025 | {user?.name}</p>
      </div>

      {/* Overall status */}
      <div className={`card p-5 border-l-4 ${isFullyCleared ? 'border-green-500' : 'border-amber-400'}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-gray-800 flex items-center gap-2">
              {isFullyCleared
                ? <><CheckCircle size={18} className="text-green-500" /> Overall Status: <span className="text-green-600">CLEARED</span></>
                : <><AlertCircle size={18} className="text-amber-500" /> Overall Status: <span className="text-amber-600">PENDING ({pendingCount} remaining)</span></>
              }
            </p>
            <p className="text-sm text-gray-500 mt-1">{clearedCount} of {mockClearanceItems.length} departments cleared</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-800">
              {Math.round((clearedCount / mockClearanceItems.length) * 100)}%
            </div>
            <p className="text-xs text-gray-500">Completion</p>
          </div>
        </div>
        {/* Progress bar */}
        <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${isFullyCleared ? 'bg-green-500' : 'bg-amber-400'}`}
            style={{ width: `${(clearedCount / mockClearanceItems.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Clearance list */}
      <div className="card p-6">
        <h2 className="font-semibold text-gray-800 mb-4 text-sm uppercase tracking-wider">Department Clearances</h2>
        <div className="space-y-3">
          {mockClearanceItems.map((item, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${
                item.status === 'Cleared'
                  ? 'bg-green-50 border-green-200'
                  : 'bg-amber-50 border-amber-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <StatusIcon status={item.status} />
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{item.department}</p>
                  {item.clearedBy && (
                    <p className="text-xs text-gray-500 mt-0.5">Cleared by: {item.clearedBy} · {item.date}</p>
                  )}
                </div>
              </div>
              <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                item.status === 'Cleared'
                  ? 'bg-green-200 text-green-800'
                  : 'bg-amber-200 text-amber-800'
              }`}>
                {item.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-5 bg-blue-50 border border-blue-200">
        <p className="text-sm text-blue-800">
          <span className="font-semibold">Reminder:</span> Complete all department clearances before requesting your Transcript of Records or Certificate of Graduation. Visit the respective department offices for pending clearances.
        </p>
      </div>
    </div>
  )
}
