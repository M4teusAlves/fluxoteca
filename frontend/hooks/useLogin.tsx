import { useState, useEffect } from 'react';

export const useLogin = () => {
    const [login, setLogin] = useState<string | null>(null);

    useEffect(() => {
        const storedLogin = localStorage.getItem('login');
        if (storedLogin) {
            setLogin(storedLogin);
        }
    }, []);

    return login;
}