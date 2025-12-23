import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "sonner";
import NotesPage from "./pages/NotesPage";
import InventoryPage from "./pages/InventoryPage";
import EventsPage from "./pages/EventsPage";
import ExpensesPage from "./pages/ExpensesPage";
import SalesPage from "./pages/SalesPage";
import { ProtectedRoute } from "./components/security/ProtectedRoute";
import NotFoundPage from "./pages/NotFound";

export default function App() {
  return (
    <>
      <section className="dark text-foreground bg-background min-h-screen">
        <Toaster />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/sales" element={<SalesPage />} />
            <Route path="/expenses" element={<ExpensesPage />} />
            <Route path="/events" element={<EventsPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </section>
    </>
  );
}
