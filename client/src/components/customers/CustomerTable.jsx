import CustomerRow from "./CustomerRow";

export default function CustomerTable({ customers }) {
  return (
    <div className="bg-white rounded-2xl shadow border overflow-hidden">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="text-left px-6 py-4">
                Customer
              </th>

              <th className="text-left px-6 py-4">
                Company
              </th>

              <th className="text-left px-6 py-4">
                Email
              </th>

              <th className="text-left px-6 py-4">
                Phone
              </th>

              <th className="text-left px-6 py-4">
                Status
              </th>

              <th className="text-left px-6 py-4">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {customers.length > 0 ? (
              customers.map((customer) => (
                <CustomerRow
                  key={customer.id}
                  customer={customer}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-10 text-gray-500"
                >
                  No customers found.
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}