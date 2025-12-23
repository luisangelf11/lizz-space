import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ArrowLeft, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
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
import { useSales } from "@/hooks/useSales";
import { useInventory } from "@/hooks/useInventory";

export default function SalesPage() {
  const navigate = useNavigate();
  const { sales, addSale, deleteSale, totalIncome } = useSales();
  const { products } = useInventory();
  const [isOpen, setIsOpen] = useState(false);

  const [form, setForm] = useState({
    productId: "",
    amount: "1",
    discount: "0",
    date: new Date().toISOString().split("T")[0],
  });

  const handleSave = async () => {
    const selectedProduct = products?.find(
      (p) => p.id === Number(form.productId)
    );
    if (!selectedProduct) return;

    const success = await addSale(
      {
        product: selectedProduct.title,
        amount: Number(form.amount),
        price: selectedProduct.price,
        discount: Number(form.discount),
        date: form.date,
        stock: selectedProduct.stock,
      },
      selectedProduct.id
    );

    if (success) {
      setIsOpen(false);
      setForm({
        productId: "",
        amount: "1",
        discount: "0",
        date: new Date().toISOString().split("T")[0],
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <header className="flex items-center justify-between max-w-5xl mx-auto mb-10">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="text-zinc-500 hover:text-white"
        >
          <ArrowLeft className="mr-2" size={20} /> Dashboard
        </Button>
        <h1 className="text-xl font-light tracking-[0.3em] uppercase">
          Ventas
        </h1>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-white text-black hover:bg-zinc-200 rounded-full px-6">
              <Plus size={18} className="mr-2" /> Nueva Venta
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-zinc-950 border-zinc-800 text-white">
            <DialogHeader>
              <DialogTitle className="font-light">Registrar Salida</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Select
                onValueChange={(val) => setForm({ ...form, productId: val })}
              >
                <SelectTrigger className="bg-zinc-900 border-zinc-800 italic">
                  <SelectValue placeholder="Seleccionar producto..." />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                  {products?.map((p) => (
                    <SelectItem key={p.id} value={p.id!.toString()}>
                      {p.title} (${p.price})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-medium ml-1">
                    Cantidad
                  </label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={form.amount}
                    onChange={(e) =>
                      setForm({ ...form, amount: e.target.value })
                    }
                    className="bg-zinc-900 border-zinc-800 focus:border-zinc-500 placeholder:text-zinc-700 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-medium ml-1">
                    Descuento ($)
                  </label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={form.discount}
                    onChange={(e) =>
                      setForm({ ...form, discount: e.target.value })
                    }
                    className="bg-zinc-900 border-zinc-800 focus:border-zinc-500 placeholder:text-zinc-700 text-white"
                  />
                </div>
              </div>
              <Input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="bg-zinc-900 border-zinc-800 scheme-dark"
              />
            </div>
            <DialogFooter>
              <Button
                onClick={handleSave}
                className="w-full bg-emerald-500 text-white hover:bg-emerald-600"
              >
                Completar Venta
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </header>

      <main className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <Card className="bg-zinc-950 border-zinc-800 p-8 text-center">
            <span className="text-[10px] uppercase tracking-widest text-zinc-500">
              Ingresos Totales
            </span>
            <p className="text-4xl font-extralight text-emerald-400 mt-2">
              ${totalIncome.toLocaleString()}
            </p>
          </Card>
          <Card className="bg-zinc-950 border-zinc-800 p-8 text-center">
            <span className="text-[10px] uppercase tracking-widest text-zinc-500">
              Órdenes Realizadas
            </span>
            <p className="text-4xl font-extralight text-white mt-2">
              {sales?.length || 0}
            </p>
          </Card>
        </div>

        <div className="space-y-2">
          <AnimatePresence>
            {sales?.map((sale) => (
              <motion.div
                key={sale.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                layout
              >
                <div className="flex items-center justify-between p-4 rounded-xl border border-zinc-900 bg-zinc-950/50 group hover:border-zinc-700 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg">
                      <ShoppingBag size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">{sale.product}</h4>
                      <p className="text-[10px] text-zinc-500 uppercase tracking-tighter">
                        {sale.amount} unidad(es) •{" "}
                        {new Date(sale.date + "T00:00:00").toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm font-medium text-white">
                        ${sale.price * sale.amount - sale.discount}
                      </p>
                      {sale.discount > 0 && (
                        <p className="text-[9px] text-red-400 font-bold uppercase">
                          -{sale.discount} dto.
                        </p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteSale(sale.id!)}
                      className="opacity-0 group-hover:opacity-100 text-zinc-800 hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
