import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";

import { navigation } from "@/constants/navigation";
import Logo from "./Logo";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`bg-slate-950 text-white transition-all duration-300 flex flex-col justify-between ${
        collapsed ? "w-20" : "w-72"
      }`}
    >
      {/* Top */}
      <div>
        {/* Logo */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          {!collapsed && <Logo />}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-slate-800 transition"
          >
            {collapsed ? (
              <ChevronRight size={18} />
            ) : (
              <ChevronLeft size={18} />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.title}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                <Icon size={22} />

                {!collapsed && (
                  <span className="font-medium">
                    {item.title}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-800 p-4">
        {!collapsed && (
          <div className="mb-4">
            <p className="font-semibold">Admin</p>
            <p className="text-sm text-slate-400">
              admin@gmail.com
            </p>
          </div>
        )}

        <button
          className="flex w-full items-center gap-3 rounded-xl bg-red-600 px-4 py-3 hover:bg-red-700 transition"
        >
          <LogOut size={20} />

          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}