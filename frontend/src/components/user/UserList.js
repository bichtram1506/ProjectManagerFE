import axios from 'axios';
import React, { useEffect, useState } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [newUserName, setNewUserName] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get('/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const addUser = () => {
    axios
      .post('/users/register', { name: newUserName, password: newUserPassword })
      .then(response => {
        setNewUserName('');
        setNewUserPassword('');
        fetchUsers(); // Fetch the updated list of users
      })
      .catch(error => {
        console.error(error);
      });
  };

  const deleteUser = userId => {
    axios
      .delete(`/users/${userId}`)
      .then(() => {
        fetchUsers(); // Fetch the updated list of users
      })
      .catch(error => {
        console.error(error);
      });
  };

  const showPassword = (password) => {
    alert(`Mật khẩu: ${password}`);
  };

  return (
    <div className="user-list-container">
      <h1>Danh sách người dùng</h1>
      <div className="add-user-container">
        <input
          type="text"
          value={newUserName}
          onChange={e => setNewUserName(e.target.value)}
          className="user-input"
          placeholder="Tên người dùng"
        />
        <input
          type="password"
          value={newUserPassword}
          onChange={e => setNewUserPassword(e.target.value)}
          className="user-input"
          placeholder="Mật khẩu"
        />
        <button className="add-button" onClick={addUser}>
          Thêm
        </button>
      </div>
      <table className="department-table">
        <thead>
          <tr>
            <th>Tên người dùng</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="user-item">
              <td>{user.name}</td>
              <td>
                <button className="view-password-button" onClick={() => showPassword(user.password)}>
                  Xem mật khẩu
                </button>
                <button className="delete-button" onClick={() => deleteUser(user.id)}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;