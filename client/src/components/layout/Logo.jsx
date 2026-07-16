import { motion } from "framer-motion";

export default function Logo() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.9,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.5,
      }}
      className="flex items-center gap-4"
    >
      <motion.div
        whileHover={{
          rotate: 360,
          scale: 1.08,
        }}
        transition={{
          duration: 0.6,
        }}
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-2xl
          bg-gradient-to-br
          from-blue-500
          via-indigo-600
          to-purple-600
          text-xl
          font-bold
          text-white
          shadow-xl
        "
      >
        C
      </motion.div>

      <div>
        <h2 className="text-xl font-extrabold tracking-wide text-white">
          CRM PRO
        </h2>

        <p className="text-xs tracking-wide text-slate-400">
          Customer Management
        </p>
      </div>
    </motion.div>
  );
}