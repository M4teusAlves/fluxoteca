'use client'
import { useRouter } from 'next/navigation';
import  TableUser  from '../../../components/table/TableUser'
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { useEffect, useState } from 'react';
import { useJwtToken } from '@/hooks/useJwtToken';
import { fetchActiveUser, fetchDeleteUser, fetchUsersByStatus } from '@/components/users/dataUsers';
import { fetchDeleteBook } from '@/components/table/databook';
import { Button, CheckboxIcon } from '@nextui-org/react';

export default function Users() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const token = useJwtToken()
    const [validatedUsers, setValidatedUsers] = useState<user[]>([])
    const [unvalidatedUsers, setUnvalidatedUsers] = useState<user[]>([])

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
        <div className='flex w-full flex-col p-5 gap-7'>
            <b>Usuários Ativos</b>
            {validatedUsers.map((user)=>(
                <div key={user.id} className='w-72 flex items-center rounded-md pl-10 gap-4 h-20 border-3'>
                    <p>{user.login}</p>
                    <p className='p-1 bg-green-400 rounded-md'>Ativo</p>
                    <Button isIconOnly size="sm" variant="bordered" title="Deletar livro" onPress={() => {
                    handleClickDeleteUser(user.id.toString())
                    }}>
                        <CloseIcon className="text-red-600" />
                    </Button>
                </div>
            ))}
            <b>Usuários Inativos</b>
            {unvalidatedUsers.map((user)=>(
                <div key={user.id} className='w-72 flex items-center rounded-md pl-10 gap-4 h-20 border-3'>
                    <p>{user.login}</p>
                    <p className='p-1 bg-red-500 rounded-md'>Inativo</p>
                    <Button isIconOnly size="sm" variant="bordered" title="Deletar livro" onPress={() => {
                    handleClickActiveUser(user.id.toString())
                    }}>
                        <CheckIcon className="text-green-600" />
                    </Button>
                </div>
            ))}
        </div>
    )
}