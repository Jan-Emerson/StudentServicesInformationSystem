import { User, Mail, Phone, MapPin, BookOpen, Calendar, Edit2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'

const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0">
    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
      <Icon size={15} className="text-gray-500" />
    </div>
    <div>
      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{label}</p>
      <p className="text-sm text-gray-800 font-medium mt-0.5">{value || '—'}</p>
    </div>
  </div>
)

export default function ProfilePage() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-500 text-sm mt-1">View and manage your student information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Avatar / summary */}
        <div className="card p-6 flex flex-col items-center text-center">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4"
            style={{ background: 'linear-gradient(135deg, #0d1f3c, #1a3260)' }}
          >
            {user?.avatar || 'S'}
          </div>
          <h2 className="text-lg font-bold text-gray-900">{user?.name}</h2>
          <p className="text-sm text-gray-500 mt-1">{user?.studentNumber}</p>
          <p className="text-xs text-gray-400 mt-1">{user?.course}</p>

          <div className="mt-5 w-full">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-xs text-gray-500">Year Level</span>
              <span className="text-xs font-semibold text-gray-700">{user?.year}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-xs text-gray-500">Status</span>
              <span className="text-xs font-semibold text-green-600">Active</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-xs text-gray-500">Semester</span>
              <span className="text-xs font-semibold text-gray-700">2nd Sem 2024-25</span>
            </div>
          </div>

          <button
            className="mt-5 flex items-center gap-2 w-full justify-center py-2.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
            aria-label="Edit profile"
          >
            <Edit2 size={14} />
            Edit Profile
          </button>
        </div>

        {/* Details */}
        <div className="lg:col-span-2 card p-6">
          <h2 className="font-semibold text-gray-800 mb-4 text-sm uppercase tracking-wider">Student Information</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
            <div>
              <InfoRow icon={User} label="Full Name" value={user?.name} />
              <InfoRow icon={BookOpen} label="Program" value={user?.course} />
              <InfoRow icon={Calendar} label="Year Level" value={user?.year} />
              <InfoRow icon={User} label="Student Number" value={user?.studentNumber} />
            </div>
            <div>
              <InfoRow icon={Mail} label="Email Address" value={user?.email} />
              <InfoRow icon={Phone} label="Contact Number" value="Not provided" />
              <InfoRow icon={MapPin} label="Address" value="Not provided" />
              <InfoRow icon={Calendar} label="Date Enrolled" value="June 2024" />
            </div>
          </div>

          <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-xs text-amber-700">
              <span className="font-semibold">Note:</span> To update your personal information, please visit the Registrar's Office and bring a valid ID. Changes to email or contact number can be requested in person.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
