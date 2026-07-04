import { motion } from "framer-motion";

export default function StatCard({
  title,
  value,
  icon,
  color,
  change,
  subtitle,
}) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.25 }}
      className={`relative overflow-hidden rounded-3xl p-6 text-white shadow-xl ${color}`}
    >
      {/* Background Circle */}
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/10"></div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-80">{title}</p>

          <h2 className="mt-3 text-4xl font-bold">{value}</h2>

          <p className="mt-2 text-sm opacity-80">{subtitle}</p>
        </div>

        <div className="rounded-2xl bg-white/20 p-4 backdrop-blur-lg">
          {icon}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <span className="text-sm opacity-80">Growth</span>

        <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-semibold">
          {change}
        </span>
      </div>
    </motion.div>
  );
}