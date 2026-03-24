export default function RecipientProfilePage() {
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <div className="flex items-center gap-8 mb-12 pb-8 border-b">
        <img
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jane"
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-semibold mb-2">Jane Smith</h2>
          <p className="text-gray-600 mb-4">jane@example.com</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Update Photo
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            First Name
          </label>
          <input
            type="text"
            defaultValue="Jane"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Last Name
          </label>
          <input
            type="text"
            defaultValue="Smith"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            defaultValue="jane@example.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Phone
          </label>
          <input
            type="tel"
            defaultValue="+2348098765432"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            BVN
          </label>
          <input
            type="text"
            defaultValue="12345678901"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed"
            disabled
          />
          <p className="text-xs text-gray-600 mt-1">Cannot be changed</p>
        </div>

        <div className="flex gap-4 pt-6">
          <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700">
            Save Changes
          </button>
          <a href="/recipient" className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-400 text-center">
            Cancel
          </a>
        </div>
      </div>
    </div>
  );
}
