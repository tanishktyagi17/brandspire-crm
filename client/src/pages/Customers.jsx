import { useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import CustomerStats from "../components/customers/CustomerStats";
import CustomerToolbar from "../components/customers/CustomerToolbar";
import CustomerTable from "../components/customers/CustomerTable";

export default function Customers() {
  const [customers, setCustomers] = useState([
    {
      id: 1001,
      name: "John Doe",
      company: "Google",
      email: "john@gmail.com",
      phone: "+91 9876543210",
      status: "Active",
    },
    {
      id: 1002,
      name: "Sarah Lee",
      company: "Microsoft",
      email: "sarah@gmail.com",
      phone: "+91 9988776655",
      status: "Active",
    },
    {
      id: 1003,
      name: "Alex Brown",
      company: "Amazon",
      email: "alex@gmail.com",
      phone: "+91 9123456789",
      status: "Inactive",
    },
    {
      id: 1004,
      name: "Emma Watson",
      company: "Netflix",
      email: "emma@gmail.com",
      phone: "+91 9876540000",
      status: "Active",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const addCustomer = (customer) => {
    const newCustomer = {
      ...customer,
      id: Date.now(),
    };

    setCustomers((prev) => [newCustomer, ...prev]);
  };

  const filteredCustomers = customers.filter((customer) => {
    const search = searchTerm.toLowerCase();

    return (
      customer.name.toLowerCase().includes(search) ||
      customer.company.toLowerCase().includes(search) ||
      customer.email.toLowerCase().includes(search) ||
      customer.phone.toLowerCase().includes(search)
    );
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold">Customers</h1>

          <p className="text-gray-500 mt-2">
            Manage all your customers in one place.
          </p>
        </div>

        <CustomerStats customers={customers} />

        <CustomerToolbar
          addCustomer={addCustomer}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <CustomerTable customers={filteredCustomers} />
      </div>
    </DashboardLayout>
  );
}