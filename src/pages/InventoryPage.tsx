import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Package, ArrowLeft, Trash2, MinusCircle, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useInventory } from "@/hooks/useInventory";

export default function InventoryPage() {
  const navigate = useNavigate();
  const { products, addProduct, updateStock, deleteProduct } = useInventory();
  
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", cost: 0, price: 0, stock: 0 });

  const handleSave = async () => {
    if (!form.title) return;
    await addProduct({ ...form, cost: Number(form.cost), price: Number(form.price), stock: Number(form.stock) });
    setForm({ title: "", description: "", cost: 0, price: 0, stock: 0 });
    setIsOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <header className="flex items-center justify-between max-w-6xl mx-auto mb-12">
        <Button variant="ghost" onClick={() => navigate("/")} className="text-zinc-500 hover:text-white transition-colors">
          <ArrowLeft className="mr-2" size={20} /> Dashboard
        </Button>
        <h1 className="text-xl font-light tracking-[0.3em] uppercase bg-linear-to-b from-white to-zinc-500 bg-clip-text text-transparent">
          Inventario
        </h1>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-white text-black hover:bg-zinc-200 rounded-full h-10 px-4 font-medium transition-all">
              <Plus size={18} className="mr-2" /> Nuevo Producto
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-zinc-950 border-zinc-800 text-white backdrop-blur-xl">
            <DialogHeader>
              <DialogTitle className="font-light tracking-tight text-xl">Agregar al Inventario</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input placeholder="Nombre del producto" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} className="bg-zinc-900 border-zinc-800" />
              <Input placeholder="Descripción corta" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} className="bg-zinc-900 border-zinc-800" />
              <div className="grid grid-cols-2 gap-4">
                <Input type="number" placeholder="Costo" onChange={(e) => setForm({...form, cost: Number(e.target.value)})} className="bg-zinc-900 border-zinc-800" />
                <Input type="number" placeholder="Precio Venta" onChange={(e) => setForm({...form, price: Number(e.target.value)})} className="bg-zinc-900 border-zinc-800" />
              </div>
              <Input type="number" placeholder="Stock Inicial" onChange={(e) => setForm({...form, stock: Number(e.target.value)})} className="bg-zinc-900 border-zinc-800" />
            </div>
            <DialogFooter>
              <Button onClick={handleSave} className="w-full bg-white text-black hover:bg-zinc-200">Guardar en Inventario</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {products?.map((item) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} layout>
              <Card className="bg-zinc-950 border-zinc-800 hover:border-zinc-600 transition-all group relative overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Badge variant="outline" className="border-zinc-700 text-zinc-400 font-light text-[10px] uppercase tracking-tighter">
                      SKU-{item.id}
                    </Badge>
                    <Button variant="ghost" size="icon" onClick={() => deleteProduct(item.id!)} className="h-8 w-8 text-zinc-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 size={14} />
                    </Button>
                  </div>
                  <CardTitle className="text-lg font-light text-zinc-100 mt-2">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-zinc-500 font-light mb-6 h-8 line-clamp-2">{item.description}</p>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase text-zinc-600 tracking-widest mb-1">Precio</span>
                      <span className="text-xl font-medium text-white">${item.price}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] uppercase text-zinc-600 tracking-widest mb-1">Stock</span>
                      <div className="flex items-center gap-3">
                        <button onClick={() => updateStock(item.id!, item.stock - 1)} className="text-zinc-500 hover:text-white transition-colors">
                          <MinusCircle size={18} />
                        </button>
                        <span className={`text-xl font-medium ${item.stock < 5 ? 'text-amber-500' : 'text-white'}`}>
                          {item.stock}
                        </span>
                        <button onClick={() => updateStock(item.id!, item.stock + 1)} className="text-zinc-500 hover:text-white transition-colors">
                          <PlusCircle size={18} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-900 flex justify-between items-center text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                    <span>Costo: ${item.cost}</span>
                    <span className="text-emerald-500">Margen: ${item.price - item.cost}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </main>

      {/* Empty State */}
      {products?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 opacity-20">
          <Package size={60} strokeWidth={1} className="mb-4" />
          <p className="uppercase tracking-[0.4em] text-xs font-bold">Inventario Vacío</p>
        </div>
      )}
    </div>
  );
}