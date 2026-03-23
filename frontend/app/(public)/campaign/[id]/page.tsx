import { mockCampaigns } from "@/lib/mock-data";

export default function CampaignDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const campaign = mockCampaigns.find((c) => c.id === params.id);

  if (!campaign) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Campaign Not Found</h1>
          <a href="/campaigns" className="text-blue-600 hover:underline">
            Back to campaigns
          </a>
        </div>
      </div>
    );
  }

  const progressPercent = (campaign.raisedAmount / campaign.targetAmount) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4">
        {/* Campaign Image */}
        <div className="mb-8">
          <img
            src={campaign.images[0]}
            alt={campaign.title}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 bg-white rounded-lg p-8">
            <h1 className="text-4xl font-bold mb-4">{campaign.title}</h1>

            <div className="mb-6">
              <p className="text-gray-600 text-lg">{campaign.description}</p>
            </div>

            <div className="mb-6 pb-6 border-b">
              <h3 className="font-semibold text-lg mb-2">Medical Condition</h3>
              <p className="text-gray-700">{campaign.condition}</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Campaign Details</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600">Target Amount</p>
                  <p className="text-2xl font-bold">
                    ₦{campaign.targetAmount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Donors</p>
                  <p className="text-xl font-semibold">{campaign.donorCount}</p>
                </div>
                <div>
                  <p className="text-gray-600">Campaign Ends</p>
                  <p className="text-lg">
                    {new Date(campaign.endsAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="bg-white rounded-lg p-6 h-fit sticky top-4">
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Funding Progress</h3>
                <span className="text-sm font-bold text-blue-600">
                  {Math.round(progressPercent)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-green-500 h-full transition-all"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">Raised</p>
                <p className="text-2xl font-bold text-green-600">
                  ₦{campaign.raisedAmount.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">
                  of ₦{campaign.targetAmount.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Status Badge */}
            <div className="mb-6">
              <span
                className={`inline-block px-4 py-2 rounded-full text-white font-semibold ${
                  campaign.status === "approved"
                    ? "bg-green-500"
                    : campaign.status === "pending_admin"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
              >
                {campaign.status.replace(/_/g, " ").toUpperCase()}
              </span>
            </div>

            {/* Donate Button */}
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 mb-3">
              Donate Now
            </button>

            <a
              href="/campaigns"
              className="block text-center text-blue-600 hover:underline"
            >
              Back to campaigns
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
