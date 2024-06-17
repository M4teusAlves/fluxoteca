import {Accordion, AccordionItem} from "@nextui-org/accordion";

export default function TesteAccordion(){

    interface teste{
        id:number,
        header:string,
        content:string
    }

    const items:teste[] = [
        { id: 1, header: 'Item 1', content: 'Conteúdo do Item 1' },
        { id: 2, header: 'Item 2', content: 'Conteúdo do Item 2' },
      ];

    return(
        <Accordion>
                {items.map(item => (
                    <AccordionItem key={item.id} title={item.header}>
                    {item.content}
                    </AccordionItem>
                ))}
        </Accordion>
    )
}