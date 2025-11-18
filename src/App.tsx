// Importar componentes
import MenuItem from "./components/MenuItem";
import { Toaster } from "react-hot-toast";
import { Navbar } from "./components/Navbar";
import OrderContents from "./components/OrderContents";
import { menuItems } from "./data/db";
import { useNavbar } from "./hooks/useNavbar";
import useOrder from "./hooks/useOrder";
import Orderlist from "./components/Orderlist";

function App() {
  const {
    openMenuUsers, setOpenMenuUsers, 
    menuUsersRef, openMenuProfile, 
    setOpenMenuProfile, menuProfileRef,
    selectedUser, setSelectedUser,
    darkMode, setDarkMode
  } = useNavbar();
  
  const { order, placeOrder, orderList, addItem, removeItem, cancelOrder, isOrderListEmpty, openOrderModa} = useOrder();

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar
        openMenuUsers={openMenuUsers}
        setOpenMenuUsers={setOpenMenuUsers}
        menuUsersRef={menuUsersRef}
        openMenuProfile={openMenuProfile}
        setOpenMenuProfile={setOpenMenuProfile}
        menuProfileRef={menuProfileRef}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      {/* Lista de ordenes creadas */}
      <Orderlist
        orderList={orderList}
        isOrderListEmpty={isOrderListEmpty}
        openOrderModa={openOrderModa}
      />
      <main className="max-w-7xl mx-auto px-2 mt-2 grid grid-cols-1 md:grid-cols-[50fr_50fr] gap-6 py-4">
        {/* Contenedor primero */}
        <div>
          <h3 className="mb-3 font-bold text-xl pb-2 border-b border-gray-200 dark:text-neutral-50 dark:border-neutral-800">Our Menu</h3>
          <ul role="list" className="space-y-3 overflow-y-auto max-h-[40rem] px-2">
            {menuItems.map( item => (
              <MenuItem
                key={item.id}
                item={item}
                addItem={addItem}
              />
            ))}
          </ul>
        </div>
        {/* Contenedor segundo */}
        <div>
          <h3 className="mb-3 font-bold text-xl pb-2 border-b border-gray-200 dark:text-neutral-50 dark:border-neutral-800">Order view</h3>
            {order.length === 0 ? 
            (
              <>
                {/* Alerta de no hay ordenes */}
              <div className="flex items-center justify-center h-[40rem] p-5">
                <div className="flex flex-col items-center justify-between gap-2 px-3 border-2 border-dashed rounded-lg p-8 dark:border-neutral-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-12 text-gray-500 dark:text-neutral-300">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
                  <p className="text-base text-gray-900 font-medium dark:text-neutral-50">No foods orders</p>
                  <p className="text-center text-sm text-gray-400 dark:text-neutral-400">Start by taking your customers' orders and you'll see the previous food order reflected.</p>
                </div>
              </div>
              </>
            ) : (
              <>
                <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-4 dark:border-neutral-800 dark:bg-neutral-900">
                  <OrderContents
                    order={order}
                    removeItem={removeItem}
                    placeOrder={placeOrder}
                    cancelOrder={cancelOrder}
                  />
                </div>
              </>
            )}
        </div>
      </main>
      <footer>
        <p className="text-center text-gray-500 dark:text-neutral-400 text-sm py-4">
          © {new Date().getFullYear()} Orderly. All rights reserverd Marco cruz.
        </p>
      </footer>
    </>
  )
}

export default App
