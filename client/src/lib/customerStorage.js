const STORAGE_KEY = "customers";

/**
 * Get all customers
 */
export function getCustomers() {
  try {
    const customers = localStorage.getItem(STORAGE_KEY);
    return customers ? JSON.parse(customers) : [];
  } catch (error) {
    console.error("Error loading customers:", error);
    return [];
  }
}

/**
 * Get customer by ID
 */
export function getCustomerById(id) {
  return getCustomers().find(
    (customer) => String(customer.id) === String(id)
  );
}

/**
 * Save all customers
 */
export function saveCustomers(customers) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(customers)
    );
  } catch (error) {
    console.error("Error saving customers:", error);
  }
}

/**
 * Add customer
 */
export function addCustomer(customer) {
  const customers = getCustomers();

  const newCustomer = {
    id: Date.now(),

    name: "",

    company: "",

    email: "",

    phone: "",

    address: "",

    city: "",

    state: "",

    country: "",

    pincode: "",

    website: "",

    gst: "",

    project: "",

    revenue: 0,

    notes: "",

    status: "Active",

    createdAt: new Date().toISOString(),

    ...customer,
  };

  customers.push(newCustomer);

  saveCustomers(customers);

  return newCustomer;
}

/**
 * Update customer
 */
export function updateCustomer(updatedCustomer) {
  const customers = getCustomers();

  const updatedCustomers = customers.map((customer) =>
    String(customer.id) === String(updatedCustomer.id)
      ? {
          ...customer,
          ...updatedCustomer,
        }
      : customer
  );

  saveCustomers(updatedCustomers);

  return updatedCustomer;
}

/**
 * Delete customer
 */
export function deleteCustomer(id) {
  const customers = getCustomers();

  const filteredCustomers = customers.filter(
    (customer) =>
      String(customer.id) !== String(id)
  );

  saveCustomers(filteredCustomers);
}

/**
 * Remove all customers
 */
export function clearCustomers() {
  localStorage.removeItem(STORAGE_KEY);
}