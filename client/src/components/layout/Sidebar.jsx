import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";

import { navigation } from "@/constants/navigation";
import { useAuth } from "../../context/AuthContext";
import Logo from "./Logo";

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}) {
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();

    navigate("/");
  };

  const handleNavigation = () => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`
        fixed
        lg:static
        inset-y-0
        left-0
        z-50

        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }

        ${
          collapsed
            ? "lg:w-20"
            : "w-72"
        }

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
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />

      {/* Top */}
      <div className="relative z-10">

        {/* Logo */}
        <div className="flex items-center justify-between border-b border-slate-800/70 px-5 py-6">

          {!collapsed && <Logo />}

          <motion.button
            whileHover={{
              rotate: 180,
              scale: 1.1,
            }}
            whileTap={{
              scale: 0.9,
            }}
            onClick={() =>
              setCollapsed(!collapsed)
            }
            className="hidden rounded-xl bg-slate-800 p-2 hover:bg-slate-700 lg:block"
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
                initial={{
                  opacity: 0,
                  x: -15,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: index * 0.05,
                }}
              >
                <NavLink
                  to={item.path}
                  onClick={handleNavigation}
                  className={({ isActive }) =>
                    `
                    group
                    flex
                    items-center
                    gap-4
                    rounded-2xl
                    px-4
                    py-3
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
                    className="group-hover:scale-110 transition-transform"
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
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            className="mb-5 rounded-2xl bg-slate-900 p-4"
          >
            <p className="font-semibold">
              {JSON.parse(
                localStorage.getItem("user")
              )?.name || "Admin"}
            </p>

            <p className="text-sm text-slate-400">
              {JSON.parse(
                localStorage.getItem("user")
              )?.email ||
                "admin@gmail.com"}
            </p>
          </motion.div>
        )}

        <motion.button
          whileHover={{
            scale: 1.03,
          }}
          whileTap={{
            scale: 0.96,
          }}
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