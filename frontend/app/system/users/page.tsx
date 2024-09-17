'use client'
import { useRouter } from 'next/navigation';
import  TableUser  from '../../../components/table/TableUser'
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { useEffect, useState } from 'react';
import { useJwtToken } from '@/hooks/useJwtToken';
import { fetchActiveUser, fetchDeleteUser, fetchUpdateTypeUser, fetchUsersByStatus } from '@/components/users/dataUsers';
import { fetchDeleteBook } from '@/components/table/databook';
import { Button, CheckboxIcon } from '@nextui-org/react';
import ModalUpdateUser from '@/components/modal/user/ModalUpdateUser';
import Edit from '@mui/icons-material/Edit';
import { useLogin } from '@/hooks/useLogin';
import { ArrowUpward } from '@mui/icons-material';

export default function Users() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const [currentUserID, setCurrentUserID] = useState("")

    const Login = useLogin()

    const token = useJwtToken()
    const [validatedUsers, setValidatedUsers] = useState<user[]>([])
    const [unvalidatedUsers, setUnvalidatedUsers] = useState<user[]>([])

    async function handleClickUpdateTypeUser (id:number){
        setIsLoading(true)
        await fetchUpdateTypeUser(token, router , id)
        setIsLoading(false)
    }

    async function handleClickActiveUser (id:string){
        setIsLoading(true)
        await fetchActiveUser(token, router , id)
        setIsLoading(false)
    }

    async function handleClickDeleteUser(id:string){
        setIsLoading(true)
        await fetchDeleteUser(token, router , id)
        setIsLoading(false)
    }

    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);

    const handleClickUpdateUser = ()=>{
        setIsLoading(true)
        setShowModalUpdateUser(true)
        setIsLoading(false)
    }

    useEffect(() => {
        const fetchData = async () => {
        try {
            if (!token) return;
            const validatedData = await fetchUsersByStatus(token, router, true)
            const unvalidatedData = await fetchUsersByStatus(token, router, false)
            setValidatedUsers(validatedData)
            setUnvalidatedUsers(unvalidatedData)
        } catch (error) {
            console.error("Error fetching users:", error);
        }
        };
    
        fetchData();
    }, [token, isLoading]);

    return (
        <div className='flex'>
            
            <div className='flex w-1/2 flex-col p-5 gap-7 items-start'>
                <h2 className='text-2xl font-extrabold'>Usuários Administradores</h2>
                <b>Usuários Ativos</b>
                {validatedUsers.map((user)=>(
                    <div key={user.id} className={(user.tipo==="ADMIN" ? "flex" : "hidden") + ' w-96 rounded-md pl-10 h-20 border-3'}>
        
                        <div className='flex w-1/2 items-center justify-center gap-4'>
                            <p>{user.login}</p>
                            <p className='p-1 bg-green-400 rounded-md'>Ativo</p>
                        </div>
                        {user.login === Login &&
                            <div className='flex w-1/2 items-center justify-center gap-4'>
                                <Button isIconOnly size="sm" variant="bordered" title="Deletar livro" onPress={() => {
                                handleClickDeleteUser(user.id.toString())
                                }}>
                                    <CloseIcon className="text-red-600" />
                                </Button>
                                
                                <Button isIconOnly size="sm" variant="bordered" title="Atualizar Usuário" onPress={() => {
                                    setCurrentUserID(user.id.toString())
                                    handleClickUpdateUser()
                                }}>
                                        <Edit className="text-green-600" />
                                </Button>
                            
                                
                            </div>
                        }
                        
                    </div>
                ))}
                <b>Usuários Inativos</b>
                {unvalidatedUsers.map((user)=>(
                    <div key={user.id} className={(user.tipo==="ADMIN" ? "flex" : "hidden") + ' w-96 rounded-md pl-10 h-20 border-3'} >
                        <div className='flex w-1/2 items-center justify-center gap-4'>
                            <p>{user.login}</p>
                            <p className='p-1 bg-red-500 rounded-md'>Inativo</p>
                        </div>
                        <div className='flex w-1/2 items-center justify-center gap-4'>
                            <Button isIconOnly size="sm" variant="bordered" title="Deletar livro" onPress={() => {
                            handleClickActiveUser(user.id.toString())
                            }}>
                                <CheckIcon className="text-green-600" />
                            </Button>
                            
                        </div>   
                    </div>
                ))}
            </div>
            <div className='flex w-1/2 flex-col p-5 gap-7'>
                <h2 className='text-2xl font-extrabold'>Usuários Voluntários</h2>
                <b>Usuários Ativos</b>
                {validatedUsers.map((user)=>(
                    <div key={user.id} className={(user.tipo==="VOLUN" ? "flex" : "hidden") + ' w-96 rounded-md pl-10 h-20 border-3'}>
                        <div className='flex w-1/2 items-center justify-center gap-4'>
                            <p>{user.login}</p>
                            <p className='p-1 bg-green-400 rounded-md'>Ativo</p>
                        </div>
                        
                        <div className='flex w-1/2 items-center justify-center gap-4'>
                            <Button isIconOnly size="sm" variant="bordered" title="Deletar livro" onPress={() => {
                            handleClickDeleteUser(user.id.toString())
                            }}>
                                <CloseIcon className="text-red-600" />
                            </Button>
                            <Button isIconOnly size="sm" variant="bordered" title="Deletar livro" onPress={() => {
                            handleClickUpdateTypeUser(user.id)
                            }}>
                                <ArrowUpward className="text-green-600"  />
                            </Button>
                        </div>
                    </div>
                ))}
                <b>Usuários Inativos</b>
                {unvalidatedUsers.map((user)=>(
                    <div key={user.id} className={(user.tipo==="VOLUN" ? "flex" : "hidden") + ' w-96 rounded-md pl-10 h-20 border-3'}>
                        <div className='flex w-1/2 items-center justify-center gap-4'>
                            <p>{user.login}</p>
                            <p className='p-1 bg-red-500 rounded-md'>Inativo</p>
                        </div>
                        <div className='flex w-1/2 items-center justify-center gap-4'>
                            <Button isIconOnly size="sm" variant="bordered" title="Deletar livro" onPress={() => {
                            handleClickActiveUser(user.id.toString())
                            }}>
                                <CheckIcon className="text-green-600" />
                            </Button>
                        </div>   
                    </div>
                ))}
            </div>
            {showModalUpdateUser && <ModalUpdateUser isOpen={showModalUpdateUser} onClose={() => {
                setShowModalUpdateUser(false)
                setIsLoading(true);
            }} userID={currentUserID}/>}
        </div>
        
    )
}