import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Heart } from "lucide-react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const MASTER_PASSWORD = import.meta.env.VITE_PUBLIC_PASSWORD;

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    if (password === MASTER_PASSWORD) {
      localStorage.setItem("isLoggedIn", "true");
      toast.success("Acceso concedido", {
        description: "Bienvenida de vuelta, señorita Adames.",
      });
      navigate("/");
    } else {
      toast.error("Acceso denegado", {
        description: "La clave mágica es incorrecta.",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden p-4">
      {/* Efectos de Iluminación Ambiental */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 w-full max-w-100"
      >
        <Card className="bg-zinc-950/50 backdrop-blur-xl border-zinc-800 shadow-2xl relative overflow-hidden">
          {/* Línea de brillo superior */}
          <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-zinc-500 to-transparent opacity-50" />
          
          <CardContent className="pt-10 pb-8 px-8">
            <div className="text-center mb-10">
              <motion.h1
                initial={{ letterSpacing: "0.3em", opacity: 0 }}
                animate={{ letterSpacing: "0.15em", opacity: 1 }}
                transition={{ delay: 0.2, duration: 1 }}
                className="text-3xl font-extralight text-white uppercase mb-3"
              >
                LizzSpace
              </motion.h1>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 0.5 }}
                className="h-px w-12 bg-white mx-auto mb-3"
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 0.6 }}
                className="text-[10px] text-zinc-400 uppercase tracking-widest font-medium"
              >
                Personal Dashboard
              </motion.p>
            </div>

            <form onSubmit={handleLogin} className="space-y-8">
              <div className="space-y-3">
                <Label 
                  htmlFor="password" 
                  className="text-zinc-500 text-[10px] uppercase tracking-widest ml-1"
                >
                  Contraseña Maestra
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  className="bg-zinc-900/50 border-zinc-800 text-white text-center focus-visible:ring-zinc-700 h-12 rounded-lg transition-all"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-white text-black hover:bg-zinc-200 h-12 rounded-lg font-medium tracking-wide transition-all active:scale-[0.98]"
              >
                {isLoading ? "Verificando..." : "Entrar al Espacio"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer Minimalista */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1 }}
          className="flex items-center justify-center gap-2 mt-12 text-[9px] text-zinc-500 tracking-[0.4em] uppercase"
        >
          <span>Hecho para Lissette</span>
          <Heart size={8} className="text-red-900 fill-red-900" />
        </motion.div>
      </motion.div>
    </div>
  );
}