import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router";
import { useState } from "react";

export function Header({ name = "Lissette Noemy Adames" }) {
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between w-full py-8 mb-12 border-b border-zinc-900">
      <div className="flex items-center gap-4 w-[90%] mx-auto">
        <Avatar className="h-12 w-12 border border-zinc-700 bg-transparent">
          <AvatarFallback className="bg-transparent text-white font-light text-xl">
            L
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h2 className="text-sm font-medium tracking-wide text-zinc-100">
            {name}
          </h2>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold">
              Online
            </span>
          </div>
        </div>
        <button
          onClick={() => setOpenAlert(true)}
          className="p-2 hover:bg-zinc-900 rounded-full transition-colors text-zinc-500 hover:text-white"
        >
          <LogOut size={18} />
        </button>
      </div>
      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent className="bg-zinc-950/90 backdrop-blur-xl border-zinc-800 text-white max-w-95">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-light tracking-tight text-center">
              ¿Cerrar sesión ahora?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-500 text-center font-light text-sm pt-2">
              Tendrás que ingresar la clave mágica nuevamente para acceder a tu
              espacio.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="flex-row gap-3 mt-6 sm:justify-center">
            <AlertDialogCancel className="flex-1 bg-transparent border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white rounded-lg transition-all">
              Volver
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogout}
              className="flex-1 bg-white text-black hover:bg-zinc-200 rounded-lg font-medium transition-all"
            >
              Salir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>
  );
}
