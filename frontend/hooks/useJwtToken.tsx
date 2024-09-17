import { useState, useEffect } from 'react';

export const useJwtToken = () => {
    const [token, setToken] = useState<string>('');

    useEffect(() => {
        const storedToken = localStorage.getItem('jwtToken');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    return token;
}