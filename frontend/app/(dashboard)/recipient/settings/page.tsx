export default function RecipientSettingsPage() {
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

      {/* Change Password */}
      <div className="pb-8 border-b">
        <h2 className="text-xl font-semibold mb-6">Change Password</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Current Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700">
            Update Password
          </button>
        </div>
      </div>

      {/* Preferences */}
      <div className="py-8 border-b">
        <h2 className="text-xl font-semibold mb-6">Preferences</h2>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-5 h-5" />
            <span className="text-gray-700">Receive email updates about my campaigns</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-5 h-5" />
            <span className="text-gray-700">Receive weekly summary of donations</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" className="w-5 h-5" />
            <span className="text-gray-700">Allow others to contact me</span>
          </label>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="py-8 bg-red-50 p-6 rounded-lg border-2 border-red-200">
        <h2 className="text-xl font-semibold text-red-800 mb-4">Danger Zone</h2>
        <p className="text-red-700 mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <button className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700">
          Delete Account
        </button>
      </div>

      <div className="mt-8">
        <a href="/recipient" className="text-blue-600 hover:underline">
          Back to dashboard
        </a>
      </div>
    </div>
  );
}
