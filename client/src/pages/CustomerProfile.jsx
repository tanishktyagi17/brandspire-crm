import { useParams } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import { getCustomerById } from "../lib/customerStorage";

import CustomerHeader from "../components/customer-profile/CustomerHeader";
import RevenueCards from "../components/customer-profile/RevenueCards";
import CustomerInvoices from "../components/customer-profile/CustomerInvoices";
import CustomerProjects from "../components/customer-profile/CustomerProjects";
import CustomerTimeline from "../components/customer-profile/CustomerTimeline";

export default function CustomerProfile() {
  const { customerId } = useParams();

  const customer = getCustomerById(customerId);

  if (!customer) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <h1 className="text-center text-2xl font-bold text-slate-700 sm:text-3xl">
            Customer Not Found
          </h1>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 lg:space-y-8">

        <CustomerHeader customer={customer} />

        <RevenueCards customerId={customer.id} />

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <CustomerInvoices customerId={customer.id} />
          <CustomerProjects />
        </div>

        <CustomerTimeline />

      </div>
    </DashboardLayout>
  );
}