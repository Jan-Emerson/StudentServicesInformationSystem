import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('ssis_user')
    return stored ? JSON.parse(stored) : null
  })

  const login = (studentNumber, password) => {
    // Mock authentication — accepts any valid-format credentials
    const mockUsers = {
      '2024-00001': { name: 'Juan Dela Cruz', studentNumber: '2024-00001', course: 'BS Computer Science', year: '3rd Year', email: 'juan.delacruz@cuyotech.edu.ph', avatar: 'JD' },
      '2023-10042': { name: 'Maria Santos', studentNumber: '2023-10042', course: 'BS Information Technology', year: '2nd Year', email: 'maria.santos@cuyotech.edu.ph', avatar: 'MS' },
    }

    const found = mockUsers[studentNumber]
    if (found && password === 'password123') {
      localStorage.setItem('ssis_user', JSON.stringify(found))
      setUser(found)
      return { success: true }
    }
    // Accept any student number with password "password123" for demo
    if (password === 'password123') {
      const demo = {
        name: 'Demo Student',
        studentNumber,
        course: 'BS Computer Science',
        year: '1st Year',
        email: `${studentNumber.replace('-', '')}@cuyotech.edu.ph`,
        avatar: studentNumber.slice(0, 2).toUpperCase(),
      }
      localStorage.setItem('ssis_user', JSON.stringify(demo))
      setUser(demo)
      return { success: true }
    }
    return { success: false, message: 'Invalid student number or password.' }
  }

  const logout = () => {
    localStorage.removeItem('ssis_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
