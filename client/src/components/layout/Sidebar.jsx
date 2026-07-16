import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { toast } from "sonner";

import { useAuth } from "../../context/AuthContext";
import { navigation } from "@/constants/navigation";
import Logo from "./Logo";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();

    toast.success("Logged out successfully");

    navigate("/", { replace: true });
  };

  return (
    <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`
        ${collapsed ? "w-20" : "w-72"}
        relative
        flex
        flex-col
        justify-between
        border-r
        border-slate-800/50
        bg-slate-950/95
        backdrop-blur-2xl
        text-white
        shadow-2xl
        transition-all
        duration-300
      `}
    >
      {/* Decorative Glow */}
      <div className="pointer-events-none absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />

      {/* Top */}
      <div className="relative z-10">

        {/* Logo */}
        <div className="flex items-center justify-between border-b border-slate-800/70 px-5 py-6">

          {!collapsed && <Logo />}

          <motion.button
            whileHover={{ rotate: 180, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCollapsed(!collapsed)}
            className="rounded-xl bg-slate-800 p-2 hover:bg-slate-700"
          >
            {collapsed ? (
              <ChevronRight size={18} />
            ) : (
              <ChevronLeft size={18} />
            )}
          </motion.button>

        </div>

        {/* Navigation */}
        <nav className="mt-8 space-y-3 px-3">

          {navigation.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `
                    group
                    relative
                    flex
                    items-center
                    gap-4
                    rounded-2xl
                    px-4
                    py-3
                    font-medium
                    transition-all
                    duration-300

                    ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/30"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white hover:translate-x-2"
                    }
                  `
                  }
                >
                  <Icon
                    size={22}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />

                  {!collapsed && (
                    <span>{item.title}</span>
                  )}
                </NavLink>
              </motion.div>
            );
          })}

        </nav>

      </div>

      {/* Bottom */}
      <div className="relative z-10 border-t border-slate-800/70 p-5">

        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-5 rounded-2xl bg-slate-900 p-4"
          >
            <p className="font-semibold text-white">
              {user?.name || "Admin"}
            </p>

            <p className="text-sm text-slate-400">
              {user?.email || ""}
            </p>
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleLogout}
          className="
            flex
            w-full
            items-center
            justify-center
            gap-3
            rounded-2xl
            bg-gradient-to-r
            from-red-500
            to-red-600
            px-4
            py-3
            font-semibold
            shadow-lg
            transition-all
            hover:shadow-red-500/40
          "
        >
          <LogOut size={20} />

          {!collapsed && (
            <span>Logout</span>
          )}
        </motion.button>

      </div>

    </motion.aside>
  );
}