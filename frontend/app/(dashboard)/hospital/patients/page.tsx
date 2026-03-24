export default function HospitalPatientsPage() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-3xl font-bold mb-8">My Verified Patients</h1>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2">
              <th className="text-left py-3 px-4 font-semibold">Patient Name</th>
              <th className="text-left py-3 px-4 font-semibold">Medical Condition</th>
              <th className="text-left py-3 px-4 font-semibold">Campaign</th>
              <th className="text-left py-3 px-4 font-semibold">Verified Date</th>
              <th className="text-left py-3 px-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'Tobi Johnson', condition: 'Congenital Heart Disease', campaign: 'Life-Saving Heart Surgery', date: '2024-02-10', status: 'Approved' },
              { name: 'Sarah Williams', condition: 'Stage 3 Breast Cancer', campaign: 'Emergency Cancer Treatment', date: '2024-02-12', status: 'Approved' },
              { name: 'Muhammed Ahmed', condition: 'End-Stage Renal Disease', campaign: 'Kidney Transplant Surgery', date: '2024-02-28', status: 'Pending Admin' },
            ].map((patient, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{patient.name}</td>
                <td className="py-3 px-4">{patient.condition}</td>
                <td className="py-3 px-4">{patient.campaign}</td>
                <td className="py-3 px-4">{patient.date}</td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-white font-semibold ${
                    patient.status === 'Approved' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}>
                    {patient.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
