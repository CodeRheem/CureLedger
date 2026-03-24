export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto py-20 px-4">
        <div className="mb-16">
          <h1 className="text-5xl font-bold mb-6">About CureLedger</h1>
          <p className="text-2xl text-gray-700 font-light">
            Bridging the gap between patients in need and generous donors through verified health crowdfunding.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              CureLedger exists to democratize access to life-saving medical treatments by creating a transparent, 
              secure platform where patients can share their stories, hospitals can verify medical needs, and compassionate 
              donors can make a real difference.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We believe that no one should lose their life because they cannot afford treatment.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-gray-700">Transparency in every transaction</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-gray-700">Verification and authenticity</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-gray-700">Compassion for all patients</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-gray-700">Trust through partnerships</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-12 mb-16">
          <h2 className="text-3xl font-bold mb-8">How We Work</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-3">For Patients</h3>
              <p className="text-gray-700">
                Create a campaign with your medical story, upload verified documents from your hospital, 
                and connect with thousands of donors willing to help save your life.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-3">For Hospitals</h3>
              <p className="text-gray-700">
                Verify the authenticity of patient cases and help build trust in our platform. 
                Your verification ensures only genuine medical needs are funded.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-3">For Admins</h3>
              <p className="text-gray-700">
                Review and approve verified campaigns, manage funds, and ensure platform integrity 
                to protect both patients and donors.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-3">For Donors</h3>
              <p className="text-gray-700">
                Browse verified campaigns with confidence knowing that every campaign has been 
                thoroughly checked by hospitals and admins before reaching you.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-8">Why Choose CureLedger?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border rounded-lg p-8">
              <h3 className="font-bold text-xl mb-3">100% Verified</h3>
              <p className="text-gray-600">
                Every campaign is verified by certified hospitals and reviewed by our admin team.
              </p>
            </div>
            <div className="border rounded-lg p-8">
              <h3 className="font-bold text-xl mb-3">Secure Transactions</h3>
              <p className="text-gray-600">
                Your donations are processed securely through trusted payment partners.
              </p>
            </div>
            <div className="border rounded-lg p-8">
              <h3 className="font-bold text-xl mb-3">Transparent Impact</h3>
              <p className="text-gray-600">
                Track how your contribution directly impacts patient care and recovery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
