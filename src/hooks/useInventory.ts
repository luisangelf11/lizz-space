import { useLiveQuery } from "dexie-react-hooks";
import { db, type Product } from "@/database/db";

export const useInventory = () => {
  const products = useLiveQuery(() => db.products.toArray());

  const addProduct = async (product: Omit<Product, 'id'>) => {
    await db.products.add(product);
  };

  const updateStock = async (id: number, newStock: number) => {
    await db.products.update(id, { stock: newStock });
  };

  const deleteProduct = async (id: number) => {
    await db.products.delete(id);
  };

  return { products, addProduct, updateStock, deleteProduct };
};