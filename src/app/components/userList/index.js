import React, { useState, useEffect, useMemo, useCallback } from "react";
import useFetchUsers from '@/app/hooks/useFetchUsers';
import UserRow from '@/app/components/UserRow';
import ModalBox from '@/app/components/ModalBox';
import Loader from "../loader";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Styles from './UserList.module.css';

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  }
}

const UserList = () => {
  const { users, loading, error } = useFetchUsers();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    const savedSelectedUser = localStorage.getItem('selectedUser');

    if (savedSearchTerm) {
      setSearchTerm(savedSearchTerm);
    }

    if (savedSelectedUser) {
      setSelectedUser(JSON.parse(savedSelectedUser));
      setIsModalOpen(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('searchTerm', searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    if (selectedUser) {
      localStorage.setItem('selectedUser', JSON.stringify(selectedUser));
    } else {
      localStorage.removeItem('selectedUser');
    }
  }, [selectedUser]);

  useEffect(() => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(lowercasedTerm) ||
      user.email.toLowerCase().includes(lowercasedTerm) ||
      user.phone.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredUsers(filtered);
  }, [users, searchTerm]);

  const handleRowClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    localStorage.removeItem('selectedUser');
  }

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const debouncedHandleSearch = useMemo(() => debounce(handleSearch, 40), [handleSearch]); // 40ms para un avg de 200 chars per minute

  if (loading) {
    return <Loader></Loader>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h3>Usuarios</h3>
      <input
        type="text"
        placeholder="Buscar usuarios..."
        value={searchTerm}
        onChange={(e) => debouncedHandleSearch(e.target.value)}
        className={Styles.searchInput}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow className={Styles.TitleRow}>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <UserRow key={user.id} user={user} onClick={handleRowClick}></UserRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} style={{ textAlign: 'center' }}>Usuarios no encontrados</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <ModalBox
        isOpen={isModalOpen}
        handleClose={handleCloseModal}
        user={selectedUser}
      ></ModalBox>
    </div>
  );
}

export default UserList;
