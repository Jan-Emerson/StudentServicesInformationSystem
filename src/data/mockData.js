export const mockGrades = [
  { subjectCode: 'CS301', subjectName: 'Data Structures and Algorithms', units: 3, midterm: 88, finals: 91, finalGrade: '1.50', remarks: 'PASSED' },
  { subjectCode: 'CS302', subjectName: 'Object-Oriented Programming', units: 3, midterm: 92, finals: 95, finalGrade: '1.25', remarks: 'PASSED' },
  { subjectCode: 'CS303', subjectName: 'Database Management Systems', units: 3, midterm: 85, finals: 87, finalGrade: '1.75', remarks: 'PASSED' },
  { subjectCode: 'CS304', subjectName: 'Computer Networks', units: 3, midterm: 78, finals: 82, finalGrade: '2.00', remarks: 'PASSED' },
  { subjectCode: 'GE001', subjectName: 'Purposive Communication', units: 3, midterm: 90, finals: 88, finalGrade: '1.50', remarks: 'PASSED' },
  { subjectCode: 'GE002', subjectName: 'Mathematics in the Modern World', units: 3, midterm: 75, finals: 80, finalGrade: '2.25', remarks: 'PASSED' },
]

export const mockDocumentRequests = [
  { id: 'REQ-2024-001', type: 'Transcript of Records', qty: 1, requestDate: '2024-01-15', releaseDate: '2024-01-22', status: 'Released', amount: 150.00 },
  { id: 'REQ-2024-002', type: 'Certificate of Enrollment', qty: 2, requestDate: '2024-02-10', releaseDate: '2024-02-17', status: 'Processing', amount: 100.00 },
  { id: 'REQ-2024-003', type: 'Certificate of Graduation', qty: 1, requestDate: '2024-03-01', releaseDate: null, status: 'Pending', amount: 200.00 },
]

export const mockDocumentTypes = [
  { value: 'TOR', label: 'Transcript of Records', price: 150 },
  { value: 'COR', label: 'Certificate of Registration', price: 50 },
  { value: 'COE', label: 'Certificate of Enrollment', price: 50 },
  { value: 'COG', label: 'Certificate of Graduation', price: 200 },
  { value: 'DIPLOMA', label: 'Diploma', price: 500 },
  { value: 'GOOD_MORAL', label: 'Good Moral Certificate', price: 50 },
  { value: 'HONORABLE', label: 'Honorable Dismissal', price: 100 },
]

export const mockEnrolledSubjects = [
  { subjectCode: 'CS401', subjectName: 'Software Engineering', units: 3, schedule: 'MWF 7:30-8:30 AM', room: 'Room 301', instructor: 'Prof. Reyes' },
  { subjectCode: 'CS402', subjectName: 'Operating Systems', units: 3, schedule: 'TTH 10:30-12:00 PM', room: 'Room 205', instructor: 'Prof. Garcia' },
  { subjectCode: 'CS403', subjectName: 'Human-Computer Interaction', units: 3, schedule: 'MWF 1:00-2:00 PM', room: 'Room 102', instructor: 'Prof. Lim' },
  { subjectCode: 'CS404', subjectName: 'Capstone Project 1', units: 3, schedule: 'TTH 1:00-4:00 PM', room: 'Lab 401', instructor: 'Prof. Cruz' },
  { subjectCode: 'GE003', subjectName: 'Ethics', units: 3, schedule: 'MWF 9:00-10:00 AM', room: 'Room 110', instructor: 'Prof. Santos' },
]

export const mockClearanceItems = [
  { department: 'Library', status: 'Cleared', clearedBy: 'Ms. Alvarez', date: '2024-01-10' },
  { department: 'Cashier', status: 'Cleared', clearedBy: 'Mr. Bautista', date: '2024-01-12' },
  { department: 'Registrar', status: 'Pending', clearedBy: null, date: null },
  { department: 'Laboratory', status: 'Pending', clearedBy: null, date: null },
  { department: 'Guidance Office', status: 'Cleared', clearedBy: 'Ms. Villanueva', date: '2024-01-08' },
  { department: 'Dean\'s Office', status: 'Pending', clearedBy: null, date: null },
]

export const mockActivityFeed = [
  { id: 1, type: 'document', message: 'Your TOR request (REQ-2024-001) has been released.', time: '2 hours ago', read: false },
  { id: 2, type: 'enrollment', message: 'Enrollment for 2nd Semester AY 2024-2025 is now open.', time: '1 day ago', read: false },
  { id: 3, type: 'clearance', message: 'Library clearance has been approved.', time: '3 days ago', read: true },
  { id: 4, type: 'grade', message: 'Grades for 1st Semester AY 2024-2025 are now available.', time: '1 week ago', read: true },
]
