import { useLiveQuery } from "dexie-react-hooks";
import { db, type Expense } from "@/database/db";

export const useExpenses = () => {
  const expenses = useLiveQuery(() => 
    db.expenses.orderBy('date').reverse().toArray()
  );

  const addExpense = async (expense: Omit<Expense, 'id'>) => {
    await db.expenses.add(expense);
  };

  const deleteExpense = async (id: number) => {
    await db.expenses.delete(id);
  };

  const totalAmount = expenses?.reduce((acc, curr) => acc + Number(curr.amount), 0) || 0;

  return { expenses, addExpense, deleteExpense, totalAmount };
};