// Creamos nuestro type
type NavbarProps = {
    openMenuUsers: boolean;
    setOpenMenuUsers: (value: boolean) => void;
    menuUsersRef: React.RefObject<HTMLDivElement | null>;

    openMenuProfile: boolean;
    setOpenMenuProfile: (value: boolean) => void;
    menuProfileRef: React.RefObject<HTMLDivElement | null>;

    selectedUser: string;
    setSelectedUser: (id: UserProps['id']) => void;

    darkMode: boolean;
    setDarkMode: (value: boolean) => void;
}

// importar componentes, db, etc...
import { users, type UserProps } from "../data/users";
import { useNavbar } from "../hooks/useNavbar";

export function Navbar({
        openMenuUsers, setOpenMenuUsers, 
        menuUsersRef, openMenuProfile, 
        setOpenMenuProfile, menuProfileRef,
        darkMode, setDarkMode

    } : NavbarProps) {

    // Estado global del usuario seleccionado
    const { selectedUser, setSelectedUser} = useNavbar();
    // Buscar al usuario seleccionado
    const currentUser = users.find(u => u.id === selectedUser);

    return( 
        <>
        {/* Contenedor padre */}
        <nav className="bg-white border-b border-gray-200 shadow-sm fixed top-0 left-0 right-0 z-10 dark:bg-neutral-950 dark:border-neutral-900">
            {/* Contenedor Hijo */}
            <div className="max-w-7xl mx-auto px-2 py-3 flex items-center justify-between gap-3">
                {/* Logotipo y nombre */}
                <div className="flex items-center gap-2">
                    <h1 className="font-bold m-0 text-3xl text-gray-900 dark:text-gray-50">Order<span className="text-amber-500">ly</span></h1>
                </div>
                {/* Cajero y perfil de usuario */}
                <div className="flex items-center gap-1">
                    <div className="relative" ref={menuUsersRef}>
                        {/* Usuario cajeros */}
                        <button type="button" onClick={() => setOpenMenuUsers(!openMenuUsers)} className="flex items-center gap-2 hover:bg-gray-50 p-2 rounded-full dark:hover:bg-neutral-900">
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-5 text-gray-500 dark:text-neutral-400"
                            aria-label="boton para la seleccion del usuario"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                                />
                            </svg>
                            <span className="font-bold text-gray-950 dark:text-neutral-50">{currentUser?.name}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-4 text-gray-500 dark:text-neutral-400 transition-transform duration-300 ${openMenuUsers ? "rotate-180" : "rotate-0"}`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>

                        {/* Menu desplegable */}
                        {openMenuUsers && (
                        <div className={`absolute flex flex-col gap-1 right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50 transform transition-all duration-200 origin-top dark:bg-neutral-950 dark:border-neutral-900 dark:text-neutral-50 ${openMenuUsers ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}`}>
                            {users.map((user) => (
                            <button
                                key={user.id}
                                type="button"
                                onClick={() => {
                                    setSelectedUser(user.id);
                                    setOpenMenuUsers(false); // cerrar el menú al seleccionar
                                }}
                                className={`
                                    flex items-center gap-2 px-3 py-2 w-full text-sm
                                    ${selectedUser === user.id 
                                        ? "bg-amber-600/10 text-amber-500 font-bold" 
                                        : "hover:bg-gray-50 dark:hover:bg-neutral-900"
                                    }
                                `}
                            >
                                <span>{user.id}</span>
                                <span>{user.name}</span>
                            </button>
                        ))}
                        </div>
                        )}
                    </div>

                    {/* Perfil del usuario */}
                    <div className="relative" ref={menuProfileRef}>
                        {/* Boton menu */}
                        <button
                            type="button"
                            onClick={() => setOpenMenuProfile(!openMenuProfile)}
                            aria-label="boton para abrir el menu del perfil"
                            className="text-gray-500 hover:text-gray-950 hover:bg-gray-50 rounded-full p-2 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-neutral-50 flex items-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-gray-500 dark:text-neutral-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-4 text-gray-500 dark:text-neutral-400 transition-all duration-300 ${openMenuProfile ? "rotate-180" : "rotate-0"}`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>
                        {/* Menu desplegable */}
                        {openMenuProfile && (
                        <div className="absolute flex flex-col gap-1 right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50 dark:bg-neutral-950 dark:border-neutral-900 dark:text-neutral-50">
                            {/* Boton de configuracion de cuenta */}
                            <button 
                                type="button" 
                                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 w-full font-medium text-sm dark:hover:bg-neutral-900"
                                onClick={() => {
                                    setDarkMode(!darkMode),
                                    setOpenMenuProfile(false)
                                }}
                            >
                                {darkMode ? (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-gray-500 dark:text-neutral-50">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                                        </svg>
                                        Light
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-gray-500 dark:text-neutral-50">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                                        </svg>
                                        Dark
                                    </>
                                )}
                            </button>
                            {/* Boton de cerrar sesion */}
                            <button type="button" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 w-full font-medium text-sm dark:hover:bg-neutral-900">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-gray-500 dark:text-neutral-50">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                                </svg>
                                Logout
                            </button>
                        </div>
                        )}
                    </div>   
                </div>
            </div>
        </nav>
        </>
    )
}