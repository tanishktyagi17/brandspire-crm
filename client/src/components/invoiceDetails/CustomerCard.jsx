import {
  Building2,
  Mail,
  Phone,
  MapPin,
  User,
  Calendar,
  Clock3,
  CreditCard,
} from "lucide-react";

export default function CustomerCard({ invoice }) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

      {/* Company Card */}

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">

        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 p-6">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">

              <Building2
                size={28}
                className="text-white"
              />

            </div>

            <div>

              <h2 className="text-2xl font-bold text-white">
                Company Information
              </h2>

              <p className="text-blue-100">
                Invoice issued by
              </p>

            </div>

          </div>

        </div>

        <div className="space-y-5 p-7">

          <div>

            <h3 className="text-2xl font-bold text-slate-800">
              Brandspire Technologies
            </h3>

            <p className="mt-1 text-slate-500">
              Digital Solutions & CRM Services
            </p>

          </div>

          <div className="space-y-4">

            <div className="flex items-center gap-3">

              <MapPin
                size={18}
                className="text-blue-600"
              />

              <span>Kolkata, West Bengal</span>

            </div>

            <div className="flex items-center gap-3">

              <Mail
                size={18}
                className="text-blue-600"
              />

              <span>support@brandspire.tech</span>

            </div>

            <div className="flex items-center gap-3">

              <Phone
                size={18}
                className="text-blue-600"
              />

              <span>+91 9876543210</span>

            </div>

          </div>

        </div>

      </div>

      {/* Customer Card */}

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">

        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-6">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">

              <User
                size={28}
                className="text-white"
              />

            </div>

            <div>

              <h2 className="text-2xl font-bold text-white">
                Customer Information
              </h2>

              <p className="text-emerald-100">
                Invoice recipient
              </p>

            </div>

          </div>

        </div>

        <div className="space-y-4 p-7">

          <div className="flex items-center justify-between border-b pb-3">

            <span className="flex items-center gap-2 text-slate-500">

              <User size={18} />

              Name

            </span>

            <span className="font-semibold text-slate-800">
              {invoice.customer?.name || "-"}
            </span>

          </div>

          <div className="flex items-center justify-between border-b pb-3">

            <span className="flex items-center gap-2 text-slate-500">

              <Mail size={18} />

              Email

            </span>

            <span className="font-medium">
              {invoice.customer?.email || "-"}
            </span>

          </div>

          <div className="flex items-center justify-between border-b pb-3">

            <span className="flex items-center gap-2 text-slate-500">

              <Phone size={18} />

              Phone

            </span>

            <span className="font-medium">
              {invoice.customer?.phone || "-"}
            </span>

          </div>

          <div className="flex items-center justify-between border-b pb-3">

            <span className="flex items-center gap-2 text-slate-500">

              <Calendar size={18} />

              Invoice Date

            </span>

            <span className="font-medium">
              {invoice.invoiceDate}
            </span>

          </div>

          <div className="flex items-center justify-between border-b pb-3">

            <span className="flex items-center gap-2 text-slate-500">

              <Clock3 size={18} />

              Due Date

            </span>

            <span className="font-medium">
              {invoice.dueDate}
            </span>

          </div>

          <div className="flex items-center justify-between">

            <span className="flex items-center gap-2 text-slate-500">

              <CreditCard size={18} />

              Payment Terms

            </span>

            <span className="rounded-full bg-blue-100 px-3 py-1 font-semibold text-blue-700">
              {invoice.paymentTerms}
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}