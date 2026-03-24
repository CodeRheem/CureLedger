export default function AdminCampaignsPage() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-3xl font-bold mb-8">Manage Campaigns</h1>

      <div className="mb-6 flex gap-4">
        <select className="flex-1 px-4 py-2 border border-gray-300 rounded-lg">
          <option value="">All Status</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2">
              <th className="text-left py-3 px-4 font-semibold">Campaign Title</th>
              <th className="text-left py-3 px-4 font-semibold">Recipient</th>
              <th className="text-left py-3 px-4 font-semibold">Target</th>
              <th className="text-left py-3 px-4 font-semibold">Raised</th>
              <th className="text-left py-3 px-4 font-semibold">Status</th>
              <th className="text-left py-3 px-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: 1, title: 'Life-Saving Heart Surgery', recipient: 'Jane Smith', target: '₦2.5M', raised: '₦1.85M', status: 'Approved' },
              { id: 2, title: 'Emergency Cancer Treatment', recipient: 'Sarah W.', target: '₦3.5M', raised: '₦2.1M', status: 'Approved' },
              { id: 3, title: 'Kidney Transplant Surgery', recipient: 'Muhammed A.', target: '₦4M', raised: '₦500K', status: 'Pending' },
            ].map((campaign) => (
              <tr key={campaign.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 font-semibold">{campaign.title}</td>
                <td className="py-3 px-4">{campaign.recipient}</td>
                <td className="py-3 px-4">{campaign.target}</td>
                <td className="py-3 px-4">{campaign.raised}</td>
                <td className="py-3 px-4">
                  <span className="px-3 py-1 rounded-full text-white font-semibold" style={{
                    backgroundColor: campaign.status === 'Approved' ? '#10b981' : '#f59e0b'
                  }}>
                    {campaign.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button className="text-blue-600 hover:underline mr-3">Edit</button>
                  <button className="text-red-600 hover:underline">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
