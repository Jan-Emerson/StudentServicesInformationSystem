import { BookOpen, TrendingUp, Award } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { mockGrades } from '../data/mockData.js'

const GradeColor = ({ grade }) => {
  const g = parseFloat(grade)
  if (g <= 1.5) return <span className="text-green-600 font-bold">{grade}</span>
  if (g <= 2.0) return <span className="text-blue-600 font-bold">{grade}</span>
  if (g <= 2.5) return <span className="text-amber-600 font-bold">{grade}</span>
  return <span className="text-red-600 font-bold">{grade}</span>
}

export default function GradesPage() {
  const { user } = useAuth()
  const totalUnits = mockGrades.reduce((s, g) => s + g.units, 0)
  const gwa = (
    mockGrades.reduce((s, g) => s + parseFloat(g.finalGrade) * g.units, 0) / totalUnits
  ).toFixed(2)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">My Grades</h1>
        <p className="text-gray-500 text-sm mt-1">1st Semester AY 2024–2025</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center">
            <BookOpen size={20} className="text-white" />
          </div>
          <div>
            <p className="text-xl font-bold text-gray-900">{totalUnits}</p>
            <p className="text-sm text-gray-500">Total Units</p>
          </div>
        </div>
        <div className="card p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-green-600 flex items-center justify-center">
            <TrendingUp size={20} className="text-white" />
          </div>
          <div>
            <p className="text-xl font-bold text-gray-900">{gwa}</p>
            <p className="text-sm text-gray-500">GWA (this term)</p>
          </div>
        </div>
        <div className="card p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-purple-600 flex items-center justify-center">
            <Award size={20} className="text-white" />
          </div>
          <div>
            <p className="text-xl font-bold text-gray-900">{mockGrades.filter(g => g.remarks === 'PASSED').length}/{mockGrades.length}</p>
            <p className="text-sm text-gray-500">Subjects Passed</p>
          </div>
        </div>
      </div>

      {/* Grades table */}
      <div className="card p-6">
        <h2 className="font-semibold text-gray-800 mb-4 text-sm uppercase tracking-wider">Grade Report</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" aria-label="Grades Table">
            <thead>
              <tr className="border-b-2 border-gray-200">
                {['Subject Code', 'Subject Name', 'Units', 'Midterm', 'Finals', 'Final Grade', 'Remarks'].map(h => (
                  <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockGrades.map(g => (
                <tr key={g.subjectCode} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-3 font-mono text-xs text-blue-700 font-semibold">{g.subjectCode}</td>
                  <td className="py-3 px-3 text-gray-800">{g.subjectName}</td>
                  <td className="py-3 px-3 text-center text-gray-600">{g.units}</td>
                  <td className="py-3 px-3 text-center text-gray-700">{g.midterm}</td>
                  <td className="py-3 px-3 text-center text-gray-700">{g.finals}</td>
                  <td className="py-3 px-3 text-center">
                    <GradeColor grade={g.finalGrade} />
                  </td>
                  <td className="py-3 px-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${g.remarks === 'PASSED' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {g.remarks}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
          <div className="text-sm text-gray-600">
            Computed GWA: <span className="font-bold text-gray-900 text-base">{gwa}</span>
          </div>
        </div>
      </div>

      {/* Grade legend */}
      <div className="card p-5">
        <h3 className="font-semibold text-gray-700 text-sm mb-3">Grade Legend</h3>
        <div className="flex flex-wrap gap-4 text-xs">
          <span className="text-green-600 font-semibold">1.00–1.50 = Excellent</span>
          <span className="text-blue-600 font-semibold">1.75–2.00 = Very Good</span>
          <span className="text-amber-600 font-semibold">2.25–2.50 = Good</span>
          <span className="text-orange-600 font-semibold">2.75–3.00 = Satisfactory</span>
          <span className="text-red-600 font-semibold">5.00 = Failed</span>
        </div>
      </div>
    </div>
  )
}
