export default function RecipientDashboardPage() {
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      {/* Stats Cards */}
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-600 text-sm font-semibold mb-2">CAMPAIGNS CREATED</p>
        <p className="text-4xl font-bold text-blue-600">2</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-600 text-sm font-semibold mb-2">FUNDS RAISED</p>
        <p className="text-4xl font-bold text-green-600">₦1.85M</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-600 text-sm font-semibold mb-2">TOTAL DONORS</p>
        <p className="text-4xl font-bold text-purple-600">156</p>
      </div>
    </div>
  );
}
