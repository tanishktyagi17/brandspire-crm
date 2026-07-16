export default function InvoiceStatus({
  status,
  setStatus,
}) {
  const colors = {
    Draft: "bg-gray-100 text-gray-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Paid: "bg-green-100 text-green-700",
    Overdue: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">

      <h2 className="text-xl font-bold mb-5">
        Invoice Status
      </h2>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full border rounded-xl p-3"
      >
        <option>Draft</option>
        <option>Pending</option>
        <option>Paid</option>
        <option>Overdue</option>
      </select>

      <div className="mt-5">

        <span
          className={`px-4 py-2 rounded-full font-semibold ${colors[status]}`}
        >
          {status}
        </span>

      </div>

    </div>
  );
}