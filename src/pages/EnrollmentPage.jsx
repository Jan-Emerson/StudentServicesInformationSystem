import { ClipboardList, Calendar, MapPin, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { mockEnrolledSubjects } from '../data/mockData.js'

export default function EnrollmentPage() {
  const { user } = useAuth()
  const totalUnits = mockEnrolledSubjects.reduce((s, sub) => s + sub.units, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Enrollment</h1>
        <p className="text-gray-500 text-sm mt-1">2nd Semester AY 2024–2025</p>
      </div>

      {/* Enrollment status banner */}
      <div className="card p-5 border-l-4 border-green-500">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
            <ClipboardList size={20} className="text-green-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-800">Enrollment Status: <span className="text-green-600">OFFICIALLY ENROLLED</span></p>
            <p className="text-sm text-gray-500 mt-0.5">
              {user?.name} — {user?.course} | {user?.year} | {totalUnits} Units
            </p>
          </div>
        </div>
      </div>

      {/* Enrolled subjects */}
      <div className="card p-6">
        <h2 className="font-semibold text-gray-800 mb-4 text-sm uppercase tracking-wider">Enrolled Subjects</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" aria-label="Enrolled Subjects Table">
            <thead>
              <tr className="border-b-2 border-gray-200">
                {['Subject Code', 'Subject Name', 'Units', 'Schedule', 'Room', 'Instructor'].map(h => (
                  <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockEnrolledSubjects.map(sub => (
                <tr key={sub.subjectCode} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-3 font-mono text-xs text-blue-700 font-semibold">{sub.subjectCode}</td>
                  <td className="py-3 px-3 text-gray-800">{sub.subjectName}</td>
                  <td className="py-3 px-3 text-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
                      {sub.units}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1.5 text-gray-600 text-xs">
                      <Calendar size={13} />
                      {sub.schedule}
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1.5 text-gray-600 text-xs">
                      <MapPin size={13} />
                      {sub.room}
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1.5 text-gray-600 text-xs">
                      <User size={13} />
                      {sub.instructor}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-gray-200 bg-gray-50">
                <td colSpan={2} className="py-3 px-3 text-sm font-semibold text-gray-700">Total Units</td>
                <td className="py-3 px-3 text-center font-bold text-blue-700">{totalUnits}</td>
                <td colSpan={3} />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Notice */}
      <div className="card p-5 bg-amber-50 border border-amber-200">
        <p className="text-sm text-amber-800">
          <span className="font-semibold">Note:</span> For changes in enrollment (adding/dropping of subjects), please visit the Registrar's Office or contact your Dean's Office before the end of the enrollment adjustment period.
        </p>
      </div>
    </div>
  )
}
