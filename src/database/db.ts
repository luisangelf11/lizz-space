import Dexie, { type Table } from "dexie";

// --- Interfaces para cada tabla ---
export interface Note {
  id?: number;
  title: string;
  description: string;
  date: string;
}

export interface Expense {
  id?: number;
  title: string;
  date: string;
  amount: number;
  description: string;
  category: string;
}

export interface Sale {
  id?: number;
  product: string;
  date: string;
  amount: number;
  stock: number;
  price: number;
  discount: number;
}

export interface CalendarEvent {
  id?: number;
  title: string;
  date: string;
  description: string;
  location: string;
}

export interface Product {
  id?: number;
  title: string;
  description: string;
  cost: number;
  price: number;
  stock: number;
}

// --- Clase de Base de Datos ---
export class LizzSpaceDB extends Dexie {
  notes!: Table<Note>;
  expenses!: Table<Expense>;
  sales!: Table<Sale>;
  events!: Table<CalendarEvent>;
  products!: Table<Product>;

  constructor() {
    super("LizzSpaceDatabase");
    this.version(1).stores({
      notes: "++id, title, date",
      expenses: "++id, title, date, category",
      sales: "++id, product, date",
      events: "++id, title, date",
      products: "++id, title",
    });
  }
}

// Instanciamos y exportamos
export const db = new LizzSpaceDB();
export default db;