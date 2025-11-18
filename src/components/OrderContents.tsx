import { formatCurrency } from '../helpers'
import type { MenuItem, OrderItem } from '../types'

// Asignamos el type
type OrderContentsProps = {
  order: OrderItem[];
  removeItem: (id : MenuItem['id']) => void;
  placeOrder: () => void;
  cancelOrder: () => void;
}

export default function OrderContents({ order, removeItem, placeOrder, cancelOrder }: OrderContentsProps) {

  // Funcion para calcular el total de la orden
  const subtotal = order.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    // Contenedor padre
    <div>
      {/* Header de la orden */}
      <h2 className='font-bold text-xl dark:text-neutral-50'>food items ordered</h2>
      {/* Lista de los productos ordenados */}
      <ul role='list' className='divide-y divide-gray-200 mt-5 max-h-72 overflow-y-auto dark:divide-neutral-800'>
        {order.map(item => (
          // Producto
          <li
            key={item.id}
            role='item'
            className='flex items-center justify-between gap-2 p-4 hover:bg-neutral-200/20 w-full dark:hover:bg-neutral-800'
          >
            <div className="flex items-center gap-2">
              <img src={`/img/${item.image}.webp`} alt={`${item.name}`} loading='lazy' className='h-12 w-12 object-contain' />
              <div className='flex flex-col items-start'>
                <div className="flex items-center gap-2 max-w-36 md:max-w-full">
                  <p className="truncate text-base font-medium dark:text-neutral-50">
                    {item.name}
                  </p>
                </div>
                <span className='text-amber-500 text-sm font-medium'>(x{item.quantity})</span>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <p className="font-bold text-base text-amber-500">{formatCurrency(item.price)}</p>
              <button
                type="button"
                className='text-gray-500 hover:text-gray-950 dark:text-neutral-400'
                onClick={() => removeItem(item.id)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
      {/* Acciones para la orden */}
      <div>
        {/* Subtotal */}
        <div className="flex flex-col gap-1 py-3 border-t border-gray-200 dark:border-neutral-800">
          <div className='flex items-center justify-between gap-2'>
            <p className="font-medium text-base text-gray-950 dark:text-neutral-50">Subtotal:</p>
            <p className="font-bold text-lg text-gray-900 dark:text-neutral-50">{formatCurrency(subtotal)}</p>
          </div>
          <p className='text-sm text-gray-400 dark:text-neutral-400'>The tip is calculated when paying for the order.</p>
        </div>
        <div className='flex flex-col-reverse items-center gap-2 md:flex-row md:justify-end'>
          <button
            type="button"
            onClick={() => cancelOrder()}
            className='w-full md:w-32 font-medium text-sm p-3 rounded-md text-white bg-red-600 hover:bg-red-500'
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => placeOrder()}
            className='w-full md:w-32 font-medium text-sm p-3 rounded-md text-white bg-gray-950 hover:bg-gray-800 dark:text-neutral-50 dark:bg-amber-500 dark:hover:bg-amber-400'
          >
            Register order
          </button>
        </div>
      </div>
    </div>
  )
}

