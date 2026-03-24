export default function AdminHospitalsPage() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-3xl font-bold mb-8">Manage Hospitals</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name, license..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2">
              <th className="text-left py-3 px-4 font-semibold">Hospital Name</th>
              <th className="text-left py-3 px-4 font-semibold">License</th>
              <th className="text-left py-3 px-4 font-semibold">Contact</th>
              <th className="text-left py-3 px-4 font-semibold">Verified Cases</th>
              <th className="text-left py-3 px-4 font-semibold">Status</th>
              <th className="text-left py-3 px-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: 1, name: 'Lagos General Hospital', license: 'HOSP/2024/12345', contact: 'Lagos', verified: 12, status: 'Approved' },
              { id: 2, name: 'Abuja Medical Centre', license: 'HOSP/2024/54321', contact: 'Abuja', verified: 8, status: 'Approved' },
              { id: 3, name: 'Kano Healthcare', license: 'HOSP/2024/99999', contact: 'Kano', verified: 0, status: 'Pending' },
            ].map((hospital) => (
              <tr key={hospital.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 font-semibold">{hospital.name}</td>
                <td className="py-3 px-4">{hospital.license}</td>
                <td className="py-3 px-4">{hospital.contact}</td>
                <td className="py-3 px-4">{hospital.verified}</td>
                <td className="py-3 px-4">
                  <span className="px-3 py-1 rounded-full text-white font-semibold" style={{
                    backgroundColor: hospital.status === 'Approved' ? '#10b981' : '#f59e0b'
                  }}>
                    {hospital.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button className="text-blue-600 hover:underline mr-3">View</button>
                  <button className="text-red-600 hover:underline">Revoke</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
