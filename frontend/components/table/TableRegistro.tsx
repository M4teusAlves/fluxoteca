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
import {PlusIcon} from "./PlusIcon";
import {SearchIcon} from "./SearchIcon";
import {columns, fetchUsers, statusOptions} from "./dataregistro";
import { useState, useCallback, useMemo, useEffect } from "react";

import { useJwtToken } from "@/hooks/useJwtToken";

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';

import { useDisclosure } from "@nextui-org/react"; // Import useDisclosure
import ModalUser from "../modal/ModalRegistro";
import ModalRenovar from "../modal/ModalRenovar"; // Import ModalRenovar

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
};

const INITIAL_VISIBLE_COLUMNS = ["id", "nomelivro","nomeusuario", "dataent", "actions"];

type User = {
  id: number,
  nomelivro: string,
  nomeusuario: string,
  dataent: Date,
  tipo?: "REGISTRO",
}

export default function TableUser() {
  const token = useJwtToken();
  const [users, setUsers] = useState<User[]>([]); // State to store fetched users
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) return;
        setIsLoading(true);
        const usersData = await fetchUsers(token);
        setUsers(usersData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const [showModal, setShowModal] = useState(false);
  const { isOpen, onOpen } = useDisclosure(); // Use useDisclosure

  const handleClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false); // Update modal visibility state when clicked
  };

  const [showRenovarModal, setShowRenovarModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleRenovarClick = (user: User) => {
    setSelectedUser(user);
    setShowRenovarModal(true);
  };

  const handleRenovarClose = () => {
    setShowRenovarModal(false);
    setSelectedUser(null);
  };

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
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.nomelivro.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.nomeusuario),
      );
    }

    return filteredUsers;
  }, [users, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: User, b: User) => {
      const first = a[sortDescriptor.column as keyof User] as number;
      const second = b[sortDescriptor.column as keyof User] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "name":
        return (<span>{user.nomelivro}</span>);
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[user.nomeusuario]} size="sm" variant="flat">
            {user.nomeusuario}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Button isIconOnly size="sm" variant="bordered">
              <VisibilityOutlinedIcon className="text-[#7B6ED6]"/>
            </Button>
            <Button isIconOnly size="sm" variant="bordered" onPress={() => handleRenovarClick(user)}>
              <ModeEditOutlinedIcon className="text-[#7B6ED6]"/>
            </Button>
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

  const onClear = React.useCallback(()=>{
    setFilterValue("")
    setPage(1)
  },[])

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
            <Button className="bg-[#7B6ED6]" endContent={<PlusIcon />} onPress={handleClick}>
              Adicionar Registro
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {users.length} registros</span>
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
    users.length,
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
        selectionMode="multiple"
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
        <TableBody emptyContent={"Nenhum Registro encontrado"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* Conditionally render ModalUser component */}
      {showModal && <ModalUser isOpen={showModal} onClose={handleClose} />}
      {/* Conditionally render ModalRenovar component */}
      {showRenovarModal && selectedUser && (
        <ModalRenovar isOpen={showRenovarModal} user={selectedUser} onClose={handleRenovarClose} />
      )}
    </>
  );
}
