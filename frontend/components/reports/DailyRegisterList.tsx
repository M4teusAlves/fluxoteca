import { Accordion, AccordionItem, ScrollShadow } from "@nextui-org/react";

export default function DailyRegisterList(){
    return(
        <div className="flex flex-col gap-2 items-center justify-start w-96 border-1 rounded-md shadow-xl">
            <p className="w-full text-center border-b-2 border-gray-300 p-2">Empréstimos que vencem hoje</p>
            <ScrollShadow className="w-full h-[35rem]">
                
            </ScrollShadow>
        </div>
    )
}