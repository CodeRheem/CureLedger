export default function AdminDashboardPage() {
  return (
    <div>
      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 text-sm font-semibold mb-2">TOTAL CAMPAIGNS</p>
          <p className="text-4xl font-bold text-blue-600">45</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 text-sm font-semibold mb-2">APPROVED</p>
          <p className="text-4xl font-bold text-green-600">38</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 text-sm font-semibold mb-2">PENDING</p>
          <p className="text-4xl font-bold text-yellow-600">5</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 text-sm font-semibold mb-2">TOTAL FUND RAISED</p>
          <p className="text-3xl font-bold text-purple-600">₦125M</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Pending Approvals</h2>
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="border-l-4 border-yellow-500 pl-4 py-2">
                <p className="font-semibold">Campaign {i}</p>
                <p className="text-sm text-gray-600">Waiting for your review</p>
              </div>
            ))}
          </div>
          <a href="/admin/approvals" className="text-blue-600 hover:underline font-semibold mt-4 inline-block">
            View All →
          </a>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">System Stats</h2>
          <div className="space-y-3">
            <p className="flex justify-between"><span>Active Recipients:</span> <span className="font-bold">156</span></p>
            <p className="flex justify-between"><span>Hospitals:</span> <span className="font-bold">12</span></p>
            <p className="flex justify-between"><span>Approved Donors:</span> <span className="font-bold">2,340</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
