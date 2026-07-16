import { useState, useEffect } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import CustomerStats from "../components/customers/CustomerStats";
import CustomerToolbar from "../components/customers/CustomerToolbar";
import CustomerTable from "../components/customers/CustomerTable";
import AddCustomerDialog from "../components/customers/AddCustomerDialog";

import customerData from "../lib/customerData";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("customers");

    if (saved) {
      setCustomers(JSON.parse(saved));
    } else {
      setCustomers(customerData);
      localStorage.setItem(
        "customers",
        JSON.stringify(customerData)
      );
    }
  }, []);

  useEffect(() => {
    if (customers.length) {
      localStorage.setItem(
        "customers",
        JSON.stringify(customers)
      );
    }
  }, [customers]);

  const addCustomer = (customer) => {
    const newCustomer = {
      ...customer,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };

    setCustomers((prev) => [newCustomer, ...prev]);
  };

  const updateCustomer = (updatedCustomer) => {
    setCustomers((prev) =>
      prev.map((customer) =>
        customer.id === updatedCustomer.id
          ? updatedCustomer
          : customer
      )
    );
  };

  const deleteCustomer = (id) => {
    if (!window.confirm("Delete this customer?")) return;

    setCustomers((prev) =>
      prev.filter((customer) => customer.id !== id)
    );
  };

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setIsEditMode(true);
    setDialogOpen(true);
  };

  const handleAddCustomer = () => {
    setSelectedCustomer(null);
    setIsEditMode(false);
    setDialogOpen(true);
  };

  const filteredCustomers = customers.filter((customer) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      customer.name.toLowerCase().includes(search) ||
      customer.project.toLowerCase().includes(search) ||
      customer.email.toLowerCase().includes(search) ||
      customer.phone.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "All" ||
      customer.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold">
            Customers
          </h1>

          <p className="mt-2 text-gray-500">
            Manage all your customers and projects.
          </p>

        </div>

        <CustomerStats customers={customers} />

        <CustomerToolbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          onAddCustomer={handleAddCustomer}
        />

        <CustomerTable
          customers={filteredCustomers}
          onEdit={handleEdit}
          onDelete={deleteCustomer}
        />

        <AddCustomerDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          addCustomer={addCustomer}
          updateCustomer={updateCustomer}
          selectedCustomer={selectedCustomer}
          isEditMode={isEditMode}
        />

      </div>

    </DashboardLayout>
  );
}