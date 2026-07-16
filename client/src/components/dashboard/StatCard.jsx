import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatCard({
  title,
  value,
  subtitle,
  change,
  color,
  icon,
}) {
  const positive = change.startsWith("+");

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -8,
        scale: 1.03,
      }}
      transition={{
        duration: 0.35,
      }}
      className="
        relative
        overflow-hidden
        rounded-3xl
        bg-white/90
        backdrop-blur-xl
        border
        border-slate-200/70
        shadow-lg
        hover:shadow-2xl
        p-6
      "
    >
      {/* Decorative Background */}
      <div
        className={`
          absolute
          -right-10
          -top-10
          h-36
          w-36
          rounded-full
          opacity-10
          blur-2xl
          ${color}
        `}
      />

      {/* Top */}
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-extrabold text-slate-800">
            {value}
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            {subtitle}
          </p>
        </div>

        <div
          className={`
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            text-white
            shadow-lg
            ${color}
          `}
        >
          {icon}
        </div>
      </div>

      {/* Bottom */}
      <div className="relative mt-6 flex items-center justify-between">
        <div
          className={`
            flex
            items-center
            gap-2
            rounded-full
            px-3
            py-1.5
            text-sm
            font-semibold
            ${
              positive
                ? "bg-emerald-100 text-emerald-700"
                : "bg-red-100 text-red-600"
            }
          `}
        >
          {positive ? (
            <TrendingUp size={16} />
          ) : (
            <TrendingDown size={16} />
          )}

          {change}
        </div>

        <span className="text-xs text-slate-400">
          Compared to last month
        </span>
      </div>

      {/* Progress Line */}
      <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-slate-100">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: positive ? "82%" : "38%" }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
          }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
    </motion.div>
  );
}