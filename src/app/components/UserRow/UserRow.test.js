import React from "react";
import { render, screen } from "@testing-library/react";
import UserRow from "@/app/components/UserRow";
import '@testing-library/jest-dom';

const user = {
  id: 1,
  name: "Pedro Paramo",
  email: "pedro@example.com",
  phone: "1234-1234"
};

test('renders user row with user details', () => {
  render(
    <table>
      <tbody>
        <UserRow user={user} onClick={() => {}} />
      </tbody>
    </table>
  );

  expect(screen.getByText('1')).toBeInTheDocument();
  expect(screen.getByText('Pedro Paramo')).toBeInTheDocument();
  expect(screen.getByText('pedro@example.com')).toBeInTheDocument();
  expect(screen.getByText('1234-1234')).toBeInTheDocument();
});