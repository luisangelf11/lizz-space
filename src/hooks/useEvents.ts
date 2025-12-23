import { useLiveQuery } from "dexie-react-hooks";
import { db, type CalendarEvent } from "@/database/db";

export const useEvents = () => {
  const events = useLiveQuery(() => db.events.toArray());

  const addEvent = async (event: Omit<CalendarEvent, 'id'>) => {
    await db.events.add(event);
  };

  const deleteEvent = async (id: number) => {
    await db.events.delete(id);
  };

  return { events, addEvent, deleteEvent };
};