export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-xl font-bold text-white shadow-lg">
        C
      </div>

      <div>
        <h2 className="text-lg font-bold text-white">
          CRM PRO
        </h2>

        <p className="text-xs text-slate-400">
          Customer Management
        </p>
      </div>
    </div>
  );
}