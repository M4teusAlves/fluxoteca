'use client'; 

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function SigninForm() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errors, setErrors] = useState<{ email?: string; senha?: string }>({});

  const router = useRouter();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {} as { email?: string; senha?: string };

    if (!email) {
      newErrors.email = 'É necessário informar o email.';
    } else if (!validateEmail(email)) {
      newErrors.email = 'É necessário informar um email válido.';
    }

    if (!senha) {
      newErrors.senha = 'É necessário informar a senha.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch('http://localhost:8081/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        localStorage.setItem('jwtToken', token)

        router.push('/system/users');
      } else {
        alert('Credenciais inválidas');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label htmlFor="email" className="text-sm text-gray-600">EMAIL</label>
          <input
            id="email"
            name="email"
            placeholder="Digite o email de administrador"
            className="block w-full appearance-none rounded border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-500 text-xs pt-0.5 pl-1 fixed">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password" className="text-sm text-gray-600">SENHA</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Digite a senha de administrador"
            className="block w-full appearance-none rounded border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          {errors.senha && <p className="text-red-500 text-xs pt-0.5 pl-1 fixed">{errors.senha}</p>}
        </div>
        <div>
          <button type="submit" className="w-full bg-[#7c6ed6cc] text-white px-4 py-2 rounded hover:bg-[#7B6ED6] text-lg mt-1">
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
}
