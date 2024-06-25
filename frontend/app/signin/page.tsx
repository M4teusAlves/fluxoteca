'use client'

import Image from 'next/image';
import { SigninForm } from "@/components/forms/SigninForm";
import { useState } from 'react';
import { SignupForm } from '@/components/forms/SignupForm';

export default function SignIn() {
    const [signup, setSignup] = useState(false);


    return (
        <div className='bg-slate-100'>
            <div className='bg-white border-gray-100 rounded-2xl shadow-xl flex items-center gap-6 p-6'>
                <div>
                    <Image src="/logo.png" width={200} height={200} alt="logo fluxoteca" />
                </div>
                <div className='flex flex-col gap-4'>
                    <div className='text-center border-b border-gray-200'>
                        {signup
                            ? <h3 className='text-xl font-semibold text-black pb-2'>Cadastro</h3>
                            : <h3 className='text-xl font-semibold text-black pb-2'>Login</h3>
                        }
                        <p className='text-sm text-gray-500 pb-2'>Utilize as credenciais de administrador para entrar</p>
                    </div>
                    {signup
                        ? <SignupForm/>
                        : <SigninForm/>
                    }

                    {signup
                        ? <p className="w-full text-center text-[#3015e2cc] cursor-pointer" onClick={()=>{setSignup(false)}}>Entrar</p>
                        : <p className="w-full text-center text-[#3015e2cc] cursor-pointer" onClick={()=>{setSignup(true)}}>Cadastrar-se</p>
                    }
                    
                    
                </div>
            </div>
        </div>
    );
}