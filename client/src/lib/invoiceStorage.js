const STORAGE_KEY = "invoices";

/**
 * Get all invoices
 */
export function getInvoices() {
  try {
    const invoices = localStorage.getItem(STORAGE_KEY);
    return invoices ? JSON.parse(invoices) : [];
  } catch (error) {
    console.error("Error loading invoices:", error);
    return [];
  }
}

/**
 * Get one invoice by ID
 */
export function getInvoiceById(id) {
  return getInvoices().find(
    (invoice) => String(invoice.id) === String(id)
  );
}

/**
 * Save or update invoice
 */
export function saveInvoice(invoice) {
  const invoices = getInvoices();

  const index = invoices.findIndex(
    (item) => String(item.id) === String(invoice.id)
  );

  if (index !== -1) {
    invoices[index] = {
      ...invoices[index],
      ...invoice,
      updatedAt: new Date().toISOString(),
    };
  } else {
    invoices.push({
      ...invoice,
      createdAt:
        invoice.createdAt ||
        new Date().toISOString(),
    });
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(invoices)
  );

  return invoice;
}

/**
 * Delete invoice
 */
export function deleteInvoice(id) {
  const filteredInvoices = getInvoices().filter(
    (invoice) =>
      String(invoice.id) !== String(id)
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(filteredInvoices)
  );
}

/**
 * Replace all invoices
 */
export function saveInvoices(invoices) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(invoices)
  );
}

/**
 * Remove all invoices
 */
export function clearInvoices() {
  localStorage.removeItem(STORAGE_KEY);
}