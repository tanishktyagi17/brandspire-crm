import {
  Building2,
  Globe,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function CompanyInfo() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">

      {/* Background Decoration */}
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-100 blur-3xl opacity-60" />
      <div className="absolute -left-16 -bottom-16 h-40 w-40 rounded-full bg-violet-100 blur-3xl opacity-60" />

      <div className="relative p-8">

        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-8">

          {/* Left Side */}
          <div className="flex items-center gap-6">

            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-violet-600 shadow-lg">

              <Building2
                size={38}
                className="text-white"
              />

            </div>

            <div>

              <h1 className="text-3xl font-bold text-slate-900">
                Brandspire Technologies
              </h1>

              <p className="mt-1 text-slate-500">
                Software Development Company
              </p>

              <span className="mt-3 inline-flex rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
                🇮🇳 India
              </span>

            </div>

          </div>

          {/* Right Side */}
          <div className="grid gap-4 sm:grid-cols-2">

            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">

              <Mail
                size={20}
                className="text-blue-600"
              />

              <div>

                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Email
                </p>

                <p className="font-medium">
                  admin@brandspire.in
                </p>

              </div>

            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">

              <Phone
                size={20}
                className="text-green-600"
              />

              <div>

                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Phone
                </p>

                <p className="font-medium">
                  +91 98765 43210
                </p>

              </div>

            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">

              <Globe
                size={20}
                className="text-violet-600"
              />

              <div>

                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Website
                </p>

                <p className="font-medium">
                  www.brandspire.in
                </p>

              </div>

            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">

              <MapPin
                size={20}
                className="text-red-600"
              />

              <div>

                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Location
                </p>

                <p className="font-medium">
                  New Delhi, India
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}