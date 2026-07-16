export default function CompanyProfile({
  company,
  setCompany,
}) {
  const handleChange = (e) => {
    setCompany((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">

      <h2 className="text-xl font-semibold mb-6">
        Company Information
      </h2>

      <div className="grid md:grid-cols-2 gap-5">

        <div>
          <label className="block mb-2 font-medium">
            Company Name
          </label>

          <input
            name="companyName"
            value={company.companyName}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Email
          </label>

          <input
            name="email"
            value={company.email}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Phone
          </label>

          <input
            name="phone"
            value={company.phone}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Website
          </label>

          <input
            name="website"
            value={company.website}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            GSTIN
          </label>

          <input
            name="gstin"
            value={company.gstin}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            PAN
          </label>

          <input
            name="pan"
            value={company.pan}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-2 font-medium">
            Address
          </label>

          <textarea
            rows={4}
            name="address"
            value={company.address}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />
        </div>

      </div>

    </div>
  );
}