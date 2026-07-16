export default function BusinessSettings({
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
        Business Settings
      </h2>

      <div className="grid md:grid-cols-2 gap-5">

        <div>
          <label className="block mb-2 font-medium">
            Currency
          </label>

          <select
            name="currency"
            value={company.currency}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          >
            <option value="INR">₹ INR</option>
            <option value="USD">$ USD</option>
            <option value="EUR">€ EUR</option>
            <option value="GBP">£ GBP</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Invoice Prefix
          </label>

          <input
            name="invoicePrefix"
            value={company.invoicePrefix}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Default GST (%)
          </label>

          <input
            type="number"
            name="defaultGST"
            value={company.defaultGST}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Payment Terms
          </label>

          <select
            name="paymentTerms"
            value={company.paymentTerms}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          >
            <option>Due on Receipt</option>
            <option>Net 7 Days</option>
            <option>Net 15 Days</option>
            <option>Net 30 Days</option>
            <option>Net 45 Days</option>
          </select>
        </div>

      </div>

    </div>
  );
}