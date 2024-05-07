'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { z } from "zod";

export function SigninForm() {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorInputEmail, setErrorInputEmail] = useState<string>('');
  const [errorInputPassword, setErrorInputPassword] = useState<string>('');
  const [zodErrors, setZodErrors] = useState<any | null>(null);

  const route = useRouter();

  // Validação dos dados
  const handleValidateInputs = (email: string, password: string) => {
    const schemaRegister = z.object({
      email: z.string().email({
        message: "Digite um endereço de email válido.",
      }).min(1, {
        message: "É necessário informar o email para continuar...",
      }),
      password: z.string().min(1, {
        message: "É necessário informar a senha para continuar...",
      })
    });

    const validatedFields = schemaRegister.safeParse({
      email: email,
      password: password,
    });

    return validatedFields;
    // if (validatedFields.success) {
    //   return true;
    // } else {
    //   return validatedFields.error?.flatten().fieldErrors;
    // }
  } 

  const handleSubmit = async (event: any) => {
    const validateInputs = handleValidateInputs(email, password)
    if (!validateInputs.success) {
      setZodErrors(validateInputs.error.flatten().fieldErrors)
    } else {
      event.preventDefault();

      const response = await fetch('http://localhost:8081/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        console.error('Login failed:', response.statusText);
        return;
      }
  
      const data = await response.json();
      const token = data.token;
  
      localStorage.setItem('jwtToken', token);
      route.push('/system/users'); // Redirect to protected route
    }
  };

  return (
    <div className="w-full max-w-md">
       <form className="">  {/*flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16  onSubmit={}*/}
        <div>
          <label htmlFor="email" className="text-xs text-gray-600">EMAIL</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Digite o email de administrador"
            required
            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
            onChange={(e) => setEmail(e.target.value)}
          />
          {zodErrors && <p>{zodErrors.email?.[0]}</p>}
          {zodErrors && (password.length == 0 && <p>{zodErrors.email?.[1]}</p>)}
          {/* <p>{errorInputEmail}</p> */}
        </div>
        <div>
          <label htmlFor="password" className="text-xs text-gray-600">SENHA</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Digite a senha de administrador"
            required
            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
            onChange={(e) => setPassword(e.target.value)}
          />
          {zodErrors && <p>{zodErrors.password?.[0]}</p>}
          {/* <p>{errorInputPassword}</p> */}
        </div>
        <div>
          <button onClick={handleSubmit} className='w-full'>Entrar</button>
        </div>
      </form>
    </div>
  );
}
