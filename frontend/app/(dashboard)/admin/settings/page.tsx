export default function AdminSettingsPage() {
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-8">System Settings</h1>

      <div className="space-y-8">
        {/* Campaign Settings */}
        <div className="pb-8 border-b">
          <h2 className="text-xl font-semibold mb-6">Campaign Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Default Campaign Duration (days)
              </label>
              <input
                type="number"
                defaultValue="120"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Minimum Campaign Amount (₦)
              </label>
              <input
                type="number"
                defaultValue="1000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Maximum Campaign Amount (₦)
              </label>
              <input
                type="number"
                defaultValue="50000000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Commission Settings */}
        <div className="pb-8 border-b">
          <h2 className="text-xl font-semibold mb-6">Commission & Fees</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Platform Commission (%)
              </label>
              <input
                type="number"
                defaultValue="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Payment Gateway Fee (%)
              </label>
              <input
                type="number"
                defaultValue="2.5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="pb-8 border-b">
          <h2 className="text-xl font-semibold mb-6">Notification Settings</h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-5 h-5" />
              <span className="text-gray-700">Email new campaign submissions</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-5 h-5" />
              <span className="text-gray-700">Alert on large donations</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5" />
              <span className="text-gray-700">Daily report summary</span>
            </label>
          </div>
        </div>

        {/* Save */}
        <div className="flex gap-4">
          <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700">
            Save Settings
          </button>
          <a href="/admin" className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-400 text-center">
            Cancel
          </a>
        </div>
      </div>
    </div>
  );
}
