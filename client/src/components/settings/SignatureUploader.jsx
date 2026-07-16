import { Upload } from "lucide-react";

export default function SignatureUploader({
  signature,
  setSignature,
}) {
  const handleChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setSignature(reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">

      <h2 className="text-xl font-semibold mb-5">
        Authorized Signature
      </h2>

      <div className="flex flex-col items-center gap-5">

        {signature ? (
          <img
            src={signature}
            alt="Signature"
            className="h-24 object-contain border rounded-lg p-2"
          />
        ) : (
          <div className="h-24 w-full border-2 border-dashed rounded-lg flex items-center justify-center text-gray-400">
            No Signature
          </div>
        )}

        <label className="cursor-pointer bg-violet-600 hover:bg-violet-700 text-white px-5 py-3 rounded-xl flex items-center gap-2">

          <Upload size={18} />

          Upload Signature

          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleChange}
          />

        </label>

      </div>

    </div>
  );
}