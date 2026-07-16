import { useState } from "react";
import { toast } from "sonner";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  getCompanyProfile,
  saveCompanyProfile,
} from "../lib/companyStorage";

import LogoUploader from "../components/settings/LogoUploader";
import SignatureUploader from "../components/settings/SignatureUploader";
import CompanyProfile from "../components/settings/CompanyProfile";
import BusinessSettings from "../components/settings/BusinessSettings";
import BankDetails from "../components/settings/BankDetails";

export default function Settings() {
  const [company, setCompany] = useState(
    getCompanyProfile()
  );

  const handleSave = () => {
    saveCompanyProfile(company);

    toast.success(
      "Company settings saved successfully!"
    );
  };

  return (
    <DashboardLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-3xl font-bold">
            Company Settings
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your company information.
          </p>

        </div>

        <div className="grid xl:grid-cols-3 gap-6">

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
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl transition"
          >
            Save Settings
          </button>

        </div>

      </div>

    </DashboardLayout>
  );
}