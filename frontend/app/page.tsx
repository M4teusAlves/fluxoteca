import { SigninForm } from '../components/forms/SigninForm';
import logo from '../public/logo.png'
import Image from 'next/image';

export default function Login() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-slate-100">
      <div className="bg-white z-10 w-max h-max rounded-2xl border border-gray-100 shadow-xl flex gap-2 justify-center items-center px-6">
        <div className='h-max'>
          <Image src={logo} width={200} height={200} alt="logo fluxoteca" />
        </div>
        <div className='flex flex-col'>
          <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
            <h3 className="text-xl font-semibold text-black">Login</h3>
            <p className="text-sm text-gray-500">
              Use seu email e senha para entrar
            </p>
          </div>
          <SigninForm/>
        </div>
      </div>
    </div>
  );
}
