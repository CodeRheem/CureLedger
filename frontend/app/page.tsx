export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Help Save Lives Through CureLedger
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Connect with verified medical campaigns and make a real difference
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="/login"
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100"
            >
              Get Started
            </a>
            <a
              href="/campaigns"
              className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600"
            >
              Browse Campaigns
            </a>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold mb-2">Share Your Story</h3>
              <p className="text-gray-600">Recipients create campaigns with medical documentation</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold mb-2">Hospital Verification</h3>
              <p className="text-gray-600">Hospitals verify authenticity and medical necessity</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold mb-2">Admin Approval</h3>
              <p className="text-gray-600">Admins review and approve verified campaigns</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="font-semibold mb-2">Receive Funds</h3>
              <p className="text-gray-600">Donors contribute funds to help patients</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Campaigns</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border rounded-lg overflow-hidden hover:shadow-lg transition">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400"
                alt="Campaign"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2">Life-Saving Heart Surgery</h3>
                <p className="text-gray-600 text-sm mb-4">Help a young boy get the surgery he needs</p>
                <div className="bg-gray-200 h-2 rounded-full overflow-hidden mb-2">
                  <div className="bg-green-500 h-full" style={{ width: '74%' }}></div>
                </div>
                <p className="text-sm text-gray-600">₦1.85M of ₦2.5M raised</p>
              </div>
            </div>
            <div className="border rounded-lg overflow-hidden hover:shadow-lg transition">
              <img
                src="https://images.unsplash.com/photo-1576091160579-112f9e6e3d67?w=400"
                alt="Campaign"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2">Emergency Cancer Treatment</h3>
                <p className="text-gray-600 text-sm mb-4">Sarah needs immediate medical care</p>
                <div className="bg-gray-200 h-2 rounded-full overflow-hidden mb-2">
                  <div className="bg-green-500 h-full" style={{ width: '60%' }}></div>
                </div>
                <p className="text-sm text-gray-600">₦2.1M of ₦3.5M raised</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <a
              href="/campaigns"
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
            >
              View All Campaigns
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
