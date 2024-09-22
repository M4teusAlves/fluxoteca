'use client'; 

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@nextui-org/react';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export function SigninForm() {
  const [login, setLogin] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [senha, setSenha] = useState('');
  const [errors, setErrors] = useState<{ login?: string; senha?: string }>({});
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const router = useRouter();

  // const validateEmail = (email: string) => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // };

  const validateForm = () => {
    const newErrors = {} as { login?: string; senha?: string };

    if (!login) {
      newErrors.login = 'É necessário informar o usuário.';
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
      const response = await fetch('http://localhost:8081/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, senha }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        console.log(data.usuario.tipo)
        localStorage.setItem('jwtToken', data.token)
        localStorage.setItem('login', data.usuario.login)
        localStorage.setItem('tipo', data.usuario.tipo)

        router.push('/system/reports');
      } else {
        setMensagem("Credenciais inválidas")
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <p className='text-red-600 text-sm'>{mensagem}</p>
        <div>
          <Input
            id="login"
            name="login"
            label="Usuário"
            placeholder="Digite o login de administrador"
            variant='bordered'
            value={login}
            onChange={(e) => {setLogin(e.target.value), validateForm()}}
          />
          {errors.login && <p className="text-red-500 text-xs pt-0.5 pl-1 fixed">{errors.login}</p>}
        </div>
        <div>
          <Input
            id="password"
            label="Senha"
            name="password"
            placeholder="Digite a senha de administrador"
            variant='bordered'
            value={senha}
            onChange={(e) => {setSenha(e.target.value), validateForm()}}
            endContent={
              <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                {isVisible ? (
                  <VisibilityOff className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <Visibility className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
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
