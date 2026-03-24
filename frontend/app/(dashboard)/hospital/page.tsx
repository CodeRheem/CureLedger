export default function HospitalDashboardPage() {
  return (
    <div>
      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 text-sm font-semibold mb-2">PENDING VERIFICATIONS</p>
          <p className="text-4xl font-bold text-yellow-600">3</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 text-sm font-semibold mb-2">VERIFIED PATIENTS</p>
          <p className="text-4xl font-bold text-green-600">12</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 text-sm font-semibold mb-2">VERIFIED CAMPAIGNS</p>
          <p className="text-4xl font-bold text-blue-600">12</p>
        </div>
      </div>

      {/* Pending Verifications */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6">Pending Verifications</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-lg p-4 hover:shadow-md transition">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">Life-Saving Heart Surgery</h3>
                  <p className="text-gray-600">Recipient: Tobi Johnson</p>
                  <p className="text-sm text-gray-500">Submitted 2 days ago</p>
                </div>
                <a href="/hospital/verify/campaign-x" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
                  Review
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
