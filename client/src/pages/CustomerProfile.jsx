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
        <h1 className="text-3xl font-bold">
          Customer Not Found
        </h1>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">

        <CustomerHeader customer={customer} />

        <RevenueCards customerId={customer.id} />

        <div className="grid xl:grid-cols-2 gap-6">
          <CustomerInvoices customerId={customer.id} />
          <CustomerProjects />
        </div>

        <CustomerTimeline />

      </div>
    </DashboardLayout>
  );
}