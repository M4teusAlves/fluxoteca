'use client'
import React from "react";
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
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckIcon from '@mui/icons-material/Check';
import { columns, fetchRegisters, statusOptions } from "./dataregister";
import { useState, useCallback, useMemo, useEffect } from "react";

import { useJwtToken } from "@/hooks/useJwtToken";
import ModalRegister from "../modal/register/ModalRegister";
import ModalViewRegister from "../modal/register/ModalViewRegister"
import ModalEditRegister from "../modal/register/ModalEditRegister";
import ModalEndRegister from "../modal/register/ModalEndRegister";
import { updateStateRegister } from "../reports/dataReports";
import { useRouter } from "next/navigation";

import { parseISO, format } from 'date-fns';

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
};

const INITIAL_VISIBLE_COLUMNS = ["livro", "leitor", "dataDevolucao", "actions"];

export default function TableRegister() {

  const token = useJwtToken();
  const router = useRouter()
  const [registers, setRegisters] = useState<register[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentRegister, setCurrentRegister] = useState<register | null>(null)
  const [currentRegisterID, setCurrentRegisterID] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) return;
        setIsLoading(true);
        const registersData = await fetchRegisters(token);
        await updateStateRegister(token, router)
        setRegisters(registersData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching registers:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, isLoading]);

  const [showModalRegister, setShowModalRegister] = useState(false);
  const [showModalViewRegister, setShowModalViewRegister] = useState(false);
  const [showModalEditRegister, setShowModalEditRegister] = useState(false)
  const [showModalEndRegister, setShowModalEndRegister] = useState(false)

  const handleClickAddRegister = () => {
    setShowModalRegister(true);
  };

  const handleClickViewRegister = () => {
    setShowModalViewRegister(true)
  }

  const handleClickEditRegister = () => {
    setShowModalEditRegister(true)
  }

  const handleClickEndRegister = () => {
    setShowModalEndRegister(true)
  }

  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
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
    let filteredUsers = [...registers];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((register: register) =>
        register.leitor.nome.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredUsers = filteredUsers.filter((register: register) =>
        Array.from(statusFilter).includes(register.estado),
      );
    }

    return filteredUsers;
  }, [registers, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: register, b: register) => {
      const first = a[sortDescriptor.column as keyof register] as number;
      const second = b[sortDescriptor.column as keyof register] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const ULTIMO_DIA_CLASS = "bg-orange-300 p-2 rounded-xl";
  const EM_DIA_CLASS = "bg-green-300 p-2 rounded-xl";
  const ATRASADO_CLASS = "bg-red-300 p-2 rounded-xl";

  const ESTADOS = {
    ULTIMO_DIA: 'ULTIMO_DIA',
    EM_DIA: 'EM_DIA',
    ATRASADO: 'ATRASADO'
  };

  const formatDate = (dateString: string) => {
    const data = parseISO(dateString);
    return format(data, 'dd-MM-yyyy');
  };

  const renderCell = useCallback((register: register, columnKey: React.Key) => {
    const cellValue = register[columnKey as keyof register];

    const dataFormatada = formatDate(register.dataDevolucao);

    let dataDevolucao;
    switch (register.estado) {
      case ESTADOS.ULTIMO_DIA:
        dataDevolucao = <span className={ULTIMO_DIA_CLASS}>{dataFormatada}</span>;
        break;
      case ESTADOS.EM_DIA:
        dataDevolucao = <span className={EM_DIA_CLASS}>{dataFormatada}</span>;
        break;
      default:
        dataDevolucao = <span className={ATRASADO_CLASS}>{dataFormatada}</span>;
    }

    switch (columnKey) {
      case "livro":
        return (<span>{register.exemplar.livro.nome} - {register.exemplar.id}</span>);
      case "leitor":
        return (<span>{register.leitor.nome}</span>);
      case "dataDevolucao":
        return dataDevolucao;
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Button isIconOnly size="sm" variant="bordered" onPress={() => {
              setCurrentRegister(register);
              handleClickViewRegister();
            }}>
              <VisibilityOutlinedIcon className="text-[#7B6ED6]" />
            </Button>
            <Button isIconOnly size="sm" variant="bordered" onPress={() => {
              setCurrentRegisterID(register.id);
              handleClickEditRegister();
            }}>
              <CalendarMonthIcon className="text-[#7B6ED6]" />
            </Button>
            <Button isIconOnly size="sm" variant="bordered" onPress={() => {
              setCurrentRegisterID(register.id);
              handleClickEndRegister();
            }}>
              <CheckIcon className="text-[#7B6ED6]" />
            </Button>
          </div>
        );
      default:
        return cellValue.toString();
    }
  }, [registers]);

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
            <Button className="bg-[#7B6ED6]" endContent={<PlusIcon />} onPress={handleClickAddRegister}>
              Empréstimo
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {registers.length} registros</span>
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
    registers.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-center ">
        <Pagination
          isCompact
          showControls
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
    <>
      <Table
        className=""
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{ wrapper: "h-[calc(100vh-192px)]" }}
        selectedKeys={selectedKeys}
        // selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
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
        <TableBody emptyContent={"Nenhum empréstimo encontrado"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* Condicional para mostrar modal de adicionar emprestimo */}
      {showModalRegister && <ModalRegister isOpen={showModalRegister} onClose={() => {
        setShowModalRegister(false)
        setIsLoading(true);
      }} />}
      {/* Condicional para mostrar o modal de visualizar os dados do emprestimo */}
      {showModalViewRegister && <ModalViewRegister isOpen={showModalViewRegister} onClose={() => {
        setShowModalViewRegister(false)
        setIsLoading(true);
      }} register={currentRegister} />}
      {/* Condicional para mostrar modal de alteração da data de devolução do empréstimo */}
      {showModalEditRegister && <ModalEditRegister isOpen={showModalEditRegister} onClose={() => {
        setShowModalEditRegister(false)
        setIsLoading(true);
      }} registerID={currentRegisterID} />}
      {/* Condicional para mostrar modal de finalizacao do empréstimo */}
      {showModalEndRegister && <ModalEndRegister isOpen={showModalEndRegister} onClose={() => {
        setShowModalEndRegister(false)
        setIsLoading(true);
      }} registerID={currentRegisterID} />}
    </>
  );
}
