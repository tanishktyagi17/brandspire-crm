import { useEffect, useState } from "react";
import { toast } from "sonner";

import DashboardLayout from "../layouts/DashboardLayout";

import LogoUploader from "../components/settings/LogoUploader";
import SignatureUploader from "../components/settings/SignatureUploader";
import CompanyProfile from "../components/settings/CompanyProfile";
import BusinessSettings from "../components/settings/BusinessSettings";
import BankDetails from "../components/settings/BankDetails";

import {
  getCompany,
  updateCompany,
} from "../services/companyService";

const emptyCompany = {
  companyName: "",
  email: "",
  phone: "",
  website: "",
  gstin: "",
  pan: "",
  address: "",

  currency: "INR",
  invoicePrefix: "INV",
  defaultGST: 18,
  paymentTerms: "Due on Receipt",

  bankName: "",
  accountName: "",
  accountNumber: "",
  ifsc: "",
  branch: "",
  upi: "",

  logo: "",
  signature: "",
};

export default function Settings() {
  const [company, setCompany] = useState(emptyCompany);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadCompany();
  }, []);

  async function loadCompany() {
    try {
      setLoading(true);

      const data = await getCompany();

      if (data.success) {
        setCompany({
          ...emptyCompany,
          ...data.company,
        });
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load company settings."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    try {
      setSaving(true);

      const data = await updateCompany(company);

      if (data.success) {
        toast.success(
          "Company settings saved successfully!"
        );
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to save company settings."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-slate-700">
            Loading Company Settings...
          </h2>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div>

          <h1 className="text-3xl font-bold">
            Company Settings
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your company information.
          </p>

        </div>

        <div className="grid gap-6 xl:grid-cols-3">

          <LogoUploader
            logo={company.logo}
            setLogo={(logo) =>
              setCompany((prev) => ({
                ...prev,
                logo,
              }))
            }
          />

          <SignatureUploader
            signature={company.signature}
            setSignature={(signature) =>
              setCompany((prev) => ({
                ...prev,
                signature,
              }))
            }
          />

        </div>

        <CompanyProfile
          company={company}
          setCompany={setCompany}
        />

        <BusinessSettings
          company={company}
          setCompany={setCompany}
        />

        <BankDetails
          company={company}
          setCompany={setCompany}
        />

        <div className="flex justify-end">

          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-xl bg-blue-600 px-8 py-3 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Settings"}
          </button>

        </div>

      </div>
    </DashboardLayout>
  );
}