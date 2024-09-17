import { useState, useEffect } from 'react';

export const useTipo = () => {
    const [tipo, setTipo] = useState<string>('');

    useEffect(() => {
        const storedTipo = localStorage.getItem('tipo');
        if (storedTipo) {
            setTipo(storedTipo);
        }
    }, []);

    return tipo;
}