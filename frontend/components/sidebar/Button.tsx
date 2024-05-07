import Link from 'next/link'
import { ReactNode } from 'react'
import { usePathname } from 'next/navigation';

interface IButton {
    icon: ReactNode,
    textButton: string,
    link: string,
}

export default function Button({icon, textButton, link}: (IButton)) {
    return (
        <Link href={link} className={`${usePathname() === link ? 'bg-[#7B6ED6]' : 'bg-[#D9D9D9]'} py-3 px-10 rounded-xl flex content-center gap-4`}>
            <span>
                {icon}
            </span>
            <button>
                {textButton}
            </button>
        </Link>
    )
}