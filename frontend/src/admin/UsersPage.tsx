import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserTable from './components/UserTable';

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/admin/users')
      .then(res => setUsers(res.data));
  }, []);

  return (
    <div>
      <h2>Пользователи</h2>
      <UserTable users={users} />
    </div>
  );
}