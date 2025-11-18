import type { OrderItem } from "../types"

// Creamos nuestro type
type OrderlistProps = {
    orderList: OrderItem[][];
    isOrderListEmpty: boolean;
    openOrderModa: (value: number) => void;
}

export default function Orderlist({ orderList, isOrderListEmpty, openOrderModa }: OrderlistProps) {
    return (
        <div className="mt-[64px] flex items-center justify-center gap-2 bg-gray-100 text-gray-900 px-2 py-3 border-b border-gray-200 dark:bg-neutral-800 dark:border-neutral-700">
            {isOrderListEmpty ? (
                <>
                    {/*  Mostramos la alerta */}
                    <div className="flex items-center justify-center gap-2 text-red-600 bg-red-600/20 w-96 py-2 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                        </svg>
                        <p className="text-lg font-bold">You have no registered orders</p>
                    </div>
                
                </>
            ) : (
                <>
                    {/* Listamos las ordenes */}
                    <div className="flex items-center gap-3 max-w-7xl mx-auto my-auto overflow-x-auto pb-1">
                        {orderList.map((_, i) => (
                            <div 
                                key={i}
                                className="flex items-center gap-4 shadow-sm bg-white border border-gray-200 rounded-md px-4 py-2 dark:bg-amber-500 dark:border-amber-600 flex-shrink-0"
                            >
                                <h3 className="dark:text-neutral-50">Order <span className="text-amber-500 font-medium dark:text-neutral-50">#{i + 1}</span></h3>
                                <button 
                                    type="button"
                                    className="bg-gray-100 p-1 rounded-md hover:bg-gray-200"
                                    aria-label="ver pedido de orden"
                                    onClick={() => openOrderModa(i)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-gray-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}
