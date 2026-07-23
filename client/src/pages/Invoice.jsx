import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import { getCustomer } from "../services/customerService";
import { getInvoice } from "../services/invoiceService";

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

import { toast } from "sonner";

export default function Invoice() {
  const { customerId, invoiceId } = useParams();

  const isEditMode = Boolean(invoiceId);

  const today = new Date().toISOString().split("T")[0];

  const due = new Date();
  due.setDate(due.getDate() + 7);

  const [customer, setCustomer] = useState(null);

  const [loading, setLoading] = useState(true);

  const [invoice, setInvoice] = useState({
    _id: "",

    customer: null,

    invoiceNumber: generateInvoiceNumber(),

    invoiceDate: today,

    dueDate: due.toISOString().split("T")[0],

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

  /* ===========================================================
     LOAD DATA
  =========================================================== */

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        if (isEditMode) {
          const response = await getInvoice(invoiceId);

          const existing = response.invoice;

          setInvoice({
            ...existing,

            invoiceDate:
              existing.invoiceDate ||
              existing.issueDate?.split("T")[0],

            dueDate:
              existing.dueDate?.split("T")[0],
          });

          setCustomer(existing.customer);
        } else {
          const response =
            await getCustomer(customerId);

          setCustomer(response.customer);

          setInvoice((prev) => ({
            ...prev,
            customer: response.customer,
          }));
        }
      } catch (error) {
        console.error(error);

        toast.error(
          error.response?.data?.message ||
            "Failed to load invoice."
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [customerId, invoiceId, isEditMode]);

  /* ===========================================================
     TOTALS
  =========================================================== */

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

  /* ===========================================================
     LOADING
  =========================================================== */

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <h2 className="text-xl font-semibold">
            Loading...
          </h2>
        </div>
      </DashboardLayout>
    );
  }

  /* ===========================================================
     UI
  =========================================================== */

  return (
    <DashboardLayout>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">

        <div className="mx-auto max-w-7xl space-y-10 px-4 py-8">

          <CompanyInfo />

          <InvoiceHeader
            customerId={customer?._id}
            invoice={invoice}
            setInvoice={setInvoice}
            isEditMode={isEditMode}
          />

          <div className="grid grid-cols-1 gap-8 xl:grid-cols-12">

            <div className="xl:col-span-8">

              <CustomerInfo
                customer={customer}
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

          <div className="grid grid-cols-1 gap-8 xl:grid-cols-12">

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

          <PaymentDetails />

          <InvoiceNotes
            notes={invoice.notes}
            setNotes={(notes) =>
              setInvoice((prev) => ({
                ...prev,
                notes,
              }))
            }
          />

          <InvoiceActions
            isEditMode={isEditMode}
            invoice={{
              ...invoice,

              customer:
                customer?._id,

              subtotal,

              discountAmount,

              taxableAmount,

              gstAmount,

              total: grandTotal,
            }}
          />

        </div>

      </div>

    </DashboardLayout>
  );
}