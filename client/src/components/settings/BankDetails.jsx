export default function BankDetails({
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
        Bank Details
      </h2>

      <div className="grid md:grid-cols-2 gap-5">

        <input
          name="bankName"
          placeholder="Bank Name"
          value={company.bankName}
          onChange={handleChange}
          className="border rounded-xl p-3"
        />

        <input
          name="accountName"
          placeholder="Account Holder"
          value={company.accountName}
          onChange={handleChange}
          className="border rounded-xl p-3"
        />

        <input
          name="accountNumber"
          placeholder="Account Number"
          value={company.accountNumber}
          onChange={handleChange}
          className="border rounded-xl p-3"
        />

        <input
          name="ifsc"
          placeholder="IFSC Code"
          value={company.ifsc}
          onChange={handleChange}
          className="border rounded-xl p-3"
        />

        <input
          name="branch"
          placeholder="Branch"
          value={company.branch}
          onChange={handleChange}
          className="border rounded-xl p-3"
        />

        <input
          name="upi"
          placeholder="UPI ID"
          value={company.upi}
          onChange={handleChange}
          className="border rounded-xl p-3"
        />

      </div>

    </div>
  );
}