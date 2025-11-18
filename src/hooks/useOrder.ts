// Importamos las librerias
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

import type { OrderItem, MenuItem } from "../types";
import Swal from "sweetalert2";
import { formatCurrency } from "../helpers";

export default function useOrder() {

    // Estado de la orden
    const [order, setOrder] = useState<OrderItem[]>([]);

    // Estado de la lista de las ordenes
    const [orderList, setOrderList] = useState<OrderItem[][]>([]);

    // Funcion para agregar los items
    const addItem = (item: MenuItem) => {
        // validar si existe un items ya agregado
        const itemExist = order.find(orderItem => orderItem.id === item.id);
        if (itemExist) {
            // Encontrar el elemento al cual incrementar la cantidad
            const updatedOrder = order.map(orderItem => orderItem.id === item.id ? { ...orderItem, quantity: orderItem.quantity + 1 } : orderItem);

            // Aplicar los cambios
            setOrder(updatedOrder);
        } else {
            const newItem: OrderItem = { ...item, quantity: 1 };
            setOrder([...order, newItem]);
        }
    }

    // Funcion para eliminar items
    const removeItem = (id: MenuItem['id']) => {
        setOrder(order.filter(item => item.id !== id));
    }

    // Funcion para cancelar la orden
    const cancelOrder = () => {
        setOrder([]); // Cancelamos la orden vaciando el areglo
    }

    // Funcion para agregar la orden
    const placeOrder = () => {
        setOrderList([...orderList, order]); // Guardamos la orden completa
        setOrder([]); // Setear orden actual
        toast.success('Order successfully registered!', {
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            }
        });
    }

    // Funcion para eliminar la order de la lista
    const removeOrderList = (index: number) => {
        setOrderList(orderList.filter((_, i) => i !== index));
    }

    // Funcion para mostrar en el modal los productos de la orden creada
    const openOrderModa = (index: number) => {
        const selectedOrder = orderList[index];
        if (!selectedOrder) return;

        const subtotal = selectedOrder.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );

        const html = `
            <div class="divide-y divide-gray-200 dark:divide-neutral-700 max-h-72 overflow-y-auto px-0 md:px-2">
                ${selectedOrder
                .map(
                    (item) => `
                    <div class="flex items-center justify-between gap-2 py-2">
                        <div class="flex items-center gap-2">
                            <img src="/img/${item.image}.webp" class="h-16 w-16 object-contain" />
                            <div class="flex items-center gap-2 max-w-32 md:max-w-52">
                                <p class="truncate text-base font-bold text-neutral-900 dark:text-neutral-50">
                                    ${item.name}
                                </p>
                            </div>
                        </div>
                        <div>
                            <p class="text-neutral-900 dark:text-neutral-50">
                                x ${item.quantity} - <span class="font-bold">${formatCurrency(
                        item.price
                    )}</span>
                            </p>
                        </div>
                    </div>
                `
                )
                .join("")}
            </div>

            <!-- Subtotal -->
            <div class="flex items-center justify-between gap-2 border-t border-gray-200 pt-3 mb-3 dark:border-neutral-700">
                <p class="font-medium text-base text-neutral-700 dark:text-neutral-300">Subtotal:</p>
                <p class="font-bold text-amber-500 dark:text-amber-400">${formatCurrency(subtotal)}</p>
            </div>

            <!-- Propinas -->
            <div class="border-t border-gray-200 pt-3 mb-3 dark:border-neutral-700">
                <p class="font-semibold text-xl text-neutral-900 mb-2 dark:text-neutral-50">Tip percentage:</p>
                
                <div class="flex items-center justify-around text-neutral-900 dark:text-neutral-50">
                    <label class="flex items-center gap-2 mb-1">
                        <input type="radio" name="tip" value="0.05" checked>
                        <span>5%</span>
                    </label>

                    <label class="flex items-center gap-2 mb-1">
                        <input type="radio" name="tip" value="0.10">
                        <span>10%</span>
                    </label>

                    <label class="flex items-center gap-2 mb-1">
                        <input type="radio" name="tip" value="0.15">
                        <span>15%</span>
                    </label>
                </div>
            </div>

            <!-- Total -->
            <div class="flex items-center justify-between gap-2 border-t border-gray-200 pt-3 mb-3 dark:border-neutral-700">
                <p class="font-bold text-2xl text-neutral-900">Total:</p>
                <p id="total-with-tip" class="font-bold text-amber-500 dark:text-amber-400 text-xl">
                    ${formatCurrency(subtotal * 1.05)}
                </p>
            </div>

            <!-- Buttons -->
            <div class="flex justify-end gap-3 mt-4">
                <button id="cancel-order" class="px-4 py-2 font-medium bg-gray-300  text-black rounded-md">
                    Cancel
                </button>

                <button id="pay-order" class="px-4 py-2 font-medium bg-gray-950 text-white rounded-md dark:bg-amber-500 dark:text-neutral-50">
                    Pay Order
                </button>
            </div>
        `;

        Swal.fire({
            title: `Order #${index + 1}`,
            html,
            showConfirmButton: false,
            width: 500,
            backdrop: true,
            customClass: {
                popup: "dark:bg-neutral-900 dark:text-neutral-200",
                title: "dark:text-neutral-100",
            },
            didRender: () => {
                // Agrega la clase dark si existe en <html>
                if (document.documentElement.classList.contains("dark")) {
                    const modal = document.querySelector('.swal2-popup');
                    modal?.classList.add("dark");
                }

                setupTipListeners(subtotal, index);
            }
        });
    };


    const setupTipListeners = (subtotal: number, index: number) => {
        const radios = document.querySelectorAll("input[name='tip']");
        const totalEl = document.getElementById("total-with-tip");
        const total = totalEl?.textContent ?? "";

        const updateTotal = () => {
            const selected = document.querySelector("input[name='tip']:checked") as HTMLInputElement;
            const tip = parseFloat(selected.value);
            const total = subtotal + subtotal * tip;

            if (totalEl) {
                totalEl.textContent = formatCurrency(total);
            }
        };

        radios.forEach(radio => {
            radio.addEventListener("change", updateTotal);
        });

        document.getElementById("cancel-order")?.addEventListener("click", () => {
            Swal.close();
        });

        document.getElementById("pay-order")?.addEventListener("click", () => {
            toast.success(`Order paid: ${total}`, {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                }
            });
            Swal.close();
            removeOrderList(index);
        });
    };

    // Funcion apara verificar la longitud de la lista de las ordenes
    const isOrderListEmpty = useMemo(() => orderList.length === 0, [orderList]);

    return {
        order,
        setOrder,
        orderList,
        setOrderList,
        addItem,
        removeItem,
        cancelOrder,
        placeOrder,
        removeOrderList,
        openOrderModa,
        isOrderListEmpty
    }
}