import { useLiveQuery } from "dexie-react-hooks";
import { db, type Sale } from "@/database/db";
import { toast } from "sonner";

export const useSales = () => {
  const sales = useLiveQuery(() =>
    db.sales.orderBy("date").reverse().toArray()
  );

 const addSale = async (saleData: Omit<Sale, "id">, productId?: number) => {
  if (productId) {
    const product = await db.products.get(productId);
    
    if (product) {
      if (product.stock < saleData.amount) {
        toast.error("Stock insuficiente", {
          description: `Solo quedan ${product.stock} unidades de este producto.`,
        });
        return false;
      }

      await db.sales.add(saleData);
      await db.products.update(productId, {
        stock: product.stock - saleData.amount,
      });
      
      toast.success("Venta registrada");
      return true;
    }
  }
  return false;
};

  const deleteSale = async (id: number) => {
    await db.sales.delete(id);
  };

  const totalIncome =
    sales?.reduce(
      (acc, curr) => acc + curr.price * curr.amount - curr.discount,
      0
    ) || 0;

  return { sales, addSale, deleteSale, totalIncome };
};
