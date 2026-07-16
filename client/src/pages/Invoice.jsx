import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import { getCustomerById } from "../lib/customerStorage";
import { getInvoiceById } from "../lib/invoiceStorage";
import { generateInvoiceNumber } from "../lib/invoiceNumber";

import CompanyInfo from "../components/invoice/CompanyInfo";
import CustomerInfo from "../components/invoice/CustomerInfo";
import InvoiceHeader from "../components/invoice/InvoiceHeader";
import InvoiceItems from "../components/invoice/InvoiceItems";
import InvoiceSummary from "../components/invoice/InvoiceSummary";
import InvoiceStatus from "../components/invoice/InvoiceStatus";
import PaymentDetails from "../components/invoice/PaymentDetails";
import InvoiceNotes from "../components/invoice/InvoiceNotes";
import InvoiceActions from "../components/invoice/InvoiceActions";

export default function Invoice() {
  const { customerId, invoiceId } = useParams();

  const isEditMode = Boolean(invoiceId);

  const customer = getCustomerById(customerId);

  const today = new Date().toISOString().split("T")[0];

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 7);

  const [invoice, setInvoice] = useState({
    id: "",
    invoiceNumber: generateInvoiceNumber(),
    invoiceDate: today,
    dueDate: dueDate.toISOString().split("T")[0],
    currency: "INR",
    paymentTerms: "Net 7 Days",
    status: "Draft",

    items: [
      {
        id: Date.now(),
        description: "Website Development",
        quantity: 1,
        price: 0,
      },
    ],

    gst: 18,
    discount: 10,

    notes:
      "Thank you for choosing Brandspire Technologies.",

    createdAt: new Date().toISOString(),
  });

  useEffect(() => {
    if (!isEditMode) return;

    const existingInvoice = getInvoiceById(invoiceId);

    if (existingInvoice) {
      setInvoice(existingInvoice);
    }
  }, [invoiceId, isEditMode]);

  const subtotal = useMemo(() => {
    return invoice.items.reduce(
      (sum, item) =>
        sum +
        Number(item.quantity) *
          Number(item.price),
      0
    );
  }, [invoice.items]);

  const discountAmount =
    subtotal * (invoice.discount / 100);

  const taxableAmount =
    subtotal - discountAmount;

  const gstAmount =
    taxableAmount * (invoice.gst / 100);

  const grandTotal =
    taxableAmount + gstAmount;

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">

        <div className="mx-auto max-w-7xl px-4 py-8 space-y-10">

          {/* Company Information */}
          <CompanyInfo />

          {/* Invoice Header */}
          <InvoiceHeader
            customerId={customerId}
            invoice={invoice}
            setInvoice={setInvoice}
            isEditMode={isEditMode}
          />

          {/* Customer + Status */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

            <div className="xl:col-span-8">
              <CustomerInfo
                customer={
                  invoice.customer || customer
                }
              />
            </div>

            <div className="xl:col-span-4">
              <InvoiceStatus
                status={invoice.status}
                setStatus={(status) =>
                  setInvoice((prev) => ({
                    ...prev,
                    status,
                  }))
                }
              />
            </div>

          </div>

          {/* Items + Summary */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

            <div className="xl:col-span-7">
              <InvoiceItems
                items={invoice.items}
                setItems={(items) =>
                  setInvoice((prev) => ({
                    ...prev,
                    items,
                  }))
                }
              />
            </div>

            <div className="xl:col-span-5">
              <InvoiceSummary
                subtotal={subtotal}
                gst={invoice.gst}
                setGst={(gst) =>
                  setInvoice((prev) => ({
                    ...prev,
                    gst,
                  }))
                }
                discount={invoice.discount}
                setDiscount={(discount) =>
                  setInvoice((prev) => ({
                    ...prev,
                    discount,
                  }))
                }
                discountAmount={discountAmount}
                gstAmount={gstAmount}
                total={grandTotal}
              />
            </div>

          </div>

          {/* Payment */}
          <PaymentDetails />

          {/* Notes */}
          <InvoiceNotes
            notes={invoice.notes}
            setNotes={(notes) =>
              setInvoice((prev) => ({
                ...prev,
                notes,
              }))
            }
          />

          {/* Sticky Bottom Actions */}
          {/* Invoice Actions */}

<div className="mt-10">

  <InvoiceActions
    isEditMode={isEditMode}
    invoice={{
      ...invoice,

      id:
        invoice.id ||
        Date.now().toString(),

      customer:
        invoice.customer || customer,

      subtotal,

      discountAmount,

      taxableAmount,

      gstAmount,

      total: grandTotal,

      createdAt:
        invoice.createdAt ||
        new Date().toISOString(),
    }}
  />

</div>

        </div>

      </div>
    </DashboardLayout>
  );
}