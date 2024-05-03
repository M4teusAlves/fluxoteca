import Image from 'next/image';
import { SigninForm } from "@/components/forms/SigninForm";

export default function SignIn() {
    return (
        <div className='bg-slate-100'>
            <div className='bg-white border-gray-100 rounded-2xl shadow-xl flex items-center gap-6 p-6'>
                <div>
                    <Image src="/logo.png" width={200} height={200} alt="logo fluxoteca" />
                </div>
                <div className='flex flex-col gap-4'>
                    <div className='text-center border-b border-gray-200'>
                        <h3 className='text-xl font-semibold text-black pb-2'>Login</h3>
                        <p className='text-sm text-gray-500 pb-2'>Utilize as credenciais de administrador para entrar</p>
                    </div>
                    <SigninForm/>
                </div>
            </div>
        </div>
    );
}