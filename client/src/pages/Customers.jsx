import { useState, useEffect } from "react";
import { toast } from "sonner";

import DashboardLayout from "../layouts/DashboardLayout";
import CustomerStats from "../components/customers/CustomerStats";
import CustomerToolbar from "../components/customers/CustomerToolbar";
import CustomerTable from "../components/customers/CustomerTable";
import AddCustomerDialog from "../components/customers/AddCustomerDialog";

import {
  getCustomers,
  createCustomer,
  updateCustomer as updateCustomerAPI,
  deleteCustomer as deleteCustomerAPI,
} from "../services/customerService";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  /* ===========================================================
     LOAD CUSTOMERS
  =========================================================== */

  const fetchCustomers = async () => {
    try {
      setLoading(true);

      const response = await getCustomers();

      setCustomers(response.customers || []);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load customers."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);
  /* ===========================================================
     ADD CUSTOMER
  =========================================================== */

  const addCustomer = async (customer) => {
    try {
      const response = await createCustomer(customer);

      setCustomers((prev) => [
        response.customer,
        ...prev,
      ]);

      toast.success("Customer added successfully.");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to add customer."
      );
    }
  };

  /* ===========================================================
     UPDATE CUSTOMER
  =========================================================== */

  const updateCustomer = async (updatedCustomer) => {
    try {
     const response = await updateCustomerAPI(
  updatedCustomer.id,
  updatedCustomer
);

setCustomers((prev) =>
  prev.map((customer) =>
    customer.id === response.customer.id
      ? response.customer
      : customer
  )
);

      toast.success("Customer updated successfully.");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update customer."
      );
    }
  };

  /* ===========================================================
     DELETE CUSTOMER
  =========================================================== */

  const deleteCustomer = async (id) => {
    if (!window.confirm("Delete this customer?")) return;

    try {
      await deleteCustomerAPI(id);

      setCustomers((prev) =>
  prev.filter(
    (customer) => customer.id !== id
  )
);

      toast.success("Customer deleted.");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete customer."
      );
    }
  };

  /* ===========================================================
     DIALOG
  =========================================================== */

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

  /* ===========================================================
     SEARCH & FILTER
  =========================================================== */

  const filteredCustomers = customers.filter(
    (customer) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        customer.name
          ?.toLowerCase()
          .includes(search) ||
        customer.project
          ?.toLowerCase()
          .includes(search) ||
        customer.email
          ?.toLowerCase()
          .includes(search) ||
        customer.phone
          ?.toLowerCase()
          .includes(search);

      const matchesStatus =
        statusFilter === "All" ||
        customer.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    }
  );
  /* ===========================================================
     UI
  =========================================================== */

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <h2 className="text-xl font-semibold text-slate-600">
            Loading Customers...
          </h2>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-5 lg:space-y-8">

        {/* Header */}

        <div>
          <h1 className="text-3xl font-bold text-slate-800 lg:text-4xl">
            Customers
          </h1>

          <p className="mt-2 text-sm text-slate-500 lg:text-base">
            Manage all your customers and projects.
          </p>
        </div>

        {/* Stats */}

        <CustomerStats customers={customers} />

        {/* Toolbar */}

        <CustomerToolbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          onAddCustomer={handleAddCustomer}
        />

        {/* Table */}

        <CustomerTable
          customers={filteredCustomers}
          onEdit={handleEdit}
          onDelete={deleteCustomer}
        />

        {/* Dialog */}

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