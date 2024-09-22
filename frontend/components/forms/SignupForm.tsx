'use client'; 

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@nextui-org/react';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export function SignupForm() {
  const [login, setLogin] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [classe, setClasse] = useState('');
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

    if (login.length < 5 || login.length > 20){
        newErrors.login = 'Login precisa ter de 5 a 20 caracteres'
    }

    if (!senha) {
      newErrors.senha = 'É necessário informar a senha.';
    }

    if (senha.length < 5 || senha.length > 30){
        newErrors.senha= 'Senha precisa ter de 8 a 30 caracteres'
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
      const response = await fetch('http://localhost:8081/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, senha }),
      });

      if(response.status == 201){
        setMensagem('Usuário Criado com sucesso')
        setClasse("text-sm text-green-600")
      }else{
        setMensagem("Credenciais Inválidas")
        setClasse("text-red-600 text-sm")
      }
      
      setLogin('')
      setSenha('')
      
    } catch (error) {
      console.error('Login failed:', error);
      alert('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <p className={classe}>{mensagem}</p>
        <div>
          <Input
            id="login"
            name="login"
            minLength={5}
            maxLength={20}
            variant='bordered'
            label="Usuário"
            placeholder="Digite um login de administrador"
            value={login}
            onChange={(e) => {setLogin(e.target.value); validateForm()}}
          />
          {errors.login && <p className="text-red-500 text-xs pt-0.5 pl-1 fixed">{errors.login}</p>}
        </div>
        <div>
          <Input
            id="password"
            name="password"
            label="Senha"
            variant='bordered'
            minLength={8}
            maxLength={30}
            placeholder="Digite a senha de administrador"
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
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
}
