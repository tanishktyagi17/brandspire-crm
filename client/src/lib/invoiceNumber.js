const STORAGE_KEY = "invoice_counter";

export function generateInvoiceNumber() {
  const year = new Date().getFullYear();

  let counter = Number(localStorage.getItem(STORAGE_KEY) || 0);

  counter += 1;

  localStorage.setItem(STORAGE_KEY, counter);

  return `BRD-${year}-${String(counter).padStart(6, "0")}`;
}

export function resetInvoiceCounter() {
  localStorage.removeItem(STORAGE_KEY);
}