// Importar el menuitem de types
import { formatCurrency } from "../helpers";
import type { MenuItem } from "../types";

// Crear un type
type MenuItemProps = {
  item: MenuItem,
  addItem: (item: MenuItem) => void;
}

export default function MenuItem({item, addItem} : MenuItemProps) {
  return (
    <>
    <li 
        id={`${item.id}`}
        onClick={() => addItem(item)}
        className="border border-gray-200 bg-white hover:bg-neutral-200/10 rounded-md flex items-center justify-between gap-3 px-4 py-2 cursor-pointer dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800"
    >
        <div className="flex items-center justify-center gap-3">
            <img src={`/img/${item.image}.webp`} alt={`${item.name}`} loading="lazy" className="w-16 h-16 object-contain rounded-lg"/>
            <p className="text-base font-medium text-wrap">{item.name}</p>
        </div>
        <p className="font-bold text-base text-amber-500">{formatCurrency(item.price)}</p>
    </li>
    </>
  )
}
