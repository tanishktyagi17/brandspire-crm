import { Upload } from "lucide-react";

export default function LogoUploader({
  logo,
  setLogo,
}) {
  const handleChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setLogo(reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">

      <h2 className="text-xl font-semibold mb-5">
        Company Logo
      </h2>

      <div className="flex flex-col items-center gap-5">

        {logo ? (
          <img
            src={logo}
            alt="Company Logo"
            className="w-36 h-36 rounded-xl border object-contain"
          />
        ) : (
          <div className="w-36 h-36 rounded-xl border-2 border-dashed flex items-center justify-center text-gray-400">
            No Logo
          </div>
        )}

        <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2">

          <Upload size={18} />

          Upload Logo

          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleChange}
          />

        </label>

      </div>

    </div>
  );
}