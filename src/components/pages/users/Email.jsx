"use client"

import { useEffect, useState } from "react"
import { X, Paperclip, Maximize2, Minimize2, Send } from "lucide-react"

const EmailModal = ({ mailModelOpen, setMailModelOpen, emailIdentities = [], onSendEmail, to: initialTo }) => {
  const [form, setForm] = useState({
    fromIndex: {
      from: "",
      pass: "",
    },
    to: "",
    subject: "",
    message: "",
  })

  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    if (initialTo && mailModelOpen) {
      setForm((prev) => ({
        ...prev,
        to: initialTo,
      }))
    }
  }, [initialTo, mailModelOpen])

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSend = () => {
    if (onSendEmail) onSendEmail(form)
    setMailModelOpen(false)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <>
      {mailModelOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4">
          <div
            className={`bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-200 ${
              isFullscreen ? "fixed inset-4" : "w-full max-w-xl"
            }`}
          >
            {/* Email header */}
            <div className="bg-gray-100 px-4 py-3 border-b flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-800">New Message</h2>
              <div className="flex items-center gap-2">
                <button onClick={toggleFullscreen} className="p-1.5 rounded-full hover:bg-gray-200 transition-colors">
                  {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                </button>
                <button
                  onClick={() => setMailModelOpen(false)}
                  className="p-1.5 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="p-5">
              {/* From */}
              <div className="mb-4">
                <div className="flex items-center mb-1.5">
                  <label className="text-sm font-medium text-gray-700 w-16">From</label>
                  <select
                    name="fromIndex"
                    value={form.fromIndex}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  >
                    <option value="">Select sender email</option>
                    {emailIdentities.map((identity, index) => (
                      <option
                        key={index}
                        value={JSON.stringify({
                          fromEmail: identity.fromEmail,
                          pass: identity.pass,
                          user: identity.user || identity.fromEmail,
                        })}
                      >
                        {identity.name} ({identity.fromEmail})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* To */}
              <div className="mb-4">
                <div className="flex items-center mb-1.5">
                  <label className="text-sm font-medium text-gray-700 w-16">To</label>
                  <input
                    type="email"
                    name="to"
                    value={form.to}
                    onChange={handleChange}
                    placeholder="recipient@example.com"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="mb-4">
                <div className="flex items-center mb-1.5">
                  <label className="text-sm font-medium text-gray-700 w-16">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {/* Message */}
              <div className="mb-5">
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={10}
                  placeholder="Write your message here..."
                  className="w-full border border-gray-300 rounded-md py-3 px-4 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                  required
                />
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center">
                  <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                    <Paperclip size={18} />
                  </button>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setMailModelOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSend}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors flex items-center gap-2"
                  >
                    <Send size={16} />
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default EmailModal
