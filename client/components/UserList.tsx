import React from "react";
import { User } from "GlobalRedux/api/usersApi";

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <p>Name: {user.name}</p>
            <p>Last Name: {user.lastname}</p>
            <p>Email: {user.email}</p>
            <p>Password: {user.password}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
