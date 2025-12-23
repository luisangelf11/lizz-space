import { Card, CardContent } from "@/components/ui/card";
import MainLayout from "@/layout/MainLayout";
import {
  StickyNote,
  Calendar,
  ShoppingBag,
  TrendingDown,
  Box,
} from "lucide-react";
import { Link } from "react-router";

const menuItems = [
  { id: "notes", label: "Notas", icon: StickyNote, color: "text-blue-400" },
  { id: "events", label: "Eventos", icon: Calendar, color: "text-purple-400" },
  {
    id: "sales",
    label: "Ventas",
    icon: ShoppingBag,
    color: "text-emerald-400",
  },
  {
    id: "expenses",
    label: "Gastos",
    icon: TrendingDown,
    color: "text-rose-400",
  },
  { id: "inventory", label: "Inventario", icon: Box, color: "text-amber-400" },
];

export default function HomePage() {
  return (
    <MainLayout>
      <main className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extralight tracking-tight text-white mb-4">
            ¿Qué quieres hacer hoy?
          </h1>
          <p className="text-zinc-500 font-light tracking-widest text-xs uppercase">
            Selecciona una categoría para gestionar
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {menuItems.map((item) => (
            <Link key={item.id} to={`/${item.id}`}>
              <Card
                key={item.id}
                className="group relative bg-zinc-950 border-zinc-800 hover:border-zinc-400 transition-all duration-500 cursor-pointer overflow-hidden aspect-square flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-linear-to-br from-white/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <div
                    className={`mb-4 p-3 rounded-2xl bg-zinc-900 group-hover:scale-110 transition-transform duration-500 ${item.color} group-hover:bg-white group-hover:text-black`}
                  >
                    <item.icon size={28} strokeWidth={1.5} />
                  </div>
                  <span className="text-sm font-light tracking-widest uppercase text-zinc-400 group-hover:text-white transition-colors">
                    {item.label}
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </MainLayout>
  );
}
