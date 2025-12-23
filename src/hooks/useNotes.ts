import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/database/db";

export const useNotes = () => {
  const notes = useLiveQuery(() => db.notes.toArray());

  const addNote = async (title: string, description: string) => {
    await db.notes.add({
      title,
      description,
      date: new Date().toISOString(),
    });
  };

  const deleteNote = async (id: number) => {
    await db.notes.delete(id);
  };

  return { notes, addNote, deleteNote };
};