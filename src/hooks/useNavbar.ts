import { useEffect, useRef, useState } from "react"

export const useNavbar = () => {

    // Iniciamos el state del menu usuarios
    const [openMenuUsers, setOpenMenuUsers] = useState(false);
    const menuUsersRef = useRef<HTMLDivElement | null>(null);

    // Iniciamos el state del menu perfil 
    const [openMenuProfile, setOpenMenuProfile] = useState(false);
    const menuProfileRef = useRef<HTMLDivElement | null>(null);

    // Estado del usuario seleccionado
    const [selectedUser, setSelectedUser] = useState("1");

    // Estado para el modo dark
    const [darkMode, setDarkMode] = useState(() => {
        // Leer el valor inicial desde LS
        const stored = localStorage.getItem('theme');
        return stored === 'dark';
    });

    useEffect(() => {
        // Aplicar la clase 'dark' al <html>
        document.documentElement.classList.toggle('dark', darkMode);

        // Guardar en LocalStorage
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    // Cerrar ambos menús al hacer click fuera
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;

            if (menuUsersRef.current && !menuUsersRef.current.contains(target)) {
                setOpenMenuUsers(false);
            }

            if (menuProfileRef.current && !menuProfileRef.current.contains(target)) {
                setOpenMenuProfile(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return {
        openMenuUsers,
        setOpenMenuUsers,
        menuUsersRef,
        openMenuProfile,
        setOpenMenuProfile,
        menuProfileRef,
        selectedUser,
        setSelectedUser,
        darkMode,
        setDarkMode
    }
}