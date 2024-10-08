'use client'
import logo from '../../public/logo.png'
import Image from 'next/image';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LogoutIcon from '@mui/icons-material/Logout';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Button from '@/components/sidebar/Button';
import { useRouter } from 'next/navigation';
import { useTipo } from '@/hooks/useTipo';


export default function SystemLayout({ children }: Readonly<{ children: React.ReactNode; }>) {

    const tipo = useTipo()

    const router = useRouter()

    const logout = ()=>{
        localStorage.setItem('jwtToken', "")
        localStorage.setItem('login', "")
        localStorage.setItem('tipo', "")
    }
    
    return (
        <div className="m-0 flex gap-4 h-screen">
            <nav className='h-screen fixed grid gap-4 p-4 bg-slate-100'>
                <Image src={logo} onClick={()=>{router.push("/system/reports")}} className='cursor-pointer'  width={200} height={200} alt="logo fluxoteca" />
                <ul className='flex flex-col justify-between h-[calc(100vh-248px)]'>
                    <div className='grid gap-4'>
                        <li><Button icon={<LibraryBooksIcon />} textButton={'Empréstimos'} link={"/system/registers"} /></li>
                        <li><Button icon={<PeopleAltIcon />} textButton={'Leitores'} link={"/system/readers"} /></li>
                        <li><Button icon={<AutoStoriesIcon />} textButton={'Livros'} link={"/system/books"} /></li>
                        <li><Button icon={<AssessmentIcon/>} textButton={'Relatórios'} link={"/system/reports"}/></li>
                        {tipo==="ADMIN" && <li><Button icon={<PersonOutlineIcon/>} textButton={'Usuários'} link={"/system/users"}/></li> }
                        
                    </div>
                    <li onClick={logout}><Button icon={<LogoutIcon />} textButton={'Sair'} link={"/"} /></li>
                </ul>
            </nav>
            <div className='ml-[232px] w-[calc(100vw-216px)] p-4 box-border h-screen'>
                {children}
            </div>
        </div>
    );
}
