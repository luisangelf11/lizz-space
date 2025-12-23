import { motion } from "framer-motion";
import { Ghost, Home } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[20%] w-1 h-1 bg-white rounded-full animate-pulse-star" />
        <div className="absolute top-[40%] right-[10%] w-1.5 h-1.5 bg-zinc-500 rounded-full animate-pulse-star [animation-delay:1s]" />
        <div className="absolute bottom-[20%] left-[15%] w-1 h-1 bg-zinc-400 rounded-full animate-pulse-star [animation-delay:2s]" />
      </div>

      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
        className="relative z-10"
      >
        <Ghost
          size={80}
          className="text-zinc-600 mx-auto mb-6 animate-bounce-slow"
          strokeWidth={1.5}
        />

        <h1 className="text-7xl font-extralight tracking-tighter mb-4 bg-linear-to-b from-white to-zinc-500 bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-xl font-light text-zinc-300 mb-6">
          ¡Oops! Parece que el rincón que buscas... se desvaneció.
        </h2>
        <p className="text-sm text-zinc-500 max-w-sm mx-auto mb-10">
          No te preocupes, los errores pasan. Es posible que la página haya sido
          movida, eliminada, o tal vez Angel no la ha inventado aún.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button
            onClick={() => navigate("/")}
            className="bg-white text-black hover:bg-zinc-200 rounded-full px-6 py-3 text-sm font-medium transition-all group"
          >
            <Home
              size={16}
              className="mr-2 group-hover:rotate-360 transition-transform duration-500"
            />
            Volver al Dashboard
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
