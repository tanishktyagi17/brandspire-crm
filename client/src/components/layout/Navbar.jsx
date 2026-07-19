import {
  Bell,
  Search,
  Menu,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

export default function Navbar({
  sidebarOpen,
  setSidebarOpen,
}) {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-16 sm:h-20 items-center justify-between border-b bg-white px-4 sm:px-6 lg:px-8 shadow-sm">

      {/* Left Section */}
      <div className="flex items-center gap-4">

        {/* Mobile Menu */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-xl p-2 hover:bg-slate-100 lg:hidden"
        >
          <Menu size={24} />
        </button>

        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
            Dashboard
          </h1>

          <p className="hidden sm:block text-slate-500">
            Welcome back,{" "}
            <span className="font-semibold text-blue-600">
              {user?.name || "Admin"}
            </span>
            👋
          </p>
        </div>

      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 sm:gap-6">

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

        {/* Notification */}
        <button className="relative rounded-full p-2 hover:bg-slate-100">
          <Bell size={22} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        {/* User */}
        <div className="flex items-center gap-3">

          <img
            src={
              user?.avatar ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                user?.name || "Admin"
              )}&background=2563eb&color=fff`
            }
            alt={user?.name || "User"}
            className="h-10 w-10 rounded-full border"
          />

          <div className="hidden lg:block">
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