import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Calendar as CalendarIcon,
  ArrowLeft,
  Trash2,
  Bell,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useEvents } from "@/hooks/useEvents";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

export default function EventsPage() {
  const navigate = useNavigate();
  const { events, addEvent, deleteEvent } = useEvents();
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    date: "",
    description: "",
    location: "",
  });

  useEffect(() => {
    if (!events) return;

    if (Notification.permission === "default") {
      Notification.requestPermission();
    }

    const today = new Date().toISOString().split("T")[0];

    events.forEach((event) => {
      //App
      if (event.date === today) {
        toast.info(`¡Evento Hoy!`, {
          description: event.title,
          duration: 10000,
        });
        //System
        if (Notification.permission === "granted") {
          new Notification("LizzSpace: Evento para hoy", {
            body: event.title,
            icon: "/favicon.ico",
          });
        }
      }
    });
  }, [events]);

  const handleSave = async () => {
    if (!form.title || !form.date) return;
    await addEvent(form);
    setForm({ title: "", date: "", description: "", location: "" });
    setIsOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <header className="flex items-center justify-between max-w-5xl mx-auto mb-12">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="text-zinc-500 hover:text-white"
        >
          <ArrowLeft className="mr-2" size={20} /> Dashboard
        </Button>
        <h1 className="text-xl font-light tracking-[0.3em] uppercase">
          Eventos
        </h1>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-white text-black hover:bg-zinc-200 rounded-full h-10 px-4">
              <Plus size={18} className="mr-2" /> Agendar
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-zinc-950 border-zinc-800 text-white">
            <DialogHeader>
              <DialogTitle className="font-light tracking-tight">
                Nuevo Evento
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                type="text"
                placeholder="¿Qué pasará?"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="bg-zinc-900 border-zinc-800"
              />
              <Input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="bg-zinc-900 border-zinc-800 text-white scheme-dark"
              />
              <Input
                placeholder="Ubicación (opcional)"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="bg-zinc-900 border-zinc-800"
              />
              <Textarea
                placeholder="Detalles adicionales..."
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="bg-zinc-900 border-zinc-800"
              />
            </div>
            <DialogFooter>
              <Button
                onClick={handleSave}
                className="w-full bg-white text-black hover:bg-gray-300"
              >
                Confirmar Evento
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </header>

      <main className="max-w-5xl mx-auto space-y-4">
        <AnimatePresence>
          {events
            ?.sort((a, b) => a.date.localeCompare(b.date))
            .map((event) => {
              const isToday =
                event.date === new Date().toISOString().split("T")[0];

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  layout
                >
                  <Card
                    className={`bg-zinc-950 border-zinc-800 group transition-all ${
                      isToday ? "border-l-4 border-l-blue-500" : ""
                    }`}
                  >
                    <CardContent className="flex items-center justify-between p-6">
                      <div className="flex items-center gap-6">
                        <div
                          className={`p-3 rounded-xl ${
                            isToday
                              ? "bg-blue-500/10 text-blue-400"
                              : "bg-zinc-900 text-zinc-500"
                          }`}
                        >
                          <CalendarIcon size={24} />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-light text-zinc-100">
                              {event.title}
                            </h3>
                            {isToday && (
                              <Badge className="bg-blue-500 text-[9px] uppercase tracking-tighter h-4 p-2">
                                <span className="text-white mt-1">Hoy</span>
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-xs text-zinc-500 font-light">
                            <span className="flex items-center gap-1 uppercase tracking-widest italic">
                              {new Date(
                                event.date + "T00:00:00"
                              ).toLocaleDateString("es-ES", {
                                day: "numeric",
                                month: "long",
                              })}
                            </span>
                            {event.location && (
                              <span className="flex items-center gap-1">
                                <MapPin size={12} /> {event.location}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteEvent(event.id!)}
                        className="opacity-0 group-hover:opacity-100 text-zinc-700 hover:text-red-400 transition-opacity"
                      >
                        <Trash2 size={18} />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
        </AnimatePresence>

        {events?.length === 0 && (
          <div className="py-20 text-center text-zinc-600 opacity-30">
            <Bell size={48} className="mx-auto mb-4" strokeWidth={1} />
            <p className="uppercase tracking-[0.3em] text-xs">
              Sin compromisos pendientes
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
