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
        duration: 0.35,
      }}
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-slate-200/70
        bg-white/90
        p-4
        shadow-lg
        backdrop-blur-xl
        transition-all
        hover:shadow-2xl
        sm:p-5
        lg:p-6
      "
    >
      {/* Decorative Background */}
      <div
        className={`
          absolute
          -right-10
          -top-10
          h-28
          w-28
          rounded-full
          opacity-10
          blur-2xl
          lg:h-36
          lg:w-36
          ${color}
        `}
      />

      {/* Top */}
      <div className="relative flex items-start justify-between">

        <div className="flex-1 min-w-0">

          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 sm:text-sm">
            {title}
          </p>

          <h2 className="mt-2 break-words text-2xl font-extrabold text-slate-800 sm:text-3xl lg:text-4xl">
            {value}
          </h2>

          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            {subtitle}
          </p>

        </div>

        <div
          className={`
            ml-3
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-2xl
            text-white
            shadow-lg
            sm:h-14
            sm:w-14
            lg:h-16
            lg:w-16
            ${color}
          `}
        >
          {icon}
        </div>

      </div>

      {/* Bottom */}
      <div className="relative mt-4 flex items-center justify-between gap-3 lg:mt-6">

        <div
          className={`
            flex
            items-center
            gap-1.5
            rounded-full
            px-2.5
            py-1
            text-xs
            font-semibold
            sm:px-3
            sm:py-1.5
            sm:text-sm
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

        <span className="hidden text-xs text-slate-400 lg:block">
          Compared to last month
        </span>

      </div>

      {/* Progress */}
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100 lg:mt-6">

        <motion.div
          initial={{ width: 0 }}
          animate={{
            width: positive ? "82%" : "38%",
          }}
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