import React from "react";
import Styles from "./ModalBox.module.css";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const ModalBox = ({ isOpen, handleClose, user }) => {
  if (!isOpen) return null; 
  if (!user) return null;
  if (!user.address || !user.company) return null; 

  return (
    <div className={Styles.overlay} onClick={handleClose}>
      <Card variant="outlined">
        <CardContent>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
          <p>{user.phone}</p>
          <p>
            {user.address.street}, {user.address.suite}. {user.address.city}.
          </p>
          <p>{user.company.name}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModalBox;
