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

  const today = new Date()
    .toISOString()
    .split("T")[0];

  const due = new Date();
  due.setDate(due.getDate() + 7);

  const defaultDueDate = due
    .toISOString()
    .split("T")[0];

  const [customer, setCustomer] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [invoice, setInvoice] =
    useState({
      _id: "",

      customer: null,

      invoiceNumber:
        generateInvoiceNumber(),

      invoiceDate: today,

      dueDate: defaultDueDate,

      currency: "INR",

      paymentTerms: "Net 7 Days",

      status: "Draft",

      items: [
        {
          id: Date.now().toString(),
          description:
            "Website Development",
          quantity: 1,
          price: 0,
        },
      ],

      gst: 18,

      discount: 10,

      notes:
        "Thank you for choosing Brandspire Technologies.",

      createdAt:
        new Date().toISOString(),
    });

  /* ===========================================================
     DATE FORMAT
  =========================================================== */

  const formatDateForInput = (
    date
  ) => {
    if (!date) return "";

    try {
      const parsed = new Date(date);

      if (
        Number.isNaN(
          parsed.getTime()
        )
      ) {
        return "";
      }

      return parsed
        .toISOString()
        .split("T")[0];
    } catch {
      return "";
    }
  };

  /* ===========================================================
     NORMALIZE ITEMS
  =========================================================== */

  const normalizeItems = (
    items = []
  ) => {
    return items.map(
      (item, index) => ({
        ...item,

        id:
          item.id ||
          item._id ||
          `${Date.now()}-${index}`,

        quantity: Number(
          item.quantity || 1
        ),

        price: Number(
          item.price || 0
        ),
      })
    );
  };

  /* ===========================================================
     LOAD DATA
  =========================================================== */

  useEffect(() => {
    let cancelled = false;

    const loadData =
      async () => {
        try {
          setLoading(true);

          /* =====================================================
             EDIT MODE
          ===================================================== */

          if (isEditMode) {
            const response =
              await getInvoice(
                invoiceId
              );

            const existing =
              response?.invoice;

            if (!existing) {
              throw new Error(
                "Invoice not found."
              );
            }

            let loadedCustomer =
              null;

            /*
             * If customer was populated by MongoDB
             */

            if (
              existing.customer &&
              typeof existing.customer ===
                "object" &&
              existing.customer._id
            ) {
              loadedCustomer =
                existing.customer;
            }

            /*
             * If backend returned only customer ID
             */

            else if (
              typeof existing.customer ===
                "string" &&
              existing.customer.trim()
            ) {
              const customerResponse =
                await getCustomer(
                  existing.customer
                );

              loadedCustomer =
                customerResponse?.customer ||
                null;
            }

            if (!loadedCustomer) {
              throw new Error(
                "Customer linked to this invoice could not be found."
              );
            }

            if (cancelled) return;

            setCustomer(
              loadedCustomer
            );

            setInvoice({
              ...existing,

              /*
               * IMPORTANT:
               * Keep complete customer object here.
               */

              customer:
                loadedCustomer,

              invoiceDate:
                formatDateForInput(
                  existing.invoiceDate ||
                    existing.issueDate
                ) || today,

              dueDate:
                formatDateForInput(
                  existing.dueDate
                ) ||
                defaultDueDate,

              currency:
                existing.currency ||
                "INR",

              paymentTerms:
                existing.paymentTerms ||
                "Net 7 Days",

              status:
                existing.status ||
                "Draft",

              items:
                normalizeItems(
                  existing.items
                ),

              gst: Number(
                existing.gst ??
                  existing.tax ??
                  18
              ),

              discount: Number(
                existing.discount ??
                  0
              ),

              notes:
                existing.notes ||
                "",
            });

            return;
          }

          /* =====================================================
             CREATE MODE
          ===================================================== */

          if (!customerId) {
            throw new Error(
              "Customer ID is missing."
            );
          }

          const response =
            await getCustomer(
              customerId
            );

          const loadedCustomer =
            response?.customer;

          if (!loadedCustomer) {
            throw new Error(
              "Customer not found."
            );
          }

          if (cancelled) return;

          setCustomer(
            loadedCustomer
          );

          setInvoice(
            (prev) => ({
              ...prev,

              /*
               * Store complete customer object.
               */

              customer:
                loadedCustomer,
            })
          );
        } catch (error) {
          console.error(
            "Invoice Load Error:",
            error
          );

          if (!cancelled) {
            toast.error(
              error.response?.data
                ?.message ||
                error.message ||
                "Failed to load invoice."
            );
          }
        } finally {
          if (!cancelled) {
            setLoading(false);
          }
        }
      };

    loadData();

    return () => {
      cancelled = true;
    };
  }, [
    customerId,
    invoiceId,
    isEditMode,
  ]);

  /* ===========================================================
     TOTALS
  =========================================================== */

  const subtotal = useMemo(
    () => {
      return (
        invoice.items || []
      ).reduce(
        (sum, item) =>
          sum +
          Number(
            item.quantity || 0
          ) *
            Number(
              item.price || 0
            ),
        0
      );
    },
    [invoice.items]
  );

  const discountPercentage =
    Number(
      invoice.discount || 0
    );

  const gstPercentage =
    Number(invoice.gst || 0);

  const discountAmount =
    subtotal *
    (discountPercentage / 100);

  const taxableAmount =
    subtotal - discountAmount;

  const gstAmount =
    taxableAmount *
    (gstPercentage / 100);

  const grandTotal =
    taxableAmount + gstAmount;

  /* ===========================================================
     LOADING
  =========================================================== */

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <h2 className="text-xl font-semibold text-slate-700">
            Loading Invoice...
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
            customerId={
              customer?._id
            }
            invoice={invoice}
            setInvoice={
              setInvoice
            }
            isEditMode={
              isEditMode
            }
          />

          {/* Customer + Status */}

          <div className="grid grid-cols-1 gap-8 xl:grid-cols-12">

            <div className="xl:col-span-8">
              <CustomerInfo
                customer={
                  customer
                }
              />
            </div>

            <div className="xl:col-span-4">
              <InvoiceStatus
                status={
                  invoice.status
                }
                setStatus={(
                  status
                ) =>
                  setInvoice(
                    (prev) => ({
                      ...prev,
                      status,
                    })
                  )
                }
              />
            </div>

          </div>

          {/* Items + Summary */}

          <div className="grid grid-cols-1 gap-8 xl:grid-cols-12">

            <div className="xl:col-span-7">
              <InvoiceItems
                items={
                  invoice.items ||
                  []
                }
                setItems={(
                  items
                ) =>
                  setInvoice(
                    (prev) => ({
                      ...prev,
                      items,
                    })
                  )
                }
              />
            </div>

            <div className="xl:col-span-5">
              <InvoiceSummary
                subtotal={
                  subtotal
                }
                gst={
                  gstPercentage
                }
                setGst={(gst) =>
                  setInvoice(
                    (prev) => ({
                      ...prev,
                      gst,
                    })
                  )
                }
                discount={
                  discountPercentage
                }
                setDiscount={(
                  discount
                ) =>
                  setInvoice(
                    (prev) => ({
                      ...prev,
                      discount,
                    })
                  )
                }
                discountAmount={
                  discountAmount
                }
                gstAmount={
                  gstAmount
                }
                total={
                  grandTotal
                }
              />
            </div>

          </div>

          <PaymentDetails />

          <InvoiceNotes
            notes={
              invoice.notes || ""
            }
            setNotes={(notes) =>
              setInvoice(
                (prev) => ({
                  ...prev,
                  notes,
                })
              )
            }
          />

          {/* ===================================================
              IMPORTANT:
              Pass full customer object to PDF/actions.

              InvoiceActions converts customer._id for API saving.
          =================================================== */}

          <InvoiceActions
            isEditMode={
              isEditMode
            }
            invoice={{
              ...invoice,

              customer:
                customer,

              subtotal,

              discount:
                discountPercentage,

              discountAmount,

              taxableAmount,

              gst:
                gstPercentage,

              gstAmount,

              total:
                grandTotal,
            }}
          />

        </div>

      </div>
    </DashboardLayout>
  );
}