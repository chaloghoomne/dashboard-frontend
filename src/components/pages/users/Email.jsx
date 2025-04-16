import { useEffect, useState } from "react";

const EmailModal = ({ mailModelOpen, setMailModelOpen, emailIdentities = [], onSendEmail ,to:initialTo}) => {
  const [form, setForm] = useState({
    fromIndex: {
      from: '',
    pass: '',},
    to: '' ,
    subject: '',
    message: ''
  });

  useEffect(() => {
    if (initialTo && mailModelOpen) {
      setForm((prev) => ({
        ...prev,
        to: initialTo
      }));
    }
  }, [initialTo, mailModelOpen]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSend = () => {
    if (onSendEmail) onSendEmail(form);
    
    setMailModelOpen(false);
  };

  return (
    <>
      {mailModelOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative">
            <h2 className="text-xl font-semibold mb-4">Send Email</h2>

            {/* From */}
            <label className="text-sm font-medium text-gray-600">From</label>
            <select
              name="fromIndex"
              value={form.fromIndex}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mb-4"
            ><option value="">Select sender email</option>
              {emailIdentities.map((identity, index) => (
                <option
      key={index}
      value={JSON.stringify({
        fromEmail: identity.fromEmail,
        pass: identity.pass,
        user: identity.user || identity.fromEmail, // optional user
      })}
    >
      {identity.name} ({identity.fromEmail})
    </option>
              ))}
            </select>

            {/* To */}
            <label className="text-sm font-medium text-gray-600">To</label>
            <input
              type="email"
              name="to"
              value={form.to}
              onChange={handleChange}
              placeholder="Recipient's Email"
              className="w-full border rounded-lg p-2 mb-4"
              required
            />

            {/* Subject */}
            <label className="text-sm font-medium text-gray-600">Subject</label>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full border rounded-lg p-2 mb-4"
              required
            />

            {/* Message */}
            <label className="text-sm font-medium text-gray-600">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={6}
              placeholder="Type your message..."
              className="w-full border rounded-lg p-2 mb-4"
              required
            />

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setMailModelOpen(false)}
                className="px-4 py-2 bg-gray-200 text-black rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSend}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmailModal;
