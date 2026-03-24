export default function HospitalProfilePage() {
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6">Hospital Profile</h1>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Hospital Name
          </label>
          <input
            type="text"
            defaultValue="Lagos General Hospital"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Hospital License
          </label>
          <input
            type="text"
            defaultValue="HOSP/2024/12345"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed"
            disabled
          />
          <p className="text-xs text-gray-600 mt-1">Cannot be changed</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Contact Person
          </label>
          <input
            type="text"
            defaultValue="Lagos General"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            defaultValue="lagos.general@hospital.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Phone
          </label>
          <input
            type="tel"
            defaultValue="+2348012345678"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Address
          </label>
          <input
            type="text"
            defaultValue="123 Medical Street, Lagos"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="flex gap-4 pt-6">
          <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700">
            Save Changes
          </button>
          <a href="/hospital" className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-400 text-center">
            Cancel
          </a>
        </div>
      </div>
    </div>
  );
}
