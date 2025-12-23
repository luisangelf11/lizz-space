import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, ArrowLeft, StickyNote } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { useNotes } from "@/hooks/useNotes";

export default function NotesPage() {
  const navigate = useNavigate();
  const { notes, addNote, deleteNote } = useNotes();
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = async () => {
    if (!newTitle.trim()) return;
    await addNote(newTitle, newDesc);
    setNewTitle("");
    setNewDesc("");
    setIsOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header */}
      <header className="flex items-center justify-between max-w-5xl mx-auto mb-10">
        <Button variant="ghost" onClick={() => navigate("/")} className="text-zinc-500 hover:text-white">
          <ArrowLeft className="mr-2" size={20} /> Volver
        </Button>
        <h1 className="text-xl font-light tracking-[0.2em] uppercase">Notas</h1>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-white text-black hover:bg-zinc-200 rounded-full w-10 h-10 p-0">
              <Plus size={20} />
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-zinc-950 border-zinc-800 text-white">
            <DialogHeader>
              <DialogTitle className="font-light tracking-tight">Nueva Nota</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Input 
                placeholder="Título" 
                value={newTitle} 
                onChange={(e) => setNewTitle(e.target.value)}
                className="bg-zinc-900 border-zinc-800 focus-visible:ring-zinc-700"
              />
              <Textarea 
                placeholder="Descripción..." 
                value={newDesc} 
                onChange={(e) => setNewDesc(e.target.value)}
                className="bg-zinc-900 border-zinc-800 focus-visible:ring-zinc-700 min-h-30"
              />
            </div>
            <DialogFooter>
              <Button onClick={handleSave} className="w-full bg-white text-black hover:bg-zinc-200">
                Guardar Nota
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </header>

      {/* Grid de Notas */}
      <main className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        <AnimatePresence>
          {notes?.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              layout
            >
              <Card className="bg-zinc-950 border-zinc-800 hover:border-zinc-700 transition-all group">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-zinc-200">{note.title}</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => deleteNote(note.id!)}
                    className="opacity-0 group-hover:opacity-100 text-zinc-600 hover:text-red-400 transition-opacity"
                  >
                    <Trash2 size={16} />
                  </Button>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-zinc-500 font-light leading-relaxed">
                    {note.description}
                  </p>
                  <div className="mt-4 text-[10px] text-zinc-700 uppercase tracking-widest font-bold">
                    {new Date(note.date).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Estado vacío */}
        {notes?.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-zinc-600">
            <StickyNote size={40} strokeWidth={1} className="mb-4 opacity-20" />
            <p className="text-sm font-light tracking-widest uppercase">No hay notas guardadas</p>
          </div>
        )}
      </main>
    </div>
  );
}