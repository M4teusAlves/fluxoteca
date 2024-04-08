import ButtonHeader from "./ButtonTable";

interface IButton {
    icon: ReactNode,
    textButton: string,
    link: string,
}

export default function Header({title} : props<string>) {
    return (
        <h1>{title}</h1>
        <ButtonTable />
    )
}