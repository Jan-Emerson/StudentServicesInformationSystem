import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, GraduationCap, AlertCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'

export default function LoginPage() {
  const [studentNumber, setStudentNumber] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!studentNumber.trim()) {
      setError('Please enter your student number.')
      return
    }
    if (!password) {
      setError('Please enter your password.')
      return
    }

    setLoading(true)
    // Simulate network delay
    await new Promise(r => setTimeout(r, 800))
    const result = login(studentNumber.trim(), password)
    setLoading(false)

    if (result.success) {
      navigate('/dashboard')
    } else {
      setError(result.message || 'Invalid credentials. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#0d1f3c' }}>
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center px-16 text-white">
        <div className="max-w-sm text-center">
          <div className="w-24 h-24 rounded-full bg-white/10 border-2 border-gold-400 flex items-center justify-center mx-auto mb-8" style={{ borderColor: '#f5c842' }}>
            <GraduationCap size={48} color="#f5c842" />
          </div>
          <h1 className="text-3xl font-bold mb-3">CuyoTech University</h1>
          <p className="text-blue-200 text-base leading-relaxed">
            Student Services Information System
          </p>
          <div className="mt-10 space-y-3 text-left">
            {['Enrollment & Registration', 'Grade Viewing', 'Document Requests', 'Clearance Processing'].map(f => (
              <div key={f} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#f5c842' }} />
                <span className="text-blue-100 text-sm">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — login form */}
      <div className="flex-1 flex items-center justify-center px-6 bg-white lg:rounded-l-3xl">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0d1f3c' }}>
              <GraduationCap size={20} color="#f5c842" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">CuyoTech University</p>
              <p className="text-gray-500 text-xs">Student Services IS</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Student Login</h2>
            <p className="text-gray-500 text-sm mt-1">Sign in to access your student portal</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* Error message */}
            {error && (
              <div className="mb-5 flex items-start gap-2.5 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
                <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="mb-4">
              <label htmlFor="studentNumber" className="form-label">
                Student Number
              </label>
              <input
                id="studentNumber"
                type="text"
                placeholder="e.g. 2024-00001"
                value={studentNumber}
                onChange={e => setStudentNumber(e.target.value)}
                className="form-input"
                autoComplete="username"
                aria-label="Student Number"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="form-input pr-11"
                  autoComplete="current-password"
                  aria-label="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg text-white font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#0d1f3c' }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                'LOGIN'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="#" className="text-sm text-blue-600 hover:underline">Forgot Password?</a>
          </div>

          <div className="mt-3 text-center">
            <p className="text-xs text-gray-400">
              Don't have an account?{' '}
              <a href="#" className="text-blue-600 hover:underline">Contact Registrar</a>
            </p>
          </div>

          {/* Demo hint */}
          <div className="mt-8 p-3 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-xs text-amber-700 font-medium">Demo Credentials</p>
            <p className="text-xs text-amber-600 mt-1">Student No: <strong>2024-00001</strong> | Password: <strong>password123</strong></p>
          </div>
        </div>
      </div>
    </div>
  )
}
