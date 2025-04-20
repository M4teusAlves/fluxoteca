'use client'
import React from "react";

import {Accordion, AccordionItem} from "@nextui-org/react";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Chip,
  User,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor
} from "@nextui-org/react";
import { PlusIcon } from "./PlusIcon";
import { SearchIcon } from "./SearchIcon";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ListIcon from '@mui/icons-material/List';
import { columns, fetchBooks, fetchDeleteBook, statusOptions } from "./databook";
import { useState, useCallback, useMemo, useEffect } from "react";

import { useJwtToken } from "@/hooks/useJwtToken";
import ModalBooks from "../modal/book/ModalBooks";
import ModalAddExemplar from "../modal/book/ModalAddExemplar";
import { useRouter } from "next/navigation";
import ModalDeleteBook from "../modal/book/ModalDeleteBook";
import ModalExemplarList from "../modal/exemplar/ModalExemplarList";
import { Edit, History } from "@mui/icons-material";
import ModalUpdateBooks from "../modal/book/ModalUpdateBook";
import ModalUpdateBook from "../modal/book/ModalUpdateBook";
import { useTipo } from "@/hooks/useTipo";
import ModalBookHistory from "../modal/book/ModalBookHistory";

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
};

const INITIAL_VISIBLE_COLUMNS = ["nome", "autor", "categoria", "actions"];

type Book = {
  id: number,
  nome: string,
  categoria: string,
  autor: string,
  status: string,
}

export default function TableBook() {



  const router = useRouter();
  const token = useJwtToken();
  const tipo = useTipo()
  const [books, setBooks] = useState<Book[]>([]); // State to store fetched users
  const [isLoading, setIsLoading] = useState(false);
  const [currentBookID, setCurrentBookID] = useState(0)
  const [currentBook, setCurrentBook] = useState<Book|null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) return;

        
        setIsLoading(true);
        const booksData = await fetchBooks(token);
        setBooks(booksData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, isLoading]);

  const [showModalBooks, setShowModalBooks] = useState(false);

  const handleClickAddBook = () => {
    setShowModalBooks(true);
  };

  const [showModalExemplar, setShowModalExemplar] = useState(false);

  const handleClickAddExemplar = () => {
    setShowModalExemplar(true);
  }

  const [showModalDeleteBook, setShowModalDeleteBook] = useState(false);

  const handleClickDeleteBook = () => {
    setShowModalDeleteBook(true);
  }

  const [showModalListBook, setShowModalListBook] = useState(false);

  const handleClickListBook = () => {
    setShowModalListBook(true);
  }

  const [showModalUpdateBook, setShowModalUpdateBook] = useState(false);

  const handleClickUpdateBook = () => {
    setShowModalUpdateBook(true);
  }

  const [showModalBookHistory, setShowModalBookHistory] = useState(false);

  const handleClickHistoryReader = () => {
    setShowModalBookHistory(true)
  }

  const [filterValue, setFilterValue] = useState("");
  const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });

  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredBooks = [...books];

    if (hasSearchFilter) {
      filteredBooks = filteredBooks.filter((book) =>
        book.nome.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredBooks = filteredBooks.filter((book) =>
        Array.from(statusFilter).includes(book.status),
      );
    }

    return filteredBooks;
  }, [books, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: Book, b: Book) => {
      const first = a[sortDescriptor.column as keyof Book] as number;
      const second = b[sortDescriptor.column as keyof Book] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((book: Book, columnKey: React.Key, tipo:string|null) => {
  const cellValue = book[columnKey as keyof Book];

    switch (columnKey) {
      case "nome":
        return (
        <span>{book.nome}</span>
        // <Accordion isCompact selectionMode="single">
        // <AccordionItem key="item.id" aria-label="Accordion 1" title={book.nome}>
        //   Exemplar 276135621
        // </AccordionItem>
        // </Accordion>
        );
      case "autor":
        return (<span>{book.autor}</span>);
      case "categoria":
        return (<span>{book.categoria}</span>);
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Button isIconOnly size="sm" variant="bordered" title="Lista de exemplares" onPress={() => {
              setCurrentBookID(book.id)
              handleClickListBook()
            }}>
              <ListIcon className="text-[#7B6ED6]" />
            </Button>
            {tipo==="ADMIN" &&
            <div className="flex gap-2">
              <Button isIconOnly size="sm" variant="bordered" title="Atualizar Livro" onPress={() => {
                setCurrentBookID(book.id)
                handleClickUpdateBook()
              }}>
                <Edit className="text-[#7B6ED6]" />
              </Button>
              <Button isIconOnly size="sm" variant="bordered" title="Adicionar Exemplar" onPress={() => {
                setCurrentBook(book)
                handleClickAddExemplar()
              }}>
                <AddIcon className="text-[#7B6ED6]" />
              </Button>
              <Button isIconOnly size="sm" variant="bordered" title="Deletar livro" onPress={() => {
                setCurrentBookID(book.id)
                handleClickDeleteBook()
              }}>
                <DeleteIcon className="text-[#7B6ED6]" />
              </Button>
                <Button isIconOnly size="sm" variant="bordered" title="Histórico" onPress={() => {
                setCurrentBookID(book.id)
                handleClickHistoryReader()
              }}>
                <History className="text-[#7B6ED6]"/>
              </Button>
            </div>}
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("")
    setPage(1)
  }, [])

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Buscar pelo nome..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            {tipo === "ADMIN" &&
              <Button className="bg-[#7B6ED6]" endContent={<PlusIcon />} onPress={handleClickAddBook}>
              Adicionar Livro
              </Button>
            }
            
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {books.length} livros</span>
          <label className="flex items-center text-default-400 text-small">
            Linhas por página:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    books.length,
    hasSearchFilter,
    tipo,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-center ">
        <Pagination
          isCompact
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
      </div>
    );
  }, [page, pages]);

  return (
    <main className="p-4">
      <Table
        className=""
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{ wrapper: "h-[calc(100vh-192px)]" }}
        // selectedKeys={selectedKeys}
        // selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        // onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns} >
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"Nenhum livro encontrado"} items={sortedItems}>
          
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => 
              <TableCell>{renderCell(item, columnKey, tipo)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* Condicional para mostrar modal de adicionar leitor */}
      {showModalBooks && <ModalBooks isOpen={showModalBooks} onClose={() => {
        setShowModalBooks(false)
        setIsLoading(true);
      }} />}
      {/* Condicional para mostrar modal de adicionar exemplar*/}
      {showModalExemplar && <ModalAddExemplar isOpen={showModalExemplar} onClose={() => {
        setShowModalExemplar(false)
        setIsLoading(true);
      }} book={currentBook}/>}
      {showModalDeleteBook && <ModalDeleteBook isOpen={showModalDeleteBook} onClose={() => {
        setShowModalDeleteBook(false)
        setIsLoading(true);
      }} bookID={currentBookID}/>}
      {showModalListBook && <ModalExemplarList isOpen={showModalListBook} onClose={() => {
        setShowModalListBook(false)
        setIsLoading(true);
      }} bookID={currentBookID}/>}
      {showModalUpdateBook && <ModalUpdateBook isOpen={showModalUpdateBook} onClose={() => {
        setShowModalUpdateBook(false)
        setIsLoading(true);
      }} bookID={currentBookID}/>}
      {showModalBookHistory && <ModalBookHistory isOpen={showModalBookHistory} onClose={() => {
        setShowModalBookHistory(false)
        setIsLoading(true);
      }} bookID={currentBookID}/>}
    </main>
  );
}
