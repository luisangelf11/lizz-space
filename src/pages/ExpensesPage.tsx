import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  TrendingDown,
  ArrowLeft,
  Trash2,
  ReceiptText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useExpenses } from "@/hooks/useExpenses";

// Categorías estáticas para el Select
const CATEGORIES = [
  "Mercancía",
  "Marketing",
  "Servicios",
  "Transporte",
  "Personal",
  "Otros",
];

export default function ExpensesPage() {
  const navigate = useNavigate();
  const { expenses, addExpense, deleteExpense, totalAmount } = useExpenses();
  const [isOpen, setIsOpen] = useState(false);

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
  });

  const handleSave = async () => {
    if (!form.title || !form.amount || !form.category) return;
    await addExpense({
      ...form,
      amount: Number(form.amount),
    });
    setForm({
      title: "",
      amount: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
      description: "",
    });
    setIsOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header */}
      <header className="flex items-center justify-between max-w-4xl mx-auto mb-10">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="text-zinc-500 hover:text-white transition-colors"
        >
          <ArrowLeft className="mr-2" size={20} /> Dashboard
        </Button>
        <h1 className="text-xl font-light tracking-[0.3em] uppercase">
          Gastos
        </h1>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-white text-black hover:bg-zinc-200 rounded-full h-10 px-4 font-medium transition-all">
              <Plus size={18} className="mr-2" /> Nuevo Gasto
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-zinc-950 border-zinc-800 text-white backdrop-blur-xl">
            <DialogHeader>
              <DialogTitle className="font-light tracking-tight text-xl">
                Registrar Gasto
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-zinc-500 ml-1">
                  Concepto
                </label>
                <Input
                  placeholder="Ej. Pago de luz"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="bg-zinc-900 border-zinc-800 focus-visible:ring-zinc-700"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-500 ml-1">
                    Monto
                  </label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={form.amount}
                    onChange={(e) =>
                      setForm({ ...form, amount: e.target.value })
                    }
                    className="bg-zinc-900 border-zinc-800 focus-visible:ring-zinc-700"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-500 ml-1">
                    Categoría
                  </label>
                  <Select
                    onValueChange={(val) => setForm({ ...form, category: val })}
                  >
                    <SelectTrigger className="bg-zinc-900 border-zinc-800 text-zinc-400">
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-zinc-500 ml-1">
                  Fecha
                </label>
                <Input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="bg-zinc-900 border-zinc-800 scheme-dark"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={handleSave}
                className="w-full bg-white text-black hover:bg-zinc-200 py-6 text-lg font-light tracking-widest"
              >
                GUARDAR GASTO
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </header>

      <main className="max-w-4xl mx-auto">
        <section className="mb-12 text-center p-12 border border-zinc-900 rounded-[2rem] bg-linear-to-b from-zinc-950 to-black relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-linear-to-r from-transparent via-red-500/50 to-transparent" />
          <span className="text-[10px] uppercase tracking-[0.5em] text-zinc-500 font-bold mb-4 block">
            Total Egresos
          </span>
          <h2 className="text-6xl md:text-7xl font-extralight tracking-tighter text-white">
            ${totalAmount.toLocaleString()}
          </h2>
        </section>

        {/* Lista de Gastos */}
        <div className="space-y-3">
          <AnimatePresence>
            {expenses?.map((expense) => (
              <motion.div
                key={expense.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                layout
              >
                <Card className="bg-zinc-950 border-zinc-800 hover:border-zinc-700 transition-colors group">
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-red-400 group-hover:bg-red-500/10 transition-colors">
                        <TrendingDown size={20} />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-zinc-100">
                          {expense.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-zinc-500 font-semibold">
                          <span>{expense.category}</span>
                          <span>•</span>
                          <span>
                            {new Date(
                              expense.date + "T00:00:00"
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-light text-white">
                        -${expense.amount}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteExpense(expense.id!)}
                        className="opacity-0 group-hover:opacity-100 text-zinc-700 hover:text-red-500 transition-all"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {expenses?.length === 0 && (
          <div className="text-center py-20 opacity-20">
            <ReceiptText size={48} className="mx-auto mb-4" strokeWidth={1} />
            <p className="uppercase tracking-[0.3em] text-[10px]">
              No hay registros de gastos
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
