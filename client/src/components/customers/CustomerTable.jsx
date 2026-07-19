import CustomerRow from "./CustomerRow";
import CustomerCard from "./CustomerCard";

export default function CustomerTable({
  customers,
  onEdit,
  onDelete,
}) {
  if (customers.length === 0) {
    return (
      <div className="rounded-2xl border bg-white p-12 text-center shadow-sm">
        <h3 className="text-xl font-semibold text-slate-700">
          No Customers Found
        </h3>

        <p className="mt-2 text-slate-500">
          Try changing your search or add a new customer.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* ========================= */}
      {/* Mobile Cards */}
      {/* ========================= */}

      <div className="grid gap-5 md:hidden">
        {customers.map((customer) => (
          <CustomerCard
            key={customer.id}
            customer={customer}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      {/* ========================= */}
      {/* Desktop Table */}
      {/* ========================= */}

      <div className="hidden overflow-hidden rounded-2xl border bg-white shadow-sm md:block">

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-slate-100">

              <tr className="text-sm uppercase tracking-wide text-slate-600">

                <th className="px-6 py-4 text-left">
                  Customer
                </th>

                <th className="px-6 py-4 text-left">
                  Project
                </th>

                <th className="px-6 py-4 text-left">
                  Email
                </th>

                <th className="px-6 py-4 text-left">
                  Phone
                </th>

                <th className="px-6 py-4 text-left">
                  Status
                </th>

                <th className="px-6 py-4 text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {customers.map((customer) => (
                <CustomerRow
                  key={customer.id}
                  customer={customer}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}

            </tbody>

          </table>

        </div>

      </div>
    </>
  );
}