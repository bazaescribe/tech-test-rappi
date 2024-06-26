import React from "react";
import Styles from './UserRow.module.css';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


const UserRow = ({user, onClick}) => {
  return (
    <TableRow className={Styles.row} onClick={() => {onClick(user)}} >
      <TableCell> {user.id} </TableCell>
      <TableCell> {user.name} </TableCell>
      <TableCell> {user.email} </TableCell>
      <TableCell> {user.phone} </TableCell>
    </TableRow>
  );
};

export default UserRow;