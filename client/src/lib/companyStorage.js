const STORAGE_KEY = "company_profile";

const defaultCompany = {
  // Company Information
  companyName: "Brandspire Technologies",
  email: "admin@brandspire.in",
  phone: "+91 9876543210",
  website: "https://brandspire.in",

  // Tax Details
  gstin: "",
  pan: "",
  cin: "",

  // Address
  address: "",
  city: "",
  state: "",
  pincode: "",
  country: "India",

  // Banking
  bankName: "",
  accountName: "",
  accountNumber: "",
  ifsc: "",
  branch: "",
  upi: "",

  // Invoice Preferences
  currency: "INR",
  invoicePrefix: "BRD",
  defaultGST: 18,
  paymentTerms: "Net 7 Days",

  // Branding
  logo: "",
  signature: "",
};

export function getCompanyProfile() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(defaultCompany)
      );

      return defaultCompany;
    }

    return {
      ...defaultCompany,
      ...JSON.parse(data),
    };
  } catch (error) {
    console.error(error);

    return defaultCompany;
  }
}

export function saveCompanyProfile(profile) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(profile)
  );
}

export function resetCompanyProfile() {
  localStorage.removeItem(STORAGE_KEY);
}