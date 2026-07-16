export default function ItemsTable({ items }) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">

      <div className="p-6 border-b">

        <h2 className="text-2xl font-bold">
          Invoice Items
        </h2>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="text-left p-4">
                Description
              </th>

              <th className="text-center p-4">
                Qty
              </th>

              <th className="text-center p-4">
                Price
              </th>

              <th className="text-right p-4">
                Total
              </th>

            </tr>

          </thead>

          <tbody>

            {items.map((item) => (

              <tr
                key={item.id}
                className="border-t"
              >

                <td className="p-4 font-medium">
                  {item.description}
                </td>

                <td className="text-center p-4">
                  {item.quantity}
                </td>

                <td className="text-center p-4">
                  ₹{item.price.toLocaleString()}
                </td>

                <td className="text-right p-4 font-semibold">
                  ₹
                  {(
                    item.quantity *
                    item.price
                  ).toLocaleString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}