import { Package } from "lucide-react";

export default function ItemsTable({ items }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">

      {/* Header */}

      <div className="flex items-center gap-4 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 p-6">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">

          <Package
            size={28}
            className="text-white"
          />

        </div>

        <div>

          <h2 className="text-2xl font-bold text-white">
            Invoice Items
          </h2>

          <p className="text-blue-100">
            Products & services included in this invoice
          </p>

        </div>

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b bg-slate-100 text-slate-700">

              <th className="px-6 py-4 text-left font-semibold">
                #
              </th>

              <th className="px-6 py-4 text-left font-semibold">
                Description
              </th>

              <th className="px-6 py-4 text-center font-semibold">
                Qty
              </th>

              <th className="px-6 py-4 text-center font-semibold">
                Price
              </th>

              <th className="px-6 py-4 text-right font-semibold">
                Total
              </th>

            </tr>

          </thead>

          <tbody>

            {items.map((item, index) => (

              <tr
                key={item.id}
                className="border-b transition hover:bg-blue-50"
              >

                <td className="px-6 py-5 font-semibold text-slate-500">
                  {index + 1}
                </td>

                <td className="px-6 py-5">

                  <div>

                    <p className="font-semibold text-slate-800">
                      {item.description}
                    </p>

                    <p className="text-sm text-slate-500">
                      Invoice Item
                    </p>

                  </div>

                </td>

                <td className="px-6 py-5 text-center font-medium">
                  {item.quantity}
                </td>

                <td className="px-6 py-5 text-center font-medium">
                  ₹{Number(item.price).toLocaleString()}
                </td>

                <td className="px-6 py-5 text-right">

                  <span className="rounded-full bg-green-100 px-4 py-2 font-bold text-green-700">

                    ₹
                    {(
                      Number(item.quantity) *
                      Number(item.price)
                    ).toLocaleString()}

                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Footer */}

      <div className="flex items-center justify-between border-t bg-slate-50 px-6 py-4">

        <p className="text-sm text-slate-500">
          {items.length} Item{items.length !== 1 ? "s" : ""}
        </p>

        <span className="text-sm font-medium text-slate-600">
          Read Only
        </span>

      </div>

    </div>
  );
}