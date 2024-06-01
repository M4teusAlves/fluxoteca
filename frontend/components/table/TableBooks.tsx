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
import {columns, fetchUsers, statusOptions} from "./data";
import { useState, useCallback, useMemo, useEffect } from "react";

import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';

import ModalUser from "../modal/user/ModalAddUser";

export default function TableBooks() {

  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false); 
  };

  return (
    <>
      <Button className="bg-[#7B6ED6]" endContent={<PlusIcon />} onPress={handleClick}>
          Adicionar Livro
      </Button>
      {showModal && <ModalUser isOpen={showModal} onClose={handleClose} />}
    </>
  )
}
