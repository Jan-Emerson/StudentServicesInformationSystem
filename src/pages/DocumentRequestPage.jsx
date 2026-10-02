import { useState } from 'react'
import { FileText, Plus, X, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { mockDocumentRequests, mockDocumentTypes } from '../data/mockData.js'
import { useAuth } from '../context/AuthContext.jsx'

const StatusBadge = ({ status }) => {
  const map = {
    Released: { cls: 'bg-green-100 text-green-700', icon: CheckCircle },
    Processing: { cls: 'bg-blue-100 text-blue-700', icon: Clock },
    Pending: { cls: 'bg-amber-100 text-amber-700', icon: AlertCircle },
  }
  const { cls, icon: Icon } = map[status] || { cls: 'bg-gray-100 text-gray-600', icon: null }
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${cls}`}>
      {Icon && <Icon size={11} />}
      {status}
    </span>
  )
}

export default function DocumentRequestPage() {
  const { user } = useAuth()
  const [requests, setRequests] = useState(mockDocumentRequests)
  const [docType, setDocType] = useState('')
  const [qty, setQty] = useState(1)
  const [purpose, setPurpose] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [formError, setFormError] = useState('')

  const selectedDoc = mockDocumentTypes.find(d => d.value === docType)
  const totalAmount = selectedDoc ? selectedDoc.price * qty : 0

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError('')

    if (!docType) { setFormError('Please select a document type.'); return }
    if (qty < 1) { setFormError('Quantity must be at least 1.'); return }
    if (!purpose.trim()) { setFormError('Please state the purpose of your request.'); return }

    const newReq = {
      id: `REQ-2024-${String(requests.length + 4).padStart(3, '0')}`,
      type: selectedDoc.label,
      qty,
      requestDate: new Date().toISOString().split('T')[0],
      releaseDate: null,
      status: 'Pending',
      amount: totalAmount,
    }

    setRequests(prev => [newReq, ...prev])
    setSubmitted(true)
    setDocType('')
    setQty(1)
    setPurpose('')

    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">Document Request Page</h1>
        <p className="text-gray-500 text-sm mt-1">
          Student: {user?.name} | Student No. {user?.studentNumber} | {user?.course}
        </p>
      </div>

      {submitted && (
        <div className="flex items-center gap-2.5 bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 text-sm">
          <CheckCircle size={16} className="flex-shrink-0" />
          Your document request has been submitted successfully! Please wait for processing.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Request Form */}
        <div className="lg:col-span-2">
          <div className="card p-6">
            <h2 className="font-semibold text-gray-800 mb-5 flex items-center gap-2">
              <FileText size={18} className="text-blue-600" />
              New Document Request
            </h2>

            <form onSubmit={handleSubmit} noValidate>
              {formError && (
                <div className="mb-4 flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
                  <AlertCircle size={15} />
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="form-label">Document Type</label>
                  <select
                    value={docType}
                    onChange={e => setDocType(e.target.value)}
                    className="form-input bg-white"
                    aria-label="Document Type"
                  >
                    <option value="">— Select Document —</option>
                    {mockDocumentTypes.map(d => (
                      <option key={d.value} value={d.value}>
                        {d.label} (₱{d.price})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="form-label">Number of Copies</label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={qty}
                    onChange={e => setQty(Number(e.target.value))}
                    className="form-input"
                    aria-label="Number of Copies"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label">Purpose</label>
                <textarea
                  value={purpose}
                  onChange={e => setPurpose(e.target.value)}
                  placeholder="State the purpose of your request..."
                  rows={3}
                  className="form-input resize-none"
                  aria-label="Purpose"
                />
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  {selectedDoc
                    ? `${selectedDoc.label} × ${qty} = `
                    : 'Select a document to see the amount'}
                  {selectedDoc && <span className="font-bold text-gray-800">₱{totalAmount.toFixed(2)}</span>}
                </p>
                <button type="submit" className="btn-primary flex items-center gap-2">
                  <Plus size={16} />
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Request Summary card */}
        <div>
          <div className="card p-6">
            <h2 className="font-semibold text-gray-800 mb-4">Request Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Student Requests</span>
                <span className="font-semibold">{requests.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Pending</span>
                <span className="font-semibold text-amber-600">
                  {requests.filter(r => r.status === 'Pending').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Processing</span>
                <span className="font-semibold text-blue-600">
                  {requests.filter(r => r.status === 'Processing').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Released</span>
                <span className="font-semibold text-green-600">
                  {requests.filter(r => r.status === 'Released').length}
                </span>
              </div>
              <hr className="border-gray-100" />
              <div className="flex justify-between font-semibold">
                <span className="text-gray-700">Total Amount</span>
                <span className="text-gray-900">
                  ₱{requests.reduce((sum, r) => sum + r.amount, 0).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* My Document Requests table */}
      <div className="card p-6">
        <h2 className="font-semibold text-gray-800 mb-4 text-sm uppercase tracking-wider">My Document Requests</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" role="table" aria-label="Document Requests Table">
            <thead>
              <tr className="border-b border-gray-100">
                {['Request ID', 'Document Type', 'Qty', 'Request Date', 'Release Date', 'Status', 'Amount'].map(h => (
                  <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {requests.map(req => (
                <tr key={req.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-3 text-xs font-mono text-gray-600">{req.id}</td>
                  <td className="py-3 px-3 text-sm text-gray-800">{req.type}</td>
                  <td className="py-3 px-3 text-sm text-center text-gray-600">{req.qty}</td>
                  <td className="py-3 px-3 text-sm text-gray-500">{req.requestDate}</td>
                  <td className="py-3 px-3 text-sm text-gray-500">{req.releaseDate || '—'}</td>
                  <td className="py-3 px-3"><StatusBadge status={req.status} /></td>
                  <td className="py-3 px-3 text-sm font-semibold text-gray-700">₱{req.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
