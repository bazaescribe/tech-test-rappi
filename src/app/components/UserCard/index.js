// src/components/UserCard.js
import React from "react";
import { Card, CardContent, Typography } from '@mui/material';

const UserCard = ({ user }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {user.name}
        </Typography>
        <Typography variant="body1">
          <strong>Email: </strong> {user.email}
        </Typography>
        <Typography variant="body1">
          <strong>Phone: </strong> {user.phone}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UserCard;
