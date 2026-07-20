import { Plus, Trash2, Package } from "lucide-react";

export default function InvoiceItems({
  items,
  setItems,
}) {
  const updateItem = (id, field, value) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]:
                field === "description"
                  ? value
                  : Number(value),
            }
          : item
      )
    );
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        id: Date.now(),
        description: "",
        quantity: 1,
        price: 0,
      },
    ]);
  };

  const removeItem = (id) => {
    if (items.length === 1) return;

    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">

      {/* Header */}

      <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 p-5 md:p-6">

        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div className="flex items-center gap-4">

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
                Add products and services
              </p>

            </div>

          </div>

          <button
            onClick={addItem}
            className="w-full md:w-auto flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-semibold text-blue-700 shadow transition hover:scale-105 hover:bg-slate-100"
          >
            <Plus size={18} />

            Add Item
          </button>

        </div>

      </div>

      {/* ===================== DESKTOP TABLE ===================== */}

      <div className="hidden md:block overflow-x-auto">

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

              <th className="px-6 py-4 text-center font-semibold">
                Action
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

                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) =>
                      updateItem(
                        item.id,
                        "description",
                        e.target.value
                      )
                    }
                    placeholder="Website Development"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus:border-blue-500 focus:bg-white focus:outline-none"
                  />

                </td>

                <td className="px-6 py-5 text-center">

                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateItem(
                        item.id,
                        "quantity",
                        e.target.value
                      )
                    }
                    className="w-24 rounded-xl border border-slate-200 bg-slate-50 py-3 text-center transition focus:border-blue-500 focus:bg-white focus:outline-none"
                  />

                </td>

                <td className="px-6 py-5 text-center">

                  <div className="relative">

                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                      ₹
                    </span>

                    <input
                      type="number"
                      min="0"
                      value={item.price}
                      onChange={(e) =>
                        updateItem(
                          item.id,
                          "price",
                          e.target.value
                        )
                      }
                      className="w-36 rounded-xl border border-slate-200 bg-slate-50 py-3 pl-8 pr-3 text-center transition focus:border-blue-500 focus:bg-white focus:outline-none"
                    />

                  </div>

                </td>

                <td className="px-6 py-5 text-right">

                  <span className="rounded-full bg-green-100 px-4 py-2 font-bold text-green-700">

                    ₹
                    {(item.quantity * item.price).toLocaleString()}

                  </span>

                </td>

                <td className="px-6 py-5 text-center">

                  <button
                    onClick={() =>
                      removeItem(item.id)
                    }
                    className="rounded-xl bg-red-100 p-3 text-red-600 transition hover:scale-110 hover:bg-red-600 hover:text-white"
                  >
                    <Trash2 size={18} />
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
            {/* ===================== MOBILE CARDS ===================== */}

      <div className="block md:hidden p-4 space-y-5">

        {items.map((item, index) => (

          <div
            key={item.id}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm"
          >

            <div className="mb-4 flex items-center justify-between">

              <h3 className="font-bold text-slate-700">
                Item #{index + 1}
              </h3>

              <button
                onClick={() => removeItem(item.id)}
                className="rounded-lg bg-red-100 p-2 text-red-600"
              >
                <Trash2 size={18} />
              </button>

            </div>

            {/* Description */}

            <div className="mb-4">

              <label className="mb-2 block text-sm font-medium text-slate-600">
                Description
              </label>

              <input
                type="text"
                value={item.description}
                onChange={(e) =>
                  updateItem(
                    item.id,
                    "description",
                    e.target.value
                  )
                }
                placeholder="Website Development"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 focus:border-blue-500 focus:outline-none"
              />

            </div>

            <div className="grid grid-cols-2 gap-4">

              {/* Quantity */}

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-600">
                  Quantity
                </label>

                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    updateItem(
                      item.id,
                      "quantity",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-center focus:border-blue-500 focus:outline-none"
                />

              </div>

              {/* Price */}

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-600">
                  Price
                </label>

                <div className="relative">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                    ₹
                  </span>

                  <input
                    type="number"
                    min="0"
                    value={item.price}
                    onChange={(e) =>
                      updateItem(
                        item.id,
                        "price",
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-8 pr-4 text-center focus:border-blue-500 focus:outline-none"
                  />

                </div>

              </div>

            </div>

            <div className="mt-5 flex items-center justify-between rounded-xl bg-green-50 px-4 py-3">

              <span className="font-medium text-slate-600">
                Item Total
              </span>

              <span className="text-lg font-bold text-green-700">
                ₹{(
                  item.quantity * item.price
                ).toLocaleString()}
              </span>

            </div>

          </div>

        ))}

      </div>

      {/* ===================== FOOTER ===================== */}

      <div className="flex flex-col gap-4 border-t bg-slate-50 px-5 py-5 md:flex-row md:items-center md:justify-between">

        <p className="text-center text-sm text-slate-500 md:text-left">

          {items.length} Item
          {items.length > 1 ? "s" : ""} Added

        </p>

        <button
          onClick={addItem}
          className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 md:w-auto"
        >
          + Add Another Item
        </button>

      </div>

    </div>
  );
}