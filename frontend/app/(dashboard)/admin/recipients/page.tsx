export default function AdminRecipientsPage() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-3xl font-bold mb-8">Manage Recipients</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name, email..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2">
              <th className="text-left py-3 px-4 font-semibold">Name</th>
              <th className="text-left py-3 px-4 font-semibold">Email</th>
              <th className="text-left py-3 px-4 font-semibold">Phone</th>
              <th className="text-left py-3 px-4 font-semibold">Campaigns</th>
              <th className="text-left py-3 px-4 font-semibold">Status</th>
              <th className="text-left py-3 px-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: 1, name: 'Jane Smith', email: 'jane@example.com', phone: '+2348098765432', campaigns: 2, status: 'Active' },
              { id: 2, name: 'John Doe', email: 'john@example.com', phone: '+2348012345678', campaigns: 1, status: 'Active' },
              { id: 3, name: 'Alice Johnson', email: 'alice@example.com', phone: '+2349012345678', campaigns: 0, status: 'Inactive' },
            ].map((recipient) => (
              <tr key={recipient.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 font-semibold">{recipient.name}</td>
                <td className="py-3 px-4">{recipient.email}</td>
                <td className="py-3 px-4">{recipient.phone}</td>
                <td className="py-3 px-4">{recipient.campaigns}</td>
                <td className="py-3 px-4">
                  <span className="px-3 py-1 rounded-full text-white font-semibold" style={{
                    backgroundColor: recipient.status === 'Active' ? '#10b981' : '#9ca3af'
                  }}>
                    {recipient.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button className="text-blue-600 hover:underline mr-3">View</button>
                  <button className="text-red-600 hover:underline">Suspend</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
