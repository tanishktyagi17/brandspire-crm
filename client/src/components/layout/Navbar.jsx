import {
  Bell,
  Search,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <header className="flex h-20 items-center justify-between border-b bg-white px-8 shadow-sm">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="text-slate-500">
          Welcome back,{" "}
          <span className="font-semibold text-blue-600">
            {user?.name || "Admin"}
          </span>
          👋
        </p>
      </div>

      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search
            className="absolute left-3 top-3 text-slate-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-72 rounded-xl border border-slate-300 bg-slate-50 py-2 pl-10 pr-4 outline-none focus:border-blue-500"
          />
        </div>

        {/* Notifications */}
        <button className="relative rounded-full p-2 hover:bg-slate-100">
          <Bell size={22} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        {/* User Info */}
        <div className="flex items-center gap-3">
          <img
            src={
              user?.avatar ||
              "https://ui-avatars.com/api/?name=" +
                encodeURIComponent(user?.name || "Admin") +
                "&background=2563eb&color=fff"
            }
            alt={user?.name}
            className="h-11 w-11 rounded-full border"
          />

          <div className="hidden md:block">
            <p className="font-semibold text-slate-800">
              {user?.name}
            </p>

            <p className="text-sm text-slate-500">
              {user?.role}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}