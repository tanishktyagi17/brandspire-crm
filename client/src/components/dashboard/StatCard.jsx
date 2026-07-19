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
        y: -6,
        scale: 1.02,
      }}
      transition={{
        duration: 0.3,
      }}
      className="
        relative
        overflow-hidden
        rounded-2xl
        lg:rounded-3xl
        bg-white/90
        backdrop-blur-xl
        border
        border-slate-200/70
        shadow-lg
        hover:shadow-2xl

        p-4
        lg:p-6
      "
    >
      {/* Background Glow */}
      <div
        className={`
          absolute
          -right-10
          -top-10
          h-28
          w-28
          lg:h-36
          lg:w-36
          rounded-full
          opacity-10
          blur-2xl
          ${color}
        `}
      />

      {/* Top */}
      <div className="relative flex items-start justify-between">

        <div className="min-w-0">

          <p className="text-[11px] lg:text-sm font-bold uppercase tracking-wider text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl lg:text-4xl font-extrabold text-slate-800 break-words">
            {value}
          </h2>

          <p className="mt-1 text-xs lg:text-sm text-slate-500">
            {subtitle}
          </p>

        </div>

        <div
          className={`
            flex
            h-12
            w-12
            lg:h-16
            lg:w-16
            items-center
            justify-center
            rounded-xl
            lg:rounded-2xl
            text-white
            shadow-lg
            shrink-0
            ${color}
          `}
        >
          {icon}
        </div>

      </div>

      {/* Bottom */}

      <div className="relative mt-4 lg:mt-6">

        <div
          className={`
            inline-flex
            items-center
            gap-1
            rounded-full
            px-2.5
            py-1
            lg:px-3
            lg:py-1.5
            text-xs
            lg:text-sm
            font-semibold

            ${
              positive
                ? "bg-emerald-100 text-emerald-700"
                : "bg-red-100 text-red-600"
            }
          `}
        >
          {positive ? (
            <TrendingUp size={14} />
          ) : (
            <TrendingDown size={14} />
          )}

          {change}
        </div>

        <span className="hidden lg:block mt-3 text-xs text-slate-400">
          Compared to last month
        </span>

      </div>

      {/* Progress */}

      <div className="mt-4 lg:mt-6 h-1 lg:h-1.5 overflow-hidden rounded-full bg-slate-100">

        <motion.div
          initial={{ width: 0 }}
          animate={{
            width: positive ? "82%" : "38%",
          }}
          transition={{
            duration: 1,
          }}
          className={`h-full rounded-full ${color}`}
        />

      </div>
    </motion.div>
  );
}