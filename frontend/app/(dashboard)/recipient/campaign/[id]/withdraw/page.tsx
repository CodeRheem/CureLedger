export default function RecipientCampaignWithdrawPage() {
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6">Request Fund Withdrawal</h1>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 className="font-semibold text-blue-900 mb-2">Campaign: Life-Saving Heart Surgery</h3>
        <p className="text-blue-800">Current Balance: <span className="font-bold">₦1,850,000</span></p>
      </div>

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Amount to Withdraw
          </label>
          <div className="relative">
            <span className="absolute left-4 top-3 text-gray-600">₦</span>
            <input
              type="number"
              placeholder="500,000"
              className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Purpose of Withdrawal
          </label>
          <textarea
            placeholder="Explain what the funds will be used for..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none h-24"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Bank Account Number
          </label>
          <input
            type="text"
            placeholder="1234567890"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Bank Name
          </label>
          <input
            type="text"
            placeholder="First Bank Nigeria"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> Withdrawal requests are reviewed by admins and typically processed within 5-7 business days.
          </p>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
          >
            Submit Withdrawal Request
          </button>
          <a
            href="/recipient"
            className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-400 text-center"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
